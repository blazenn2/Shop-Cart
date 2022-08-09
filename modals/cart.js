const fs = require('fs');

const path = require('path');
const { product } = require('./product');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

exports.addProduct = (productId, product) => {
    fs.readFile(p, (err, data) => {
        if (err) console.log(err);
        const cart = JSON.parse(data);
        if (cart?.products) {
            const existingProductIndex = cart.products.findIndex(val => Number(val.id) === Number(productId));
            const existingProduct = cart.products[existingProductIndex];
            if (existingProduct) {
                existingProduct.qty++;
            } else {
                cart.products.push({ id: productId, qty: 1 });
            }
            cart.totalPrice += Number(product.price);
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
        }
        else {
            const productObject = { products: [{ id: product.id, qty: 1 }], totalPrice: Number(product.price) };
            fs.writeFile(p, JSON.stringify(productObject), err => console.log(err));
        }
    });
};