// const products = [];

const productModal = require('../modals/product');
const cartModal = require('../modals/cart');

exports.getShop = (req, res, next) => {

}

exports.getIndex = (req, res) => {

};

exports.getCart = (req, res) => {

};

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrders = (req, res) => {
    res.render('shop/orders', { pageTitle: "Your Orders", path: "/orders" });
};

exports.getProducts = (req, res) => {

};

exports.postCart = (req, res) => {

};

exports.postRemoveCartItem = (req, res, next) => {

};