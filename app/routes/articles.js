var models = require('../models/index');
var express = require('express');
var router  = express.Router();

// post to http://192.168.99.100/articles/create
router.post('/create', function (req, res) {
    models.Article.create({
        title: req.body.title,
        slug: req.body.slug,
        body: req.body.body
    }).then(function (articles) {
        res.redirect('/admin');
    });
});


module.exports = router;