var models = require('../models/index');
var express = require('express');
var router = express.Router();
const jwt = require('jwt-simple');
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config.json')[env];
const passportService = require('./../services/passport');
const passport = require('passport');
const handleError = require('../lib/handle_errors');

function tokenForUser(user) {

    const timestamp = new Date().getTime();
    //sub is for 'subject' of the token is the user - it's a standard for web tokens
    // iat is 'issued at'
    return jwt.encode({ sub: user.id, iat: timestamp }, config.auth.secret);
}

const requireSignin = passport.authenticate('local', { session: false });

router.post('/verify', requireSignin, function (req, res) {

    //User has already had their email and password auth'd
    //we just need to give them a tokens.
    //req.user is from what we implimented in passport.js
    res.send({ token: tokenForUser(req.user) });

});

// post to http://192.168.99.100/users/create
router.post('/create', function (req, res) {
    models.User.create({
        username: req.body.username,
        password: req.body.password,
        fields: ['username', 'password']
    }).then(function (insertedUser) {

        res.json({ token: tokenForUser(insertedUser.dataValues.id) });

    }).catch(function (error) {
        //we must check the error this way because sequelize will handle errors differently
        //depending on what kind of error it is.
        let errorMessage = handleError(error);
        res.json({ error: errorMessage });

    });
});


//http://192.168.99.100/users/delete
router.post('/delete', function (req, res) {

    models.User.destroy({
        where: {
            username: req.body.username
        }
    }).then(function (users) {

        res.json(users);

    }).catch(function (error) {

        //Todo: handle this error on the client end if needed
        let errorMessage = handleError(error);
        res.json({ error: errorMessage });

    });
});

//get all users
router.get('/', function (req, res) {

    models.User.findAll().then(function (users) {
        res.json(users);
    });

});


module.exports = router;