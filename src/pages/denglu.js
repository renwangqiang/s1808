require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper","jquery.cookie", "fontscroll"], function(com, $, swiper) {
		
		
		$("#btn").click(function(){
		
	
			if($("#user").val().length == 0){
				$("#responsebar").text("用户名不能为空，请填写用户名！")
				
			}else if($("#pass").val().length == 0){
				$("#responsebar").text("密码不能为空");
			}else{
				$("#responsebar").text(" ");
			}
	})
	
	
		

//		$(".navL ul li").hover(function(){
//			$(this).children(".aaaa").show();
//		},function(){
//			$(this).children(".aaaa").hide();
//		})
		
		
		
		
		class login{
			constructor(){
				this.btn = $("#btn");
				this.user = $("#user");
				this.pass = $("#pass");
				
				this.getCookie();
				this.addEvent()
			}
			getCookie() {
				this.goods = JSON.parse($.cookie("goodsd"));
//				console.log(this.goods)

			}
			addEvent(){
				var that = this;
				//  点击登录按钮时，
				this.btn.on("click",function(){
					// 循环 cookie 内的值，拿到goodsd这个名字  内的值和索引
					console.log(1)
					console.log(that.user.val())
					console.log(that.pass.val())
					if(that.goods==null){
						alert("用户名未注册")
					}
					$.each(that.goods, function(index,value) {
						
						//  打印
						console.log(value.user)
						console.log(that.user.val())
						if(value.user!=that.user.val()){
							alert("用户名错误")
						}else if(value.user==that.user.val() && value.pass!=that.pass.val()){
							alert("密码错误")
						}else if(value.user==that.user.val() && value.pass==that.pass.val()){
							 window.location.href = "https://localhost:8000/pages/index.html";
						}
					});
				})
			}
		

			}
		
		new login()
		
	})
})