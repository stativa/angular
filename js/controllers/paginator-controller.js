/* 
 * This file isn't in use
 */
angular.module('Halatik').controller('paginatorController', ['$http', '$scope', '$location', '$controller', function($http, $scope, $location, $controller){
         angular.extend(this, $controller('CatalogController', {$scope: $scope}));

        ////////////////////////////////////////////
        $scope.pageChanged = function() {
            $scope.currentPage > 1 ? $location.search("page=" + $scope.currentPage) : $location.search("");
            $("body").scrollTop();
        };

        $scope.numPerPage = 10,
        $scope.currentPage = $location.$$url.indexOf('page=') + 1  ?  $location.$$url.substr($location.$$url.indexOf("=")+1) : 1;

        $scope.$watch('currentPage + numPerPage', function() {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage),
            end = begin + $scope.numPerPage;
            $scope.filteredItems = $scope.items.slice(begin, end);
        });
  /////////////////////////////////////////////
}]);
