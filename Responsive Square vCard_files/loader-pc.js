		/* ---- USER AGENT ---- */	
				function checkBrowserName(name){  
					var agent = navigator.userAgent.toLowerCase();  
					if (agent.indexOf(name.toLowerCase())>-1) {  
						return true;  
					}  
					return false;  
				}  	
					
				window.onload = function browserMargin() {
							
							//alert('test');
							// Change: Internet Explorer
							if(checkBrowserName('MSIE')){ 
								$('.isotop-container').css('padding-bottom', '17px');
								$('#twitter-widget-0 .dt-updated').css('margin-right', '20px');
								
							}   
						
								
							// Change: Internet Explorer 8.0
							if(checkBrowserName('MSIE 8.0')){ 
								$('#header-explorer').css('display', 'block');
								$('#header').css('display', 'none');
								$('#header-explorer').css('height', '10px');
								$('#home').css('right', '0');
								$('#about-middle .rotate-90-4').css('margin', '0');
								$('#about-middle .rotate-90-4').css('padding-left', '20px');
								$('#about-middle .rotate-90-4').css('position', 'absolute');
								$('#about-middle .rotate-90-4').css('left', '0');
								$('#about-middle .rotate-90-4').css('font-size', '20px');
								$('#about-middle .rotate-90-3').css('margin', '0');
								$('#about-middle .rotate-90-3').css('padding-right', '20px');
								$('#about-middle .rotate-90-3').css('font-size', '20px');
								$('#about-middle .rotate-90-3').css('position', 'absolute');
								$('#about-middle .rotate-90-3').css('right', '0');
								$('#about-middle .rotate-90-2').css('margin', '0');
								$('#about-middle .rotate-90-2').css('position', 'absolute');
								$('#about-middle .rotate-90-2').css('right', '0');
								$('#about-middle .rotate-90-2').css('padding-right', '20px');
								$('#about-middle .rotate-90-2').css('font-size', '20px');
								$('.chart-dark-ie8	').css('display', 'block');
								$('.chart-light-ie8	').css('display', 'block');
								$('.chart-dark').css('display', 'none');
								$('.chart-light').css('display', 'none');
								$('.container-ie8 ').css('display', 'block');
								$('h2 ').css('display', 'none');
								$('#blog .rotate-90').css('position', 'absolute');
								$('#blog .rotate-90').css('margin', '0');
								$('#blog .rotate-90').css('padding-left', '20px');
								$('#blog .rotate-90').css('top', '-50px');
								$('#blog .rotate-90').css('left', '0');
								$('#blog .rotate-90').css('font-size', '20px'); 
								
								
								$('#filter-right .rotate-90').css('position', 'absolute');
								$('#filter-right .rotate-90').css('margin', '0');
								$('#filter-right .rotate-90').css('padding-left', '0px');
								$('#filter-right .rotate-90').css('top', '-10px');
								$('#filter-right .rotate-90').css('right', '60px');
								$('#filter-right .rotate-90').css('font-size', '20px');
								
								
								$('#left-blog .inner-text').css('height', '150%');
								$('#blog-nav .rotate-90-2').css('display', 'none');
								$('#blog-nav .rotate-90-3').css('display', 'none');
								$('.footer-blog').css('display', 'none');
								$('#right-button-rotate').css('display', 'none');
								$('#right-button i').css('display', 'block');
								$('#right-button i').css('margin-top', '-15px');
								$('#switcher-device').css('display', 'none');
								$('.deg-130').css('top', '0');
								$('.deg-130').css('margin-top', '0');
								$('.deg-50').css('top', '0');
								$('.deg-50').css('margin-top', '0');
								$('.line-546 .deg-130').css('top', '5px');
								$('.line-546 .deg-50').css('top', '5px');
								
								
						}
							
							// Change: MOZILLA		  
							if(checkBrowserName('firefox')){  
								$('.isotop-container').css('margin-bottom', '20px');
								$('#twitter-widget-0 ol li a .dt-updated').css('padding-right', '200px');
							}	
							
							// Change: CHROME		  
							if(checkBrowserName('chrome')){ 
							  $('#vita-inner .antiscroll-inner').css('height', '100%'); 
							  $('#content-portfolio .antiscroll-inner').css('height', '100%');
							  $('#left-blog .antiscroll-inner').css('height', '100%');
							  $('#right-blog .antiscroll-inner').css('height', '1020px');
							}  
							
							// Change: SAFARI		  
							if(checkBrowserName('safari')){  
							  $('#vita-inner .antiscroll-inner').css('height', '100%'); 
							  $('#content-portfolio .antiscroll-inner').css('height', '100%');
							  $('#left-blog .antiscroll-inner').css('height', '100%');
							  $('#right-blog .antiscroll-inner').css('height', '1020px');
							}   
							
							//if((navigator.userAgent.match(/iPad/i))) 			{ window.location.href = "ipad.html";}
							//if(checkBrowserName('firefox')) 					{ window.location.href = "ipad.html";}
							if(screen.width<1200 && screen.width>700)			{ 
							
								if((navigator.userAgent.match(/iPhone/i))) 			{ window.location.href = "mobil.html";}
								else { window.location.href = "ipad.html";} 
								if((navigator.userAgent.match(/iPod/i))) 			{ window.location.href = "mobil.html";}
								else { window.location.href = "ipad.html";} 
								if((navigator.userAgent.match(/Android/i))) 		{ window.location.href = "mobil.html";}
								else { window.location.href = "ipad.html";} 
								if((navigator.userAgent.match(/BlackBerry/i))) 		{ window.location.href = "mobil.html";}
								else { window.location.href = "ipad.html";} 
								if((navigator.userAgent.match(/PlayBook/i))) 		{ window.location.href = "mobil.html";}
								else { window.location.href = "ipad.html";} 
								if((navigator.userAgent.match(/Kindle/i)))	 		{ window.location.href = "mobil.html";}
								else { window.location.href = "ipad.html";} 
								if((navigator.userAgent.match(/Windows Phone/i))) 	{ window.location.href = "mobil.html";}
								else { window.location.href = "ipad.html";} 
							}
							
							if(screen.width<701) { window.location.href = "mobil.html";}	
															
				}
