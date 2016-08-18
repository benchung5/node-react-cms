//must install and use the body parser module to parse content in a post
// var bodyParser = require('body-parser');
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
var models = require('../models/index');
var express = require('express');
var router  = express.Router();
const passportService = require('./../services/passport');
const passport = require('passport');
const _ = require('lodash');

//sence we use tokens we don't want to use the cookie based session (default)
const requireAuth = passport.authenticate('jwt', { session: false });

//render home template
router.get('/', function (req, res) {
    res.render('index', {
        Slug: 'home'
    });
});


router.get('/login', function (req, res) {

    //template will pick up the isAdminPage variable
    res.locals.isAdminPage = true;

    res.render('login', {
        Pg: req.params.page,
        Qstr: req.query.qstr
    });

});

//render admin template
//run it through our requireAuth middleware
router.get('/admin', requireAuth, function (req, res) {
// router.get('/admin', function (req, res) {

    res.json({ message: 'super secret code!' });

    // let userstemp = null;

    // models.User.findAll({
    //     include: [models.Task]
    // }).then(function (users) {
    //     userstemp = users;
    // }).then(function () { models.Article.findAll({
    // }).then(function (articles) {
    //     //template will pick up the isAdminPage variable
    //     res.locals.isAdminPage = true;

    //     res.render('admin', {
    //         Pg: req.params.page,
    //         Qstr: req.query.qstr,
    //         Usrs: userstemp,
    //         Artic: articles
    //     })
    // })

    // });

});


//example use: http://192.168.99.100/demo-title?qstr=somequery
router.get('/:page', function (req, res) {

    //if database is connected...
    if (!_.isEmpty(models)) {
        models.Article.findById(req.params.page).then(function (article) {
            if (article) {

                // to handle querystrings: Qstr: req.query.qstr
                //put on template: <h2>Querystring Value: <%= Qstr %></h2>
                res.render('internal', {
                    Slug: article.slug,
                    Pg: article.title,
                    Cont: article.body
                });
            } else {
                // models.Article.create({
                //     title: 'Demo Title',
                //     slug: 'demo-title',
                //     body: 'some-text'
                // }).then(function (article) { });
                console.log('logging response error');
                res.status(404).render('404', { Url: req.url });
            }
        });
    } else {
        res.status(500).render('error', {
            message: 'no connection to database. Did you create one?',
            error: {}
        });
    }


    //res.render('internal', { Pg: req.params.page , Qstr: req.query.qstr });

});


//The 404 Route (*ALWAYS Keep this as the last route)
router.get('*', function(req, res){

  // respond with html page
  if (req.accepts('html')) {
    res.status(404).render('404', { Url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');


});

//render internal template (anything but home)
// app.get('*', function(req, res) {
//     res.render('internal');
// });

// //respond to the http method or 'verb'.
// app.get('/:page', function(req, res){
//     //no need to put a content type as express does a best guess at that
//     //id is stored in the url /:id so we can access it
//     // res.send('<html><head><link href=/assets/style.css type=text/css rel=stylesheet /></head><body><h1>Person: ' + 
//     // req.params.id + '</h1></body></html>')
    
// });


module.exports = router;