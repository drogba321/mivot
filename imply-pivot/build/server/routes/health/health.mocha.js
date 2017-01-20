"use strict";
var supertest = require('supertest');
var app = require('../../app');
describe('GET /health', function () {
    it('respond with 200', function (done) {
        supertest(app)
            .get('/health')
            .expect(200, done);
    });
});
