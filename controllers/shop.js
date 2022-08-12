const productModal = require('../modals/product');
const cartModal = require('../modals/cart');

// <--------------------- GET ALL PRODUCTS FROM CART --------------------> //
exports.getShop = (req, res, next) => productModal.viewProduct().
    then(([data, fieldData]) => res.render('shop/product-list', { prods: data, pageTitle: "Shop", path: '/products' })).catch(err => console.log(err));

exports.getIndex = (req, res) => productModal.viewProduct().
    then(([data, fieldData]) => res.render('shop/index', { prods: data, pageTitle: "Shop", path: '/' })).catch(err => console.log(err));

exports.getCart = (req, res) => cartModal.getCart().
    then(([data, fieldData]) => res.render('shop/cart', { products: data, pageTitle: "Your Cart", path: '/cart' })).catch(err => console.log(err));

exports.getCheckout = (req, res) => res.render('shop/checkout', { pageTitle: "Checkout", path: "/checkout" });

exports.getOrders = (req, res) => res.render('shop/orders', { pageTitle: "Your Orders", path: "/orders" });

exports.getProducts = (req, res) => {
    const prodId = req.params.productId;
    productModal.findById(prodId).then(([[data], fieldData]) => res.render('shop/product-detail', { prods: data, pageTitle: data.title, path: '/products' }));
};

exports.postCart = (req, res) => {
    // const prodId = req.body.productId;
    productModal.findById(req.body.productId);
    res.redirect('/cart');
};

exports.postRemoveCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    productModal.findById(prodId, product => {
        cartModal.deleteCart(prodId, product.price);
    });
    res.redirect('/cart');
};