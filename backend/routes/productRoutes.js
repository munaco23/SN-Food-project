const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const productDetailController = require('../controllers/productDetailController');

router.get('/featured', productController.getFeaturedProducts);
router.get('/top', productController.getTopProducts);
router.get('/best-selling', productController.getBestSellingProducts);
router.get('/all', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productDetailController.getProductDetail);

module.exports = router;
