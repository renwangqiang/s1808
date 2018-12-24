require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper", "fontscroll"], function(com, $, swiper) {
		
		
		//商品小图轮播
			var swiper1 = new swiper('.goodssmallbox', {
			    slidesPerView:4,
			    spaceBetween: 0,
			    freeMode: true,
	    		navigation: {
				  nextEl: '.right_button',
				  prevEl: '.left_button',
				},
	  		});
		// 点击每一个上面图片变换
		var imgChan=document.querySelector(".pic_bg img");
		var swipers=Array.from(document.querySelectorAll(".goodssmallbox_pic .swiper-slide"));
		var bigbox_bg=document.querySelector(".bigbox_bg")
		swipers.forEach(function(item,index){
			item.onclick=()=>{
				imgChan.src=item.children[0].src;
				bigbox_bg.src=item.children[0].src;
			}
		})


		
	})
})