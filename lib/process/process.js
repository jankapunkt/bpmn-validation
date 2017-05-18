/**
 * Created by jank87 on 18.05.17.
 */
import Validator from '../Validator';

export default class ProcessValidator extends Validator {
	constructor() {
		super();
	}

	validate(source) {
		this.validateSource(source);

		const results = new Array();

		// requires ID
		const idErr = this.validateId(source.id);
		if (idErr) results.push(idErr);

		// should be executable
		// TODO properties will be in future checked with moddle fromn bpmn.io
		const execWarn = this.validateProperty(source, "isExecutable", "boolean", true, false);
		if (execWarn) results.push(execWarn);

		// requires at least a startevent an activity and an end event
		let startFound = false;
		let endFound = false;
		let taskFound = false;

		if (source.flowElements) {
			for (let element of source.flowElements) {
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
		}

		if (!taskFound) results.push(this.error("a process requires at least 1 task"));
		if (!startFound) results.push(this.error("a process requires at least 1 startevent"));
		if (!endFound) results.push(this.error("a process requires at least 1 endevent"));


		return results;
	}
}