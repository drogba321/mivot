webpackJsonp([3],{

/***/ 329:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(330);
	var React = __webpack_require__(5);
	var index_1 = __webpack_require__(192);
	var bubble_menu_1 = __webpack_require__(257);
	var string_filter_menu_1 = __webpack_require__(332);
	var time_filter_menu_1 = __webpack_require__(338);
	var FilterMenu = (function (_super) {
	    __extends(FilterMenu, _super);
	    function FilterMenu() {
	        _super.call(this);
	        // this.state = {};
	    }
	    FilterMenu.prototype.render = function () {
	        var _a = this.props, clicker = _a.clicker, essence = _a.essence, changePosition = _a.changePosition, direction = _a.direction, containerStage = _a.containerStage, openOn = _a.openOn, dimension = _a.dimension, onClose = _a.onClose, inside = _a.inside;
	        if (!dimension)
	            return null;
	        var menuSize = null;
	        var menuCont = null;
	        if (dimension.kind === 'time') {
	            menuSize = index_1.Stage.fromSize(250, 274);
	            menuCont = React.createElement(time_filter_menu_1.TimeFilterMenu, {clicker: clicker, dimension: dimension, essence: essence, onClose: onClose});
	        }
	        else {
	            menuSize = index_1.Stage.fromSize(250, 410);
	            menuCont = React.createElement(string_filter_menu_1.StringFilterMenu, {clicker: clicker, dimension: dimension, essence: essence, changePosition: changePosition, onClose: onClose});
	        }
	        return React.createElement(bubble_menu_1.BubbleMenu, {className: "filter-menu", direction: direction, containerStage: containerStage, stage: menuSize, openOn: openOn, onClose: onClose, inside: inside}, menuCont);
	    };
	    return FilterMenu;
	}(React.Component));
	exports.FilterMenu = FilterMenu;


/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(331);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./filter-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./filter-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "", ""]);

	// exports


