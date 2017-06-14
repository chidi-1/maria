/**
 * appName - http://chidi-frontend.esy.es/
 * @version v0.1.0
 * @author bev-olga@yandex.ru
 */
$(document).on('click', '.brends-list li img', function () {
    var el = $(this).closest('li');

    if ((device.tablet() || device.mobile()) || $(window).width() <= 992) {
        $('.brends-content').removeClass('hidden-block').empty().append(el.find('.content-wrap .content .mCSB_container').html())
    }
    else{
        if (el.hasClass('active')) {
            el.removeClass('active');
        }
        else {
            $('.brends-list li').removeClass('active');
            el.addClass('active');
        }

    }
})
var timeout_link; // задержка при вводе в поле

// удалить позицию из корзины
$(document).on('click', '.js--delete-item', function () {
    var btn = $(this);
    var url = btn.closest('form').data('remove-url');
    var method = btn.closest('form').attr('method');
    var id = btn.closest('li').data('id');
    var block = btn.closest('li');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function (data) {

            var parse_data = jQuery.parseJSON(data);

            if (parse_data.item_length == 0) {
                $('.cart-full').addClass('hidden-block');
                $('.cart-empty').removeClass('hidden-block');

                $('.cart-list .total .full').addClass('hidden-block');
                $('.cart-list .total .empty').removeClass('hidden-block');
                $('.header--current-mobile').text('0');
                $('.header--basket-current span').text('0 товаров');
                $('.header--basket-summ').text('0 р.');
            }
            else{
                var number = parse_data.item_length.toString();
                var number_text = " товаров";
                number = Number(number.substr(number.length - 1, 1));

                if (number == 1) {
                    number_text = " товар";
                }
                if (number == 2 || number == 3 || number == 4) {
                    number_text = " товара";
                }

                // количество в шапке
                $('.header--current-mobile').text(parse_data.item_length);
                $('.header--basket-current span').html('<i>' + parse_data.item_length + '</i>' + number_text);

                // количество в таблице
                $('.cart-list--bottom .cart-list--amount span').text(parse_data.item_length);

                // сумма в шапке
                $('.header--basket-summ').text(parse_data.total_summ + ' р.');
                $('.header--basket-full span.value').text(parse_data.total_summ + ' руб.');

                // сумма в таблице
                $('.cart-list--bottom .cart-list--total span').text(parse_data.total_summ + ' р.');

                // обновление списка в шапке
                $('.header--basket-list').html(parse_data.header_html);


                if($('.cart-list--slider').hasClass('owl-carousel')){
                    block.closest('.owl-item').remove();
                    owl_basket.trigger('refresh.owl.carousel');
                }else{
                    block.remove();
                }

            }
        }
    });

    return false;
});

// удалить позицию из корзины в шапке
$(document).on('click', '.js--delete-header-item', function () {
    var btn = $(this);
    var url = btn.closest('ul').data('url');
    var method = btn.closest('ul').data('method');
    var id = btn.closest('li').data('id');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);

            if (parse_data.item_length == 0) {
                $('.cart-full').addClass('hidden-block');
                $('.cart-empty').removeClass('hidden-block');

                $('.cart-list .total .full').addClass('hidden-block');
                $('.cart-list .total .empty').removeClass('hidden-block');
                $('.header--current-mobile').text('0');
                $('.header--basket-current span').text('0 товаров');
                $('.header--basket-summ').text('0 р.');
            }
            else{
                var number = parse_data.item_length.toString();
                var number_text = " товаров";
                number = Number(number.substr(number.length - 1, 1));

                if (number == 1) {
                    number_text = " товар";
                }
                if (number == 2 || number == 3 || number == 4) {
                    number_text = " товара";
                }

                // количество в шапке
                $('.header--current-mobile').text(parse_data.item_length);
                $('.header--basket-current span').html('<i>' + parse_data.item_length + '</i>' + number_text);

                // количество в таблице
                $('.cart-list--bottom .cart-list--amount span').text(parse_data.item_length);

                // сумма в шапке
                $('.header--basket-summ').text(parse_data.total_summ + ' р.');
                $('.header--basket-full span.value').text(parse_data.total_summ + ' руб.');

                // сумма в таблице
                $('.cart-list--bottom .cart-list--total span').text(parse_data.total_summ + ' р.');

                // обновление списка в шапке
                $('.header--basket-list').html(parse_data.header_html);

                var cart_block = $('.cart-list--slider li[data-id = ' + id + ']');

                if($('.cart-list--slider').hasClass('owl-carousel')){
                    cart_block.closest('.owl-item').remove();
                    owl_basket.trigger('refresh.owl.carousel');
                }else{
                    cart_block.remove();
                }

            }
        }
    });

    return false;
});

