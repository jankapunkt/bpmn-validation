'use strict';

/**
 * Created by jank87 on 18.05.17.
 */

var BpmnModdle = require('bpmn-moddle');

var moddle = new BpmnModdle();

var xmlStr = '<?xml version="1.0" encoding="UTF-8"?>' + '<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" id="empty-definitions" targetNamespace="http://bpmn.io/schema/bpmn">' + '</bpmn2:definitions>';

moddle.fromXML(xmlStr, function (err, definitions) {

	// update id attribute
	definitions.set('id', 'NEW ID');

	// add a root element
	var bpmnProcess = moddle.create('bpmn:Process', { id: 'MyProcess_1' });
	definitions.get('rootElements').push(bpmnProcess);

	console.log(definitions);

	moddle.toXML(definitions, function (err, xmlStrUpdated) {
		// xmlStrUpdated contains new id and the added process
	});
});