require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper", "jquery.cookie", "fontscroll"], function(com, $, swiper) {

		class Car {
			//传参，将需要的数据传进来
			constructor(options) {
				this.url = options.url;
				this.tbody = options.tbody;

				//获取cookie
				this.getCookie()
				//加载
				this.load();
				if(this.goods.length == 0) {
						
						$(".gou").show();
						$(".gou1").hide();
					} else {
						$(".gou1").show();
						$(".gou").hide();
					}
			}
			getCookie() {
				//将 名位goods的cookie 转换成数组
				this.goods = JSON.parse($.cookie("goods"));
				console.log(this.goods)

			}
			load() {
				var that = this;
				//通过jq的ajax方法来获取数据
				$.ajax({
					url: this.url,
					dataType: "jsonp",
					//成功后执行这个回调函数
					success: function(res) {
						//  将获得的数据赋值
						that.res1 = res.block_266[0].floorAllocations;
						//							console.log(that.res1)
						//						that.res2 = res.block_266[1].floorAllocations;
						// 接着渲染页面
						that.display()

					}
				})
			}

			display() {
				
				// 通过cookie 的值来判断哪个显示，当长度位0时，购物车中无商品哪个页面显示，另一个隐藏
				if(this.goods.length == 0) {
					$(".gou1").hide();
					$(".gou").show();
				} else {
					$(".gou1").show();
				}
				
				
				//  创建一个空的字符串 
				var str1 = "";
				// 循环拿到this.res1,内的每一条数据，
				$.each(this.res1, (key, item) => {
					//					console.log(item.skuid)
					// 再 循环拿到this.goods cookie中的每一个信息
					$.each(this.goods, (idex, value) => {
						
						//						console.log(value.id)
//						通过判断   如果拿到的所有数据中的哪个id 和  存进去cookie的id相同的话，则 用相相对应商品的id的其他数据来渲染页面
						if(item.skuid == value.id) {
							str1 += `
								<tr class="car-product">
					<td class="car-col-select">
						<div class="mz-checkbox">

						</div>
						<a href="#"><img src="${item.img}" /></a>
						<a href="#">
							<p>${item.name}</p>
						</a>
					</td>
					<td class="car-col-price">${item.skuprice}</td>
					<td class="car-col-number">
						<div class="box">
							<div class="box1">
								<div class="box11">
									<div class="jian">
										-
									</div>
									<div class="num" style="width: 37px;">
										<input type="text" name="" id="input" value="${value.num}" style="width: 20px;" />
									</div>
									<div class="jia">
										+
									</div>
								</div>

							</div>
						</div>
					</td>
					<td class="car-xiaoji">${parseInt(item.skuprice.substring(1))*value.num}</td>
					<td class="caozuo" index="${item.skuid}">
						<a href="#" class="shan">删除</a>
					</td>
				</tr>
								`
							//					$.each(this.goods, (index, value) => {
							//						if(item.goodsId == value.id) {
							//							str += `
							//								aaaadaa56da65d4a6dass6
							//								`
						}
						//
					});
				});
				//				console.log(str1)
				// 将渲染的内容，放到页面上
				this.tbody.html(str1);
				// 再执行事件
				this.addEvent()

			}
			addEvent() {
				var that = this;
				
				//	 点击删除的事件，			
				this.tbody.on("click", ".shan", function() {
					// 点击时，删除其这一行tr，则是父元素的父元素
					$(this).parent().parent().remove()
					//	找到当前这个点击的货号（删除的话，肯定是删当前的货号）
					that.id = $(this).parent().attr("index");
					//		删除
					that.setCookie(function(i) {
						that.goods.splice(i, 1)
					})
					if(that.goods.length == 0) {
						
						$(".gou").show();
						$(".gou1").hide();
					} else {
						$(".gou1").show();
//						$(".gou").hide();
					}
					
				var xiaoji = document.querySelectorAll(".car-xiaoji")
				var maxnum = 0;
				for (var i=0;i<xiaoji.length;i++) {
				maxnum = maxnum + parseInt(xiaoji[i].innerHTML)
				}
				$(".car-footer-total").html(maxnum)
					
					
				})

				this.tbody.on("input", "input", function() {
					that.id = $(this).parent().parent().parent().parent().parent().next("td").next("td").attr("index");
					console.log(that.id)
					var ele = $(this)
					console.log($(this).val())
					//						修改
					that.setCookie(function(i) {
						that.goods[i].num = ele.val();
						console.log(1)
					})
					var x= $(this).val();
					var y=parseInt($(this).parent().parent().parent().parent().parent().prev("td").html().substring(1));
					$(this).parent().parent().parent().parent().parent().next("td").html(x*y);
									var xiaoji = document.querySelectorAll(".car-xiaoji")
				var maxnum = 0;
				for (var i=0;i<xiaoji.length;i++) {
				maxnum = maxnum + parseInt(xiaoji[i].innerHTML)
				}
				$(".car-footer-total").html(maxnum)
				})

				this.tbody.on("click", ".jian", function() {
//					console.log(1)
					//					console.log(parseInt($("#input").val()))
					that.id = $(this).parent().parent().parent().parent().next("td").next("td").attr("index");
					var num = parseInt($(this).next("div").find("input").val());
					console.log(num)
					
					if(num<=1){
						num=1;
					}else{
						num-=1;
					}
					$(this).next("div").find("input").val(num);
					var ele=$(this).next("div").find("input");
					console.log(ele.val())
					that.setCookie(function(i) {
						that.goods[i].num = ele.val();
					})
					var x= $(this).next("div").find("input").val()
					var y=parseInt($(this).parent().parent().parent().parent().prev("td").html().substring(1));
					console.log(y)
					console.log(x)
					$(this).parent().parent().parent().parent().next("td").html(x*y);
					
									var xiaoji = document.querySelectorAll(".car-xiaoji")
				var maxnum = 0;
				for (var i=0;i<xiaoji.length;i++) {
				maxnum = maxnum + parseInt(xiaoji[i].innerHTML)
				}
				$(".car-footer-total").html(maxnum)
					
				})
				
				
				this.tbody.on("click", ".jia", function() {
					//					console.log(parseInt($("#input").val()))
					that.id = $(this).parent().parent().parent().parent().next("td").next("td").attr("index");
					var nub = parseInt($(this).prev("div").find("input").val());
					nub += 1;
					$(this).prev("div").find("input").val(nub);
					var ele=$(this).prev("div").find("input");
//					console.log(ele.val())
					that.setCookie(function(i) {
						that.goods[i].num = ele.val();
					})
					var x= $(this).prev("div").find("input").val()
					var y=parseInt($(this).parent().parent().parent().parent().prev("td").html().substring(1));
					console.log(y)
					console.log(x)
					$(this).parent().parent().parent().parent().next("td").html(x*y);
					
									var xiaoji = document.querySelectorAll(".car-xiaoji")
				var maxnum = 0;
				for (var i=0;i<xiaoji.length;i++) {
				maxnum = maxnum + parseInt(xiaoji[i].innerHTML)
				}
				$(".car-footer-total").html(maxnum)
					
				})
				
				
				//总价 = 每个商品的价格  相加
				// 每个商品的价格
				var xiaoji = document.querySelectorAll(".car-xiaoji")
				var maxnum = 0;
				for (var i=0;i<xiaoji.length;i++) {
				maxnum = maxnum + parseInt(xiaoji[i].innerHTML)
				}
				$(".car-footer-total").html(maxnum)
				

			}
			setCookie(callback) {
				for(var i = 0; i < this.goods.length; i++) {
//					console.log(this.id)
					if(this.goods[i].id == this.id) {
						callback(i)
						break;
					}
				}
				$.cookie("goods", JSON.stringify(this.goods))
			}
		}

		new Car({
			url: "https://dms-dataapi.meizu.com/data/jsdata.jsonp?blockIds=233,266,267",
			tbody: $(".car-body")
		})

//		console.log($(".car-body"));

		$(".navL ul li").hover(function() {
			$(this).children(".aaaa").show();
		}, function() {
			$(this).children(".aaaa").hide();
		})

	})
})