// изменить количество товаров в корзине
function change_basket(block) {
    var url = block.closest('form').data('change-url');
    var method = block.closest('form').data('method');
    var id = block.data('id');
    var amount = block.find('.cart-list--amount .input-number').prop('value');

    $.ajax({
        url: url,
        method: method,
        data: {id: id, amount: amount},
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);

            var number = parse_data.item_length.toString();
            var number_text = " товаров";
            number = Number(number.substr(number.length - 1, 1));

            if (number == 1) {
                number_text = " товар";
            }
            if (number == 2 || number == 3 || number == 4) {
                number_text = " товара";
            }

            // количество в шапке
            $('.header--current-mobile').text(parse_data.item_length);
            $('.header--basket-current span').html('<i>' + parse_data.item_length + '</i>' + number_text);

            // количество в таблице
            $('.cart-list--bottom .cart-list--amount span').text(parse_data.item_length);

            // сумма в строке
            $('.header--basket-list li[data-id=' + id + ']').find('.header--basket-list--content span strong').text(parse_data.header_text);

            // сумма в шапке
            $('.header--basket-summ').text(parse_data.total_summ + ' р.');
            $('.header--basket-full span.value').text(parse_data.total_summ + ' руб.');

            // сумма в таблице
            $('.cart-list--bottom .cart-list--total span').text(parse_data.total_summ + ' р.');

            block.find('.cart-list--total span').html(parse_data.total_item_summ + ' руб.');
        }
    });

    return false;
}

// применить скидку
$(document).on('click', '.js--card-discount', function () {
    var btn = $(this);
    var discount_value = btn.closest('.cart-list--discount').find('.inp').prop('value');

    if (discount_value != '') {

        var url = btn.closest('form').data('discount-url');
        var method = btn.closest('form').data('method');

        $.ajax({
            url: url,
            method: method,
            data: {value: discount_value},
            success: function (data) {
                var parse_data = jQuery.parseJSON(data);

                if (parse_data.is_active == 'true') {
                    // сумма в шапке
                    $('.header--basket-summ').text(parse_data.total_summ + ' р.');
                    $('.header--basket-full span.value').text(parse_data.total_summ + ' руб.');

                    // сумма в таблице
                    $('.cart-list--bottom .cart-list--total span').text(parse_data.total_summ + ' р.');
                }
                else {
                    btn.closest('.cart-list--discount').find('.inp').addClass('error')
                }
            }
        });
    }

    return false;
});

// добавить в корзину
$(document).on('click', '.js--add-item', function(){
    var btn = $(this);
    var url = btn.data('url');
    var id = btn.data('id');

    $.ajax({
        url: url,
        method: 'post',
        data: {id: id},
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);

            if($('.header--basket-full').hasClass('hidden-block')){
                $('.header--basket-full').removeClass('hidden-block');
                $('.header--basket-empty').addClass('hidden-block');
            }

            var number = parse_data.item_length.toString();
            var number_text = " товаров";
            number = Number(number.substr(number.length - 1, 1));

            if (number == 1) {
                number_text = " товар";
            }
            if (number == 2 || number == 3 || number == 4) {
                number_text = " товара";
            }

            // количество в шапке
            $('.header--current-mobile').text(parse_data.item_length);
            $('.header--basket-current span').html('<i>' + parse_data.item_length + '</i>' + number_text);

            // сумма в шапке
            $('.header--basket-summ').text(parse_data.total_summ + ' р.');
            $('.header--basket-full span.value').text(parse_data.total_summ + ' руб.');

            // обновление списка в шапке
            $('.header--basket-list').html(parse_data.header_html);
        }
    });

    return false;
})

