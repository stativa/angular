define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$controller', '$stateParams', function( $http, $scope, $location, $controller, $stateParams ) {
        $scope.items = [];
        $scope.category = $stateParams.name;
		$scope.numPerPage = 10;

		var currentPage  = $stateParams.page || 1,
			urlBeginer = "catalog/" + $scope.category;

     //   angular.extend(this, $controller('MenuController', {$scope: $scope}));
        $http.get('items.json').success(function(data){
            for (var i = 0; i < data.length; i++) {
                if (data[i].cat_translit == $scope.category ) {
                    $scope.items.push(data[i]);
                }
            }

            //////////////////////////////////////////// copied
            $scope.pageChanged = function() {
                $scope.currentPage > 1 ?
                    $location.path(urlBeginer + "/" + $scope.currentPage) : 
					$location.path(urlBeginer);
                window.scrollTo(0,0);
            };
			
			$scope.currentPage = currentPage;
            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                $scope.filteredItems = $scope.items.slice(begin, end);
            });
            ////////////////////////////////////////////////////////
        });
    }];
});
