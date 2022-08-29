exports.notFoundPage = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.pug'));
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '', isAuthenticated: req.session.isLoggedIn });
}