'use strict';

var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var orm = require('orm');

var tab_user = [];
var i = 0;
var mais;

orm.connect('mysql://api_dev:LA4PnhPQR7O4vLT@db.peeracle.local/api_dev', function (err, db) {
    if (err) {
        throw (err);
    }
    // db is now available to use! ^__^
    var tableUser = db.define('tableUser', {username: String, password: String, email: String, token: String});
    tableUser.sync(function (err2) {
        if (err2) {
            throw (err2);
        }
        console.log('table synced');
    });
    mais = tableUser;
});

/*
orm.connect('postgres://api_dev:LA4PnhPQR7O4vLT@db.peeracle.local/api_dev', function (err, db) {
    if (err) {
        throw (err);
    }
    console.log('connected');
    // db is now available to use! ^__^
    var tableUser = db.define('tableUser', {name: String});
    tableUser.sync(function (err) {
        if (err) {
            throw (err);
        }
        console.log('table synced');
    });
});
*/

function readArrayUser (arr) {
    for (var j = 0; j !== arr.length; j++) {
        console.log('----------[' + j + ']----------');
        console.log(arr[j].body.username);
        console.log(arr[j].body.password);
        console.log(arr[j].body.email);
        console.log(arr[j].body.token);
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
    console.log('Stock user ...');
    if (checkRules(req) === true) {
        req.body.token = randomString(15, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        tab_user[i++] = req;
        var lol = {};
        lol.username = req.body.username;
        lol.email = req.body.email;
        lol.password = req.body.password;
        lol.token = req.body.token;
        mais.create(lol, function(err, results) {
            if (err) {
                throw (err);
            }
            console.log('ok real db');
        });
        readArrayUser(tab_user);
        console.log('send http://api.peeracle.local:8080/v1/users/signup/confirm?token=' + tab_user[tab_user.length - 1].body.token);
        res.send('202'); // accepted
    } else {
        res.send('409'); // conflict
    }

    //send vers le client
    //res.send('422'); // Unprocessable Entity

}

function checkUserExist(req, res) {
    var exist = false;
    for (var j = 0; j !== tab_user.length; j++) {
        if (tab_user[j].body.token === 1 && req.body.username === tab_user[j].body.username) {
            exist = true;
            break;
        }
    }
    console.log(exist);
    res.send('202');
}

function parse(querystring) {
    // remove any preceding url and split
    querystring = querystring.substring(querystring.indexOf('?') + 1).split('&');
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

    mais.find({token: rslt.token}, function (err, user) {
            if (err) {
                throw (err);
            }
            console.log('exist dans la db : ' + user[0].username);
        }
    );
    for (var j = 0; j !== tab_user.length; j++) {
        if (rslt.token === tab_user[j].body.token) {
            console.log('match');
            tab_user[j].body.token = 1;
            readArrayUser(tab_user);
            res.send('201');
            return;
        }
    }
    console.log('token doesnt exist');
    res.send('404');
}

router.post('/signup', stockUser);

router.get('/signup/confirm', checkToken);

router.post('/signin', checkUserExist);

module.exports = router;
