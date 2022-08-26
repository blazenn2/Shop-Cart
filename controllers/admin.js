const productModal = require('../modals/product');
const cartModal = require('../modals/cart');
var mongoose = require('mongoose');
// var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');

// <--------------------- SHOW ALL PRODUCTS --------------------> //
exports.getProducts = (req, res) => productModal.productSchema.find().then(products => res.render('admin/products', { prods: products, pageTitle: "Products", path: '/admin/products' })).catch(err => console.log(err));

// <--------------------- ADD A NEW PRODUCT --------------------> //
exports.getAddProduct = (req, res) => res.render('admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product', editing: "false" });

// <--------------------- NEW PRODUCT DATA --------------------> //
exports.postAddProduct = (req, res) => new productModal.productSchema({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description
}).save().then(result => res.redirect('/')).catch(err => console.log(err));

// <--------------------- EDIT DETAILS OF AN EXISTING PRODUCT --------------------> //
exports.getEditProduct = (req, res) => productModal.productSchema.find({ _id: mongoose.Types.ObjectId(req.params.productId) }).
    then(([product]) => res.render('admin/edit-product', { prod: product, pageTitle: "Edit Product", path: "/admin/products", editing: "true" })).catch(err => console.log(err));

// <--------------------- DATA RECIEVED FROM THE EDIT FORM --------------------> //
exports.postEditProduct = (req, res) => productModal.productSchema.updateOne({ _id: mongoose.Types.ObjectId(req.body.id) }, {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description
}).then(val => res.redirect('/')).catch(err => console.log(err));

// <--------------------- DELETE AN EXISTING PRODUCT --------------------> //
exports.postDeleteProduct = (req, res) => cartModal.deleteWholeCart(req.body.id).then(val => res.redirect('/')).catch(err => console.log(err));