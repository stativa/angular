angular.module('Halatik').controller('ItemController', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams){
    var id = $routeParams.id.split('-')[0];
    $scope.item = [];
    $http.get('items.json').success(function(data){
        angular.forEach(data, function(index) {
            if (index.id == id) {
                $scope.item = index;
                return;
            }
        });
    });
}]);
