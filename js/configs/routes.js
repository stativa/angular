define( function ( ) {
    return function( $stateProvider, $urlRouterProvider ) {

        $urlRouterProvider.otherwise({redirectTo: '/404'});

        $stateProvider
            .state('catalogItem', {
                url:         '/item/:id',
                templateUrl: 'templates/catalog-item-list.html',
                controller:  'ItemController'
            })
            .state('catalogName', {
                url:         '/catalog/:name',
                templateUrl: 'templates/catalog.html',
                controller:  'CategoryController',
                //reloadOnSearch: false
            })
            .state('main', {
                url:         '/',
                templateUrl: 'templates/catalog.html',
                controller:  'MainController',
                //reloadOnSearch: false
            });
    };
});
