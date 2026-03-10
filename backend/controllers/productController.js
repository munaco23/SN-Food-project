const odooService = require('../services/odooService');

exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const context = odooService.getLangContext(req);
    const [products, currency] = await Promise.all([
      odooService.getAllProducts(10, 0, null, null, context),
      odooService.getCurrencyInfo()
    ]);
    // Map internal key image back to imageSrc for ProductsOfWeek compatibility if needed
    // or just keep it unified as 'image'
    res.json({ ok: true, currency, products: products.map(p => ({ ...p, imageSrc: p.image })) });
  } catch (error) {
    next(error);
  }
};

exports.getTopProducts = async (req, res, next) => {
  try {
    const context = odooService.getLangContext(req);
    const limit = Number(req.query.limit ?? 8);
    const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 8;
    const [products, currency] = await Promise.all([
      odooService.getTopProducts(safeLimit, context),
      odooService.getCurrencyInfo()
    ]);
    res.json({ ok: true, currency, products: products.map(p => ({ ...p, imageSrc: p.image })) });
  } catch (error) {
    next(error);
  }
};

exports.getBestSellingProducts = async (req, res, next) => {
  try {
    const context = odooService.getLangContext(req);
    const limit = Number(req.query.limit ?? 4);
    const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 4;
    const [products, currency] = await Promise.all([
      odooService.getBestSellingProducts(safeLimit, context),
      odooService.getCurrencyInfo()
    ]);
    res.json({ ok: true, currency, products: products.map(p => ({ ...p, imageSrc: p.image })) });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const context = odooService.getLangContext(req);
    const limit = Number(req.query.limit ?? 24);
    const offset = Number(req.query.offset ?? 0);
    const category = req.query.category ?? null;
    const search = req.query.search ?? null;

    const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 200) : 24;
    const safeOffset = Number.isFinite(offset) ? Math.max(offset, 0) : 0;

    const [products, total, currency] = await Promise.all([
      odooService.getAllProducts(safeLimit, safeOffset, category, search, context),
      odooService.countProducts(category, search, context),
      odooService.getCurrencyInfo()
    ]);

    const returned = products.length;
    const nextOffset = safeOffset + returned;
    res.json({
      ok: true,
      currency,
      products,
      meta: {
        limit: safeLimit,
        offset: safeOffset,
        returned,
        total,
        hasMore: nextOffset < total
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const context = odooService.getLangContext(req);
    const categories = await odooService.getCategories(context);
    res.json({ ok: true, categories });
  } catch (error) {
    next(error);
  }
};
