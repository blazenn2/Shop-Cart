const schema = require('./cart_schema');
const productModal = require('./product');
const mongoose = require('mongoose');

exports.addToCart = async (productObject) => {
    const [getWholeCart] = await schema.cartSchema.find();
    if (getWholeCart) {
        const [findProduct] = await schema.cartSchema.find({ 'products': { $elemMatch: { productId: mongoose.Types.ObjectId(productObject.productId) } } });
        if (findProduct) {
            const [product] = findProduct.products.filter(val => val.productId.toString() === productObject.productId);
            await schema.cartSchema.updateOne({ "products.productId": product.productId }, { $inc: { 'products.$.qty': 1 } });
            await schema.cartSchema.updateOne({ "_id": getWholeCart._id }, { $inc: { totalPrice: productObject.price } });
        }
        else {
            console.log("No product found");
            await schema.cartSchema.updateOne({ "_id": getWholeCart._id }, { $push: { products: { productId: mongoose.Types.ObjectId(productObject.productId), qty: 1 } } });
            await schema.cartSchema.updateOne({ "_id": getWholeCart._id }, { $inc: { totalPrice: productObject.price } });
        }
    }
    else {
        console.log("HERE!");
        schema.cartSchema.create({
            products: [{
                productId: mongoose.Types.ObjectId(productObject.productId),
                qty: 1
            }],
            totalPrice: Number(productObject.price)
        });
    };
};

exports.getCart = async () => {
    const [allProducts] = await schema.cartSchema.find();
    const cart = [];
    if (allProducts?.products) {
        for (let product of allProducts.products) {
            const [value] = await productModal.productSchema.find({ "_id": product.productId });
            value.qty = product.qty;
            cart.push(value);
        };
    }
    return cart;
};

exports.deleteCart = async (productId) => {
    const [product] = await productModal.productSchema.find({ "_id": mongoose.Types.ObjectId(productId) });
    const [allCartProduct] = await schema.cartSchema.find({ "products.productId": mongoose.Types.ObjectId(productId) });
    const [cart] = allCartProduct.products.filter(val => val.productId.toString() === productId);
    if (cart.qty > 1) {
        await schema.cartSchema.updateOne({ "products.productId": mongoose.Types.ObjectId(productId) }, { $inc: { "products.$.qty": -1 } });
        await schema.cartSchema.updateOne({ "_id": allCartProduct._id }, { $inc: { "totalPrice": -product.price } });
    } else {
        await schema.cartSchema.updateOne({ "products.productId": mongoose.Types.ObjectId }, { $pull: { "products": { "productId": product._id } } });
        await schema.cartSchema.updateOne({ "_id": allCartProduct._id }, { $inc: { "totalPrice": -product.price } });
    }
};


exports.deleteWholeCart = async (productId) => {
    const productObjectId = mongoose.Types.ObjectId(productId);
    const cart = await schema.cartSchema.findOne({ "products.productId": productObjectId });
    if (cart) {
        const [product] = await productModal.productSchema.find({ "_id": productObjectId });
        const [quantity] = cart.products.filter(val => val.productId.toString() === productId);
        const reducePrice = quantity.qty * product.price;

        await schema.cartSchema.updateOne({ "products.productId": productObjectId }, { $pull: { "products": { "productId": productObjectId } } });
        await schema.cartSchema.updateOne({ "_id": cart._id }, { $inc: { "totalPrice": -reducePrice } });
    }

    await productModal.productSchema.remove({ _id: productObjectId })
};