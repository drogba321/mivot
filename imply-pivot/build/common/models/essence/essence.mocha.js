"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var immutable_1 = require('immutable');
var plywood_1 = require('plywood');
var essence_1 = require('./essence');
var data_source_1 = require("../data-source/data-source");
describe('Essence', function () {
    var dataSourceJS = {
        name: 'twitter',
        title: 'Twitter',
        engine: 'druid',
        source: 'twitter',
        introspection: 'none',
        dimensions: [
            {
                kind: 'time',
                name: 'time',
                title: 'Time',
                expression: '$time'
            },
            {
                kind: 'string',
                name: 'twitterHandle',
                title: 'Twitter Handle',
                expression: '$twitterHandle'
            }
        ],
        measures: [
            {
                name: 'count',
                title: 'count',
                expression: '$main.count()'
            }
        ],
        timeAttribute: 'time',
        defaultTimezone: 'Etc/UTC',
        defaultFilter: { op: 'literal', value: true },
        defaultDuration: 'P3D',
        defaultSortMeasure: 'count',
        defaultPinnedDimensions: ['twitterHandle'],
        refreshRule: {
            rule: "fixed",
            time: new Date('2015-09-13T00:00:00Z')
        }
    };
    var dataSource = data_source_1.DataSource.fromJS(dataSourceJS);
    var visualizations = immutable_1.List([
        {
            id: 'vis1',
            title: 'vis1',
            handleCircumstance: function () {
                return { 'isAutomatic': function () { return false; } };
            }
        }
    ]);
    var context = { dataSource: dataSource, visualizations: visualizations };
    it('is an immutable class', function () {
        tester_1.testImmutableClass(essence_1.Essence, [
            {
                visualization: 'vis1',
                timezone: 'Etc/UTC',
                filter: {
                    op: "literal",
                    value: true
                },
                pinnedDimensions: [],
                singleMeasure: 'count',
                selectedMeasures: [],
                splits: []
            },
            {
                visualization: 'vis1',
                timezone: 'Etc/UTC',
                filter: plywood_1.$('twitterHandle').overlap(['A', 'B', 'C']).toJS(),
                pinnedDimensions: ['twitterHandle'],
                singleMeasure: 'count',
                selectedMeasures: ['count'],
                splits: []
            }
        ], { context: context });
    });
    describe('errors', function () {
        it('must have context', function () {
            chai_1.expect(function () {
                essence_1.Essence.fromJS({});
            }).to.throw('must have context');
        });
    });
    describe('upgrades', function () {
        it('works in the base case', function () {
            var essence = essence_1.Essence.fromJS({
                visualization: 'vis1',
                timezone: 'Etc/UTC',
                pinnedDimensions: [],
                selectedMeasures: [],
                splits: []
            }, context);
            chai_1.expect(essence.toJS()).to.deep.equal({
                "filter": {
                    "action": {
                        "action": "in",
                        "expression": {
                            "action": {
                                "action": "timeRange",
                                "duration": "P3D",
                                "step": -1
                            },
                            "expression": {
                                "name": "m",
                                "op": "ref"
                            },
                            "op": "chain"
                        }
                    },
                    "expression": {
                        "name": "time",
                        "op": "ref"
                    },
                    "op": "chain"
                },
                "multiMeasureMode": true,
                "pinnedDimensions": [],
                "singleMeasure": "count",
                "selectedMeasures": [],
                "splits": [],
                "timezone": "Etc/UTC",
                "visualization": "vis1"
            });
        });
        it('adds timezone', function () {
            var linkItem = essence_1.Essence.fromJS({
                visualization: 'vis1',
                pinnedDimensions: ['statusCode'],
                selectedMeasures: ['count'],
                splits: [],
                filter: 'true'
            }, context);
            chai_1.expect(linkItem.toJS()).to.deep.equal({
                "filter": {
                    "op": "literal",
                    "value": true
                },
                "multiMeasureMode": true,
                "pinnedDimensions": [],
                "singleMeasure": "count",
                "selectedMeasures": [
                    "count"
                ],
                "splits": [],
                "timezone": "Etc/UTC",
                "visualization": "vis1"
            });
        });
    });
    describe('.fromDataSource', function () {
        it('works in the base case', function () {
            var essence = essence_1.Essence.fromDataSource(dataSource, context);
            chai_1.expect(essence.toJS()).to.deep.equal({
                "filter": {
                    "action": {
                        "action": "in",
                        "expression": {
                            "action": {
                                "action": "timeRange",
                                "duration": "P3D",
                                "step": -1
                            },
                            "expression": {
                                "name": "m",
                                "op": "ref"
                            },
                            "op": "chain"
                        }
                    },
                    "expression": {
                        "name": "time",
                        "op": "ref"
                    },
                    "op": "chain"
                },
                "pinnedDimensions": [
                    "twitterHandle"
                ],
                "singleMeasure": "count",
                "selectedMeasures": [
                    "count"
                ],
                "splits": [],
                "timezone": "Etc/UTC",
                "visualization": "vis1"
            });
        });
    });
    describe('.toHash / #fromHash', function () {
        it("is symmetric", function () {
            var essence1 = essence_1.Essence.fromJS({
                visualization: 'vis1',
                timezone: 'Etc/UTC',
                filter: {
                    op: "literal",
                    value: true
                },
                pinnedDimensions: ['twitterHandle'],
                selectedMeasures: ['count'],
                splits: []
            }, context);
            var hash = essence1.toHash();
            var essence2 = essence_1.Essence.fromHash(hash, context);
            chai_1.expect(essence1.toJS()).to.deep.equal(essence2.toJS());
        });
    });
});
