 /*global jQuery:false , global fresh:false*/
jQuery(document).ready(function()
{

			"use strict";
			/* Availabe Easing Methods 
				1. linear
				2. swing
				3. easeInQuad
				4. easeOutQuad
				5. easeInOutQuad
				6. easeInCubic
				7. easeOutCubic
				8. easeInOutCubic
				9. easeInQuart
				10. easeOutQuart
				11. easeInOutQuart
				12. easeInQuint
				13. easeOutQuint
				14. easeInOutQuint
				15. easeInExpo
				16. easeOutExpo
				17. easeInOutExpo
				18. easeInSine
				19. easeOutSine
				20. easeInOutSine
				21. easeInCirc
				22. easeOutCirc
				23. easeInOutCirc
				24. easeInElastic
				25. easeOutElastic
				26. easeInOutElastic
				27. easeInBack
				28. easeOutBack
				29. easeInOutBack
				30. easeInBounce
				31. easeOutBounce
				32. easeInOutBounce
			  */
			if(typeof fresh !== 'undefined')
			    {
		        var Speed = fresh.speed;
		        var Animation = fresh.ease;
		        var template_url = fresh.template_url;
		        var admin_ajax = fresh.admin_ajax;
		    }
		    else
		    {
		        var Speed = 400;
		        var Animation = 'swing';
		    }


		     /* -------------------------------------------------------------- 
		     	Fix c7 form
		      -------------------------------------------------------------- */
		     
      			jQuery('.wpcf7-form-control[type=text] , textarea.wpcf7-form-control').each(function()
      				{
      						jQuery(this).attr('placeholder' , jQuery(this).val()).val('');
      				});
		      		

		    /* -------------------------------------------------------------- 
		    	JscrollPane
		     -------------------------------------------------------------- */
		      // jQuery('.tinyscroll').tinyscrollbar({ axis: 'y' });

		   /* -------------------------------------------------------------- 
		   	Meida Element
		    -------------------------------------------------------------- */
		    jQuery('audio , video').mediaelementplayer({

			    loop: false,
			    enableAutosize: false,
			    features: ['playpause','progress', 'current' , 'volume'] ,
			    audioHeight: 40,
			    alwaysShowHours: false
			  
		    });

 		  /* -------------------------------------------------------------- 
		 	Navigation Sub Menu 
		  -------------------------------------------------------------- */
		  	jQuery('nav.menu ul li').hover(
		  			function(){
		  						if(jQuery(window).width() > 767){
		  						jQuery(this).find(' > ul').stop().fadeIn(Speed , Animation);
		  						}	
		  			},
		  			function(){
		  						if(jQuery(window).width() > 767){
		  						jQuery(this).find(' > ul').stop().fadeOut(Speed , Animation);
		  						}
		  			}
		  	);

		  	jQuery('.togglemenu').on('click' , function()
	  		{

	  				jQuery('nav.menu , .top-form').slideToggle(Speed , Animation);
	  		});

	  		jQuery(window).resize(function(){
	  				if(jQuery(window).width() > 767 )
	  				{
	  					jQuery('nav.menu , .top-form').css('display' , 'block').fadeIn(Speed);
	  				}
	  		});

	  		
		  /* -------------------------------------------------------------- 
		  	Carousel
		   -------------------------------------------------------------- */
		   jQuery('.fresh_clints , .testimonials , .portfolio-recent-works .wrapper').fadeOut(0);
		   jQuery(window).load(function()
		   	{
		   			   jQuery('.fresh_clints ').fadeIn(Speed).carousel({
		   					direction: "horizontal"
					   });
					   jQuery('.portfolio-recent-works .wrapper').fadeIn(Speed).carousel({
					   		direction: "horizontal"
					   });
					   jQuery('.testimonials ').fadeIn(Speed).each(function()
					   	{

					   			var t = jQuery(this);

					   			if(t.find('ul li').length > 1)
					   			{
					   					jQuery(t).carousel({
								   			effect: "fade"
								   		});
					   			}
					   	});
		   	});


		  	 /* -------------------------------------------------------------- 
			   Gallery
			  -------------------------------------------------------------- */
			    jQuery('.flexslider').flexslider({
			         animation: "fade",
			         touch : true ,
			         easing : Animation ,
			         animationSpeed : Speed ,
			         keyboard : true,
			         nextText : '' ,
			         prevText : '',
			         slideshow: true,                
			         slideshowSpeed: 5000
			    });


		   /* -------------------------------------------------------------- 
		   	Newsletter form 
		    -------------------------------------------------------------- */
		    jQuery('div.newsletter .form-sub h4').each(function(){

		    			var newslettertext = jQuery(this).text().split(' ');
		    			jQuery.each(newslettertext,function(i,val) {
						    if( i == 4) {
						        newslettertext[i] = '<br /><small>' + val;

						    }
						});
						jQuery(this).html(newslettertext.join(' ') + '</small>');

		    });
		    



		     /* -------------------------------------------------------------- 
		      Social menu
		      -------------------------------------------------------------- */
		     jQuery('.social-menu > a.button').on('click' , function(){
		     	jQuery(this).parent().find(' > ul').fadeToggle(Speed / 2, Animation);
		     	jQuery(this).toggleClass('active');
		     	return false;
		     });




		  	/* -------------------------------------------------------------- 
			  Accordion
			  -------------------------------------------------------------- */
			  /* Quick Accoridon */
			    jQuery('.accordion').each(function() {

			    var acc = jQuery(this);
			    acc.addClass('opened').find('.item:first .head').addClass('head-active');
			    // show first item content
			    if(acc.hasClass('opened')) {
			     jQuery(this).find('.item:first').find('.item-content').slideDown();
			    }
			    
			    // when click
			    jQuery(this).find('.head').click(function() {
			        if(!jQuery(this).hasClass('head-active')){
			      jQuery(acc).find('.head').removeClass('head-active').parent().find('.item-content').slideUp(Speed , Animation);
			      jQuery(this).parent().find('.item-content').slideDown(Speed , Animation);
			      jQuery(this).addClass('head-active');
			        }
			        return false; 
			    });
			  }); // End Accrodion

			 








			 /* -------------------------------------------------------------- 
			 	Services
			  -------------------------------------------------------------- */
			  jQuery('.service-content').each(function(){

			  			// wrapper 
			  			var wrapper = jQuery(this) , 
			  			closeButton = wrapper.find('.container > .close-services-container');
			  			


			  			// when click on service 
			  			jQuery('.single-service').on('click' , function(){

			  						// get content id
			  						var id = jQuery(this).attr('id');
			  						var i = jQuery(this).parent().index();



			  						// add active id
			  						jQuery('.single-service').removeClass('active');
			  						jQuery(this).addClass('active');

			  						// show the content section for this service
			  						
			  						// check if service content exists
			  						if(jQuery('.row[data-service='+id+']').length > 0)
			  						{
			  							jQuery('.service-content').fadeIn();
			  							jQuery('.service-content > .container > .row').removeClass('after0 after1 after2').addClass('after'+i);
			  							jQuery('.service-content').find('.row').fadeOut(0);
			  							jQuery('.service-content').find('.row[data-service='+id+']').fadeIn(Speed);
			  							var height = jQuery('.service-content').find('.row[data-service='+id+']').height() + 140;
			  							
			  						}
			  						else { 
			  							jQuery('.service-content').fadeOut();
			  							// add margin
						  				
			  						}


			  						

			  						

						  			return false;

			  			});




	 				// service content close button
	 				closeButton.on('click' , function()
	 					{
	 								wrapper.slideUp(Speed);
	 								return false;
	 					});

			  			

			  });
 				// end services
 				

 				

 			 /* -------------------------------------------------------------- 
 			 	Fix widget title
 			  -------------------------------------------------------------- */
 			  jQuery('footer .widget .widget-head  .head').each(function(){
 			  			var parentw = jQuery(this).parent().width();
 			  			var w = jQuery(this).width();
 			  			jQuery(this).css('left' , (parentw - w) / 2 + 'px');

 			  });
 			  jQuery(window).resize(function(){
 			  			jQuery('footer .widget .widget-head  .head').each(function(){
 			  			var parentw = jQuery(this).parent().width();
 			  			var w = jQuery(this).width();
 			  			jQuery(this).css('left' , (parentw - w) / 2 + 'px');

 			  			});
 			  });

 			 /* -------------------------------------------------------------- 
 			 	Twitter Section
 			  -------------------------------------------------------------- */
 				var K = function () {
			    var a = navigator.userAgent;
			    return {
			        ie: a.match(/MSIE\s([^;]*)/)
			    }
				}();
	 			function parseTwitterDate(tdate) {
				    var system_date = new Date(Date.parse(tdate));
				    var user_date = new Date();
				    if (K.ie) {
				        system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
				    }
				    var diff = Math.floor((user_date - system_date) / 1000);
				    if (diff <= 1) {return "just now";}
				    if (diff < 20) {return diff + " seconds ago";}
				    if (diff < 40) {return "half a minute ago";}
				    if (diff < 60) {return "less than a minute ago";}
				    if (diff <= 90) {return "one minute ago";}
				    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
				    if (diff <= 5400) {return "about 1 hour ago";}
				    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
				    if (diff <= 129600) {return "about 1 day ago";}
				    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
				    if (diff <= 777600) {return "about 1 week ago";}
				    return "on " + system_date;
				}
				jQuery('.twitter-section ').each(function(){
					jQuery(this).find('p small').text(parseTwitterDate(jQuery(this).find('p small').text()));
				});
 			   



 			  /* -------------------------------------------------------------- 
 			  	isotope  filter
 			   -------------------------------------------------------------- */
			  	jQuery('.portfolio-wrapper .sortlist a').on('click',function(){
			  	var selector = jQuery(this).attr('data-sort');
			  	if(selector !== '*') selector = '.' + selector;
			  	jQuery(this).parent().find('a').removeClass('active');
			  	jQuery(this).addClass('active');
			  	jQuery('.portfolio-posts-wrapper').isotope({ 

			  		filter: selector,
			  		itemSelector : '.portfolio-post',
			      	animationEngine : 'jquery',
			                         		animationOptions: {
			                                duration: Speed ,
			                                easing : Animation
			                             } 
			    });
			  	return false;
				});


			 /* -------------------------------------------------------------- 
			 	Vidoe Widget Wrapper
			  -------------------------------------------------------------- */
			  jQuery('.widget').each(function()
			  	{
			  				if(jQuery(this).find('.textwidget iframe').length > 0)
			  				{
			  							var w = jQuery(this).find('.textwidget iframe').width() , 
			  							h = jQuery(this).find('.textwidget iframe').height();
			  							jQuery(this).find('.textwidget').addClass('video-widget-wrapper').css({
			  								width: w , 
			  								height: h
			  							});
			  				}
			  	});


			 /* -------------------------------------------------------------- 
			 	Portfolio Ajax
			  -------------------------------------------------------------- */
			 

			  // live click 
			  jQuery('.portfolio-wrapper.portfolio-ajax-load .portfolio-post a.icon').on('click' , function()
			  {			
			  			// get the post id / post index / post height
			  			var post 	= 	jQuery(this).parent().parent() ,
			  			wrapper 	= 	post.parent(),
			  			ajaxDiv 	=   wrapper.parent().parent().next('.portfolio-ajax'),
			  			contentDiv 	= 	ajaxDiv.find('.container').find('.row'),
			  			postID 		= 	post.attr('data-id'),
			  			postIndex 	= 	post.index();

			  			
			  			
			  			// ajax call
			  			jQuery.ajax({

							type : 'POST' ,
							data : {
								id: postID ,
								action : 'fresh_ajax'
							},
							datatype : "html" ,
							url : admin_ajax,
							beforeSend : function(){

			              	},
			              	success: function(data){

			              			// hide all content divs
			              			jQuery('.portfolio-ajax').fadeOut(0).removeClass('active');
			              			
			              			// Append Data to content div
			              			contentDiv.html(data);

			              			// show content div
			              			ajaxDiv.removeClass('after0 after1 after2').fadeIn(Speed).addClass('active after'+postIndex);

			              			
			              			// scroll the window
			              			var offsettop = jQuery('.portfolio-ajax.active').delay(Speed).offset().top;
			              			jQuery('html , body').stop().animate({
				                    scrollTop : offsettop - 200
				                  } , {'duration' : Speed});

			              			// flex slider
			              			if(contentDiv.find('.flexslider').length > 0)
			              			{
			              					contentDiv.find('.flexslider').flexslider({
										         animation: "fade",
										         touch : true ,
										         easing : Animation ,
										         animationSpeed : Speed ,
										         keyboard : true,
										         nextText : '' ,
										         prevText : '',
										         slideshow: true,                
										         slideshowSpeed: 5000,
										         controlNav : true
										    });
			              			}



			              			 jQuery('.close-portfolio-wrapper').on('click' , function()
 			  						{
				 			  			jQuery('.portfolio-ajax').fadeOut(Speed).removeClass('active');
				 			  			return false;
 			  						});

			              		
			              			


			              	},
			              	error: function(e)
			              	{
			              		console.log(e);
			              	}

			  			});


			  			return false;
			  });



 			 




 			 /* -------------------------------------------------------------- 
 			 	Fix Video Widget
 			  -------------------------------------------------------------- */
 			  jQuery('.widget iframe').css('max-width' , '100%');



 			 /* -------------------------------------------------------------- 
 			 	Tags
 			  -------------------------------------------------------------- */
 			  jQuery('.tagcloud a').css({fontSize : "12px"});



 			 /* -------------------------------------------------------------- 
 			 	Fix slider first
 			  -------------------------------------------------------------- */
 			  jQuery('.rev_slider ul li').each(function()
 			  	{
 			  			var caption = jQuery(this).find('.tp-caption').first();
 			  			caption.css('margin-top' , '-10px');
 			  			caption.addClass('first');
 			  	});

 			  jQuery('.rev_slider ul li .tp-caption').each(function()
 			  	{
 			  			var caption = jQuery(this);
 			  			if(caption.find('img').length > 0)
 			  			{
 			  					caption.addClass('has-image');
 			  			}
 			  	});


 			 /* -------------------------------------------------------------- 
 			 	Toggle comments form
 			  -------------------------------------------------------------- */
 			  jQuery('.leaveacomment').on('click' , function()
 			  	{
 			  			jQuery(this).parent().parent().find('div.form').slideToggle(Speed);
 			  	});

 			  // check if reply link
 			  if(window.location.hash == '#respond')
 			  {
 			  		jQuery('.comments-form div.form').fadeIn(Speed);
 			  }

});