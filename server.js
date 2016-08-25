var express = require('express'); //require express package
var session = require('express-session');
var app = express(); //create application variable
var PORT = process.env.PORT || 3000;

app.use(session({ //setting up session encryption info
	secret: "asdfasdfasdf", //unique keyword for encrypting session data
	resave: false, // don't resave session if nothing changed
	saveUninitialized: false //even if no data, set a cookie
}));

app.use(express.static('public')); //set up a static asset dir in /public

var runController = require('./controllers/runs.js');
app.use('/runs', runController);

var userController = require('./controllers/users.js');
app.use('/users', userController);

var sessionController = require('./controllers/sessions.js');
app.use('/sessions', sessionController);

app.get('/', function(req, res){
	res.render('index.ejs', {
		currentUser: req.session.currentUser
	});
});

//params: port, callback to execute once listening has begun
app.listen(PORT, function () { //start app listening on port 3000
	//once listening, execute this callback
	console.log('Example app listening on port 3000!');
});
