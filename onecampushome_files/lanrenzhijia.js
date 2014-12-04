$(document).ready(function(){
	
	funcfoucs();
	
	$(".pict").hover(function(){
		$(this).addClass("jhover");
	},function(){
		$(this).removeClass("jhover");
	});
	/*
	column2title2item 鼠标悬停效果
	*/
	$(".title2item-title").mouseover(function(){
	  var name = $(this).attr("name");
	  $(".title2item-title").removeClass("title2item-border")
	  $(this).addClass("title2item-border");
          $("."+name).siblings(".column-cnt").hide();
	  $("."+name).show();
	});
});

/*----- EASING ------*/
jQuery.extend( jQuery.easing,{
	def: 'easeOutQuint',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	}
});

function funcfoucs(){
	
	var _imgArray = new Array();
	
	$("#news-atlas").find(".news-atlas-main").css({
		"position":"absolute"
	});
	for(var i = 0 ; i < $("#news-atlas").find(".element").length ;i++){
		if($("#news-atlas").find(".element").eq(i).find("img").attr("src")){
			_imgArray.push($("#news-atlas").find(".element").eq(i).find("img").attr("src"));
		}
	}
	if(/*@cc_on!@*/false){
		//IE
		setTimeout(startslide,400);
	}else{
		//Non IE
		if(_imgArray.length){
			loopImageLoader(0);
		}else{
			setTimeout(startslide,400);
		}
	}
	
	function loopImageLoader(i){
	  var image1 = new Image();
	  image1.src = _imgArray[i];
	  image1.onload = function(){
		i++;
		if(_imgArray.length != i){
		  loopImageLoader(i);
		}else{
			startslide();
		}
	  }
	}
	
	
	var _maxpage = 0;
	var _currentpage = 0;
	//开始滑动
	function startslide(){
		$("#news-atlas").find(".element").css("display","inline-block");
		
		$("#news-atlas").find(".next-right").hide();
		$("#news-atlas").find(".next-left").hide();
		
		$("#news-atlas").find(".next-right").fadeIn(600);
		$("#news-atlas").find(".next-left").fadeIn(600);
		

		_maxpage = $("#news-atlas").find(".pict").length;
		
		for(var i = 0 ; i < _maxpage ; i++){
			var _pos = Math.round(235*(i-_currentpage)+$(window).width()/2-960);
			var _opa = 1;
			if(i == _currentpage)_opa = 1;
			if(_pos > $(window).width()){
				_pos -= _maxpage*235
			}else if(_pos < -235){
				_pos += _maxpage*235
			}
			$("#news-atlas").find(".pict").eq(i).css({
				left:_pos,
				opacity:0
			})
			.animate({
				opacity:_opa
			},{
				duration:400 ,
				easing:'linear'
			})
		}
		$("#news-atlas").stop().find(".news-atlas-main").removeClass("news-atlas-main");
		$("#news-atlas").stop().find(".pict").eq(_currentpage).addClass("news-atlas-main").css({"position":"absolute"});
		
		//页面加载时给body赋值
		window.onresize = function(){
			for(var i = 0 ; i < _maxpage ; i++){
				var _pos = Math.round(235*(i-_currentpage)+$(window).width()/2-960);
				var _opa = 1;
				if(i == _currentpage)_opa = 1;
				if(_pos > $(window).width()){
					_pos -= _maxpage*235
				}
				$("#news-atlas").stop().find(".pict").eq(i).css({
					left:_pos,
					opacity:_opa
				})
			}
		}
		$("#news-atlas").find(".next-right").click(nextPage);
		$("#news-atlas").find(".next-left").click(prevPage);
	}

	//下一页函数
	function nextPage(){
		_currentpage++;
		if(_currentpage >  _maxpage-1)_currentpage = 0;
		$("#news-atlas").stop().find(".news-atlas-main").removeClass("news-atlas-main");
		$("#news-atlas").stop().find(".pict").eq(_currentpage).addClass("news-atlas-main").css({"position":"absolute"});;
		_pict = $("#news-atlas").find(".pict");
		for(var i = 0 ; i < _maxpage ; i++){
			var _pos = Math.round(235*(i-_currentpage)+$(window).width()/2-960);
			var _opa = 1;
			if(i == _currentpage)_opa = 1;
			if(_pos > $(window).width()){
				_pos -= _maxpage*235
			}else if(_pos < -200*2){
				_pos += _maxpage*235
			}
			_pict.eq(i)
			.stop()
			.css({
				left:_pos+235
			})
			.animate({
				left:_pos,
				opacity:_opa
			},{
				duration:700 ,
				easing:'easeOutQuint'
			})
		}
	}
	//上一页的函数
	function prevPage(){
		_currentpage--;
		if(_currentpage< 0)_currentpage = _maxpage -1;
		$("#news-atlas").stop().find(".news-atlas-main").removeClass("news-atlas-main");
		$("#news-atlas").stop().find(".pict").eq(_currentpage).addClass("news-atlas-main").css({"position":"absolute"});;
		for(var i = 0 ; i < _maxpage ; i++){
			var _pos = Math.round(235*(i-_currentpage)+$(window).width()/2-960);
			var _opa = 1;
			if(i == _currentpage)_opa = 1;
			if(_pos < -235){
				_pos += _maxpage*235
			}else if(_pos > $(window).width()+235){
				_pos -= _maxpage*235
			}
			$("#news-atlas").find(".pict").eq(i)
			.stop()
			.css({
				left:_pos-235
			})
			.animate({
				left:_pos,
				opacity:_opa
			},{
				duration:700 ,
				easing:'easeOutQuint'
			})
		}
	}
}


//主页title2鼠标效果方法
function mouover(obj){
	var item=obj;
	if(obj=="lenish"){
		document.getElementById("viewdiv").style.border=0;
		document.getElementById("persondiv").style.border=0;
		document.getElementById("viewdiv").style.background="none"
		document.getElementById("persondiv").style.background="none";
		
		document.getElementById("view").style.display="none";
		document.getElementById("person").style.display="none";
		
	}
	if(obj=="view"){
		document.getElementById("lenishdiv").style.border=0;
		document.getElementById("persondiv").style.border=0;
		document.getElementById("lenishdiv").style.background="none"
		document.getElementById("persondiv").style.background="none";
		
		document.getElementById("lenish").style.display="none";
		document.getElementById("person").style.display="none";
	}
	if(obj=="person"){
		document.getElementById("lenishdiv").style.border=0;
		document.getElementById("viewdiv").style.border=0;
		document.getElementById("lenishdiv").style.background="none"
		document.getElementById("viewdiv").style.background="none";

		document.getElementById("view").style.display="none";
		document.getElementById("lenish").style.display="none";
	}
		document.getElementById(item).style.display="";
		var div=obj+"div";
		var itemdiv=document.getElementById(div);
		itemdiv.style.background="#f3f2f3";
		itemdiv.style.borderTopWidth="3px";
		itemdiv.style.borderTopStyle="solid";
		itemdiv.style.borderColor="green";

}
