/**
 * Created by jank87 on 18.05.17.
 */

import BpmnModdle from 'bpmn-moddle';

import TaskValidator from './activities/task';

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
		throw new Error("not yet implemented");
	}

	validateModel(source, callback) {
		throw new Error("not yet implemented");
	}

	validateXmlModel(source, callback) {
		this.moddle.fromXML(xmlStr, function(err, definitions) {
			if (err || !definitions) callback(err, definitions);

			console.log(definitions);
		});
	}

	validateJsonModel(source, callback) {
		throw new Error("not yet implemented");
	}
}