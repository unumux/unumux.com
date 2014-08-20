(function() {
  var ProjectsController, uxteam;

  uxteam = angular.module('uxteam');

  ProjectsController = (function() {
    function ProjectsController($route, $rootScope) {
      this.title = "Test";
    }

    return ProjectsController;

  })();

  uxteam.controller('ProjectsController', ProjectsController);

}).call(this);
