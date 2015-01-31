'use strict';

var bodyParser = require('body-parser');
var config = require('./config');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var morgan = require('morgan');
var winston = require('winston');

module.exports = function (app) {
  var log;
  var env = app.settings.env;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  if (env !== 'test') {
    app.use(morgan(log));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.use(cookieParser());
  app.use(cookieSession({secret: 'peeracle-api'}));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'peeracle-api',
    store: new RedisStore({
      host: config.redis.host,
      port: config.redis.port
    })
  }));
};
