define( function() {
    "use strict";

    return ['$http', '$scope', '$state', '$location', function($http, $scope, $state, $location){
        $scope.categories = [];
        $scope.subcategories = [];
        $scope.$state = $state;

		$scope.click = function(){
			$location.search({});
		};
		
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
