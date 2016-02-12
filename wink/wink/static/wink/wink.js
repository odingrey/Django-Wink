var winkApp = angular.module('wink', [
	'ngRoute',
	'winkControllers',
	'ngMaterial',
	'ngMessages',
	'material.svgAssetsCache'
]);


winkApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '/static/wink/templates/main.html',
				controller: 'mainController'
			}).
			otherwise({
				redirectTo: '/'
			});
	}]
);
