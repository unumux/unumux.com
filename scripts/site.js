// Main JS should go here!
// Include scripts using Browserify by doing:
// var $ = require("jquery");

// CAROUSEL ======================================
$('.carousel-container').slick({
    // autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    // appendDots: $('.carousel'),
    mobileFirst: true,
    swipeToSlide: true
});

// TEAM PAGE =======================================

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


const contents = document.querySelectorAll('.team__content');
const images2 = document.querySelectorAll('.team__image');
const modals = document.querySelectorAll('.team__modal');

function controlModal(e) {
    // console.log(e.target);
    // hide all other modals
    modals.forEach((modal) => {
        modal.setAttribute('data-active', 'false');
    });

    if(window.innerWidth < 768) { // account for when user activates js then makes screen bigger ?? check carls' slack for js

        // need a way to hide all modals and remove overlay when any other element is clicked
        


        // get content for clicked team member
        const currentContent = e.target.nextElementSibling;
        // if not currently active, make it active
        if(currentContent.dataset.active === 'false') {
            currentContent.setAttribute('data-active', 'true');
        }
    }
}

function killEverything(e) {
    modals.forEach(modal => {
        if(e.target !== modal) {
            if(modal.dataset.active === 'true') {
                console.log("kill everything!!");
                modal.setAttribute('data-active', 'false');
            }
        }
    });
}


modals.forEach(modal => modal.addEventListener('click', killEverything));
images2.forEach(image => image.addEventListener('click', controlModal));
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => button.addEventListener('click', killEverything));
// this still doesn't quite work, click anywhere and it goes away now. why. and also click on the modal itself and it goes away