/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(333);
	var React = __webpack_require__(5);
	var plywood_1 = __webpack_require__(188);
	var constants_1 = __webpack_require__(222);
	var index_1 = __webpack_require__(192);
	var general_1 = __webpack_require__(197);
	var dom_1 = __webpack_require__(240);
	var clearable_input_1 = __webpack_require__(293);
	var checkbox_1 = __webpack_require__(315);
	var loader_1 = __webpack_require__(171);
	var query_error_1 = __webpack_require__(335);
	var highlight_string_1 = __webpack_require__(284);
	var TOP_N = 100;
	var StringFilterMenu = (function (_super) {
	    __extends(StringFilterMenu, _super);
	    function StringFilterMenu() {
	        var _this = this;
	        _super.call(this);
	        this.state = {
	            loading: false,
	            dataset: null,
	            error: null,
	            fetchQueued: false,
	            searchText: '',
	            selectedValues: null,
	            colors: null
	        };
	        this.collectTriggerSearch = general_1.collect(constants_1.SEARCH_WAIT, function () {
	            if (!_this.mounted)
	                return;
	            var _a = _this.props, essence = _a.essence, dimension = _a.dimension;
	            _this.fetchData(essence, dimension);
	        });
	        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
	    }
	    StringFilterMenu.prototype.fetchData = function (essence, dimension) {
	        var _this = this;
	        var searchText = this.state.searchText;
	        var dataSource = essence.dataSource;
	        var nativeCount = dataSource.getMeasure('count');
	        var measureExpression = nativeCount ? nativeCount.expression : plywood_1.$('main').count();
	        var filterExpression = essence.getEffectiveFilter(null, dimension).toExpression();
	        if (searchText) {
	            filterExpression = filterExpression.and(dimension.expression.contains(plywood_1.r(searchText), 'ignoreCase'));
	        }
	        var query = plywood_1.$('main')
	            .filter(filterExpression)
	            .split(dimension.expression, constants_1.SEGMENT)
	            .apply('MEASURE', measureExpression)
	            .sort(plywood_1.$('MEASURE'), plywood_1.SortAction.DESCENDING)
	            .limit(TOP_N + 1);
	        this.setState({
	            loading: true,
	            fetchQueued: false
	        });
	        dataSource.executor(query)
	            .then(function (dataset) {
	            if (!_this.mounted)
	                return;
	            _this.setState({
	                loading: false,
	                dataset: dataset,
	                error: null
	            });
	        }, function (error) {
	            if (!_this.mounted)
	                return;
	            _this.setState({
	                loading: false,
	                dataset: null,
	                error: error
	            });
	        });
	    };
	    StringFilterMenu.prototype.componentWillMount = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var filter = essence.filter, colors = essence.colors;
	        var myColors = (colors && colors.dimension === dimension.name ? colors : null);
	        var valueSet = filter.getLiteralSet(dimension.expression);
	        this.setState({
	            selectedValues: valueSet || (myColors ? myColors.toSet() : null) || plywood_1.Set.EMPTY,
	            colors: myColors
	        });
	        this.fetchData(essence, dimension);
	    };
	    StringFilterMenu.prototype.componentWillReceiveProps = function (nextProps) {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var nextEssence = nextProps.essence;
	        var nextDimension = nextProps.dimension;
	        if (essence.differentDataSource(nextEssence) ||
	            essence.differentEffectiveFilter(nextEssence, null, nextDimension) || !dimension.equals(nextDimension)) {
	            this.fetchData(nextEssence, nextDimension);
	        }
	    };
	    StringFilterMenu.prototype.componentDidMount = function () {
	        this.mounted = true;
	        window.addEventListener('keydown', this.globalKeyDownListener);
	    };
	    StringFilterMenu.prototype.componentWillUnmount = function () {
	        this.mounted = false;
	        window.removeEventListener('keydown', this.globalKeyDownListener);
	    };
	    StringFilterMenu.prototype.globalKeyDownListener = function (e) {
	        if (dom_1.enterKey(e)) {
	            this.onOkClick();
	        }
	    };
	    StringFilterMenu.prototype.constructFilter = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension, changePosition = _a.changePosition;
	        var selectedValues = this.state.selectedValues;
	        var filter = essence.filter;
	        if (selectedValues.size()) {
	            var clause = new index_1.FilterClause({
	                expression: dimension.expression,
	                selection: plywood_1.r(selectedValues)
	            });
	            if (changePosition) {
	                if (changePosition.isInsert()) {
	                    return filter.insertByIndex(changePosition.insert, clause);
	                }
	                else {
	                    return filter.replaceByIndex(changePosition.replace, clause);
	                }
	            }
	            else {
	                return filter.setClause(clause);
	            }
	        }
	        else {
	            return filter.remove(dimension.expression);
	        }
	    };
	    StringFilterMenu.prototype.onSearchChange = function (text) {
	        var _a = this.state, searchText = _a.searchText, dataset = _a.dataset, fetchQueued = _a.fetchQueued, loading = _a.loading;
	        var newSearchText = text.substr(0, constants_1.MAX_SEARCH_LENGTH);
	        // If the user is just typing in more and there are already < TOP_N results then there is nothing to do
	        if (newSearchText.indexOf(searchText) !== -1 && !fetchQueued && !loading && dataset && dataset.data.length < TOP_N) {
	            this.setState({
	                searchText: newSearchText
	            });
	            return;
	        }
	        this.setState({
	            searchText: newSearchText,
	            fetchQueued: true
	        });
	        this.collectTriggerSearch();
	    };
	    StringFilterMenu.prototype.onValueClick = function (value, e) {
	        var _a = this.state, selectedValues = _a.selectedValues, colors = _a.colors;
	        if (colors) {
	            colors = colors.toggle(value);
	            selectedValues = selectedValues.toggle(value);
	        }
	        else {
	            if (e.altKey || e.ctrlKey || e.metaKey) {
	                if (selectedValues.contains(value) && selectedValues.size() === 1) {
	                    selectedValues = plywood_1.Set.EMPTY;
	                }
	                else {
	                    selectedValues = plywood_1.Set.EMPTY.add(value);
	                }
	            }
	            else {
	                selectedValues = selectedValues.toggle(value);
	            }
	        }
	        this.setState({
	            selectedValues: selectedValues,
	            colors: colors
	        });
	    };
	    StringFilterMenu.prototype.onOkClick = function () {
	        if (!this.actionEnabled())
	            return;
	        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose;
	        var colors = this.state.colors;
	        clicker.changeFilter(this.constructFilter(), colors);
	        onClose();
	    };
	    StringFilterMenu.prototype.onCancelClick = function () {
	        var onClose = this.props.onClose;
	        onClose();
	    };
	    StringFilterMenu.prototype.actionEnabled = function () {
	        var essence = this.props.essence;
	        return !essence.filter.equals(this.constructFilter());
	    };
	    StringFilterMenu.prototype.renderTable = function () {
	        var _this = this;
	        var _a = this.state, loading = _a.loading, dataset = _a.dataset, error = _a.error, fetchQueued = _a.fetchQueued, searchText = _a.searchText, selectedValues = _a.selectedValues;
	        var rows = [];
	        var hasMore = false;
	        if (dataset) {
	            hasMore = dataset.data.length > TOP_N;
	            var rowData = dataset.data.slice(0, TOP_N);
	            if (searchText) {
	                var searchTextLower = searchText.toLowerCase();
	                rowData = rowData.filter(function (d) {
	                    return String(d[constants_1.SEGMENT]).toLowerCase().indexOf(searchTextLower) !== -1;
	                });
	            }
	            rows = rowData.map(function (d) {
	                var segmentValue = d[constants_1.SEGMENT];
	                var segmentValueStr = String(segmentValue);
	                var selected = selectedValues && selectedValues.contains(segmentValue);
	                return React.createElement("div", {className: 'row' + (selected ? ' selected' : ''), key: segmentValueStr, title: segmentValueStr, onClick: _this.onValueClick.bind(_this, segmentValue)}, React.createElement("div", {className: "row-wrapper"}, React.createElement(checkbox_1.Checkbox, {selected: selected}), React.createElement(highlight_string_1.HighlightString, {className: "label", text: segmentValueStr, highlightText: searchText})));
	            });
	        }
	        var message = null;
	        if (!loading && dataset && !fetchQueued && searchText && !rows.length) {
	            message = React.createElement("div", {className: "message"}, 'No results for "' + searchText + '"');
	        }
	        var className = [
	            'menu-table',
	            (hasMore ? 'has-more' : 'no-more')
	        ].join(' ');
	        return React.createElement("div", {className: className}, React.createElement("div", {className: "search-box"}, React.createElement(clearable_input_1.ClearableInput, {placeholder: "Search", focusOnMount: true, value: searchText, onChange: this.onSearchChange.bind(this)})), React.createElement("div", {className: "rows"}, rows, message), error ? React.createElement(query_error_1.QueryError, {error: error}) : null, loading ? React.createElement(loader_1.Loader, null) : null);
	    };
	    StringFilterMenu.prototype.render = function () {
	        var dimension = this.props.dimension;
	        if (!dimension)
	            return null;
	        return React.createElement("div", {className: "string-filter-menu"}, this.renderTable(), React.createElement("div", {className: "button-bar"}, React.createElement("button", {className: "ok", onClick: this.onOkClick.bind(this), disabled: !this.actionEnabled()}, constants_1.STRINGS.ok), React.createElement("button", {className: "cancel", onClick: this.onCancelClick.bind(this)}, constants_1.STRINGS.cancel)));
	    };
	    return StringFilterMenu;
	}(React.Component));
	exports.StringFilterMenu = StringFilterMenu;


