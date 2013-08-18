jQuery(document).ready(function ($) {
    "use strict";

    $(document).on({
        orientationchange: function (e) {
            if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
                var viewportmeta = document.querySelector('meta[name="viewport"]');
                if (viewportmeta) {
                    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
                    document.body.addEventListener('gesturestart', function() {
                        viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
                    }, false);
                }
            }
            alert('123');
            fwidgets_h();
        }
    });

    function border_width() {
        var w = $(window).width() / 2;
        $('.top-border-left, .top-border-right, .header-border-bot, .footer-top-bord, .rubik-top-border, .rubik-bot-border').css('border-left-width', w);
        $('.bot-border-left, .bot-border-right, .header-border-bot, .footer-top-bord, .rubik-top-border, .rubik-bot-border').css('border-right-width', w);
    }

    function intro_scroll() {
        $('.intro').each(function () {
            var x_top = $(this).offset().top,
                x_height = $(this).height(),
                x_win_h = $(window).height(),
                x_rubik = $(this).find('.rubik'),
                x_rubik_h_o = $(this).find('.rubik').outerHeight() + 30,
                x_scroll = $(window).scrollTop();
            x_rubik.css('bottom', -x_rubik_h_o + 'px');
            if (x_scroll + x_win_h >= x_top + x_height - 200 && x_scroll + x_win_h <= x_top + x_height + x_win_h) {
                var bottom = x_scroll + x_win_h - x_top - x_height - 100;
                x_rubik.css('bottom', bottom * 0.8 + 'px');
            }
        });
    }

    function sticky_post() {
        var x_p = $('.post-stream'),
            x_p_height = $('.post-stream').height(),
            x_g_height = $('.gallery-strip').height(),
            x_win_w = $(window).width(),
            x_scroll = $(window).scrollTop();
        if (x_win_w >= 768 && (x_p_height < x_g_height)) {
            x_p.css('position', 'absolute');
            if (x_scroll >= 0 && x_scroll <= (x_g_height - x_p_height)) {
                var top = x_scroll - 0;
                $(x_p).css('top', top + 'px');
            }
            if (x_scroll >= (x_g_height - x_p_height)) {
                $(x_p).css('top', (x_g_height - x_p_height) + 'px');
            }
        }
        else {
            x_p.css('position', 'static');
        }
    }

    function fwidgets_h() {
        var h = 0;
        jQuery('.fwidgets .widget').each(function () {
            var hh = jQuery(this).height();
            if (hh > h) {
                h = hh;
            }
        });
        jQuery('.fwidgets .widget').each(function () {
            jQuery(this).height(h);
        });

    }
    function parallax_nav() {
        if(jQuery('.trig').hasClass('active')) {
            jQuery('.trig').next().animate({right: -192}, 500);
            jQuery('.trig').animate({right: -2}, 500);
            jQuery('.trig').removeClass('active');
        }
        else {
            jQuery('.trig').next().animate({right: 0}, 500);
            jQuery('.trig').animate({right: 190}, 500);
            jQuery('.trig').addClass('active');
        }
    }
    function parallax_nav_close() {
        if(jQuery('.trig').hasClass('active')) {
            jQuery('.trig').next().animate({right: -192}, 500);
            jQuery('.trig').animate({right: -2}, 500);
            jQuery('.trig').removeClass('active');
        }
    }
    $('.trig').click(function(){
        parallax_nav();
    });
    $(window).scroll(function () {
            intro_scroll();
            sticky_post();
            parallax_nav_close();
        }
    );

    $('#parallax-nav').on('mouseleave', function(){
        parallax_nav_close();
    });
    border_width();
    sticky_post();
    intro_scroll();

    $('ul.top_navigation').supersubs({
        minWidth: 8,
        maxWidth: 27
    }).superfish({
            delay: 500,
            animation: {
                opacity: 'show',
                height: 'show'
            },
            speed: 'fast',
            autoArrows: false,
            dropShadows: false
        });
    $('.top_navigation').tinyNav({
        active: 'current-menu-item',
        header: 'Menu'

    });


    $('.p-nav ul').onePageNav({
        scrollOffset: 100,
        scrollThreshold: 0.1
    });
    $('.top_p-nav ul').onePageNav({
        scrollOffset: 100,
        scrollThreshold: 0.1
    });
    $('.back2top').click(function () {
        $('body').scrollTo({top: '0px', left: '0px'}, 1500);
        return false;
    });
    $('.hapy_boys > div:nth-child(4n+1)').addClass('first');
    $('.iso_inner').hover(function () {
        $(this).find('.port-overlay').fadeIn();
        $(this).find('.pop-up').stop().animate({
            'padding-top' : 40
        },380,'easeOutCubic');
        $(this).find('.port-title').stop().animate({
            'bottom' : 0
        },680,'easeOutCubic');
    }, function () {
        $(this).find('.port-overlay').fadeOut();
        $(this).find('.pop-up').stop().animate({
            'padding-top' : 0
        },380,'easeOutCubic');
        $(this).find('.port-title').stop().animate({
            'bottom' : -100
        },680,'easeOutCubic');
    });
    $('.team_corusel .item').hover(function () {
        $(this).find('.team_hover').fadeOut('normal');
        $(this).find('.team_hover2').fadeIn('normal');
    }, function () {
        $(this).find('.team_hover').fadeIn('normal');
        $(this).find('.team_hover2').fadeOut('normal');
    });
    $('.portfolio_pop').magnificPopup({
        type: 'ajax'
    });
    $('.ts-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title');
            }
        }
    });
    $('a.zocial, a.fsoc').tooltip();

    $(window).load(function () {
        fwidgets_h();
        $('#port-container').isotope('reLayout');

        $('.progress-bar').each(function () {
            var percentage = $(this).find('.progress-bar-content').data('percentage');
            $(this).find('.progress-bar-content').css('width', '0%');
            $(this).find('.progress-bar-content').animate({
                width: percentage + '%'
            }, 'slow');
        });

        $('#progress-bars').waypoint(function () {
            $('.progress-bar').each(function () {
                var percentage = $(this).find('.progress-bar-content').data('percentage');
                $(this).find('.progress-bar-content').css('width', '0%');
                $(this).find('.progress-bar-content').animate({
                    width: percentage + '%'
                }, 'slow');
            });
        }, {
            triggerOnce: true,
            offset: '100%'
        });
    });
    // Tabs
    //When page loads...
    $('.tabs-wrapper').each(function () {
        $(this).find(".tab_content").hide(); //Hide all content
        $(this).find("ul.tabs li:first").addClass("active").show(); //Activate first tab
        $(this).find(".tab_content:first").show(); //Show first tab content
    });
    //On Click Event
    $("ul.tabs li").live('click', function (e) {
        $(this).parents('.tabs-wrapper').find("ul.tabs li").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(this).parents('.tabs-wrapper').find(".tab_content").hide(); //Hide all tab content
        var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(this).parents('.tabs-wrapper').find(activeTab).fadeIn(); //Fade in the active ID content
        e.preventDefault();
    });
    $("ul.tabs li a").live('click', function (e) {
        e.preventDefault();
    });
    $("h3.toggle").live('click', function () {
        if ($(this).parents('.accordian').length >= 1) {
            var accordian = $(this).parents('.accordian');
            if ($(this).hasClass('active')) {
                $(accordian).find('h3.toggle').removeClass('active');
                $(accordian).find(".toggle-content").slideUp();
            } else {
                $(accordian).find('h3.toggle').removeClass('active');
                $(accordian).find(".toggle-content").slideUp();
                $(this).addClass('active');
                $(this).next(".toggle-content").slideToggle();
            }
        } else {
            if ($(this).hasClass('active')) {
                $(this).removeClass("active");
            } else {
                $(this).addClass("active");
            }
        }
        return false;
    });
    $('.toggle-alert').live('click', function (e) {
        e.preventDefault();
        $(this).parent().slideUp();
    });
    $('.content-boxes').each(function () {
        var cols = $(this).find('.col').length;
        $(this).addClass('columns-' + cols);
    });
    var span_class = "";
    $('.pricing_table_sc').each(function () {
        var cols = $(this).find('.column').length;
        if (cols === 2) {
            span_class = "span6";
        }
        else if (cols === 3) {
            span_class = "span4";
        }
        else if (cols === 4) {
            span_class = "span3";
        }
        else if (cols === 5) {
            span_class = "span2";
        }
        else if (cols === 6) {
            span_class = "span2";
        }
        $(this).find('.column').addClass(span_class);
    });
    $('input, textarea').placeholder();
    $('.video-shortcode').fitVids();
    $(window).on('smartresize', function () {
        border_width();
        sticky_post();
    });
    $('.comment-reply-link').addClass('btn');
});

