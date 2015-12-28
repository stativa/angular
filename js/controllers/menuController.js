define( function() {
    "use strict";

    return ['$http', '$scope', function($http, $scope){
        $scope.categories = [];

       // angular.extend(this, $controller('CategoryController', {$scope: $scope}));
        $http.get('categories.json').success(function(data){
            angular.forEach(data, function(index) {
                index.p_id == 0 ? $scope.categories.push(index) : null;
            });
        });
    }];

});
