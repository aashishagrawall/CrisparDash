angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.adminLoginData={}

		$scope.showerror=false;


		$scope.openAdminLoginPage = function() {
			console.log($scope.adminLoginData)

			Todos.verifyAdminDetails($scope.adminLoginData).then(function(data){
				var response=data.data;
				console.log(response);
				if(response.status==1){
							$scope.showerror=true;

							

				}else{
					window.location.href="/dashboard";
				}
				
			})

		};

		
	}]);