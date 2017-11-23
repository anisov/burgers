var width = window.innerWidth;

//Меню для планшетов и телефонов - секция 'Hamburger'
$(function () {
    const button = document.querySelector('.navigation__short-button'),
        menu = document.querySelector('.hamburger');

    button.addEventListener('click', () => {
        menu.classList.add('section--visible');
    });

    const buttonClose = document.querySelector('.hamburger__close');
    buttonClose.addEventListener('click', () => {
        menu.classList.remove('section--visible');
    });
});

//Всплывающее окно состава в секции 'Burgers'
$(function () {
    function changeClasses (width) {
        const hamMenuClick = document.getElementsByClassName('burgers__composition');

        if (width > 768) {
            for (let i = 0; i < hamMenuClick.length; i++) {
                const  menuInfo = document.querySelector('.burgers__info');

                hamMenuClick[i].classList.add('burgers__info--hover');
                menuInfo.classList.remove('burgers__info--visible');

                hamMenuClick[i].addEventListener('click', () => {
                    menuInfo.classList.remove('burgers__info--visible');
                });
            }
        }else{
            for (let i = 0; i < hamMenuClick.length; i++) {
                hamMenuClick[i].classList.remove('burgers__info--hover');
                hamMenuClick[i].addEventListener('click', (e) => {
                    const $this = e.currentTarget,
                        menuInfo = $this.querySelector('.burgers__info'),
                        menuClose = $this.querySelector('.close');

                    menuInfo.classList.add('burgers__info--visible');
                    menuClose.addEventListener('click', (e) => {
                        menuInfo.classList.remove('burgers__info--visible');
                        e.stopPropagation()
                    });
                });
            }
        }
    }
    changeClasses(width);
    window.addEventListener('resize', ()=>{
        let currentWidth = window.innerWidth;
        changeClasses(currentWidth)
    });
});

// Аккардион для секции 'Team'
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

            let reqHeight  = (currentWidth > 768)
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

//Аккордион для секции 'Menu'
const items = document.getElementsByClassName('js-open-menu'),
    itemsText = document.getElementsByClassName('js-open-menu-text');

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', e => {
        const item = items[i],
            itemText = item.querySelector('.js-open-menu-text'),
            activeItem = 'menu__elem--active',
            activeText = 'menu__elem-text--active';

        if (item.classList.contains(activeItem)) {
            item.classList.remove(activeItem);
            itemText.classList.remove(activeText);
        } else {
            for (let j = 0; j < itemsText.length; j++) {
                items[j].classList.remove(activeItem);
                itemsText[j].classList.remove(activeText);
            }
            item.classList.add(activeItem);
            itemText.classList.add(activeText);
        }
    });
}

//Всплывающее окно в секции 'Comment'
$(function () {
    $('.js-open-modal').on('click', e => {
        const $this = $(e.currentTarget),
            container = $this.closest('.js-take-container'),
            nameElement = $('.js-take-name', container),
            name = nameElement.text(),
            textElement = $('.js-take-text', container),
            text = textElement.text();

        let modal = $('.js-show-modal', document),
            modalName = $('.js-put-name', modal),
            modalText = $('.js-put-text', modal),
            modalActive = 'comment__modal--active';

        if (!modal.hasClass(modalActive)){
            modal.slideDown().addClass(modalActive);
            modalName.text(name);
            modalText.text(text);
        }
        $('.js-modal-close').on('click', () => {
            modal.fadeOut("slow",0).removeClass(modalActive);
        });
    })
});

//Слайдер для секции 'Burgers'
$(function () {
    let moveSlide = function (container, currentItem) {
        let items = container.find('.js-move-slider'),
            activeSlide = items.filter('.burgers__item--active'),
            reqItem = items.eq(currentItem),
            reqIndex = reqItem.index(),
            activeSlideClass = 'burgers__item--active',
            list = container.find('.burgers__item'),
            duration = 800;

        if (reqItem.length){
            list.animate({
            'left' : (-reqIndex) * 100 + '%'
        },duration, ()=> {
                activeSlide.removeClass(activeSlideClass);
                reqItem.addClass(activeSlideClass)
            })
        }
    };
    $('.js-move').on('click', e=>{
        let $this = $(e.currentTarget),
            container = $this.closest('.js-find-sliderContainer'),
            slide = $('.js-move-slider', container),
            activeSlide = $('.burgers__item--active', container),
            nextItem, edgeItem;

        if ($this.hasClass('js-move-right')){
            nextItem =  activeSlide.next();
            edgeItem = slide.first();
        }
        if ($this.hasClass('js-move-left')){
            nextItem =  activeSlide.prev();
            edgeItem = slide.last()
        }
        let currentItem = (nextItem.length)
            ?nextItem.index()
            :edgeItem.index();
        moveSlide(container, currentItem)
    })
});

// Автоматическое скрытие части текста и изменение его отображаемой высоты в секции 'Comment'
// Доработать
$(function() {
    let comment =  $('.comment__text');
    let Width = window.innerWidth;
    function changeHeightTextComment(currentWidth) {
        if (currentWidth < 768) {
            comment.textTailor({
                minFont: 16,
                maxFont: 9999,
                preWrapText: false,
                lineHeight: 1.45,
                resizable: true,
                debounce: false,
                fit: true,
                ellipsis: true,
                center: false,
                justify: false
            });
        } else {
            comment.attr('style', '');
        }
    }
    changeHeightTextComment(Width);
    window.addEventListener('resize', ()=>{
        currentWidth = window.innerWidth;
        changeHeightTextComment(currentWidth)

    });
});





//ВОПРОС
/*
if ( imgBlock .outerHeight() > textBlock.outerHeight()){
    var reqHeight = imgBlock .outerHeight() + 5;
} else {
    var reqHeight = textBlock.outerHeight();
}
*/
/*
Забагованная версия всплывающего окна
$(function () {
    $('.js-open-modal').on('click', e => {
        const $this = $(e.currentTarget),
            container = $this.closest('.js-take-container'),
            nameElement = $('.js-take-name', container),
            name = nameElement.text(),
            textElement = $('.js-take-text', container),
            text = textElement.text();

        let modal = $('.js-show-modal', document),
            modalName = $('.js-put-name', modal),
            modalText = $('.js-put-text', modal),
            modalActive = 'comment__modal--active';

        if (!modal.hasClass(modalActive)){
            modal.fadeTo(0, 0.9).addClass(modalActive);
            modalName.text(name);
            modalText.text(text);
        }
        $('.js-modal-close').on('click', e => {
            modal.fadeToggle("slow",e=>{
            }).removeClass(modalActive);
        });
    })
});
 */

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
