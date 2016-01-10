define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$stateParams', function( $http, $scope, $location, $stateParams ) {
        $scope.items = [];

        $http.get('json/main.json').success(function(data){
            data.forEach(function(index) {
                $scope.items.push(index);
            });

        });
    }];
});
