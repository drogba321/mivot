"use strict";
var immutable_1 = require('immutable');
var essence_1 = require('./essence');
var data_source_mock_1 = require("../data-source/data-source.mock");
var EssenceMock = (function () {
    function EssenceMock() {
    }
    EssenceMock.wiki = function () {
        var vis = {
            visualization: 'vis1',
            timezone: 'Etc/UTC',
            pinnedDimensions: [],
            selectedMeasures: [],
            splits: []
        };
        var context = {
            dataSource: data_source_mock_1.DataSourceMock.wiki(),
            visualizations: immutable_1.List([
                {
                    id: 'vis1',
                    title: 'vis1',
                    handleCircumstance: function () {
                        return { 'isAutomatic': function () { return false; } };
                    }
                }
            ])
        };
        return essence_1.Essence.fromJS(vis, context);
    };
    return EssenceMock;
}());
exports.EssenceMock = EssenceMock;
