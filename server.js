var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');

var app = express();
var port = process.env.PORT || 3000;

//route
var routes = require('./routes/index');
var todos = require('./routes/todos');
var login = require('./routes/login');
var reg = require('./routes/reg');
var logout = require('./routes/logout');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(session({
    secret: 'lh'
}));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);
app.use('/todos', todos);
app.use('/login', login);
app.use('/reg', reg);
app.use('/logout', logout);

http.createServer(app).listen(port, function(){
  console.log('server is running on port' + port);
});
