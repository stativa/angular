define( function() {
    "use strict";

    return ['$http', '$scope', '$stateParams', '$state', function( $http, $scope, $stateParams, $state ){
        var id = $stateParams.id.split('-')[0];
        $scope.category;
        $scope.subcategory;
        $scope.item = [];
        $scope.breadcrumb = [];

        $http.get('json/items.json').success(function(data){
            data.forEach(function(index) {
                if (index.id == id) {
                    $scope.item = index;
                    $scope.breadcrumb.push(index.cat_name);
                    $scope.breadcrumb.push(index.subcat_id);
                    $scope.breadcrumb.push(index.name);

                    return;
                }
            });
        });
    }];
});