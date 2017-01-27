// Main JS should go here!
// Include scripts using Browserify by doing:
// var $ = require("jquery");


$('.carousel-container').slick({
    // autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    // appendDots: $('.carousel'),
    mobileFirst: true,
    swipeToSlide: true
});