"use strict";
var numeral = require('numeral');
var date_1 = require("../../../client/utils/date/date");
var scales = {
    'a': {
        '': 1,
        'k': 1e3,
        'm': 1e6,
        'b': 1e9,
        't': 1e12
    },
    'b': {
        'B': 1,
        'KB': 1024,
        'MB': 1024 * 1024,
        'GB': 1024 * 1024 * 1024,
        'TB': 1024 * 1024 * 1024 * 1024,
        'PB': 1024 * 1024 * 1024 * 1024 * 1024,
        'EB': 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
        'ZB': 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024,
        'YB': 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024
    }
};
function getMiddleNumber(values) {
    var filteredAbsData = [];
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var v = values_1[_i];
        if (v === 0 || isNaN(v) || !isFinite(v))
            continue;
        filteredAbsData.push(Math.abs(v));
    }
    var n = filteredAbsData.length;
    if (n) {
        filteredAbsData.sort(function (a, b) { return b - a; });
        return filteredAbsData[Math.ceil((n - 1) / 2)];
    }
    else {
        return 0;
    }
}
exports.getMiddleNumber = getMiddleNumber;
function formatterFromData(values, format) {
    var match = format.match(/^(\S*)( ?)([ab])$/);
    if (match) {
        var numberFormat = match[1];
        var space = match[2];
        var formatType = match[3];
        var middle = getMiddleNumber(values);
        var formatMiddle = numeral(middle).format('0 ' + formatType);
        var unit = formatMiddle.split(' ')[1] || '';
        var scale = scales[formatType][unit];
        var append = unit ? space + unit : '';
        return function (n) {
            if (isNaN(n) || !isFinite(n))
                return '-';
            return numeral(n / scale).format(numberFormat) + append;
        };
    }
    else {
        return function (n) {
            if (isNaN(n) || !isFinite(n))
                return '-';
            return numeral(n).format(format);
        };
    }
}
exports.formatterFromData = formatterFromData;
function formatLabel(options) {
    var dimension = options.dimension, clause = options.clause, essence = options.essence, verbose = options.verbose;
    var label = dimension.title;
    switch (dimension.kind) {
        case 'boolean':
        case 'number':
        case 'string':
            if (verbose) {
                label += ": " + clause.getLiteralSet().toString();
            }
            else {
                var setElements = clause.getLiteralSet().elements;
                label += setElements.length > 1 ? " (" + setElements.length + ")" : ": " + setElements[0];
            }
            break;
        case 'time':
            var timeSelection = clause.selection;
            var timeRange = essence.evaluateSelection(timeSelection);
            if (verbose) {
                label = "Time: " + date_1.formatTimeRange(timeRange, essence.timezone, date_1.DisplayYear.IF_DIFF);
            }
            else {
                label = date_1.formatTimeRange(timeRange, essence.timezone, date_1.DisplayYear.IF_DIFF);
            }
            break;
        default:
            throw new Error("unknown kind " + dimension.kind);
    }
    return label;
}
exports.formatLabel = formatLabel;
