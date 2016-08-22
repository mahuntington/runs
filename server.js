var express = require('express'); //require express package
var app = express(); //create application variable


app.get('/', function(request, response){
	response.render('index.ejs');
});

//params: port, callback to execute once listening has begun
app.listen(3000, function () { //start app listening on port 3000
	//once listening, execute this callback
	console.log('Example app listening on port 3000!');
});
