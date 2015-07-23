'use strict';

angular.module('core').filter('timeSlotDisplay', [
	function() {
		return function(input) {
			if(input){
				if(input.hour > 12){
					return (input.hour-12) + ':'+ input.name + ' pm';
				} else if (input.hour === 12){
				 	return input.hour + ':'+ input.name + ' pm';
				 } else{
				 	return input.hour + ':'+ input.name + ' am';
				 }
			}
		};
	}
]);