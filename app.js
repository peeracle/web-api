'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'your_database_user',
        password : 'your_database_password',
        database : 'myapp_test',
        charset  : 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);
var config = require('./config/config');

var app = express();

require('./config/express')(app);
require('./config/routes')(app);

//
// MongoDB
var connect = function () {
  //var options = {server: {socketOptions: {keepAlive: 1}}};
  //mongoose.connect(config.db, options);
};
connect();

//mongoose.connection.on('error', console.log);
//mongoose.connection.on('disconnected', connect);

//
// Bootstrap models
fs.readdirSync(path.join(__dirname, '/models')).forEach(function (file) {
  if (~file.indexOf('.js')) {
    require(path.join(__dirname, '/models/' + file));
  }
});

//
// Error handling
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.settings.env === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
} else if (app.settings.env === 'production') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  });
}

module.exports = app;
