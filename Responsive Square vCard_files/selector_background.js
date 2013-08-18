
			
			var myColors = '#e6e7e1, #969696, #262626, #6a6a6a, #9d9f8a, #ecebe6, #8696a5, #94b0c5, #3a505e, #686e6c  '.split(', '),
				theColors = [], 
				colorBox = $('#colorBox'); 
				
			// Create a new div for each color
			for ( var i = 0, len = myColors.length; i < len; i++ ) {
				var div = $('<div />').css('background', myColors[i])[0];
				theColors.push(div);  
			}

			colorBox.append(theColors); 

			$('#colors').hover( function() {
				colorBox.fadeIn(200).children('div')
					.click(function() { 
						$('body').css('background-image', 'none'),
						$('body').css('backgroundColor', $(this).css('backgroundColor'))
					});
			} ); 

