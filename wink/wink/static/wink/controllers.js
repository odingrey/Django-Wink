var winkControllers = angular.module('winkControllers', []);


winkControllers.controller('mainController', ['$scope', '$http',
	function($scope, $http) {
		$http({
			method: 'GET',
			url: '/getUserInfo'
		}).then(function successCallback(response) {
			$scope.username = response.data.username;
			$scope.test = "This is a test!";
			fillBody();
		});
	}
]);

winkControllers.controller('loginController', ['$scope', '$http',
        function($scope, $http) {
        }
]);


winkControllers.controller('settingsController', ['$scope', '$http',
        function($scope, $http) {
		$scope.updateWink = function(wink) {
			$http({
				method: 'POST',
				url: '/settings/',
				data: { 'username': wink.username,
					'password': wink.password}
				}).then(function successCallback(response) {
					$scope.winkMessage = "Successfully updated wink information";
				}, function errorCallback(response) {
					$scope.winkMessage = "Failed to update wink information";
			
			});
		};
        }
]);


winkControllers.controller('registerController', ['$scope', '$http',
        function($scope, $http) {
        }
]);

winkControllers.controller('registerAPIController', ['$scope', '$http',
        function($scope, $http) {
        }
]);

winkControllers.controller('changeAPIController', ['$scope', '$http',
        function($scope, $http) {
        }
]);



winkControllers.controller('NavCtrl', function($scope, $timeout, $mdSidenav, $mdDialog, $mdMedia) {
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

	$scope.showSettings = function(ev) {
		$mdDialog.show({
			controller: DialogController,
			templateUrl: '/renderSettings',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true
		});
	};
});


function DialogController($scope, $mdDialog) {
	$scope.hide = function() {
		$mdDialog.hide();
	};

	$scope.cancel = function() {
		$mdDialog.cancel();
	};
};

winkControllers.controller('LeftCtrl', function($scope, $mdSidenav) {
	$scope.close = function() {
		$mdSidenav('left').close();
	};
});


