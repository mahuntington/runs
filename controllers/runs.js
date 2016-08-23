var express = require('express');
var controller = express.Router();
var Run = require('../models/runs.js');

controller.get('/', function(req, res){
	res.json(runs);
});

controller.get('/:id', function(req, res){
	res.json(runs[req.params.id]);
});

controller.post('/', function(req, res){
	Run.create(req.body).then(function(createdRun){
		//createdRun is the object representation of the row created in the DB
		res.json(createdRun);
	});
});

controller.put('/:id', function(req, res){
	runs[req.params.id] = req.body;
	res.json(runs);
});

controller.delete('/:id', function(req, res){
	runs.splice(req.params.id, 1);
	res.json(runs);
});

module.exports = controller;
