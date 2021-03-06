const bcrypt = require('bcrypt-nodejs');

"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {type: DataTypes.TEXT, unique: true},
    password: DataTypes.TEXT
  }, {
      classMethods: {
        // associate: function (models) {
        //   User.hasMany(models.Task)
        // }
      },
      instanceMethods: {
        comparePassword: function (candidatePassword, callback) {

          //compare the trying passoword with the one in the existing model
          let isMatch = bcrypt.compareSync(candidatePassword, this.password);
          callback(null, isMatch);

        },
      },
      hooks: {
        beforeValidate: function (user) {

          //password strenth:
          //https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
          //let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
          //let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
          let lightRegex = new RegExp("^((?=.*[A-Z]|[a-z])(?=.*[0-9]))(?=.{6,})");
          if(!lightRegex.test(user.password)) {
              //six characters or more and has at least one lowercase and one uppercase alphabetical character or has at least one lowercase and one numeric character or has at least one uppercase and one numeric character
              return sequelize.Promise.reject("password must be at least 6 characters long with at least one numeric character");
          }

          //check if user already exists, we do this already in unique: true 
          //but this way we can be more specific for error handling, etc.
          //$ne: 'John' (name not equal to John). - the schema will catch this one anyways if there's a problem
          //so we don't want to have this auto log an error every time findOrCreate is called for the default user
          User.find({
            where: { 
              username: user.username,
              $ne: 'John'
               }
          })
            .then(function (user) {

              // if (error)
              //   // Some unexpected error occured with the find method.
              //   return next(error);

              if (user) {
                //return next('Username already in use!');
                return sequelize.Promise.reject("username already in use!");
                // Call next with no arguments when validation is successful.
                //next();
                }

            });

        },
        afterValidate: function (user) {

          //encrypt password
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8), null);

        }
      }
    });

  return User;
};