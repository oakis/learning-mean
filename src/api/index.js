'use strict';

var express = require('express');
var crud = require('../models/crud');
var mongoose = require('mongoose');
var moment = require('moment');

var router = express.Router();

// List items by stuff
router.get('/', function (req, res, next) {
	if (req.query.tag != undefined) {
		crud.find({	tags: { $in: [req.query.tag] }	}, function(err, posts){
			if(err) {
				return console.error('Error: ' + err);
			} else {
				res.json(posts);
			}
		});
	} else if (req.query.cat != undefined) {
		crud.find({	category: { $in: [req.query.cat] }	}, function(err, posts){
			if(err) {
				return console.error('Error: ' + err);
			} else {
				res.json(posts);
			}
		});
	} else {
		next();
	}
});

// Sort items by stuff
router.get('/', function (req, res, next) {
	if (req.query.sortBy != undefined) {
		crud.find().sort({ [req.query.sortBy]:1 }).exec(function (err, posts) {
			if(err) {
				return console.error('Error: ' + err);
			} else {
				res.json(posts);
			}
		});
	} else {
		next();
	}
});

// Search items
router.get('/', function (req, res, next) {
	if (req.query.search != undefined) {
		var searchQuery = new RegExp(req.query.search, 'ig');
		console.log(searchQuery)
		crud.find({ $or: [ {heading: searchQuery}, {author: searchQuery}, {text: searchQuery} ] }).exec(function (err, posts) {
			if(err) {
				return console.error('Error: ' + err);
			} else {
				res.json(posts);
			}
		});
	} else {
		next();
	}
});

router.get('/', function (req, res, next) {
	if (req.query.post != undefined) {
		crud.find({	_id: [req.query.post] }, function(err, post){
			if(err) {
				return console.error('Error: ' + err);
			} else {
				res.json(post);
			}
		});
	} else {
		next();
	}
});

// List all items
router.get('/', function (req, res, next) {
	crud.find(function(err, posts){
		if(err) {
			return console.error('Error: ' + err);
		} else {
			res.json(posts);
		}
	});
});

// If tags is empty, return empty string, else split to array
function checkEmpty (data) {
	if (typeof data == 'undefined')
		data = ''
	else
		data = data.split(',');
	return data;
}

// Create item
router.post('/', function (req, res) {
	crud.create({ 
		author: req.body.author,
		date: moment().format('MMMM Do YYYY, h:mm:ss a'),
		heading: req.body.heading,
		text: req.body.text,
		tags: checkEmpty(req.body.tags),
		category: req.body.category
	 }, function (err, posts) {
	  if (err) return err;
	  else res.json(posts);
	  console.log('Saved to DB');
	})
});

// Delete item
router.delete('/', function (req, res) {
	crud.remove({ _id: req.query._id }, function (err, posts) {
	  if (err) return err;
	  else res.json(posts);
	});
});

// Update item
router.put('/', function (req, res) {
	crud.update({ _id: req.query._id },
		{$set:{ 
			author: req.body.author,
			date: req.body.date,
			dateUpdated: moment().format('MMMM Do YYYY, h:mm:ss a'),
			heading: req.body.heading,
			text: req.body.text,
			tags: req.body.tags,
			category: req.body.category
		 }}, function (err, posts) {
	  if (err) return err;
	  else res.json(posts);
	});
});

module.exports = router;