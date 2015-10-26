angular.module('Halatik').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider   
		.when('/item/:id', {
			templateUrl: 'templates/catalog-item-list.html',
			controller: 'ItemController'
		})		
		.when('/catalog/:name', {
			templateUrl: 'templates/catalog.html',
			controller: 'CategoryController',
			reloadOnSearch: false
		})		
		.when('/', {
			templateUrl: 'templates/catalog.html',
			controller: 'MainPageController',
			reloadOnSearch: false
		})
		.otherwise({redirectTo: '/404'});
	$locationProvider.html5Mode(true);
}]);