// ввод только цифр в поле количетво
$(document).on('keydown', '.inp-number', function () {
    input_number();
});

// ввод только цифр в поле
var input_number = function () {
    var allow_meta_keys = [86, 67, 65];
    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 110 || event.keyCode == 191 ||
            // Разрешаем: Ctrl+A
        ($.inArray(event.keyCode, allow_meta_keys) > -1 && (event.ctrlKey === true || event.metaKey === true)) ||
            // Разрешаем: home, end, влево, вправо
        (event.keyCode >= 35 && event.keyCode <= 39)) {
        return
    }
    else {
        // Обеждаемся, что это цифра, и останавливаем событие keypress
        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
            event.preventDefault();
        }
    }
};

// ввод количества с клавиатуры
$(document).on('input', '.inp-number', function () {
    var input = $(this);

    if (input.data("lastval") != input.val()) {
        if (input.val() == '') {
            input.prop('value', 1)
        }
        else {
            var value = input.prop('value');
            value = value.replace(/\s+/g, '');
            value = Number(value);
            value = value.toString();
            value = number_format(value);
            if (value == "NaN") {
                input.prop('value', 1)
            } else {
                input.prop('value', value);
            }
        }
        input.data("lastval", input.val());


        if (input.parents().hasClass('cart-list--amount')) {
            if (timeout_link) {
                clearTimeout(timeout_link)
            }
            timeout_link = setTimeout(function () {
                change_basket(input.closest('li'));
            }, 250)
        }
    }
});

// формат цифр
function number_format(str) {
    return str.replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
}

$(document).on('focus', 'input', function () {
    $(this).removeClass('error');
});

$(document).on('click', '.js--open-history-list', function () {
    if((device.tablet() || device.mobile()) || $(window).width() >= '992'){
        $(this).closest('.flex-between').toggleClass('open-next').next('.item--list-wrap').stop().slideToggle(200);
    }
    return false;
});

var owl_basket;

