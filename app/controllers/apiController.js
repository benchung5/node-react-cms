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

    //and this is a bit easier too
    app.get('/api/articles', function(req, res) {
        // get the data from the database
        // res.json([

        //     {
        //         id: 1,
        //         title: 'sample title1'
        //     },
        //     {
        //         id: 2,
        //         title: 'sample title2'
        //     }

        // ]);

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


//     //router.get('/admin-react', requireAuth, function (req, res) {
//  router.get('/', function (req, res) {

//     // res.json({ success: 'success' });

//     let userstemp = null;

//     models.User.findAll({
//         include: [models.Task]
//     }).then(function (users) {
//         userstemp = users;
//     }).then(function () { models.Article.findAll({
//     }).then(function (articles) {
//         //template will pick up the isAdminPage variable
//         res.locals.isAdminPage = true;

//         res.render('admin-react', {
//             Pg: req.params.page,
//             Qstr: req.query.qstr,
//             Usrs: userstemp,
//             Artic: articles
//         })
//     })

//     });

// });



}


