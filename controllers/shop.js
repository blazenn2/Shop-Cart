const productModal = require('../modals/product');
const cartModal = require('../modals/cart');

// <--------------------- SHOW PRODUCT PAGE --------------------> //
exports.getShop = (req, res, next) => productModal.viewProduct().
    then(([data, fieldData]) => res.render('shop/product-list', { prods: data, pageTitle: "Shop", path: '/products' })).catch(err => console.log(err));

// <---------------------  SHOW INDEX PAGE --------------------> //
exports.getIndex = (req, res) => productModal.viewProduct().
    then(([data, fieldData]) => res.render('shop/index', { prods: data, pageTitle: "Shop", path: '/' })).catch(err => console.log(err));

// <--------------------- SHOW CART --------------------> //
exports.getCart = (req, res) => cartModal.getCart().
    then(([data, fieldData]) => res.render('shop/cart', { products: data, pageTitle: "Your Cart", path: '/cart' })).catch(err => console.log(err));

// <--------------------- SHOW CHECKOUT PAGE --------------------> //
exports.getCheckout = (req, res) => res.render('shop/checkout', { pageTitle: "Checkout", path: "/checkout" });

// <---------------------  --------------------> //
exports.getOrders = (req, res) => res.render('shop/orders', { pageTitle: "Your Orders", path: "/orders" });

// <--------------------- SHOW PRODUCT DETAIL PAGE --------------------> //
exports.getProducts = (req, res) => {
    const prodId = req.params.productId;
    productModal.findById(prodId).then(([[data], fieldData]) => res.render('shop/product-detail', { prods: data, pageTitle: data.title, path: '/products' }));
};

// <--------------------- ADD A PRODUCT TO CART (POST) --------------------> //
exports.postCart = (req, res) => cartModal.addProduct(req.body.productId).
    then(val => res.redirect('/cart')).catch(err => console.log(err));

// <--------------------- REMOVE A PRODUCT FROM CART (POST) --------------------> //
exports.postRemoveCartItem = (req, res, next) => cartModal.deleteCart(req.body.productId).
    then(val => res.redirect('/cart')).catch(err => console.log(err));