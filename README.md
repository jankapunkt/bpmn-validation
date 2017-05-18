[![Project Status: Concept – Minimal or no implementation has been done yet, or the repository is only intended to be a limited example, demo, or proof-of-concept.](http://www.repostatus.org/badges/latest/concept.svg)](http://www.repostatus.org/#concept)

[![Build Status](https://travis-ci.org/jankapunkt/bpmn-validation.svg?branch=master)](https://travis-ci.org/jankapunkt/bpmn-validation)


# bpmn-validation

A node package to validate bpmn models, based on the BPMN 2.0 standard.

## Goals

* The validation should focus on proper modeling styles, recommended by literature and authors of BPMN 2.0 publications.
* It should differentiate between modeling errors (e.g. unsupported combinations) and warnings (e.g. valid but not recommended) 
* It should be flexible enough to set the rules for validation on each element type on/off/strict/loose
* It should return a list of objects containing type (error, warning), description (what exactly is not valid), involved elements (ids/names)


## Roadmap

* read bpmn model from input
* validate file format
* validate elements
* validate possible elements extensions
* validate naming conventions
* validate processes (pools, lanes, sequences flows)
* validate gateway rules (exclusive, inclusive, parallel, complex)
* validate events (start, end, intermediate, throw/catch)
* validate collaboration (and message flows)
* validate escalations and exception handling

