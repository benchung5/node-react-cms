const bcrypt = require('bcrypt-nodejs');

"use strict";

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
      classMethods: {
        associate: function (models) {
          User.hasMany(models.Task)
        }
      },
      instanceMethods: {
        generateHash: function (password) {
          //use these like:
          // models.User.find(123).success( function( user ) { 
          //     user.setPassword('test');
          // });
          //return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
        comparePassword: function (candidatePassword, callback) {

          //compare the trying passoword with the one in the existing model
          let isMatch = bcrypt.compareSync(candidatePassword, this.password);
          callback(null, isMatch);

        },
      },
      hooks: {
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


// creating user tables:
//-----------------------------------------------------

// var User = connection.define('user', {
//   firstName: {
//     type: Sequelize.STRING,
//     field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// }, {
//   freezeTableName: true // Model tableName will be the same as the model name
// });

// User.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });