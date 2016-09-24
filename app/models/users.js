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
        // validatePassword: function (password, callback) {
        //   let isValid = false;
        //   if (password.length > 5 ) {
        //     isValid = true;
        //     callback(null, isValid);
        //   } else {
        //     isValid = false;
        //     callback("Password must be at least 5 characters long", isValid)
        //   }
        // },
        comparePassword: function (candidatePassword, callback) {

          //compare the trying passoword with the one in the existing model
          let isMatch = bcrypt.compareSync(candidatePassword, this.password);
          callback(null, isMatch);

        },
      },
      hooks: {
        beforeValidate: function (user) {

          if (user.password.length < 5) {
            return sequelize.Promise.reject("password must be at least 5 characters long");
          }

          //check if user already exists, we do this already in unique: true 
          //but this way we can be more specific for error handling, etc.
          User.find({
            where: { username: user.username }
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

          // //encrypt password: generate salt then run callback
          // bcrypt.genSaltSync(10, function (err, salt) {
          //   if (err) { return next(err); }

          //   // user.password = bcrypt.hashSync(user.password, 8);
          //   // hash password(encrypt) using salt
          //   bcrypt.hashSync(user.password, salt, null, function (err, hash) {
          //     if (err) { return next(err); }
          //     //overwrite plain text pass with encrypted one
          //     console.log(hash);
          //     user.password = hash;

          //   });
          // });
        }
      }
    });

  return User;
};