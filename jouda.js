//Mobile Menu

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav){ toggle.addEventListener('click', () => { nav.classList.toggle('show'); }) } 
}

showMenu('nav-toggle','nav-menu');

// Toggling Mobile Menu when a navlink is clicked

const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active');

    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}



navLink.forEach(n => n.addEventListener('click', linkAction));

let slideIndex = 0;
const slides = document.querySelectorAll(".home-carousel .home-img");

function showSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
  });
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}

// Start autoplay
setInterval(showSlides, 3000);

let videoIndex = 0;
const videoSlides = document.querySelectorAll(".video-slide");
let autoSlide = setInterval(showNextVideo, 10000); // auto switch

function showVideo(index) {
  // stop all
  videoSlides[videoIndex].classList.remove("active");
  const iframe = videoSlides[videoIndex].querySelector("iframe");
  iframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');

  videoIndex = (index + videoSlides.length) % videoSlides.length;
  videoSlides[videoIndex].classList.add("active");
}

function showNextVideo() {
  showVideo(videoIndex + 1);
}

function changeVideo(n) {
  clearInterval(autoSlide); // stop auto slide after manual action
  showVideo(videoIndex + n);
  autoSlide = setInterval(showNextVideo, 10000); // restart auto
}