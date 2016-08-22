var express = require('express'); //require express package
var app = express(); //create application variable
var fakeArray = require('./models/fakearray.js');
var PORT = process.env.PORT || 3000;

console.log(fakeArray);

app.get('/', function(request, response){
	response.render('index.ejs', {
		dataArray: fakeArray
	});
});

//params: port, callback to execute once listening has begun
app.listen(PORT, function () { //start app listening on port 3000
	//once listening, execute this callback
	console.log('Example app listening on port 3000!');
});
