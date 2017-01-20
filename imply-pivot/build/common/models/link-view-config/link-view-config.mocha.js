"use strict";
var tester_1 = require('immutable-class/build/tester');
var immutable_1 = require('immutable');
var data_source_1 = require("../data-source/data-source");
var link_view_config_1 = require('./link-view-config');
describe('LinkViewConfig', function () {
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
        tester_1.testImmutableClass(link_view_config_1.LinkViewConfig, [
            {
                title: 'The Links Will Rise Again!',
                linkItems: [
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
                    }
                ]
            }
        ], { context: context });
    });
});
