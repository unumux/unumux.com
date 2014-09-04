uxteam = angular.module 'uxteam'

class MainController
  @$inject: ['$scope', '$timeout']
  constructor: ($scope, $timeout) ->
    $scope.imagesLoaded = false
    $scope.timeoutExpired = false
    @ready = false

    $scope.ready =
        imagesLoaded: false
        timeoutExpired: false


    $timeout ->
      $scope.ready.timeoutExpired = true
    , 200

    $scope.$watch 'ready', =>
      if $scope.ready.imagesLoaded && $scope.ready.timeoutExpired
        $('nav ul li').each (idx, el) ->
          newWidth = $(el).width() + 1
          $(el).css('width', newWidth + "px")
          $(window).trigger('resize');


        $timeout =>
          $('nav ul li').css('width', '')
          $(window).trigger('resize')
          @ready = true
          $timeout ->
            $('nav ul li').addClass('load-ms-behavior');
          ,0
        , 0
    , true

    $.waitForImages.hasImgProperties = ['backgroundImage']

    $('nav.main-nav li').waitForImages
      finished: ->
        $scope.$apply ->
          $scope.ready.imagesLoaded = true
      waitForAll: true

uxteam.controller 'MainController', MainController