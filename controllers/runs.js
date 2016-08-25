var express = require('express');
var bodyParser = require('body-parser');
var controller = express.Router();
var Run = require('../models/runs.js');
var User = require('../models/users.js');

controller.use(bodyParser.json());

controller.get('/', function(req, res){
	User.findById(req.session.currentUser.id).then(function(foundUser){
		foundUser.getRuns().then(function(currentUserRuns){
			res.json(currentUserRuns);
		})
	});
});

controller.get('/:id', function(req, res){
	// Run.findOne({
		// where:{
			// id:req.params.id
		// }
	Run.findById(req.params.id).then(function(foundRuns){
		res.json(foundRuns);
	});
});

controller.post('/', function(req, res){
	User.findById(req.session.currentUser.id).then(function(foundUser){
		Run.create(req.body).then(function(createdRun){
			//createdRun is the object representation of the row created in the DB
			foundUser.addRun(createdRun).then(function(createdRun){
				res.json(createdRun);
			})
		});
	});
});

controller.put('/:id', function(req, res){
	Run.update(
		req.body, //change the selected runs to match this object
		{
			where: {
				id: req.params.id //only update rows that have the column id set to 1
			}
		}
	).then(function(didSucceed){
    	res.json(didSucceed); //respond with success status
	});
});

controller.delete('/:id', function(req, res){
	Run.destroy({ //destroy the run as specified by id in the url
		where: {
			id: req.params.id //only delete rows that have the column id set to 1
	    }
	}).then(function(didSucceed){
		res.json(didSucceed); //send back if it succeeded
	});
});

module.exports = controller;
