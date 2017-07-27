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
// DESKTOP BEHAVIOR
const teamMembers = document.querySelectorAll('.team__member');
const images = document.querySelectorAll('.team__image');
const content = document.querySelectorAll('.team__content');

const teamArray = Array.from(teamMembers);
const imageArray = Array.from(images);


function applyOverlay(e) {
    teamArray.forEach(function(teamEl) {
        teamEl.dataset.active = false;
    });
    e.target.dataset.active = true;
}

function removeOverlay(e) {
    teamArray.forEach(function(teamEl) {
        teamEl.removeAttribute('data-active');
    });
}

teamArray.forEach(function(teamEl) {
    teamEl.addEventListener('mouseenter', applyOverlay);
    teamEl.addEventListener('mouseleave', removeOverlay);
});




// MOBILE BEHAVIOR
const contents = document.querySelectorAll('.team__content');
const images2 = document.querySelectorAll('.team__image');
const modals = document.querySelectorAll('.team__modal');

function controlModal(e) {
    // hide all other modals
    modals.forEach((modal) => {
        modal.setAttribute('data-active', 'false');
    });

    if(window.innerWidth < 768) { // account for when user activates js then makes screen bigger ?? check carls' slack for js
        // get content for clicked team member
        const currentContent = e.target.nextElementSibling;
        // if not currently active, make it active
        if(currentContent.dataset.active === 'false') {
            currentContent.setAttribute('data-active', 'true');
        }
    }
}

// kill the modal if you click away
function killEverything(e) {
    if(e.target.classList.contains('team__modal')) {
        e.target.setAttribute('data-active', 'false');   
    }
};


modals.forEach(modal => modal.addEventListener('click', killEverything));
images2.forEach(image => image.addEventListener('click', controlModal));


// Practice finding positions of elements

// console.log(imageArray[1].x);

// const value = imageArray[5].x;
// you could, save all the values minus their offsets, and apply those values to the __content 

// console.log(value);

// const bio = document.querySelectorAll('team__content');

// bio.style.top = value + 'px';

// imageArray[1].style.top = value + 'px';