require(["../scripts/config.js"], function() {
	require(["common", "jquery", "swiper", "jquery.cookie","fontscroll"], function(com, $, swiper) {
		
//	$(".shouji").text("请输入正确的手机号啊")
		
//		var reg=/^\d{5}$/;
		//        当文本框内的内容失去焦点时
		//当input 增加事件
		$("#phone").blur(function(){
			const reg=new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
			
//				判断  如果input里的内容不符合正则
				if(reg.test($(this).val())==false){
					//	那么 显示
					$(".shouji").text("请输入正确的手机号")
//					$(".label1").css({"border":"red"})
				}else{				
					$(".shouji").text("")
//					$(".label1").css({"border":"0"})
				}		
		})
		
		$("#password").blur(function(){
			var reg1=new RegExp("[0-9a-zA-z_]{6,20}");
			
//				判断  如果input里的内容不符合正则
				if(reg1.test($(this).val())==false){
					//	那么 显示
					$(".mima").text("密码格式不正确")
				}else{				
					$(".mima").text("")
				}		
		})
		$("#password2").blur(function(){
				if($(this).val()==$("#password").val()){
					//	那么 显示
					$(".mima2").text("")
				}else{				
					$(".mima2").text("两次密码不一致")
				}		
		})
		
		
		
		
		
		class Regsiter{
			constructor(){
				this.btn = $("#reg_btn");
				this.user = $("#phone");
				this.pass = $("#password");
				
				this.addEvent()
			}
			addEvent(){
				var that = this;
				this.btn.on("click",function(){
					that.userV = that.user.val();
					that.passV = that.pass.val();
					that.setCookie();
				})
			}
			setCookie(){
//				读取初始cookie,用来查看是否是第一次注册
				if($.cookie("goodsd")){
					this.goods = JSON.parse($.cookie("goodsd"))
				}else{
					this.goods = []
				}
				
//				如果第一次注册,之前没有,那么length小于1
				if(this.goods.length < 1){
					this.goods.push({
						user:this.userV,
						pass:this.passV,
						onoff:1
					})
				}else{
//					之前已经注册过
					var that = this;
					var onOff = true;
					$.each(this.goods,function(index,value){
						if(value.user == that.userV){		//发现重复
							alert("用户名重复");
							onOff = false;				//改变状态
						}
					})
					if(onOff){
						this.goods.push({
							user:this.userV,
							pass:this.passV
						})
						alert("注册成功")
					}
				}
				$.cookie("goodsd",JSON.stringify(this.goods))
			}
		}
		new Regsiter()

		
		
		
		
		
		
	})
})