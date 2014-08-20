uxteam = angular.module 'uxteam'

class ProjectsController
	constructor: ($route, $rootScope) ->
		@title = "Test"
		

uxteam.controller 'ProjectsController', ProjectsController