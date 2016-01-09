define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$stateParams', function( $http, $scope, $location, $stateParams ) {
        $scope.items = [];
        var numPerPage = 10;

        $http.get('items.json').success(function(data){
            data.forEach(function(index) {
                if (index.cat_id == 1) {
                    $scope.items.push(index);
                }
            });

        });
    }];
});
