var Sequelize = require('sequelize'); //require sequelize package
var db = require('../models/db_connection.js'); //require connection to the db

var Run = db.define('run', { //set up model variables
    date: Sequelize.DATE, //use date data type
    distance: Sequelize.FLOAT, //float for distance
});

db.sync(); //if table does not exist, create it

module.exports = Run;
