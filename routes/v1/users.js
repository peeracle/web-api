'use strict';

var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var orm = require('orm');

var tab_user = [];
var i = 0;

function readArray (arr) {
    for (var j = 0; j !== arr.length; j++) {
        console.log('----------[' + j + ']----------');
        console.log(arr[j].body.username);
        console.log(arr[j].body.password);
        console.log(arr[j].body.email);
        console.log('-----------------------');
    }
}

function checkRules (req) {
    for (var j = 0; j !== tab_user.length; j++) {
        if (req.body.username === tab_user[j].body.username) {
            console.log('username already exist');
            return false;
        }
        if (req.body.email === tab_user[j].body.email) {
            console.log('email already used');
            return false;
        }
    }
    if (req.body.email.indexOf('@') === -1) {
        console.log('email doesnt valid');
        return false;
    }
    if (req.body.password !== req.body.password_confirm) {
        console.log('password confirmation doesnt match');
        return false;
    }
    return true;
}

function stockUser(req, res) {

     // clear le tableau
    /* tab_user.length = 0;
     i = 0;
*/
    console.log('Stock user ...');
    if (checkRules(req) === true) {
        tab_user[i++] = req;
    }
    readArray(tab_user);

    //send vers le client

    res.send('OK');
}

function checkUserExist(req, res) {
    var exist = false;
    for (var j = 0; j !== tab_user.length; j++) {
        if (req.body.username === tab_user[j].body.username) {
            exist = true;
            break;
        }
    }
    console.log(exist);
    res.send('OK');
}

router.post('/signup', stockUser);

router.post('/signin', checkUserExist);

module.exports = router;
