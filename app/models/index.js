
"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var db        = {};

//test connection
sequelize
.authenticate()
.then(function(err) {
    console.log('Database connection has been established successfully.');
})
.catch(function (err) {
    console.log('Unable to connect to the database:', err);
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;






    // //find the article using the id
    // connection.sync().then(function() {
    //     Article.findById(3).then(function(article) {
    //         console.log(article.dataValues);
    //     });
    // });

    // //find multiple records
    // connection.sync().then(function() {
    // 	Article.findAll().then(function(articles) {
    // 			console.log(articles.length);
    // 		});
    // });



    //end sequelize-----------------------------------------------------



// 'use strict';

// var fs        = require('fs');
// var path      = require('path');
// var Sequelize = require('sequelize');
// var basename  = path.basename(module.filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/../config.json')[env];
// var db        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable]);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }


// //test connection
// sequelize
// .authenticate()
// .then(function(err) {
//     console.log('Connection has been established successfully.');
// })
// .catch(function (err) {
//     console.log('Unable to connect to the database:', err);
// });

// //combine the files in models folder into db in index.js
// fs
//   .readdirSync(__dirname)
//   .filter(function(file) {
//     // return if   
//     return (file.indexOf('.') !== 0) && (file !== basename);
//   })
//   .forEach(function(file) {
//     if (file.slice(-3) !== '.js') return;
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// //apply key relations between each model (if any)
// Object.keys(db).forEach(function(modelName) {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
