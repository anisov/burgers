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

//menu accordion

const items = document.getElementsByClassName('js-open-menu'),
    itemsText = document.getElementsByClassName('js-open-menu-text');

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', e => {
        const item = items[i],
            itemText = item.querySelector('.js-open-menu-text'),
            activeItem = 'menu__elem--active',
            activeText = 'menu__elem-text--active';

        if (item.classList.contains(activeItem)){
            item.classList.remove(activeItem);
            itemText.classList.remove(activeText);
        } else{
            for (let j = 0; j < itemsText.length; j++) {
                items[j].classList.remove(activeItem);
                itemsText[j].classList.remove(activeText);
            }
            item.classList.add(activeItem);
            itemText.classList.add(activeText);
        }

    });

}





// вопрос     //itemsText = items.getElementsByClassName('js-open-menu-text');
/*
    const $item = document.getElementsByClassName('js-menu-listen-click'),
        activeItem = 'menu__elem--active';

    for (let i = 0; i < $item.length; i++) {
        $item[i].addEventListener('click', function () {
            if (!(this.classList.contains(activeItem))) {
                for (let j = 0; j < $item.length; j++) {
                    $item[j].classList.remove(activeItem);
                    this.classList.add(activeItem);
                }
            } else {
                this.classList.remove(activeItem);
            }
        })
    }


        const container = document.getElementById('js-menu-listen-click');
    container.addEventListener('click', e => {
        let item = e.cu.firstChild(),
            itemContainer = item.closest('.menu__elem'),
            itemText = item.nextElementSibling,
            activeItem = 'menu__elem--active',
            activeText = 'menu__elem-text--active';
        console.log(item)
        if (itemContainer.classList.contains(activeItem)){

            itemContainer.classList.remove(activeItem);
            itemText.classList.remove(activeText);
        } else{
            itemContainer.classList.add(activeItem);
            itemText.classList.add(activeText);
        }

    */
