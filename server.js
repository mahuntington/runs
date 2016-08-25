var express = require('express'); //require express package
var app = express(); //create application variable
var PORT = process.env.PORT || 3000;

app.use(express.static('public')); //set up a static asset dir in /public

var runController = require('./controllers/runs.js');
app.use('/runs', runController);

var userController = require('./controllers/users.js');
app.use('/users', userController);

var sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);

app.get('/', function(request, response){
	response.render('index.ejs');
});

//params: port, callback to execute once listening has begun
app.listen(PORT, function () { //start app listening on port 3000
	//once listening, execute this callback
	console.log('Example app listening on port 3000!');
});
