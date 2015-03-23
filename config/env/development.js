'use strict';

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'db.peeracle.local',
        user     : 'api_dev',
        password : 'LA4PnhPQR7O4vLT',
        database : 'api_dev',
        charset  : 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);

module.exports = {
    bookshelf: bookshelf,
    redis: {
        host: 'redis.peeracle.local',
        port: 6379
    }
};
