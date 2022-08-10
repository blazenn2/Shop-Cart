const productModal = require('../modals/product');

exports.getProducts = (req, res) => {
    productModal.viewProduct(products => {
        res.render('admin/products', { prods: products, pageTitle: 'Admin Products', path: '/admin/products' });
    });
};

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.pug'));
    res.render('admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product', editing: "false" });
};

exports.postAddProduct = (req, res, next) => {
    // console.log(req.body);
    // products.push({ title: req.body.title });
    productModal.product({ title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description });
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;
    if (!editMode) return res.redirect('/');
    productModal.findById(productId, (product => {
        if (!product) return res.redirect('/');
        res.render('admin/edit-product', { prod: product, pageTitle: 'Edit Product', path: '/admin/edit-product', editing: editMode });
    }));
};

exports.postEditProduct = (req, res) => {
    productModal.updateProduct({ id: req.body.id, title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description });
    res.redirect('/');
};

exports.postDeleteProduct = (req, res) => {
    productModal.deleteProduct(req.body.id);
    res.redirect('/');
};