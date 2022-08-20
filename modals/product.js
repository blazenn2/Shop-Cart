const getDb = require('../util/database').getDb;
const ObjectId = require('../util/database').ObjectId;
const cartModal = require('./cart');

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
    const productObjectId = ObjectId(productId);
    return db.collection('products').find({ _id: productObjectId }).toArray();
};

// <--------------------- UPDATE A SPECIFIC PRODUCT --------------------> //
exports.updateProduct = (updatedProduct) => {
    const db = getDb();
    const productObj = {
        _id: ObjectId(updatedProduct.id),
        title: updatedProduct.title,
        description: updatedProduct.description,
        imageUrl: updatedProduct.imageUrl,
        price: updatedProduct.price
    }
    return db.collection('products').update({ _id: ObjectId(updatedProduct.id) }, { $set: productObj });
};

// <--------------------- DELETE A PRODUCT (USING ID) --------------------> //
exports.deleteProduct = async (productId) => {
    const db = getDb();
    const productObejctId = ObjectId(productId);
    const [product] = await db.collection('products').find({ _id: productObejctId }).toArray();
    cartModal.deleteWholeProduct(productObejctId, product.price);
    return db.collection('products').remove({ _id: productObejctId });
};