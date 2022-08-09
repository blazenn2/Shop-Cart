const fs = require('fs');

const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

exports.product = (dataRecieved) => {
    let products = [];
    fs.readFile(p, (err, data) => {
        if (!err) products = JSON.parse(data);
        dataRecieved.id = Math.random().toString();
        products.push(dataRecieved);
        fs.writeFile(p, JSON.stringify(products), err => console.log(err));
    });
};

exports.viewProduct = (cb) => {
    fs.readFile(p, (err, data) => {
        if (err) return cb([]);
        return cb(JSON.parse(data));
    });
};

exports.findById = (id, cb) => {
    fs.readFile(p, (err, data) => {
        if (err) return cb([]);
        const products = JSON.parse(data);
        return cb(products.find(val => Number(val.id) === Number(id)));
    });
}