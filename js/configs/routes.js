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
                url:         '/catalog/:name',
                templateUrl: 'templates/catalog.html',
                controller:  'CategoryController'

            })

           .state('catalogName.Page', {
                url:         '/page{page:[0-9]{1,2}}',
                templateUrl: 'templates/catalog.html'
            })
            .state('catalogNameSubcategory', {
                url:         '/catalog/:name/:subcategory',
                templateUrl: 'templates/catalog.html',
                controller:  'CategoryController'
            })

            .state('catalogNameSubcategory.Page', {
                url:         '/page{page:[0-9]{1,2}}',
                templateUrl: 'templates/catalog.html'
            })

            .state('catalogNameItem', {
                url:         '/catalog/:name/{id:[0-9]{1,5}}-:itemName',
                templateUrl: 'templates/catalog-item-list.html',
                controller:  'ItemController'
            })


    }];
});
