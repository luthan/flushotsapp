'use strict';


angular.module('core').controller('HomeController', ['$scope', '$cookies','$http', '$location', 'Authentication', 'Hours', 'Slots', 'Socket',
	function($scope, $cookies, $http, $location, Authentication, Hours, Slots, Socket) {
		// This provides Authentication context.
		//$scope.authentication = Authentication;
		var url = 'http://intranet.smithbucklin.com/util/info/getemployee/';
		$scope.employee = {};
		// $http.get(
		// 	url,
		// 	{params:{email:$cookies.get('SCRAPEMAIL')}}
		// 	).then(function(x){
		// 		console.log(x.data);
		// 		$scope.employee = x.data;
		// 	});
		
		$scope.createHour = function(){
			var hour = new Hours({
					name: parseInt($scope.hourName)
				});
				
			hour.$save(function(response){
				$scope.hours = Hours.query();
			});
		};	
		
		// Find a list of Hours
		$scope.find = function() {
			$scope.hours = Hours.query();
		};
		
		$scope.remove = function(hour){
			hour.$remove();
			for (var i in $scope.hours) {
				if ($scope.hours[i] === hour) {
					$scope.hours.splice(i, 1);
				}
			}
		};
		
		Socket.on('slot.updated', function() {
			var x = Hours.query().$promise.then(function(x){
				$scope.hours = x;
			});
			
		});
		
		$scope.addEmployee = function(slot){			
			Slots.get({
				slotId: slot._id
			}).$promise.then(function(x){
				x.employees.push('Paul');
				x.$update();
			});			
		};
		
		// $scope.findOne = function() {
		// 	$scope.slot = Slots.get({
		// 		slotId: $stateParams.slotId
		// 	});
		// };
		
	}
]);