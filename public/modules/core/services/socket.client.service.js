'use strict';

angular.module('core').factory('Socket', ['socketFactory',
	function(socketFactory) {
		// Socket service logic
		// ...

		// Public API
		return socketFactory({
			prefix: '',
			ioSocket: io.connect('http://localhost:3000')
		});
	}
]);