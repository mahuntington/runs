var express = require('express'); //require express package
var app = express(); //create application variable
var fakeArray = require('./models/fakearray.js');
var PORT = process.env.PORT || 3000;

app.use(function(req, res, next){
	console.log('middleware doin. stuff');
	next();
});

app.use(function(req, res, next){
	console.log('2nd middleware doin. stuff');
	next();
});

app.use('/foo', function(req, res, next){
	console.log('3rd middleware doin. stuff');
	next();
});

app.get('/', function(request, response){
	response.render('index.ejs', {
		dataArray: fakeArray
	});
});

app.get('/foo', function(req, res){
	res.send('works');
});

app.get('/foo/bar', function(req, res){
	res.send('works');
});

//params: port, callback to execute once listening has begun
app.listen(PORT, function () { //start app listening on port 3000
	//once listening, execute this callback
	console.log('Example app listening on port 3000!');
});
