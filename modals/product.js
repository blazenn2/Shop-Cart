const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// <-------------------- PRODUCT SCHEMA DECLARATION --------------------> //

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

exports.productSchema = mongoose.model('products', productSchema);