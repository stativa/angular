define( function() {
    "use strict";

    return ['$http', '$scope', '$state', function($http, $scope, $state){
        $scope.categories = [];
        $scope.subcategories = [];
        $scope.$state = $state;

        $http.get('json/categories.json').success(function(data){
            angular.forEach(data, function(index) {
                if (index.p_id == 0) {
                    $scope.categories.push(index);
                } else {
                    $scope.subcategories[index.p_id] ? null : $scope.subcategories[index.p_id] = [];
                    $scope.subcategories[index.p_id].push(index);
                }
            });

        });
    }];

});
