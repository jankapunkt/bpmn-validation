/**
 * Created by jank87 on 18.05.17.
 */

import BpmnModdle from 'bpmn-moddle';

// default imports
import TaskValidator from './activities/task';
import ProcessValidator from './process/process';

// named imports
import {SupportedElements} from './utils/SupportedElements';
import {SettingsValidator} from './utils/SettingsValidator';


export const SingleValidators = {
	task: TaskValidator,
	process: ProcessValidator,
};

export default class BpmnValidator {

	constructor() {

		this.moddle = new BpmnModdle();

		// defalt settings for validation
		// will be extended when it gets
		// more complex by certain elements
		this.validation = {
			process: true,
		};
	}

	setValidationMode(validations) {

		// only override if settings are correct
		SettingsValidator.validate(validations);

		// override settings from validations object
		Object.assign(this.validation, validations);
	}

	validateXmlModel(source, callback) {
		this.moddle.fromXML(source, function (err, definitions) {
			if (err || !definitions) {
				callback(err, definitions);
				return;
			}
			let result = [];
			try {
				result = this.validateModdleContext(definitions);
			}catch(validationErr){
				callback(validationErr, definitions);
			}
			callback(null, result);
		}.bind(this));
	}

	validateModdleContext(definitions) {
		let result = [];
		const roots = definitions.rootElements;
		for (let rootElement of roots) {
			if (rootElement.$type === 'bpmn:Process' && this.validation.process) {
				const pv = new ProcessValidator();
				const processResults = pv.validate(rootElement);
				result = result.concat(processResults);
			}
		}
		return result;
	}

	validateJsonModel(source, callback) {
		throw new Error("not yet implemented");
	}
}