/* METRO */

		$(document).ready(function(){

		
		
			$(".live-tile").liveTile();
			
			$(".tile-backward .live-tile").liveTile({
				animationDirection: 'backward'
				
			});

			$(".tile-forward .live-tile").liveTile({
				animationDirection: 'forward'
				
			});
		
	

		});
	

/* ANITSCROLL */


		  $(function () {
			scroller = $('.box-wrap').antiscroll().data('antiscroll');
		  });

/* STYLE SWITCHER */

		$(document).ready(function() {
			$('#switcher').styleSwitcher();
		});	  
		
		
/* SKILS */
			$(document).ready(function() {		
	
				$( "#nav-about" ).click(function() {  
					//	initPieChart();
					$('.percentage-white').easyPieChart({
						barColor: "#2f3134",
						lineWidth: 7,
						animate: 2000
					});
					$('.percentage-black').easyPieChart({
						barColor: "#cbcbca",
						lineWidth: 6,
						animate: 2000
					});
				});
			});
	

/* Portfolio & Fancybox */	
		$(document).ready(function() {
		
			$(".foto").fancybox({
				helpers:  {
					title : {
						type : 'inside'
					},
					overlay : {
						css : {
							'background' : 'transparent'
						}
					}
				}
			});		
	

			$(".foto").click(function() {
				var el = $(this);
				$("#wrapper").stop(false, false).animate({
					opacity: "0"
				}, {
					queue: false,
					duration: 300
				});
				});		
	

			$(".iframe").click(function() {
				var el = $(this);
				$("#wrapper").stop(false, false).animate({
					opacity: "0"
				}, {
					queue: false,
					duration: 300
				});
				});	
	

			$(".fancybox-overlay").click(function() {
				var el = $(this);
				$("#wrapper").stop(false, false).animate({
					opacity: "1"
				}, {
					queue: false,
					duration: 300
				});
				});
				
				
			$('.fancybox-media')
				.attr('rel', 'media-gallery')
				.fancybox({
					openEffect : 'none',
					closeEffect : 'none',
					prevEffect : 'none',
					nextEffect : 'none',

					arrows : false,
					helpers : {
						media : {},
						buttons : {}
					}
				});				
				
				
				$(".video").click(function() {
					$.fancybox({					openEffect : 'none',
					closeEffect : 'none',
					prevEffect : 'none',
					nextEffect : 'none',

						'arrows' 		: false,
						'autoScale'		: true,		
						'transitionIn'	: 'elastic',
						'transitionOut'	: 'elastic',						
						'title'			: this.title,
						'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
						'type'			: 'swf',
						'swf'			: {
						'wmode'				: 'transparent',
						'allowfullscreen'	: 'true'
						}
					});
					return false;
				}); 				


				$(".iframe").fancybox({
						'autoScale'		: false,
						'transitionIn'	: 'elastic',
						'transitionOut'	: 'elastic',
						'type'			: 'iframe',

				});

				
				$(".web1").fancybox({
					'width'				: '75%',
					'height'			: '75%',
			        'autoScale'     	: false,
			        'transitionIn'		: 'elastic',
					'transitionOut'		: 'elastic',
					'type'				: 'iframe'
				});					
		});

