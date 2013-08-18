
jQuery('html').removeClass('no-js');
if (!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) jQuery('html').addClass('no-touch');

jQuery(document).ready(function () { "use strict";

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
	jQuery('.tooltip, #footer .flickr-image a').tipsy({
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
	jQuery('select').customSelect();

	jQuery(".lightbox").fancybox({
		padding    : 6,
		margin     : [50, 20, 20, 20],
		maxHeight  : '92%',
		loop       : true,
		fitToView  : true,
		mouseWheel : false,
		closeClick : false,
		helpers    : { media : { } }
	});

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

	if ( (jQuery('#quick-message').length>0) && jQuery.cookie ) {
		if ( jQuery.cookie('quickMessage') === 'quickMessageAccepted' && jQuery.cookie('quickMessageText') === jQuery('#quick-message .message').text() ) {
			jQuery('#quick-message').remove();
		} else {
			jQuery('#quick-message .container').slideDown();
			jQuery('#quick-message .button-close').click(function(e){
				jQuery('#quick-message .container').slideUp(function() {
					jQuery('#quick-message').remove();
				});
				if (jQuery.cookie) {
					jQuery.cookie('quickMessage', 'quickMessageAccepted', { expires: 14, path: '/' });
					jQuery.cookie('quickMessageText', jQuery('#quick-message .message').text(), { expires: 14, path: '/' });
				} else {
					jQuery.error('The jQuery.cookie plugin was not found, install this and try again!');
				}
				e.preventDefault();
			});
		}
	}

	jQuery('#menu .search-link a').click( function (e) {
		jQuery('#menu .search-link').toggleClass('on');
		jQuery('#menu .search-link form').toggleClass('visible');
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

	jQuery('#menu li.has-children a').click( function (e) {
		var $el = jQuery(this).parent();
		if ($el.hasClass('has-children')) {
			$el.toggleClass("hover");
			if ($el.parents('#menu').hasClass('mobile')) {
				$el.toggleClass('show-menu');
			}
			e.preventDefault();
		}
	});

	jQuery('#menu-switch').click(function(e) {
		jQuery(this).toggleClass('hover');
		jQuery('#header nav').toggleClass('mobile');
		e.preventDefault();
		return false;
	});

	jQuery(document).click(function(e) {
		if (jQuery(e.target).parents('#menu').length == 0) {
			jQuery('#menu .search-link').removeClass('on');
			jQuery('#menu .search-link form').removeClass('visible');
		}
	});

	jQuery('#top-link').click(function(e) {
		jQuery('html, body').animate({scrollTop:0}, 750, 'linear');
		e.preventDefault();
		return false;
	});

	jQuery(window).scroll(function () {
		var nScrollY = jQuery(window).scrollTop();
		if (nScrollY > 250) {
			jQuery('#top-link').fadeIn(500);
		} else {
			jQuery('#top-link').fadeOut(250);
		}
	});

	jQuery(window).resize(function() {
		jQuery('#menu-switch').removeClass('hover');
		jQuery('#header nav').removeClass('mobile');
		jQuery('select.hasCustomSelect').trigger('update');
	});
});