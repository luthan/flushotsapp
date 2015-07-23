'use strict';

angular.module('core').filter('hourDisplay', [
	function() {
		return function(input) {
			if(input > 12){
				return (input-12) + ' pm';
			} else if (input === 12){
				return input + ' pm';
			} else{
				return input + ' am';
			}
		};
	}
]);