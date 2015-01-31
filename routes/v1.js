'use strict';

var express = require('express');
var router = express.Router();

var index = require('./v1/index');
var users = require('./v1/users');
var captcha = require('./v1/captcha');

router.get('/', index.show);
router.use('/users', users);
router.use('/captcha', captcha);

module.exports = router;
