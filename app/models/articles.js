"use strict";

module.exports = function(connection, DataTypes) {
    //create table and columns
    //to find out more, look for 'datatypes' on the sequelize website (integers, dates, etc.)
    //set slug as primary key
    //the third arg to difine additional options for the model.
    //sequelize auto creates id and timestamp columns, disable them using <column_name>: false
    //sequelize pluralizes table names, disable with freezeTableName: true
    //validate: - applies validation rules to what data will be accepted (see sequelize site for list of options)
    var Article = connection.define('Article', {
            slug: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                unique: true,
                // allowNull: false,
                validate: {
                    len: {
                        args: [1-150],
                        msg: 'please enter a title 1-150 characters long'
                    }
                }
            },
            body: {
                type: DataTypes.TEXT,
                defaultValue: 'Coming soon...',
                validate: {
                    // name_of_custom_validator {funtion(name_of_value_to_validate)}
                    startsWithUpper: function (bodyVal) {

                        // if (!/\d/.test(bodyVal) && !/[a-zA-Z]/.test(bodyVal)) {
                        //     throw new Error('Must contain at least one character.')
                        // } else {
                        //     //...
                        // }

                    }
                }
            }
        },
        {
            timestamp: false,
            // freezeTableName: true

            // some hooks to take place before/after validate and before create
            // there are many hooks and a couple differnt methods of definning them (we use method 1)
            hooks: {
                beforeValidate: function() {
                    // console.log('beforeValidate');
                },             
                afterValidate: function() {
                    // console.log('afterValidate');
                },             
                beforeCreate: function() {
                    // console.log('beforeCreate');
                },             
                afterCreate: function(res) {
                    // console.log('created article with slug:', res.dataValues.slug);
                }
            }
    });
    return Article;
};