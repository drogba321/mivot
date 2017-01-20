"use strict";
var tester_1 = require('immutable-class/build/tester');
var dimension_1 = require('./dimension');
describe('Dimension', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(dimension_1.Dimension, [
            {
                name: 'country',
                title: 'important countries',
                'expression': {
                    'op': 'literal',
                    'value': { 'setType': 'STRING', 'elements': ['en'] },
                    'type': 'SET'
                },
                kind: 'string'
            },
            {
                name: 'country',
                title: 'important countries',
                'expression': {
                    'op': 'literal',
                    'value': { 'setType': 'STRING', 'elements': ['en'] },
                    'type': 'SET'
                },
                kind: 'string',
                url: 'https://www.country.com/%s'
            },
            {
                name: 'time',
                title: 'time',
                'expression': {
                    'op': 'literal',
                    'value': { 'start': new Date('2013-02-26T19:00:00.000Z'), 'end': new Date('2013-02-26T22:00:00.000Z') },
                    'type': 'TIME_RANGE'
                },
                kind: 'time',
                url: 'http://www.time.com/%s'
            }
        ]);
    });
    describe('methods', function () {
    });
});
