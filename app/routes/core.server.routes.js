'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
	app.route('/hours')
		.get(core.list)
		.post(core.create);
	app.route('/hours/:hourId')
		.delete(core.delete);
	app.route('/slots/:slotId')
		.get(core.read)
		.put(core.addEmployee);
		
	app.param('hourId', core.hourById);
	app.param('slotId', core.slotById);
};
