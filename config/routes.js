'use strict';

var v1 = require('../routes/v1');

module.exports = function (app) {
  app.use('/v1', v1);
};
