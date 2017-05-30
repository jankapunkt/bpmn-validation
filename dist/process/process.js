"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Validator2 = require("../Validator");

var _Validator3 = _interopRequireDefault(_Validator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by jank87 on 18.05.17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ProcessValidator = function (_Validator) {
	_inherits(ProcessValidator, _Validator);

	function ProcessValidator() {
		_classCallCheck(this, ProcessValidator);

		return _possibleConstructorReturn(this, (ProcessValidator.__proto__ || Object.getPrototypeOf(ProcessValidator)).call(this));
	}

	_createClass(ProcessValidator, [{
		key: "validate",
		value: function validate(source) {
			this.validateSource(source);

			var results = new Array();

			// requires ID
			var idErr = this.validateId(source.id);
			if (idErr) results.push(idErr);

			// should be executable
			// TODO properties will be in future checked with moddle fromn bpmn.io
			var execWarn = this.validateProperty(source, "isExecutable", "boolean", true, false);
			if (execWarn) results.push(execWarn);

			// requires at least a startevent an activity and an end event
			var startFound = false;
			var endFound = false;
			var taskFound = false;

			if (source.flowElements) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = source.flowElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var element = _step.value;

						if (taskFound && startFound && endFound) break;
						switch (element.$type) {
							case "bpmn:StartEvent":
								startFound = true;
								break;
							case 'bpmn:EndEvent':
								endFound = true;
								break;
							case 'bpmn:Task':
								taskFound = true;
								break;
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
			}

			if (!taskFound) results.push(this.error("a process requires at least 1 task", source.id));
			if (!startFound) results.push(this.error("a process requires at least 1 startevent", source.id));
			if (!endFound) results.push(this.error("a process requires at least 1 endevent", source.id));

			return results;
		}
	}]);

	return ProcessValidator;
}(_Validator3.default);

exports.default = ProcessValidator;