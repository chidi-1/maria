//top inner menu
$(document).ready(function(){
	$('.j-open-inner').on('click', function() {
		var $this = $(this);

		$this.toggleClass('opened');
		$this.siblings('.j-inner-list').toggleClass('opened');
		$this.closest('.j-border').toggleClass('opened');
	})
})


//tabs
// $(document).ready(function(){
//     var $sliderBlock = $('.j-slider-item');
//     var $sliderLink = $('.j-slider-link');

//     $sliderLink.on('click', function() {
//         var $li = $(this).parent('li');
//         var linkIndex = $li.index();

//         $sliderLink.removeClass('active');
//         $(this).addClass('active');

//        $sliderBlock.each(function () {
//             var $this = $(this);
//             if ($this.index() == linkIndex) {
//                 $sliderBlock.not($this).hide();
//                 $this.show();
//             }
//         }); 
//     })
      
// });


//select style - selectOrDie plugin
// $(document).ready(function(){
//     $(".j-select").selectOrDie();
// });



//sliders in filter
// $(document).ready(function () {
//     var $minCost = $('#minCost');
//     var $maxCost = $('#maxCost');


//     $( "#slider1" ).slider({
//         range: "max",
//         min: 0,
//         max: 100000,
//         value: 2,
//         slide: function( event, ui ) {
//             $minCost.val( ui.value );
//         }
//     });

//     $("#slider2").slider({
//         range: "max",
//         min: 0,
//         max: 100000,
//         value: 2,
//         slide: function( event, ui ) {
//             $maxCost.val( ui.value );
//         }
//     });

//     $minCost.val( $("#slider1").slider( "value" ) );
//     $maxCost.val( $("#slider2").slider( "value" ) );

// })



//popup
// $(document).ready(function(){
//     var $filterForm = $('.j-filter-form');

//     $('.j-filter-clean').on('click', function() {
//         var $sodOption1 = $filterForm.find('.sod_option').eq(0);
//         var $sodOption1Text = $sodOption1.text();

//         $filterForm.find('input').removeAttr('checked');
//         $filterForm.find('.sod_option').removeClass('selected active');
//         $sodOption1.addClass('selected active');
//         $filterForm.find('.sod_label').text($sodOption1Text);

//         $('.ui-slider-handle.ui-corner-all.ui-state-default').css('left','0 !important');
//     })
// })

//popup
// $(document).ready(function(){
//     var $popupWrapper  = $('.j-popup-wrapper');
//     var $popupWrapper2  = $('.j-popup-wrapper2');
//     var $popupWrapper3 = $('.j-popup-wrapper3');
//     var $popupWrapper4 = $('.j-popup-wrapper4');
//     var $popupWrapperLast = $('.j-popup-wrapper5');
//     var $link = $('.j-popup-link');
//     var $link2 = $('.j-popup-link2');
//     var $link3 = $('.j-popup-link3');
//     var $linkLast = $('.j-popup-link5');
//     var $firstInput = $('.j-input-first');

//     var popupFunc = function(link,popupWrapper) {
//         link.on('click', function() {

//             popupWrapper.fadeIn(200).find('.j-popup').fadeIn(500);
//             popupWrapper.find($firstInput).addClass('blinkAnim').focus();;
            
//             var $closeLink = $('.j-close');

//             $closeLink.on('click', function() {
//                 popupWrapper.find('input').val('');
//                 $firstInput.removeClass('blinkAnim');
//                 $('input').removeClass('border');
//                 popupWrapper.hide();
//             })

//         });

//         popupWrapper.on('click', function(e) {
//             var $this = $(this);
//             var $popup = $this.find('.j-popup');

//             if (!$(e.target).closest($popup).length) {
//                 $this.find('input').val('');
//                 $firstInput.removeClass('blinkAnim');
//                 $('input').removeClass('border');
//                 $this.hide();
//             }
//         })
//     }

//     popupFunc($link,$popupWrapper);
//     popupFunc($link2,$popupWrapper2);
//     popupFunc($link3,$popupWrapper3);
//     popupFunc($linkLast,$popupWrapperLast);

// })



//burger menu
$(document).ready(function() {
    $('.j-mobile-menu-link').on('click', function() {

    	$(this).toggleClass('opened');
        $('.j-header-menu').toggleClass('open');
        $('.middle-line').toggleClass('opened');
    });
})


// $(document).ready(function() {
//     $(".fancybox").fancybox();
// });



