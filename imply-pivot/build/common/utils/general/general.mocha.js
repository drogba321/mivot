"use strict";
var chai_1 = require('chai');
var immutable_1 = require('immutable');
var general_1 = require('./general');
describe('General', function () {
    describe('moveInList', function () {
        it('works in simple case 0', function () {
            var list = immutable_1.List("ABCD".split(''));
            chai_1.expect(general_1.moveInList(list, 0, 0).join('')).to.equal('ABCD');
        });
        it('works in simple case 1', function () {
            var list = immutable_1.List("ABCD".split(''));
            chai_1.expect(general_1.moveInList(list, 0, 1).join('')).to.equal('ABCD');
        });
        it('works in simple case 2', function () {
            var list = immutable_1.List("ABCD".split(''));
            chai_1.expect(general_1.moveInList(list, 0, 2).join('')).to.equal('BACD');
        });
        it('works in simple case 3', function () {
            var list = immutable_1.List("ABCD".split(''));
            chai_1.expect(general_1.moveInList(list, 0, 3).join('')).to.equal('BCAD');
        });
        it('works in simple case 4', function () {
            var list = immutable_1.List("ABCD".split(''));
            chai_1.expect(general_1.moveInList(list, 0, 4).join('')).to.equal('BCDA');
        });
    });
    describe('verifyUrlSafeName', function () {
        it('works in good case', function () {
            general_1.verifyUrlSafeName('a_b-c.d~E059');
        });
        it('works in bad case', function () {
            chai_1.expect(function () {
                general_1.verifyUrlSafeName('abcd%po#@$moon is!cool');
            }).to.throw("'abcd%po#@$moon is!cool' is not a URL safe name. Try 'abcd_po_moon_is_cool' instead?");
        });
    });
    describe('makeTitle', function () {
        it('works in simple snake case', function () {
            chai_1.expect(general_1.makeTitle('hello_world')).to.equal('Hello World');
        });
        it('works in simple camel case', function () {
            chai_1.expect(general_1.makeTitle('helloWorld')).to.equal('Hello World');
        });
        it('works with leading and trailing _', function () {
            chai_1.expect(general_1.makeTitle('_hello_world_')).to.equal('Hello World');
        });
        it('works with trailing numbers in the middle', function () {
            chai_1.expect(general_1.makeTitle('hello99_world')).to.equal('Hello99 World');
        });
        it('works with trailing numbers at the end', function () {
            chai_1.expect(general_1.makeTitle('hello_world99')).to.equal('Hello World99');
        });
    });
});
