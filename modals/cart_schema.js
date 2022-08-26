const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    products: {
        type: [],
        required: true,
        ref: "products"
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

exports.cartSchema = mongoose.model('cart', cartSchema);