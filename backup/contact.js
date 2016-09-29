var models = require('../models/index');
const _ = require('lodash');
var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail
var sg = require('sendgrid')('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');
//var sg = require('sendgrid').SendGrid('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');



//http://192.168.99.100/contact/send
// router.post('/send', function (req, res) {

//     //from_email = new helper.Email("test@example.com")
//     from_email = new helper.Email(req.body.email);
//     to_email = new helper.Email("ben@benchung.com")
//     subject = "New contact form submission from your website!"
//     //content = new helper.Content("text/plain", "Hello, Email!")
//     content = new helper.Content("text/plain", req.body.message)
//     mail = new helper.Mail(from_email, subject, to_email, content)

//     var requestBody = mail.toJSON()
//     var request = sg.emptyRequest()
//     request.method = 'POST'
//     request.path = '/v3/mail/send'
//     request.body = requestBody
//     sg.API(request, function (response) {
//         console.log(response.statusCode)
//         console.log(response.body)
//         console.log(response.headers)
//         res.redirect('/contact');
//     });

// });

//http://192.168.99.100/contact/send
router.post('/send', function (req, res, next) {


    //validate the form (express-validator)
    req.checkBody('email', 'A valid email is required').isEmail(); //Validate email
    req.checkBody('message', 'Message is required').notEmpty(); //Validate message


    var errors = req.validationErrors();
    //No errors were found.  Passed Validation!
    if (!errors) {

        from_email = new helper.Email(req.body.email);
        to_email = new helper.Email("ben@benchung.com");
        subject = "New contact form submission from your website!";
        content = new helper.Content("text/plain", req.body.message);
        mail = new helper.Mail(from_email, subject, to_email, content);

        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });
        sg.API(request, function (error, response) {

            if (error) { 
                res.json('error: ' + error);
            }

            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);

            //if database is connected...
            if (!_.isEmpty(models)) {


                let articlesTemp = null;

                models.Article.findAll().then(function (articles) {
                    articlesTemp = articles;
                }).then(function () {
                    models.Article.findById('contact').then(function (article) {
                        if (article) {
                            //redirect to the content page url with query parameter
                            res.redirect('/contact' + '?sent=' + true);

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
    }
    //Display errors to user
    else {

    }

});


// var sendgrid = require('sendgrid').SendGrid('1pixkey', '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');

// //http://192.168.99.100/contact
// router.get('/send', function (req, res) {
//     console.log('foo');
//     sendgrid.send({
//         to: 'ben@benchung.com',
//         from: 'noreply@site.com',
//         subject: 'Hello World',
//         text: 'My first sendgrid email'
//     }), function (err, json) {
//         if (err) { return console.error(err); }
//         console.log(json);
//     }
//     res.redirect('/');
// });

module.exports = router;