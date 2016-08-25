var express = require('express');
var controller = express.Router();
var bodyParser = require('body-parser');
var User = require('../models/users.js')

controller.use(bodyParser.urlencoded({extended:true}));

controller.get('/new', function(req, res){
	res.render('users/new.ejs');
});

controller.post('/', function(req, res){
	User.create(req.body).then(function(createdUser){
		res.redirect('/');
	});
});

module.exports = controller;
