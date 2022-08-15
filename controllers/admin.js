const productModal = require('../modals/product');

// <--------------------- SHOW ALL PRODUCTS --------------------> //
exports.getProducts = (req, res) => productModal.viewProduct().
    then(products => res.render('admin/products', { prods: products, pageTitle: "Products", path: "/products" })).catch(err => console.log(err));

// <--------------------- ADD A NEW PRODUCT --------------------> //
exports.getAddProduct = (req, res) => res.render('admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product', editing: "false" });

// <--------------------- NEW PRODUCT DATA --------------------> //
exports.postAddProduct = (req, res) => productModal.addProduct({ title: req.body.title, description: req.body.description, imageUrl: req.body.imageUrl, price: req.body.price }).
    then(val => res.redirect('/')).catch(err => console.log(err));

// <--------------------- EDIT DETAILS OF AN EXISTING PRODUCT --------------------> //
exports.getEditProduct = (req, res) => productModal.findById(req.params.productId).
    then(([product]) => res.render('admin/edit-product', { prod: product, pageTitle: "Edit Product", path: "/admin/products", editing: "true" })).catch(err => console.log(err));

// <--------------------- DATA RECIEVED FROM THE EDIT FORM --------------------> //
exports.postEditProduct = (req, res) => productModal.updateProduct(req.body).then(val => res.redirect('/')).catch(err => console.log(err));

// <--------------------- DELETE AN EXISTING PRODUCT --------------------> //
exports.postDeleteProduct = (req, res) => productModal.deleteProduct(req.body.id).then(val => res.redirect('/')).catch(err => console.log(err));