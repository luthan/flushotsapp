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
	Hour.find({}).populate('slots').exec(function(err, posts){
		res.json(posts);
	});
};

exports.create = function(req, res){
	var hour = new Hour(req.body);
	var slots = ['00','15','30','45'];
	slots.forEach(function(x,y){
		var newslot = new TimeSlot({
			name: x
		});
		newslot.save();
		hour.slots.push(newslot);
	});
	
	hour.save(function(err, data){
		if(err){
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(data);
		}
		
	});
};

exports.delete = function(req, res){
	var hour = req.hour;
	hour.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(hour);
		}
	});
};

exports.hourById = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Hour is invalid'
		});
	}

	Hour.findById(id).exec(function(err, hour) {
		if (err) return next(err);
		if (!hour) {
			return res.status(404).send({
				message: 'Hour not found'
			});
		}
		req.hour = hour;
		next();
	});
};

exports.slotById = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Slot is invalid'
		});
	}

	TimeSlot.findById(id).exec(function(err, slot) {
		if (err) return next(err);
		if (!slot) {
			return res.status(404).send({
				message: 'Slot not found'
			});
		}
		req.slot = slot;
		next();
	});
};


exports.addEmployee = function(req, res){
	var slot = req.slot;
	slot = _.extend(slot, req.body);
	slot.save();
	
	var socketio = req.app.get('socketio');
	socketio.sockets.emit('slot.updated', slot);	
};

exports.read = function(req, res) {
	res.json(req.slot);
};
