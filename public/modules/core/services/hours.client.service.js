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

angular.module('core').factory('Slots', ['$resource',
	function($resource) {
		return $resource('slots/:slotId', {
			slotId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);