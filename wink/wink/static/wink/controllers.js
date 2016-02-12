var winkControllers = angular.module('winkControllers', []);

winkControllers.controller('mainController', ['$scope', '$http',
	function($scope, $http) {
		$scope.test = "This is a test";
	}
]);

winkControllers.controller('NavCtrl', function($scope, $timeout, $mdSidenav) {
	$scope.toggleLeft = buildDelayedToggler('left');
	/**
	* Function that operates until the time is up.
	**/
	function debounce(func, wait, context) {
		var timer;
			return function debounced() {
			var context = $scope,
				args = Array.prototype.slice.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function() {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
	}
	/**
	* Handles open and closing of sidenav.
	**/
	function buildDelayedToggler(navID) {
		return debounce(function() {
			$mdSidenav(navID).toggle();
		}, 200);
	}
		function buildToggler(navID) {
		return function() {
			$mdSidenav(navID).toggle();
		}
	}
});

winkControllers.controller('LeftCtrl', function($scope, $mdSidenav) {
	$scope.close = function() {
		$mdSidenav('left').close();
	};
});
