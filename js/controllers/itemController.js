define( function() {
    "use strict";

    return ['$http', '$scope', '$stateParams', '$state', function( $http, $scope, $stateParams, $state ){
        var id = $stateParams.id.split('-')[0];
        $scope.category;
        $scope.subcategory;
        $scope.item = [];
        $scope.breadcrumb = [];

        $http.get('/api/items/' + id).success(function(data){
            $scope.item = data[0];
            $scope.breadcrumb.push(data[0].cat_name);
            $scope.breadcrumb.push(data[0].subcat_id);
            $scope.breadcrumb.push(data[0].name);
        });
    }];
});