define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$controller', '$state', function( $http, $scope, $location, $controller, $state ) {
        $scope.items = [];
        $scope.category = $state.params.name;
		$scope.numPerPage = 10;
        $scope.$state = $state;
		var currentPage  = $state.params.page || 1,
			urlBeginer = "catalog/" + $scope.category;

        $http.get('items.json').success(function(data){
            for (var i = 0; i < data.length; i++) {
                if (data[i].cat_translit == $scope.category ) {
                    $scope.items.push(data[i]);
                }
            }

            // TODO: move this code to services
            $scope.pageChanged = function() {
                $scope.currentPage > 1 ?
                    $location.path(urlBeginer + "/page" + $scope.currentPage) :
					$location.path(urlBeginer);
                window.scrollTo(0,0);
            };
			
			$scope.currentPage = currentPage;
            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                $scope.filteredItems = $scope.items.slice(begin, end);
            });

        });
    }];
});
