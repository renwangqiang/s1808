require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper", "fontscroll"], function(com, $, swiper) {
		

		
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
					$(this).animate({top:50},200,function(){
						$(this).animate({top:55},200)
					})
				},function(){
					$(this).animate({top:55},200)
				})
			}
			
		})
		
	})
})