/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(334);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./string-filter-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./string-filter-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 334:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".string-filter-menu .button-bar .ok,.string-filter-menu .button-bar .cancel{display:inline-block;padding:6px 16px;font-size:13px;min-width:46px;text-align:center;cursor:pointer;border-radius:2px;outline:none;height:30px}.string-filter-menu .button-bar .disabled.ok,.string-filter-menu .button-bar .disabled.cancel,.string-filter-menu .button-bar [disabled].ok,.string-filter-menu .button-bar [disabled].cancel{opacity:.40;cursor:default;pointer-events:none}.string-filter-menu .button-bar .ok{background:#1ea3e6;color:#fff}.string-filter-menu .button-bar .ok svg path{fill:#fff}.string-filter-menu .button-bar .ok:hover{background:#1795d3}.string-filter-menu .button-bar .active.ok,.string-filter-menu .button-bar .ok:active{background:#1584bc;color:#e0e0e0}.string-filter-menu .button-bar .active.ok svg path,.string-filter-menu .button-bar .ok:active svg path{fill:#e0e0e0}.string-filter-menu .button-bar .cancel{background:rgba(30,163,230,0.22);color:#1ea3e6}.string-filter-menu .button-bar .cancel svg path{fill:#1ea3e6}.string-filter-menu .button-bar .cancel:hover{background:rgba(30,163,230,0.3)}.string-filter-menu .button-bar .active.cancel,.string-filter-menu .button-bar .cancel:active{background:rgba(30,163,230,0.38)}.string-filter-menu .menu-table .search-box .clearable-input{background:#fff;border:1px solid #d1d1d1;border-radius:2px;box-shadow:inset 0 1px 1px 0 rgba(0,0,0,0.1)}.string-filter-menu .menu-table:after{position:absolute;top:0;bottom:0;left:0;right:0;content:'';pointer-events:none;box-shadow:inset 0 -20px 10px -10px #fff;border-radius:2px}.string-filter-menu .menu-table{background:#fff;color:#000}.string-filter-menu .menu-table:after{position:absolute;top:0;bottom:0;left:-14px;right:-14px}.string-filter-menu .menu-table .search-box{height:30px}.string-filter-menu .menu-table .search-box .clearable-input{width:100%;height:30px;padding-left:6px}.string-filter-menu .menu-table .rows{height:280px;margin-top:10px;margin-left:-14px;margin-right:-14px;overflow:auto}.string-filter-menu .menu-table .row{height:24px;cursor:pointer;padding:0 14px}.string-filter-menu .menu-table .row .row-wrapper{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;height:100%}.string-filter-menu .menu-table .row .row-wrapper .label{display:inline-block;vertical-align:top;padding-top:4px}.string-filter-menu .menu-table .row:hover{background:#e4f3fc}.string-filter-menu .menu-table .row:last-child{margin-bottom:12px}.string-filter-menu .menu-table .message{padding:4px 10px;color:#999;font-style:italic}.string-filter-menu .menu-table .loader,.string-filter-menu .menu-table .query-error{position:absolute;top:0;bottom:0;left:0;right:0}.string-filter-menu .button-bar{margin-top:10px}.string-filter-menu .button-bar .ok{margin-right:8px}\n", ""]);

	// exports


