"use strict";
var chai_1 = require('chai');
var tester_1 = require('immutable-class/build/tester');
var immutable_1 = require('immutable');
var link_item_1 = require('./link-item');
var data_source_1 = require("../data-source/data-source");
describe('LinkItem', function () {
    var dataSourceJS = {
        name: 'twitter',
        title: 'Twitter',
        engine: 'druid',
        source: 'twitter',
        introspection: 'none',
        dimensions: [
            {
                expression: {
                    name: 'time',
                    op: 'ref'
                },
                kind: 'time',
                name: 'time'
            },
            {
                expression: '$statusCode',
                kind: 'string',
                name: 'statusCode'
            }
        ],
        measures: [
            {
                name: 'count',
                expression: '$main.count()'
            },
            {
                name: 'uniqueIp',
                expression: '$main.countDistinct($ip)'
            }
        ],
        timeAttribute: 'time',
        defaultTimezone: 'Etc/UTC',
        defaultFilter: { op: 'literal', value: true },
        defaultDuration: 'P3D',
        defaultSortMeasure: 'count',
        refreshRule: {
            rule: "fixed",
            time: new Date('2015-09-13T00:00:00Z')
        }
    };
    var dataSources = immutable_1.List([data_source_1.DataSource.fromJS(dataSourceJS)]);
    var visualizations = immutable_1.List([
        {
            id: 'vis1',
            title: 'vis1',
            handleCircumstance: function () {
                return { 'isAutomatic': function () { return false; } };
            }
        }
    ]);
    var context = { dataSources: dataSources, visualizations: visualizations };
    it('is an immutable class', function () {
        tester_1.testImmutableClass(link_item_1.LinkItem, [
            {
                name: 'test1',
                title: 'Test One',
                description: 'I like testing',
                group: 'Tests',
                dataSource: 'twitter',
                essence: {
                    visualization: 'vis1',
                    timezone: 'Etc/UTC',
                    filter: {
                        op: "literal",
                        value: true
                    },
                    pinnedDimensions: ['statusCode'],
                    singleMeasure: "count",
                    selectedMeasures: ['count'],
                    splits: []
                }
            },
            {
                name: 'test1',
                title: 'Test One',
                description: 'I like testing',
                group: 'Tests',
                dataSource: 'twitter',
                essence: {
                    visualization: 'vis1',
                    timezone: 'Etc/UTC',
                    filter: {
                        op: "literal",
                        value: true
                    },
                    pinnedDimensions: ['statusCode'],
                    singleMeasure: "count",
                    selectedMeasures: ['count', 'uniqueIp'],
                    splits: []
                }
            }
        ], { context: context });
    });
    describe('errors', function () {
        it('must have context', function () {
            chai_1.expect(function () {
                link_item_1.LinkItem.fromJS({});
            }).to.throw('must have context');
        });
    });
    describe('upgrades', function () {
        it('must add filter and timezone', function () {
            var linkItem = link_item_1.LinkItem.fromJS({
                name: 'test1',
                title: 'Test One',
                description: 'I like testing',
                group: 'Tests',
                dataSource: 'twitter',
                essence: {
                    visualization: 'vis1',
                    pinnedDimensions: ['statusCode'],
                    singleMeasure: "count",
                    selectedMeasures: ['count'],
                    splits: 'time'
                }
            }, context);
            chai_1.expect(linkItem.toJS()).to.deep.equal({
                "dataSource": "twitter",
                "description": "I like testing",
                "essence": {
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
                        "statusCode"
                    ],
                    "singleMeasure": "count",
                    "selectedMeasures": [
                        "count"
                    ],
                    "splits": [
                        {
                            "bucketAction": {
                                "action": "timeBucket",
                                "duration": "PT1H",
                                "timezone": "Etc/UTC"
                            },
                            "expression": {
                                "name": "time",
                                "op": "ref"
                            }
                        }
                    ],
                    "timezone": "Etc/UTC",
                    "visualization": "vis1"
                },
                "group": "Tests",
                "name": "test1",
                "title": "Test One"
            });
        });
    });
});
