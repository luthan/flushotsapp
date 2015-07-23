'use strict';

module.exports = function(app) {
	// Root routing
	var core = require('../../app/controllers/core.server.controller');
	app.route('/').get(core.index);
	app.route('/hours')
		.get(core.list)
		.post(core.create);
		
	// app.param('hourId', articles.articleByID);
};
