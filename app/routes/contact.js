var express = require('express');
var router  = express.Router();
var sg = require('sendgrid').SendGrid('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')
var helper = require('sendgrid').mail
    

//http://192.168.99.100/contact
router.get('/send', function (req, res) {

    from_email = new helper.Email("test@example.com")
    to_email = new helper.Email("bchung@creativebytesstudios.com")
    subject = "Hello World from the SendGrid Node.js Library!"
    content = new helper.Content("text/plain", "Hello, Email!")
    mail = new helper.Mail(from_email, subject, to_email, content)

    var requestBody = mail.toJSON()
    var request = sg.emptyRequest()
    request.method = 'POST'
    request.path = '/v3/mail/send'
    request.body = requestBody
    sg.API(request, function (response) {
        console.log(response.statusCode)
        console.log(response.body)
        console.log(response.headers)
        res.redirect('/');
    })

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