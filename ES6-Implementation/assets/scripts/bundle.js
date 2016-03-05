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

	var _dropdown = __webpack_require__(3);

	var _dropdown2 = _interopRequireDefault(_dropdown);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var languages = ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"];

	var container = document.getElementById('DropDown-Wrapper');
	var test = new _dropdown2.default(languages, container).createDropDown();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DropDown = function () {
	  function DropDown(collection, parentNode) {
	    _classCallCheck(this, DropDown);

	    this.tagCollection = collection;
	    this.searchBar = document.createElement("INPUT");
	    this.container = parentNode;
	    this.active = { index: -1, currentTag: void 0 };
	  }

	  _createClass(DropDown, [{
	    key: "createDropDown",
	    value: function createDropDown() {
	      var _this = this;

	      this.container.appendChild(this.searchBar);

	      this.tagCollection.forEach(function (data) {
	        var tag = document.createElement("P");
	        tag.setAttribute('class', 'VISIBLE');
	        tag.appendChild(document.createTextNode(data));
	        _this.container.appendChild(tag);
	      });

	      this.keyDownListener();
	      this.clickListener();
	    }
	  }, {
	    key: "toggleOff",
	    value: function toggleOff() {
	      this.active.currentTag.setAttribute('class', 'VISIBLE');
	      this.active.currentTag.style.background = 'none';
	    }
	  }, {
	    key: "dispatchDirection",
	    value: function dispatchDirection() {
	      var d = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	      var visibleTags = arguments[1];

	      if (d === 'DOWN') {
	        this.active.currentTag = visibleTags[this.active.index += 1];
	      } else {
	        this.active.currentTag = visibleTags[this.active.index -= 1];
	      }
	      this.active.currentTag.setAttribute('class', 'VISIBLE active');
	      this.active.currentTag.style.background = 'blue';
	    }
	  }, {
	    key: "enter",
	    value: function enter(_ref) {
	      var allParagraphTags = _ref.allParagraphTags;
	      var keyValue = _ref.keyValue;

	      var activeLanguage = document.querySelector('.active');
	      this.searchBar.value = activeLanguage.innerHTML;

	      allParagraphTags.forEach(function (soloTag) {
	        soloTag.setAttribute('class', 'HIDDEN');
	        soloTag.style.display = 'none';
	      });
	    }
	  }, {
	    key: "upArrow",
	    value: function upArrow(constants) {
	      var visibleTags = constants.visibleTags;

	      if (this.active.index !== 0 && this.active.index !== -1) {
	        if (this.active.index !== -1) {
	          this.toggleOff();
	        }
	        this.dispatchDirection(void 0, visibleTags);
	      }
	    }
	  }, {
	    key: "downArrow",
	    value: function downArrow(constants) {
	      var visibleTags = constants.visibleTags;

	      if (this.active.index !== visibleTags.length - 1) {
	        if (this.active.index !== -1) {
	          this.toggleOff();
	        }
	        this.dispatchDirection('DOWN', visibleTags);
	      }
	    }
	  }, {
	    key: "filterTags",
	    value: function filterTags(_ref2) {
	      var allParagraphTags = _ref2.allParagraphTags;
	      var keyValue = _ref2.keyValue;


	      allParagraphTags.forEach(function (soloTag) {
	        var text = soloTag.innerHTML.toUpperCase();

	        if (text.indexOf(keyValue) === -1) {
	          soloTag.setAttribute('class', 'HIDDEN');
	          soloTag.style.display = 'none';
	        } else if (text.indexOf(keyValue) !== -1 && soloTag.style.display === 'none') {
	          soloTag.setAttribute('class', 'VISIBLE');
	          soloTag.style.display = 'block';
	        }
	      });
	    }
	  }, {
	    key: "keyReducer",
	    value: function keyReducer(constants) {
	      var keyNumber = constants.keyNumber;


	      switch (keyNumber) {
	        case 40:
	          return this.downArrow(constants);
	        case 38:
	          return this.upArrow(constants);
	        case 13:
	          return this.enter(constants);
	        default:
	          this.filterTags(constants);
	      }
	    }
	  }, {
	    key: "getKeyDownConstants",
	    value: function getKeyDownConstants(e) {

	      var visibleTags = [].concat(_toConsumableArray(document.querySelectorAll('.VISIBLE')));
	      var allParagraphTags = [].concat(_toConsumableArray(document.getElementsByTagName("p")));

	      var keyDownData = {
	        keyNumber: e.keyCode,
	        keyValue: e.target.value.toUpperCase(),
	        visibleTags: visibleTags,
	        allParagraphTags: allParagraphTags
	      };

	      this.keyReducer(keyDownData);
	    }
	  }, {
	    key: "keyDownListener",
	    value: function keyDownListener() {
	      this.searchBar.addEventListener("keyup", this.getKeyDownConstants.bind(this));
	    }
	  }, {
	    key: "clickListener",
	    value: function clickListener() {
	      var _this2 = this;

	      this.container.addEventListener('click', function (event) {
	        if (event.target.tagName === "P") {
	          _this2.searchBar.value = event.target.innerText;
	        }
	      });
	    }
	  }]);

	  return DropDown;
	}();

	exports.default = DropDown;


/***/ }
/******/ ]);
