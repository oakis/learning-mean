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

function checkEmpty (data) {
	if (typeof data == 'undefined')
		data = ''
	else
		data = data.split(',');
	return data;
}

router.post('/', function (req, res) {
	crud.create({ 
		author: req.body.author,
		date: Date.now(),
		heading: req.body.heading,
		text: req.body.text,
		tags: checkEmpty(req.body.tags),
		category: req.body.category
	 }, function (err, small) {
	  if (err) return handleError(err);
	  else res.json();
	  console.log('Saved to DB');
	})
});

router.delete('/', function (req, res) {
	crud.remove({ _id: req.query._id }, function (err) {
	  if (err) return err;
	  else res.json();
	});
});

router.put('/', function (req, res) {
	crud.update({ _id: req.query._id },
		{$set:{ 
			author: req.body.author,
			date: req.body.date,
			dateUpdated: Date.now(),
			heading: req.body.heading,
			text: req.body.text,
			tags: req.body.tags,
			category: req.body.category
		 }}, function (err) {
	  if (err) return err;
	  else res.json();
	});
});

module.exports = router;