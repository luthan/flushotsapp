'use strict';

angular.module('core').factory('Hours', ['$resource',
	function($resource) {
		return $resource('hours/:hourId', {
			hourId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);