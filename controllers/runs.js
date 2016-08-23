var express = require('express');
var controller = express.Router();

controller.get('/', function(req, res){
	console.log(req.query.foo);
	res.send('run index page');
});

controller.get('/:id', function(req, res){
	res.send('run show page for id: ' +  req.params.id);
});

controller.get('/new', function(req, res){
	res.send('run new page');
});

module.exports = controller;
