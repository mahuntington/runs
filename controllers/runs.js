var express = require('express');
var controller = express.Router();

controller.get('/', function(req, res){
	res.send('inside runs controller: index route');
});

controller.get('/new', function(req, res){
	res.send('inside runs controller: new route');
});

module.exports = controller;
