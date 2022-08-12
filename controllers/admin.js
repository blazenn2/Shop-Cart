const productModal = require('../modals/product');

// <--------------------- SHOW ALL PRODUCTS --------------------> //
exports.getProducts = (req, res) => productModal.viewProduct().
    then(([data, fieldData]) => res.render('admin/products', { prods: data, pageTitle: 'Admin Products', path: '/admin/products' })).catch(err => console.log(err));

// <--------------------- ADD A NEW PRODUCT --------------------> //
exports.getAddProduct = (req, res, next) => res.render('admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product', editing: "false" });

// <--------------------- NEW PRODUCT DATA --------------------> //
exports.postAddProduct = (req, res) => productModal.product({ title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description }).
    then(() => res.redirect('/')).catch(error => console.log(error));

// <--------------------- EDIT DETAILS OF AN EXISTING PRODUCT --------------------> //
exports.getEditProduct = (req, res, next) => {
    productModal.findById(req.params.productId)
        .then(([[data], fieldData]) => data ? res.render('admin/edit-product', { prod: data, pageTitle: 'Edit Product', path: '/admin/edit-product', editing: req.query.edit }) : res.redirect('/'))
        .catch(err => console.log(err));
};

// <--------------------- DATA RECIEVED FROM THE EDIT FORM --------------------> //
exports.postEditProduct = (req, res) => {
    productModal.updateProduct({ id: req.body.id, title: req.body.title, imageUrl: req.body.imageUrl, price: req.body.price, description: req.body.description }).
        then(val => res.redirect('/')).catch(err => console.log(err));
};

// <--------------------- DELETE AN EXISTING PRODUCT --------------------> //
exports.postDeleteProduct = (req, res) => productModal.deleteProduct(req.body.id).then(val => res.redirect('/')).catch(err => console.log(err));