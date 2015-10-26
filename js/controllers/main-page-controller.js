angular.module('Halatik').controller('MainPageController', ['$http', '$scope', '$location', function($http, $scope, $location){	
  $scope.items = [];
	$http.get('items.json').success(function(data){
		angular.forEach(data, function(index) {
			index.cat_id == 1 && index.view == 1 ? $scope.items.push(index) : $.noop();
		});	
		////////////////////////////////////////////
		$scope.pageChanged = function() {
			$scope.currentPage > 1 ? 
				$location.search("page=" + $scope.currentPage) : $location.search("");
			$("body").scrollTop();
		};
/* TODO: chage $location.$$url.indexOf("=") with this
 *	var url = window.location.hash;
 *  var urlAux = url.split('=');
 *  var img_id = urlAux[1];
 */
		$scope.numPerPage = 10,
		$scope.currentPage = $location.$$url.indexOf('page=') + 1 ? 
			$location.$$url.substr($location.$$url.indexOf("=")+1) : 1;
		$scope.$watch('currentPage + numPerPage', function() {
			var begin = (($scope.currentPage - 1) * $scope.numPerPage), 
			end = begin + $scope.numPerPage;
			$scope.filteredItems = $scope.items.slice(begin, end);
		}); 
	});
}]);