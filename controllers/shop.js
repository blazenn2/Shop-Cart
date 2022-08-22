const productModal = require('../modals/product');
const cartModal = require('../modals/cart');
var mongoose = require('mongoose');
// var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

// <--------------------- SHOW PRODUCT PAGE --------------------> //
exports.getIndex = (req, res) => productModal.productSchema.find().then(products => res.render('shop/index', { prods: products, pageTitle: "Shop", path: '/' }));

// <---------------------  SHOW INDEX PAGE --------------------> //
exports.getShop = (req, res) => {

};

// <--------------------- SHOW CART --------------------> //
exports.getCart = (req, res) => {

};

// <--------------------- SHOW CHECKOUT PAGE --------------------> //
exports.getCheckout = (req, res) => {
    res.render('shop/checkout', { pageTitle: "Checkout", path: "/checkout" });
};

// <--------------------- SHOW ORDERS PAGE --------------------> //
exports.getOrders = (req, res) => {
    res.render('shop/orders', { pageTitle: "Your Orders", path: "/orders" });
};

// <--------------------- SHOW PRODUCT DETAIL PAGE --------------------> //
exports.getProducts = (req, res) => productModal.productSchema.find().then(products => res.render('shop/index', { prods: products, pageTitle: "Shop", path: '/' }));

// <--------------------- ADD A PRODUCT TO CART (POST) --------------------> //
exports.postCart = (req, res) => {

};

// <--------------------- REMOVE A PRODUCT FROM CART (POST) --------------------> //
exports.postRemoveCartItem = (req, res) => {

};