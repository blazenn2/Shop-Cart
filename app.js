const path = require('path');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

const mongoConnect = require('./util/database').mongoConnect;

const db = require('./util/database').getDb;

mongoConnect(() => {
    app.listen('3000');
});

app.set('view engine', 'ejs');

app.set('views', 'views');

const page404 = require('./controllers/404');

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);

app.use(shopRoutes);

app.use(page404.notFoundPage);