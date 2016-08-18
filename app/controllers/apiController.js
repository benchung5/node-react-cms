var models = require('../models/index');

module.exports = function(app) {

    // //and this is a bit easier too
    // app.get('/api/person/:id', function(req, res) {
    //     // get the data from the database
    //     res.json({firstname: 'John', lastname: 'Doe'}); 
    // });

    // app.post('/api/person', function(req, res) {
    //     //save to the database
    // });

    // app.delete('/api/person/:id', function(req, res) {
    //     //delete from the database
    // });

    // post to http://192.168.99.100/api/articles/create
    app.post('/api/articles/create', function (req, res) {
        models.Article.create({
            title: req.body.title,
            slug: req.body.slug,
            body: req.body.body
        }).then(function (articles) {
            
            res.json(articles);

        }).catch(function (error) {
            
           res.json({ error: error.message });
           //return res.status(422).send({ error: 'There was an error creating the article' })

       });
    });


    //and this is a bit easier too
    app.get('/api/articles', function(req, res) {

        let userstemp = null;

        models.User.findAll({
            include: [models.Task]
        }).then(function (users) {
            userstemp = users;
        }).then(function () {
            models.Article.findAll({
            }).then(function (articles) {
                //template will pick up the isAdminPage variable
                // res.locals.isAdminPage = true;
                
                //console.log (res.json(articles));
                res.json(articles);


            })

        });

    });



}