/* ISOTOP */
			$(function(){
			
				var $container = $('.isotop-container');										// Sehr wichtig hier den Container angeben!!!
				$container.isotope({
						itemSelector : '.element'												// Hier die classe eingeben!!!
				});    
			    $container.isotope({
					masonry: {
					columnWidth: 50															// Wichtig hier die min width der Felder eingeben!!!!
					},
					sortBy: 'number',
					getSortData: {
					number: function( $elem ) {
						var number = $elem.hasClass('element') ? 
							$elem.find('.number').text() :
							$elem.attr('data-number');
							return parseInt( number, 10 );
						},
						alphabetical: function( $elem ) {
						var name = $elem.find('.name'),
							itemText = name.length ? name : $elem;
							return itemText.text();
						}
					}
				});
			
				$( ".filter-a a" ).click(function() {
					$('.filter-a img').css('display', 'inline'); 
					$('.filter-b img').css('display', 'none'); 
					$('.filter-c img').css('display', 'none'); 
					$('.filter-d img').css('display', 'none'); 
					$('.filter-e img').css('display', 'none'); 
					$('.filter-f img').css('display', 'none'); 
				  });
				
				$( ".filter-b a" ).click(function() {
					$('.filter-b img').css('display', 'inline'); 
					$('.filter-a img').css('display', 'none'); 
					$('.filter-c img').css('display', 'none'); 
					$('.filter-d img').css('display', 'none'); 
					$('.filter-e img').css('display', 'none'); 
					$('.filter-f img').css('display', 'none'); 
				  });
				
				$( ".filter-c a" ).click(function() {
					$('.filter-c img').css('display', 'inline'); 
					$('.filter-a img').css('display', 'none'); 
					$('.filter-b img').css('display', 'none'); 
					$('.filter-d img').css('display', 'none'); 
					$('.filter-e img').css('display', 'none'); 
					$('.filter-f img').css('display', 'none'); 
				  });
				
				$( ".filter-d a" ).click(function() {
					$('.filter-d img').css('display', 'inline'); 
					$('.filter-a img').css('display', 'none'); 
					$('.filter-b img').css('display', 'none'); 
					$('.filter-c img').css('display', 'none'); 
					$('.filter-e img').css('display', 'none');
					$('.filter-f img').css('display', 'none');  
				  });
				
				$( ".filter-e a" ).click(function() {
					$('.filter-e img').css('display', 'inline'); 
					$('.filter-a img').css('display', 'none'); 
					$('.filter-b img').css('display', 'none'); 
					$('.filter-c img').css('display', 'none'); 
					$('.filter-d img').css('display', 'none'); 
					$('.filter-f img').css('display', 'none'); 
				  });
				
				$( ".filter-f a" ).click(function() {
					$('.filter-f img').css('display', 'inline'); 
					$('.filter-a img').css('display', 'none'); 
					$('.filter-b img').css('display', 'none'); 
					$('.filter-c img').css('display', 'none'); 
					$('.filter-d img').css('display', 'none'); 
					$('.filter-e img').css('display', 'none'); 
				  });
				  
				  /* Mobil */
				  $( ".filter-a a" ).click(function() {			
					$( '#options' ).animate({
						left: '-100%'
					}, 500 );  
					
				  });
				
				$( ".filter-b a" ).click(function() {		
					$( '#options' ).animate({
						left: '-100%'
					}, 500 );
				  });
				
				$( ".filter-c a" ).click(function() {		
					$( '#options' ).animate({
						left: '-100%'
					}, 500 );
				  });
				
				$( ".filter-d a" ).click(function() {		
					$( '#options' ).animate({
						left: '-100%'
					}, 500 ); 
				  });
				
				$( ".filter-e a" ).click(function() {		
					$( '#options' ).animate({
						left: '-100%'
					}, 500 );
				  });
				
				$( ".filter-f a" ).click(function() {		
					$( '#options' ).animate({
						left: '-100%'
					}, 500 );
				  });
				/*end Mobil */
			
			  var $optionSets = $('#options .option-set'),
				  $optionLinks = $optionSets.find('a');

			  $optionLinks.click(function(){
				var $this = $(this);
				// don't proceed if already selected
				if ( $this.hasClass('selected') ) {
				  return false;
				}
				var $optionSet = $this.parents('.option-set');
				$optionSet.find('.selected').removeClass('selected');
				$this.addClass('selected');
		 

				$('#portfolio').css('background-color', 'rgba(54, 25, 25, 1)'); 							// Um den Hintergrund abzudunkeln
		 
				// make option object dynamically, i.e. { filter: '.my-filter-class' }
				var options = {},
					key = $optionSet.attr('data-option-key'),
					value = $this.attr('data-option-value');
				// parse 'false' as false boolean
				value = value === 'false' ? false : value;
				options[ key ] = value;
				if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
				  // changes in layout modes need extra logic
				  changeLayoutMode( $this, options )
				} else {
				  // otherwise, apply new options
				  $container.isotope( options );
				}
				
				return false;
			  });


			
			  // Sites using Isotope markup
			  var $sites = $('#sites'),
				  $sitesTitle = $('<h2 class="loading">Loading sites using Isotope</h2>'),
				  $sitesList = $('<ul class="clearfix"></ul>');
				
			  $sites.append( $sitesTitle ).append( $sitesList );

			  $sitesList.isotope({
				layoutMode: 'cellsByRow',
				cellsByRow: {
				  columnWidth: 290,
				  rowHeight: 400
				}
			  });
			
			  var ajaxError = function(){
				$sitesTitle.removeClass('loading').addClass('error')
				  .text('Could not load sites using Isotope :(');
			  };
			
			  // dynamically load sites using Isotope from Zootool
			  $.getJSON('' +
				  '&apikey=8b604e5d4841c2cd976241dd90d319d7' +
				  '&tag=bestofisotope&callback=?')
				.error( ajaxError )
				.success(function( data ){

				  // proceed only if we have data
				  if ( !data || !data.length ) {
					ajaxError();
					return;
				  }
				  var items = [],
					  item, datum;

				  for ( var i=0, len = data.length; i < len; i++ ) {
					datum = data[i];
					item = '<li><a href="' + datum.url + '">'
					  + '<img src="' + datum.image.replace('/l.', '/m.') + '" />'
					  + '<b>' + datum.title + '</b>'
					  + '</a></li>';
					items.push( item );
				  }
				
				  var $items = $( items.join('') )
					.addClass('example');
					
				  // set random number for each item
				  $items.each(function(){
					$(this).attr('data-number', ~~( Math.random() * 100 + 15 ));
				  });
				
				  $items.imagesLoaded(function(){
					$sitesTitle.removeClass('loading').text('Sites using Isotope');
					$container.append( $items );
					$items.each(function(){
					  var $this = $(this),
						  itemHeight = Math.ceil( $this.height() / 120 ) * 120 - 10;
					  $this.height( itemHeight );
					});
					$container.isotope( 'insert', $items );
				  });
				});
			});	

		
	