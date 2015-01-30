'use strict';

var should = require('should');
var request = require('supertest');
var context = describe;
var app = require('../../app');

describe('captcha', function () {
  describe('GET /v1/captcha', function () {
    it('should show "send a captcha now"', function (done) {
      request(app)
        .get('/v1/captcha')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .expect(/send a captcha now/)
        .end(done);
    });
  });
});
