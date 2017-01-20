webpackJsonp([5],{

/***/ 441:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(442);
	var React = __webpack_require__(5);
	var plywood_1 = __webpack_require__(188);
	var general_1 = __webpack_require__(197);
	var download_1 = __webpack_require__(253);
	var formatter_1 = __webpack_require__(323);
	var dom_1 = __webpack_require__(240);
	var constants_1 = __webpack_require__(222);
	var modal_1 = __webpack_require__(444);
	var button_1 = __webpack_require__(398);
	var scroller_1 = __webpack_require__(402);
	var loader_1 = __webpack_require__(171);
	var query_error_1 = __webpack_require__(335);
	var simple_table_1 = __webpack_require__(405);
	var SPACE_RIGHT = 10;
	var SPACE_LEFT = 10;
	var BODY_PADDING_BOTTOM = 90;
	var ROW_HEIGHT = 30;
	var LIMIT = 100;
	var TIME_COL_WIDTH = 180;
	var BOOLEAN_COL_WIDTH = 100;
	var NUMBER_COL_WIDTH = 100;
	var DEFAULT_COL_WIDTH = 200;
	function getColumnWidth(type) {
	    switch (type) {
	        case 'BOOLEAN':
	            return BOOLEAN_COL_WIDTH;
	        case 'NUMBER':
	            return NUMBER_COL_WIDTH;
	        case 'TIME':
	            return TIME_COL_WIDTH;
	        default:
	            return DEFAULT_COL_WIDTH;
	    }
	}
	function classFromAttribute(attribute) {
	    return dom_1.classNames(String(attribute.type).toLowerCase().replace(/\//g, '-'), { unsplitable: attribute.unsplitable });
	}
	var RawDataModal = (function (_super) {
	    __extends(RawDataModal, _super);
	    function RawDataModal() {
	        _super.call(this);
	        this.state = {
	            loading: false,
	            dataset: null,
	            scrollLeft: 0,
	            scrollTop: 0,
	            error: null
	        };
	    }
	    RawDataModal.prototype.componentDidMount = function () {
	        this.mounted = true;
	        var essence = this.props.essence;
	        this.fetchData(essence);
	    };
	    RawDataModal.prototype.componentWillUnmount = function () {
	        this.mounted = false;
	    };
	    RawDataModal.prototype.fetchData = function (essence) {
	        var _this = this;
	        var dataSource = essence.dataSource;
	        var $main = plywood_1.$('main');
	        var query = $main.filter(essence.getEffectiveFilter().toExpression()).limit(LIMIT);
	        this.setState({ loading: true });
	        dataSource.executor(query)
	            .then(function (dataset) {
	            if (!_this.mounted)
	                return;
	            _this.setState({
	                dataset: dataset,
	                loading: false
	            });
	        }, function (error) {
	            if (!_this.mounted)
	                return;
	            _this.setState({
	                error: error,
	                loading: false
	            });
	        });
	    };
	    RawDataModal.prototype.onScroll = function (e) {
	        var target = e.target;
	        this.setState({
	            scrollLeft: target.scrollLeft,
	            scrollTop: target.scrollTop
	        });
	    };
	    RawDataModal.prototype.getStringifiedFilters = function () {
	        var essence = this.props.essence;
	        var dataSource = essence.dataSource;
	        return essence.getEffectiveFilter().clauses.map(function (clause, i) {
	            var dimension = dataSource.getDimensionByExpression(clause.expression);
	            if (!dimension)
	                return null;
	            return formatter_1.formatLabel({ dimension: dimension, clause: clause, essence: essence, verbose: true });
	        }).toList();
	    };
	    RawDataModal.prototype.getSortedAttributes = function (dataSource) {
	        var timeAttributeName = dataSource.timeAttribute ? dataSource.timeAttribute.name : null;
	        var attributeRank = function (attribute) {
	            var name = attribute.name;
	            if (name === timeAttributeName) {
	                return 1;
	            }
	            else if (attribute.unsplitable) {
	                return 3;
	            }
	            else {
	                return 2;
	            }
	        };
	        return dataSource.attributes.sort(function (a1, a2) {
	            var score1 = attributeRank(a1);
	            var score2 = attributeRank(a2);
	            if (score1 === score2) {
	                return a1.name.toLowerCase().localeCompare(a2.name.toLowerCase());
	            }
	            return score1 - score2;
	        });
	    };
	    RawDataModal.prototype.renderFilters = function () {
	        var filters = this.getStringifiedFilters().map(function (filter, i) {
	            return React.createElement("li", {className: "filter", key: i}, filter);
	        }).toList();
	        var limit = React.createElement("li", {className: "limit", key: "limit"}, "First ", LIMIT, " events matching ");
	        return filters.unshift(limit);
	    };
	    RawDataModal.prototype.renderHeader = function (dataset) {
	        if (!dataset)
	            return null;
	        var essence = this.props.essence;
	        var dataSource = essence.dataSource;
	        var attributes = this.getSortedAttributes(dataSource);
	        return attributes.map(function (attribute, i) {
	            var name = attribute.name;
	            var width = getColumnWidth(attribute.type);
	            var style = { width: width };
	            var key = name;
	            return (React.createElement("div", {className: dom_1.classNames("header-cell", classFromAttribute(attribute)), style: style, key: i}, React.createElement("div", {className: "title-wrap"}, general_1.makeTitle(key))));
	        });
	    };
	    RawDataModal.prototype.renderRows = function (dataset, scrollTop, stage) {
	        if (!dataset)
	            return null;
	        var essence = this.props.essence;
	        var dataSource = essence.dataSource;
	        var rawData = dataset.data;
	        var firstElementToShow = simple_table_1.SimpleTable.getFirstElementToShow(ROW_HEIGHT, scrollTop);
	        var lastElementToShow = simple_table_1.SimpleTable.getLastElementToShow(ROW_HEIGHT, rawData.length, scrollTop, stage.height);
	        var rows = rawData.slice(firstElementToShow, lastElementToShow);
	        var attributes = this.getSortedAttributes(dataSource);
	        var rowY = firstElementToShow * ROW_HEIGHT;
	        return rows.map(function (datum, i) {
	            var cols = [];
	            attributes.forEach(function (attribute) {
	                var name = attribute.name;
	                var value = datum[name];
	                var colStyle = {
	                    width: getColumnWidth(attribute.type)
	                };
	                var displayValue = value;
	                if (plywood_1.isDate(datum[name])) {
	                    displayValue = datum[name].toISOString();
	                }
	                cols.push(React.createElement("div", {className: dom_1.classNames('cell', classFromAttribute(attribute)), key: name, style: colStyle}, React.createElement("span", {className: "cell-value"}, String(displayValue))));
	            });
	            var rowStyle = { top: rowY };
	            rowY += ROW_HEIGHT;
	            return React.createElement("div", {className: "row", style: rowStyle, key: i}, cols);
	        });
	    };
	    RawDataModal.prototype.render = function () {
	        var _a = this.props, essence = _a.essence, onClose = _a.onClose, stage = _a.stage;
	        var _b = this.state, dataset = _b.dataset, loading = _b.loading, scrollTop = _b.scrollTop, scrollLeft = _b.scrollLeft, error = _b.error;
	        var dataSource = essence.dataSource;
	        var rowWidth = general_1.arraySum(dataSource.attributes.map(function (a) { return getColumnWidth(a.type); }));
	        var title = general_1.makeTitle(constants_1.SEGMENT.toLowerCase()) + " " + constants_1.STRINGS.rawData;
	        var dataLength = dataset ? dataset.data.length : 0;
	        var bodyHeight = dataLength * ROW_HEIGHT;
	        var scrollerStyle = {
	            width: SPACE_LEFT + rowWidth + SPACE_RIGHT,
	            height: bodyHeight + BODY_PADDING_BOTTOM
	        };
	        var filtersString = essence.getEffectiveFilter().getFileString(dataSource.timeAttribute);
	        return React.createElement(modal_1.Modal, {className: "raw-data-modal", title: title, onClose: onClose}, React.createElement("div", {className: "content"}, React.createElement("ul", {className: "filters"}, this.renderFilters()), React.createElement("div", {className: "table-container"}, React.createElement(simple_table_1.SimpleTable, {scrollLeft: scrollLeft, scrollTop: scrollTop, rowHeight: ROW_HEIGHT, headerColumns: this.renderHeader(dataset), rowWidth: rowWidth, rows: this.renderRows(dataset, scrollTop, stage), dataLength: dataLength}), React.createElement(scroller_1.Scroller, {style: scrollerStyle, onScroll: this.onScroll.bind(this)})), error ? React.createElement(query_error_1.QueryError, {error: error}) : null, loading ? React.createElement(loader_1.Loader, null) : null, React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", className: "close", onClick: onClose, title: constants_1.STRINGS.close}), React.createElement(button_1.Button, {type: "secondary", className: "download", onClick: download_1.download.bind(this, dataset, download_1.makeFileName(dataSource.name, filtersString, 'raw'), 'csv'), title: constants_1.STRINGS.download, disabled: Boolean(loading || error)}))));
	    };
	    return RawDataModal;
	}(React.Component));
	exports.RawDataModal = RawDataModal;


/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(443);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./raw-data-modal.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./raw-data-modal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".raw-data-modal .content{position:absolute;top:60px;bottom:0;left:0;right:0;left:18px;right:18px;overflow:hidden}.raw-data-modal .content .filters{position:absolute;top:0;bottom:0;left:0;right:0;white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;height:30px;color:#999}.raw-data-modal .content .filters .limit,.raw-data-modal .content .filters .filter{font-size:13px;height:30px;display:inline}.raw-data-modal .content .filters .filter:not(:last-child):after{content:'; '}.raw-data-modal .content .table-container{position:absolute;top:30px;bottom:66px;left:0;right:0}.raw-data-modal .content .table-container .simple-table{bottom:2px}.raw-data-modal .content .table-container .simple-table .header-cont .header{background:#f5f5f5;height:30px}.raw-data-modal .content .table-container .simple-table .body-cont{position:absolute;top:30px;bottom:0;left:0;right:0}.raw-data-modal .content .table-container .simple-table .body-cont .row{height:30px}.raw-data-modal .content .table-container .simple-table .header-cell,.raw-data-modal .content .table-container .simple-table .cell{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:inline-block;height:100%;border-right:1px solid #dedede;padding-left:6px;padding-right:6px;padding-top:8px}.raw-data-modal .content .table-container .simple-table .header-cell.unsplitable,.raw-data-modal .content .table-container .simple-table .cell.unsplitable{background:#f5f5f5}.raw-data-modal .content .table-container .simple-table .header-cell:first-child,.raw-data-modal .content .table-container .simple-table .cell:first-child{border-left:1px solid #dedede}.raw-data-modal .content .table-container .simple-table .header-cell{border-top:1px solid #dedede}.raw-data-modal .content .table-container .simple-table .header-cell .title-wrap{white-space:nowrap;overflow-x:hidden;text-overflow:ellipsis;display:inline-block;width:100%;height:100%}.raw-data-modal .content .horizontal-scroll-shadow{height:30px}.raw-data-modal .content .loader,.raw-data-modal .content .query-error{position:absolute;top:0;bottom:0;left:0;right:0}.raw-data-modal .content .button-bar{position:absolute;left:0;right:0;bottom:18px}.raw-data-modal .content .button-bar .close{margin-right:8px}\n", ""]);

	// exports


/***/ },

/***/ 444:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(445);
	var React = __webpack_require__(5);
	var dom_1 = __webpack_require__(240);
	var body_portal_1 = __webpack_require__(260);
	var svg_icon_1 = __webpack_require__(174);
	var golden_center_1 = __webpack_require__(230);
	var Modal = (function (_super) {
	    __extends(Modal, _super);
	    function Modal() {
	        _super.call(this);
	        this.state = {
	            id: null
	        };
	        this.globalMouseDownListener = this.globalMouseDownListener.bind(this);
	        this.globalKeyDownListener = this.globalKeyDownListener.bind(this);
	    }
	    Modal.prototype.componentWillMount = function () {
	        var id = this.props.id;
	        this.setState({
	            id: id || dom_1.uniqueId('modal-')
	        });
	    };
	    Modal.prototype.componentDidMount = function () {
	        window.addEventListener('mousedown', this.globalMouseDownListener);
	        window.addEventListener('keydown', this.globalKeyDownListener);
	    };
	    Modal.prototype.componentWillUnmount = function () {
	        window.removeEventListener('mousedown', this.globalMouseDownListener);
	        window.removeEventListener('keydown', this.globalKeyDownListener);
	    };
	    Modal.prototype.globalMouseDownListener = function (e) {
	        var _a = this.props, onClose = _a.onClose, mandatory = _a.mandatory;
	        if (mandatory)
	            return;
	        var id = this.state.id;
	        // can not use ReactDOM.findDOMNode(this) because portal?
	        var myElement = document.getElementById(id);
	        if (!myElement)
	            return;
	        var target = e.target;
	        if (dom_1.isInside(target, myElement))
	            return;
	        onClose();
	    };
	    Modal.prototype.globalKeyDownListener = function (e) {
	        if (!dom_1.escapeKey(e))
	            return;
	        var _a = this.props, onClose = _a.onClose, mandatory = _a.mandatory;
	        if (mandatory)
	            return;
	        onClose();
	    };
	    Modal.prototype.render = function () {
	        var _a = this.props, className = _a.className, title = _a.title, children = _a.children, onClose = _a.onClose;
	        var id = this.state.id;
	        var titleElement = null;
	        if (typeof title === 'string') {
	            titleElement = React.createElement("div", {className: "modal-title"}, React.createElement("div", {className: "text"}, title), React.createElement("div", {className: "close", onClick: onClose}, React.createElement(svg_icon_1.SvgIcon, {svg: __webpack_require__(384)})));
	        }
	        return React.createElement(body_portal_1.BodyPortal, {fullSize: true}, React.createElement("div", {className: dom_1.classNames('modal', className)}, React.createElement("div", {className: "backdrop"}), React.createElement(golden_center_1.GoldenCenter, null, React.createElement("div", {className: "modal-window", id: id}, titleElement, children))));
	    };
	    return Modal;
	}(React.Component));
	exports.Modal = Modal;


/***/ },

/***/ 445:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(446);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./modal.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./modal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 446:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".modal .modal-window{background:#fff;border-radius:2px;box-shadow:0 5px 9px 0 rgba(0,0,0,0.3),0 0 5px 0 rgba(0,0,0,0.2)}.modal{position:absolute;top:0;bottom:0;left:0;right:0}.modal .backdrop{position:absolute;top:0;bottom:0;left:0;right:0;background:#000;opacity:0.2}.modal .golden-center{position:absolute;top:0;bottom:0;left:0;right:0}.modal .modal-window{width:420px;padding:18px;background:#fff}.modal .modal-window .modal-title{line-height:30px;font-size:17px;margin-bottom:16px}.modal .modal-window .modal-title .close{top:0;right:0;position:absolute;padding:5px;cursor:pointer}.modal .modal-window .modal-title:hover svg path{fill:#888}.modal .modal-window .modal-title svg{width:19px}.modal .modal-window .modal-title svg path{fill:#bbb}.modal.raw-data-modal .modal-window{width:70%;height:85%;min-height:200px}\n", ""]);

	// exports


/***/ }

});