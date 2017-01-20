webpackJsonp([2],{

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(306);
	var React = __webpack_require__(5);
	var svg_icon_1 = __webpack_require__(174);
	var constants_1 = __webpack_require__(222);
	var index_1 = __webpack_require__(192);
	var bubble_menu_1 = __webpack_require__(257);
	var ACTION_SIZE = 60;
	var DimensionActionsMenu = (function (_super) {
	    __extends(DimensionActionsMenu, _super);
	    function DimensionActionsMenu() {
	        _super.call(this);
	        //this.state = {
	        //};
	    }
	    DimensionActionsMenu.prototype.onFilter = function () {
	        var _a = this.props, dimension = _a.dimension, triggerFilterMenu = _a.triggerFilterMenu, onClose = _a.onClose;
	        triggerFilterMenu(dimension);
	        onClose();
	    };
	    DimensionActionsMenu.prototype.onSplit = function () {
	        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension, triggerSplitMenu = _a.triggerSplitMenu, onClose = _a.onClose;
	        if (essence.splits.hasSplitOn(dimension) && essence.splits.length() === 1) {
	            triggerSplitMenu(dimension);
	        }
	        else {
	            clicker.changeSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.UnfairGame);
	        }
	        onClose();
	    };
	    DimensionActionsMenu.prototype.onSubsplit = function () {
	        var _a = this.props, clicker = _a.clicker, essence = _a.essence, dimension = _a.dimension, triggerSplitMenu = _a.triggerSplitMenu, onClose = _a.onClose;
	        if (essence.splits.hasSplitOn(dimension)) {
	            triggerSplitMenu(dimension);
	        }
	        else {
	            clicker.addSplit(index_1.SplitCombine.fromExpression(dimension.expression), index_1.VisStrategy.UnfairGame);
	        }
	        onClose();
	    };
	    DimensionActionsMenu.prototype.onPin = function () {
	        var _a = this.props, clicker = _a.clicker, dimension = _a.dimension, onClose = _a.onClose;
	        clicker.pin(dimension);
	        onClose();
	    };
	    DimensionActionsMenu.prototype.render = function () {
	        var _a = this.props, direction = _a.direction, containerStage = _a.containerStage, openOn = _a.openOn, dimension = _a.dimension, onClose = _a.onClose;
	        if (!dimension)
	            return null;
	        var menuSize = index_1.Stage.fromSize(ACTION_SIZE * 2, ACTION_SIZE * 2);
	        return React.createElement(bubble_menu_1.BubbleMenu, {className: "dimension-actions-menu", direction: direction, containerStage: containerStage, stage: menuSize, fixedSize: true, openOn: openOn, onClose: onClose}, React.createElement("div", {className: "filter action", onClick: this.onFilter.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(308)}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.filter)), React.createElement("div", {className: "pin action", onClick: this.onPin.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(309)}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.pin)), React.createElement("div", {className: "split action", onClick: this.onSplit.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(310)}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.split)), React.createElement("div", {className: "subsplit action", onClick: this.onSubsplit.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(311)}), React.createElement("div", {className: "action-label"}, constants_1.STRINGS.subsplit)));
	    };
	    return DimensionActionsMenu;
	}(React.Component));
	exports.DimensionActionsMenu = DimensionActionsMenu;


/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(307);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./dimension-actions-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./dimension-actions-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".dimension-actions-menu{padding:8px}.dimension-actions-menu .action{display:inline-block;width:50px;height:50px;cursor:pointer;text-align:center;color:#1ea3e6;font-size:12px}.dimension-actions-menu .action svg{width:18px;padding-top:7px;padding-bottom:4px}.dimension-actions-menu .action svg path{fill:#1ea3e6}.dimension-actions-menu .action:hover:before{content:'';position:absolute;top:3px;bottom:3px;left:3px;right:3px;background:#e4f3fc}\n", ""]);

	// exports


/***/ },

/***/ 308:
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.9090909,10.4 L16,4 L2,4 L7.09090909,10.4 L7.09090909,15 L10.9090909,15 L10.9090909,10.4 Z\" fill=\"#189AE0\" fill-rule=\"evenodd\"/></svg>"

/***/ },

/***/ 310:
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2,2 L16,2 L16,16 L2,16 L2,2 Z M11,4 L11,2 L7,2 L7,4 L4,4 L4,7 L2,7 L2,11 L4,11 L4,14 L7,14 L7,16 L11,16 L11,14 L14,14 L14,11 L16,11 L16,7 L14,7 L14,4 L11,4 Z\" fill=\"#189AE0\" fill-rule=\"evenodd\"/></svg>"

/***/ },

/***/ 311:
/***/ function(module, exports) {

	module.exports = "<svg viewBox=\"0 0 18 18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10,8 L10,3 L8,3 L8,8 L3,8 L3,10 L8,10 L8,15 L10,15 L10,10 L15,10 L15,8 L10,8 Z\" fill=\"#189AE0\" fill-rule=\"evenodd\"/></svg>"

/***/ }

});