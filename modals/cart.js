const db = require('../util/database');

const fs = require('fs');

const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

// <--------------------- ADD A PRODUCT TO CART --------------------> //
exports.addProduct = (productId) => {
    return db.execute('SELECT * FROM cart WHERE productId = ', [productId]).then(([[data], fieldata]) => {
        return console.log(data);
    });
    // fs.readFile(p, (err, data) => {
    //     if (err) console.log(err);
    //     const cart = JSON.parse(data);
    //     if (cart?.products) {
    //         const existingProductIndex = cart.products.findIndex(val => Number(val.id) === Number(productId));
    //         const existingProduct = cart.products[existingProductIndex];
    //         if (existingProduct) {
    //             existingProduct.qty++;
    //         } else {
    //             cart.products.push({ id: productId, qty: 1 });
    //         }
    //         cart.totalPrice += Number(product.price);
    //         fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
    //     }
    //     else {
    //         const productObject = { products: [{ id: product.id, qty: 1 }], totalPrice: Number(product.price) };
    //         fs.writeFile(p, JSON.stringify(productObject), err => console.log(err));
    //     }
    // });
};

// <--------------------- REDUCE A PRODUCT FROM CART --------------------> //
exports.deleteCart = (id, productPrice) => {
    fs.readFile(p, (err, data) => {
        if (err) console.log(err);
        const cart = JSON.parse(data);
        const filteredCart = cart.products.filter(val => Number(val.id) !== Number(id));
        if (filteredCart.length !== cart.products.length) {
            const indexOfdeletedProduct = cart.products.findIndex(val => Number(val.id) === Number(id));
            const deletedProductQuantity = cart.products.filter(val => Number(val.id) === Number(id))[0].qty;
            console.log(deletedProductQuantity);
            if (Number(deletedProductQuantity) > 1) cart.products[indexOfdeletedProduct].qty -= 1;
            else cart.products = filteredCart;
            cart.totalPrice = Number(cart.totalPrice) - Number(productPrice);
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
        }
    });
};

// <--------------------- ELIMINATE THE PRODUCT FROM THE CART --------------------> //
exports.deleteWholeProduct = (id) => db.execute('DELETE FROM cart WHERE id = ?', [id]);

// <--------------------- GET ALL PRODUCTS OF CART --------------------> //
exports.getCart = () => db.execute('SELECT *, (SELECT SUM(c.qty * p.price) AS t FROM cart AS c LEFT JOIN products AS p ON c.product_id = p.id) AS totalPrice FROM cart AS c LEFT JOIN products AS p ON c.product_id = p.id');