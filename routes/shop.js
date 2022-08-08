// const path = require('path');

const express = require('express');

const shopController = require('../controllers/products');

// const rootDir = require('../util/path');

const router = express.Router();

// const adminData = require('../routes/admin');

router.get('/', shopController.getShop);

router.get('/products');

router.get('/cart');

router.get('/checkout');

module.exports = router;
