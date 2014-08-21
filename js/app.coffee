uxteam = angular.module 'uxteam', [
  'ngAnimate',
  'ngRoute'
]

uxteam.config ($routeProvider) ->
  $routeProvider
    .when '/',
      templateUrl: 'views/main.html'
      controller: 'MainController'
    .when '/projects',
      templateUrl: 'views/latest-project.html'
      controller: 'ProjectsController as projects'
    .when '/:partial',
      templateUrl: (params) ->
        "/views/#{params.partial}.html"
      controller: 'MainController'
    .otherwise    
      redirectTo: '/'


uxteam.run ->
  # setup fastclick library
  FastClick.attach(document.body)