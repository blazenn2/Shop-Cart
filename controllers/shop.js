// const products = [];

const productModal = require('../modals/product');

exports.getShop = (req, res, next) => {
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.pug'));
    productModal.viewProduct(products => {
        // console.log(products);
        res.render('shop/product-list', { prods: products, pageTitle: "All Products", path: '/products' });
    });
}

exports.getIndex = (req, res) => {
    // res.render('shop/index', { pageTitle: "Shop", path: '/' });
    productModal.viewProduct(products => {
        // console.log(products);
        res.render('shop/index', { prods: products, pageTitle: "Shop", path: '/' });
    });
};

exports.getCart = (req, res) => {
    res.render('shop/cart', { pageTitle: "Your Cart", path: '/cart' });
};

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrders = (req, res) => {
    res.render('shop/orders', { pageTitle: "Your Orders", path: "/orders" });
};