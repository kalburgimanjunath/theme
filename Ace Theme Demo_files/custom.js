jQuery(function($){

	if(!jQuery.browser)
		jQuery.browser=browser_detect();
	
	if(jQuery.browser.msie && parseInt(jQuery.browser.version) < 8)
		return;
	
	if(jQuery.browser.webkit || jQuery.browser.chrome || jQuery.browser.safari)
		jQuery('html').addClass('webkit');
	else if(jQuery.browser.msie) {
		jQuery('html').addClass('msie');
		if(parseInt(jQuery.browser.version) == 8)
			jQuery('html').addClass('msie8');
		else if(parseInt(jQuery.browser.version) >= 10)
			jQuery('html').addClass('msie10');
	}
	else if(jQuery.browser.mozilla)
		jQuery('html').addClass('mozilla');
		
	if(jQuery('html').hasClass('msie8'))
		jQuery('img').removeAttr('width').removeAttr('height');
		
	if(!!('ontouchstart' in window))
		jQuery('html').addClass('touch');
	else
		jQuery('html').addClass('no-touch');
		
	$('.add-line, .navigation-next a, .post-preview-pic a').append('<span class="after" />');
	$('.navigation-prev a').prepend('<span class="before" />');
	$('input[type=button], input[type=submit], input[type=reset]').wrap('<span class="input-button-container" />');
	
	responsiveListener_init();
	
	retina_images_init();
	
	sidebar_init();

	fix_placeholders();
		
	bg_overlay_init();
	
	menu_init();

	menu_floating_init();

	buttons_init();
	
	comments_label_init();
	
	sliced_gallery_init();
	
	hover_zoom_init();
	
	gallery_init();
	
	video_embed_init();
	
	comments_init();
	
	sort_menu_init();
	
	portfolio_init();
	
	tooltips_init();
	
	toggle_init();
	
	tabs_init();
	
	testimonials_init();
	
	contact_form_init();
	
	logos_init();
	
	lazyload_init();
	
	woocommerce_init();
	
	table_styling();
	
	/***********************************/

	function browser_detect() {
		
		var matched, browser;
	
		ua = navigator.userAgent.toLowerCase();
	
		var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
			/(webkit)[ \/]([\w.]+)/.exec( ua ) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
			/(msie) ([\w.]+)/.exec( ua ) ||
			ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
			[];
	
		matched = {
			browser: match[ 1 ] || "",
			version: match[ 2 ] || "0"
		};
	
		browser = {};
	
		if ( matched.browser ) {
			browser[ matched.browser ] = true;
			browser.version = matched.version;
		}
	
		if ( browser.webkit ) {
			browser.safari = true;
		}
	
		return browser;
	}
	
	/***********************************/
		
	function responsiveListener_init(){
		var lastWindowSize=jQuery(window).width();
		jQuery(window).data('mobile-view',(lastWindowSize<1001));
		
		jQuery(window).resize(function(){
			var w=jQuery(this).width();
			if(
				(w>=1001 && lastWindowSize < 1001) ||
				(w<=1000 && lastWindowSize > 1000)
			){
				jQuery(window).data('mobile-view',(w<1001));
			}
			lastWindowSize=w;
		});
		
	}
	
	/***********************************/
	
	function retina_images_init() {
		if(window.devicePixelRatio > 1.8) {
			$('img[data-src-retina]').each(function(){
				if($(this).data('src-retina'))
					this.src=$(this).data('src-retina');
			})
		}
	}
	
	/***********************************/
	
	function bg_overlay_init() {
		
		var wh=$(window).height();
		var $obj=$('.bg-overlay');
		if($obj.height() < wh)
			$obj.css('min-height',wh+'px');
	
	}

	/***********************************/
	
	function fix_placeholders() {
		
		var input = document.createElement("input");
	  if(('placeholder' in input)==false) { 
			jQuery('[placeholder]').focus(function() {
				var i = jQuery(this);
				if(i.val() == i.attr('placeholder')) {
					i.val('').removeClass('placeholder');
					if(i.hasClass('password')) {
						i.removeClass('password');
						this.type='password';
					}			
				}
			}).blur(function() {
				var i = jQuery(this);	
				if(i.val() == '' || i.val() == i.attr('placeholder')) {
					if(this.type=='password') {
						i.addClass('password');
						this.type='text';
					}
					i.addClass('placeholder').val(i.attr('placeholder'));
				}
			}).blur().parents('form').submit(function() {
				jQuery(this).find('[placeholder]').each(function() {
					var i = jQuery(this);
					i.addClass('placeholder-submitting');
					if(i.val() == i.attr('placeholder'))
						i.val('');
				})
			});
		}
	}
	
	/***********************************/
	
	function sidebar_init() {
		jQuery('.sidebar-widget').filter(':odd').addClass('alt-bg');
	}
	
	/***********************************/
	
	function menu_floating_init() {
		
		if($('body').hasClass('menu-fixed')){
			
		
			var $obj=$('.top-area');
			var $holder=$('<div class="top-area-holder" />');
			var $lms_container=$('.lms-container-wrapper');
			var $is_container=$('.is-container-uber-wrapper');

			$holder.hide().insertAfter($obj);
			
			function fit_top_area_holder() {
				$holder.css('height',$obj.height()+'px');
			}
			fit_top_area_holder();
			$(window).bind('resize load',fit_top_area_holder);
			
			$(window).bind('resize scroll',function(){
				var is_container_height=$('.is-container-wrapper').outerHeight();
				if($(window).scrollTop() <= 16+is_container_height || ($(window).width() < 1001 && $('body').hasClass('mobile-responsive-active')) ) {
					$obj.removeClass('area-fixed');
					$holder.hide();
				}
				else {
					$obj.addClass('area-fixed');
					$holder.show();
				}
			});
			
		}
		
	}
	
	function menu_init() {

		jQuery('ul.primary-menu-fallback.show-dropdown-symbol li').each(function(){
			if(jQuery(this).children('ul').length)
				jQuery(this).addClass('menu-parent-item');
		});

		var args={
			autoArrows: false,
			delay: 500, 
			animation: {opacity: 'show', height: 'show'},
			animationOut: {opacity: 'hide'},
			speed: 200,
			speedOut: 300,
			onBeforeHide: function(){
				jQuery(this).parent().removeClass('omHover');
			},
			onBeforeShow: function(){
				jQuery(this).parent().addClass('omHover');
			}
		};
	
		if(jQuery('html').hasClass('no-touch')) {
			args.onBeforeShow=function(){
				jQuery(this).parent().addClass('omHover');
				jQuery(this).children('li').stop(true).css('opacity',0);
			};
			args.onShow=function(){
				var i=0;
				jQuery(this).children('li').each(function(){
					jQuery(this).fadeTo(100+100*i,1);
					i++;
				});
			};
		}
		
		jQuery('ul.primary-menu').superfish(args);
		
		jQuery('ul.primary-menu-mobile').superfish({
			autoArrows: false,
			/*useClick: true,*/
			delay: 500, 
			animation: {opacity: 'show', height: 'show'},
			animationOut: {opacity: 'hide', height: 'hide'},
			speed: 200,
			speedOut: 300
		});
		
		$('.mobile-menu-control').click(function(){
			$(this).toggleClass('active');
			$('.primary-menu-mobile').slideToggle(300);
		});
		
	}
	
	
	/***********************************/
	
	function buttons_init(){
		
		$('.button[data-hovercolor]').hover(function(){
			$(this).data('unhovercolor',$(this).css('background-color'));
			$(this).css('background-color',$(this).data('hovercolor'));
		},
		function(){
			$(this).css('background-color',$(this).data('unhovercolor'));
		});
		
	}
	
	/***********************************/
	
	function comments_label_init(){
		
		if(jQuery('html').hasClass('no-touch')) {
			$('.comments-label').wrapInner('<span style="position:relative" />').mouseenter(function(){
				$(this).children('span').stop(true).animate({top: '100%'},150,function(){
					$(this).css('top','-100%').animate({top: 0},150);
				});
			});
		}
		
	}
	
	/***********************************/
	
	function sliced_gallery_init() {
		
		jQuery(window).bind('resize load', function(){
			sliced_gallery_resize();
		});
		sliced_gallery_resize();
		
		if(($('body').hasClass('sidebar-hidden') || $('body').hasClass('sidebar-one')) && !$('html').hasClass('msie8')) {
			
			$('.gallery-sliced').filter(function(){
				return (jQuery(this).parents('.portfolio-item.ratio-1v1').length==0 && jQuery(this).parents('.portfolio-item.ratio-1v2').length == 0);
			}).find('img').each(function(){
				if($(this).data('src-large')) {
					var wh=$(this).data('src-large-wh').split('x');
					if($(this).hasClass('lazyload') && $(this).data('original'))
						$(this).data('original',$(this).data('src-large')); // lazyload activated
					else
						$(this).attr('src',$(this).data('src-large'));
					if(typeof($(this).attr('width')) != 'undefined' && wh[0])
						$(this).attr('width',wh[0]);
					if(typeof($(this).attr('height')) != 'undefined' && wh[1]) 
						$(this).attr('height',wh[1]);
				}
			});
		}
	
	}
	
	function sliced_gallery_resize(){
		
		$('.gallery-sliced').each(function(){
			var $cont=$(this);
			var w=$cont.width();
			
			var mar=Math.floor(w*0.01);

			//2
			var $box=$cont.find('.gallery-sliced-box-2');
			if($box.length) {
				var h1=Math.floor(w*0.66*0.66561514195583596214511041009464);
				$box.find('.img-1, .img-2').css('height',h1+'px');
			}
			
			//3
			var $box=$cont.find('.gallery-sliced-box-3');
			if($box.length) {
				$box.find('.img-2').css('margin-bottom',mar+'px');
				var h2=Math.floor(w*0.33*0.65299684542586750788643533123028);
				var h1 = h2*2+mar;
				$box.find('.img-1').css('height',h1+'px');
				$box.find('.img-2, .img-3').css('height',h2+'px');
			}
						
			//4
			var $box=$cont.find('.gallery-sliced-box-4');
			if($box.length) {
				$box.find('.img-2, .img-3').css('margin-bottom',mar+'px');
				var h2=Math.floor(w*0.33*0.56151419558359621451104100946372);
				var h1 = h2*3+mar*2;
				$box.find('.img-1').css('height',h1+'px');
				$box.find('.img-2, .img-3, .img-4').css('height',h2+'px');
			}
			
			//5
			var $box=$cont.find('.gallery-sliced-box-5');
			if($box.length) {
				var h1 = Math.floor(w*0.3266*0.66666666666);
				var h2 = Math.floor(w*0.495*0.66666666666);
				$box.find('.img-1, .img-2, .img-3').css('height',h1+'px');
				$box.find('.img-4, .img-5').css('height',h2+'px');
			}
		});
		
	}
	
	/***********************************/
	
	function hover_zoom_init(){
		
		$('.hover-zoom').append('<span class="tl" /><span class="tr" /><span class="bl" /><span class="br" />').hover(function(){
			$(this).children('.tl').stop(true).animate({left: 0, opacity: 1},200);
			$(this).children('.tr').stop(true).animate({top: 0, opacity: 1},200);
			$(this).children('.br').stop(true).animate({right: 0, opacity: 1},200);
			$(this).children('.bl').stop(true).animate({bottom: 0, opacity: 1},200);
		},
		function(){
			$(this).children('.tl').stop(true).animate({left: '-50%', opacity: 0},200);
			$(this).children('.tr').stop(true).animate({top: '-50%', opacity: 0},200);
			$(this).children('.br').stop(true).animate({right: '-50%', opacity: 0},200);
			$(this).children('.bl').stop(true).animate({bottom: '-50%', opacity: 0},200);
		});
		
	}
	
	/***********************************/

	function gallery_init() {
		if(jQuery().omSlider) {
			jQuery('.custom-gallery').each(function(){
				var $items=jQuery(this).find('.items');
				var num=$items.find('.item').length;
				if(num > 1) {
					
					var active=0;
					var hash=document.location.hash.replace('#','');
					if(hash != '') {
						var $active=$items.find('.item[rel='+hash+']');
						if($active.length)
							active=$active.index();
					}
					jQuery(this).append('<div class="controls"><div class="control-prev"><a href="#" class="prev"></a></div><div class="control-counter"><span class="counter"><span class="current"></span><span class="total"></span></span></div><div class="control-next"><a href="#" class="next"></a></div></div>');
					var $controls=jQuery(this).find('.controls');
					$controls.find('.total').html(num);
					$items.omSlider({
						speed: 400,
						next: $controls.find('.next'),
						prev: $controls.find('.prev'),
						active: active,
						before: function(currSlide, nextSlide, currSlideNum, nextSlideNum){
							$controls.find('.current').html(nextSlideNum+1);
						}
					});
	
				}
			});
		}
	}
	
	/***********************************/

	function video_embed_init()	{
		
		$('.video-embed').each(function(){
			var $obj=$(this).children(':first');
			if($obj.length) {
				var w=parseInt($obj.attr('width'));
				var h=parseInt($obj.attr('height'));
				if(!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
					var r=h/w;
					$(this).css('padding-bottom',(r*100)+'%');
				}
			}
		});
		
	}

	/****************************/
	
	function comments_init()
	{
		if(jQuery().validate) {

			var validate_options={
				errorPlacement: function(error, element) {
				},
				wrapper: 'div'
			};
	
			if(('placeholder' in document.createElement("input"))==false) { 
				validate_options.invalidHandler = function() {
					jQuery(this).find('.placeholder-submitting').each(function(){
						var i = jQuery(this);
						if(i.val() == '' || i.val() == i.attr('placeholder')) {
							if(this.type=='password') {
								i.addClass('password');
								this.type='text';
							}
							i.addClass('placeholder').val(i.attr('placeholder'));
						}
					});
				}
				validate_options.focusInvalid=false;
			};			
			
			jQuery("#commentform").validate(validate_options);
		}
	}

	/****************************/

	function sort_menu_init()
	{
		
		jQuery('.sort-menu li a .count').wrapInner('<span />');
		jQuery('.sort-menu li a').mouseenter(function(){
			var $count=jQuery(this).find('.count span');
			if($count.is(':animated') || $(this).hasClass('active'))
				return;
			$count.stop(true).animate({top: '24px'}, 150, function(){
				jQuery(this).css('top','-24px').animate({top: 0}, 200);
			})
		});
	}
	
	/****************************/

	function portfolio_init()
	{
		if(jQuery().isotope)
		{
			var $container=jQuery('#portfolio-wrapper').not('.portfolio-random-items');
			if($container.length)
			{
		    var args={ 
			    itemSelector: '.isotope-item',
			    animationEngine: 'best-available'
			  };
			  
			  if($container.hasClass('lazyload-active')) {
			  	args.onLayout=function() {
						jQuery(window).trigger("scroll");
					};
				}
			  
		    if($container.hasClass('layout-fixed')) {
		    	
		    	jQuery.extend(args, {
		    		layoutMode: 'fitRows',
				    itemPositionDataEnabled: true,
				    beforeLayout: function( $elems ) {
				    	$elems.each(function(){
				    		$(this).data('last-height',$(this).css('height'));
				    	})
				    	$elems.css('height','auto');
				    },
						beforeAnimation: function( $elems, instance ) {
							
							var groups=[];
							var max_heights=[];
							var last_top=-1;
							var group_id=-1;
							$elems.each(function( index ){
								var pos=$(this).data('isotope-item-position');
								pos=pos.y;
									
								if(pos != last_top) {
									group_id++;
									groups[group_id]=[];
									max_heights[group_id]=0;
									last_top=pos;
								}
								groups[group_id].push(index);
								var h=$(this).find('.portfolio-thumb-inner').height();
								if(h > max_heights[group_id])
									max_heights[group_id]=h;
							});
							
							var i,j;
							for (i=0; i<groups.length; i++) {
								for(j=0; j<groups[i].length; j++) {
									var lh=$elems.eq(groups[i][j]).data('last-height');
									if(lh)
										$elems.eq(groups[i][j]).css('height',lh);
								 	$elems.eq(groups[i][j]).animate({height: max_heights[i]+'px'}, {duration: 600, queue: false});
								}
							}
						}
					});
					
		    } else if($container.hasClass('layout-masonry')) {
		    	jQuery.extend(args, {
		    		layoutMode: 'masonry'
					});
		    }
			  
				var $links=jQuery('.isotope-sort-menu').find('a');
	      $links.click(function(){
	      	if(jQuery(this).hasClass('active'))
	      		return false;
	        $links.removeClass('active');
	        jQuery(this).addClass('active');
	
	        var selector = jQuery(this).attr('href').split('#');
	        selector=selector[1];
	
					args.filter='.'+selector;
	        
	        $container.isotope(args);
	        
	        return false;
	      });
	      
	
				$container.isotope(args);
	
				if(document.location.hash) {
					$links.filter('[href$='+document.location.hash+']').click();
				}
				
				jQuery(window).bind('load',function(){
					// when webfonts loaded the container sizes could change
					$container.isotope('reLayout');
				});
	
	    }
		}
	}
	
	/****************************/
	
	function tooltips_init()
	{
		var tt_id=1;
		jQuery('.add-tooltip').each(function(){
			var title=jQuery(this).attr('title');
			if(typeof(title) == 'undefined')
				return;
			jQuery(this).data('tooltip_id',tt_id);
			
			jQuery(this).mouseenter(function(){
				jQuery(this).attr('title','');
				var id=jQuery(this).data('tooltip_id');
				var $tt=jQuery('#tooltip_'+id).stop();
				if(!$tt.length)
				{
					var pos=jQuery(this).offset();
					$tt=jQuery('<div class="tooltip" id="tooltip_'+id+'">'+title+'</div>');
					$tt.appendTo('body');
					$tt.css('left',pos.left + Math.round(jQuery(this).outerWidth()/2));
					$tt.css('top',pos.top - $tt.outerHeight());
				}
				$tt.show();
				$tt.animate({opacity:1, marginTop: '-6px'}, 200);
			});
	
			jQuery(this).mouseleave(function(){
				jQuery(this).attr('title',title);
				var id=jQuery(this).data('tooltip_id');
				jQuery('#tooltip_'+id).stop().animate({opacity:0, marginTop: '-15px'}, 200, function(){
					jQuery(this).remove();
				});
			});
	
			tt_id++;
		});
	}
	
	/**********************************/
	
	function toggle_init()
	{
	
		jQuery('.accordion .toggle-title').addClass('in-accordion').click(function(){
			if(jQuery(this).hasClass('expanded')) {
				jQuery(this).removeClass('expanded');
				jQuery(this).next('.toggle-inner').slideUp(300);
				return false;
			}
	
			var $acc=jQuery(this).parents('.accordion');
			$acc.find('.toggle-title').removeClass('expanded');
			$acc.find('.toggle-inner').slideUp(300);
	
			jQuery(this).parent().find('.toggle-inner').slideDown(300,function(){
				var h=jQuery(this).parent().height();
				var pos=jQuery(this).parent().find('.toggle-title').offset();
				var scroll=jQuery(window).scrollTop();
				/** ace theme block **/
				var $top_area=jQuery('.top-area');
				if($top_area.length) {
					if($top_area.hasClass('area-fixed')) {
						pos.top-=$top_area.height();
					}
				}
				/***/
				var wh=jQuery(window).height();
				if(pos.top < scroll || (pos.top > scroll && pos.top+h > scroll+wh))
					jQuery('html,body').animate({ scrollTop: pos.top+'px' }, 200);
			}).find('iframe[src*="maps.google"]').each(function(){
				jQuery(this).attr('src',jQuery(this).attr('src'));
			});
			jQuery(this).addClass('expanded');
			
		});
		
		jQuery('.toggle-title').not('.in-accordion').click(function(){
			var $inner=jQuery(this).parent().find('.toggle-inner');
			if(!$inner.length)
				return false;
			if($inner.is(':animated'))
				return false;
			
			jQuery(this).toggleClass('expanded');
			$inner.slideToggle(300);
			if(jQuery(this).hasClass('expanded')) {
				$inner.find('iframe[src*="maps.google"]').each(function(){
					jQuery(this).attr('src',jQuery(this).attr('src'));
				});
			}
			
			return false;
		});
	}
	
	/**********************************/
	
	function tabs_init()
	{
		var hash=document.location.hash.replace('#','');
		jQuery('.tabs').each(function(){
			if(hash != '' && jQuery(this).find('.tabs-tabs .tabs-tab.'+hash).length ) {
				jQuery(this).find('.tabs-control a[href$=#'+hash+']').addClass('active');
				jQuery(this).find('.tabs-tabs .tabs-tab').hide().filter('.'+hash).addClass('active').show();
			} else {
				jQuery(this).find('.tabs-control a:first').addClass('active');
				jQuery(this).find('.tabs-tabs .tabs-tab:first').addClass('active').show();
			}
		});
		
		jQuery('.tabs .tabs-control a').click(function(){
			var $tabs=jQuery(this).parents('.tabs');
			if(!$tabs.length)
				return false;
				
			var tabname=jQuery(this).attr('href').split('#');
			tabname=tabname[(tabname.length-1)];
			
			$tabs.find('.tabs-control a').removeClass('active');
			jQuery(this).addClass('active');
			
			var $newtab=$tabs.find('.tabs-tabs .tabs-tab.'+tabname);
			
			$tabs.stop(true);
			var cur_h=$tabs.height();
			$tabs.css('height',cur_h+'px');
			
			$tabs.find('.tabs-tabs .tabs-tab.active').hide().removeClass('active');
			$newtab.addClass('active').fadeIn(300);
			
			$newtab.find('iframe[src*="maps.google"]').each(function(){
				jQuery(this).attr('src',jQuery(this).attr('src'));
			});
	
			var new_h=$newtab.outerHeight() + $tabs.find('.tabs-control').outerHeight();
			new_h+=parseInt($tabs.find('.tabs-tabs').css('padding-top'));
			new_h+=parseInt($tabs.find('.tabs-tabs').css('padding-bottom'));
			if(Math.abs(cur_h - new_h) > 4) {
				$tabs.animate({height: new_h + 'px'}, 300, function(){
					jQuery(this).css('height','auto');
				});
			} else {
				$tabs.css('height','auto');
			}
			
			
			return false;
		});
	
	}
	
	/****************************/
	
	function testimonials_init()
	{
		jQuery('.testimonials-slider').each(function(){
			
			var $items=jQuery(this).find('.items');
			if($items.find('.item').length > 1) {
	
				var args={
					speed: 200,
					next: jQuery(this).find('.testimonials-controls .next'),
					prev: jQuery(this).find('.testimonials-controls .prev'),
					fadePrev: true
				};
				if(jQuery(this).data('timeout') > 0)
					args.timeout = jQuery(this).data('timeout');
				if(jQuery(this).data('pause') == 1)
					args.pause = 1;
	
				$items.omSlider(args);
			
			} else {
				jQuery(this).find('.testimonials-controls').remove();
			}
			
		});
	}
	
	/**********************************/
	
	function contact_form_init() {
		
		if( jQuery().validate && jQuery().ajaxSubmit ) {
			
			if(jQuery("#contact-form #om-contact-form-captcha").length) {
				jQuery.getScript('http://www.google.com/recaptcha/api/js/recaptcha_ajax.js',function(){
					Recaptcha.create("6LeEs9sSAAAAAISi4A12hNjdNMFIslRy5C0wvlHo",
				    "om-contact-form-captcha",
				    {
				      theme: "red"
				    }
				  );
				});
			}
			
		  var options = {
				success: contact_form_success,
				beforeSubmit: contact_form_before,
				data: {site: 1}
			}; 	
			
			var validate_options={
				submitHandler: function(form) {
					jQuery(form).ajaxSubmit(options);
				},
				errorPlacement: function(error, element) {
					if(jQuery(element).attr('type') == 'checkbox')
						error.insertAfter(element);
				},
				errorClass: 'error'
			}
			if(('placeholder' in document.createElement("input"))==false) { 
				validate_options.invalidHandler = function() {
					jQuery(this).find('.placeholder-submitting').each(function(){
						var i = jQuery(this);
						if(i.val() == '' || i.val() == i.attr('placeholder')) {
							if(this.type=='password') {
								i.addClass('password');
								this.type='text';
							}
							i.addClass('placeholder').val(i.attr('placeholder'));
						}
					});
				}
				validate_options.focusInvalid=false;
			};
			
			jQuery("#contact-form").validate(validate_options);
		}
	}
	
	function contact_form_before()
	{
		var $obj=jQuery('#contact-form');
		$obj.fadeTo(300,0.5);
		$obj.before('<div id="contact-form-blocker" style="position:absolute;width:'+$obj.outerWidth()+'px;height:'+$obj.outerHeight()+'px;z-index:9999;"></div>');
	}
	
	function contact_form_success(resp)
	{
		jQuery('#contact-form-blocker').remove();
		if(jQuery.trim(resp) == '0')
		{
			jQuery('#contact-form').fadeOut(300,function(){
				jQuery('#contact-form').remove();
				jQuery('#contact-form-success').fadeIn(200);
			});
		}
		else if(jQuery.trim(resp) == '2')
		{
			var $obj=jQuery('#contact-form');
			$obj.fadeTo(300,1);
			Recaptcha.reload();
			jQuery('#om-contact-form-captcha').addClass('error');
		}
		else
		{
			jQuery('#contact-form').fadeOut(300,function(){
				jQuery('#contact-form').remove();
				jQuery('#contact-form-error').fadeIn(200);
			});		
		}
	}
	
	/************************************/
	
	function logos_init()
	{
		jQuery('.logos img').addClass('to_process');
		jQuery('.logos a').wrap('<div class="item" />').find('img').removeClass('to_process');
		jQuery('.logos img.to_process').removeClass('to_process').wrap('<div class="item" />');
	}
	
	/************************************/
	
	function lazyload_init()
	{
		$("img.lazyload").lazyload({ 
			effect : "fadeIn",
			failure_limit: 1000,
			threshold : 200
		});
	}
	
	/************************************/
	
	function woocommerce_init() {
		jQuery('h1.page-title span.woocommerce-add-line').parent().addClass('add-wide-line');
	}
	
	/************************************/
	
	function table_styling() {
		
		jQuery('table:not([class]) tr.odd').parents('table').addClass('custom-table').addClass('style-1');
	}

});

