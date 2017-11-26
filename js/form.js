$(function () {
    function ajaxForm (form) {
        let url = form.attr('action'),
            data = form.serialize();

        return $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'JSON'
        });
    }

    function openModal(title,mes,color) {
        let modal = $('.js-show-order', document),
            modalName = $('.order__info-title', modal),
            modalText = $('.order__info-text', modal),
            modalActive = 'order__modal--active';

        modal.slideDown().addClass(modalActive);
        modalName.text(title);
        modalText.text(mes);

        modalName.css({
            'color':color,
        });

        $('.js-order-close').on('click', () => {
            modal.fadeOut("slow",0).removeClass(modalActive);
        });
    }

    function submitForm(e) {
        e.preventDefault();

        let form = $(e.target),
            request = ajaxForm(form);

        request.done(function(msg) {
            let mes = msg.mes,
                status = msg.status;
            if (status === 'OK') {
                openModal('Cпасибо за заказ!',mes,'green')
            } else{
                openModal('Извините, сервер не работает.',mes,'red')
            }
        });

        request.fail(function(jqXHR, textStatus) {
            openModal('Извините, сервер не работает.',textStatus,'red')
        });
    }

    $('#order').on('submit', submitForm);
});