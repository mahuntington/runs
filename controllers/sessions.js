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
			req.session.currentUser = foundUser;
			res.redirect('/');
		} else {
			res.redirect('/sessions/new');
		}
	});
});

controller.delete('/', function(req, res){
	req.session.destroy(function(){
		res.redirect('/');
	})
});

module.exports = controller;