$(document).ready(function () {
    var timeout_link;

    if ($('.js--select-styled').length) {
        $('.js--select-styled').styler({
            onFormStyled: function () {
                $(this).css('outline', '3px solid red');
            },
            onSelectClosed: function () {
                var select = $(this);

                if (select.closest('form').hasClass('filter-form')) {
                    if (timeout_link) {
                        clearTimeout(timeout_link)
                    }
                    timeout_link = setTimeout(function () {
                        set_filter();
                    }, 1000)
                }

                if (select.parents().hasClass('condition')) {
                    var index = select.find('option:selected').index();
                    $('.tabs__caption li').eq(index).trigger('click');
                }

                if (select.parents().hasClass('item')) {
                    var index = select.find('option:selected').index();
                    $('.item--about .tabs__caption li').eq(index).trigger('click');
                }

                if (select.parents().hasClass('catalog-content')) {
                    var link = select.find('option:selected').val();
                    if(window.location != link){
                        window.location = link;
                    }
                }
            }
        });
    };

    if ($('.slider').length) {
        $(".slider").each(function () {
            var slider = $(this);
            var min = slider.data('min');
            var max = slider.data('max');
            var current = slider.data('current');
            var range = slider.data('range');

            slider.slider({
                range: range,
                min: min,
                max: max,
                value: current,
                create: function () {
                    $(this).closest('.slider-wrap').find('.value').text($(this).slider("value") + ' руб.');
                },
                slide: function (event, ui) {
                    $(this).closest('.slider-wrap').find('.value').text($(this).slider("value") + ' руб.');
                    if (timeout_link) {
                        clearTimeout(timeout_link)
                    }
                    timeout_link = setTimeout(function () {
                        set_filter();
                    }, 1000)
                }
            });
        })
    }

    $('.filter-form input').change(function () {
        if (timeout_link) {
            clearTimeout(timeout_link)
        }
        timeout_link = setTimeout(function () {
            set_filter();
        }, 1000)
    });

    $('.js--open-dropdown').click(function () {
        if ($('.dropdown-wrap.open').length && !($(this).closest('.dropdown-wrap').hasClass('open'))) {
            $('.dropdown-wrap.open').removeClass('open');
        }
        $(this).closest('.dropdown-wrap').toggleClass('open');
        return false;
    });

    if (device.tablet == false && device.mobile == false) {
        $('.header--bottom .dropdown-wrap').hover(function () {
                $(this).addClass('open')
            },
            function () {
                $(this).removeClass('open')
            });
    }

    $('body').click(function (event) {
        var target = $(event.target);

        if (!(target.parents().hasClass('dropdown-wrap'))) {
            $('.dropdown-wrap.open').removeClass('open');
        }
        if (!(target.parents().hasClass('brends-list'))) {
            $('.brends-list li').removeClass('active');
        }

    });

    $('.js--open-menu').click(function () {
        var block = $(this).closest('li');

        if (block.hasClass('open')) {
            block.removeClass('open')
        } else {
            block.addClass('open')
        }

        return false;
    });

    var window_width = $(window).width();

    if ($('.index--slider').length) {
        $('.index--slider').owlCarousel({
            loop: true,
            nav: true,
            dots: true,
            navText: [,],
            autoplay: true,
            autoplayTimeout: 100000,
            autoplayHoverPause: true,
            margin: 0,
            items: 1,
            onInitialized: function () {
                var section = $('.index--slider .owl-item.active .index--slider__el');

                if (section.hasClass('animation-wrap')) {
                    var active_section = section;
                    var inter = 0;
                    var timer = 300;

                    active_section.find('.animate-el').each(function () {
                        var item = $(this);
                        var animatetype = item.data('animate');

                        setTimeout(function () {
                            item.addClass('animated ' + [animatetype]);
                        }, inter * timer);
                        inter++;
                    });

                    section.removeClass('animation-wrap')
                }

                var top = section.find('.banner-content').height();
                var offset = parseInt($('.index--slider__el').css('padding-top'));

                $('.index--slider .owl-dots').css('top', top + offset + 20);

                if (section.hasClass('index--slider__el-right')) {
                    $('.index--slider .owl-dots').addClass('right').removeClass('left center');
                }
                if (section.hasClass('index--slider__el-left')) {
                    $('.index--slider .owl-dots').addClass('left').removeClass('right center');
                }
                if (section.hasClass('index--slider__el-center')) {
                    $('.index--slider .owl-dots').addClass('center').removeClass('right left');
                }

                $('.index--slider').css('padding-right', '1px')
            },
            onTranslate: function () {
                $('.index--slider .owl-dots').fadeOut(0);
            },
            onTranslated: function () {

                var section = $('.index--slider .owl-item.active .index--slider__el');
                if (section.hasClass('animation-wrap')) {
                    var active_section = section;
                    var inter = 0;
                    var timer = 300;

                    active_section.find('.animate-el').each(function () {
                        var item = $(this);
                        var animatetype = item.data('animate');

                        setTimeout(function () {
                            item.addClass('animated ' + [animatetype]);
                        }, inter * timer);
                        inter++;
                    });

                    section.removeClass('animation-wrap')
                }

                setTimeout(function(){
                    var top = section.find('.banner-content').height();
                    var offset = parseInt($('.index--slider__el').css('padding-top'));
                    var margin = parseInt(section.find('.banner-content').css('margin-top'));
                    var offset_top = 20;

                    $('.index--slider .owl-dots').css('top', top + offset    + offset_top + margin);

                    if (section.hasClass('index--slider__el-right')) {
                        $('.index--slider .owl-dots').addClass('right').removeClass('left center');
                    }
                    if (section.hasClass('index--slider__el-left')) {
                        $('.index--slider .owl-dots').addClass('left').removeClass('right center');
                    }
                    if (section.hasClass('index--slider__el-center')) {
                        $('.index--slider .owl-dots').addClass('center').removeClass('right left');
                    }

                    $('.index--slider .owl-dots').fadeIn(200);

                },300)
            }
        });
    }

    if ($('.about-slider').length) {
        $('.about-slider').owlCarousel({
            margin: 0,
            loop: true,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 1,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                },
                1270: {
                    items: 5
                }
            }
        });
    }

    if ($('.slider-discount').length) {
        $('.slider-discount').owlCarousel({
            margin: 0,
            loop: true,
            nav: false,
            dots: true,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 1,
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                480: {
                    items: 1,
                    margin: 15
                },
                768: {
                    items: 1
                },
                992: {
                    items: 3
                },
                1270: {
                    items: 3
                }
            }
        });
    }

    if ($('.slider-item').length) {
        $('.slider-item').owlCarousel({
            margin: 0,
            loop: true,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 1,
            responsive: {
                0: {
                    items: 1,
                    margin: 0,
                    dots: false,
                    nav: true
                },
                480: {
                    items: 2,
                    dots: false,
                    nav: true
                },
                768: {
                    items: 3,
                    dots: false,
                    nav: true

                },
                992: {
                    items: 4,
                    dots: false,
                    nav: true
                },
                1270: {
                    items: 4,
                    dots: false,
                    nav: true
                }
            }
        });
    }

    if ($('.trends-slider').length) {
        $('.trends-slider').owlCarousel({
            margin: 10,
            loop: true,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 2,
            responsive: {
                0: {
                    items: 2,
                },
                480: {
                    items: 3
                },
                768: {
                    items: 4
                },
                992: {
                    items: 6
                },
                1270: {
                    items: 6
                }
            }
        });
    }


    if ($('.cart-list--slider').length && ((device.tablet() || device.mobile()) || $(window).width() <= 992)) {
        owl_basket = $('.cart-list--slider');

        owl_basket.owlCarousel({
            margin: 0,
            loop: false,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 2,
            responsive: {
                0: {
                    items: 1,
                },
                480: {
                    items: 2
                },
                550: {
                    items: 3
                },
                768: {
                    items: 4
                }
            }
        });
    }

    if ($('.fancy').length) {
        $('.fancy').fancybox();
    }

    // изменение типа доставки в корзине

    $('.js--change-info').change(function () {
        var inp = $(this);
        if (inp.is(':checked')) {
            $('.dev--info').each(function () {
                $(this).addClass('disabled');
                $(this).find('.inp').attr('disabled', 'disabled');
            });
            inp.closest('label.radio').next().removeClass('disabled').find('.inp').removeAttr('disabled');
        }
    });

    $(document).on('click', '.js--form-submit', function () {
        var form = $(this).parents('.main-form');
        var errors = false;

        $(form).find('.required').each(function () {
            var val = $(this).prop('value');
            if (val == '') {
                $(this).addClass('error');
                errors = true;
            }
            else {
                if ($(this).hasClass('inp-mail')) {
                    if (validateEmail(val) == false) {
                        $(this).addClass('error');
                        errors = true;
                    }
                }
                if (form.find('.js--new-password').length) {
                    if (form.find('.js--new-password').val() != form.find('.js--new-password2').val()) {
                        form.find('.js--new-password').addClass('error')
                        form.find('.js--new-password2').addClass('error')
                    }
                }
            }
        });

        if (errors == false) {
            var button_value = $(form).find('.js--form-submit').prop('value');
            $(form).find('.js--form-submit').prop('value', 'Отправляем...');

            var method = form.attr('method');
            var action = form.attr('action');
            var data = form.serialize();
            $.ajax({
                type: method,
                url: action,
                data: data,
                success: function (data) {
                    form.find('.inp').each(function () {
                        $(this).prop('value', '')
                    });
                    $(form).find('.js--form-submit').text(button_value);
                    window.location.href = "thanks.html";
                },
                error: function (data) {
                    $(form).find('.js--form-submit').prop('value', 'Ошибка');
                    setTimeout(function () {
                        $(form).find('.js--form-submit').prop('value', button_value);
                    }, 2000);
                }
            });
        }

        return false;
    });

    $('.inp').focus(function () {
        $(this).removeClass('error')
    });

    if ($('#about-map').length) {
        var icon = $('#about-map').data('img');

        ymaps.ready(function () {
            var myMap = new ymaps.Map('about-map', {
                    center: [55.682516, 37.535900],
                    zoom: 14
                }, {
                    searchControlProvider: 'yandex#search'
                }),

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
                    iconLayout: 'default#image',
                    iconImageHref: icon,
                    iconImageSize: [80, 100],
                    iconImageOffset: [-40, -50]
                });

            myMap.geoObjects.add(myPlacemark);
        });
    }

    $('.js--close-contacts').click(function () {
        $(this).closest('.map--contacts').fadeOut();
    });

    if ($('.accordeon').length) {

        $('.acc__container').hide();
        $('.acc__trigger:first').addClass('active').next().show();

        $('.acc__trigger').click(function () {
            if ($(this).next().is(':hidden')) {
                $('.acc__trigger').removeClass('active').next().slideUp();
                $(this).toggleClass('active').next().slideDown();
            }
            return false;
        });
    }

    $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
    });

});

