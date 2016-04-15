'use strict';

var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	author: String,
	date: Date,
	dateUpdated: Date,
	heading: String,
	text: String,
	tags: Array,
	category: String
});

var posts = mongoose.model('post', postSchema);

module.exports = posts;