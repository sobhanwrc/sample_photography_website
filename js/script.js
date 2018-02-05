"use strict";

/*------------------------------------------------------------------
[Master Scripts]

Project:    Persona template
Version:    1.0

[Components]
	- Preloader
	- Equal height
	- Side image block
	- Banner block item
	- Equal Height
	- Image fill
	- Blog + Portfolio
	- Portfolio items/filtering
	- Coming soon countdown
	- Blog items/filtering
	- Slider
	- Banner block slider
	- Carousel
	- Article calousel
	- Side panel
	- Header search form
	- Header search form close button
	- Map
	- Mobile menu
	
-------------------------------------------------------------------*/

/*------------------------------------------------------------------
[ Preloader ]
*/

jQuery(window).on('load', function () {
	var $preloader = jQuery('#page-preloader'),
	$spinner = $preloader.find('.spinner');
	$spinner.fadeOut();
	$preloader.delay(600).fadeOut('slow');
});

jQuery( document ).ready(function() {
	
	/*------------------------------------------------------------------
	[ Equal height ]
	*/

	function equalHeight(group) {
        if(jQuery(window).width() > '768') {
			var tallest = 0;
	       	jQuery(group).each(function() {
	            var thisHeight = jQuery(this).css('height', "").height();
	            if(thisHeight > tallest) {
	                tallest = thisHeight;
	            }
	        });
	        jQuery(group).height(tallest);
	    } else {
	    	jQuery(group).height('auto');
	    }
    }

	jQuery(window).on("load resize", function(){

		/*------------------------------------------------------------------
		[ Side image block ]
		*/

		jQuery('.col-img').css('height', jQuery('.col-img + div').outerHeight());

		/*------------------------------------------------------------------
		[ Banner block item ]
		*/

		jQuery('.banner-block.full-screen-block .item').each(function(){
			jQuery(this).css('height', jQuery(window).height()-jQuery('.header-space').height());
		});

		jQuery('.banner-block .item').each(function(){
			jQuery(this).css('height', jQuery(this).parents('.banner-block').height());
		});

		/*------------------------------------------------------------------
		[ Equal Height ]
		*/

		equalHeight(jQuery('.fw-row:not(.masonry) .blog-item .wrap'));

		/*------------------------------------------------------------------
		[ Image fill ]
		*/

		if(jQuery('.imagefill').length > 0) {
	    	jQuery('.imagefill').each(function () {
	    		jQuery(this).imagefill();
	    	});
		}
	});

	/*------------------------------------------------------------------
	[ Blog + Portfolio ]
	*/

	jQuery(window).on("load resize", function(){
		jQuery('.portfolio-side').css('height', jQuery('.blog-side').height());
	});

	jQuery(window).on("load resize scroll", function(){
		var blog_h = jQuery('.blog-side').height(),
			portfolio_h = jQuery('.portfolio-side .wrap').height(),
			scrolled = jQuery(window).scrollTop(),
			height = jQuery(document).height()+jQuery(window).height();

		if (blog_h >= portfolio_h) {
			var coef = (blog_h-portfolio_h+jQuery(window).height())/blog_h,
				top = 0+(scrolled*coef),
				max_top = blog_h-portfolio_h;
		} else {
			var coef = (portfolio_h-blog_h+jQuery(window).height())/blog_h,
				top = 0-(scrolled*coef),
				max_top = blog_h-portfolio_h;
		}
		
		if (blog_h >= portfolio_h) {
			if (max_top >= top) {
				jQuery('.portfolio-side .wrap').css('top',top+'px');
			}
		} else {
			if (max_top <= top) {
				jQuery('.portfolio-side .wrap').css('top',top+'px');
			}
		}
	});

	/*------------------------------------------------------------------
	[ Portfolio items/filtering ]
	*/

	if(jQuery('.portfolio-items').length > 0){
		jQuery(window).on("load", function(){
			jQuery('.portfolio-items').each(function(){
				if (jQuery(this).hasClass('masonry')) {
					var mode = 'masonry';
				} else {
					var mode = 'fitRows';
				}
				var $grid = jQuery(this).isotope({
					itemSelector: '.portfolio-item',
					percentPosition: true,
					layoutMode: mode,
				});

				jQuery('.filter-button-group').on( 'click', 'button', function() {
					jQuery(this).addClass('active-tab').siblings().removeClass('active-tab');
					var filterValue = jQuery(this).attr('data-filter');
					$grid.isotope({ filter: filterValue });
				});
			});
		});
	}

    /*------------------------------------------------------------------
	[ Coming soon countdown ]
	*/
	if(jQuery('#countdown').length > 0){
		jQuery('#countdown').countdown({
			timestamp	: (new Date()).getTime() + 10*24*60*60*1000,
			callback	: function(days, hours, minutes, seconds){
			}
		});
	}

	/*------------------------------------------------------------------
	[ Blog items/filtering ]
	*/

	if(jQuery('.filter-blog').length > 0){
		jQuery(window).on("load", function(){
			jQuery('.filter-blog').each(function(){
				if (jQuery(this).hasClass('masonry')) {
					var mode = 'masonry';
				} else {
					var mode = 'fitRows';
				}
				var $grid = jQuery(this).isotope({
					itemSelector: '.filter-blog-item',
					percentPosition: true,
					layoutMode: mode,
				});

				jQuery('.filter-button-blog').on( 'click', 'button', function() {
					jQuery(this).addClass('active').siblings().removeClass('active');
					var filterValue = jQuery(this).attr('data-filter');
					$grid.isotope({ filter: filterValue });
				});
			});
		});
	}

	/*------------------------------------------------------------------
	[ Slider ]
	*/

	if(jQuery('.slider-wrap').length > 0){
		jQuery('.slider-wrap').owlCarousel({
			loop:true,
			items:1,
			nav: true,
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			navClass: ['owl-prev icon-left-direction-arrow','owl-next icon-right-thin-chevron'],
			navText: false
		});
	}

	/*------------------------------------------------------------------
	[ Banner block slider ]
	*/

	if(jQuery('.banner-block.slider').length > 0){
		jQuery('.banner-block.slider').owlCarousel({
			loop:true,
			items:1,
			nav: true,
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			navClass: ['owl-prev icon-left-direction-arrow','owl-next icon-right-thin-chevron'],
			navText: false,
			responsive:{
				0:{
					nav: false,
				},
				480:{
					
				},
				768:{
					nav: true,
				},
			}
		});
	}

	/*------------------------------------------------------------------
	[ Carousel ]
	*/

	if(jQuery('.photo-carousel').length > 0){
		jQuery('.photo-carousel').owlCarousel({
			loop:true,
			items:4,
			nav: false,
			dots: false,
			margin: 30,
			autoplay: true,
			autoplayTimeout: 2000,
			smartSpeed: 2000,
			autoplayHoverPause: true,
			navClass: ['owl-prev icon-left-direction-arrow','owl-next icon-right-thin-chevron'],
			navText: false,
			responsive:{
				0:{
					items:1
				},
				480:{
					items:2
				},
				768:{
					items:3
				},
				992:{
					items:4
				}
			}
		});
	}

	/*------------------------------------------------------------------
	[ Article calousel ]
	*/

	if(jQuery('.article-carousel').length > 0){
		jQuery('.article-carousel').owlCarousel({
			loop:true,
			items:3,
			nav: true,
			dots: false,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: true,
			navClass: ['owl-prev icon-left-direction-arrow','owl-next icon-right-thin-chevron'],
			navText: false,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:2
				},
				1000:{
					items:3
				}
			}
		});
	}

	/*------------------------------------------------------------------
	[ Side panel ]
	*/

	jQuery('.side-panel-button').on("click", function(){
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('body').removeClass('open-sideblock');
			jQuery('.side-panel-area').removeClass('active');
		} else {
			jQuery(this).addClass('active');
			jQuery('body').addClass('open-sideblock');
			jQuery('.side-panel-area').addClass('active');
		};
	});

	jQuery('.side-panel-area .button-close').on("click", function(){
		jQuery('.side-panel-button').removeClass('active');
		jQuery('body').removeClass('open-sideblock');
		jQuery('.side-panel-area').removeClass('active');
	});

	/*------------------------------------------------------------------
	[ Header search form ]
	*/

	jQuery('.header .search').on("click", function(){
		if (jQuery(this).hasClass('active')) {
			jQuery('.header-search-form').removeClass('active');
		} else {
			jQuery('.header-search-form').addClass('active');
		};
	});

	/*------------------------------------------------------------------
	[ Header search form close button ]
	*/

	jQuery('.header-search-form .button-close').on("click", function(){
		jQuery('.header-search-form,.header .search').removeClass('active');
	});

	/*------------------------------------------------------------------
	[ Map ]
	*/

	if(jQuery('#map').length > 0){
		function initialize() {
			var myLatlng = new google.maps.LatLng(51.522999, -0.157947);
			var mapOptions = {
				zoom: 16,
				center: myLatlng,
				disableDefaultUI: true,
				scrollwheel: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: [{"featureType":"all","elementType":"all","stylers":[{"saturation":-100},{"gamma":1}]}]
			}
			var map = new google.maps.Map(document.getElementById("map"), mapOptions);

			var myLatLng = new google.maps.LatLng(51.522999, -0.157947);
			var beachMarker = new google.maps.Marker({
				position: myLatLng,
				map: map
			});
			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center); 
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	}

	/*------------------------------------------------------------------
	[ Mobile menu ]
	*/
	
	jQuery('ul.menu .menu-item-has-children > a').on("click", function(){
		if(!jQuery(this).hasClass('active')) {
			jQuery(this).addClass('active').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp();
			return false;
		}
	});
});