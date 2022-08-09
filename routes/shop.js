// const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

// const rootDir = require('../util/path');

const router = express.Router();

// const adminData = require('../routes/admin');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getShop);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
