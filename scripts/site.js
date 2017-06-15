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


const teamMembers = document.querySelectorAll('.team__member');
const images = document.querySelectorAll('.team__image');
const content = document.querySelectorAll('.team__content');

const teamArray = Array.from(teamMembers);
const imageArray = Array.from(images);


images.forEach(function(imageEl) {
  imageEl.addEventListener('mouseenter', applyOverlay);
  imageEl.addEventListener('mouseleave', removeOverlay);
});

function applyOverlay(e) {
  teamArray.forEach(function(teamEl) {
    teamEl.setAttribute('data-active', 'true');
  })
  e.target.parentNode.setAttribute('data-active', 'false');
}

function removeOverlay(e) {
  teamArray.forEach(function(teamEl) {
    teamEl.setAttribute('data-active', 'false');    
  })
}