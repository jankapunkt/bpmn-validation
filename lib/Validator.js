/**
 * Created by jank87 on 18.05.17.
 */


export default class Validator {

	constructor() {
		this.errors = {
			OVERRIDE: "this method needs to be overridden",
			SOURCE_NOT_DEFINED: "there is no source to validate",
			REQUIRED_ID: "an ID is required",
		};

		this.warnings = {};
	}

	error(description, target) {
		return this.result("error", description, target);
	}

	warning(description, target) {
		return this.result("warning", description, target);
	}



	result(type, description, target) {
		return {type: type, description: description, target: target};
	}

	validate(source) {
		throw new Error(this.errors.OVERRIDE);
	}

	validateSource(source) {
		if (!source)
			throw new Error(this.errors.SOURCE_NOT_DEFINED);
	}

	validateId(id) {
		// every element requires an id
		if (!id || !id.length || id.length === 0)
			return this.error(this.errors.REQUIRED_ID, "null",);
		else
			return null;
	}

	validateProperty(source, propName, type, expectedValue, isError) {
		const prop = source[propName];

		const valid = (typeof prop === type && prop === expectedValue);
		if (valid) return null;

		if (isError)
			return this.error("incorrect property: " + propName, source.id);
		else
			return this.warning("incorrect property: " + propName, source.id);
	}
}