const productModal = require('../modals/product');

exports.getProducts = (req, res) => {
    productModal.viewProduct(products => {
        res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' });
    });
};

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
    res.render('admin/add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
};

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    // products.push({ title: req.body.title });
    productModal.product({ title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description});
    res.redirect('/');
}