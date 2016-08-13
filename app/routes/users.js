var models = require('../models/index');
var express = require('express');
var router  = express.Router();
const jwt = require('jwt-simple');
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config.json')[env];
const passportService = require('./../services/passport');
const passport = require('passport');

function tokenForUser(user) {

  const timestamp = new Date().getTime();
  //sub is for 'subject' of the token is the user - it's a standard for web tokens
  // iat is 'issued at'
  return jwt.encode({ sub:user.id, iat: timestamp}, config.secret);
}

const requireSignin = passport.authenticate('local', { session: false });


// post to http://192.168.99.100/users/create
router.post('/create', function (req, res) {
    models.User.create({

        //todo check if username already exists before creating:
        //  http://stackoverflow.com/questions/31815076/node-sequelize-how-to-check-if-item-exists-before-adding-async-confusion

        username: req.body.username,
        password: req.body.password,
        fields: ['username', 'password']
    }).then(function (insertedUser) {

        // console.log(insertedUser.dataValues);

        //validation: must have both username and password
        if (!insertedUser.dataValues.username || !insertedUser.dataValues.password ) {
            return res.status(422).send({ error: 'You must provide username and password' })
        }

        //template will pick up the isAdminPage variable
        //res.locals.isAdminPage = true;
        res.json({ token: tokenForUser(insertedUser.dataValues.id) });
        //res.redirect('/admin');

    });
});

router.post('/verify', requireSignin, function (req, res) {

    //User has already had their email and password auth'd
    //we just need to give them a tokens.
    //req.user is from what we implimented in passport.js
    res.send({ token: tokenForUser(req.user) });
    
});


//http://192.168.99.100/users/3/destroy
router.get('/:user_id/destroy', function (req, res) {
    models.User.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(function () {
        app.locals.isAdminPage = true;
        res.redirect('/admin');
    });
});


module.exports = router;