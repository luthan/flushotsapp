'use strict';

/**
 * Module dependencies.
 */
 
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Hour = mongoose.model('Hour'),
	TimeSlot = mongoose.model('TimeSlot'),
	_ = require('lodash');
	
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.list = function(req, res){
	Hour.find(function(err, posts){
		res.json(posts);
	});
};

exports.create = function(req, res){
	var hour = new Hour();
	hour.name = 7;
};
	

/*
exports.create = function(req, res) {
	var article = new Article(req.body);
	article.user = req.user;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};
*/