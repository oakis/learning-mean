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

// List items
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
	console.log('Add item: '+req.body);
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
	console.log('Delete item: '+req.query.del_id);
	crud.remove({ _id: req.query._id }, function (err, posts) {
	  if (err) return err;
	  else res.json(posts);
	});
});

// Update item
router.put('/', function (req, res) {
	console.log('Update item: '+req.query._id);
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