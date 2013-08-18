
		$(function() {
			var state = true; 
			var zahl1=1; 	// Screen1 yellow
			var zahl2=0; 	// Screen2 red
			var zahl3=0; 	// Screen3 green
			var zahl4=0; 	// Screen4 aqua
			
			var center=-0;
			var richtung=-1500;
			
			var aktuell=0;
			var davor=0;
			
			$( "#nav-home" ).click(function() { 
				aktuell=0;
				$('#home').css('display', 'block'); 
				$('#wrapper').css('background-image', 'url(images/gallery/paralax1.jpg)');
				if (zahl2==1) {	$('#about-me').css('display', 'block'); } else { $('#about-me').css('display', 'none'); }
				if (zahl3==1) {	$('#portfolio').css('display', 'block'); } else { $('#portfolio').css('display', 'none'); }	
				if (zahl4==1) {	$('#blog').css('display', 'block'); } else { $('#blog').css('display', 'none'); }
				zahl1=1;
				zahl2=0;
				zahl3=0;
				zahl4=0;	
				
				if (aktuell>davor) 
					richtung=richtung*(-1);
					

				$( "#home" ).animate({
					right: center
				}, 1000 );
				$( "#about-me" ).animate({ 
					right: richtung
				}, 1000 );
				$( "#portfolio" ).animate({ 
					right: richtung
				}, 1000 );
				$( "#blog" ).animate({ 
					right: richtung
				}, 1000 );
				
				davor=0;	
				
				$( '.nav-inner-home' ).animate({
					opacity: '0'
				}, 1000 ); 
				
				$( '.nav-inner-about, .nav-inner-portfolio, .nav-inner-blog' ).animate({
					opacity: '1'
				}, 1000 ); 
				 
			});
															
			$( "#nav-about" ).click(function() { 
				aktuell=1;
				$('#about-me').css('display', 'block'); 
				$('#wrapper').css('background-image', 'url(images/gallery/paralax2.jpg)');
				if (zahl1==1) {	$('#home').css('display', 'block'); } else { $('#home').css('display', 'none'); }
				if (zahl3==1) {	$('#portfolio').css('display', 'block'); } else { $('#portfolio').css('display', 'none'); }	
				if (zahl4==1) {	$('#blog').css('display', 'block'); } else { $('#blog').css('display', 'none'); }
				zahl1=0;
				zahl2=1;
				zahl3=0;
				zahl4=0;
				if (aktuell<davor) 
					richtung=richtung*(-1);
				
				$( "#home" ).animate({
					right: 1500
				}, 1000 );
				$( "#about-me" ).animate({ 
					right: center
				}, 1000 );
				$( "#portfolio" ).animate({ 
					right: -1500
				}, 1000 );
				$( "#blog" ).animate({ 
					right: -1500
				}, 1000 );		
				davor=1;
				
				$( '.nav-inner-about' ).animate({
					opacity: '0'
				}, 1000 ); 
				
				$( '.nav-inner-home, .nav-inner-portfolio, .nav-inner-blog' ).animate({
					opacity: '1'
				}, 1000 ); 
			});
			
			$( "#nav-portfolio" ).click(function() {  
				$('#portfolio').css('display', 'block'); 
				$('#wrapper').css('background-image', 'url(images/gallery/paralax3.jpg)');
				if (zahl1==1) {	$('#home').css('display', 'block'); } else { $('#home').css('display', 'none'); }
				if (zahl2==1) {	$('#about-me').css('display', 'block'); } else { $('#about-me').css('display', 'none'); }	
				if (zahl4==1) {	$('#blog').css('display', 'block'); } else { $('#blog').css('display', 'none'); }
				zahl1=0;
				zahl2=0;
				zahl3=1;
				zahl4=0;
				if (aktuell<davor) 
					richtung=richtung*(-1);
				
				$( "#home" ).animate({ 
					right: 1500
				}, 1000 );
				$( "#about-me" ).animate({ 
					right: 1500
				}, 1000 );
				$( "#portfolio" ).animate({ 
					right: center
				}, 1000 );	
				$( "#blog" ).animate({ 
					right: -1500
				}, 1000 );	
				
				$( '.nav-inner-portfolio' ).animate({
					opacity: '0'
				}, 1000 ); 
				
				$( '.nav-inner-home, .nav-inner-about, .nav-inner-blog' ).animate({
					opacity: '1'
				}, 1000 ); 
			}); 
			
			$( "#nav-blog" ).click(function() {  
				$('#blog').css('display', 'block'); 
				$('#wrapper').css('background-image', 'url(images/gallery/paralax1.jpg)');
				if (zahl1==1) {	$('#home').css('display', 'block'); } else { $('#home').css('display', 'none'); }
				if (zahl2==1) {	$('#about-me').css('display', 'block'); } else { $('#about-me').css('display', 'none'); }	
				if (zahl3==1) {	$('#portfolio').css('display', 'block'); } else { $('#portfolio').css('display', 'none'); }
				zahl1=0;
				zahl2=0;
				zahl3=0;
				zahl4=1;
				if (aktuell<davor) 
					richtung=richtung*(-1);
				
				$( "#home" ).animate({ 
					right: 1500
				}, 1000 );
				$( "#about-me" ).animate({ 
					right: 1500
				}, 1000 );
				$( "#portfolio" ).animate({ 
					right: 1500
				}, 1000 );
				$( "#blog" ).animate({ 
					right: center
				}, 1000 );	
				//text-shadow:0px 0px 10px #999, -1px 1px #000; 

				//	$('#nav-blog .icon-book').css('text-shadow', '0px 0px 10px #999, -1px 1px #000');
				
				$( '.nav-inner-blog' ).animate({
					opacity: '0'
				}, 1000 ); 
				
				$( '.nav-inner-home, .nav-inner-about, .nav-inner-portfolio' ).animate({
					opacity: '1'
				}, 1000 ); 
				
				//	$('#nav-home .icon-home, #nav-about .icon-user, #nav-portfolio.icon-lightbulb').css('text-shadow', 'none');
			}); 

			

			

			
			$( ".open-button-vita" ).click(function() {  
				$('#mobil-vita').css('display', 'block');
				$('#mobil-vita').css('background-color', 'white');
				$('#mobil-vita-inner').css('width', '400px');
				$('#mobil-vita-inner').css('height', '1200px');
				$('#mobil-vita-inner').css('background-color', 'white');
				$('#mobil-vita-inner .antiscroll-inner').css('width', '440px');
				$('#mobil-vita-inner .antiscroll-inner').css('height', '1000px');
				$('#mobil-vita-inner .antiscroll-inner').css('background-color', 'white');
				
				$('.mobil-skills').css('display', 'none');
				$('.mobil-say').css('display', 'none');
			
				$( '#mobil-vita' ).animate({
					left: '0px'
				}, 1300 ); 
			
				$( '.mobil-skills' ).animate({
					left: '1600px'
				}, 10 ); 
			
				$( '.mobil-say' ).animate({
					left: '1600px'
				}, 10 ); 
				$( '#mobil-about-nav' ).animate({
					top: '-1300px'
				}, 1000 ); 
			}); 
			
			$( "#mobil-vita .top-button" ).click(function() {  
				$( '#mobil-vita' ).animate({
					left: '-1300px'
				}, 500 ); 
				$( '#mobil-about-nav' ).animate({
					top: '0px'
				}, 1300 ); 
			}); 

			
		
			$( ".open-button-skills" ).click(function() { 			
				$( '.mobil-skills' ).animate({
					left: '0px'
				}, 1000 ); 
				$( '#mobil-about-nav' ).animate({
					top: '-1300px'
				}, 700 );  
			}); 
			
			$( ".mobil-skills .top-button" ).click(function() {  
							
				$( '.mobil-skills, .mobil-skills-inner' ).animate({
					height: '100px'
				}, 1000 ); 
				$( '.top-button' ).animate({
					height: '0px'
				}, 1000 ); 
			}); 
			



			
			$( ".open-button-say" ).click(function() { 			
				$( '.mobil-say, .mobil-say-inner' ).animate({
					height: '450px'
				}, 1000 );   
							
				$( '.top-button' ).animate({
					height: '85px'
				}, 1000 ); 
							
				$( '#contact-mobil' ).animate({
					height: '250px'
				}, 1000 ); 
			}); 			

			
			$( ".mobil-say .top-button" ).click(function() {  
							
				$( '.mobil-say, .mobil-say-inner' ).animate({
					height: '100px'
				}, 1000 ); 
							
				$( '.top-button' ).animate({
					height: '0px'
				}, 1000 );
			}); 


			
			
			// Blog posts //
			var zahl_1=0;
				zahl_2=0;
				zahl_3=0;
			$( ".first-link" ).click(function() {  
				//$('#post_2').css('display', 'none');
				
				if(zahl_3==0) { $('#post_2').css('display', 'block'); } else { $('#post_2').css('display', 'none'); }
				zahl_1=1;
				zahl_2=0;
				zahl_3=0;
				$( '#post_1' ).animate({
					left: '600px'
				}, 500 ); 
				$( '#post_2' ).animate({
					left: '0px'
				}, 500 ); 
				$( '#post_3' ).animate({
					left: '0px'
				}, 500 ); 
			}); 


			$( ".second-link" ).click(function() {  
				$('#post_2').css('display', 'block');
				zahl_1=0;
				zahl_2=1;
				zahl_3=0;
				$( '#post_1' ).animate({
					left: '1100px'
				}, 500 ); 
				$( '#post_2' ).animate({
					left: '600px'
				}, 500 ); 
				$( '#post_3' ).animate({
					left: '0px'
				}, 500 ); 
			}); 


			$( ".third-link" ).click(function() {  
				$('#post_3').css('display', 'block');
				$('#post_2').css('display', 'block');
				if(zahl_2==0) { $('#post_2').css('display', 'none'); } else { $('#post_2').css('display', 'block'); }
				zahl_1=0;
				zahl_2=0;
				zahl_3=1;
				$( '#post_1' ).animate({
					left: '1100px'
				}, 500 ); 
				$( '#post_2' ).animate({
					left: '1100px'
				}, 500 ); 
				$( '#post_3' ).animate({
					left: '600px'
				}, 500 ); 
			}); 
			

			
		});	
		
		
		
		/* ====== Stlye Selector ====== */

		$(document).ready(function() {
		
		if((navigator.userAgent.match(/SAFARI/i)) || (navigator.userAgent.match(/CHROME/i))) {
		

			var xAngle = 15,
			yAngle = 15;

			//	jQuery('#right-button-rotate').css('-webkit-transform', "rotateX(" + xAngle + "deg) rotateY(" + yAngle + "deg)");
		
			$("#style-switcher").hover(function() {
				var el = $(this);
				$("#style-switcher").stop(false, false).animate({
					left: "0px"
				}, {
					queue: false,
					duration: 300
				});
				jQuery("#right-button-rotate").css('-webkit-transform', "rotateX(" + '180' + "deg) rotateY(" + '180' + "deg)");
				$('#right-button-rotate').css('margin-top', '-10px');
			}, function() {
				var el = $(this);
				$("#style-switcher").stop(true, true).animate({
					left: "-235px"
				}, {
					queue: false,
					duration: 300
				});
				jQuery("#right-button-rotate").css('-webkit-transform', "rotateX(" + '0' + "deg) rotateY(" + '0' + "deg)");
				$('#right-button-rotate').css('margin-top', '0px');
			});
			

		}
			
		else { 
		
			$("#style-switcher").hover(function() {
				var el = $(this);
				$("#style-switcher").stop(false, false).animate({
					left: "0px"
				}, {
					queue: false,
					duration: 300
				});
				$("#right-button-rotate").stop(false, false).animate({
					rotate: "180",
					top:"-10px"
				}, {
					queue: false,
					duration: 700
				});
			}, function() {
				var el = $(this);
				$("#style-switcher").stop(true, true).animate({
					left: "-235px"
				}, {
					queue: false,
					duration: 300
				});
				$("#right-button-rotate").stop(false, false).animate({
					rotate: "0",
					top:"0px"
				}, {
					queue: false,
					duration: 700
				});
			});
			
			} 
			
		});

		
		

	
	
	
	
	
	
	
	
	
	
	
	