function set_filter() {
    var form = $('.filter-form');
    var url = form.attr('action');
    var method = form.attr('method');
    var data = form.serialize();

    $.ajax({
        url: url,
        method: method,
        data: data,
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);
            $('.catalog .load-container').empty().html(parse_data.header_html);
        }
    });

    return false;
}

$(document).on('click', '.js--mobile-menu', function () {
    $('.header--bottom').toggleClass('is_open');
    $(this).toggleClass('is_open');
    $('.header').toggleClass('fixed');
    return false;
});

$(document).on('click', '.js--change-category', function () {
    var val = $(this).text();
    $('.change-category input').val(val);
    $('.dropdown-wrap.open').removeClass('open');

    return false;
});
// удалить дисконтную карту
$(document).on('click', '.js--lk-remove-discount', function () {
    var btn = $(this);
    var url = btn.data('url');
    var method = btn.data('method');
    var id = btn.data('id');
    var block = btn.closest('.lk--discount-added--el');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function () {
            console.log('11')
            block.remove();
        }
    });

    return false;
});

var index_load_adres;

// Добавить адрес доставки
$(document).on('click', '.js--add-adress', function () {
    var btn = $(this);
    var url = btn.data('url');

    btn.prev().append('<div class="lk--adress--el"></div>');
    var block = btn.prev().find('.lk--adress--el:last-child');
    block.load(btn.data('url'));
    index_load_adres = btn.prev().find('.lk--adress--el').length;

    return false;
});

