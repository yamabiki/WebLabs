const OPEN_CLASSNAME = "open";

const navLinks = document.getElementById("nav-links");

const nav = document.querySelector('.header__nav');
const menuIcon = document.querySelector('.menu-icon');
const crossIcon = document.querySelector('.cross');
const headerContainer = document.querySelector('.header__container');
const trafalgarLogo = document.querySelector('')

function toggleMenu() {
    nav.classList.toggle('open');

    if (nav.classList.contains('open')) {
        menuIcon.style.display = 'none';
        crossIcon.style.display = 'block';
        headerContainer.style.backgroundColor = '#5A98F2';
    } else {
        menuIcon.style.display = 'block';
        crossIcon.style.display = 'none';
        headerContainer.style.backgroundColor = '';
    }
}