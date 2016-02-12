var winkApp = angular.module('wink', [
	'ngRoute',
	'winkControllers'
]);


winkApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/angular', {
				templateUrl: '/static/wink/templates/test.html',
				controller: 'testController'
			}).
			otherwise({
				redirectTo: '/angular'
			});
	}]
);
