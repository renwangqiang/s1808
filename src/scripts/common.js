//变成模块化
define([],function(){
	return{
		getPagePositionLeft:function(ele){
			if(ele == null) return 0;
			return ele.offsetLeft + getPagePositionLeft(ele.offsetParent);
		},	
		getPagePositionTop:function(ele){
			if(ele == null) return 0;
			return ele.offsetTop + getPagePositionTop(ele.offsetParent);
		},		
		randomColor:function (){
			return `rgb( ${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255} )`;
		},		
		randomInt:function (min, max) {
			return Math.round( Math.random()*(max-min) ) + min;
		}
	}
	
})


////鼠标在页面上的绝对位置
////获得页面上的绝对坐标
//getPagePositionleft(ele){
//	// 相当于实在取不到父元素的时候，返回0
//	if(ele==null) return 0;
//	// 当前元素的相对于页面左边的位置+他的父元素在页面上的左边的位置（递归的方法）
//	return ele.offsetLeft+getPagePositionLeft(ele.offsetParent);
//	
//}
//getPagePositionTop(ele){
//	// 相当于实在取不到父元素的时候，返回0
//	if(ele==null) return 0;
//	// 当前元素的相对于页面左边的位置+他的父元素在页面上的左边的位置（递归的方法）
//	return ele.offsetTop+getPagePositionTop(ele.offsetParent);
//	
//}






