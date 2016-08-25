var Sequelize = require('sequelize'); //require sequelize package
var Runs = require('./runs.js');
var db = require('../models/db_connection.js'); //require connection to the db

var User = db.define('user', { //set up model variables
    name: {
		unique: true,
		type: Sequelize.STRING //use date data type
	},
	password: Sequelize.STRING //float for distance
});

User.hasMany(Runs, { as: 'Runs' });

db.sync(); //if table does not exist, create it

module.exports = User;
