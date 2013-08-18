/*********************
//* jQuery Drop Line Menu- By Dynamic Drive: http://www.dynamicdrive.com/
//* Last updated: May 9th, 11'
//* Menu avaiable at DD CSS Library: http://www.dynamicdrive.com/style/
*********************/

var droplinemenu={

animateduration: {over: 300, out: 500}, //duration of slide in/ out animation, in milliseconds

buildmenu:function(menuid){
	jQuery(document).ready(function($){
		var $mainmenu=$(menuid+">ul")
		var $headers=$mainmenu.find("ul").parent()
		$headers.each(function(i){
			var $curobj=$(this)
			var $subul=$(this).find('ul:eq(0)')
			this._dimensions={h:$curobj.find('a:eq(0)').outerHeight()}
			this.istopheader=$curobj.parents("ul").length==1? true : false
			if (!this.istopheader)
				$subul.css({left:0, top:this._dimensions.h})
			var $innerheader=$curobj.children('a').eq(0)
			$innerheader=($innerheader.children().eq(0).is('span'))? $innerheader.children().eq(0) : $innerheader //if header contains inner SPAN, use that
			$innerheader.append(
				'<i>+</i>'
			)
			$innerheader=($innerheader.children().eq(0).is('span'))? $innerheader.children().eq(0) : $innerheader //if header contains inner SPAN, use that
			$innerheader.addClass('with-ul')
			$curobj.hoverIntent(
				function(e){
					var $this = $(this);
					clearTimeout( $this.data('timeout') );
					var $targetul=$(this).children("ul:eq(0)")
					if ($targetul.queue().length<=1) //if 1 or less queued animations
						if (this.istopheader)
							$targetul.css({left: $mainmenu.position().left, top: $mainmenu.position().top+this._dimensions.h})
						if (document.all && !window.XMLHttpRequest) //detect IE6 or less, fix issue with overflow
							$mainmenu.find('ul').css({overflow: (this.istopheader)? 'visible' : 'visible'})
						$targetul.dequeue().stop(true, true).fadeIn(droplinemenu.animateduration.over)
				},

				function(e){
					var $targetul=$(this).children("ul:eq(0)")
					setTimeout(function() {
						$targetul.dequeue().stop(true, true).fadeOut(droplinemenu.animateduration.out)
			         }, 500);
					
				}
			) //end hover
		}) //end $headers.each()
		$mainmenu.find("ul").css({display:'none', visibility:'visible', width:$mainmenu.width()})
	}) //end document.ready
}
}

