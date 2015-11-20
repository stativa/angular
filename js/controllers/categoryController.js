define( function() {
    "use strict";

    return ['$http', '$scope', '$location', '$controller', function( $http, $scope, $location, $controller ) {
        $scope.items = [];
        angular.extend(this, $controller('MenuController', {$scope: $scope}));
        $http.get('items.json').success(function(data){
            /*
             * $location.$$url.split("/")[2] - разбиваем УРЛ на массив, разбивая через "/".
             * Выбираем втрой элемент для категории
             * Если у нас урл вида catalog/kostjumy_dlja_doma?page=3 - split("?")[0] выделяем все,что до знака вопроса,чтоб точно выделить Категорию
             */
            var category = $location.$$url.split("/")[2].split("?")[0],
                currentCategoryId;
            angular.forEach($scope.categories, function(key, value){
                if (key.translit == category) {
                    currentCategoryId = key.id;
                }
            });
            angular.forEach(data, function(index) {
                if (index.cat_id == currentCategoryId && index.view == 1) {
                    $scope.items.push(index);
                }
            });
            //////////////////////////////////////////// copied
            $scope.pageChanged = function() {
                if ($scope.currentPage > 1) {
                    $location.search("page=" + $scope.currentPage) ;
                } else {
                    $location.search("");
                }
                window.scrollTo(0,0);
            };
            $scope.numPerPage = 10,
                /* TODO: chage $location.$$url.indexOf("=") with this
                 * var url = window.location.hash;
                 * var urlAux = url.split('=');
                 * var img_id = urlAux[1];
                 */
                $scope.currentPage = $location.$$url.indexOf('page=') + 1 ?
                    $location.$$url.substr($location.$$url.indexOf("=") + 1) : 1;
            $scope.$watch('currentPage + numPerPage', function() {
                var begin = (($scope.currentPage - 1) * $scope.numPerPage),
                    end = begin + $scope.numPerPage;
                $scope.filteredItems = $scope.items.slice(begin, end);
            });
            ////////////////////////////////////////////////////////
        });
    }];
});
