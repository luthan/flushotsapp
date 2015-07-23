'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Hour Schema
 */
var HourSchema = new Schema({
	name: Number,
	slots: [{ type: Schema.Types.ObjectId, ref: 'TimeSlot'}]
});

mongoose.model('Hour', HourSchema);