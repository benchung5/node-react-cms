var models = require('../models/index');
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + '/../config.json')[env];
const passport = require('passport');
// const User = require(../models/user);
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


//Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.auth.secret
};

//Create JWT strategy
//payload is the decoded jwt token we created (sub and issued at)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //see if the user ID in the payload exists in our database
    //if so call done with that use else call done without a user object
    models.User.findById(payload.sub).then(function (user) {
        if (user) {
            //helpfully, passport stores the result in req.user when using express route
            //with this middleware
            done(null, user.username);

        } else {
            done(null, false);
        }

    });

});


//create local strategy
//tell is to look at the email part of the request
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function (username, password, done) {
    //verify this username and password, call done with the user if correct username and password
    //otherwise, call done with false
    models.User.find({ where: { username: username } }).then(function (user, err) {

        if (err) { 

            return done(err);
        }
        if (user) {

            // user.comparePassword(password, function (err, isMatch) {
            user.comparePassword(password, function (err, isMatch) {
                
                if (err) { return done(err); }
                if (!isMatch) { return done(null, false); }

                //return sucess with no error and the user
                return done(null, user);

            });


        } else {
            done(null, false);
        }
    });


});

//Tell passport to usre this strategy
passport.use(jwtLogin);
passport.use(localLogin);