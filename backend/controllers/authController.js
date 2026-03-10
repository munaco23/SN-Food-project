const odooService = require('../services/odooService');
const jwt = require('jsonwebtoken');
const https = require('https');

const parseVatInput = (vatCountryCode, vatNumber, vatRaw) => {
  const cc = String(vatCountryCode || '').trim().toUpperCase();
  let num = String(vatNumber || '').trim();

  num = num.replace(/\s+/g, '');
  if (cc && num.toUpperCase().startsWith(cc)) {
    num = num.slice(cc.length);
  }

  if (cc && num) {
    return { countryCode: cc, vatNumber: num, combined: `${cc}${num}` };
  }

  const raw = String(vatRaw || '').trim();
  if (!raw) return null;
  const m = raw.match(/^([A-Za-z]{2})\s*([A-Za-z0-9+*.\-\/]+)$/);
  if (!m) return null;
  const rawCc = m[1].toUpperCase();
  let rawNum = String(m[2] || '').trim().replace(/\s+/g, '');
  if (rawCc && rawNum.toUpperCase().startsWith(rawCc)) {
    rawNum = rawNum.slice(rawCc.length);
  }
  return { countryCode: rawCc, vatNumber: rawNum, combined: `${rawCc}${rawNum}` };
};

const verifyVatWithVies = async (countryCode, vatNumber) => {
  const cc = String(countryCode || '').trim().toUpperCase();
  const num = String(vatNumber || '').trim();
  console.log(`[VAT DEBUG] Verifying: ${cc}${num}`);

  if (!cc || cc.length !== 2 || !num) {
    const err = new Error('Invalid VAT input');
    err.status = 400;
    throw err;
  }

  const url = `https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${encodeURIComponent(cc)}/vat/${encodeURIComponent(num)}`;

  const data = await new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
        timeout: 20000
      },
      (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          console.log(`[VAT DEBUG] Status: ${res.statusCode}`);
          console.log(`[VAT DEBUG] Body: ${body}`);

          if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
            const err = new Error('VAT verification service unavailable');
            err.status = 502;
            reject(err);
            return;
          }
          try {
            resolve(JSON.parse(body));
          } catch {
            const err = new Error('VAT verification failed');
            err.status = 502;
            reject(err);
          }
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      const err = new Error('VAT verification timed out');
      err.status = 504;
      reject(err);
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.end();
  });

  if (!data || (typeof data.isValid !== 'boolean' && typeof data.valid !== 'boolean')) {
    const err = new Error('VAT verification failed');
    err.status = 502;
    throw err;
  }

  if (typeof data.isValid !== 'boolean' && typeof data.valid === 'boolean') {
    return { ...data, isValid: data.valid };
  }

  return data;
};

