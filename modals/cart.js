const getDb = require('../util/database').getDb;
const ObjectId = require('../util/database').ObjectId;

// <--------------------- GET ALL PRODUCTS OF CART --------------------> //
exports.getCart = async () => {
    const db = getDb();
    const [cart] = await db.collection('cart').find().toArray();
    console.log(cart.products);
    // return db.collection('cart').find().toArray();
};

// <--------------------- ADD A PRODUCT TO CART --------------------> //
exports.addProduct = async (productId) => {
    const db = getDb();
    const productObjectId = ObjectId(productId);
    const [findProduct] = await db.collection('products').find({ _id: productObjectId }).toArray();

    const [findCartProduct] = await db.collection('cart').find({ products: { $elemMatch: { productId: findProduct._id } } }).toArray();
    const cartObject = await db.collection('cart').find();
    console.log(findCartProduct);
    if (!findCartProduct && !cartObject.totalPrice) return db.collection('cart').insert({ products: [{ productId: productObjectId, qty: 1 }], totalPrice: findProduct.price });
    // else return db.collection('cart').update({ products: { $elemMatch: { productId: findProduct._id } } }, { $set: { products: [{ productId: productObjectId, qty: (findCartProduct.products.qty + 1) }] }, totalPrice: price })
    // return db.collection('cart').find({ productId: productObjectId }).then(product => {
    //     if (product) return db.collection('products').update({ productId: productObjectId }, { $inc: { qty: 1 } });
    //     else return db.collection('cart').insert({ productId: [{ productId: productObjectId, qty: 1 }] });
    // });
    // return db.collection('cart').update({ products: { $elemMatch: { productId: findProduct._id } } }, { $set: { products: [{ productId: productObjectId, qty: 1 }] } }).toArray();
};

// <--------------------- REDUCE A PRODUCT FROM CART --------------------> //
// exports.removeItemFromCart = () => {

// };

// <--------------------- ELIMINATE THE PRODUCT FROM THE CART --------------------> //
// exports.deleteWholeProduct = () => {

// }