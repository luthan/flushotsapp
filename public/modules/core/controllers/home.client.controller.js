'use strict';


angular.module('core').controller('HomeController', ['$scope', '$cookies','$http', '$location', 'Authentication', 'Hours',
	function($scope, $cookies, $http, $location, Authentication, Hours) {
		// This provides Authentication context.
		//$scope.authentication = Authentication;
		
		var url = 'http://intranet.smithbucklin.com/util/info/getemployee/';
		$scope.employee = {};
		$http.get(
			url,
			{params:{email:$cookies.get('SCRAPEMAIL')}}
			).then(function(x){
				console.log(x.data);
				$scope.employee = x.data;
			});
		
		$scope.createHour = function(){
			var hour = new Hours({
				name: parseInt($scope.hourName)
				});
				
			hour.$save(function(response){
				$location.path('hours');
			});
		};	
		
		// Find a list of Hours
		$scope.find = function() {
			$scope.hours = Hours.query();
		};
		
	}
]);