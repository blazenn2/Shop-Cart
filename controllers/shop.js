const productModal = require('../modals/product');
const cartModal = require('../modals/cart');
const schema = require('../modals/cart_schema');
var mongoose = require('mongoose');
// var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

// <--------------------- SHOW INDEX PAGE --------------------> //
exports.getIndex = (req, res) => productModal.productSchema.find().then(products => res.render('shop/index', { prods: products, pageTitle: "Shop", path: '/' }));

// <--------------------- SHOW PRODUCT PAGE --------------------> //
exports.getShop = (req, res) => productModal.productSchema.find().then(products => res.render('shop/product-list', { prods: products, pageTitle: "Products", path: "/products" })).catch(err => console.log(err));

// <--------------------- SHOW CART --------------------> //
exports.getCart = (req, res) => cartModal.getCart().then(cart => res.render('shop/cart', { products: cart, pageTitle: "Cart", path: '/cart' }));

// <--------------------- SHOW CHECKOUT PAGE --------------------> //
exports.getCheckout = (req, res) => res.render('shop/checkout', { pageTitle: "Checkout", path: "/checkout" });

// <--------------------- SHOW ORDERS PAGE --------------------> //
exports.getOrders = (req, res) => res.render('shop/orders', { pageTitle: "Your Orders", path: "/orders" });

// <--------------------- SHOW PRODUCT DETAIL PAGE --------------------> //
exports.getProducts = (req, res) => productModal.productSchema.find({ _id: mongoose.Types.ObjectId(req.params.productId) }).
    then(([products]) => res.render('shop/product-detail', { prods: products, pageTitle: "Shop", path: '/products' }));

// <--------------------- ADD A PRODUCT TO CART (POST) --------------------> //
exports.postCart = async (req, res) => cartModal.addToCart(req.body).then(val => res.redirect('/cart')).catch(err => console.log(err));

// <--------------------- REMOVE A PRODUCT FROM CART (POST) --------------------> //
exports.postRemoveCartItem = (req, res) => cartModal.deleteCart(req.body.productId).then(val => res.redirect('/cart'));