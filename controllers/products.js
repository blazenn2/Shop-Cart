// const products = [];

const productModal = require('../modals/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
    res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    // products.push({ title: req.body.title });
    productModal.product({ pageTitle: req.body.title });
    res.redirect('/');
}

exports.getShop = (req, res, next) => {
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.pug'));
    productModal.viewProduct(products => {
        console.log(products);
        res.render('shop/product-list', { prods: products, pageTitle: "Shop", path: '/' });
    });
}