define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$controller', '$stateParams', function( $http, $scope, $location, $controller, $stateParams ) {
        $scope.items = [];
        $scope.category = $stateParams.name;
		$scope.numPerPage = 10;
		var current  = $stateParams.page || 1,
			urlBeginer = "catalog/" + $scope.category;
		
		
        angular.extend(this, $controller('MenuController', {$scope: $scope}));
        $http.get('items.json').success(function(data){
            var currentCategoryId;
            angular.forEach($scope.categories, function(key, value){
                if (key.translit == $scope.category) {
                    currentCategoryId = key.id;
                }
            });
            angular.forEach(data, function(index) {
                if (index.cat_id == currentCategoryId && index.view == 1) {
                    $scope.items.push(index);
                }
            });
            //////////////////////////////////////////// copied
            $scope.pageChanged = function() {
                $scope.currentPage > 1 ?
                    $location.path(urlBeginer + "/" + $scope.currentPage) : 
					$location.path(urlBeginer);
                window.scrollTo(0,0);
            };
			
			$scope.currentPage = current;
            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                $scope.filteredItems = $scope.items.slice(begin, end);
            });
            ////////////////////////////////////////////////////////
        });
    }];
});
