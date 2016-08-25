var express = require('express');
var bodyParser = require('body-parser');
var controller = express.Router();

controller.use(bodyParser.urlencoded({extended:true}));

controller.get('/new', function(req, res){
	res.render('sessions/new.ejs');
});

controller.post('/', function(req, res){
	res.send(req.body);
});

module.exports = controller;
