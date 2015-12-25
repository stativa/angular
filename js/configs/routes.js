define( function ( ) {
    return ['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise('/404');

        return $stateProvider
            .state('catalogItem', {
                url:         '/catalog/:category/:id-:name',
                templateUrl: 'templates/catalog-item-list.html',
                controller:  'ItemController'
            })
            .state('catalogName', {
                url:         '/catalog/:name?:page',
                templateUrl: 'templates/catalog.html',
                controller:  'CategoryController',
                //reloadOnSearch: false
            })
            .state('main', {
                url:         '/?:page',
                templateUrl: 'templates/catalog.html',
                controller:  'MainController',
                //reloadOnSearch: false
            });
    }];
});
