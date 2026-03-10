const odooService = require('../services/odooService');

exports.getProductDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ ok: false, message: 'Product ID is required' });
    }

    const product = await odooService.getProduct(id);
    const currency = await odooService.getCurrencyInfo();

    res.json({
      ok: true,
      product,
      currency
    });
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ ok: false, message: 'Product not found' });
    }
    next(error);
  }
};
