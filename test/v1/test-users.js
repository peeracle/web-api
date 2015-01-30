'use strict';

var should = require('should');
var request = require('supertest');
var context = describe;
var app = require('../../app');

describe('users', function () {
  describe('GET /v1/users', function () {
    it('should show "Show users"', function (done) {
      request(app)
        .get('/v1/users')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .expect(/Show users/)
        .end(done);
    });
  });
});