function add_adress() {
    $('.js--select-styled').styler();
    var block = $('.lk--adress--el:last-child');
    block.find('span.title').text(block.find('span.title').text() + index_load_adres);
    var name = block.find('select').attr('name');
    block.find('select').attr('name', name + index_load_adres);
    block.find('.inp').each(function () {
        var name = $(this).attr('name');
        $(this).attr('name', name + index_load_adres);
    })
}

$(document).on('click', '.js--minus', function () {
    return false;
});

$(document).on('click', '.item--params-btns-value .btn', function () {
    var current_value = $(this).closest('.item--params-btns-value').find('input').prop('value');
    if ($(this).hasClass('js--minus') == true && current_value == 1) {
        return false
    } else {
        current_value = current_value.replace(/\s+/g, '');
        current_value = Number(current_value);
        ($(this).hasClass('js--minus') == true) ? (current_value--) : (current_value++);
        current_value = current_value.toString();
        current_value = number_format(current_value);
        $(this).closest('.item--params-btns-value').find('input').prop('value', current_value);
        /*count();*/
    }

    return false;
});
// удалить дисконтную карту
$(document).on('click', '.js--lk-remove-discount', function () {
    var btn = $(this);
    var url = btn.data('url');
    var method = btn.data('method');
    var id = btn.data('id');
    var block = btn.closest('.lk--discount-added--el');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function () {
            console.log('11')
            block.remove();
        }
    });

    return false;
});

var index_load_adres;

// Добавить адрес доставки
$(document).on('click', '.js--add-adress', function () {
    var btn = $(this);
    var url = btn.data('url');

    btn.prev().append('<div class="lk--adress--el"></div>');
    var block =  btn.prev().find('.lk--adress--el:last-child');
    block.load(btn.data('url'));
    index_load_adres = btn.prev().find('.lk--adress--el').length;

    return false;
});

function add_adress(){
   $('.js--select-styled').styler();
        var block =  $('.lk--adress--el:last-child');
        block.find('span.title').text(block.find('span.title').text() + index_load_adres);
        var name = block.find('select').attr('name');
        block.find('select').attr('name',  name + index_load_adres);
        block.find('.inp').each(function(){
            var name = $(this).attr('name');
            $(this).attr('name',  name + index_load_adres);
        })
}