"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SettingsValidator = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by jank87 on 18.05.17.
                                                                                                                                                                                                                                                                               */

var _SupportedElements = require("./SupportedElements");

/**
 * Validates the source object for validation settings, in order to prevent false settings.
 * @type {{errors: {NOT_VALID_OBJECT: string, UNSUPPORTED_KEY: string, UNSUPPORTED_VALUE: string}, validate: SettingsValidator.validate}}
 */
var SettingsValidator = exports.SettingsValidator = {

	errors: {
		NOT_VALID_OBJECT: "settings are not a valid object:",
		UNSUPPORTED_KEY: "unsupported settings-key:",
		UNSUPPORTED_VALUE: "unsupported settings-value:"
	},

	validate: function validate(source) {

		if (!source || (typeof source === "undefined" ? "undefined" : _typeof(source)) !== 'object') throw new Error(this.errors.NOT_VALID_OBJECT + (typeof source === "undefined" ? "undefined" : _typeof(source)));

		for (var key in source) {

			if (_SupportedElements.SupportedElements.indexOf(key) === -1) throw new Error(this.errors.UNSUPPORTED_KEY + key);

			var value = source[key];
			if (typeof value !== 'boolean') throw new Error(this.errors.UNSUPPORTED_VALUE + (typeof value === "undefined" ? "undefined" : _typeof(value)));
		}
	}

};