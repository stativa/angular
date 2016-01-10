define( function() {
    "use strict";

    return ['$http', '$scope', '$stateParams', '$state', function( $http, $scope, $stateParams, $state ){
        var id = $stateParams.id.split('-')[0];
        $scope.item = [];

        $http.get('json/items.json').success(function(data){
            data.forEach(function(index) {
                if (index.id == id) {
                    $scope.item = index;
                    return;
                }
            });
        });
    }];
});