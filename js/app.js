/**
 * appName - http://chidi-frontend.esy.es/
 * @version v0.1.0
 * @author bev-olga@yandex.ru
 */
var timeout_link; // задержка при вводе в поле

// удалить позицию из корзины
$(document).on('click', '.js--delete-item', function () {
    var btn = $(this);
    var url = btn.closest('form').data('remove-url');
    var method = btn.closest('form').data('method');
    var id = btn.closest('li').data('id');
    var block = btn.closest('li');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);

            var number = parse_data.total_length.toString();
            var number_text = " товаров";
            number = Number(number.substr(number.length - 1, 1));

            if (number == 1) {
                number_text = " товар";
            }
            if (number == 2 || number == 3 || number == 4) {
                number_text = " товара";
            }

            $('.cart-list .total .cart-list--amount span').text(parse_data.total_amout);
            $('.cart-list .total .cart-list--total span').html(parse_data.total + ' руб.');
            $('.header--basket-summ').html(parse_data.total + ' р.');
            $('.header--basket-current span').html('<i>' + parse_data.total_length + '</i>' + number_text);
            $('.header--basket-full .dropdown .header--basket-list').html(parse_data.header_html);

            block.remove();

            if ($('.basket-list li').length == 0) {
                $('.basket-full').addClass('hidden-block');
                $('.basket-empty').removeClass('hidden-block');
                $('.header__links-bas').addClass('empty')
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
            $('li.total .cart-list--total span').html(parse_data.total + ' руб.');
            $('.header--basket-summ').html(parse_data.total + ' р.');
            block.find('.cart-list--total span').html(parse_data.total_el + ' руб.');
        }
    });

    return false;
}


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
$(document).on('input', '.cart-list .cart-list--amount .inp-number', function () {
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

        if (timeout_link) {
            clearTimeout(timeout_link)
        }
        timeout_link = setTimeout(function () {
            change_basket(input.closest('li'));
        }, 250)

    }
});

// формат цифр
function number_format(str) {
    return str.replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
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
                    $('li.total .cart-list--total span').html(parse_data.total + ' руб.');
                    $('.header--basket-summ').html(parse_data.total + ' р.');
                }
                else {
                    btn.closest('.cart-list--discount').find('.inp').addClass('error')
                }
            }
        });
    }

    return false;
});

$(document).on('focus', 'input', function () {
    $(this).removeClass('error');
});

$(document).on('click', '.js--open-history-list', function () {
    $(this).closest('li').toggleClass('open-next').next('li').stop().slideToggle(200);
    return false;
})

var timeout_link; // задержка при вводе в поле

// удалить позицию из корзины
$(document).on('click', '.js--delete-item', function () {
    var btn = $(this);
    var url = btn.closest('form').data('remove-url');
    var method = btn.closest('form').data('method');
    var id = btn.closest('li').data('id');
    var block = btn.closest('li');

    $.ajax({
        url: url,
        method: method,
        data: {id: id},
        success: function (data) {
            var parse_data = jQuery.parseJSON(data);

            var number = parse_data.total_length.toString();
            var number_text = " товаров";
            number = Number(number.substr(number.length - 1, 1));

            if (number == 1) {
                number_text = " товар";
            }
            if (number == 2 || number == 3 || number == 4) {
                number_text = " товара";
            }

            $('.cart-list .total .cart-list--amount span').text(parse_data.total_amout);
            $('.cart-list .total .cart-list--total span').html(parse_data.total + ' руб.');
            $('.header--basket-summ').html(parse_data.total + ' р.');
            $('.header--basket-current span').html('<i>' + parse_data.total_length + '</i>' + number_text);
            $('.header--basket-full .dropdown .header--basket-list').html(parse_data.header_html);

            block.remove();

            if ($('.basket-list li').length == 0) {
                $('.basket-full').addClass('hidden-block');
                $('.basket-empty').removeClass('hidden-block');
                $('.header__links-bas').addClass('empty')
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
            $('li.total .cart-list--total span').html(parse_data.total + ' руб.');
            $('.header--basket-summ').html(parse_data.total + ' р.');
            block.find('.cart-list--total span').html(parse_data.total_el + ' руб.');
        }
    });

    return false;
}


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
$(document).on('input', '.cart-list .cart-list--amount .inp-number', function () {
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

        if (timeout_link) {
            clearTimeout(timeout_link)
        }
        timeout_link = setTimeout(function () {
            change_basket(input.closest('li'));
        }, 250)

    }
});

// формат цифр
function number_format(str) {
    return str.replace(/(\s)+/g, '').replace(/(\d{1,3})(?=(?:\d{3})+$)/g, '$1 ');
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
                    $('li.total .cart-list--total span').html(parse_data.total + ' руб.');
                    $('.header--basket-summ').html(parse_data.total + ' р.');
                }
                else {
                    btn.closest('.cart-list--discount').find('.inp').addClass('error')
                }
            }
        });
    }

    return false;
});

