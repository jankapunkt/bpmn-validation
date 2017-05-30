/**
 * Created by jank87 on 18.05.17.
 */

import Validator from '../Validator';

export default class TaskValidator extends Validator {

	constructor(){
		super();
	}

	validate(source) {
		this.validateSource(source);

		const results = new Array();
		console.log(source);
		return results;
	}
}