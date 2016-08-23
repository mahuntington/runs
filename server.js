var express = require('express'); //require express package
var app = express(); //create application variable
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

var runController = require('./controllers/runs.js');
app.use('/runs', runController);

app.get('/', function(request, response){
	response.render('index.ejs');
});

//params: port, callback to execute once listening has begun
app.listen(PORT, function () { //start app listening on port 3000
	//once listening, execute this callback
	console.log('Example app listening on port 3000!');
});
