"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by jank87 on 18.05.17.
 */

var Validator = function () {
	function Validator() {
		_classCallCheck(this, Validator);

		this.errors = {
			OVERRIDE: "this method needs to be overridden",
			SOURCE_NOT_DEFINED: "there is no source to validate",
			REQUIRED_ID: "an ID is required"
		};

		this.warnings = {};
	}

	_createClass(Validator, [{
		key: "error",
		value: function error(description, target) {
			return this.result("error", description, target);
		}
	}, {
		key: "warning",
		value: function warning(description, target) {
			return this.result("warning", description, target);
		}
	}, {
		key: "result",
		value: function result(type, description, target) {
			return { type: type, description: description, target: target };
		}
	}, {
		key: "validate",
		value: function validate(source) {
			throw new Error(this.errors.OVERRIDE);
		}
	}, {
		key: "validateSource",
		value: function validateSource(source) {
			if (!source) throw new Error(this.errors.SOURCE_NOT_DEFINED);
		}
	}, {
		key: "validateId",
		value: function validateId(id) {
			// every element requires an id
			if (!id || !id.length || id.length === 0) return this.error(this.errors.REQUIRED_ID, "null");else return null;
		}
	}, {
		key: "validateProperty",
		value: function validateProperty(source, propName, type, expectedValue, isError) {
			var prop = source[propName];

			var valid = (typeof prop === "undefined" ? "undefined" : _typeof(prop)) === type && prop === expectedValue;
			if (valid) return null;

			if (isError) return this.error("incorrect property: " + propName, source.id);else return this.warning("incorrect property: " + propName, source.id);
		}
	}]);

	return Validator;
}();

exports.default = Validator;