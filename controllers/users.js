var express = require('express');
var controller = express.Router();
var bodyParser = require('body-parser');

controller.use(bodyParser.urlencoded({extended:true}));

controller.get('/new', function(req, res){
	res.render('users/new.ejs');
});

controller.post('/', function(req, res){
	res.send(req.body);
});

module.exports = controller;
