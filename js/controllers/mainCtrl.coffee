uxteam = angular.module 'uxteam'

class MainController
	constructor: ($scope, $route, $rootScope, $timeout) ->
		$scope.imagesLoaded = false
		$scope.timeoutExpired = false
		@ready = false

		$scope.ready =
			imagesLoaded: false
			timeoutExpired: false


		$timeout =>
			$scope.ready.timeoutExpired = true
		, 200

		# $('nav.main-nav li').each  ->
		# 	console.log('each')
		# 	bg = $(this).css('background-image')
		# 	bg = bg.replace('url(','').replace(')','')

		# 	$scope.imgLoads.push(false)
		# 	currIndex = $scope.imgLoads.length - 1

		# 	img = new Image()

		# 	console.log(bg)

		# 	img.onload = ->
		# 		$scope.imgLoads[currIndex] = true
		# 		console.log('currIndex')

		# 	img.src = bg

		# $scope.$watch 'imgLoads', =>
		# 	allTrue = true
		# 	for img in $scope.imgLoads
		# 		if img == false
		# 			allTrue = false


		# 	if allTrue
		# 		@imagesLoaded = true
		# 		alert('alltrue!')
		# 		setTimeout ->
		# 			$(window).trigger('resize');
		# 		, 0

		$scope.$watch 'ready', =>
			if $scope.ready.imagesLoaded && $scope.ready.timeoutExpired
				$('nav ul li').each (idx, el) =>
					newWidth = $(el).width() + 1
					$(el).css('width', newWidth + "px");
					$(window).trigger('resize');


				$timeout =>
					$('nav ul li').css('width', '')
					$(window).trigger('resize');
					@ready = true
					$timeout =>
						$('nav ul li').addClass('load-ms-behavior');
					,0
				, 0
		, true

		$.waitForImages.hasImgProperties = ['backgroundImage'];

		$('nav.main-nav li').waitForImages
			finished: =>
				$scope.$apply ->
					$scope.ready.imagesLoaded = true
			waitForAll: true





		

uxteam.controller 'MainController', MainController