var Sequelize = require('sequelize'); //require sequelize package
var db = require('../models/db_connection.js'); //require connection to the db

var User = db.define('user', { //set up model variables
    name: {
		unique: true,
		type: Sequelize.STRING //use date data type
	},
	password: Sequelize.STRING //float for distance
});

db.sync(); //if table does not exist, create it

module.exports = User;
