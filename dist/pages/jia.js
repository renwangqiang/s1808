require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper", "fontscroll"], function(com, $, swiper) {
		
		
		var mySwiper = new swiper('.swiper-container',{
			//无缝连接
			 loop : true,
			//鼠标滚动
			 /*mousewheel: true,*/
			//键盘
			 /*keyboard : true,*/
			//自动切换
			autoplay: true,
			/*effect : 'cube',*/
			//左右按钮
			 navigation: {
			      nextEl: '.swiper-button-next',
			      prevEl: '.swiper-button-prev',
    		},
    		//小按钮（分页器）
    		pagination: {
   				el: '.swiper-pagination',
   				//点击按钮切换
   				clickable :true,
			},
			
			
	})
			//当鼠标移进去时，停止播放
				$(".swiper-container").hover(function(){
					mySwiper.autoplay.stop();
				},function(){
					//鼠标移进去时，开始
					mySwiper.autoplay.start();
				})

		
	})
})