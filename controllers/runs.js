var express = require('express');
var controller = express.Router();
var runs = require('../models/runs.js');

controller.get('/', function(req, res){
	res.json(runs);
});

controller.get('/new', function(req, res){
	res.send('run new page');
});

controller.get('/:id', function(req, res){
	res.json(runs[req.params.id]);
});

controller.post('/', function(req, res){
	console.log(req.body.distance);
	res.send('works');
})

module.exports = controller;
