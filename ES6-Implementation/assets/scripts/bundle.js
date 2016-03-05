/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _dropdown = __webpack_require__(1);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var languages = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

	var container = document.getElementById('DropDown-Wrapper');
	var test = new _dropdown2.default(languages, container).createDropDown();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DropDown = function () {
	  function DropDown(data, parentNode) {
	    _classCallCheck(this, DropDown);

	    this.tagData = data;
	    this.searchBar = document.createElement("INPUT");
	    this.parentContainer = parentNode;
	    this.active = { index: -1, currentTag: void 0 };
	  }

	  _createClass(DropDown, [{
	    key: "createDropDown",
	    value: function createDropDown() {
	      var _this = this;

	      // Setting Up the Search Bar
	      var tags = document.createElement("LABEL");
	      tags.appendChild(document.createTextNode('TAGS:'));

	      // Adding classes to Parent Container and Search Bar
	      this.parentContainer.setAttribute('class', 'Tag-Container');
	      this.searchBar.setAttribute('class', 'SearchBar');

	      // Connecting SearchBar to Parent Container
	      this.parentContainer.appendChild(this.searchBar);
	      this.parentContainer.insertBefore(tags, this.parentContainer.childNodes[0]);

	      // Looping through passedIn Data. Appending it to DOM
	      this.tagData.forEach(function (data) {
	        var tag = document.createElement("P");
	        tag.appendChild(document.createTextNode(data));
	        tag.setAttribute('class', 'TAGS VISIBLE');
	        _this.parentContainer.appendChild(tag);
	      });

	      // Update the global store
	      this.updateStore();

	      // Setting Up Event Listeners
	      this.keyDownListener();
	      this.clickListener();
	      this.hoverListener();
	    }
	  }, {
	    key: "updateStore",
	    value: function updateStore() {
	      this.allDropDownTags = [].concat(_toConsumableArray(document.querySelectorAll('.TAGS')));
	      this.visibleTags = [].concat(_toConsumableArray(document.querySelectorAll('.VISIBLE')));
	    }

	    // After something has been clicked reset your active

	  }, {
	    key: "resetActive",
	    value: function resetActive() {

	      // If their is an active Tag get rid of it
	      if (this.active.currentTag) {
	        var className = this.active.currentTag.className.split(' ').filter(function (word) {
	          return word !== 'ACTIVE' ? true : false;
	        }).join(' ');

	        this.active.currentTag.setAttribute('class', className);
	        this.active = { index: -1, currentTag: void 0 };
	      }
	    }
	  }, {
	    key: "foundTag",
	    value: function foundTag() {
	      this.resetActive();

	      this.allDropDownTags.forEach(function (soloTag) {
	        soloTag.setAttribute('class', "TAGS HIDE");
	      });

	      this.updateStore();
	    }

	    // Allows you to just toggle the previous tag

	  }, {
	    key: "toggleActive",
	    value: function toggleActive() {
	      this.active.currentTag.setAttribute('class', 'TAGS VISIBLE');
	    }
	  }, {
	    key: "dispatchDirection",
	    value: function dispatchDirection() {
	      var d = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      if (d === 'DOWN') {
	        this.active.currentTag = this.visibleTags[this.active.index += 1];
	      } else {
	        this.active.currentTag = this.visibleTags[this.active.index -= 1];
	      }
	      this.active.currentTag.setAttribute('class', 'TAGS VISIBLE ACTIVE');
	    }
	  }, {
	    key: "enter",
	    value: function enter() {
	      var activeTag = document.querySelector('.ACTIVE');
	      this.searchBar.value = activeTag.innerHTML;
	      this.foundTag();
	    }
	  }, {
	    key: "upArrow",
	    value: function upArrow() {
	      if (this.active.index !== 0 && this.active.index !== -1) {
	        if (this.active.index !== -1) {
	          this.toggleActive();
	        }
	        this.dispatchDirection(void 0);
	      }
	    }
	  }, {
	    key: "downArrow",
	    value: function downArrow() {
	      if (this.active.index !== this.visibleTags.length - 1) {
	        if (this.active.index !== -1) {
	          this.toggleActive();
	        }
	        this.dispatchDirection('DOWN');
	      }
	    }
	  }, {
	    key: "filterTags",
	    value: function filterTags() {
	      var _this2 = this;

	      var exactMatch = false;

	      // Get rid of all the active tags
	      this.resetActive();

	      this.allDropDownTags.forEach(function (soloTag, i) {
	        var text = soloTag.innerHTML.toUpperCase();

	        if (text.indexOf(_this2.keyValue) === -1) {
	          soloTag.setAttribute('class', 'TAGS HIDE');
	        } else if (text === _this2.keyValue) {
	          _this2.active.currentTag = soloTag;
	          exactMatch = true;
	          soloTag.setAttribute('class', 'TAGS VISIBLE ACTIVE');
	        } else if (text.indexOf(_this2.keyValue) !== -1) {
	          soloTag.setAttribute('class', 'TAGS VISIBLE');
	        }
	      });

	      // Update the store constantly with all the new Visible Tags
	      this.updateStore();

	      // Tracker for active when visibility matches
	      if (exactMatch) {
	        this.visibleTags.forEach(function (visibleTag, i) {
	          if (visibleTag === _this2.active.currentTag) {
	            _this2.active.index = i;
	          }
	        });
	      }
	    }
	  }, {
	    key: "keyReducer",
	    value: function keyReducer() {

	      switch (this.keyNumber) {
	        case 40:
	          return this.downArrow();
	        case 38:
	          return this.upArrow();
	        case 13:
	          return this.enter();
	        case 37:
	          return 'NO LEFT ARROW';
	        case 39:
	          return 'NO RIGHT ARROW';
	        default:
	          return this.filterTags();
	      }
	    }
	  }, {
	    key: "getKeyDownConstants",
	    value: function getKeyDownConstants(e) {
	      this.keyNumber = e.keyCode;
	      this.keyValue = e.target.value.toUpperCase();
	      this.keyReducer();
	    }
	  }, {
	    key: "keyDownListener",
	    value: function keyDownListener() {
	      this.searchBar.addEventListener("keyup", this.getKeyDownConstants.bind(this));
	    }
	  }, {
	    key: "clickListener",
	    value: function clickListener() {
	      var _this3 = this;

	      this.parentContainer.addEventListener('click', function (event) {
	        if (event.target.tagName === "P") {
	          _this3.searchBar.value = event.target.innerText;
	          _this3.foundTag();
	        }
	      });
	    }
	  }, {
	    key: "hoverListener",
	    value: function hoverListener() {
	      this.parentContainer.addEventListener('mouseover', function (event) {});
	    }
	  }]);

	  return DropDown;
	}();

	exports.default = DropDown;

/***/ }
/******/ ]);