const fs = require('fs');

const path = require('path');

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
            // console.log(cart);
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err));
        }
    });
};

exports.deleteWholeProduct = (id, productPrice) => {
    fs.readFile(p, (err, data) => {
        if (err) console.log(err);
        const cart = JSON.parse(data);
        const filteredCart = cart.products.filter(val => Number(val.id) !== Number(id));
        if (filteredCart.length !== cart.products.length) {
            const deletedProductQuantity = cart.products.filter(val => Number(val.id) === Number(id))[0].qty;
            const newPrice = Number(cart.totalPrice) - (Number(deletedProductQuantity) * Number(productPrice));
            const newCart = { products: filteredCart, totalPrice: newPrice };
            fs.writeFile(p, JSON.stringify(newCart), err => console.log(err));
        }
    });
}

exports.getCart = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) return cb([]);
        const cart = JSON.parse(data);
        return cb(cart);
    });
};