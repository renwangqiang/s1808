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


		$.ajax({
			url:`https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267`,
			// url:`https://localhost:1000/test2`,
			// type:"POST",
			// data:"platform=pc",
			dataType:"jsonp",
			// dataType:"text",
			success:function(response){

				console.log(response);
				var str="";
				var str1="";
				var $box1=$("#box1");
				var $box2=$("#box2");
								
				for(let i=0;i<4;i++){											
				str+=`
				<li><div class="figure">
								<img src="${response.block_266[0].floorAllocations[i].img}"/>
								<div class="xinxi">
									<h2>${response.block_266[0].floorAllocations[i].name}</h2>
									
								</div>
							</div>
							<div class="price">
								<span>
									
									<label>${response.block_266[0].floorAllocations[i].skuprice}</label>
								</span>
							</div>
							<div class="btn">
							<a href="#" class="info">查看详情</a>
							<a href="#" class="sell">立即购买</a>
						</div></li>
				`
				}
				$box1.append(str);
				
				for(let i=0;i<4;i++){											
				str1+=`
				<li><div class="figure">
								<img src="${response.block_266[1].floorAllocations[i].img}"/>
								<div class="xinxi">
									<h2>${response.block_266[1].floorAllocations[i].name}</h2>
									
								</div>
							</div>
							<div class="price">
								<span>
									
									<label>${response.block_266[1].floorAllocations[i].skuprice}</label>
								</span>
							</div>
							<div class="btn">
							<a href="#" class="info">查看详情</a>
							<a href="#" class="sell">立即购买</a>
						</div></li>
				`
				}
				$box2.append(str1);
				$("ul li").hover(function(e){
//					console.log($(this));
//				$(this).css("box-shadow","-1px -1px 10px #000");
//					$(this).animate({top:1},200)
					
					$(this).find(".price").hide()
					$(this).find(".btn").show()

				},function(){
//					$(this).css("box-shadow","none");
//				$(this).animate({top:0},200)
					$(this).find(".price").show()
					$(this).find(".btn").hide()

				})
				$("ul li .figure").hover(function(){
					$(this).animate({top:50},200)					
				},function(){
					$(this).animate({top:55},200)
				})
			}
			
		})
		
	})
})