$(document).ready(function(){
    var $mainSlider = $('.j-main-slider');
    var $miniSlider1 = $('.j-mini-slider1');
    var $miniPrev1 = $('.j-prev1');
    var $miniNext1 = $('.j-next1');
    var $miniSlider2 = $('.j-mini-slider2');
    var $miniPrev2 = $('.j-prev2');
    var $miniNext2 = $('.j-next2');
    var $miniSlider3 = $('.j-mini-slider3');
    var $miniPrev3 = $('.j-prev3');
    var $miniNext3 = $('.j-next3');

    var $sliderItem = $mainSlider.find('.main-slider__item');
    var $discountBlock = $('.j-discount');
    var $animText1 = $('.j-anim-text1');
    var $animText2 = $('.j-anim-text2');
    var $animText3 = $('.j-anim-text3');


    setTimeout(function() {
        $sliderItem.eq(0).find($discountBlock).addClass('anim');
    },500)

    setTimeout(function() {
        $sliderItem.eq(0).find($animText1).addClass('anim');
    },1000)

    setTimeout(function() {
        $sliderItem.eq(0).find($animText2).addClass('anim');
    },1200)

    setTimeout(function() {
        $sliderItem.eq(0).find($animText3).addClass('anim');
    },1400)

    $mainSlider.slick({
        arrows:false,
        dots: true,
        infinite: true,
        slidesToShow:   1,
        slidesToScroll: 1,
        fade: true,
        speed: 700
    });


	$mainSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var $dots = $mainSlider.find('.slick-dots');

		$sliderItem.eq(nextSlide).find('.j-discount').addClass('anim');

		setTimeout(function() {
	        $sliderItem.eq(nextSlide).find($animText1).addClass('anim');
	    },500);

	    setTimeout(function() {
	        $sliderItem.eq(nextSlide).find($animText2).addClass('anim');
	    },1000)

	    setTimeout(function() {
	        $sliderItem.eq(nextSlide).find($animText3).addClass('anim');
	    },1200)

  		if (nextSlide == 0) {
			$dots.removeClass('second third fourth').addClass('first');
			// $sliderItem.eq(nextSlide).find('.j-discount').addClass('anim');
  		} else if (nextSlide == 1) {
  			$dots.removeClass('first third fourth').addClass('second');
  			// $sliderItem.eq(nextSlide).find('.j-discount').addClass('anim');
  		} else if (nextSlide == 2) {
  			$dots.removeClass('first second fourth').addClass('third');
  			// $sliderItem.eq(nextSlide).find('.j-discount').addClass('anim');
  		} else if (nextSlide == 3) {
  			$dots.removeClass('first second third').addClass('fourth');
  		}
	});

    $('.j-main-prev').click(function () {
        $mainSlider.slick('slickPrev');
    });

    $('.j-main-next').click(function () {
        $mainSlider.slick('slickNext');
    });

    $('.j-sales-slider').slick({
        arrows:false,
        dots:true,
        infinite: true,
        slidesToShow:   3,
        slidesToScroll: 1,
        responsive: [
	            {
	                breakpoint: 992,
	                settings: {
	                    slidesToShow:  2,
	                }
	            },
	            {
	                breakpoint: 768,
	                settings: {
	                    slidesToShow:  1,
	                    dots:false
	                }
	            },
	        ]
    });

     $('.j-sales-prev').click(function () {
        $('.j-sales-slider').slick('slickPrev');
    });

    $('.j-sales-next').click(function () {
        $('.j-sales-slider').slick('slickNext');
    });

    var miniSliderFunc = function(slider, link1, link2) {

        slider.slick({
            arrows:false,
            infinite: true,
            slidesToShow:   4,
            slidesToScroll: 1,
            responsive: [
	            {
	                breakpoint: 992,
	                settings: {
	                    slidesToShow:  3,
	                }
	            },
	            {
	                breakpoint: 768,
	                settings: {
	                    slidesToShow:  2,
	                }
	            },
	            {
	                breakpoint: 481,
	                settings: {
	                    slidesToShow:  1,
	                }
	            }
	        ]

        });

        link1.click(function () {
            slider.slick('slickPrev');
        });

        link2.click(function () {
            slider.slick('slickNext');
        });
    }


    var miniSliderFunc2 = function(slider, link1, link2) {

        slider.slick({
            arrows:false,
            infinite: true,
            slidesToShow:   6,
            slidesToScroll: 1,
                        responsive: [
	            {
	                breakpoint: 992,
	                settings: {
	                    slidesToShow:  3,
	                }
	            },
	            {
	                breakpoint: 460,
	                settings: {
	                    slidesToShow:  2,
	                }
	            }
	        ]

        });

        link1.click(function () {
            slider.slick('slickPrev');
        });

        link2.click(function () {
            slider.slick('slickNext');
        });
    }

    miniSliderFunc($miniSlider1, $miniPrev1, $miniNext1);
    miniSliderFunc($miniSlider2, $miniPrev2, $miniNext2);
    miniSliderFunc2($miniSlider3, $miniPrev3, $miniNext3);
    // miniSliderFunc($miniSlider4, $miniPrev4, $miniNext4);
    // miniSliderFunc($miniSlider5, $miniPrev5, $miniNext5);

})



$(document).ready(function(){
	$('.j-header-bottom-link').on('click', function(e) {
		if ($(window).width() <= 991) {
                var $this = $(this);

                e.preventDefault();

                $this.toggleClass('active');
                $this.siblings('.j-inner-menu').toggleClass('opened');
            } 
	})

})

