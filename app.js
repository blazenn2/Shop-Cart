require('dotenv').config()

const path = require('path');

const session = require('express-session');

const MongoDBStore = require('connect-mongodb-session')(session);

const express = require('express');

const page404 = require('./controllers/404');

const bodyParser = require('body-parser');

const app = express();

const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
    uri: process.env.MONGODB,
    collection: 'sessions'
});

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const authRoutes = require('./routes/auth');

app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);

app.use(shopRoutes);

app.use(authRoutes);

app.use(page404.notFoundPage);

mongoose.connect(process.env.MONGODB).then(result => {
    app.listen(3000);
    console.log("Connected to DB");
}).catch(err => console.log(err));