var express = require('express');
var bodyParser = require('body-parser');
var controller = express.Router();
var Users = require('../models/users.js');

controller.use(bodyParser.urlencoded({extended:true}));

controller.get('/new', function(req, res){
	res.render('sessions/new.ejs');
});

controller.post('/', function(req, res){
	Users.find({
		where: {
			name: req.body.name
		}
	}).then(function(foundUser){
		if(foundUser.password == req.body.password){
			res.redirect('/');
		} else {
			res.redirect('/sessions/new');
		}
	});
});

module.exports = controller;
