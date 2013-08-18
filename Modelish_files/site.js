jQuery(document).ready(function () { "use strict";

	jQuery('html').removeClass('no-js');
	if (!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) jQuery('html').addClass('no-touch');

	// Fixing the iOS orientation / viewport zoom bug
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
		var viewportmeta = document.querySelector('meta[name="viewport"]');
		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
			document.body.addEventListener('gesturestart', function() {
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6'; }, false);
		}
	}

	// initialize tooltips
	jQuery('.tooltip').tipsy({
		fade    : true,
		live    : true,
		opacity : 0.9,
		offset  : 3,
		gravity : jQuery.fn.tipsy.autoNS
	});

	jQuery('form .help').tipsy({
		trigger  : 'focus',
		opacity  : 0.9,
		offset   : 3,
		gravity  : jQuery.fn.tipsy.autoWE
	});

	jQuery('.tabs').tabify();

	jQuery('.gallery').each(function() {
		var $id = jQuery(this).attr("id");
		jQuery('.gallery-item a',this).attr("data-fancybox-group",$id);
	});

	jQuery('.lightbox, .gallery-item a').fancybox({
		padding    : 8,
		maxHeight  : '90%',
		maxWidth   : '90%',
		loop       : true,
		fitToView  : true,
		mouseWheel : false,
		closeClick : false,
		overlay    : { showEarly  : true },
		helpers    : { media : {} }
	});

	jQuery('.rotator .prev, .rotator .next').click( function (e) {
		var $parent = jQuery(this).parent();
		if (jQuery(this).hasClass("next")) {
			jQuery('.rotator-item:eq(0)',$parent).appendTo($parent);
		} else {
			jQuery('.rotator-item:eq(-1)',$parent).prependTo($parent);
		}
		e.preventDefault();
		jQuery('.prev,.next',$parent).appendTo($parent);
		jQuery('.rotator-item',$parent).removeClass('first-child').eq(0).addClass('first-child');
	});
	jQuery('.rotator .rotator-item:eq(0)').addClass("first-child");

	jQuery('.accordion .accordion-title').click(function(e){
		var $li = jQuery(this).parent('li');
		var $ul = $li.parent('.accordion');
		// check if only one accordion can be opened at a time
		if ($ul.hasClass('only-one-visible')) {
			jQuery('li',$ul).not($li).removeClass('active');
		}
		$li.toggleClass('active');
		e.preventDefault();
	});

	jQuery('#menu li').hover(
		function () {
			jQuery(this).addClass("hover");
		},
		function () {
			jQuery(this).removeClass("hover");
		}
	);

	if (!jQuery('html').hasClass('no-touch')) {
		jQuery('#menu li.has-children a').bind('touchstart', function(e) {
			e.stopPropagation();
		}).click( function (e) {
			if (jQuery('#menu').hasClass('mobile')) return;
			var $el = jQuery(this).parent();
			$el.toggleClass("hover");
			e.preventDefault();
		});
	}

	jQuery('#menu-switch').click(function(e) {
		jQuery(this).toggleClass('on');
		jQuery('#header nav').toggleClass('mobile');
		e.preventDefault();
		return false;
	});

	var $top_link = jQuery('#top-link');
	$top_link.click(function(e) {
		jQuery('html, body').animate({scrollTop:0}, 750, 'linear');
		e.preventDefault();
		return false;
	});

	jQuery(window).smartresize(function() {
		if (jQuery('#header').outerWidth() < 769) {
			return;
		}
		jQuery('#menu-switch').removeClass('on');
		jQuery('#header nav').removeClass('mobile');
	});
});