uxteam = angular.module 'uxteam'

class ProjectsController
	constructor: ($route, $rootScope, $http, $scope) ->
		$http.get('/data/projects.json')
			.then (res) =>
				@allProjects = res.data.projects

		@currentProject = 0
			
	nextProject: (e) ->
		e.preventDefault()
		@currentProject++

	prevProject: (e) ->
		e.preventDefault()
		@currentProject--


uxteam.controller 'ProjectsController', ProjectsController