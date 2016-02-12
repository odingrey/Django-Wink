var winkControllers = angular.module('winkControllers', []);

winkControllers.controller('testController', ['$scope', '$http',
	function($scope, $http){
		$scope.test = "This is a test";
	}
]);
