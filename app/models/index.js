
"use strict";
const fs        = require("fs");
const path      = require("path");
const Sequelize = require("sequelize");
const env       = process.env.NODE_ENV || "development";
const config    = require(__dirname + '/../config.json')[env];
const sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database);
const db        = {};

//attempt connection
sequelize
.authenticate()
.then(function(err) {
  console.log('Database connection has been established successfully.');
  //combine all the models into db
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

  //insert sequelize data into db object for export
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

//...

// if we can connect, but no data in db create demo data:
//-----------------------------------------------------

  db.sequelize.sync({
    //enable to overwrite existing data:
    // force: true,
    logging: console.log
  }).then(function () {
    return db.Article.findOrCreate({
      where: {
        title: 'Contact',
        slug: 'contact',
        body: 'This is an auto-generated contact page.'
      }
    });
  })
    .spread(function (article, created) {
      console.log(article.get({
        plain: true
      }));
      console.log('created: ', created);
    })
    .catch(function (error) {
      console.log('error on creating article:', error);
    }).then(function () {
      return db.User.findOrCreate({
        where: {
          username: 'John'
        },
        defaults: {
          username: 'John',
          password: 'a123456'
        }
      });
    })
    // callback of recent transaction (returns a javascript object of recent item inserted)
    .spread(function (user, created) {
      console.log(user.get({
        plain: true
      }));
      console.log('created: ', created);
    })
    .catch(function (error) {
      console.log('error on creating user:', error);
    });


})
.catch(function (err) {
    console.log('Unable to connect to the database');
});


module.exports = db;

