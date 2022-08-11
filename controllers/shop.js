// const products = [];

const productModal = require('../modals/product');
const cartModal = require('../modals/cart');

exports.getShop = (req, res, next) => {
    // console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.pug'));
    productModal.viewProduct(products => {
        res.render('shop/product-list', { prods: products, pageTitle: "All Products", path: '/products' });
    });
}

exports.getIndex = (req, res) => {
    // res.render('shop/index', { pageTitle: "Shop", path: '/' });
    productModal.viewProduct(products => {
        res.render('shop/index', { prods: products, pageTitle: "Shop", path: '/' });
    });
};

exports.getCart = (req, res) => {
    cartModal.getCart(cart => {
        productModal.viewProduct(products => {
            const cartProducts = [];
            products.forEach(prod => {
                const cartSingleProduct = cart.products.find(val => Number(val.id) === Number(prod.id));
                if (cartSingleProduct) cartProducts.push({ productData: prod, qty: cartSingleProduct.qty });
            });
            res.render('shop/cart', { products: cartProducts, pageTitle: "Your Cart", path: '/cart' });

        });
    })
};

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', { pageTitle: "Checkout", path: "/checkout" });
};

exports.getOrders = (req, res) => {
    res.render('shop/orders', { pageTitle: "Your Orders", path: "/orders" });
};

exports.getProducts = (req, res) => {
    const prodId = req.params.productId;
    productModal.findById(prodId, product => {
        res.render('shop/product-detail', { prods: product, pageTitle: product.title, path: '/products' })
    });
};

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    productModal.findById(prodId, product => {
        cartModal.addProduct(prodId, product);
    });
    res.redirect('/cart');
};

exports.postRemoveCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    productModal.findById(prodId, product => {
        cartModal.deleteCart(prodId, product.price);
    });
    res.redirect('/cart');
};