var button = document.querySelector('.navigation__short-button');
var menu = document.querySelector('.hamburger');

button.addEventListener('click', function() {
    menu.classList.add('section--visible');
});

var buttonClose = document.querySelector('.hamburger__close');
buttonClose.addEventListener('click', function() {
    menu.classList.remove('section--visible');
});

var hamMenuClick = document.querySelector('.burgers__composition');
var menuInfo = document.querySelector('.burgers__info');

hamMenuClick.addEventListener('click', function() {
    menuInfo.classList.add('burgers__info--visible');
});

var menuClose = document.querySelector('.close');
menuClose.addEventListener('click', function() {
    menuInfo.classList.remove('burgers__info--visible');
    event.stopPropagation()
}, true);