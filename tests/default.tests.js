/**
 * Created by jank87 on 18.05.17.
 */

import BpmnValidator from '../lib/index';

import {chai, assert} from 'chai';

describe('Basic usage', function () {

	it ("imports correctly from the lib", function() {
		assert.isDefined(BpmnValidator);
		assert.isNotNull(BpmnValidator);
	})

});