const getDb = require('../util/database').getDb;

// <--------------------- POST ALL PRODUCTS --------------------> //
exports.addProduct = (product) => {
    const db = getDb();
    return db.collection('products').insertOne(product);
};

// <--------------------- GET ALL PRODUCTS --------------------> //
exports.viewProduct = () => {
    const db = getDb();
    return db.collection('products').find().toArray();
};

// <--------------------- GET A SPECIFIC PRODUCT (SEARCH BY ID) --------------------> //
exports.findById = (productId) => {
    const db = getDb();
    return db.collection('products').findOne({ id: productId }).toArray();
};

// <--------------------- UPDATE A SPECIFIC PRODUCT --------------------> //
exports.updateProduct = (productId, productInfo) => {
    const db = getDb();
    return db.collection('products').update({ id: productId }, { $set: productInfo });
};

// <--------------------- DELETE A PRODUCT (USING ID) --------------------> //
exports.deleteProduct = (productId) => {
    const db = getDb();
    return db.collection('products').remove({ id: productId });
};