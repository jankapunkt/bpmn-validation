/**
 * Created by jank87 on 18.05.17.
 */

import {chai, assert} from 'chai';

import {SettingsValidator} from '../../lib/utils/SettingsValidator'

describe('SettingsValidator', function () {

	it ("throws an erorr if the source object is invalid", function(){
		assert.throws(function(){
			SettingsValidator.validate(null);
		}, SettingsValidator.errors.NOT_VALID_OBJECT);

		let source;
		assert.throws(function(){
			SettingsValidator.validate(source);
		}, SettingsValidator.errors.NOT_VALID_OBJECT);

		source = function(){};
		assert.throws(function(){
			SettingsValidator.validate(source);
		}, SettingsValidator.errors.NOT_VALID_OBJECT);

		source = 1;
		assert.throws(function(){
			SettingsValidator.validate(source);
		}, SettingsValidator.errors.NOT_VALID_OBJECT);

		source = "some name";
		assert.throws(function(){
			SettingsValidator.validate(source);
		}, SettingsValidator.errors.NOT_VALID_OBJECT);

		source = true;
		assert.throws(function(){
			SettingsValidator.validate(source);
		}, SettingsValidator.errors.NOT_VALID_OBJECT);
	});


	it ("throws on unsupported element keys", function(){
		assert.throws(function(){
			SettingsValidator.validate({unsupported:true});
		}, SettingsValidator.errors.UNSUPPORTED_KEY);
	});

	it ("throws on unsupported element values", function(){
		assert.throws(function(){
			SettingsValidator.validate({process:1});
		}, SettingsValidator.errors.UNSUPPORTED_VALUE);
	});
});