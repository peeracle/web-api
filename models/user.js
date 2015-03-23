'use strict';

var bookshelf = require('../config/config').bookshelf;
var User = bookshelf.Model.extend({
    tableName: 'users'
});
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