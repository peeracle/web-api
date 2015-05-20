'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var config = require('./config/config');
var orm = require('orm');

var app = express();
/*
orm.connect(config.db, function (err, ddb) {
    if (err) {
        return cb(err);
    }
    ddb.settings.set('instance.returnAllErrors', true);
});
*/
require('./config/express')(app);
require('./config/routes')(app);

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
