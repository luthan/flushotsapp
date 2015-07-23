'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * TimeSlot Schema
 */
var TimeSlotSchema = new Schema({
	name: String,
	employees: [String],
	hour: { type: Schema.Types.ObjectId, ref: 'Hour'}
});

mongoose.model('TimeSlot', TimeSlotSchema);