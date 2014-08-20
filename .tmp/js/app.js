(function() {
  var uxteam;

  uxteam = angular.module('uxteam', ['ngAnimate', 'ngRoute']);

  uxteam.config(function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainController'
    }).when('/projects', {
      templateUrl: 'views/latest-project.html',
      controller: 'ProjectsController as projects'
    }).when('/:partial', {
      templateUrl: function(params) {
        return "/views/" + params.partial + ".html";
      },
      controller: 'MainController'
    }).otherwise({
      redirectTo: '/'
    });
  });

}).call(this);
