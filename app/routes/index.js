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


//render contact page template
router.get('/contact', function (req, res) {

    //if database is connected...
    if (!_.isEmpty(models)) {


        let articlesTemp = null;

        models.Article.findAll().then(function (articles) {
            articlesTemp = articles;
        }).then(function () {
                models.Article.findById('contact').then(function (article) {
                if (article) {

                    // to handle querystrings: Qstr: req.query.qstr
                    //put on template: <h2>Querystring Value: <%= Qstr %></h2>
                    res.render('contact', {
                        Slug: article.slug,
                        Pg: article.title,
                        Cont: article.body,
                        Articles: articlesTemp
                    });
                } else {
                    console.log('logging response error');
                    res.status(404).render('404', { Url: req.url });
                }
            });

        });

    } else {
        res.status(500).render('error', {
            message: 'no connection to database. Did you create one?',
            error: {}
        });
    }

});

//render home template
router.get('/', function (req, res) {

    if (!_.isEmpty(models)) {

        models.Article.findAll().then(function(articles) {
            res.render('index', {
                Slug: 'home',
                Articles: articles
            });
        });

    } else {
        res.status(500).render('error', {
            message: 'no connection to database. Did you create one?',
            error: {}
        });
    }
    
});


//example use: http://192.168.99.100/demo-title?qstr=somequery
router.get('/:page', function (req, res) {

    //if database is connected...
    if (!_.isEmpty(models)) {


        let articlesTemp = null;

        models.Article.findAll().then(function (articles) {
            articlesTemp = articles;
        }).then(function () {
                models.Article.findById(req.params.page).then(function (article) {
                if (article) {

                    // to handle querystrings: Qstr: req.query.qstr
                    //put on template: <h2>Querystring Value: <%= Qstr %></h2>
                    res.render('internal', {
                        Slug: article.slug,
                        Pg: article.title,
                        Cont: article.body,
                        Articles: articlesTemp
                    });
                } else {
                    console.log('logging response error');
                    res.status(404).render('404', { Url: req.url });
                }
            });

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


module.exports = router;