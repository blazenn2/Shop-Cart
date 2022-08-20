const getDb = require('../util/database').getDb;
const ObjectId = require('../util/database').ObjectId;

// <--------------------- GET ALL PRODUCTS OF CART --------------------> //
exports.getCart = async () => {
    const db = getDb();
    const [cart] = await db.collection('cart').find().toArray();
    const productArray = [];
    for (let i = 0; i < (cart.products).length; i++) {
        let [product] = await db.collection('products').find({ "_id": cart.products[i].productId }).toArray();
        product.qty = cart.products[i].qty;
        productArray.push(product);
    };
    return productArray;
};

// <--------------------- ADD A PRODUCT TO CART --------------------> //
exports.addProduct = async (productId) => {
    const db = getDb();
    const productObjectId = ObjectId(productId);
    const [findProduct] = await db.collection('products').find({ _id: productObjectId }).toArray();
    const [findCart] = await db.collection('cart').find({ products: { $elemMatch: { productId: findProduct._id } } }).toArray();

    if (findCart) {
        await db.collection('cart').update({ "products.productId": findProduct._id }, { $inc: { "products.$.qty": 1 } });
        await db.collection('cart').update({ "_id": findCart._id }, { $inc: { "totalPrice": Number(findProduct.price) } });
    }
    else {
        const [cart] = await db.collection('cart').find().toArray();
        if (cart) {
            await db.collection('cart').update({ "_id": cart._id }, { $push: { "products": { "productId": productObjectId, "qty": 1 } } });
            await db.collection('cart').update({ "_id": cart._id }, { $inc: { "totalPrice": Number(findProduct.price) } });
        }
        else {
            await db.collection('cart').insertOne({ "products": [{ "productId": productObjectId, "qty": 1 }], "totalPrice": Number(findProduct.price) });
            await db.collection('cart').update({ "_id": cart._id }, { $inc: { "totalPrice": Number(findProduct.price) } });
        }
    };
};

// <--------------------- REDUCE A PRODUCT FROM CART --------------------> //
exports.removeItemFromCart = async (productId) => {
    const db = getDb();
    const productObjectId = ObjectId(productId);

    const [findProduct] = await db.collection('products').find({ _id: productObjectId }).toArray();
    const [findCart] = await db.collection('cart').find({ products: { $elemMatch: { productId: findProduct._id } } }).toArray();
    if (findCart.products.some(val => (val.productId.toString() === findProduct._id.toString() && Number(val.qty) === 1))) {
        await db.collection('cart').update({ "_id": findCart._id }, { $pull: { products: { productId: productObjectId } } });
        await db.collection('cart').update({ "_id": findCart._id }, { $inc: { "totalPrice": -Number(findProduct.price) } });
    }
    else {
        await db.collection('cart').update({ "products.productId": findProduct._id }, { $inc: { "products.$.qty": -1 } });
        await db.collection('cart').update({ "_id": findCart._id }, { $inc: { "totalPrice": -Number(findProduct.price) } });
    }
};

// <--------------------- ELIMINATE THE PRODUCT FROM THE CART --------------------> //
exports.deleteWholeProduct = async (productId, price) => {
    const db = getDb();
    const [getCart] = await db.collection('cart').find().toArray();
    const [product] = getCart.products.filter(val => val.productId.toString() === productId.toString());
    const priceToReduce = getCart.totalPrice - product.qty * price
    await db.collection('cart').update({ "_id": getCart._id }, { $pull: { products: { productId: productId } } });
    await db.collection('cart').update({ "_id": getCart._id }, { $set: { "totalPrice": priceToReduce } });
}