angular.module('dashboardservice', [])

	// super simple service
	// each function returns a promise object 
	.factory('Dashboard', ['$http',function($http) {
		return {
			getAllOrder : function() {
				return $http.get('/getAllOrder');
			},
			getAllTable:function(){
				return $http.get('/getAllTable');
			},
			changeTableStatus:function(details){
				return $http.post('/changeTableStatus',details)
			}
		}
	}]);