/***********************************/

function lightbox_init(args_)
{
	var args={
		deeplinking: false,
		overlay_gallery: false
	};
	if(args_)
		jQuery.extend(args, args_);
	
	//prettyPhoto
	if(jQuery().prettyPhoto) {
		jQuery('a[rel^=prettyPhoto]').addClass('pp_worked_up').prettyPhoto(args);
		var $tmp=jQuery('a').filter(function(){ return /\.(jpe?g|png|gif|bmp)$/i.test(jQuery(this).attr('href')); }).not('.pp_worked_up');
		$tmp.each(function(){
			if(typeof(jQuery(this).attr('title')) == 'undefined')
				jQuery(this).attr('title',''); 
		});
		$tmp.prettyPhoto(args); 
	}
}

/***********************************/

function sidebarSliding_init() {

	var $sidebars=jQuery('.column-sidebars');
	var $content=jQuery('.column-content');
	var $col1=jQuery('.column-sidebar-1');
	var $col2=jQuery('.column-sidebar-2');
	var menu_fixed=jQuery('body').hasClass('menu-fixed');
	if(menu_fixed)
		var $top_area=jQuery('.top-area');
	if($col1.length || $col2.length) {

		$sidebars.mouseenter(function(){
			/*
			if($col1.is(':animated'))
				$col1.stop(true).fadeTo(300,1);
			if($col2.is(':animated'))
				$col2.stop(true).fadeTo(300,1);
			*/
			$sidebars.addClass('hovered');
		}).mouseleave(function(){
			$sidebars.removeClass('hovered');
		});			

		var sidebar_timer=false;
		var ie8=jQuery.browser.msie && (jQuery.browser.version == 8);
		
		jQuery(window).scroll(function(){
			
			if(sidebar_timer)
				clearTimeout(sidebar_timer);				

			if(jQuery(window).data('mobile-view')) {
				$col1.add($col2).stop(true).css({marginTop: 0, opacity: 1});
				return;
			}
			
			sidebar_timer=setTimeout(function(){
				//if($sidebars.hasClass('hovered'))
				//	return false;

				$col1.add($col2).stop(true);
				
				var ch=$content.height();
				var ws=jQuery(window).scrollTop();
				var wh=jQuery(window).height();
				var one_column=false;
				if($col1.length)
					var top1=$col1.offset();
				if($col2.length) {
					var top2=$col2.offset();
					if(top2.left == top1.left)
						one_column=true;
				}
				
						
				if($col1.length) {
					var col1h=$col1.height();
					if(one_column) {
						col1h+=$col2.height();
						$col2.css('margin-top','0');
					}
					if(ch > col1h)
					{
						var cur_mar=parseInt($col1.css('margin-top'));
						var max=ch-col1h;
						var new_mar=cur_mar;
						if(menu_fixed) {
							var top_area_h=$top_area.height();
							var top_area_fixed=$top_area.hasClass('area-fixed');
						}
						
						if( (menu_fixed && top1.top - ws - top_area_h > 0) || (!menu_fixed && top1.top - ws > 0) ) {
							if(menu_fixed && top_area_fixed)
								new_mar=ws-(top1.top-cur_mar) + top_area_h;
							else
								new_mar=ws-(top1.top-cur_mar);
								
							if(new_mar > max)
								new_mar = max;
							if(new_mar < 0)
								new_mar = 0;
						} else if((menu_fixed && top1.top + col1h - ws - top_area_h < wh) || (!menu_fixed && top1.top + col1h - ws < wh) ) {
							if(col1h < wh) {
								if(menu_fixed && top_area_fixed)
									new_mar=ws-(top1.top-cur_mar) + top_area_h;
								else
									new_mar=ws-(top1.top-cur_mar);
							}	else {
								new_mar=ws-(top1.top-cur_mar) - (col1h - wh);
							}
							if(new_mar > max)
								new_mar = max;
							if(new_mar < 0)
								new_mar = 0;
						}

						if(new_mar != cur_mar) {
							if(one_column)
								$col1.add($col2).fadeTo(600,0.2).fadeTo(400,1);
							else
								$col1.fadeTo(600,0.2).fadeTo(400,1);
							$col1.animate({marginTop: new_mar+'px'}, {
								duration: 1000,
								easing: 'easeInOutExpo',
								queue: false
							});
						} else {
							$col1.fadeTo(400,1);
						}
					}
				}
				if($col2.length && !one_column) {
					var col2h=$col2.height();
					if(ch > col2h)
					{
						var cur_mar=parseInt($col2.css('margin-top'));
						var max=ch-col2h;
						var new_mar=cur_mar;
						if(menu_fixed) {
							var top_area_h=$top_area.height();
							var top_area_fixed=$top_area.hasClass('area-fixed');
						}

						
						if( (menu_fixed && top2.top - ws - top_area_h > 0) || (!menu_fixed && top2.top - ws > 0) ) {
							if(menu_fixed && top_area_fixed)
								new_mar=ws-(top2.top-cur_mar) + top_area_h;
							else
								new_mar=ws-(top2.top-cur_mar);
								
							if(new_mar > max)
								new_mar = max;
							if(new_mar < 0)
								new_mar = 0;
						} else if((menu_fixed && top2.top + col2h - ws - top_area_h < wh) || (!menu_fixed && top2.top + col2h - ws < wh) ) {
							if(col2h < wh) {
								if(menu_fixed && top_area_fixed)
									new_mar=ws-(top2.top-cur_mar) + top_area_h;
								else
									new_mar=ws-(top2.top-cur_mar);
							} else {
								new_mar=ws-(top2.top-cur_mar) - (col2h - wh);
							}
							if(new_mar > max)
								new_mar = max;
							if(new_mar < 0)
								new_mar = 0;
						}

						if(new_mar != cur_mar) {
							$col2.fadeTo(600,0.2).fadeTo(400,1);
							$col2.animate({marginTop: new_mar+'px'}, {
								duration: 1000,
								easing: 'easeInOutExpo',
								queue: false
							});
						} else {
							$col2.fadeTo(400,1);
						}
					}
				}
				
			}, 1200);
							
		});
	}
}