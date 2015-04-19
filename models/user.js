'use strict';

var express = require('express');
var router = express.Router();
/*
var allo = function (orm, db) {
    var users = db.define('users', {
            id: {type: 'text', required: true},
            username: {type: 'text', required: true},
            password: {type: 'text', required: true},
            email: {type: 'text', required: true},
            createdAt: {type: 'date', required: true, time: true}
        },
        {
            hooks: {
                beforeValidation: function () {
                    this.createdAt = new Date();
                }
            },
            validations: {
                username: orm.validators.rangeLength(1, undefined, 'missing'),
                email: orm.validators.patterns.email('email must have @'),
                password: orm.validators.notEmptyString('empty or not valid')
            }
        }
    );

};*/
exports = function (orm, db) {
    var users = db.define('users', {
            id: {type: 'text', required: true},
            username: {type: 'text', required: true},
            password: {type: 'text', required: true},
            email: {type: 'text', required: true},
            createdAt: {type: 'date', required: true, time: true}
        },
        {
            hooks: {
                beforeValidation: function () {
                    this.createdAt = new Date();
                }
            },
            validations: {
                username: orm.validators.rangeLength(1, undefined, 'missing'),
                email: orm.validators.patterns.email('email must have @'),
                password: orm.validators.notEmptyString('empty or not valid')
            }
        }
    );
};
module.exports = router;
/*
 var bookshelf = require('../config/config').bookshelf;

 var User = bookshelf.Model.extend({
 tableName: 'users',
 initialize:function() {
 this.on('creating', this.onCreating);

 },

 onCreating: function() {

 //        console.log("users.js l.14:");
 //        console.log(this.attributes);
 }
 });

 module.exports = User;

 */

/*
 var Schema = bookshelf.Schema;

 var UserSchema = new Schema({
 name: {type: String, default: ''}
 });

 UserSchema.path('name').validate(function (name) {
 return name.length;
 }, 'Name cannot be blank');

 UserSchema.methods = {
 };

 UserSchema.statics = {
 load: function (options, cb) {
 options.select = options.select || 'name username';
 this.findOne(options.criteria)
 .select(options.select)
 .exec(cb);
 }
 };

 mongoose.model('User', UserSchema);
 */