// const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin.js');

// const rootDir = require('../util/path');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// /admin/delete-product => POST
router.post('/delete-product', adminController.postDeleteProduct);

exports.routes = router;