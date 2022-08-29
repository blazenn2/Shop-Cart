const authModal = require('../modals/auth.js');

exports.getLogin = (req, res) => res.render('auth/login', { pageTitle: "Login", path: '/login', isAuthenticated: false });

exports.postLogin = (req, res) => authModal.login(req.body).then(val => {
    if (val) {
        req.session.isLoggedIn = true;
        req.session.save(err => {
            console.log(err);
            res.redirect('/');
        });
    } else res.redirect('/login');

});

exports.postLogout = (req, res) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getSignup = (req, res) => res.render('auth/signup', { pageTitle: 'Signup', path: '/signup', isAuthenticated: false });

exports.postSignup = (req, res) => authModal.addUser(req.body).then(val => res.redirect('/login'));