define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$stateParams', function( $http, $scope, $location, $stateParams ) {
        $scope.items = [];	
		var current  = $stateParams.page || 1;
		$scope.numPerPage = 10;
		
        $http.get('items.json').success(function(data){
            angular.forEach(data, function(index) {
                if (index.cat_id == 1 && index.view == 1) {
                    $scope.items.push(index);
                }
            });

            //////////////////////////////////////////// copied
            $scope.pageChanged = function() {
                $scope.currentPage > 1 ?
                    $location.search("page=" + $scope.currentPage) : $location.search("");
                window.scrollTo(0,0);
            };
			
			$scope.currentPage = current;
            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                $scope.filteredItems = $scope.items.slice(begin, end);
            });
            ////////////////////////////////////////////
        });
    }];
});
