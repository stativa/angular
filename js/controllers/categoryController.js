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



            var names = [
                {name: 'Hi'},
                {name: 'there'},
                {name: 'this'},
                {name: 'is'},
                {name: 'an'},
                {name: 'opinionated'},
                {name: 'paginator'},
                {name: 'directive.'},
                {name: 'It'},
                {name: 'just'},
                {name: 'adds'},
                {name: 'some'},
                {name: 'bells'},
                {name: 'and'},
                {name: 'whistles'},
                {name: 'to'},
                {name: 'angular-bootsraps'},
                {name: 'paginator'}
            ];

            var items = [];
            var deletedItems = [];
            var index;

            for (var i = 0; i <= 200; i++) {
                index = Math.floor(Math.random() * (17 + 1));

                items.push({name: names[index].name + ' - ' + i});
            }

            for (var j = 0; j <= 50; j++) {
                index = Math.floor(Math.random() * (17 + 1));

                deletedItems.push({name: names[index].name + ' - (deleted)' + j});
            }

            $scope.data = {
                pagination: {
                    limit: 5,
                    items: items
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
