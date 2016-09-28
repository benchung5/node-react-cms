var models = require('../models/index');
var express = require('express');
var router = express.Router();
const handleError = require('../lib/handle_errors');


// post to http://192.168.99.100/articles/create
router.post('/create', function (req, res) {
    models.Article.create({
        title: req.body.title,
        slug: req.body.slug,
        body: req.body.body
    }).then(function (articles) {

        res.json(articles);

    }).catch(function (error) {

        //we must check the error this way because sequelize will handle errors differently
        //depending on what kind of error it is.
        let errorMessage = handleError(error);

        res.json({ error: errorMessage });

    });
});

//http://192.168.99.100/articles/delete
router.post('/delete', function (req, res) {

    models.Article.destroy({
        where: {
            slug: req.body.slug
        }
    }).then(function (articles) {

        res.json(articles);

    }).catch(function (error) {

        //Todo: handle this error on the client end if needed
        let errorMessage = handleError(error);
        res.json({ error: errorMessage });

    });
});

//get all users
router.get('/', function (req, res) {

    models.Article.findAll().then(function (articles) {
        res.json(articles);
    });

});



module.exports = router;