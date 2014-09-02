uxteam = angular.module 'uxteam', [
  'ngAnimate',
  'ngRoute',
  'ngSanitize',
  'angular-carousel'
]

uxteam.config ($routeProvider) ->
  $routeProvider
    .when '/projects',
      templateUrl: 'views/latest-project.html'
      controller: 'ProjectsController as projects'
    .when '/:partial',
      templateUrl: (params) ->
        "views/#{params.partial}.html"

    .otherwise    
      redirectTo: '/'


uxteam.run ($rootScope) ->
  # setup fastclick library

  if Modernizr.touch
    FastClick.attach(document.body)
    bouncefix.add('scrollable')

