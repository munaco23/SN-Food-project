const odooService = require('../services/odooService');

exports.getCart = async (req, res, next) => {
  try {
    const partnerId = req.user?.partnerId;
    if (!partnerId) return res.status(401).json({ ok: false, message: 'Unauthorized' });

    const cart = await odooService.getOrCreateCart(partnerId);
    const currency = await odooService.getCurrencyInfo();
    res.json({ ok: true, currency, cart });
  } catch (e) {
    next(e);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const partnerId = req.user?.partnerId;
    if (!partnerId) return res.status(401).json({ ok: false, message: 'Unauthorized' });

    const { productTemplateId, quantity } = req.body || {};
    const qty = Number(quantity ?? 1);
    const safeQty = Number.isFinite(qty) ? qty : 1;

    if (!productTemplateId) {
      return res.status(400).json({ ok: false, message: 'Missing productTemplateId' });
    }

    const cart = await odooService.addToCart(partnerId, String(productTemplateId), safeQty);
    const currency = await odooService.getCurrencyInfo();
    res.json({ ok: true, currency, cart });
  } catch (e) {
    next(e);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const partnerId = req.user?.partnerId;
    if (!partnerId) return res.status(401).json({ ok: false, message: 'Unauthorized' });

    const { productTemplateId } = req.body || {};
    if (!productTemplateId) {
      return res.status(400).json({ ok: false, message: 'Missing productTemplateId' });
    }

    const cart = await odooService.removeFromCart(partnerId, String(productTemplateId));
    const currency = await odooService.getCurrencyInfo();
    res.json({ ok: true, currency, cart });
  } catch (e) {
    next(e);
  }
};

exports.emptyCart = async (req, res, next) => {
  try {
    const partnerId = req.user?.partnerId;
    if (!partnerId) return res.status(401).json({ ok: false, message: 'Unauthorized' });

    const cart = await odooService.emptyCart(partnerId);
    const currency = await odooService.getCurrencyInfo();
    res.json({ ok: true, currency, cart });
  } catch (e) {
    next(e);
  }
};
