/**
 * Created by jank87 on 18.05.17.
 */

import BpmnModdle from 'bpmn-moddle';

// default imports
import TaskValidator from './activities/task';

// named imports
import {SupportedElements} from './utils/SupportedElements';
import {SettingsValidator} from './utils/SettingsValidator';



export const SingleValidators = {
	task: TaskValidator,
};

export default class BpmnValidator {

	constructor() {

		this.moddle = new BpmnModdle();

		// defalt settings for validation
		// will be extended when it gets
		// more complex by certain elements
		this.validation = {
			process:true,
		};
	}

	setValidationMode(validations) {

		// only override if settings are correct
		SettingsValidator.validate(validations);

		// override settings from validations object
		Object.assign(this.validation, validations);
	}


	validateXmlModel(source, callback) {
		this.moddle.fromXML(source, function(err, definitions) {
			if (err || !definitions) callback(err, definitions);

			console.log(definitions);

			callback(null, []);
		});
	}

	validateJsonModel(source, callback) {
		throw new Error("not yet implemented");
	}
}