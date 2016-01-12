define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$controller', '$state', function( $http, $scope, $location, $controller, $state ) {
        $scope.items = [];
        $scope.category = $state.params.name;
        $scope.subcategory = $state.params.subcategory;

		$scope.numPerPage = 10;
        $scope.$state = $state;
		var currentPage  = $state.params.page || 1,
			urlBeginer = "catalog/" + $scope.category + ($scope.subcategory ? "/" + $scope.subcategory  : "");

        $http.get('json/items.json').success(function(data){
            data.forEach(function(index) {
                if ($scope.subcategory) {
                    index.subcat_id == $scope.subcategory ? $scope.items.push(index) : null;
                    return;
                }

                if (index.cat_translit == $scope.category ) {
                    $scope.items.push(index);
                }
            });



            $scope.data = {
                pagination: {
                    limit: 10,
                    items: $scope.items,
                    page: 1
                }
            };

            // TODO: move this code to services
        /*    $scope.pageChanged = function() {
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
*/
        });
    }];
});
