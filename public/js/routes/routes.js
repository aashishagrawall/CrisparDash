
 angular.module('scotchTodo', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/todos.html'
          
        })
        .when('/new', {
          templateUrl: '/hello.html'
          
       });
    }]);