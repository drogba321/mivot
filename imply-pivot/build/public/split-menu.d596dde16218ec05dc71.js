webpackJsonp([4],{

/***/ 347:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(348);
	var React = __webpack_require__(5);
	var chronoshift_1 = __webpack_require__(179);
	var plywood_1 = __webpack_require__(188);
	var index_1 = __webpack_require__(192);
	var constants_1 = __webpack_require__(222);
	var dom_1 = __webpack_require__(240);
	var svg_icon_1 = __webpack_require__(174);
	var bubble_menu_1 = __webpack_require__(257);
	var dropdown_1 = __webpack_require__(269);
	var GRANULARITIES = ['PT1M', 'PT5M', 'PT1H', 'P1D', 'P1W'];
	function formatLimit(limit) {
	    if (limit === 'custom')
	        return 'Custom';
	    return limit === null ? 'None' : String(limit);
	}
	function formatGranularity(gran) {
	    return gran.replace(/^PT?/, '');
	}
	var SplitMenu = (function (_super) {
	    __extends(SplitMenu, _super);
	    function SplitMenu() {
	        _super.call(this);
	        this.state = {
	            split: null,
	            colors: null
	        };
	        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
	    }
	    SplitMenu.prototype.componentWillMount = function () {
	        var _a = this.props, essence = _a.essence, split = _a.split;
	        var dataSource = essence.dataSource, colors = essence.colors;
	        var myColors = null;
	        if (colors) {
	            var colorDimension = dataSource.getDimension(colors.dimension);
	            if (colorDimension.expression.equals(split.expression)) {
	                myColors = colors;
	            }
	        }
	        this.setState({
	            split: split,
	            colors: myColors
	        });
	    };
	    SplitMenu.prototype.componentDidMount = function () {
	        window.addEventListener('keydown', this.globalKeyDownListener);
	    };
	    SplitMenu.prototype.componentWillUnmount = function () {
	        window.removeEventListener('keydown', this.globalKeyDownListener);
	    };
	    SplitMenu.prototype.globalKeyDownListener = function (e) {
	        if (dom_1.enterKey(e)) {
	            this.onOkClick();
	        }
	    };
	    SplitMenu.prototype.onSelectGran = function (gran) {
	        var split = this.state.split;
	        var bucketAction = split.bucketAction;
	        if (bucketAction instanceof plywood_1.TimeBucketAction) {
	            this.setState({
	                split: split.changeBucketAction(new plywood_1.TimeBucketAction({
	                    duration: chronoshift_1.Duration.fromJS(gran),
	                    timezone: bucketAction.timezone
	                }))
	            });
	        }
	    };
	    SplitMenu.prototype.onSelectSortOn = function (sortOn) {
	        var split = this.state.split;
	        var sortAction = split.sortAction;
	        var direction = sortAction ? sortAction.direction : plywood_1.SortAction.DESCENDING;
	        this.setState({
	            split: split.changeSortAction(new plywood_1.SortAction({
	                expression: sortOn.getExpression(),
	                direction: direction
	            }))
	        });
	    };
	    SplitMenu.prototype.onToggleDirection = function () {
	        var split = this.state.split;
	        var sortAction = split.sortAction;
	        this.setState({
	            split: split.changeSortAction(sortAction.toggleDirection())
	        });
	    };
	    SplitMenu.prototype.onSelectLimit = function (limit) {
	        var essence = this.props.essence;
	        var split = this.state.split;
	        var colors = essence.colors;
	        if (colors) {
	            colors = index_1.Colors.fromLimit(colors.dimension, limit);
	        }
	        this.setState({
	            split: split.changeLimit(limit),
	            colors: colors
	        });
	    };
	    SplitMenu.prototype.onOkClick = function () {
	        if (!this.actionEnabled())
	            return;
	        var _a = this.props, clicker = _a.clicker, essence = _a.essence, onClose = _a.onClose;
	        var _b = this.state, split = _b.split, colors = _b.colors;
	        clicker.changeSplits(essence.splits.replace(this.props.split, split), index_1.VisStrategy.UnfairGame, colors);
	        onClose();
	    };
	    SplitMenu.prototype.onCancelClick = function () {
	        var onClose = this.props.onClose;
	        onClose();
	    };
	    SplitMenu.prototype.getSortOn = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var split = this.state.split;
	        return index_1.SortOn.fromSortAction(split.sortAction, essence.dataSource, dimension);
	    };
	    SplitMenu.prototype.renderGranularityPicker = function () {
	        var _this = this;
	        var split = this.state.split;
	        var selectedGran = split.bucketAction.duration.toString();
	        var buttons = GRANULARITIES.map(function (g) {
	            return React.createElement("li", {className: 'granularity' + (g === selectedGran ? ' selected' : ''), key: g, onClick: _this.onSelectGran.bind(_this, g)}, formatGranularity(g));
	        });
	        return React.createElement("div", {className: "button-group"}, React.createElement("div", {className: "button-group-title"}, constants_1.STRINGS.granularity), React.createElement("ul", null, buttons));
	    };
	    SplitMenu.prototype.renderSortDropdown = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var mds = [index_1.SortOn.fromDimension(dimension)].concat(essence.dataSource.measures.toArray().map(index_1.SortOn.fromMeasure));
	        var md = this.getSortOn();
	        return React.createElement(dropdown_1.Dropdown, {
	            label: constants_1.STRINGS.sortBy,
	            items: mds,
	            selectedItem: md,
	            equal: index_1.SortOn.equal,
	            renderItem: index_1.SortOn.getTitle,
	            keyItem: index_1.SortOn.getName,
	            onSelect: this.onSelectSortOn.bind(this)
	        });
	    };
	    SplitMenu.prototype.renderSortDirection = function () {
	        var split = this.state.split;
	        var direction = split.sortAction.direction;
	        return React.createElement("div", {className: "sort-direction"}, this.renderSortDropdown(), React.createElement("div", {className: 'direction ' + direction, onClick: this.onToggleDirection.bind(this)}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(350)})));
	    };
	    SplitMenu.prototype.renderLimitDropdown = function (includeNone) {
	        var essence = this.props.essence;
	        var _a = this.state, split = _a.split, colors = _a.colors;
	        var limitAction = split.limitAction;
	        var items = [5, 10, 25, 50, 100];
	        var selectedItem = limitAction ? limitAction.limit : null;
	        if (colors) {
	            items = [3, 5, 7, 9, 10];
	            selectedItem = colors.values ? 'custom' : colors.limit;
	        }
	        if (includeNone)
	            items.unshift(null);
	        return React.createElement(dropdown_1.Dropdown, {
	            label: constants_1.STRINGS.limit,
	            items: items,
	            selectedItem: selectedItem,
	            renderItem: formatLimit,
	            onSelect: this.onSelectLimit.bind(this)
	        });
	    };
	    SplitMenu.prototype.renderTimeControls = function () {
	        return React.createElement("div", null, this.renderGranularityPicker(), this.renderSortDirection(), this.renderLimitDropdown(true));
	    };
	    SplitMenu.prototype.renderStringControls = function () {
	        return React.createElement("div", null, this.renderSortDirection(), this.renderLimitDropdown(false));
	    };
	    SplitMenu.prototype.actionEnabled = function () {
	        var originalSplit = this.props.split;
	        var originalColors = this.props.essence.colors;
	        var newSplit = this.state.split;
	        var newColors = this.state.colors;
	        return !originalSplit.equals(newSplit) || (originalColors && !originalColors.equals(newColors));
	    };
	    SplitMenu.prototype.render = function () {
	        var _a = this.props, containerStage = _a.containerStage, openOn = _a.openOn, dimension = _a.dimension, onClose = _a.onClose;
	        var split = this.state.split;
	        if (!dimension)
	            return null;
	        var menuSize = index_1.Stage.fromSize(250, 240);
	        var menuControls = null;
	        if (split.bucketAction instanceof plywood_1.TimeBucketAction) {
	            menuControls = this.renderTimeControls();
	        }
	        else {
	            menuControls = this.renderStringControls();
	        }
	        return React.createElement(bubble_menu_1.BubbleMenu, {className: "split-menu", direction: "down", containerStage: containerStage, stage: menuSize, openOn: openOn, onClose: onClose}, menuControls, React.createElement("div", {className: "button-bar"}, React.createElement("button", {className: "ok", onClick: this.onOkClick.bind(this), disabled: !this.actionEnabled()}, constants_1.STRINGS.ok), React.createElement("button", {className: "cancel", onClick: this.onCancelClick.bind(this)}, constants_1.STRINGS.cancel)));
	    };
	    return SplitMenu;
	}(React.Component));
	exports.SplitMenu = SplitMenu;


