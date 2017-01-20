"use strict";
var immutable_class_1 = require('immutable-class');
var plywood_1 = require('plywood');
var general_1 = require('../../utils/general/general');
var geoName = /continent|country|city|region/i;
function isGeo(name) {
    return geoName.test(name);
}
function typeToKind(type) {
    if (!type)
        return type;
    return type.toLowerCase().replace(/_/g, '-').replace(/-range$/, '');
}
var check;
var Dimension = (function () {
    function Dimension(parameters) {
        var name = parameters.name;
        general_1.verifyUrlSafeName(name);
        this.name = name;
        this.title = parameters.title || general_1.makeTitle(name);
        this.expression = parameters.expression || plywood_1.$(name);
        var kind = parameters.kind || typeToKind(this.expression.type) || 'string';
        this.kind = kind;
        if (kind === 'string' && isGeo(name)) {
            this.className = 'string-geo';
        }
        else {
            this.className = kind;
        }
        if (parameters.url) {
            if (typeof parameters.url !== 'string') {
                throw new Error("unsupported url: " + parameters.url + ": only strings are supported");
            }
            this.url = parameters.url;
        }
    }
    Dimension.isDimension = function (candidate) {
        return immutable_class_1.isInstanceOf(candidate, Dimension);
    };
    Dimension.getDimension = function (dimensions, dimensionName) {
        if (!dimensionName)
            return null;
        dimensionName = dimensionName.toLowerCase(); // Case insensitive
        return dimensions.find(function (dimension) { return dimension.name.toLowerCase() === dimensionName; });
    };
    Dimension.getDimensionByExpression = function (dimensions, expression) {
        return dimensions.find(function (dimension) { return dimension.expression.equals(expression); });
    };
    Dimension.fromJS = function (parameters) {
        return new Dimension({
            name: parameters.name,
            title: parameters.title,
            expression: parameters.expression ? plywood_1.Expression.fromJSLoose(parameters.expression) : null,
            kind: parameters.kind || typeToKind(parameters.type),
            url: parameters.url
        });
    };
    Dimension.prototype.valueOf = function () {
        return {
            name: this.name,
            title: this.title,
            expression: this.expression,
            kind: this.kind,
            url: this.url
        };
    };
    Dimension.prototype.toJS = function () {
        var js = {
            name: this.name,
            title: this.title,
            expression: this.expression.toJS(),
            kind: this.kind
        };
        if (this.url)
            js.url = this.url;
        return js;
    };
    Dimension.prototype.toJSON = function () {
        return this.toJS();
    };
    Dimension.prototype.toString = function () {
        return "[Dimension: " + this.name + "]";
    };
    Dimension.prototype.equals = function (other) {
        return Dimension.isDimension(other) &&
            this.name === other.name &&
            this.title === other.title &&
            this.expression.equals(other.expression) &&
            this.kind === other.kind &&
            this.url === other.url;
    };
    return Dimension;
}());
exports.Dimension = Dimension;
check = Dimension;
