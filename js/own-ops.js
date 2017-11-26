//One Page Scroll
$(function () {
    let currentHeight = window.innerHeight;

    const menu = $('.hamburger'), // Остановка  работы ops если открыто меню
        wrapper = $('.wrapper');

    let display = $('.maincontent'),
        sections = $('.section', display);

    function zeroingStyles() {
        //обнуление стилей
        wrapper.css({
            'height': 'auto',
        });
        display.attr('style', '');
    }

    // Функция добавление активного класса для пункта меню
    function switchMenuActiveClass(sectionEq) {
        const link = $('.aside-menu__elem');
        link.eq(sectionEq).children('.aside-menu__link').addClass('aside-menu__link-current');
        link.eq(sectionEq).siblings().children('.aside-menu__link').removeClass('aside-menu__link-current')
        // Берём меню, находим по номеру секции нужный пункт, добавляе класс, находим соседей и удаляем активный класс
    }

    function callOps(currentHeight) {
        if (currentHeight >= 568 && !menu.hasClass('section--visible')) {
            const mobileDetect = new MobileDetect(window.navigator.userAgent);

            wrapper.css({
                'height': '100%',
            });

            let inScroll = false, // Создаём флаг, означающий 'скрола нет'
                isMobile = mobileDetect.mobile();// Проверка на мобильный

            // Функция отображение секции по номеру и вычисление нужных результатов, номер передаётся в виде параметра sectionEq
            function performTransition(sectionEq) {
                const position = (sectionEq * -100) + '%';
                // Флаг для задержки в 300ms для тач
                if (inScroll === false) {
                    if (!menu.hasClass('section--visible')) { // Остановка  работы ops если открыто меню
                        // Cообщаяем что начался скролл
                        inScroll = true;
                        // Сдвигаем наш maincontent на заданную высоту
                        display.css({
                            'transform': `translateY(${position})`,
                            '-webkit-transform': `translateY(${position})`,
                        });
                        // Выбираем из всех секций ,по номеру, текущую секцию и добавляем ей активный класс, а у соседей удаляем
                        sections.eq(sectionEq).addClass('section--active')
                            .siblings().removeClass('section--active');
                        // Как только мы  сгенерировали один раз событие, флаг изменится
                        // Создаём Call back, после того как пройдёт скролл, для изменения флага inScroll,через 300ms
                        setTimeout(() => {
                            //Возращаем обратно положение, означающее что скролл закончен
                            inScroll = false;
                            // Вызываем изменение меню только после скролла(в параметре номер секции)
                            switchMenuActiveClass(sectionEq);
                        }, 1300)
                    }
                }
            }

            // Выносим в функцию поиск секций для нескольких событий
            function defineSections(sections) {
                // Передаём секции для нахождения активной
                const activeSection = sections.filter('.section--active');// Находим активную(текущую) секцию
                return {
                    activeSection: activeSection,
                    nextSection: activeSection.next('section'),
                    prevSection: activeSection.prev('section') // Возьмём предыдущую секцию
                } // Возвращем обьект с свойствами в которых есть следующая и предыдущая секция
            }

            // Скрол к конкретной секции
            const scrollToSection = direction => {
                const section = defineSections(sections);// В этой переменной будет храниться обьект в котором будут все нужные нам секции
                if (!inScroll && direction === 'up' && section.nextSection.length) {
                    performTransition(section.nextSection.index('section'));
                }
                if (!inScroll && direction === 'down' && section.prevSection.length) {
                    performTransition(section.prevSection.index('section'));
                }
            };

            $('.wrapper').on({
                wheel: e => {
                    // Обрабатывает скорлл(прокрутку мышки и тачпада)
                    const deltaY = e.originalEvent.deltaY;

                    let direction = (deltaY > 0)
                        ? 'up'
                        : 'down';

                    scrollToSection(direction);
                },
                touchmove: e => (e.preventDefault())
            });
            // Перелистование слайдов с клавиатуры
            $(document).on('keydown', e => {
                const section = defineSections(sections);

                if (inScroll === false) {
                    switch (e.keyCode) {
                        case 40:// вверх
                            if (section.nextSection.length) {
                                performTransition(section.nextSection.index('section'));
                                break;
                            }
                        case 38: // вниз
                            if (section.prevSection.length) {
                                performTransition(section.prevSection.index('section'));
                                break;
                            }
                    }
                }
            });
            // Создаём проверку с какого устройства вошли, для того что бы на десктопе не обрабатывать
            if (isMobile) {
                // Обработка свайп жестов с помощью библиотеки
                $(window).swipe({
                    swipe: function (event, direction) {
                        scrollToSection(direction) // скролим к секции, аргумент берём из плагина
                    }
                });
            }
            // Навигация и ссылки
            $('[data-scroll-to]').on('click touchstart', e => {
                e.preventDefault();
                const $this = $(e.currentTarget),
                    sectionIndex = parseInt($this.attr('data-scroll-to'));

                performTransition(sectionIndex);
            })
        } else if (currentHeight < 568 && !menu.hasClass('section--visible')) {
            // Отключение ops на телефонах чья высота экрана меньше 568px
            zeroingStyles();

            function scrollAsideMenu(sectionEq) {
                if (!menu.hasClass('section--visible')) {
                    display.css({
                        'transform': `translateY(0)`,
                        '-webkit-transform': `translateY(0)`,
                    });
                    sections.eq(sectionEq).addClass('section--active')
                        .siblings().removeClass('section--active');
                    setTimeout(() => {
                        switchMenuActiveClass(sectionEq);
                    }, 800)
                }
            }
            $('[data-scroll-to]').on('click touchstart', e => {
                e.preventDefault();
                const $this = $(e.currentTarget);
                let id  = $this.attr('href'),
                    top = $(id).offset().top;

                let sectionIndex = parseInt($this.attr('data-scroll-to'));
                $('body,html').animate({scrollTop: top}, 800);
                scrollAsideMenu(sectionIndex);
            });

        }
    }
    callOps(currentHeight);

    window.addEventListener('resize', () => {
        // Включение/отключение ops в зависимости от разрешения
        $('.wrapper').off(); // Удаление всех обработчиков события
        currentHeight = window.innerHeight;

        callOps(currentHeight);
    });
});


