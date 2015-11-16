define( function() {
    "use strict";

    return ['$http', '$scope', function($http, $scope){
        $scope.categories = [];
        $http.get('categories.json').success(function(data){
            console.log(data)
            angular.forEach(data, function(index) {
                index.p_id == 0 ? $scope.categories.push(index) : $.noop();
            });
        });
    }];

});