jQuery(function ($) {
    "use strict";
    function reloyout() {
        var $container = $('#port-container');
        $container.isotope({
            masonry: {
                columnWidth: $container.width() / 12
            }
        });
        $container.isotope('reLayout');

    }

    var $container = $('#port-container');
    $container.isotope({
        itemSelector: '.portfolio',
        masonry: {
            columnWidth: $container.width() / 12
        }
    });
    $(window).on('smartresize', function () {
        reloyout();
    });
    window.addEventListener("orientationchange", function () {
        $container.isotope({
            masonry: {
                columnWidth: $container.width() / 12
            }
        });
    }, false);
    var $optionSets = $('#options .option-set'), $optionLinks = $optionSets.find('a');
    $optionLinks.click(function () {
        var $this = $(this);
        if ($this.hasClass('selected')) {
            return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        value = value === 'false' ? false : value;
        options[ key ] = value;
        $container.isotope(options);
        return false;
    });
    $('.load_more').click(function () {
        var offset_post = $('#port-container .j-port-l').length;
        $.ajax({

            url: $(this).attr('href'),
            data: 'offset=' + offset_post,
            method: 'GET',
            cache: false

        }).done(function (more) {
                //console.log(more);
                if ($(more).length === 0) {
                    $('.load_more').hide();
                }
                else {
                    var $newEls = $(more);
                    $container.isotope('insert', $newEls, reloyout);
                    $('.portfolio_pop').magnificPopup({

                        type: 'ajax'

                    });
                }
            });
        return false;
    });
});