/// <reference path='../../../../typings/angularjs/angular.d.ts'/>
'use strict';


angular.module('core').controller('HomeController', ['$scope', '$cookies','$http', '$location', 'Authentication', 'Hours', 'Slots', 'Socket',
	function($scope, $cookies, $http, $location, Authentication, Hours, Slots, Socket) {
		// This provides Authentication context.
		//$scope.authentication = Authentication;
		
		// employee info api setup
		var url = 'http://intranet.smithbucklin.com/util/info/getemployee/';
		$scope.employee = {};
		$http.get(
			url,
			{params:{email:$cookies.get('SCRAPEMAIL')}}
			).then(function(x){
				$scope.employee = x.data;
				$scope.alreadyExists = false;
				$scope.takenSlot = 'none';
				var tempStore = Hours.query(function(){
					angular.forEach(tempStore, function(hour){
						
						angular.forEach(hour.slots, function(slot){
							if(slot.employees.indexOf($scope.employee['sb-userid']) > -1){
								$scope.alreadyExists = true;
								$scope.takenSlot = slot;
								$scope.takenSlot.hour = hour.name;
							}
						});
					});
					$scope.hours = tempStore;
				});
				
			});
		
		// $scope.createHour = function(){
		// 	var hour = new Hours({
		// 			name: parseInt($scope.hourName)
		// 		});
				
		// 	hour.$save(function(response){
		// 		$scope.hours = Hours.query();
		// 	});
		// };	
		
		// Find a list of Hours
		$scope.find = function(x) {
			console.log(x);
			// $scope.hours = Hours.query();
		};
		
		// $scope.remove = function(hour){
		// 	hour.$remove();
		// 	for (var i in $scope.hours) {
		// 		if ($scope.hours[i] === hour) {
		// 			$scope.hours.splice(i, 1);
		// 		}
		// 	}
		// };
		
		// socket io message recipient when employee is added to the time slot
		Socket.on('slot.updated', function() {
			$scope.alreadyExists = false;
			$scope.takenSlot = 'none';
			var x = Hours.query().$promise.then(function(x){
				angular.forEach(x, function(hour){
						angular.forEach(hour.slots, function(slot){
							if(slot.employees.indexOf($scope.employee['sb-userid']) > -1){
								$scope.alreadyExists = true;
								$scope.takenSlot = slot;
								$scope.takenSlot.hour = hour.name;
							}
						});
					});
				$scope.hours = x;
			});
			
		});
		
		$scope.addEmployee = function(slot){	
			// get the resource by timeslot's ID		
			Slots.get({
				slotId: slot._id
			}).$promise.then(function(x){
				// check if the employee is already in the time slot
				if(x.employees.indexOf($scope.employee['sb-userid']) > -1){
					x.employees.splice(x.employees.indexOf($scope.employee['sb-userid']), 1);
					x.$update();
				} else {
					// add the employee name to the employees array of the time slot
					x.employees.push($scope.employee['sb-userid']);
					// update the resource
					x.$update();
				}
			});			
		};
		
		// $scope.findOne = function() {
		// 	$scope.slot = Slots.get({
		// 		slotId: $stateParams.slotId
		// 	});
		// };
		
	}
]);