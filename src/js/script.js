var width = window.innerWidth;

//Меню для планшетов и телефонов - секция 'Hamburger'
$(function () {
    const button = document.querySelector('.navigation__short-button'),
        menu = $('.hamburger');
        //menu = document.querySelector('.hamburger');

    button.addEventListener('click', () => {
        menu.fadeIn().addClass('section--visible');
    });

    const buttonClose = document.querySelector('.hamburger__close');
    buttonClose.addEventListener('click', () => {
        menu.fadeOut().removeClass('section--visible');
    });

    const display = $('.maincontent'),
        sections = $('.section', display);

    function changeActiveSection (sectionEq){
        const position = (sectionEq * -100) + '%';

        display.css({
            'transform': `translateY(${position})`,
            '-webkit-transform': `translateY(${position})`,
        });

        sections.eq(sectionEq).addClass('section--active')
            .siblings().removeClass('section--active');

        menu.fadeOut().removeClass('section--visible');
    }

    $('[data-scroll-to]').on('click touchstart', e=>{
        const $this = $(e.currentTarget),
            sectionIndex = parseInt($this.attr('data-scroll-to'));

        changeActiveSection (sectionIndex)
    })
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
/*
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
*/
//Api яндекс карт
//Api яндекс карт
$(function() {
    let placemarks = [
        {
            latitude:59.97383383,
            longitude: 30.31150813,
            hintContent: '<div class = "map__hint">Уфимская ул., дом 13а</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="img/map/map-marker.svg" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: Уфимская улица, дом 13а',
                '</div>'
            ]
        },
        {
            latitude: 59.90159372,
            longitude: 30.48641351,
            hintContent: '<div class="map__hint">Проспект Большивиков, д. 11</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="img/map/map-marker.svg" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: Проспект Большивиков, д. 11',
                '</div>'
            ]
        },
        {
            latitude: 59.94521420,
            longitude: 30.38073549,
            hintContent: '<div class="map__hint">Калужский переулок, д. 9</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="img/map/map-marker.svg" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: Калужский переулок, д. 9',
                '</div>'
            ]
        },
        {
            latitude: 59.85853211,
            longitude: 30.32781840,
            hintContent: '<div class="map__hint">ул. Гастелло д. 22</div>',
            balloonContent: [
                '<div class="map__balloon">',
                '<img class="map__burger-img" src="img/map/map-marker.svg" alt="Бургер"/>',
                'Самые вкусные бургеры у нас! Заходите по адресу: ул. Гастелло д. 22',
                '</div>'
            ]
        }
    ];
    let geoObjects = [];

    ymaps.ready(init);

    function init() {
        let map = new ymaps.Map('map', {
            center: [59.94, 30.32],
            zoom: 11,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });

        for (let i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([ placemarks[i].latitude,  placemarks[i].longitude],
                {
                    hintContent:  placemarks[i].hintContent,
                    balloonContent:  placemarks[i].balloonContent.join('')
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref:   'img/map/map-marker.svg',
                    iconImageSize: [46, 47],
                    iconImageOffset: [-23,- 57]
                }
            );
        }

        let clusterer = new ymaps.Clusterer({
            clusterIcons: [
                {
                    href: 'img/map/map-marker.svg',
                    size: [80,80],
                    offset: [-40, -80]
                }
            ],
            clusterIconContentLayout:null,
        });
        map.geoObjects.add(clusterer);
        clusterer.add(geoObjects);
    }
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
