uxteam = angular.module 'uxteam'

class MainController
	constructor: ($scope, $route, $rootScope, $timeout) ->
		@imagesLoaded = false
		@timeoutExpired = false

		$scope.imgLoads = []

		$timeout =>
			@timeoutExpired = true
		, 200

		$('nav.main-nav li').each  ->
			bg = $(this).css('background-image')
			bg = bg.replace('url(','').replace(')','')

			$scope.imgLoads.push(false)
			currIndex = $scope.imgLoads.length - 1

			img = new Image()

			img.onload = do ->
				$scope.imgLoads[currIndex] = true

			img.src = bg

		$scope.$watch 'imgLoads', =>
			allTrue = true
			for img in $scope.imgLoads
				if img == false
					allTrue = false


			if allTrue
				@imagesLoaded = true





		

uxteam.controller 'MainController', MainController