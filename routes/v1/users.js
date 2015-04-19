'use strict';

var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var orm = require('orm');

var tab_user = [];
var tab_token = [];
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

function randomString(length, chars) {
    var result = '';
    for (var j = length; j > 0; --j) {
        result += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return result;
}

function stockUser(req, res) {

    // clear le tableau
     /*tab_user.length = 0;
     i = 0;
     */
    console.log('Stock user ...');
    if (checkRules(req) === true) {
        tab_user[i++] = req;
        readArray(tab_user);
        randomString(15, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        res.send('202'); // accepted
    }
    else {
        res.send('409'); // conflict
    }

    //send vers le client
    //res.send('422'); // Unprocessable Entity

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

function getQueryVariable(req, variable) {
    var query = req.url;
    console.log('bonjour=' + req.url);
    var vars = query.split('&');

    console.log('aurevoir=' + vars);
    for (var j = 0; j < vars.length; j++) {
        var pair = vars[j].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function parse(querystring) {
    // remove any preceding url and split
    querystring = querystring.substring(querystring.indexOf('?')+1).split('&');
    var params = {}, pair, d = decodeURIComponent;
    // march and parse
    for (var j = querystring.length - 1; j >= 0; j--) {
        pair = querystring[j].split('=');
        params[d(pair[0])] = d(pair[1]);
    }

    return params;
}

function checkToken(req, res) {
    var rslt = parse(req.url);
    console.log(rslt.token);
    res.send('hello');
}

router.post('/signup', stockUser);

router.get('/signup/confirm', checkToken);

router.post('/signin', checkUserExist);

module.exports = router;
