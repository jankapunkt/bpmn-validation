/**
 * Created by jank87 on 18.05.17.
 */

import {SupportedElements} from './SupportedElements'

/**
 * Validates the source object for validation settings, in order to prevent false settings.
 * @type {{errors: {NOT_VALID_OBJECT: string, UNSUPPORTED_KEY: string, UNSUPPORTED_VALUE: string}, validate: SettingsValidator.validate}}
 */
export const SettingsValidator = {

	errors: {
		NOT_VALID_OBJECT: "settings are not a valid object:",
		UNSUPPORTED_KEY: "unsupported settings-key:",
		UNSUPPORTED_VALUE: "unsupported settings-value:",
	},

	validate: function (source) {

		if (!source || typeof source !== 'object')
			throw new Error(this.errors.NOT_VALID_OBJECT + typeof source);

		for (let key in source) {

			if (SupportedElements.indexOf(key) === -1)
				throw new Error(this.errors.UNSUPPORTED_KEY + key);


			const value = source[key];
			if (typeof value !== 'boolean')
				throw new Error(this.errors.UNSUPPORTED_VALUE + typeof value);
		}
	},

};