"use strict";
var data_source_1 = require('./data-source');
var plywood_1 = require('plywood');
var DataSourceMock = (function () {
    function DataSourceMock() {
    }
    Object.defineProperty(DataSourceMock, "WIKI_JS", {
        get: function () {
            return {
                name: 'wiki',
                title: 'Wiki',
                engine: 'druid',
                source: 'wiki',
                subsetFilter: null,
                introspection: 'none',
                attributes: [
                    { name: 'time', type: 'TIME' },
                    { name: 'articleName', type: 'STRING' },
                    { name: 'count', type: 'NUMBER', unsplitable: true, makerAction: { action: 'count' } }
                ],
                dimensions: [
                    {
                        expression: {
                            name: 'time',
                            op: 'ref'
                        },
                        kind: 'time',
                        name: 'time',
                        title: 'Time'
                    },
                    {
                        expression: {
                            name: 'articleName',
                            op: 'ref'
                        },
                        kind: 'string',
                        name: 'articleName',
                        title: 'Article Name'
                    }
                ],
                measures: [
                    {
                        name: 'count',
                        title: 'count',
                        expression: plywood_1.$('main').sum('$count').toJS()
                    }
                ],
                timeAttribute: 'time',
                defaultTimezone: 'Etc/UTC',
                defaultFilter: { op: 'literal', value: true },
                defaultDuration: 'P3D',
                defaultSortMeasure: 'count',
                defaultPinnedDimensions: ['articleName'],
                refreshRule: {
                    refresh: "PT1M",
                    rule: "fixed"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataSourceMock, "TWITTER_JS", {
        get: function () {
            return {
                name: 'twitter',
                title: 'Twitter',
                engine: 'druid',
                source: 'twitter',
                subsetFilter: null,
                introspection: 'none',
                dimensions: [
                    {
                        expression: {
                            name: 'time',
                            op: 'ref'
                        },
                        kind: 'time',
                        name: 'time',
                        title: 'Time'
                    },
                    {
                        expression: {
                            name: 'twitterHandle',
                            op: 'ref'
                        },
                        kind: 'string',
                        name: 'twitterHandle',
                        title: 'Twitter Handle'
                    }
                ],
                measures: [
                    {
                        name: 'count',
                        title: 'count',
                        expression: {
                            name: 'count',
                            op: 'ref'
                        }
                    }
                ],
                timeAttribute: 'time',
                defaultTimezone: 'Etc/UTC',
                defaultFilter: { op: 'literal', value: true },
                defaultDuration: 'P3D',
                defaultSortMeasure: 'count',
                defaultPinnedDimensions: ['tweet'],
                refreshRule: {
                    refresh: "PT1M",
                    rule: "fixed"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    DataSourceMock.wiki = function () {
        return data_source_1.DataSource.fromJS(DataSourceMock.WIKI_JS);
    };
    DataSourceMock.twitter = function () {
        return data_source_1.DataSource.fromJS(DataSourceMock.TWITTER_JS);
    };
    return DataSourceMock;
}());
exports.DataSourceMock = DataSourceMock;
