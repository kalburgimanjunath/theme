
jQuery('html').removeClass('no-js');
if (!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) jQuery('html').addClass('no-touch');

jQuery(document).ready(function () {

	jQuery('.tooltip').tip();
	jQuery('.tabs').tabify();
	jQuery('select').customSelect();

	jQuery('.accordion .accordion-title').click(function(e){
		$li = jQuery(this).parent('li');
		$ul = $li.parent('.accordion');
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
			jQuery('#quick-message').slideDown();
			jQuery('#quick-message span.button').click(function(e) {
				jQuery('#quick-message').slideUp(function() {
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

	jQuery('.gallery').each(function() {
		var $id = jQuery(this).attr("id");
		jQuery('.gallery-item a',this).attr("data-fancybox-group",$id);
	});

	jQuery('.gallery-item a').fancybox({
		padding    : 5,
		margin     : [50, 20, 20, 20],
		maxWidth   : '90%',
		maxHeight  : '90%',
		loop       : true,
		fitToView  : true,
		mouseWheel : false,
		closeClick : true,
		helpers    : {
			media : { } ,
			title : { type : 'outside' },
			overlay : { showEarly  : true, locked : false }
		}
	});

	jQuery(".thumb .lightbox").fancybox({
		padding    : 5,
		margin     : [50, 20, 20, 20],
		maxWidth   : '90%',
		maxHeight  : '90%',
		loop       : true,
		fitToView  : true,
		mouseWheel : false,
		closeClick : true,
		live       : true,
		helpers    : {
			media : { } ,
			title : { type : 'outside' },
			overlay : { showEarly  : true, locked : false }
		},
		beforeLoad : function() {
			this.href = this.element.data('fancybox-href');
			this.title = this.element.data('fancybox-title');
		}
	});

	if (jQuery('html').hasClass('no-touch')) {
		jQuery('#menu li').hover(
			function () { jQuery(this).addClass("hover"); },
			function () { jQuery(this).removeClass("hover"); }
		);
	}

	if (!jQuery('html').hasClass('no-touch')) {
		jQuery('#menu li.has-children > a').hover( function (e) {
			if (!jQuery('#menu').hasClass('mobile')) {
				jQuery(this).parent().addClass("hover");
			}
		}, function (e) {
			if (!jQuery('#menu').hasClass('mobile')) {
				jQuery(this).parent().removeClass("hover");
			}
		});
	}

	jQuery('#menu-switch').click(function(e) {
		jQuery(this).toggleClass('hover');
		jQuery('#menu').toggleClass('mobile');
		return false;
	});

	jQuery(window).resize(function() {
		if (jQuery(window).width() >= 768) {
			jQuery('#menu-switch').removeClass('hover');
			jQuery('#menu').removeClass('mobile');
			jQuery('#tooltip:visible').css("opacity", 0);
		}
		jQuery('select.hasCustomSelect').trigger('update');
	});
});