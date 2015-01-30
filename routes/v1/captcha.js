'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('send a captcha now');
});

module.exports = router;