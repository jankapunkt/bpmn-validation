/**
 * Created by jank87 on 18.05.17.
 */

import BpmnValidator from '../lib/index';

import {chai, assert} from 'chai';

describe('Default Import and Instantiation', function () {

	it ("imports correctly from the lib", function() {
		assert.isDefined(BpmnValidator);
		assert.isNotNull(BpmnValidator);
	})


	it ("creates a new BpmnValidator, where constructor successfully completes", function () {
		const validator = new BpmnValidator();
		assert.isDefined(validator);
		assert.isNotNull(validator);

		assert.isDefined(validator.moddle);
		assert.isNotNull(validator.moddle);

		assert.isDefined(validator.validation);
		assert.isNotNull(validator.validation);
	});

});

////////////////////////////////////////////////////////////////////////////////////////////////////

const defaultProcess =
	'<?xml version="1.0" encoding="UTF-8"?>' + 
 '	<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">' + 
 '	<bpmn:process id="Process_1" isExecutable="false">' + 
 '	<bpmn:startEvent id="StartEvent_1" name="start">' + 
 '	<bpmn:outgoing>SequenceFlow_0rrfb9a</bpmn:outgoing>' + 
 '</bpmn:startEvent>' + 
 '<bpmn:task id="Task_1hjk5qs" name="task1">' + 
 '	<bpmn:incoming>SequenceFlow_0rrfb9a</bpmn:incoming>' + 
 '<bpmn:outgoing>SequenceFlow_0bzaiyf</bpmn:outgoing>' + 
 '</bpmn:task>' + 
 '<bpmn:sequenceFlow id="SequenceFlow_0rrfb9a" sourceRef="StartEvent_1" targetRef="Task_1hjk5qs" />' + 
 '	<bpmn:endEvent id="EndEvent_1q4o9b0" name="end">' + 
 '	<bpmn:incoming>SequenceFlow_0bzaiyf</bpmn:incoming>' + 
 '</bpmn:endEvent>' + 
 '<bpmn:sequenceFlow id="SequenceFlow_0bzaiyf" sourceRef="Task_1hjk5qs" targetRef="EndEvent_1q4o9b0" />' + 
 '	</bpmn:process>' + 
 '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' + 
 '	<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' + 
 '	<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">' + 
 '	<dc:Bounds x="343" y="284" width="36" height="36" />' + 
 '	<bpmndi:BPMNLabel>' + 
 '<dc:Bounds x="350" y="320" width="22" height="13" />' + 
 '	</bpmndi:BPMNLabel>' + 
 '</bpmndi:BPMNShape>' + 
 '<bpmndi:BPMNShape id="Task_1hjk5qs_di" bpmnElement="Task_1hjk5qs">' + 
 '	<dc:Bounds x="473" y="262" width="100" height="80" />' + 
 '	</bpmndi:BPMNShape>' + 
 '<bpmndi:BPMNEdge id="SequenceFlow_0rrfb9a_di" bpmnElement="SequenceFlow_0rrfb9a">' + 
 '	<di:waypoint xsi:type="dc:Point" x="379" y="302" />' + 
 '	<di:waypoint xsi:type="dc:Point" x="473" y="302" />' + 
 '	<bpmndi:BPMNLabel>' + 
 '<dc:Bounds x="426" y="280" width="0" height="13" />' + 
 '	</bpmndi:BPMNLabel>' + 
 '</bpmndi:BPMNEdge>' + 
 '<bpmndi:BPMNShape id="EndEvent_1q4o9b0_di" bpmnElement="EndEvent_1q4o9b0">' + 
 '	<dc:Bounds x="632" y="284" width="36" height="36" />' + 
 '	<bpmndi:BPMNLabel>' + 
 '<dc:Bounds x="641" y="323" width="19" height="13" />' + 
 '	</bpmndi:BPMNLabel>' + 
 '</bpmndi:BPMNShape>' + 
 '<bpmndi:BPMNEdge id="SequenceFlow_0bzaiyf_di" bpmnElement="SequenceFlow_0bzaiyf">' + 
 '	<di:waypoint xsi:type="dc:Point" x="573" y="302" />' + 
 '	<di:waypoint xsi:type="dc:Point" x="601" y="302" />' + 
 '	<di:waypoint xsi:type="dc:Point" x="601" y="302" />' + 
 '	<di:waypoint xsi:type="dc:Point" x="632" y="302" />' + 
 '	<bpmndi:BPMNLabel>' + 
 '<dc:Bounds x="616" y="295.5" width="0" height="13" />' + 
 '	</bpmndi:BPMNLabel>' + 
 '</bpmndi:BPMNEdge>' + 
 '</bpmndi:BPMNPlane>' + 
 '</bpmndi:BPMNDiagram>' + 
 '</bpmn:definitions>';

describe('Default Validation', function () {

	let validator;

	beforeEach(function(){
		validator = new BpmnValidator();
	});

	it ("validates a default process of one task with start and end", function(done){

		validator.validateXmlModel(defaultProcess, function (err, result) {
			if (err || !result) done(err || new Error("failed: result is " + result));

			assert.isTrue(Array.isArray(result));
			assert.equal(result.length, 0);
			done();
		});
	});

});



////////////////////////////////////////////////////////////////////////////////////////////////////

// see the specific tests for validations settings
// in SettingsValidator.tests
describe('Default Validation Settings', function () {

	let validator;

	beforeEach(function(){
		validator = new BpmnValidator();
	});

	it ("instantiates with default validation settings", function(){
		assert.equal(validator.validation.process, true);
		// TODO all the defaults here
	});


	it ("allows to override validation settings", function(){

		assert.equal(validator.validation.process, true);
		validator.setValidationMode({
			process:false,
		});

		assert.equal(validator.validation.process, false);
	});

	it ("applies new validation settings to the validation", function(){
		assert.fail("not yet implemented")
	});


});