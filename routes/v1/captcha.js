'use strict';

var express = require('express');
var router = express.Router();

router.post('/signup', function (req, res) {
  res.send('send a captcha now >>' + req.body.username + '<<>>' + req.body.password + '<<' );
});

module.exports = router;
