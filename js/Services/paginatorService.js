define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$controller', '$stateParams', function( $http, $scope, $location, $controller, $stateParams ) {
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

    }];
});
