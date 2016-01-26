define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$controller', '$state', function( $http, $scope, $location, $controller, $state ) {
        $scope.items = [];
        $scope.category = $state.params.name;
        $scope.subcategory = $state.params.subcategory;
        $scope.breadcrumb = [];
        $scope.numPerPage = 10;
        $scope.$state = $state;
        var currentPage  = $state.params.page || 1;

        $scope.selectBrand = {
            availableOptions: [
                {id: 'hays', name: 'Hays'},
                {id: 'cocoon', name: 'Cocoon'},
                {id: 'virginia_secret', name: 'Virginia Secret'}
            ],
            change: function(){
                var selected = $scope.selectBrand.selected;
                $location.search("brand", selected ? selected : null);
            },
            selected: "hays"
        };

		
		$scope.setPageSearch = function(currentPage){
			$location.search("page", currentPage == 1 ? null : currentPage);
		};
		
		$scope.setPageSearch(currentPage);
	
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

        //    $scope.breadcrumb.push($scope.items[0].cat_name);
       //     $scope.breadcrumb.push($scope.items[0].subcat_id);


            // TODO: move this code to services
            $scope.pageChanged = function() {							
				$scope.setPageSearch($scope.currentPage);
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
