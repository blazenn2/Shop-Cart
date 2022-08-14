const productModal = require('../modals/product');
// const cartModal = require('../modals/cart');

// <--------------------- SHOW PRODUCT PAGE --------------------> //
exports.getShop = (req, res) => productModal.viewProduct().
    then(products => res.render('shop/products', { prods: products, pageTitle: "Products", path: "/products" })).catch(err => console.log(err));

// <---------------------  SHOW INDEX PAGE --------------------> //
exports.getIndex = (req, res) => productModal.viewProduct().
    then(products => res.render('shop/index', { prods: products, pageTitle: "Shop", path: "/" })).catch(err => console.log(err));

// <--------------------- SHOW CART --------------------> //
// exports.getCart = (req, res) => {

// };

// <--------------------- SHOW CHECKOUT PAGE --------------------> //
// exports.getCheckout = (req, res) => {

// };

// <--------------------- SHOW ALL ORDERS --------------------> //
// exports.getOrders = (req, res) => {

// };

// <--------------------- SHOW PRODUCT DETAIL PAGE --------------------> //
// exports.getProducts = (req, res) => {

// };

// <--------------------- ADD A PRODUCT TO CART (POST) --------------------> //
// exports.postCart = (req, res) => {

// };

// <--------------------- REMOVE A PRODUCT FROM CART (POST) --------------------> //
// exports.postRemoveCartItem = (req, res) => {

// };