/*jshint unused:false, jquery:true, browser:true, strict: false*/
/*global logo:true, Sly:true, prettyPhoto_enb: true, cookies_prefix: true, FB: true, MyAjax:true, login_localize:true, slideshowSettings*/

// Global variables
var sly;
var gallery_speed;


/*Google fonts api */

(function() {

  var wf = document.createElement('script');
  wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

/* End of Google fonts api*/


function setCookie(c_name,value,exdays)
{
  "use strict";
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=window.escape(value) + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
}

//init menu - you need just to give him the menu class
function initMenu(){
  "use strict";
  droplinemenu.buildmenu(".cosmo-menu");
}


/* Mobile menu */

jQuery(document).ready(function($) {
"use strict";
    initMenu();

    var theUlContainer = jQuery('#dl-menu').find('nav').html();
    jQuery('#dl-menu').append(theUlContainer);
    jQuery('#dl-menu').find('nav').remove();
    jQuery( '#dl-menu' ).dlmenu();
});

/* Masonry */

jQuery(document).ready(function() {
    "use strict";
    jQuery( window ).resize( function(){
        if( jQuery(window).width() > 767 ){
            jQuery('.masonry').isotope({
                // options
                itemSelector : '.masonry .masonry_elem'
            });
        }

        resizeIframe();
    });
     
    resizeIframe();

    if (jQuery('.slideshow').hasClass('slideshow-fixed')) {
        jQuery('.slideshow-fixed .slideshow-with-menu').css('margin-top', jQuery(window).height() - jQuery('.slideshow-fixed .slideshow-with-menu').height());
        
        var stickyMenuPosition = jQuery('.slideshow-fixed .slideshow-with-menu').parent().offset().top + jQuery(window).height() - jQuery('.slideshow-fixed .slideshow-with-menu').height();


        jQuery(document).on('scroll',function(){
          jQuery('.slideshow-fixed .slideshow-with-menu').css('margin-top', jQuery(window).height() - jQuery('.slideshow-fixed .slideshow-with-menu').height());
          initHeaderVerticalAlign();
            if( jQuery(document).scrollTop() >= stickyMenuPosition){
                jQuery(".slideshow-fixed .slideshow-with-menu nav.cosmo-menu").addClass("dropping");
                jQuery('section#main').css('margin-top', jQuery(window).height());
                jQuery('.slideshow-fixed .slideshow-with-menu').css('margin-top', '0');
                jQuery(".slideshow-fixed .slideshow-with-menu").addClass("sticky-menu-container");
                jQuery(".header-small-logo").removeClass('hidden');
                jQuery(".header-logo").addClass('hidden');
            }else{
                jQuery(".slideshow-fixed .slideshow-with-menu nav.cosmo-menu").removeClass("dropping");
                jQuery('.slideshow-fixed .slideshow-with-menu').css('margin-top', jQuery(window).height() - jQuery('.slideshow-fixed .slideshow-with-menu').height());
                jQuery('section#main').css('margin-top', '0');
                jQuery(".slideshow-fixed .slideshow-with-menu").removeClass("sticky-menu-container");
                jQuery(".header-small-logo").addClass('hidden');
                jQuery(".header-logo").removeClass('hidden');
            }
        });
        
    }

});

function initHeaderVerticalAlign(){
    "use strict";
    if(jQuery(window).width()>768){
        jQuery('header #header-container .align-middle, footer#colophon .align-middle').each(function(){
            var thisElem = jQuery(this);

            var parentHeight = thisElem.parent().parent().innerHeight();
            var selfHeight = thisElem.innerHeight();
            var margintop = (parentHeight/2) - (selfHeight/2);

            thisElem.css('margin-top',margintop);
        });

        jQuery('header #header-container .align-bottom, footer#colophon .align-bottom').each(function(){
            var thisElem = jQuery(this);

            var parentHeight = thisElem.parent().parent().innerHeight();
            var selfHeight = thisElem.innerHeight();
            var margintop = parentHeight - selfHeight;

            thisElem.css('margin-top',margintop);
        }); 
    }
}

function initSly(){
    var $frame = jQuery('div.frame');
    var $wrap  = $frame.parent();
    var frame = new Sly('div.frame', {
      horizontal: 1,
      itemNav: 'centered',
      smart: 1,
      activateOn: 'click',
      activateMiddle: 1,
      mouseDragging: 0,
      touchDragging: 1,
      releaseSwing: 1,
      startAt: 0,
      scrollBar: $wrap.find('.scrollbar'),
      scrollBy: 1,
      speed: 300,
      elasticBounds: 1,
      easing: 'easeOutExpo',
      dragHandle: 1,
      dynamicHandle: 1,
      clickBar: 1,

      // Buttons
      prev: $wrap.find('.prev'),
      next: $wrap.find('.next')
    });
    return frame;
}

jQuery( window ).load( function(){
  "use strict";

    if( !jQuery(".slideshow-fixed .slideshow-with-menu nav.cosmo-menu").hasClass("dropping") ){
      jQuery('.slideshow-with-menu').height(jQuery('.menu-with-logo').height());
    } else{
      jQuery('.slideshow-with-menu').css('opacity','0').find('nav.cosmo-menu').removeClass('dropping');
      jQuery('.slideshow-with-menu').height(jQuery('.menu-with-logo').height());
      jQuery('.slideshow-with-menu').find('nav.cosmo-menu').addClass('dropping');
      jQuery('.slideshow-with-menu').css('opacity','1');
    }
    //jQuery('.cosmo-main-menu').parent().height(jQuery('.cosmo-main-menu').height()).css('position','relative');
    
    initHeaderVerticalAlign();  

    jQuery("#spinner").animate({ opacity: 0}, 400, function(){
        jQuery(this).css('display','none');
    });

    var enb_gall = '';
    if(typeof(enb_Galleria) !== "undefined" && enb_Galleria.gallery_enb){
        enb_gall = true;
    }else{
        enb_gall = false;
    }
    
    if((jQuery('body').hasClass('single-lookbook') || enb_gall) && !jQuery('.main-container').hasClass('protected-lookbook')){
        sly = initSly();
        sly.init();
        sly.on('load change',function(){
            if(this.rel.activeItem===0){
                jQuery('.controls .btn.prev').css('display','none');
            }else if(this.rel.activeItem===this.items.length-1){
                jQuery('.controls .btn.next').css('display','none');
            }else{
                jQuery('.controls .btn.prev').css('display','block');
                jQuery('.controls .btn.next').css('display','block');
            }
        });
    }

    /* init horizontal scrollbar */
    if(jQuery('.frame').length){

        var scrollArea =  jQuery('#scrollbar');

        var imagesParentWidth = 0;
        var imageProportions = 0;

        jQuery('.frame ul li.relative').each(function(){
          imagesParentWidth += parseInt(jQuery(this).parent().parent().height()*imageProportions,10);
          imageProportions = jQuery(this).find('img').data('width')/jQuery(this).find('img').data('height');

          if(jQuery(this).find('img').data('height') > jQuery(this).parent().parent().height()){
            jQuery(this).height(jQuery(this).parent().parent().height());
            jQuery(this).width(parseInt(jQuery(this).parent().parent().height()*imageProportions,10));

            jQuery(this).find('img').height(jQuery(this).parent().parent().height());
            jQuery(this).find('img').width(jQuery(this).parent().parent().height()*imageProportions);
          } else{
            jQuery(this).height(jQuery(this).parent().parent().height());
            jQuery(this).width(jQuery(this).find('img').data('width'));
            jQuery(this).find('img').height(jQuery(this).find('img').data('height'));
            jQuery(this).find('img').width(jQuery(this).find('img').data('height')*imageProportions);
          }
        });
        jQuery('.single-lookbook .frame ul').width(imagesParentWidth);

        sly.reload();

        jQuery(window).resize(function(){
            sly.reload();
        });

    }

    jQuery(window).resize(function (){
        if(jQuery('.frame').length){
            setTimeout(function(){
              var imagesParentWidth = 0;

              jQuery('.frame ul li.relative').each(function(){
                imagesParentWidth += parseInt(jQuery(this).parent().parent().height()*imageProportions,10)+10;
                imageProportions = jQuery(this).find('img').data('width')/jQuery(this).find('img').data('height');
                
                if(jQuery(this).find('img').data('height') > jQuery(this).parent().parent().height()){
                  jQuery(this).height(jQuery(this).parent().parent().height());
                  jQuery(this).width(parseInt(jQuery(this).parent().parent().height()*imageProportions,10));

                  jQuery(this).find('img').height(jQuery(this).parent().parent().height());
                  jQuery(this).find('img').width(jQuery(this).parent().parent().height()*imageProportions);
                } else{
                  jQuery(this).height(jQuery(this).parent().parent().height());
                  jQuery(this).width(jQuery(this).find('img').data('width'));
                  jQuery(this).find('img').height(jQuery(this).find('img').data('height'));
                  jQuery(this).find('img').width(jQuery(this).find('img').data('height')*imageProportions);
                }
              });
              jQuery('.single-format-lookbook .frame ul').width(imagesParentWidth-10);
              jQuery('.single-lookbook .frame ul').width(imagesParentWidth-10);

              sly.reload();
              jQuery(window).on('resize',function(){
                  sly.reload();
              });
            },200);
            }
        });

});


/* ###### Filters ##### */

/* thumbs filter */
jQuery(function(){
  "use strict";
    var $container = jQuery('.filter-on');

    $container.isotope({
      itemSelector : '.masonry_elem'
    });
    
    var $optionSets = jQuery('.thumbs-splitter'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
        var $this = jQuery(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.thumbs-splitter');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
          // otherwise, apply new options
          $container.isotope( options );
        
        return false;
    });

  
});

jQuery(document).ready(function(){
"use strict";

    /*init showing the mobile menu*/
    
    jQuery('.tabs-controller > li > a').click(function(){
        var this_id = jQuery(this).attr('href'); // Get the id of the div to show
        var tabs_container_divs = '.' + jQuery(this).parent().parent().next().attr('class') + ' >  div'; // All of elements to hide
        jQuery(tabs_container_divs).hide(); // Hide all other divs
        jQuery(this).parent().parent().next().find(this_id).show(); // Show the selected element
        jQuery(this).parent().parent().find('.active').removeClass('active'); // Remove '.active' from elements
        jQuery(this).addClass('active'); // Add class '.active' to the active element
        return false;
    }); 
  
  /*resize FB comments depending on viewport*/

    setTimeout(function(){
        viewPort();
    },3000); 
  


    jQuery( window ).resize( function(){
        viewPort();
        initHeaderVerticalAlign();
    });
  
  /* Accordion */
    jQuery('.cosmo-acc-container').hide();
    jQuery('.cosmo-acc-trigger:first').addClass('active').next().show();
    jQuery('.cosmo-acc-trigger').click(function(){
        if( jQuery(this).next().is(':hidden') ) {
            jQuery('.cosmo-acc-trigger').removeClass('active').next().slideUp();
            jQuery(this).toggleClass('active').next().slideDown();
        }
        return false;
    });


  
  /* Hide Tooltip */
  jQuery(function() {
    jQuery('a.close').click(function() {
      jQuery(jQuery(this).attr('href')).slideUp();
            jQuery.cookie(cookies_prefix + "_tooltip" , 'closed' , {expires: 365, path: '/'});
            jQuery('.header-delimiter').removeClass('hidden');
      return false;
    });
  });
  
  

  /* initialize tabs */
  jQuery('.cosmo-tabs').each(function(){
    // Set default active classes
    jQuery(this).find('.tabs-container').not(':first').css('display','none');
    jQuery(this).find('ul li:first').addClass('tabs-selected');

     jQuery(this).find('ul li a').click(function(){
      if( jQuery(this).parent().hasClass('tabs-selected') ){
        return false;
      }
      var tabId = jQuery(this).attr('href');

      // We clear all active clasees
      jQuery(this).parent().parent().find('.tabs-selected').removeClass('tabs-selected');


      jQuery(this).parent().addClass('tabs-selected');
      jQuery(this).parents('.cosmo-tabs').find('.tabs-container').not(tabId).css('display','none');
      jQuery(this).parents('.cosmo-tabs').find(tabId).css('display','block');
      return false;
    });

  });
  
  


  
  jQuery(document).ready(function() {
    jQuery('aside.widget').append('<div class="clear"></div>');
  });


  /* widget tabber */
    jQuery( 'ul.widget_tabber li a' ).click(function(){
        jQuery(this).parent('li').parent('ul').find('li').removeClass('active');
        jQuery(this).parent('li').parent('ul').parent('div').find( 'div.tab_menu_content.tabs-container').fadeTo( 200 , 0 );
        jQuery(this).parent('li').parent('ul').parent('div').find( 'div.tab_menu_content.tabs-container').hide();
        jQuery( jQuery( this ).attr('href') + '_panel' ).fadeTo( 600 , 1 );
        jQuery( this ).parent('li').addClass('active');
    });
  
    
    /* widget tabber */
    jQuery( 'ul.widget_tabber li a' ).click(function(){
        jQuery(this).parent('li').parent('ul').find('li').removeClass('active');
        jQuery(this).parent('li').parent('ul').parent('div').find( 'div.tab_menu_content.tabs-container').fadeTo( 200 , 0 );
        jQuery(this).parent('li').parent('ul').parent('div').find( 'div.tab_menu_content.tabs-container').hide();
        jQuery( jQuery( this ).attr('href') + '_panel' ).fadeTo( 600 , 1 );
        jQuery( this ).parent('li').addClass('active');
    });
  
    
    /*toogle*/
    /*Case when by default the toggle is closed */
  jQuery('.open_title').click(function(){
    if (jQuery(this).find('a').hasClass('show')) {
      jQuery(this).find('a').removeClass('show');
      jQuery(this).find('a').addClass('toggle_close'); 
      jQuery(this).find('.title_closed').hide();
      jQuery(this).find('.title_open').show();
    } else {
      jQuery(this).find('a').removeClass('toggle_close');
      jQuery(this).find('a').addClass('show');     
      jQuery(this).find('.title_open').hide();
      jQuery(this).find('.title_closed').show();
    }
    jQuery('.cosmo-toggle-container').slideToggle("slow");
  });
  
    /*Case when by default the toggle is oppened */
  jQuery('.close_title').click(function(){
    if (jQuery(this).find('a').hasClass('hide')) {
      jQuery(this).find('a').removeClass('toggle_close');
      jQuery(this).find('a').addClass('show');     
      jQuery(this).find('.title_open').hide();
      jQuery(this).find('.title_closed').show();
    } else {
      jQuery(this).find('a').removeClass('show');
      jQuery(this).find('a').addClass('toggle_close');
      jQuery(this).find('.title_closed').hide();
      jQuery(this).find('.title_open').show();
    }
    jQuery('.cosmo-toggle-container').slideToggle("slow");
  });
  
  /*Accordion*/
  jQuery('.cosmo-acc-container').hide();
  jQuery('.cosmo-acc-trigger:first').addClass('active').next().show();
  jQuery('.cosmo-acc-trigger').click(function(){
  if( jQuery(this).next().is(':hidden') ) {
    jQuery('.cosmo-acc-trigger').removeClass('active').next().slideUp();
    jQuery(this).toggleClass('active').next().slideDown();
  }
  return false;
  }); 
  
});

/* grid / list switch */








/*EOF functions for style switcher*/

function viewPort(){ 
  "use strict";
  /* Determine screen resolution */
  //var $body = jQuery('body');
  var wSizes = [1200, 960, 768, 480, 320, 240];
  
  //$body.removeClass(wSizesClasses.join(' '));
  var size = jQuery(window).width();
  //alert(size);
  for (var i=0; i<wSizes.length; i++) { 
    if (size >= wSizes[i] ) { 
      //$body.addClass(wSizesClasses[i]);

      
      jQuery('.cosmo-comments .fb_iframe_widget iframe,.cosmo-comments .fb_iframe_widget span').css({'width':jQuery('.cosmo-comments.twelve.columns').width() });   
      
      break;
    }
  }
  if(typeof(FB) !== 'undefined' ){
    FB.Event.subscribe('xfbml.render', function(response) {
      FB.Canvas.setAutoGrow();
    });
  }  

}

jQuery(document).ready(function() {
"use strict";
  /*Tweets widget*/
   var delay = 4000; //millisecond delay between cycles
   function cycleThru(variable, j){
           var jmax = jQuery(variable + " div").length;
           jQuery(variable + " div:eq(" + j + ")")
                   .css('display', 'block')
                   .animate({opacity: 1}, 600)
                   .animate({opacity: 1}, delay)
                   .animate({opacity: 0}, 800, function(){
                     if(j+1 === jmax){ 
      j=0;
                     }else{ 
      j++; 
                     }
                           jQuery(this).css('display', 'none').animate({opacity: 0}, 10);
                           cycleThru(variable, j);
                   });
           }
           
   jQuery('.tweets').each(function(index, val) {
     //iterate through array or object
     var parent_tweets = jQuery(val).parent().attr('id');
     var actioner = '#' + parent_tweets + ' .tweets .dynamic .cosmo_twitter .slides_container';
     cycleThru(actioner, 0);
   });
   

    /* list view tabs */

    jQuery('.tabment-tabs li:first-child a').addClass('active'); // Set the class for active state
    jQuery('.tabment-tabs li a').click(function( event ){ // When link is clicked
      if(!jQuery(this).hasClass('active')){
        var tabment_id = jQuery(this).attr('href'); // Set currentTab to value of href attribute
        jQuery(this).parent().parent().find('.active').removeClass('active');
        jQuery(this).parent().parent().parent().parent().next().find('.tabment-tabs-container').find('li.tabs-container').hide();
        jQuery(this).parent().parent().parent().parent().next().find('.tabment-tabs-container').find(tabment_id).fadeIn(500);
        jQuery(window).trigger('resize');
        jQuery(this).addClass('active');
      }
      event.preventDefault();
      return false;
    });


    jQuery('.flickr_badge_image').each(function(index){
      var x = index % 3;
      if(index !==1 && x === 2){
        
        jQuery(this).addClass('last');
      } 
    });
  
    if (cosmo_woocommerce_cripts.is_enabled) {
        //for wooshop
        jQuery(document).on("mouseenter", ".gbtr_little_shopping_bag_wrapper", function () {
            if (!jQuery(this).data('init')) {
                jQuery(this).data('init', true);
                jQuery(this).hoverIntent(function () {
                        jQuery('.gbtr_minicart_wrapper').fadeIn(200);
                    },

                    function () {
                        jQuery('.gbtr_minicart_wrapper').fadeOut(200);
                    });
                jQuery(this).trigger('mouseenter');
            }
        });
    }
 });

if (cosmo_woocommerce_cripts.is_enabled) {
    //if registration is enabled on My account page wi will need the following code

    jQuery('.customer-register').click(function () {
        jQuery('#customer_login > div.myaccount-register').fadeOut(300, function () {
                jQuery('#customer_login').find('.myaccount-login').fadeIn(400);
            });
        jQuery('.account-toggle-login').fadeOut(300, function () {
                jQuery('.account-toggle-register').fadeIn(300);
            });
        return false;
    });


    jQuery(document).ready(function () {
        jQuery(".woocommerce-ordering select, #calc_shipping_country, #shipping_country, #shipping_country, #billing_country, .widget select, #calc_shipping_state").chosen();
    });

    //Checkout tabs
    jQuery('.checkout-control-wrapper ul li > div').click(function () {
            if (jQuery(this).parent().hasClass('active')) {
                return false;
            }
            jQuery(this).parent().parent().find('.active').removeClass('active');
            jQuery(this).parent().addClass('active');
            if (jQuery(this).hasClass('checkout_billing')) {
                jQuery('.checkout').find('.active').removeClass('active');
                jQuery('.checkout').find('.checkout_billing').addClass('active');
                jQuery('.checkout > div > div').slideUp(300);
                jQuery('.checkout > .checkout_billing > div').delay(300).slideDown(300);
            } else if (jQuery(this).hasClass('checkout_shipping')) {
                jQuery('.checkout').find('.active').removeClass('active');
                jQuery('.checkout').find('.checkout_shipping').addClass('active');
                jQuery('.checkout > div > div').slideUp(300);
                jQuery('.checkout > .checkout_shipping > div').delay(300).slideDown(300);
            } else if (jQuery(this).hasClass('checkout_order_review')) {
                jQuery('.checkout').find('.active').removeClass('active');
                jQuery('.checkout').find('.checkout_order_review').addClass('active');
                jQuery('.checkout > div > div').slideUp(300);
                jQuery('.checkout > .checkout_order_review > div').delay(300).slideDown(300);
            }
            return false;
        });
    jQuery('.checkout-continue').click(function () {
        jQuery('.checkout-control-wrapper ul li.active').removeClass('active').next().find('.checkout-button').trigger('click');
        return false;
    });
    jQuery('.checkout .checkout_tabber h3').click(function () {
        jQuery('.checkout-control-wrapper ul li').removeClass('active');

        if (jQuery(this).parent().hasClass('checkout_billing')) {
            jQuery('.checkout').find('.active').removeClass('active');
            jQuery('.checkout').find('.checkout_billing').addClass('active');
            jQuery('.checkout > div > div').slideUp(300);
            jQuery('.checkout > .checkout_billing > div').delay(300).slideDown(300);
            jQuery('.checkout-control-wrapper ul li').find('.checkout_billing').parent().addClass('active');
        } else if (jQuery(this).parent().hasClass('checkout_shipping')) {
            jQuery('.checkout').find('.active').removeClass('active');
            jQuery('.checkout').find('.checkout_shipping').addClass('active');
            jQuery('.checkout > div > div').slideUp(300);
            jQuery('.checkout > .checkout_shipping > div').delay(300).slideDown(300);
            jQuery('.checkout-control-wrapper ul li').find('.checkout_shipping').parent().addClass('active');
        } else if (jQuery(this).parent().hasClass('checkout_order_review')) {
            jQuery('.checkout').find('.active').removeClass('active');
            jQuery('.checkout').find('.checkout_order_review').addClass('active');
            jQuery('.checkout > div > div').slideUp(300);
            jQuery('.checkout > .checkout_order_review > div').delay(300).slideDown(300);
            jQuery('.checkout-control-wrapper ul li').find('.checkout_order_review').parent().addClass('active');
        }
        return false;
    });

    jQuery('.customer-login').click(function () {
        jQuery('#customer_login > div.myaccount-login').fadeOut(300, function () {
                jQuery('#customer_login').find('.myaccount-register').fadeIn(400);
            });
        jQuery('.account-toggle-register').fadeOut(300, function () {
                jQuery('.account-toggle-login').fadeIn(300);
            });
        return false;
    });
}
/*========================================================================*/   

function initTestimonialsCarousel(){
"use strict";
  //jQuery('.testimonials-view ul.testimonials-carousel').height(jQuery('.testimonials-carousel-elem.active').height());

  jQuery('.testimonials-view ul.testimonials-carousel, .widget ul.testimonials-carousel').each(function(){
    if(jQuery(this).children().length<=1){
      jQuery('.testimonials-carousel-nav', jQuery(this).parent()).css('display', 'none');
    }
  });

  

  jQuery('.testimonials-view ul.testimonials-carousel-nav > li, .widget ul.testimonials-carousel-nav > li').click(function(){
    var thisElem = jQuery(this);
    var thisTestimonialContainer = jQuery(this).parent().parent();
    var activeTestimonial = jQuery('.testimonials-carousel-elem.active', thisTestimonialContainer);
    var indexOfActiveElem = jQuery('.testimonials-carousel-elem', thisTestimonialContainer).index(jQuery('.testimonials-carousel-elem.active', thisTestimonialContainer));

    var listOfTestimonials = jQuery('.testimonials-carousel-elem', thisTestimonialContainer).toArray();
    var lengthOfList = listOfTestimonials.length-1;
    var IndexOfNextTestimonial;
    var IndexOfPrevTestimonial;
    var nextTestimonial;
    var prevTestimonial;


    if(indexOfActiveElem+1 > lengthOfList){
      IndexOfNextTestimonial = 0;
    }else{
      IndexOfNextTestimonial = indexOfActiveElem+1;
    }

    if(indexOfActiveElem-1 < 0){
      IndexOfPrevTestimonial = lengthOfList;
    }else{
      IndexOfPrevTestimonial = indexOfActiveElem-1;
    }

    nextTestimonial = listOfTestimonials[IndexOfNextTestimonial];
    prevTestimonial = listOfTestimonials[IndexOfPrevTestimonial];


    if( thisElem.hasClass('testimonials-carousel-nav-left') ){

      activeTestimonial.fadeOut('fast', function(){
        activeTestimonial.removeClass('active');
        jQuery(prevTestimonial).addClass('active');
        jQuery(prevTestimonial).fadeIn();
      });

    }else{

      activeTestimonial.fadeOut('fast', function(){
        activeTestimonial.removeClass('active');
        jQuery(nextTestimonial).addClass('active');
        jQuery(nextTestimonial).fadeIn();
      });

    }
  });

}

function initCarousel(){
  "use strict";
  jQuery('.carousel-wrapper').each(function(){
    var thisElem = jQuery(this);
    var numberOfElems = parseInt(jQuery('.carousel-container', thisElem).children().length, 10);
    var oneElemWidth;
    var numberOfColumns = [['two',6],['three',4],['four',3],['six',2],['twelve',1]];
    var curentNumberOfColumns;
    var moveMargin;
    var leftHiddenElems = 0;
    var rightHiddenElems; 
    var curentMargin = 0;
    var numberOfElemsDisplayed;
    var index = 0;
    var carouselContainerWidth;
    var carouselContainerWidthPercentage;
    var elemWidth;
    var elemWidthPercentage;

    while( index < numberOfColumns.length){
      if ( jQuery('.carousel-container>.columns', thisElem).hasClass(numberOfColumns[index][0]) ){
        curentNumberOfColumns = numberOfColumns[index][1];
        break;
      }
      index ++;
    }

    elemWidth = 100/numberOfElems;
    elemWidth = elemWidth.toFixed(4);
    elemWidthPercentage = elemWidth + '%';

    

    jQuery(window).resize(function() {
      if(jQuery(window).width > 768){
        reinitCarousel();
      }
    });

    function showHideArrows(){
      if(curentNumberOfColumns>=numberOfElems){
        jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','0.6');
        jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','0.6');
      }else if(curentMargin===0){
        jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','0.6');
        jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','1');
      }else if(rightHiddenElems===0){
        jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','1');
        jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','0.6');
      }else{
        jQuery('ul.carousel-nav > li.carousel-nav-left', thisElem).css('opacity','1');
        jQuery('ul.carousel-nav > li.carousel-nav-right', thisElem).css('opacity','1');
      }
    }

    function reinitCarousel(){

      showHideArrows();

      jQuery('.carousel-container', thisElem).css('margin-left',0);
      leftHiddenElems = 0;
      jQuery('ul.carousel-nav > li', thisElem).unbind('click');

      if(jQuery(window).width()<=768){

        carouselContainerWidth = 100 * numberOfElems;
        carouselContainerWidthPercentage = carouselContainerWidth + '%';
        rightHiddenElems = numberOfElems - 1;
        moveMargin = 100;

        curentMargin = 0;

        jQuery('ul.carousel-nav > li', thisElem).unbind('click');

        jQuery('ul.carousel-nav > li', thisElem).click(function(){



          if( jQuery(this).hasClass('carousel-nav-left') ){

            if (leftHiddenElems!==0){

              curentMargin = curentMargin + moveMargin;
              jQuery('.carousel-container', thisElem).css('margin-left',curentMargin+'%');
              rightHiddenElems++;
              leftHiddenElems--;
            }

            showHideArrows();

          }else{

            if (rightHiddenElems!==0){
              curentMargin = curentMargin - moveMargin;
              jQuery('.carousel-container', thisElem).css('margin-left', curentMargin+'%');
              rightHiddenElems--;
              leftHiddenElems++;
            }

            showHideArrows();

          }

        });

      }else{

        while( index < numberOfColumns.length){
          if ( jQuery('.carousel-container>.columns', thisElem).hasClass(numberOfColumns[index][0]) ){
            numberOfElemsDisplayed = numberOfColumns[index][1];
            moveMargin = 100/numberOfElemsDisplayed;
            rightHiddenElems = numberOfElems - numberOfElemsDisplayed;
            oneElemWidth = 100 / numberOfColumns[index][1];
            break;
          }
          index ++;
        }

        carouselContainerWidth = oneElemWidth * numberOfElems;
        carouselContainerWidthPercentage  = carouselContainerWidth + '%';

        curentMargin = 0;

        jQuery('ul.carousel-nav > li', thisElem).click(function(){

          if( jQuery(this).hasClass('carousel-nav-left') ){

            if (leftHiddenElems!==0){
              curentMargin = curentMargin + moveMargin;
              jQuery('.carousel-container', thisElem).css('margin-left',curentMargin+'%');
              rightHiddenElems++;
              leftHiddenElems--;
            }

            showHideArrows();

          }else{

            if (rightHiddenElems!==0){
              curentMargin = curentMargin - moveMargin;
              jQuery('.carousel-container', thisElem).css('margin-left', curentMargin+'%');
              rightHiddenElems--;
              leftHiddenElems++;
            }

            showHideArrows();

          }

        });

      }
      
      //set container width
      jQuery('.carousel-container', thisElem).width(carouselContainerWidthPercentage).css({'max-height':'999px', 'opacity':'1'});

      //set eachelem width
      jQuery('.carousel-container>.columns', thisElem).each(function(){
        jQuery(this).attr('style','width: '+elemWidthPercentage+' !important; float:left;');
      });
      
    }
    reinitCarousel();
  });
}


function resizeIframe(){
    "use strict";
    
    jQuery('iframe ').each(function(){
        var original_iframe_width = jQuery(this).attr('width');
        var original_iframe_height = jQuery(this).attr('height');

        var ilightbox_container_width = jQuery('.ilightbox-container').width();

        var wh_proportion = original_iframe_width/original_iframe_height;

        if( ilightbox_container_width > jQuery(window).width()){
            jQuery(this).attr('width', (jQuery(window).width() - 20) );
            jQuery(this).attr('height', ((jQuery(window).width() - 20)*original_iframe_height)/original_iframe_width );
            jQuery(this).attr('.ilightbox-container', (jQuery(window).width() - 20) );
        }
        
    });

  
}


jQuery(window).load(function() {
  "use strict";
    initTestimonialsCarousel();
    initCarousel();
    jQuery('.filter-on').isotope();
    jQuery(window).trigger('resize');
    jQuery('body.with-slider .load-spinner-container').animate({height: '0',opacity: 0},800);
    if( jQuery( '.header-slideshow' ).length > 0 ){
      jQuery( '.header-slideshow ul.slides' ).animate({opacity: 1}, 500);
    }

    //single product gallery
    // The slider being synced must be initialized first
    jQuery('#carousel').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 83,
            itemMargin: 0,
            asNavFor: '#slider'
        });

    jQuery('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            smoothHeight: true,
            sync: "#carousel"
        });

});

