var width = window.innerWidth;
$(function () {
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
        let currentWidth = window.innerWidth;
        res(currentWidth)
    });
})


// Аккардион для Команды
let currentWidth = width;
window.addEventListener('resize',()=>{
    currentWidth = window.innerWidth;
});
$(function () {
    $('.js-open-team').on('click', e => {
        const $this = $(e.currentTarget),
            container = $this.closest('.js-acco-container'),
            item = $this.closest('.js-acco-item'),
            $thisNames = $('.js-open-team', container),
            content = $('.js-open-content', item),
            allContent = $('.js-open-content', container),
            titleContent = $('.js-title-content', item),
            imgBlock = $('.js-acco-img', item),
            textBlock = $('.js-acco-text', item);

        let imgBlockHeight = imgBlock .outerHeight(),
            textBlockHeight = textBlock.outerHeight(),
            titleContentHeight = titleContent.outerHeight();

        function changeHeight(content, height){
            content.css({
                'height' : height
            });
        }

        function removeClasses() {
            $thisNames.removeClass('team__name--active');
            allContent.removeClass('team__information--active');
        }

        if (!$this.hasClass('team__name--active') && !content.hasClass('team__information--active')){
            removeClasses();
            changeHeight(allContent, 0);

            let reqHeight =(currentWidth > 768)
                ?(imgBlockHeight > textBlockHeight)
                    ?imgBlockHeight + 5
                    :textBlockHeight
                :imgBlockHeight + 5 + textBlockHeight + titleContentHeight;

            $this.addClass('team__name--active');
            content.addClass('team__information--active');
            changeHeight(content, reqHeight);
        } else{
            removeClasses();
            changeHeight(content, 0);
        }
    })
});

//ВОПРОС
/*
if ( imgBlock .outerHeight() > textBlock.outerHeight()){
    var reqHeight = imgBlock .outerHeight() + 5;
} else {
    var reqHeight = textBlock.outerHeight();
}
*/
