require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper","jquery.cookie", "fontscroll"], function(com, $, swiper) {

		class Shop {
			constructor(options) {
				this.cont = options.cont;
				this.box  =options.box;
				this.url = options.url;

				this.load()
			}
			load() {
				var that = this;
				$.ajax({
					url: this.url,
					dataType: "jsonp",
					success: function(res) {
//						console.log(res)
						that.res1=res.block_266[0].floorAllocations;
//						that.res2=res.block_266[1].floorAllocations;
						that.display()
					}
				})
			}
			display() {
				var str1=""
				$.each(this.res1, function(index, value) {
//											console.log(value.skuid)
					str1 += `<li index="${value.skuid}">
								<div class="figure" >
									<img src="${value.img}"/>
									<div class="xinxi">
										<h2>${value.name}</h2>									
									</div>
								</div>
								<div class="price">
									<span>									
										<label>${value.skuprice}</label>
									</span>
								</div>
								<div class="btn">
									<a class="info">查看详情</a>
									<a class="sell">立即购买</a>
								</div>
							</li>`
				});
				this.cont.html(str1)
//				var str2=""
//				$.each(this.res2, function(index, value) {
////											console.log(value.skuid)
//					str2 += `<li index="${value.skuid}">
//								<div class="figure" >
//									<img src="${value.img}"/>
//									<div class="xinxi">
//										<h2>${value.name}</h2>									
//									</div>
//								</div>
//								<div class="price">
//									<span>									
//										<label>${value.skuprice}</label>
//									</span>
//								</div>
//								<div class="btn">
//									<a href="#" class="info">查看详情</a>
//									<a href="#" class="sell">立即购买</a>
//								</div>
//							</li>`
//				});
//				this.box.html(str2)

				this.addEvent()
			}
			addEvent() {
				
				var that = this;
				this.cont.on("click", ".sell", function() {
//					console.log($(this).parent().parent())
					that.id = $(this).parent().parent().attr("index");
					that.setCookie();
				})
				
				
				this.cont.on("mouseover","li",function(){
					$(this).find(".price").hide()
					$(this).find(".btn").show()
				})
				this.cont.on("mouseout","li",function(){
					$(this).find(".price").show()
					$(this).find(".btn").hide()
				})
				this.cont.on("mouseover",".figure",function(){
					$(this).stop().animate({
						top: 50
					}, 200)
				})
				this.cont.on("mouseout",".figure",function(){
					$(this).stop().animate({
						top: 55
					}, 200)
				})
				
				
			}
			setCookie() {
				//					货号
				//					数量
				//					{}
				//					一条cookie,存所有商品,一个是商品是一个对象
				//					[{货号1,数量},{货号2,数量},{货号3,数量},{候好4,数量}]
				//					货号6

				//					先读取cookie,检查是否是第一次存取,如果是第一次,那么顺手设置个数组,方便新增
				this.goods = JSON.parse($.cookie("goods")) || [];

				if(this.goods.length < 1) {
					//						第一次加入：特点,现在这个cookie是空
					this.goods.push({
						id: this.id,
						num: 1
					})
					//+++刚开始没有，然后将点的东西存cookie
//					console.log(this.goods);
				} else {
					var that = this;
					//						之后加入
					//因为数组中有多个数据，重复数据可能不是第一个，所以不能使用if-else，准备使用状态保存是否存在老数据
					var onOff = true;
					$.each(this.goods, function(index, value) {
						console.log(value)
						//  如果cookie中的某一个值的id 与当前点击的ID项等
						if(value.id == that.id) { //发现重复
							//								之后加老的
							that.goods[index].num++; //数量增加
							onOff = false //改变状态
						}
					})
					if(onOff) { //true		//状态未改变，说明未发现重复，那就是新的 
						//							之后加新的
						this.goods.push({
							id: this.id,
							num: 1
						})
					}
				}
				//					以上if-else只操作了要存在cookie中的数组,操作完成之后,再存到cookie中
				$.cookie("goods", JSON.stringify(this.goods))

				//					测试
//				console.log(JSON.parse($.cookie("goods")))
//				console.log($.cookie("goods"))
			}
		}
		new Shop({
			url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267",
			cont: $("#box1"),
			box:$("#box2")
		})

	


		$(".navL ul li").hover(function() {
			$(this).children(".aaaa").show();
		}, function() {
			$(this).children(".aaaa").hide();
		})

	})
})