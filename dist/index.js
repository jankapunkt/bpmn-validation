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
			process: true,
			activities: true
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
				if (err || !definitions) {
					callback(err, definitions);
					return;
				}
				var result = [];
				try {
					result = this.validateModdleContext(definitions);
				} catch (validationErr) {
					callback(validationErr, definitions);
				}
				callback(null, result);
			}.bind(this));
		}
	}, {
		key: 'validateModdleContext',
		value: function validateModdleContext(definitions) {
			var results = [];

			// validate process itself
			// this looks for global rules
			// regarding all processes
			var roots = definitions.rootElements;
			if (this.validation.process) {
				results = results.concat(this.validateProcesses(roots));
			}

			// validate activites such as tasks
			// this looks for activity specific rules
			if (this.validation.activities) {
				var activities = roots[0].flowElements.filter(function (el) {
					return el.$type.indexOf("Task") > -1;
				});
				results = results.concat(this.validateActivities(activities));
			}

			return results;
		}
	}, {
		key: 'validateProcesses',
		value: function validateProcesses(processes) {
			var results = [];
			var pv = new _process2.default();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = processes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var rootElement = _step.value;


					if (rootElement.$type === 'bpmn:Process') {
						var processResults = pv.validate(rootElement);
						results = results.concat(processResults);
					} else if (rootElement.$type === 'bpmn:Collaboration' && this.validation.collaboration) {
						// TODO validate collaboration
					} else {
							// TODO error if none of these apply but validation of them is set to true
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

			return results;
		}
	}, {
		key: 'validateActivities',
		value: function validateActivities(activities) {
			var av = new _task2.default();
			var result = [];
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = activities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var activity = _step2.value;

					console.log(activity);
					var activityFindings = av.validate(activity);
					if (activityFindings.length > 0) {
						result = result.concat(activityFindings);
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return result;
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