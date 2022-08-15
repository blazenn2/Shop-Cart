const productModal = require('../modals/product');
const cartModal = require('../modals/cart');

// <---------------------  SHOW INDEX PAGE --------------------> //
exports.getIndex = (req, res) => productModal.viewProduct().
    then(products => res.render('shop/index', { prods: products, pageTitle: "Shop", path: "/" })).catch(err => console.log(err));

// <--------------------- SHOW PRODUCT PAGE --------------------> //
exports.getShop = (req, res) => productModal.viewProduct().
    then(products => res.render('shop/product-list', { prods: products, pageTitle: "Products", path: "/products" })).catch(err => console.log(err));

// <--------------------- SHOW CART --------------------> //
exports.getCart = (req, res) => cartModal.getCart().then(cart => res.render('shop/cart', { products: cart, pageTitle: "Cart", path: '/cart' }));

// <--------------------- SHOW CHECKOUT PAGE --------------------> //
// exports.getCheckout = (req, res) => {

// };

// <--------------------- SHOW ALL ORDERS --------------------> //
// exports.getOrders = (req, res) => {

// };

// <--------------------- SHOW PRODUCT DETAIL PAGE --------------------> //
exports.getProducts = (req, res) => productModal.findById(req.params.productId).
    then(([product]) => res.render('shop/product-detail', { prods: product, pageTitle: product.title, path: '/products' })).catch(err => console.log(err));

// <--------------------- ADD A PRODUCT TO CART (POST) --------------------> //
exports.postCart = (req, res) => cartModal.addProduct(req.body.productId).then(val => res.redirect('/cart')).catch(err => console.log(err));;

// <--------------------- REMOVE A PRODUCT FROM CART (POST) --------------------> //
// exports.postRemoveCartItem = (req, res) => {

// };