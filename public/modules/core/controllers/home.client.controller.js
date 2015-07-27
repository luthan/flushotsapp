'use strict';


angular.module('core').controller('HomeController', ['$scope', '$cookies','$http', '$location', 'Authentication', 'Hours', 'Slots',
	function($scope, $cookies, $http, $location, Authentication, Hours, Slots) {
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
		
		
		// 		$scope.update = function() {
		// 	var article = $scope.article;

		// 	article.$update(function() {
		// 		$location.path('articles/' + article._id);
		// 	}, function(errorResponse) {
		// 		$scope.error = errorResponse.data.message;
		// 	});
		// };
		
		$scope.addEmployee = function(slot){
			var slotToUpdate = {};
			Slots.get({
				slotId: slot._id
			}).$promise.then(function(x){
				slotToUpdate = x;
				slotToUpdate.employees.push("Paul");
				slotToUpdate.$update(function(){
					$location.path('slots/' + slot._id);
				});
				$scope.hours = Hours.query();
			});
			
			
			
			
			
			// slotToUpdate.$update(function(){
			// 	console.log("test");
			// 	$location.path('slots/' + slot._id);
			// }, function(errorResponse){
			// 	$scope.error = errorResponse.data.message;
			// });
			
		};
		
		$scope.findOne = function() {
			$scope.slot = Slots.get({
				slotId: $stateParams.slotId
			});
		};
		
	}
]);