(function() {
  var uxteam;

  uxteam = angular.module('uxteam');

  uxteam.animation(".page-animation", function($animate, $window) {
    return {
      enter: function(element, done) {
        var animatedElement, menuElement, originLeft, originRight, windowEl;
        animatedElement = element.children().eq(0);
        windowEl = angular.element($window);
        if (animatedElement.hasClass('expanding-section')) {
          menuElement = angular.element(document.querySelectorAll("li." + (animatedElement.attr('id'))));
          originLeft = menuElement.offset().left / (windowEl.width() - menuElement.width()) * 100;
          originRight = menuElement.offset().top / (windowEl.height() - menuElement.height()) * 100;
          animatedElement.css({
            transition: 'none',
            transform: "scale3d(" + (menuElement.width() / windowEl.width()) + ", " + (menuElement.height() / windowEl.height()) + ", 1)",
            opacity: 0,
            transformOrigin: "" + originLeft + "% " + originRight + "%"
          });
          menuElement.css({
            transform: "scale3d(1, 1, 1)",
            transformOrigin: "" + originLeft + "% " + originRight + "%",
            transition: 'none'
          });
          setTimeout(function() {
            animatedElement.css({
              transition: '0.4s all, 0.3s opacity',
              transform: "scale3d(1, 1, 1)",
              opacity: 1
            });
            menuElement.css({
              transform: "scale3d(" + (windowEl.width() / menuElement.width()) + ", " + (windowEl.height() / menuElement.height()) + ", 1)",
              transition: '0.4s all, 0.3s opacity',
              opacity: 0
            });
            return done();
          }, 10);
        } else if (animatedElement.hasClass('slide-up')) {
          animatedElement.css({
            transition: 'none',
            transform: 'translate3d(0, 100%, 0)'
          });
          setTimeout(function() {
            animatedElement.css({
              transition: '0.4s all',
              transform: 'translate3d(0, 0, 0)'
            });
            return done();
          }, 10);
        }
      },
      leave: function(element, done) {
        var animatedElement, menuElement, originLeft, originRight, windowEl;
        animatedElement = element.children().eq(0);
        windowEl = angular.element($window);
        if (animatedElement.hasClass('expanding-section')) {
          menuElement = angular.element(document.querySelectorAll("li." + (animatedElement.attr('id'))));
          originLeft = menuElement.offset().left / (windowEl.width() - menuElement.width()) * 100;
          originRight = menuElement.offset().top / (windowEl.height() - menuElement.height()) * 100;
          animatedElement.css({
            transition: 'none',
            transform: "scale3d(1, 1, 1)",
            opacity: 1,
            transformOrigin: "" + originLeft + "% " + originRight + "%"
          });
          menuElement.css({
            transform: "scale3d(" + (windowEl.width() / menuElement.width()) + ", " + (windowEl.height() / menuElement.height()) + ", 1)",
            transformOrigin: "" + originLeft + "% " + originRight + "%",
            transition: 'none',
            opacity: 0
          });
          setTimeout(function() {
            animatedElement.css({
              transition: '0.4s all',
              transform: "scale3d(" + (menuElement.width() / windowEl.width()) + ", " + (menuElement.height() / windowEl.height()) + ", 1)",
              opacity: 0
            });
            menuElement.css({
              transform: "scale3d(1, 1, 1)",
              transition: '0.4s all',
              opacity: 1
            });
            return done();
          }, 1);
        } else if (animatedElement.hasClass('slide-up')) {
          animatedElement.css({
            transition: '0.4s all',
            transform: 'translate3d(0, 100%, 0)'
          });
          setTimeout(done, 400);
        } else {
          setTimeout(done, 9999999);
        }
      }
    };
  });

}).call(this);
