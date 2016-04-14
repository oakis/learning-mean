'use strict';

var express = require('express');
var parser = require('body-parser');
var morgan = require('morgan');

var api = require('./api');

var index = './index.html';
var admin = './admin.html';
var options = {
	root: './public'
};

var app = express();

// Load database
require('./db');

app.use(express.static('public'));
app.use('/app', express.static('app'));
app.use(parser.json());
app.use(morgan('dev'));

app.use('/api', api);

app.get('/', function (req, res, next) {
	res.sendFile(index, options);
});

app.get('/admin', function (req, res, next) {
	res.sendFile(admin, options);
});

app.listen(3000, function() {
    console.log("The server is running on port 3000!");
});