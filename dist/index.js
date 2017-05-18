'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.SingleValidators = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by jank87 on 18.05.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

// default imports


// named imports


var _bpmnModdle = require('bpmn-moddle');

var _bpmnModdle2 = _interopRequireDefault(_bpmnModdle);

var _task = require('./activities/task');

var _task2 = _interopRequireDefault(_task);

var _process = require('./process/process');

var _process2 = _interopRequireDefault(_process);

var _SupportedElements = require('./utils/SupportedElements');

var _SettingsValidator = require('./utils/SettingsValidator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SingleValidators = exports.SingleValidators = {
	task: _task2.default,
	process: _process2.default
};

var BpmnValidator = function () {
	function BpmnValidator() {
		_classCallCheck(this, BpmnValidator);

		this.moddle = new _bpmnModdle2.default();

		// defalt settings for validation
		// will be extended when it gets
		// more complex by certain elements
		this.validation = {
			process: true
		};
	}

	_createClass(BpmnValidator, [{
		key: 'setValidationMode',
		value: function setValidationMode(validations) {

			// only override if settings are correct
			_SettingsValidator.SettingsValidator.validate(validations);

			// override settings from validations object
			Object.assign(this.validation, validations);
		}
	}, {
		key: 'validateXmlModel',
		value: function validateXmlModel(source, callback) {
			this.moddle.fromXML(source, function (err, definitions) {
				if (err || !definitions) callback(err, definitions);

				var result = [];
				//console.log(definitions);
				var roots = definitions.rootElements;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = roots[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var rootElement = _step.value;

						if (rootElement.$type === 'bpmn:Process' && this.validation.process) {
							var pv = new _process2.default();
							var processResults = pv.validate(rootElement);
							result = result.concat(processResults);
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				callback(null, result);
			}.bind(this));
		}
	}, {
		key: 'validateJsonModel',
		value: function validateJsonModel(source, callback) {
			throw new Error("not yet implemented");
		}
	}]);

	return BpmnValidator;
}();

exports.default = BpmnValidator;