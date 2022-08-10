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

exports.deleteProduct = (id, productPrice) => {
    fs.readFile(p, (err, data) => {
        if (err) console.log(err);
        const cart = JSON.parse(data);
        const productIndex = cart.products.findIndex(val => Number(val.id) === Number(id));
        let finalCart;
        if (cart.products[productIndex].qty === 1) finalCart = cart.products.filter(val => Number(val.id) !== Number(id));
        else {
            cart.products[productIndex].qty -= 1;
            cart.totalPrice -= productPrice;
            finalCart = cart;
        }
        fs.writeFile(p, JSON.stringify(finalCart), err => console.log(err));
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