/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(339);
	var React = __webpack_require__(5);
	var plywood_1 = __webpack_require__(188);
	var constants_1 = __webpack_require__(222);
	var index_1 = __webpack_require__(192);
	var date_1 = __webpack_require__(324);
	var dom_1 = __webpack_require__(240);
	var time_input_1 = __webpack_require__(341);
	var $maxTime = plywood_1.$(index_1.FilterClause.MAX_TIME_REF_NAME);
	var latestPresets = [
	    { name: '1H', selection: $maxTime.timeRange('PT1H', -1) },
	    { name: '6H', selection: $maxTime.timeRange('PT6H', -1) },
	    { name: '1D', selection: $maxTime.timeRange('P1D', -1) },
	    { name: '7D', selection: $maxTime.timeRange('P1D', -7) },
	    { name: '30D', selection: $maxTime.timeRange('P1D', -30) }
	];
	var $now = plywood_1.$(index_1.FilterClause.NOW_REF_NAME);
	var currentPresets = [
	    { name: 'D', selection: $now.timeBucket('P1D') },
	    { name: 'W', selection: $now.timeBucket('P1W') },
	    { name: 'M', selection: $now.timeBucket('P1M') },
	    { name: 'Q', selection: $now.timeBucket('P3M') },
	    { name: 'Y', selection: $now.timeBucket('P1Y') }
	];
	var previousPresets = [
	    { name: 'D', selection: $now.timeFloor('P1D').timeRange('P1D', -1) },
	    { name: 'W', selection: $now.timeFloor('P1W').timeRange('P1W', -1) },
	    { name: 'M', selection: $now.timeFloor('P1M').timeRange('P1M', -1) },
	    { name: 'Q', selection: $now.timeFloor('P3M').timeRange('P3M', -1) },
	    { name: 'Y', selection: $now.timeFloor('P1Y').timeRange('P1Y', -1) }
	];
	var TimeFilterMenu = (function (_super) {
	    __extends(TimeFilterMenu, _super);
	    function TimeFilterMenu() {
	        _super.call(this);
	        this.state = {
	            tab: 'relative',
	            timeSelection: null,
	            startTime: null,
	            endTime: null,
	            hoverPreset: null
	        };
	        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
	    }
	    TimeFilterMenu.prototype.componentWillMount = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var filter = essence.filter;
	        var timeSelection = filter.getSelection(dimension.expression);
	        var selectedTimeRange = essence.evaluateSelection(timeSelection);
	        this.setState({
	            timeSelection: timeSelection,
	            startTime: selectedTimeRange ? selectedTimeRange.start : null,
	            endTime: selectedTimeRange ? selectedTimeRange.end : null
	        });
	    };
	    TimeFilterMenu.prototype.componentDidMount = function () {
	        window.addEventListener('keydown', this.globalKeyDownListener);
	    };
	    TimeFilterMenu.prototype.componentWillUnmount = function () {
	        window.removeEventListener('keydown', this.globalKeyDownListener);
	    };
	    TimeFilterMenu.prototype.globalKeyDownListener = function (e) {
	        if (dom_1.enterKey(e)) {
	            this.onOkClick();
	        }
	    };
	    TimeFilterMenu.prototype.constructFilter = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var _b = this.state, tab = _b.tab, startTime = _b.startTime, endTime = _b.endTime;
	        var filter = essence.filter;
	        if (tab !== 'specific')
	            return null;
	        if (startTime && endTime && startTime < endTime) {
	            return filter.setSelection(dimension.expression, plywood_1.r(plywood_1.TimeRange.fromJS({ start: startTime, end: endTime })));
	        }
	        else {
	            return null;
	        }
	    };
	    TimeFilterMenu.prototype.onPresetClick = function (preset) {
	        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose;
	        clicker.changeTimeSelection(preset.selection);
	        onClose();
	    };
	    TimeFilterMenu.prototype.onPresetMouseEnter = function (preset) {
	        var hoverPreset = this.state.hoverPreset;
	        if (hoverPreset === preset)
	            return;
	        this.setState({
	            hoverPreset: preset
	        });
	    };
	    TimeFilterMenu.prototype.onPresetMouseLeave = function (preset) {
	        var hoverPreset = this.state.hoverPreset;
	        if (hoverPreset !== preset)
	            return;
	        this.setState({
	            hoverPreset: null
	        });
	    };
	    TimeFilterMenu.prototype.onStartChange = function (start) {
	        this.setState({
	            startTime: start
	        });
	    };
	    TimeFilterMenu.prototype.onEndChange = function (end) {
	        this.setState({
	            endTime: end
	        });
	    };
	    TimeFilterMenu.prototype.selectTab = function (tab) {
	        this.setState({ tab: tab });
	    };
	    TimeFilterMenu.prototype.onOkClick = function () {
	        if (!this.actionEnabled())
	            return;
	        var _a = this.props, clicker = _a.clicker, onClose = _a.onClose;
	        var newFilter = this.constructFilter();
	        if (!newFilter)
	            return;
	        clicker.changeFilter(newFilter);
	        onClose();
	    };
	    TimeFilterMenu.prototype.onCancelClick = function () {
	        var onClose = this.props.onClose;
	        onClose();
	    };
	    TimeFilterMenu.prototype.renderPresets = function () {
	        var _this = this;
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var _b = this.state, timeSelection = _b.timeSelection, hoverPreset = _b.hoverPreset;
	        if (!dimension)
	            return null;
	        var timezone = essence.timezone;
	        var presetToButton = function (preset) {
	            return React.createElement("button", {key: preset.name, className: dom_1.classNames('preset', { hover: preset === hoverPreset, selected: preset.selection.equals(timeSelection) }), onClick: _this.onPresetClick.bind(_this, preset), onMouseEnter: _this.onPresetMouseEnter.bind(_this, preset), onMouseLeave: _this.onPresetMouseLeave.bind(_this, preset)}, preset.name);
	        };
	        var previewTimeRange = essence.evaluateSelection(hoverPreset ? hoverPreset.selection : timeSelection);
	        var previewText = date_1.formatTimeRange(previewTimeRange, timezone, date_1.DisplayYear.IF_DIFF);
	        return React.createElement("div", {className: "cont"}, React.createElement("div", {className: "type"}, constants_1.STRINGS.latest), React.createElement("div", {className: "buttons"}, latestPresets.map(presetToButton)), React.createElement("div", {className: "type"}, constants_1.STRINGS.current), React.createElement("div", {className: "buttons"}, currentPresets.map(presetToButton)), React.createElement("div", {className: "type"}, constants_1.STRINGS.previous), React.createElement("div", {className: "buttons"}, previousPresets.map(presetToButton)), React.createElement("div", {className: "preview"}, previewText));
	    };
	    TimeFilterMenu.prototype.actionEnabled = function () {
	        var essence = this.props.essence;
	        var tab = this.state.tab;
	        if (tab !== 'specific')
	            return false;
	        var newFilter = this.constructFilter();
	        return newFilter && !essence.filter.equals(newFilter);
	    };
	    TimeFilterMenu.prototype.renderCustom = function () {
	        var _a = this.props, essence = _a.essence, dimension = _a.dimension;
	        var _b = this.state, timeSelection = _b.timeSelection, startTime = _b.startTime, endTime = _b.endTime;
	        if (!dimension)
	            return null;
	        if (!timeSelection)
	            return null;
	        var timezone = essence.timezone;
	        return React.createElement("div", {className: "cont"}, React.createElement("div", {className: "type"}, constants_1.STRINGS.start), React.createElement(time_input_1.TimeInput, {time: startTime, timezone: timezone, onChange: this.onStartChange.bind(this)}), React.createElement("div", {className: "type"}, constants_1.STRINGS.end), React.createElement(time_input_1.TimeInput, {time: endTime, timezone: timezone, onChange: this.onEndChange.bind(this)}), React.createElement("div", {className: "button-bar"}, React.createElement("button", {className: "ok", onClick: this.onOkClick.bind(this), disabled: !this.actionEnabled()}, constants_1.STRINGS.ok), React.createElement("button", {className: "cancel", onClick: this.onCancelClick.bind(this)}, constants_1.STRINGS.cancel)));
	    };
	    TimeFilterMenu.prototype.render = function () {
	        var _this = this;
	        var dimension = this.props.dimension;
	        var tab = this.state.tab;
	        if (!dimension)
	            return null;
	        var tabs = ['relative', 'specific'].map(function (name) {
	            return React.createElement("div", {className: 'tab ' + (tab === name ? 'selected' : ''), key: name, onClick: _this.selectTab.bind(_this, name)}, name === 'relative' ? constants_1.STRINGS.relative : constants_1.STRINGS.specific);
	        });
	        return React.createElement("div", {className: "time-filter-menu"}, React.createElement("div", {className: "tabs"}, tabs), tab === 'relative' ? this.renderPresets() : this.renderCustom());
	    };
	    return TimeFilterMenu;
	}(React.Component));
	exports.TimeFilterMenu = TimeFilterMenu;


