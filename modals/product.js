const db = require('../util/database');

// <--------------------- POST ALL PRODUCTS --------------------> //
exports.product = (dataRecieved) => (db.execute('INSERT INTO products (title, imageURL, price, description) VALUES (?, ?, ?, ?)',
    [dataRecieved.title, dataRecieved.imageUrl, dataRecieved.price, dataRecieved.description]));

// <--------------------- GET ALL PRODUCTS --------------------> //
exports.viewProduct = () => (db.execute('SELECT * FROM products'));

// <--------------------- GET A SPECIFIC PRODUCT (SEARCH BY ID) --------------------> //
exports.findById = (id) => db.execute('SELECT * FROM products WHERE id = ?', [id]);

// <--------------------- UPDATE A SPECIFIC PRODUCT --------------------> //
exports.updateProduct = (product) => db.execute('UPDATE products SET title = ?, imageUrl = ?, price = ?, description = ? WHERE id = ? ',
    [product.title, product.imageUrl, product.price, product.description, product.id]);

// <--------------------- DELETE A PRODUCT (USING ID) --------------------> //
exports.deleteProduct = (productId) => db.execute('DELETE FROM products WHERE id = ?', [productId]);