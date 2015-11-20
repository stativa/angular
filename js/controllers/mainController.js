define( function() {
    "use strict";

    return ['$http', '$scope', '$location', function( $http, $scope, $location ) {
        $scope.items = [];
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

            $scope.numPerPage = 10,
                    $scope.currentPage = $location.$$url.indexOf('page=') + 1 ?
                            $location.$$url.substr($location.$$url.indexOf("=")+1) : 1;
            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                $scope.filteredItems = $scope.items.slice(begin, end);
            });
            ////////////////////////////////////////////
        });
    }];
});
