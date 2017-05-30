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
			activities: true,
			sequenceflow:true,
			gateways:true,
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
		let results = [];

		// validate process itself
		// this looks for global rules
		// regarding all processes
		const roots = definitions.rootElements;
		if (this.validation.process) {
			results = results.concat(this.validateProcesses(roots));
		}

		// validate activites such as tasks
		// this looks for activity specific rules
		if (this.validation.activities && roots[0].flowElements) {
			const activities = roots[0].flowElements.filter(function(el){
				return el.$type.indexOf("Task") > -1;
			});
			results = results.concat(this.validateActivities(activities));
		}



		return results;
	}


	validateProcesses(processes) {
		let results = [];
		const pv = new ProcessValidator();
		for (let rootElement of processes) {

			if (rootElement.$type === 'bpmn:Process') {
				const processResults = pv.validate(rootElement);
				results = results.concat(processResults);
			}else if(rootElement.$type === 'bpmn:Collaboration' && this.validation.collaboration){
				// TODO validate collaboration
			}else{
				// TODO error if none of these apply but validation of them is set to true
			}
		}
		return results;
	}

	validateActivities(activities) {
		const av = new TaskValidator();
		let result = [];
		for (let activity of activities){
			const activityFindings = av.validate(activity);
			if (activityFindings.length > 0) {
				result = result.concat(activityFindings);
			}
		}
		return result;
	}

	validateJsonModel(source, callback) {
		throw new Error("not yet implemented");
	}
}