'use strict';

var express = require('express');
var orm = require('orm');

var opts = {
    database: 'api_dev',
    protocol: 'mysql',
    host: 'db.peeracle.local',
    port: 3306,         // optional, defaults to database default
    user: 'api_dev',
    password: 'LA4PnhPQR7O4vLT'
};

module.exports = {
    db: opts,
    redis: {
        host: 'redis.peeracle.local',
        port: 6379
    }
};