exports.verifyVat = async (req, res, next) => {
  try {
    const { countryCode, vatNumber, vatCountryCode, vat, number } = req.body || {};
    const parsed = parseVatInput(vatCountryCode || countryCode, vatNumber || number, vat);
    if (!parsed) {
      return res.json({ ok: false, isValid: false, message: 'Missing or invalid VAT number' });
    }

    try {
      const result = await verifyVatWithVies(parsed.countryCode, parsed.vatNumber);
      // Check if VIES returned a transient error (like MS_MAX_CONCURRENT_REQ)
      if (!result.isValid && result.userError && result.userError.includes('MAX_CONCURRENT')) {
        return res.json({ 
          ok: false, 
          isValid: false, 
          message: 'VAT service is busy (Maximum concurrent requests). Please wait a moment and try again.' 
        });
      }

      if (!result.isValid) {
        return res.json({ ok: false, isValid: false, message: 'Invalid VAT number' });
      }

      return res.json({
        ok: true,
        isValid: true,
        vat: parsed.combined,
        name: result.name || null,
        address: result.address || null
      });
    } catch (err) {
      const status = err?.status;
      if (status === 502 || status === 504) {
        return res.json({ ok: false, isValid: false, message: 'VAT verification service unavailable. Please try again.' });
      }
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      name,
      company,
      vat,
      vatCountryCode,
      vatNumber,
      address,
      city,
      country,
      postalCode,
      sdi,
      phone,
      email,
      password
    } = req.body;

    const fullName = (name && String(name).trim()) || `${firstName || ''} ${lastName || ''}`.trim();

    if (!fullName || !email || !password) {
      return res.status(400).json({ ok: false, message: 'Missing required fields' });
    }

    const parsedVat = parseVatInput(vatCountryCode, vatNumber, vat);
    if (!parsedVat) {
      return res.status(400).json({ ok: false, message: 'Missing or invalid VAT number' });
    }

    const viesResult = await verifyVatWithVies(parsedVat.countryCode, parsedVat.vatNumber);
    if (!viesResult.isValid) {
      return res.status(400).json({ ok: false, message: 'Invalid VAT number' });
    }

    await odooService.authenticate();

    // 0. Check existing partner by email
    const existingPartners = await odooService.jsonRpc('/web/dataset/call_kw', {
      model: 'res.partner',
      method: 'search_read',
      args: [
        [['email', '=', email]],
        ['id', 'name', 'email']
      ],
      kwargs: { limit: 1 }
    });

    let partnerId = existingPartners?.length ? existingPartners[0].id : null;

    const partnerValuesRaw = {
      name: fullName,
      email,
      phone,
      street: address,
      city,
      zip: postalCode,
      vat: parsedVat.combined,
      customer_rank: 1,
      type: 'contact',
      is_company: company ? true : false
    };

    const partnerValues = await odooService.filterValuesForModel('res.partner', partnerValuesRaw);

    if (partnerId) {
      await odooService.jsonRpc('/web/dataset/call_kw', {
        model: 'res.partner',
        method: 'write',
        args: [[partnerId], partnerValues],
        kwargs: {}
      });
    } else {
      // 1. Create Partner (Contact)
      partnerId = await odooService.jsonRpc('/web/dataset/call_kw', {
        model: 'res.partner',
        method: 'create',
        args: [partnerValues],
        kwargs: {}
      });
    }

    // 2. Create User (portal user)
    const existingUsers = await odooService.jsonRpc('/web/dataset/call_kw', {
      model: 'res.users',
      method: 'search_read',
      args: [
        [['login', '=', email]],
        ['id', 'login', 'name', 'partner_id']
      ],
      kwargs: { limit: 1 }
    });

    let userId = existingUsers?.length ? existingUsers[0].id : null;

    if (!userId) {
      const portalGroupId = await odooService.xmlidToResId('base.group_portal');

      const userValuesRaw = {
        name: fullName,
        login: email,
        password,
        partner_id: partnerId,
        groups_id: portalGroupId ? [[6, 0, [portalGroupId]]] : undefined
      };

      const userValues = await odooService.filterValuesForModel('res.users', userValuesRaw);

      userId = await odooService.jsonRpc('/web/dataset/call_kw', {
        model: 'res.users',
        method: 'create',
        args: [userValues],
        kwargs: {}
      });
    }

    res.json({ ok: true, message: 'User registered successfully', partnerId, userId });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: 'Missing email or password' });
    }

    const authResult = await odooService.authenticateWithCredentials(email, password);

    await odooService.authenticate();
    const users = await odooService.jsonRpc('/web/dataset/call_kw', {
      model: 'res.users',
      method: 'read',
      args: [[authResult.uid], ['id', 'name', 'login', 'partner_id']],
      kwargs: {}
    });

    const user = users?.[0];
    if (!user) {
      return res.status(401).json({ ok: false, message: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ ok: false, message: 'Server misconfigured' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email,
        partnerId: user.partner_id[0]
      },
      secret,
      { expiresIn: '7d' }
    );

    res.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: email,
        partnerId: user.partner_id[0]
      },
      token,
      sessionId: authResult.sessionId
    });
  } catch (error) {
    next(error);
  }
};
