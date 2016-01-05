define( function ( ) {
    return ['$stateProvider', '$urlRouterProvider', function( $stateProvider, $urlRouterProvider ) {
        $urlRouterProvider.otherwise('/404');

        return $stateProvider
            .state('main', {
                url:         '/',
                templateUrl: 'templates/catalog.html',
                controller:  'MainController'
            })
            .state('catalogName', {
                url:         '/catalog/:name',
                templateUrl: 'templates/catalog.html',
                controller:  'CategoryController'
            })
           .state('catalogName.Page', {
                url:         '/page{page:[0-9]{1,2}}',
                templateUrl: 'templates/catalog.html',
                controller:  'CategoryController'
            })
            .state('catalogName.Item', {
                url:         '/{id:[0-9]{1,5}}-:itemName',
                templateUrl: 'templates/catalog-item-list.html',
                controller: function() {
                    alert(0);
                }
            })




            .state('route1', {
                url: "/route1",
                templateUrl: "templates/route1.html",
                controller: function($scope){
                    alert("1");
                }
            })
            .state('route1.list', {
                url: "/list",
                templateUrl: "templates/route1.list.html",
                controller: function($scope){
                    $scope.items = ["A", "List", "Of", "Items"];
                    alert("1-1");
                }
            })

            .state('route2', {
                url: "/route2",
                templateUrl: "templates/route2.html",
                controller: function($scope){
                    alert("2");
                }
            })
            .state('route2.list', {
                url: "/list",
                templateUrl: "templates/route2.list.html",
                controller: function($scope){
                    $scope.things = ["A", "Set", "Of", "Things"];
                    alert("2-1");
                }
            })











    }];
});
