angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/data');
			},
			verifyAdmin:function(details){
				return $http.get('localhost:3000'+'/verifyAdmin' + '/' + details.username + '/'+ details.password)
			},
			verifyAdminDetails:function(details){
				return $http.get('/verifyAdminDetails' + '/' + details.username + '/'+ details.password)
			},
			verifyAdminDetailsPost:function(details){
				return $http.post('/verifyAdminDetails',details)
			}
		}
	}]);