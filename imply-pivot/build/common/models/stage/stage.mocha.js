"use strict";
var tester_1 = require('immutable-class/build/tester');
var stage_1 = require('./stage');
describe('Stage', function () {
    it('is an immutable class', function () {
        tester_1.testImmutableClass(stage_1.Stage, [
            {
                x: 10,
                y: 5,
                height: 2,
                width: 2
            },
            {
                x: 10,
                y: 500,
                height: 2,
                width: 2
            },
            {
                x: 10,
                y: 5,
                height: 3,
                width: 2
            }
        ]);
    });
});
