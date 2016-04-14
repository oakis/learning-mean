'use strict';

var express = require('express');
var crud = require('../models/crud');
var mongoose = require('mongoose');

var router = express.Router();

router.get('/', function (req, res, next) {

	crud.find(function(err, posts){
		if(err) {
			return console.error('Error: ' + err);
		} else {
			res.json(posts);
		}
	});

});

router.post('/', function (req, res) {

	console.log('Request body: '+JSON.stringify(req.body));
	crud.create({ 
		author: req.body.author,
		date: Date.now(),
		heading: req.body.heading,
		text: req.body.text,
		tags: req.body.tags,
		category: req.body.category
	 }, function (err, small) {
	  if (err) return handleError(err);
	  console.log('Saved to DB')
	})
	res.redirect('/');

});

router.delete('/', function (req, res) {

	console.log('Request body: '+JSON.stringify(req.body));
	/*crud.remove({ 
		author: req.body.author,
		date: Date.now(),
		heading: req.body.heading,
		text: req.body.text,
		tags: req.body.tags,
		category: req.body.category
	 }, function (err, small) {
	  if (err) return handleError(err);
	  console.log('Saved to DB')
	})*/
	//res.redirect('/');

});

module.exports = router;