/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(340);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./time-filter-menu.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./time-filter-menu.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".time-filter-menu .cont .buttons button.selected,.time-filter-menu .button-bar .ok,.time-filter-menu .cont .buttons button,.time-filter-menu .button-bar .cancel{display:inline-block;padding:6px 16px;font-size:13px;min-width:46px;text-align:center;cursor:pointer;border-radius:2px;outline:none;height:30px}.time-filter-menu .button-bar .disabled.ok,.time-filter-menu .cont .buttons button.disabled,.time-filter-menu .button-bar .disabled.cancel,.time-filter-menu .button-bar [disabled].ok,.time-filter-menu .cont .buttons button[disabled],.time-filter-menu .button-bar [disabled].cancel{opacity:.40;cursor:default;pointer-events:none}.time-filter-menu .cont .buttons button.selected,.time-filter-menu .button-bar .ok{background:#1ea3e6;color:#fff}.time-filter-menu .cont .buttons button.selected svg path,.time-filter-menu .button-bar .ok svg path{fill:#fff}.time-filter-menu .cont .buttons button.selected:hover,.time-filter-menu .button-bar .ok:hover{background:#1795d3}.time-filter-menu .cont .buttons button.active.selected,.time-filter-menu .button-bar .active.ok,.time-filter-menu .cont .buttons button.selected:active,.time-filter-menu .button-bar .ok:active{background:#1584bc;color:#e0e0e0}.time-filter-menu .cont .buttons button.active.selected svg path,.time-filter-menu .button-bar .active.ok svg path,.time-filter-menu .cont .buttons button.selected:active svg path,.time-filter-menu .button-bar .ok:active svg path{fill:#e0e0e0}.time-filter-menu .cont .buttons button,.time-filter-menu .button-bar .cancel{background:rgba(30,163,230,0.22);color:#1ea3e6}.time-filter-menu .cont .buttons button svg path,.time-filter-menu .button-bar .cancel svg path{fill:#1ea3e6}.time-filter-menu .cont .buttons button:hover,.time-filter-menu .button-bar .cancel:hover{background:rgba(30,163,230,0.3)}.time-filter-menu .cont .buttons button.active,.time-filter-menu .button-bar .active.cancel,.time-filter-menu .cont .buttons button:active,.time-filter-menu .button-bar .cancel:active{background:rgba(30,163,230,0.38)}.time-filter-menu .cont .time-input input{background:#fff;border:1px solid #d1d1d1;border-radius:2px;box-shadow:inset 0 1px 1px 0 rgba(0,0,0,0.1)}.time-filter-menu .cont .preview{height:30px;line-height:28px;border:1px solid #dfdfdf;border-radius:2px;color:#999;text-align:center}.time-filter-menu .cont .type{text-transform:uppercase;font-size:12px;color:#a6a6a6;margin-bottom:5px}.time-filter-menu .tabs{height:30px}.time-filter-menu .tabs .tab{display:inline-block;width:40%;margin-left:5%;margin-right:5%;text-align:center;cursor:pointer;padding:7px 0 7px 0;text-transform:uppercase;font-size:12px;color:#999}.time-filter-menu .tabs .tab:hover{border-bottom:2px solid #dedede}.time-filter-menu .tabs .tab.selected{border-bottom:2px solid #1ea3e6;color:#1ea3e6}.time-filter-menu .cont{margin-top:18px}.time-filter-menu .cont .buttons{margin-bottom:14px}.time-filter-menu .cont .buttons button{min-width:0;padding:0;width:17.5%;margin-right:3%}.time-filter-menu .cont .buttons button.selected{min-width:0;padding:0}.time-filter-menu .cont .buttons button:last-child{margin-right:0}.time-filter-menu .cont .time-input{width:100%;height:30px;border:0;margin-bottom:14px}.time-filter-menu .cont .time-input input{padding-left:6px}.time-filter-menu .cont .time-input input.date{width:70%;margin-right:2%}.time-filter-menu .cont .time-input input.time{width:28%}.time-filter-menu .button-bar .ok{margin-right:8px}\n", ""]);

	// exports


