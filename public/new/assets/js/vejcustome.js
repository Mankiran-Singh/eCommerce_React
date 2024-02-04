$(document).ready(function() {	
	"use strict";
		
	$('.ui.selection').dropdown({on:'hover'});
	
	$('.ui.accounts').dropdown({on:'hover'});
	
	$('.ui.pages-menus').dropdown({
		onChange: function (value, text, $selectedItem) {
		console.log(value);
	},
		forceSelection: false, 
		selectOnKeydown: false, 
		showOnFocus: false
	});
	
	$(document).on('click', '.pull-bs-canvas-right, .pull-bs-canvas-left', function(){
		$('body').prepend('<div class="bs-canvas-overlay bg-dark position-fixed w-100 h-100"></div>');
		if($(this).hasClass('pull-bs-canvas-right'))
			$('.bs-canvas-right').addClass('mr-0');
		else
			$('.bs-canvas-left').addClass('ml-0');
		return false;
	});
	
	$(document).on('click', '.bs-canvas-close, .bs-canvas-overlay', function(){
		var elm = $(this).hasClass('bs-canvas-close') ? $(this).closest('.bs-canvas') : $('.bs-canvas');
		elm.removeClass('mr-0 ml-0');
		$('.bs-canvas-overlay').remove();
		return false;
	});
	
	//profile update 

	/* uploade seller profile image  */
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#imagePreview').css('background-image', 'url('+e.target.result +')');
				$('#imagePreview').hide();
				$('#imagePreview').fadeIn(650);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#imageUpload").change(function() {
		readURL(this);
	});
	
	
	$("#ser-input").click(function() {
	
		$('.search-full-view').addClass("search-normal-screen");
	});
	$("#search-close").click(function() {
		$('.search-full-view').removeClass("search-normal-screen");
	});
		
	 //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        spaceBetween: 50,
        speed: 1000,
        effect: 'fade',
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        }
    })	
	
	/* Progress bar */
	$(".circle_percent").each(function() {
		var $this = $(this),
			$dataV = $this.data("percent"),
			$dataDeg = $dataV * 3.6,
			$round = $this.find(".round_per");
		$round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");	
		$this.append('<div class="circle_inbox"><span class="percent_text"></span></div>');
		$this.prop('Counter', 0).animate({Counter: $dataV},
		{
			duration: 2000, 
			easing: 'swing', 
			step: function (now) {
				$this.find(".percent_text").text(Math.ceil(now)+"%");
			}
		});
		if($dataV >= 51){
			$round.css("transform", "rotate(" + 360 + "deg)");
			setTimeout(function(){
				$this.addClass("percent_more");
			},1000);
			setTimeout(function(){
				$round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
			},1000);
		} 
	});


	
	/* offers sliders home  */
	/* ========= #grocino-carousel ========= */
	$("#grocino-carousel").owlCarousel({
		autoplay: true,
		lazyLoad: true,
		loop: false,
		pagination: false,
		margin: 30,

		animateOut: 'fadeOut',
		animateIn: 'fadeIn',

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 7000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
			items: 1
			},

			600: {
			items: 2
			},

			1024: {
			items: 3
			},

			1180: {
			items: 4
			}
		}
	});

	/* ========= #grocino-running ========= */
	$("#grocino-running").owlCarousel({
		autoplay: false,
		lazyLoad: false,
		loop: true,
		pagination: false,
		dots: true,
		
		margin: 30,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		dots: true,
		responsive: {
			0: {
				dotsEach: 5,
				items: 1
			},

			600: {
				dotsEach: 3,
				items: 2
			},

			1024: {
				dotsEach: 2,
				items: 2
			},

			1180: {
				dotsEach: 1,
				items: 3
			}
		}
	});

	/* ========= #category-popular ========= */
	$("#category-popular").owlCarousel({
		autoplay: false,
		lazyLoad: false,
		loop: true,
		pagination: false,
		dots: true,
		
		margin: 35,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
				dotsEach: 5,
				items: 1
			},

			600: {
				dotsEach: 3,
				items: 2
			},

			1024: {
				dotsEach: 2,
				items: 3
			},

			1180: {
				dotsEach: 1,
				items: 4
			}
		}
	});

	/* ========= #brands ========= */
	$("#brands").owlCarousel({
		center: true,
		autoplay: true,
		lazyLoad: false,
		loop: true,
		pagination: false,
		dots: true,
		
		margin: 30,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
				dotsEach: 5,
				items: 2
			},
				
			425: {
				dotsEach: 5,
				items: 3
			},
			
			600: {
				dotsEach: 3,
				items: 4
			},

			1024: {
				dotsEach: 2,
				items: 5.6
			},

			1180: {
				dotsEach: 1,
				items: 5.6
			}
		}
	});

	/* ========= #ourteam-members ========= */
	$("#ourteam-members").owlCarousel({
		autoplay: true,
		lazyLoad: false,
		loop: true,
		pagination: false,
		nav: false,
		dots: false,

		margin: 95,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 3000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
				margin: 0,
				items: 1
			},
			
			600: {
				margin: 30,
				items: 2
			},

			1024: {
				margin: 50,
				items: 4
			},

			1180: {
				margin: 95,
				items: 4
			}
		}
	});

	/* ========= #grocerino-about ========= */
	$("#grocerino-about").owlCarousel({
		autoplay: false,
		lazyLoad: false,
		loop: true,
		pagination: false,
		dots: true,
		
		margin: 30,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
				dotsEach: 5,
				items: 1
			},

			600: {
				dotsEach: 3,
				items: 1
			},

			1024: {
				dotsEach: 2,
				items: 1
			},

			1180: {
				dotsEach: 1,
				items: 1
			}
		}
	});

	/* ========= #grocino-arrivalcarousel ========= */
	$("#grocino-arrivalcarousel").owlCarousel({
		autoplay: true,
		lazyLoad: true,
		loop: false,
		pagination: false,
		margin: 30,

		animateOut: 'fadeOut',
		animateIn: 'fadeIn',

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 7000,
		smartSpeed: 800,
		nav: true,
		pagination: false,
		responsive: {
			0: {
			items: 1
			},

			600: {
			items: 2
			},

			1024: {
			items: 3
			},

			1180: {
			items: 4
			}
		}
	});

	/* ========= #grocino-googlereview ========= */
	$("#grocino-googlereview").owlCarousel({
		autoplay: true,
		lazyLoad: true,
		loop: true,
		pagination: false,
		margin: 35,

		animateOut: 'fadeOut',
		animateIn: 'fadeIn',

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 7000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
			  items: 1
			},

			600: {
			  items: 1
			},

			1024: {
			  items: 2
			},

			1180: {
			  items: 3
			}
		}
	});

	/* ========= #grocino-speech ========= */
	$("#grocino-speech").owlCarousel({
		center: true,
		autoplay: false,
		lazyLoad: true,
		loop: true,
		pagination: true,
		margin: 35,
		
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 7000,
		smartSpeed: 800,
		nav: true,
		pagination: true,
		responsive: {
			0: {
			  items: 1.1
			},

			600: {
			  items: 2.1
			},

			1024: {
			  items: 2.3
			},

			1180: {
			  items: 2.3
			}
		}
	});

	/* ========= #grocino-organic ========= */
	$("#grocino-organic").owlCarousel({
		autoplay: true,
		lazyLoad: true,
		loop: false,
		pagination: false,
		margin: 0,

		animateOut: 'fadeOut',
		animateIn: 'fadeIn',

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 7000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
			items: 1
			},

			600: {
			items: 1
			},

			1024: {
			items: 1
			},

			1180: {
			items: 1
			}
		}
	});

	/* ========= #grocino-whyslider ========= */
	$("#grocino-whyslider").owlCarousel({
		autoplay: true,
		lazyLoad: false,
		loop: true,
		pagination: true,
		margin: 0,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: true,
		responsive: {
			0: {
			items: 1
			},

			600: {
			items: 1
			},

			1024: {
			items: 1
			},

			1180: {
			items: 1
			}
		}
	});

	/* ========= #grocino-blogs ========= */
	$("#grocino-blogs").owlCarousel({
		autoplay: true,
		lazyLoad: false,
		loop: true,

		margin: 30,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
			items: 1
			},

			600: {
			items: 2
			},

			1024: {
			items: 2
			},

			1180: {
			items: 3
			}
		}
	});

	/* ========= #grocino-blogs ========= */
	$("#grocino-blogs2").owlCarousel({
		autoplay: false,
		lazyLoad: false,
		loop: true,
		pagination: false,
		dots: true,

		margin: 50,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
				margin: 0,
				dotsEach: 5,
				items: 1
			},

			600: {
				margin: 30,
				dotsEach: 3,
				items: 2
			},

			1024: {
				margin: 40,
				dotsEach: 2,
				items: 3
			},

			1180: {
				margin: 50,
				dotsEach: 1,
				items: 3
			}
		}
	});

	/* ========= #grocino-brand ========= */
	$("#grocino-brand").owlCarousel({
		autoplay: true,
		lazyLoad: false,
		loop: true,

		margin: 10,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
		responsive: {
			0: {
			items: 2
			},

			600: {
			items: 3
			},

			1024: {
			items: 4
			},

			1180: {
			items: 6
			}
		}
	});

	/* ========= #grocino-category ========= */
	$("#grocino-category").owlCarousel({
		autoplay: true,
		lazyLoad: false,
		loop: true,

		margin: 50,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: false,
		pagination: false,
			responsive: {
			0: {
				margin: 30,
				items: 1
			},

			600: {
				margin: 30,
				items: 2
			},

			1024: {
				margin: 40,
				items: 4
			},

			1180: {
				margin: 50,
				items: 6
			}
		}
	});

	/* ========= #foodinfo-carousel ========= */
	$("#foodinfo-carousel").owlCarousel({
		autoplay: false,
		lazyLoad: false,
		loop: true,
		pagination: true,
		
		margin: 30,

		responsiveClass: true,
		autoHeight: true,
		autoplayTimeout: 2000,
		smartSpeed: 800,
		nav: true,
		pagination: true,
		responsive: {
			0: {
				items: 1
			},

			600: {
				items: 1
			},

			1024: {
				items: 1
			},

			1180: {
				items: 1
			}
		}
	});

	/* plus minus  */
	$('.btn-number').click(function(e){
		e.preventDefault();
		
		var fieldName = $(this).attr('data-field');
		var type      = $(this).attr('data-type');
		var input = $("input[name='"+fieldName+"']");
		var currentVal = parseInt(input.val());
		if (!isNaN(currentVal)) {
			if(type == 'minus') {
				
				if(currentVal > input.attr('min')) {
					input.val(currentVal - 1).change();
				} 
				if(parseInt(input.val()) == input.attr('min')) {
					$(this).attr('disabled', true);
				}

			} else if(type == 'plus') {

				if(currentVal < input.attr('max')) {
					input.val(currentVal + 1).change();
				}
				if(parseInt(input.val()) == input.attr('max')) {
					$(this).attr('disabled', true);
				}

			}
		} else {
			input.val(0);
		}
	});

	$('.input-number').change(function() {
		
		var minValue =  parseInt($(this).attr('min'));
		var maxValue =  parseInt($(this).attr('max'));
		var valueCurrent = parseInt($(this).val());
		
		name = $(this).attr('name');
		if(valueCurrent >= minValue) {
			$(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
		} else {
			alert('Sorry, the minimum value was reached');
			$(this).val($(this).data('oldValue'));
		}
		if(valueCurrent <= maxValue) {
			$(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
		} else {
			alert('Sorry, the maximum value was reached');
			$(this).val($(this).data('oldValue'));
		}
	
	});
	
	// Product Grid
	$('#grid-view').on('click',function(){
		$('.product-list').attr('class', 'product-layout product-grid col-12 col-xl-3 col-lg-6 col-md-6 col-sm-6');
		localStorage.setItem('display', 'grid');
	});
	$('#list-view').on('click',function(){
		$('.product-grid').attr('class', 'product-layout product-list col-12');
		localStorage.setItem('display', 'list');
	});
	
	
	// Product Grid
	$('#grid-view1').on('click',function(){
		$('.product-list1').attr('class', 'product-layout product-grid');
		localStorage.setItem('display', 'grid');
	});
	$('#list-view1').on('click',function(){
		$('.product-grid1').attr('class', 'product-layout product-list');
		localStorage.setItem('display', 'list');
	});
	

    $(".list_inline > .btn-group > .btn").click(function(){
		$(".list_inline > .btn-group > .btn").removeClass("active");
		$(this).addClass("active");
	});
	
	 $(".list_inline > .btn-group").click(function(){
		$(".list_inline > .btn-group").toggleClass("active");
	});

});