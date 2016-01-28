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
		
		$scope.filter = {
			selectBrand : {
				availableOptions: [
					{id: '', name: 'Выберете бренд'},
					{id: 'hays', name: 'Hays'},
					{id: 'cocoon', name: 'Cocoon'},
					{id: 'virginia_secret', name: 'Virginia Secret'}
				],
				change: function(){
					var selected = $scope.filter.selectBrand.selected.id;
					$location.search("brand", selected ? selected : null);
					$location.search("page", null);
				},
				selected: ""
			},		
			selectSize : {
				availableOptions: [
					{id: '', name: 'Выберете размер'},
					{id: 's', name: 'S'},
					{id: 'm', name: 'M'},
					{id: 'l', name: 'L'},
					{id: 'xl', name: 'XL'},
					{id: 'xxl', name: 'XXL'},
					{id: 'xxxl', name: 'XXXL'},
					{id: 'xxxxl', name: 'XXXXL'}
				],
				change: function(){
					var selected = $scope.filter.selectSize.selected.id;
					$location.search("size", selected ? selected : null);
					$location.search("page", null);
				},
				selected: ""
			},			
			sort: function(type) {
				$location.search("sort", type);
			}			
		};
		
		$scope.filter.selectBrand.availableOptions.forEach(function(index, i) {
            index.id ==  $state.params.brand ?
                $scope.filter.selectBrand.selected = $scope.filter.selectBrand.availableOptions[i] : null;
        });

        $scope.filter.selectSize.availableOptions.forEach(function(index, i) {
            index.id ==  $state.params.size ?
                $scope.filter.selectSize.selected = $scope.filter.selectSize.availableOptions[i] : null;
        });
		

		// if page = 1, will remove it from url
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
			
			$scope.breadcrumb.push($scope.items[0].cat_name);
            $scope.breadcrumb.push($scope.items[0].subcat_id);

        });
    }];
});
