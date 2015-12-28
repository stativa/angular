define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$stateParams', function( $http, $scope, $location, $stateParams ) {
        $scope.items = [];
        var numPerPage = 10;

        $http.get('items.json').success(function(data){
            for (var i = 0; i < data.length; i++) {
                if (data[i].cat_id == 1) {
                    $scope.items.push(data[i]);
                }

                if ($scope.items.length === numPerPage) {
                    break;
                }
            }

        });
    }];
});
