webpackJsonp([8],{

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


/***/ },

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(473);
	var React = __webpack_require__(5);
	var constants_1 = __webpack_require__(222);
	var modal_1 = __webpack_require__(444);
	var button_1 = __webpack_require__(398);
	var AboutModal = (function (_super) {
	    __extends(AboutModal, _super);
	    function AboutModal() {
	        _super.call(this);
	    }
	    AboutModal.prototype.render = function () {
	        var onClose = this.props.onClose;
	        return React.createElement(modal_1.Modal, {className: "about-modal", title: "About", onClose: onClose}, React.createElement("p", null, "For feedback and support please visit the ", React.createElement("a", {href: "https://groups.google.com/forum/#!forum/imply-user-group"}, "Imply User Group"), "."), React.createElement("p", null, "For bug reports please create an issue on ", React.createElement("a", {href: "https://github.com/implydata/pivot/issues"}, "GitHub"), "."), React.createElement("p", null, React.createElement("a", {href: "https://github.com/implydata/pivot"}, "Imply Pivot"), " is released under the ", React.createElement("a", {href: "https://github.com/implydata/pivot/blob/master/LICENSE"}, "Apache 2.0"), " license."), React.createElement("div", {className: "button-bar"}, React.createElement(button_1.Button, {type: "primary", onClick: onClose, title: constants_1.STRINGS.close})));
	    };
	    return AboutModal;
	}(React.Component));
	exports.AboutModal = AboutModal;


/***/ },

/***/ 473:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(474);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./about-modal.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./about-modal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 474:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".about-modal p{margin-bottom:14px}.about-modal p:last-child{margin-bottom:0}.about-modal a{color:#1ea3e6;cursor:pointer}.about-modal a:hover{text-decoration:underline}.about-modal .button-bar{padding-top:6px}\n", ""]);

	// exports


/***/ }

});