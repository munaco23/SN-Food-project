const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/:partnerId', accountController.getAccountData);
router.put('/:partnerId/profile', accountController.updateProfile);
router.put('/:partnerId/address', accountController.updateAddress);

module.exports = router;
