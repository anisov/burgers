var button = document.querySelector('.navigation__short-button');
var menu = document.querySelector('.hamburger');

button.addEventListener('click', function() {
    menu.classList.add('section--visible');
});

var buttonClose = document.querySelector('.hamburger__close');
buttonClose.addEventListener('click', function() {
    menu.classList.remove('section--visible');
});
/*
$(window).resize(function(){
    var width = $(window).width();
    if(width>768){
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
    }
});
*/
var width = window.innerWidth;
function res(width) {
    var menuInfo = document.querySelector('.burgers__info');
    var hamMenuClick = document.querySelector('.burgers__composition');
    var menuClose = document.querySelector('.close');

    if(width>768){
        hamMenuClick.classList.add('burgers__info--hover');
        menuInfo.classList.remove('burgers__info--visible');
        hamMenuClick.addEventListener('click', function() {
            menuInfo.classList.remove('burgers__info--visible');
        });
    }else{
        hamMenuClick.classList.remove('burgers__info--hover');
        hamMenuClick.addEventListener('click', function() {
            menuInfo.classList.add('burgers__info--visible');
        });
        menuClose.addEventListener('click', function() {
            menuInfo.classList.remove('burgers__info--visible');
            event.stopPropagation()
        });
    }
}
res(width);
window.addEventListener('resize', function(e){
    var currentWidth = window.innerWidth;
    res(currentWidth)
});


