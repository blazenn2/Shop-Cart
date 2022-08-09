// const products = [];

const productModal = require('../modals/product');
const cartModal = require('../modals/cart');

exports.getShop = (req, res, next) => {
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.pug'));
    productModal.viewProduct(products => {
        res.render('shop/product-list', { prods: products, pageTitle: "All Products", path: '/products' });
    });
}

exports.getIndex = (req, res) => {
    // res.render('shop/index', { pageTitle: "Shop", path: '/' });
    productModal.viewProduct(products => {
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

exports.getProducts = (req, res) => {
    const prodId = req.params.productId;
    productModal.findById(prodId, product => {
        console.log(product);
        res.render('shop/product-detail', { prods: product, pageTitle: product.title, path: '/products' })
    });
};

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    productModal.findById(prodId, product => {
        // console.log(product);
        cartModal.addProduct(prodId, product);
    });
    res.redirect('/cart');
};