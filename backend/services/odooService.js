const config = require('../config/odoo');

class OdooService {
  constructor() {
    this.url = config.odoo.url.replace(/\/$/, '');
    this.db = config.odoo.db;
    this.username = config.odoo.username;
    this.password = config.odoo.password;
    this.sessionId = null;
    this._modelFieldsCache = new Map();
    this._currencyCache = null;
    this._orderIdCache = new Map(); // partnerId -> orderId
    this._variantIdCache = new Map(); // templateId -> variantId
    this._productDetailCache = new Map(); // productId -> { product, timestamp }
    this.CACHE_TTL = 5 * 60 * 1000; // 5 minutes
  }

  async getCurrencyInfo(req = null) {
    if (this._currencyCache) return this._currencyCache;
    await this.authenticate(req);

    const companyFields = await this.getModelFields('res.company', req);
    const currencyFields = await this.getModelFields('res.currency', req);
    if (!companyFields?.currency_id) {
      this._currencyCache = { code: null, symbol: '$', position: 'after', digits: 2 };
      return this._currencyCache;
    }

    const companyRes = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'res.company',
      method: 'search_read',
      args: [[], ['currency_id']],
      kwargs: { limit: 1, context: {} }
    }, req);

    const currencyId = companyRes?.length && Array.isArray(companyRes[0].currency_id)
      ? companyRes[0].currency_id[0]
      : null;

    if (!currencyId) {
      this._currencyCache = { code: null, symbol: '$', position: 'after', digits: 2 };
      return this._currencyCache;
    }

    const wanted = ['name', 'symbol', 'position', 'decimal_places'];
    const allowed = wanted.filter((f) => Boolean(currencyFields?.[f]));

    const currencyRes = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'res.currency',
      method: 'read',
      args: [[currencyId], allowed],
      kwargs: { context: {} }
    }, req);

    const c = currencyRes?.[0] || {};
    this._currencyCache = {
      code: c.name || null,
      symbol: c.symbol || '$',
      position: c.position || 'after',
      digits: typeof c.decimal_places === 'number' ? c.decimal_places : 2
    };
    return this._currencyCache;
  }

  async _productTemplateFields(extra = []) {
    const base = ['id', 'name', 'default_code', 'list_price', 'description_sale', 'categ_id', 'image_128', 'uom_id'];
    const desired = [...new Set([...base, ...extra])];
    const fields = await this.getModelFields('product.template');
    return desired.filter((f) => Boolean(fields?.[f]));
  }

  _mapProductTemplate(p) {
    return {
      id: p.id.toString(),
      name: p.name,
      variant: p.description_sale || '',
      code: p.default_code || 'N/A',
      brand: 'SN Food',
      category: p.categ_id ? p.categ_id[1] : 'General',
      image: p.image_128 ? `data:image/png;base64,${p.image_128}` : null,
      price: typeof p.list_price === 'number' ? p.list_price : null
    };
  }

  getLangContext(req) {
    const lang = req.headers['accept-language'] || 'en';
    const odooLangs = {
      'en': 'en_US',
      'fr': 'fr_FR',
      'it': 'it_IT',
      'ur': 'ur_PK',
      'ln': 'ln_CD',
      'nl': 'nl_NL'
    };
    return { lang: odooLangs[lang] || 'en_US' };
  }

  _productDomain(categoryOrId, search = null) {
    const domain = [['sale_ok', '=', true]];
    
    if (search) {
      domain.push(['name', 'ilike', search]);
    }

    if (!categoryOrId) return domain;

    const catIdNum = Number(categoryOrId);
    if (Number.isFinite(catIdNum) && catIdNum > 0) {
      domain.push(['categ_id', '=', catIdNum]);
    } else if (typeof categoryOrId === 'string') {
      domain.push(['categ_id.name', '=', categoryOrId]);
    }
    return domain;
  }

  async jsonRpc(path, params, req = null) {
    const url = `${this.url}${path}`;
    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params,
      id: Date.now()
    };

    const headers = { 'Content-Type': 'application/json' };
    if (this.sessionId) {
      headers['Cookie'] = `session_id=${this.sessionId}`;
    }

    if (req && req.headers['accept-language']) {
      headers['Accept-Language'] = req.headers['accept-language'];
    }

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      const match = setCookie.match(/session_id=([^;]+)/);
      if (match) this.sessionId = match[1];
    }

    const data = await res.json().catch(() => null);

    if (!res.ok || data?.error) {
      const msg = data?.error?.data?.message || data?.error?.message || `HTTP ${res.status}`;
      const err = new Error(msg);
      err.status = res.status || 500;
      throw err;
    }

    return data.result;
  }

  async authenticate(req = null) {
    const result = await this.jsonRpc('/web/session/authenticate', {
      db: this.db,
      login: this.username,
      password: this.password
    }, req);

    if (!result?.uid) {
      throw new Error('Odoo Authentication failed');
    }
    return result;
  }

  async authenticateWithCredentials(login, password) {
    const url = `${this.url}/web/session/authenticate`;
    const payload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        db: this.db,
        login,
        password
      },
      id: Date.now()
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const setCookie = res.headers.get('set-cookie');
    let sessionId = null;
    if (setCookie) {
      const match = setCookie.match(/session_id=([^;]+)/);
      if (match) sessionId = match[1];
    }

    const data = await res.json().catch(() => null);
    if (!res.ok || data?.error) {
      const msg = data?.error?.data?.message || data?.error?.message || `HTTP ${res.status}`;
      const err = new Error(msg);
      err.status = res.status || 500;
      throw err;
    }

    const result = data.result;
    if (!result?.uid) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    return { ...result, sessionId };
  }

  async getModelFields(model, req = null) {
    if (this._modelFieldsCache.has(model)) {
      return this._modelFieldsCache.get(model);
    }

    await this.authenticate(req);

    const fields = await this.jsonRpc('/web/dataset/call_kw', {
      model,
      method: 'fields_get',
      args: [],
      kwargs: { attributes: ['type', 'readonly', 'store'] }
    }, req);

    this._modelFieldsCache.set(model, fields || {});
    return fields || {};
  }

  async filterValuesForModel(model, values) {
    const fields = await this.getModelFields(model);
    const allowed = {};

    for (const [key, val] of Object.entries(values || {})) {
      if (val === undefined) continue;
      if (!fields[key]) continue;
      if (fields[key]?.readonly) continue;
      allowed[key] = val;
    }

    return allowed;
  }

  async xmlidToResId(xmlid, req = null) {
    await this.authenticate(req);
    try {
      return await this.jsonRpc('/web/dataset/call_kw', {
        model: 'ir.model.data',
        method: 'xmlid_to_res_id',
        args: [xmlid],
        kwargs: { raise_if_not_found: false }
      }, req);
    } catch (e) {
      const parts = String(xmlid || '').split('.');
      if (parts.length !== 2) return null;
      const [module, name] = parts;

      const records = await this.jsonRpc('/web/dataset/call_kw', {
        model: 'ir.model.data',
        method: 'search_read',
        args: [
          [['module', '=', module], ['name', '=', name]],
          ['res_id']
        ],
        kwargs: { limit: 1 }
      }, req);

      return records?.length ? records[0].res_id : null;
    }
  }

  async getProduct(productId, context = {}, req = null) {
    const tid = Number(productId);
    if (!Number.isFinite(tid) || tid <= 0) {
      const err = new Error('Invalid product ID');
      err.status = 400;
      throw err;
    }

    // Cache key should include language if context.lang exists
    const cacheKey = context.lang ? `${tid}_${context.lang}` : tid;

    if (!this._productDetailCache) {
      this._productDetailCache = new Map();
    }
    if (!this.CACHE_TTL) {
      this.CACHE_TTL = 5 * 60 * 1000;
    }

    const cached = this._productDetailCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp < this.CACHE_TTL)) {
      return cached.product;
    }

    await this.authenticate(req);
    const fields = await this._productTemplateFields(['description', 'weight', 'volume', 'qty_available', 'barcode']);
    const products = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.template',
      method: 'read',
      args: [[tid], fields],
      kwargs: { context }
    }, req);

    if (!products?.length) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }

    const p = products[0];
    const mapped = this._mapProductTemplate(p);
    const product = {
      ...mapped,
      description: p.description || '',
      weight: p.weight || 0,
      volume: p.volume || 0,
      stock: p.qty_available || 0,
      uom: p.uom_id ? p.uom_id[1] : '',
      barcode: p.barcode || null
    };

    this._productDetailCache.set(cacheKey, {
      product,
      timestamp: Date.now()
    });

    return product;
  }
  async getAllProducts(limit = 80, offset = 0, categoryId = null, search = null, context = {}, req = null) {
    await this.authenticate(req);
    
    const products = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.template',
      method: 'search_read',
      args: [
        this._productDomain(categoryId, search), 
        await this._productTemplateFields()
      ],
      kwargs: {
        limit,
        offset,
        context
      }
    }, req);

    return products.map((p) => this._mapProductTemplate(p));
  }

  async getTopProducts(limit = 8, context = {}, req = null) {
    await this.authenticate(req);

    const fields = await this._productTemplateFields(['create_date']);
    const products = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.template',
      method: 'search_read',
      args: [
        this._productDomain(null),
        fields
      ],
      kwargs: {
        limit,
        order: 'create_date desc, id desc',
        context
      }
    }, req);

    return products.map((p) => this._mapProductTemplate(p));
  }

  async getBestSellingProducts(limit = 4, context = {}, req = null) {
    await this.authenticate(req);

    const modelFields = await this.getModelFields('product.template', req);
    const hasSalesCount = Boolean(modelFields?.sales_count?.store);
    const fields = await this._productTemplateFields(hasSalesCount ? ['sales_count'] : []);

    const products = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.template',
      method: 'search_read',
      args: [
        this._productDomain(null),
        fields
      ],
      kwargs: {
        limit,
        order: hasSalesCount ? 'sales_count desc, id desc' : 'id desc',
        context
      }
    }, req);

    return products.map((p) => this._mapProductTemplate(p));
  }

  async countProducts(categoryId = null, search = null, context = {}, req = null) {
    await this.authenticate(req);

    return await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.template',
      method: 'search_count',
      args: [this._productDomain(categoryId, search)],
      kwargs: { context }
    }, req);
  }

  async getCategories(context = {}, req = null) {
    await this.authenticate(req);
    
    const categories = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.category',
      method: 'search_read',
      args: [
        [['name', '!=', 'All']], 
        ['id', 'name', 'parent_id']
      ],
      kwargs: {
        context
      }
    }, req);

    return categories.map(c => ({
      id: c.id.toString(),
      name: c.name,
      parentId: c.parent_id ? c.parent_id[0].toString() : null
    }));
  }

  async _getOrCreateDraftOrder(partnerId) {
    const pid = Number(partnerId);
    if (!Number.isFinite(pid) || pid <= 0) {
      const err = new Error('Invalid partner');
      err.status = 400;
      throw err;
    }

    if (this._orderIdCache.has(pid)) {
      return this._orderIdCache.get(pid);
    }

    await this.authenticate();

    const orders = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'sale.order',
      method: 'search_read',
      args: [
        [['partner_id', '=', pid], ['state', '=', 'draft']],
        ['id']
      ],
      kwargs: { limit: 1, order: 'id desc', context: {} }
    });

    let orderId;
    if (orders?.length) {
      orderId = orders[0].id;
    } else {
      const valuesRaw = {
        partner_id: pid,
        partner_invoice_id: pid,
        partner_shipping_id: pid
      };
      const values = await this.filterValuesForModel('sale.order', valuesRaw);
      orderId = await this.jsonRpc('/web/dataset/call_kw', {
        model: 'sale.order',
        method: 'create',
        args: [values],
        kwargs: { context: {} }
      });
    }

    this._orderIdCache.set(pid, orderId);
    return orderId;
  }

  async _productTemplateToVariantId(productTemplateId) {
    const tid = Number(productTemplateId);
    if (!Number.isFinite(tid) || tid <= 0) return null;

    if (this._variantIdCache.has(tid)) {
      return this._variantIdCache.get(tid);
    }

    await this.authenticate();
    const variantIds = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.product',
      method: 'search',
      args: [[['product_tmpl_id', '=', tid]]],
      kwargs: { limit: 1, context: {} }
    });

    const vid = Array.isArray(variantIds) && variantIds.length ? variantIds[0] : null;
    const result = vid ? Number(vid) : null;
    if (result) {
      this._variantIdCache.set(tid, result);
    }
    return result;
  }

  async _getLineByTemplate(orderId, productTemplateId) {
    const variantId = await this._productTemplateToVariantId(productTemplateId);
    if (!variantId) return null;

    const lines = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'sale.order.line',
      method: 'search_read',
      args: [
        [['order_id', '=', orderId], ['product_id', '=', variantId]],
        ['id', 'product_uom_qty']
      ],
      kwargs: { limit: 1, context: {} }
    });
    return lines?.length ? lines[0] : null;
  }

  async _buildCart(orderId) {
    await this.authenticate();

    const order = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'sale.order',
      method: 'read',
      args: [[orderId], ['id', 'name', 'state', 'order_line', 'amount_total']],
      kwargs: { context: {} }
    });

    const o = order?.[0];
    const lineIds = Array.isArray(o?.order_line) ? o.order_line : [];
    if (!lineIds.length) {
      return { id: String(orderId), name: o?.name || '', state: o?.state || 'draft', items: [], total: o?.amount_total ?? 0 };
    }

    const lines = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'sale.order.line',
      method: 'read',
      args: [lineIds, ['id', 'product_id', 'product_uom_qty', 'price_unit']],
      kwargs: { context: {} }
    });

    const productIds = [...new Set((lines || []).map((l) => (Array.isArray(l.product_id) ? l.product_id[0] : null)).filter(Boolean))];

    const variants = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.product',
      method: 'read',
      args: [productIds, ['id', 'product_tmpl_id', 'default_code', 'image_128']],
      kwargs: { context: {} }
    });

    const tmplIds = [...new Set((variants || []).map(v => Array.isArray(v.product_tmpl_id) ? v.product_tmpl_id[0] : null).filter(Boolean))];
    const templates = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'product.template',
      method: 'read',
      args: [tmplIds, ['id', 'name']],
      kwargs: { context: {} }
    });

    const tmplMap = new Map((templates || []).map(t => [t.id, t]));
    const byVariant = new Map();
    for (const v of variants || []) {
      const tid = Array.isArray(v.product_tmpl_id) ? v.product_tmpl_id[0] : null;
      const t = tid ? tmplMap.get(tid) : null;
      byVariant.set(v.id, { ...v, name: t?.name || '' });
    }

    const items = (lines || []).map((l) => {
      const vid = Array.isArray(l.product_id) ? l.product_id[0] : null;
      const vData = vid ? byVariant.get(vid) : null;
      const tid = Array.isArray(vData?.product_tmpl_id) ? vData.product_tmpl_id[0] : null;
      return {
        lineId: String(l.id),
        productId: vid ? String(vid) : null,
        productTemplateId: tid ? String(tid) : (vid ? `v${vid}` : Math.random().toString(36).substr(2, 9)),
        name: vData?.name || (Array.isArray(l.product_id) ? l.product_id[1] : ''),
        code: vData?.default_code || '',
        image: vData?.image_128 ? `data:image/png;base64,${vData.image_128}` : null,
        quantity: l.product_uom_qty,
        price: l.price_unit
      };
    });

    return {
      id: String(orderId),
      name: o?.name || '',
      state: o?.state || 'draft',
      items,
      total: o?.amount_total ?? 0
    };
  }

  async getPartner(partnerId) {
    await this.authenticate();
    const fields = ['id', 'name', 'email', 'phone', 'street', 'street2', 'city', 'zip', 'country_id', 'vat'];
    const partners = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'res.partner',
      method: 'read',
      args: [[Number(partnerId)], fields],
      kwargs: { context: {} }
    });
    return partners?.[0] || null;
  }

  async updatePartner(partnerId, values) {
    await this.authenticate();
    const allowedValues = await this.filterValuesForModel('res.partner', values);
    if (Object.keys(allowedValues).length === 0) return false;

    return await this.jsonRpc('/web/dataset/call_kw', {
      model: 'res.partner',
      method: 'write',
      args: [[Number(partnerId)], allowedValues],
      kwargs: { context: {} }
    });
  }

  async getPartnerOrders(partnerId) {
    await this.authenticate();
    const orders = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'sale.order',
      method: 'search_read',
      args: [
        [['partner_id', '=', Number(partnerId)]],
        ['id', 'name', 'date_order', 'state', 'amount_total']
      ],
      kwargs: { order: 'date_order desc', context: {} }
    });
    return orders || [];
  }

  async getOrCreateCart(partnerId) {
    const orderId = await this._getOrCreateDraftOrder(partnerId);
    return await this._buildCart(orderId);
  }

  async addToCart(partnerId, productTemplateId, quantity = 1) {
    await this.authenticate();

    const orderId = await this._getOrCreateDraftOrder(partnerId);
    const variantId = await this._productTemplateToVariantId(productTemplateId);
    if (!variantId) {
      const err = new Error('Invalid product');
      err.status = 400;
      throw err;
    }

    const lines = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'sale.order.line',
      method: 'search_read',
      args: [
        [['order_id', '=', orderId], ['product_id', '=', variantId]],
        ['id', 'product_uom_qty']
      ],
      kwargs: { limit: 1, context: {} }
    });

    if (lines?.length) {
      const line = lines[0];
      const nextQty = (Number(line.product_uom_qty) || 0) + (Number(quantity) || 1);
      await this.jsonRpc('/web/dataset/call_kw', {
        model: 'sale.order.line',
        method: 'write',
        args: [[line.id], { product_uom_qty: nextQty }],
        kwargs: { context: {} }
      });
    } else {
      const valuesRaw = {
        order_id: orderId,
        product_id: variantId,
        product_uom_qty: Number(quantity) || 1
      };
      const values = await this.filterValuesForModel('sale.order.line', valuesRaw);
      
      // Force price_unit to 0 initially or let Odoo handle it via onchange?
      // Actually, we want Odoo to compute the price based on pricelist.
      // We can call 'onchange_product_id' if needed, but for now we just create.
      await this.jsonRpc('/web/dataset/call_kw', {
        model: 'sale.order.line',
        method: 'create',
        args: [values],
        kwargs: { context: {} }
      });
    }

    return await this._buildCart(orderId);
  }

  async removeFromCart(partnerId, productTemplateId) {
    await this.authenticate();

    const orderId = await this._getOrCreateDraftOrder(partnerId);
    const line = await this._getLineByTemplate(orderId, productTemplateId);
    
    if (line) {
      await this.jsonRpc('/web/dataset/call_kw', {
        model: 'sale.order.line',
        method: 'unlink',
        args: [[line.id]],
        kwargs: { context: {} }
      });
    }

    return await this._buildCart(orderId);
  }

  async emptyCart(partnerId) {
    await this.authenticate();

    const orderId = await this._getOrCreateDraftOrder(partnerId);
    const order = await this.jsonRpc('/web/dataset/call_kw', {
      model: 'sale.order',
      method: 'read',
      args: [[orderId], ['order_line']],
      kwargs: { context: {} }
    });
    const lineIds = Array.isArray(order?.[0]?.order_line) ? order[0].order_line : [];
    if (lineIds.length) {
      await this.jsonRpc('/web/dataset/call_kw', {
        model: 'sale.order.line',
        method: 'unlink',
        args: [lineIds],
        kwargs: { context: {} }
      });
    }
    return await this._buildCart(orderId);
  }
}

module.exports = new OdooService();
