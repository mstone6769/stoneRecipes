$(document).ready(function (){

	var wwidth = $(window).width();
	if (wwidth > 1200) {
		$(function(){

			if (Modernizr.touch) {

			} else {
				 var BV = new $.BigVideo();
				 BV.init();
				 BV.show('tpi-test-video.mp4',{ambient:true});
				 $('#video-toggle').on('click', function(e) {
		            if (this.checked)   BV.getPlayer().play();
		            else                BV.getPlayer().pause();
		        })
			}
		});
	} else {
		$(function() {
			if (Modernizr.touch) {

			} else {
				 var BV = new $.BigVideo();
				 BV.init();
				 BV.show('tpi-test-video.mp4',{ambient:true});
				 // Video Play/Pause toggle
		        $('#video-toggle').on('click', function(e) {
		            if (this.checked)   BV.getPlayer().play();
		            else                BV.getPlayer().pause();
		        })
			}
		});
	}

	var wheight = $(window).height();
	//var wwidth = $(window).width();
	$('.fill-screen').width(wwidth).height(wheight);

	//resize
	$(window).resize(function() {
		wheight = $(window).height();
		wwidth = $(window).width();
		$('.fill-screen').width(wwidth).height(wheight);


		$(".rounded").each(function(index, element) {
			var img = $( element).children(":last-child");
			var boxwidth = $( element).width();
			var imgsrc = $( img ).attr("src");
			$( element ).css({
				"background-image": "url(" + imgsrc + ")",
				"width": "100%",
				"height": boxwidth
			});
		});
	});
});
