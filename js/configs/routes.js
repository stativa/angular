define( function ( ) {
    return ['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise('/404');

        return $stateProvider
            .state('main', {
                url:         '/',
                templateUrl: 'templates/main.html',
                controller:  'MainController'

            })
            .state('catalogName', {
                url:         '/catalog/:name?page',
                templateUrl: 'templates/catalog.html',
                controller:  'CategoryController'
            })

            .state('catalogNameSubcategory', {
                url:         '/catalog/:name/:subcategory?page',
                templateUrl: 'templates/catalog.html',
                controller:  'CategoryController'
            })



            .state('catalogNameItem', {
                url:         '/catalog/:name/{id:[0-9]{1,5}}-:itemName',
                templateUrl: 'templates/catalog-item-list.html',
                controller:  'ItemController'
            })


    }];
});