/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(349);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./split-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./split-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".split-menu .button-bar .ok,.split-menu .button-bar .cancel{display:inline-block;padding:6px 16px;font-size:13px;min-width:46px;text-align:center;cursor:pointer;border-radius:2px;outline:none;height:30px}.split-menu .button-bar .disabled.ok,.split-menu .button-bar .disabled.cancel,.split-menu .button-bar [disabled].ok,.split-menu .button-bar [disabled].cancel{opacity:.40;cursor:default;pointer-events:none}.split-menu .button-bar .ok{background:#1ea3e6;color:#fff}.split-menu .button-bar .ok svg path{fill:#fff}.split-menu .button-bar .ok:hover{background:#1795d3}.split-menu .button-bar .active.ok,.split-menu .button-bar .ok:active{background:#1584bc;color:#e0e0e0}.split-menu .button-bar .active.ok svg path,.split-menu .button-bar .ok:active svg path{fill:#e0e0e0}.split-menu .button-bar .cancel{background:rgba(30,163,230,0.22);color:#1ea3e6}.split-menu .button-bar .cancel svg path{fill:#1ea3e6}.split-menu .button-bar .cancel:hover{background:rgba(30,163,230,0.3)}.split-menu .button-bar .active.cancel,.split-menu .button-bar .cancel:active{background:rgba(30,163,230,0.38)}.split-menu .button-group li,.split-menu .sort-direction .direction{background:#fff;border:1px solid #d1d1d1;border-radius:2px;cursor:pointer;box-shadow:0 1px 1px 0 rgba(0,0,0,0.1)}.split-menu .button-group li:hover,.split-menu .sort-direction .direction:hover{border-color:#bababa}.split-menu .button-group li.selected{box-shadow:inset 0 1px 1px 0 rgba(0,0,0,0.1);background:#ededed}.split-menu .button-group .button-group-title{text-transform:uppercase;font-size:12px;color:#a6a6a6;margin-bottom:5px}.split-menu .button-group{margin-bottom:12px}.split-menu .button-group .button-group-title{margin-bottom:6px}.split-menu .button-group li{border-radius:0;display:inline-block;cursor:pointer;width:20%;text-align:center;height:30px;padding:8px 2px 0 2px;border-right:0}.split-menu .button-group li:first-child{border-top-left-radius:2px;border-bottom-left-radius:2px}.split-menu .button-group li:last-child{border-right:1px solid #d1d1d1;border-top-right-radius:2px;border-bottom-right-radius:2px}.split-menu .button-group li:not(.selected):not(:hover){color:#999}.split-menu .dropdown{margin-bottom:12px}.split-menu .sort-direction .dropdown{margin-right:38px}.split-menu .sort-direction .direction{position:absolute;right:0;bottom:0;width:32px;height:30px}.split-menu .sort-direction .direction svg{position:absolute;height:13px;top:7px;left:11px}.split-menu .sort-direction .direction.ascending svg{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.split-menu .button-bar .ok{min-width:60px;margin-right:8px}\n", ""]);

	// exports


/***/ }

});