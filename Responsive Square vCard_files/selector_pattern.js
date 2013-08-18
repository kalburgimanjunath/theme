			
			
			var myColors2 = 'url(images/pattern/pattern1.png), url(images/pattern/pattern2.png), url(images/pattern/pattern3.png), url(images/pattern/pattern4.png), url(images/pattern/pattern5.png), url(images/pattern/pattern6.png), url(images/pattern/pattern7.png), url(images/pattern/pattern8.png), url(images/pattern/pattern9.png), url(images/pattern/pattern10.png), url(images/pattern/pattern11.png), url(images/pattern/pattern12.png), url(images/pattern/pattern13.png), url(images/pattern/pattern14.png), url(images/pattern/pattern15.png), url(images/pattern/pattern16.png), url(images/pattern/pattern17.png), url(images/pattern/pattern18.png), url(images/pattern/pattern19.png), url(images/pattern/pattern20.png)'.split(', '),
				theColors2 = [], 
				colorBox2 = $('#colorBox2'); 
				
			// Create a new div for each color
			for ( var i = 0, len = myColors2.length; i < len; i++ ) {
				var div = $('<div />').css('background-image', myColors2[i])[0];
				theColors2.push(div);  
			}

			colorBox2.append(theColors2); 

			$('#colors2').hover( function() {
				colorBox2.fadeIn(200).children('div')
					.click(function() { 
						$('body').css('background', $(this).css('backgroundImage'))
					});
			} ); 