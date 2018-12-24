require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper", "fontscroll"], function(com, $, swiper) {
		
		
		
		
		//轮播图
		var mySwiper = new swiper('.swiper-container', {
			//无缝连接
			loop: true,
			//自动切换
			autoplay: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})		
		// 页面滚动时，悬浮窗口出现
		var $nav = $("#xuanfu");
		
		
		var $top = $("#gotop")
		$(window).scroll(function() {
			var scrollTop = $(this).scrollTop();
			if(scrollTop >= 1000 && scrollTop <= 7350) {
				$nav.fadeIn(500);
			} else {
				$nav.fadeOut(500);
			}

			if(scrollTop >= 1000) {
				$top.fadeIn(500);
//				
			} else {
				$top.fadeOut(500);
			}			
		})
		//点击返回顶部
		$top.click(function(){
			$("html").animate({scrollTop: 0},500);
		})
		
		
		$(".navL ul li").hover(function(){	
			$(this).children(".aaaa").show();
		},function(){
			$(this).children(".aaaa").hide();
		})
		

				var $tabs = $(".tab li");
				var $imgs = $(".tab_img li");
				$tabs.mouseenter(function() {
								clearInterval(timer);
					var index = $(this).index();
						now=index;
					$tabs.eq(now).addClass("active").siblings().removeClass();
					$imgs.eq(now).show().siblings().hide();
				})
				$tabs.mouseleave(function(){
					ji();
				})
				
				
		var now = 0;
		var timer;
		ji();
		function ji(){
			
			timer = setInterval(function() {
				if(now==0) {

					$(".tab li").eq(now).addClass("active").siblings().removeClass();
					$(".tab_img li").eq(now).show().siblings().hide();
					now++;
				} else if(now!=0) {
					$(".tab li").eq(now).addClass("active").siblings().removeClass();
					$(".tab_img li").eq(now).show().siblings().hide();
					now++;
					if(now == 5) {
						now = 0;
					}
				}
			}, 2000)
		}


		
		
	})
})