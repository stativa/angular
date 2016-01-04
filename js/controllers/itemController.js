define( function() {
    "use strict";

    return ['$http', '$scope', '$stateParams', '$state', function( $http, $scope, $stateParams, $state ){
        var id = $stateParams.id.split('-')[0];
        $scope.item = [];
        console.log($state.params);

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