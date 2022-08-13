const db = require('../util/database');

const fs = require('fs');

const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

// <--------------------- ADD A PRODUCT TO CART --------------------> //
exports.addProduct = (productId) => db.execute('SELECT * FROM cart WHERE product_id = ?', [productId]).then(([[data], fieldata]) => {
    if (data) db.execute('UPDATE cart SET qty = ? WHERE product_id = ?', [(data.qty + 1), data.product_id]).catch(err => console.log(err));
    else db.execute('INSERT INTO cart (product_id, qty) VALUES (?, ?)', [productId, 1]).catch(err => console.log(err));
});

// <--------------------- REDUCE A PRODUCT FROM CART --------------------> //
exports.deleteCart = (id) => db.execute("SELECT * FROM cart WHERE product_id = ?", [id]).then(([[data], fieldData]) => {
    if (data && data.qty > 1) db.execute("UPDATE cart SET qty = ? WHERE product_id = ?", [(data.qty - 1), data.product_id]).catch(err => console.log(err));
    if (data && data.qty === 1) db.execute("DELETE FROM cart WHERE product_id = ?", [data.product_id]).catch(err => console.log(err));
});

// <--------------------- ELIMINATE THE PRODUCT FROM THE CART --------------------> //
exports.deleteWholeProduct = (id) => db.execute('DELETE FROM cart WHERE id = ?', [id]);

// <--------------------- GET ALL PRODUCTS OF CART --------------------> //
exports.getCart = () => db.execute('SELECT *, (SELECT SUM(c.qty * p.price) AS t FROM cart AS c LEFT JOIN products AS p ON c.product_id = p.id) AS totalPrice FROM cart AS c LEFT JOIN products AS p ON c.product_id = p.id');