define( function() {
    "use strict";

    return ['$http', '$scope', '$stateParams', function( $http, $scope, $stateParams ){
        var id = $stateParams.id.split('-')[0];
        $scope.item = [];
        $http.get('items.json').success(function(data){
            angular.forEach(data, function(index) {
                if (index.id == id) {
                    $scope.item = index;
                    return;
                }
            });
        });
    }];
});

