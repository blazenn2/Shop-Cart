const productModal = require('../modals/product');

// <--------------------- SHOW ALL PRODUCTS --------------------> //
// exports.getProducts = (req, res) => {
    
// };

// <--------------------- ADD A NEW PRODUCT --------------------> //
exports.getAddProduct = (req, res) => res.render('admin/edit-product', { pageTitle: 'Add Product', path: '/admin/add-product', editing: "false" });

// <--------------------- NEW PRODUCT DATA --------------------> //
exports.postAddProduct = (req, res) => productModal.addProduct({title: req.body.title, description: req.body.description, imageUrl: req.body.imageUrl, price: req.body.price}).
    then(val => res.redirect('/')).catch(err => console.log(err));

// <--------------------- EDIT DETAILS OF AN EXISTING PRODUCT --------------------> //
// exports.getEditProduct = (req, res) => {
    
// };

// <--------------------- DATA RECIEVED FROM THE EDIT FORM --------------------> //
// exports.postEditProduct = (req, res) => {
    
// };

// <--------------------- DELETE AN EXISTING PRODUCT --------------------> //
// exports.postDeleteProduct = (req, res) => {
    
// };