/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(342);
	var React = __webpack_require__(5);
	var chronoshift_1 = __webpack_require__(179);
	var TimeInput = (function (_super) {
	    __extends(TimeInput, _super);
	    function TimeInput() {
	        _super.call(this);
	        this.state = {
	            dateString: '',
	            timeString: ''
	        };
	    }
	    // 2015-09-23T17:42:57.636Z
	    // 2015-09-23 17:42
	    TimeInput.prototype.componentDidMount = function () {
	        var _a = this.props, time = _a.time, timezone = _a.timezone;
	        this.updateStateFromTime(time, timezone);
	    };
	    TimeInput.prototype.componentWillReceiveProps = function (nextProps) {
	        var time = nextProps.time, timezone = nextProps.timezone;
	        this.updateStateFromTime(time, timezone);
	    };
	    TimeInput.prototype.updateStateFromTime = function (time, timezone) {
	        if (!time)
	            return;
	        if (isNaN(time.valueOf())) {
	            this.setState({
	                dateString: '',
	                timeString: ''
	            });
	            return;
	        }
	        var adjTime = chronoshift_1.WallTime.UTCToWallTime(time, timezone.toString());
	        var timeISO = adjTime.toISOString().replace(/:\d\d(\.\d\d\d)?Z?$/, '').split('T');
	        this.setState({
	            dateString: timeISO[0],
	            timeString: timeISO[1]
	        });
	    };
	    TimeInput.prototype.dateChange = function (e) {
	        var timeString = this.state.timeString;
	        var dateString = e.target.value.replace(/[^\d-]/g, '').substr(0, 10);
	        this.setState({
	            dateString: dateString
	        });
	        if (dateString.length === 10) {
	            this.changeDate(dateString + 'T' + timeString + 'Z');
	        }
	        else {
	            this.changeDate('blah');
	        }
	    };
	    TimeInput.prototype.timeChange = function (e) {
	        var dateString = this.state.dateString;
	        var timeString = e.target.value.replace(/[^\d:]/g, '').substr(0, 8);
	        this.setState({
	            timeString: timeString
	        });
	        this.changeDate(dateString + 'T' + timeString + 'Z');
	    };
	    TimeInput.prototype.changeDate = function (possibleDateString) {
	        var _a = this.props, timezone = _a.timezone, onChange = _a.onChange;
	        var possibleDate = new Date(possibleDateString);
	        if (isNaN(possibleDate.valueOf())) {
	            onChange(null);
	        }
	        else {
	            // Convert from WallTime to UTC
	            var possibleDate = chronoshift_1.WallTime.WallTimeToUTC(timezone.toString(), possibleDate.getUTCFullYear(), possibleDate.getUTCMonth(), possibleDate.getUTCDate(), possibleDate.getUTCHours(), possibleDate.getUTCMinutes(), possibleDate.getUTCSeconds(), possibleDate.getUTCMilliseconds());
	            onChange(possibleDate);
	        }
	    };
	    TimeInput.prototype.render = function () {
	        var _a = this.state, dateString = _a.dateString, timeString = _a.timeString;
	        return React.createElement("div", {className: "time-input"}, React.createElement("input", {className: "date", value: dateString, onChange: this.dateChange.bind(this)}), React.createElement("input", {className: "time", value: timeString, onChange: this.timeChange.bind(this)}));
	    };
	    return TimeInput;
	}(React.Component));
	exports.TimeInput = TimeInput;


/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(343);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./time-input.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./time-input.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 343:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".time-input{display:inline-block;border:1px solid #ccc;height:26px}.time-input input{height:100%;padding:4px}.time-input .date{width:60%}.time-input .time{width:40%}\n", ""]);

	// exports


/***/ }

});