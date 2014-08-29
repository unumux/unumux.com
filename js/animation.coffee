uxteam = angular.module 'uxteam'

uxteam.animation ".page-animation", ($animate, $window) ->

  enter: (element, done) ->
    animatedElement = element.children().eq(0)
    windowEl = angular.element($window)
    if animatedElement.hasClass('expanding-section')
      menuElement = angular.element(document.querySelectorAll("li.#{animatedElement.attr('id')}"))
      clonedMenuElement = $(menuElement).clone().appendTo('.main-nav ul')

      clonedMenuElement.one $.support.transition.end, ->
        clonedMenuElement.remove()
        
      originLeft = menuElement.offset().left / (windowEl.width() - menuElement.width()) * 100
      originRight = menuElement.offset().top / (windowEl.height() - menuElement.height()) * 100
      animatedElement.css
        transition: 'none'
        transform: "scale3d(#{menuElement.width() / windowEl.width()}, #{menuElement.height() / windowEl.height()}, 1)"
        opacity: 0
        transformOrigin: "#{originLeft}% #{originRight}%"
        zIndex: 9999

      clonedMenuElement.css
        transform: "scale3d(1, 1, 1)"
        transformOrigin: "#{originLeft}% #{originRight}%"
        transition: 'none'
        zIndex: 9999

      setTimeout ->
        animatedElement.css
          transition: '0.4s all, 0.3s opacity'
          transform: "scale3d(1, 1, 1)"
          opacity: 1
          zIndex: 9999

        clonedMenuElement.css
          transform: "scale3d(#{windowEl.width() / menuElement.width()}, #{windowEl.height() / menuElement.height()}, 1)"
          transition: '0.4s all, 0.3s opacity'
          opacity: 0
          zIndex: 9999

          

        done()
      , 10
    else if animatedElement.hasClass('slide-up')
      animatedElement.css
        transition: 'none'
        transform: 'translate3d(0, 100%, 0)'

      setTimeout ->
        animatedElement.css
          transition: '0.4s all'
          transform: 'translate3d(0, 0, 0)'

        done()
      , 10

    return

  leave: (element, done) ->
    animatedElement = element.children().eq(0)
    windowEl = angular.element($window)
    if animatedElement.hasClass('expanding-section')
      menuElement = angular.element(document.querySelectorAll("li.#{animatedElement.attr('id')}"))
      originLeft = menuElement.offset().left / (windowEl.width() - menuElement.width()) * 100
      originRight = menuElement.offset().top / (windowEl.height() - menuElement.height()) * 100

      animatedElement.css
        transition: 'none'
        transform: "scale3d(1, 1, 1)"
        opacity: 1
        transformOrigin: "#{originLeft}% #{originRight}%"
        zIndex: 9999

      menuElement.css
        transform: "scale3d(#{windowEl.width() / menuElement.width()}, #{windowEl.height() / menuElement.height()}, 1)"
        transformOrigin: "#{originLeft}% #{originRight}%"
        transition: 'none'
        opacity: 0
        zIndex: 9999

      setTimeout ->
        animatedElement.css
          transition: '0.4s all'
          transform: "scale3d(#{menuElement.width() / windowEl.width()}, #{menuElement.height() / windowEl.height()}, 1)"
          opacity: 0
          zIndex: 9999

        menuElement.css
          transform: "scale3d(1, 1, 1)"
          transition: '0.4s all'
          opacity: 1
          zIndex: 9999
          

        done()
      , 1
    else if animatedElement.hasClass('slide-up')
      animatedElement.css
        transition: '0.4s all'
        transform: 'translate3d(0, 100%, 0)'

      setTimeout done, 400
    return
