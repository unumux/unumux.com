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


function applyOverlay(e) {
teamArray.forEach(function(teamEl) {
    teamEl.setAttribute('data-active', 'false');
})
e.target.parentNode.setAttribute('data-active', 'true');
}

function removeOverlay(e) {
teamArray.forEach(function(teamEl) {
    teamEl.removeAttribute('data-active');
})
}

images.forEach(function(imageEl) {
imageEl.addEventListener('mouseenter', applyOverlay);
imageEl.addEventListener('mouseleave', removeOverlay);
});


// TEAM PAGE CODE

const contents = document.querySelectorAll('.team__content');
const images2 = document.querySelectorAll('.team__image');
const body = document.querySelector('body');

function controlModal(e) {
    console.log(e.target);
    // hide all other modals
    if(window.innerWidth < 768) { // ask carl about this
        contents.forEach((content) => {
            content.setAttribute('data-active', 'false');
            // body.classList.remove('overlay');
        });

        // need a way to hide all modals when any other element is clicked 

        // get content for clicked team member
        const currentContent = e.target.nextElementSibling;
        // if not currently active, make it active
        if(currentContent.dataset.active === 'false') {
        currentContent.setAttribute('data-active', 'true');
        //   body.classList.add('overlay');
        }
    }
}

images2.forEach(image => image.addEventListener('click', controlModal));