//view switcher init
jQuery(document).ready(function () {
    jQuery('.view-switcher').click(function(){
        //alert(1230);
        jQuery.cookie("fashion-view-switcher" , jQuery(this).data('reder_mode') , {expires: 365, path: '/'});

        location.reload(); //reload the page
    });

    jQuery('.woocommerce-pagination ul.page-numbers a.prev').parent('li').addClass('prev_post');
    jQuery('.woocommerce-pagination ul.page-numbers a.next').parent('li').addClass('next_post');
});

/*==========================================BOF Pretty Photo Settings===============================*/

if (prettyPhoto_enb.enb_lightbox) { 
  jQuery(document).ready(function(){
        "use strict";
            
            jQuery('.post-content a').has('img').not("a[rel^='attachment']").attr('data-rel', 'prettyPhoto-1'); // init images inserted in the post content


          /* show images inserted in gallery */
            jQuery("a[data-rel^='prettyPhoto']").iLightBox(); 

            jQuery("a[id^='ilightbox-ajax']").each(function(){ // init ajax for views
                jQuery(this).iLightBox({
                    attr: 'data-href',
                    overlay: {
                        opacity: 0.6
                    },
                    skin: 'mac',
                    minScale: 1
                });
            });
            
            

            // to change the skin use something like this:
            //jQuery("a[data-rel^='prettyPhoto']").iLightBox({ skin: 'parade' });

          
            jQuery("a[data-rel^='keyboardtools']").iLightBox();

  });
}
/*==========================================EOF Pretty Photo Settings===============================*/




/* Sharing effect */
jQuery('.share-opened').click(function(){
    "use strict";
    jQuery(this).next().slideToggle(300);
});


jQuery.fn.isOnScreen = function(){
    "use strict";

    var win = jQuery(window);
    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    
};
jQuery(window).on('scroll', function() {
    "use strict";
  if( jQuery('.row-with-paralax').length > 0 ){
    if( jQuery('.row-with-paralax').isOnScreen() ){
      var windowTop = jQuery(document).scrollTop() - jQuery('.row-with-paralax').offset().top;
      var newCoord = windowTop * 0.6;
      jQuery('.row-with-paralax').css({
          "background-position": '0 ' + newCoord + "px"
      });
    }
  }
});


