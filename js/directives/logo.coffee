uxteam = angular.module 'uxteam'

uxteam.directive 'logo', ($timeout, $rootScope) ->
	restrict: 'E'
	replace: true
	scope:
		'animate': '='
	template: '<div class="logo">
	<svg viewBox="0 0 76 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMinYMid meet">
		<title>UX: Enterprise User Experience</title>
		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" shape-rendering="geometricPrecision">
			<g id="logo" stroke="#D88800" stroke-width="5">
				<g id="ux_logo_stroke_version-01" transform="translate(2.000000, -2.000000)">
					<path d="M0.4,2 L0.4,35.3 C0.4,35.3 0.5,51.6 16.6,51.6 C32.5,51.6 32.6,36.1 32.6,36.1 L32.6,2" id="u"></path>
					<g id="x" transform="translate(31.000000, 0.000000)" >
						<path d="M2.2,-0.1 L42,56.7" id="Shape"></path>
						<path d="M39.8,0.2 L0.4,56.4" id="Shape"></path>
					</g>
				</g>
			</g>
		</g>
	</svg>
	</div>'
	link: (scope, element) ->
		if not scope.animate
			paths = element.find('path')
			for path in paths
				length = path.getTotalLength() + 10
				path.style.strokeDasharray = length
				path.style.strokeDashoffset = length
			scope.$watch 'animate', ->
				if scope.animate == true
					$timeout ->
						element.addClass('show')
					, 1000
