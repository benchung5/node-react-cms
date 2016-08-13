//using express
//----------------------------------------------------//

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users  = require('./routes/users');
var articles  = require('./routes/articles');
var contact  = require('./routes/contact');
var adminReact  = require('./routes/admin-react');
var favicon = require('serve-favicon');

//express() returns a function and stores it in app.
//calls the create server method like we did manually but maks things easier
var app = express();

var apiController = require('./controllers/apiController.js');

//use an environment variable to change the port # depending if it's deployed on a server or locally.
//express usually uses port 3000 so we can use that as a fallback if no env variable exists
var port = process.env.PORT || 3000;

app.set('views', __dirname + '/views');

//must indicate this to tell node where to look for the view engine if using one.
//by default it will look of for them in a folder called 'views'
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
//using middleware (third party code between two layers of software) - express.static - serves up static content.
//maps the url /assets/img.jpg, etc. This will get referenced below...
app.use('/public', express.static(__dirname + '/public'));

//favicon
app.use(favicon(__dirname + '/public/favicon.ico'));

//route our api controller
apiController(app);

//routes
app.use('/admin-react', adminReact);
app.use('/users', users);
app.use('/articles', articles);
app.use('/contact', contact);
app.use('/', routes);

// // catch 404 and forward to error handler
// app.use(function(req, res, next){
//     var err = new Error('Not Found');
//     err.status = 404;
//     res.status(404).render('404', { Url: req.url });
//     next(err);
// });

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

//set global variables
// app.locals({
//     site: {
//         title: 'Site Title',
//         description: 'Site description.'
//     },
//     author: {
//         name: 'Ben Chung',
//         contact: 'ben@benchung.com'
//     },
//     isAdminPage: false,
//     authenticated: 'true'
// });

// app.locals.isAdminPage = false;
// console.log(app.locals.isAdminPage);

module.exports = app;