$(document).on('focus', 'input', function () {
    $(this).removeClass('error');
});

$(document).on('click', '.js--open-history-list', function () {
    $(this).closest('li').toggleClass('open-next').next('li').stop().slideToggle(200);
    return false;
})

$(document).ready(function () {
    if ($('.js--select-styled').length) {
        $('.js--select-styled').styler({
            onFormStyled: function () {
                console.log($(this).parents().hasClass('new-adress'));
                $(this).css('outline', '3px solid red');
            }
        });
    }
    ;

    $('.js--open-dropdown').click(function () {
        if ($('.dropdown-wrap.open').length && !($(this).closest('.dropdown-wrap').hasClass('open'))) {
            $('.dropdown-wrap.open').removeClass('open');
        }
        $(this).closest('.dropdown-wrap').toggleClass('open');
        return false;
    });

    $('.header--bottom .dropdown-wrap').hover(function () {
            $(this).addClass('open')
        },
        function () {
            $(this).removeClass('open')
        });

    $('body').click(function (event) {
        var target = $(event.target);

        if (!(target.parents().hasClass('dropdown-wrap'))) {
            $('.dropdown-wrap.open').removeClass('open');
        }
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

                if (window_width > 1270) {
                    var margin_top = 350
                    var margin_right = 114
                    var margin_left = -540
                }
                if (window_width <= 1270) {
                    var margin_top = 200
                    var margin_right = 80
                    var margin_left = -330
                }

                var top = section.find('.banner-content').height();
                $('.index--slider .owl-dots').css('top', top + margin_top);
                if (section.hasClass('index--slider__el-right')) {
                    $('.index--slider .owl-dots').css('margin-left', margin_right);
                }
                else {
                    $('.index--slider .owl-dots').css('margin-left', margin_left);
                }
            },
            onTranslate: function () {
                $('.index--slider .owl-dots').fadeOut(100);

                var section = $('.index--slider .owl-item.active').next().find('.index--slider__el');

                if (window_width > 1270) {
                    var margin_top = 350
                    var margin_right = 114
                    var margin_left = -540
                }
                if (window_width <= 1270) {
                    var margin_top = 200
                    var margin_right = 80
                    var margin_left = -330
                }

                var top = section.find('.banner-content').height();
                $('.index--slider .owl-dots').css('top', top + margin_top);
                if (section.hasClass('index--slider__el-right')) {
                    $('.index--slider .owl-dots').css('margin-left', margin_right);
                }
                else {
                    $('.index--slider .owl-dots').css('margin-left', margin_left);
                }
            },
            onTranslated: function () {
                $('.index--slider .owl-dots').fadeIn(200);
                var section = $('.index--slider .owl-item.active .index--slider__el');
                if (section.hasClass('animation-wrap')) {
                    var active_section = section;
                    var inter = 0;
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
            }
        });
    }

    if ($('.about-slider').length) {
        $('.about-slider').owlCarousel({
            margin: 25,
            loop: true,
            nav: true,
            dots: false,
            navText: [,],
            autoplay: false,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            items: 1,
            responsive : {
                0: {
                    items: 1,
                    margin: 0
                },
                480: {
                    items: 2,
                    margin: 15
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
        var icon = $('#about-map').data('img')

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

    $('.js--close-contacts').click(function(){
        $(this).closest('.map--contacts').fadeOut();
    })

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