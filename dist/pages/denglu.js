require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper", "fontscroll"], function(com, $, swiper) {
		
		
		
	
		

		$(".navL ul li").hover(function(){
			$(this).children(".aaaa").show();
		},function(){
			$(this).children(".aaaa").hide();
		})
		
	})
})