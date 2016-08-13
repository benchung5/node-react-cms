var models = require('../models/index');
var express = require('express');
var router  = express.Router();
const passportService = require('./../services/passport');
const passport = require('passport');

//sence we use tokens we don't want to use the cookie based session (default)
const requireAuth = passport.authenticate('jwt', { session: false });

//router.get('/admin-react', requireAuth, function (req, res) {
 router.get('/', function (req, res) {

    // res.json({ success: 'success' });

    let userstemp = null;

    models.User.findAll({
        include: [models.Task]
    }).then(function (users) {
        userstemp = users;
    }).then(function () { models.Article.findAll({
    }).then(function (articles) {
        //template will pick up the isAdminPage variable
        res.locals.isAdminPage = true;

        res.render('admin-react', {
            Pg: req.params.page,
            Qstr: req.query.qstr,
            Usrs: userstemp,
            Artic: articles
        })
    })

    });

});

//router.get('/admin-react', requireAuth, function (req, res) {
 router.get('*', function (req, res) {
    //if user refreshes the page in admin area:
    res.redirect('/admin-react');

});

module.exports = router;