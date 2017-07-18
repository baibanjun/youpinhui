$(function(){
	//启用cookie插件
	$.cookie.json=true;
	//加载header和footer
	$.get("header.html",function(data){
		$(data).appendTo("#header");
	})
	$.get("footer.html",function(data){
		$(data).appendTo("#footer");
	})
	//放大镜
	$(".img_main").on("mouseenter",function(e){
		$(".len").show();
		$(".bigimg").show();
	})
	$(".img_main").on("mouseleave",function(){
		$(".len").hide();
		$(".bigimg").hide();
	})
	var _offsetTop=$(".img_main").offset().top,
		_offsetLeft=$(".img_main").offset().left,
		len_w=parseFloat($(".len").css("width")),
		len_h=parseFloat($(".len").css("height")),
		show_w=parseFloat($(".img_main").css("width")),
		show_h=parseFloat($(".img_main").css("height"));
		
	$(".img_main").on("mousemove",function(e){
		var _left=e.pageX-_offsetLeft-len_w/2,
			_top=e.pageY-_offsetTop-len_h/2;
			if(_left<0){
				_left=0;
			}else if(_left>show_w-len_w){
				_left=show_w-len_w
			}
			if(_top<0){
				_top=0;
			}else if(_top>show_h-len_h){
				_top=show_h-len_h;
			}
			$(".len").css({left:_left+"px",top:_top+"px"});
			$(".bigimg img").css({left:-_left*2+"px",top:-_top*2+"px"})
	})	
	//小图片切换
	$(".small_imgs_box li").click(function(){
		$(".img_main img").remove();
		$(".bigimg img").remove();
		$(this).css({"border":"1px solid red"})
			.siblings("li").css({"border":"1px solid #c0c0c0"}).end()
			.children("img").clone().appendTo(".img_main,.bigimg");
	});
	$(".small_imgs_box li:nth-child(1)").click();
	
	//数量加减按键与数字填写
	$("#product_buy_amount").blur(function(){
		var _amount=Math.floor($("#product_buy_amount").val());
		if(/^[1-9][0-9]$/.test(_amount)){
			
			}else{
				_amount=1;
			};
			$("#product_buy_amount").val(_amount);
			$("#ext_num").html("数量："+_amount);
			var _price=$(".product_price").html(),
				_total=Number(_price)*_amount;
			$("#ext_price").html("￥"+_total);
	});
	
	$(".amount_minus,.amount_add").click(function(){
		var _amount=Math.floor($("#product_buy_amount").val());
			if(_amount>=99){
				_amount=98;
			}
			if($(this).is(".amount_add")){
				_amount++
			}else if(_amount<=1){
				_amount=1;
			}else{
				_amount--;
			};			
			$("#product_buy_amount").val(_amount);
			$("#ext_num").html("数量："+_amount);
			var _price=$(".product_price").html(),
				_total=Number(_price)*_amount;
			$("#ext_price").html("￥"+_total);
		
	})
	//滚动标题栏变固定
	$(window).on("scroll",function(){
		var _scrollTop=$(window).scrollTop();
		$(".tab").removeClass("tab_fixed");
		$(".tab .null").show();
		if(_scrollTop>890){
			$(".tab").addClass("tab_fixed");
			$(".tab .null").hide();
		};
		if(_scrollTop>900&&_scrollTop<3760){
			$(".tab_select a").eq(0).addClass("active").siblings().removeClass("active");
		};
		if(_scrollTop>=3760&&_scrollTop<4400){
			$(".tab_select a").eq(1).addClass("active").siblings().removeClass("active");
		};
		if(_scrollTop>=4400){
			$(".tab_select a").eq(2).addClass("active").siblings().removeClass("active");
		};
	})
	//tab 选项卡点击切换
	$(".tab_select a").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		if($(this).is(".tab_select a:nth-child(1)")){
			$(window).scrollTop(891);
		}
		 else if($(this).is(".tab_select a:nth-child(2)")){
			$(window).scrollTop(3760);
		}else{
			$(window).scrollTop(4400);
		}
	})
	//购物车点击提交
	$("#add_cart_btn,.ext-shopping-cart").click(function(){
		var _amount_1=Number($("#product_buy_amount").val()),
			_id=$(".product_id").html(),
			_title=$(".product_title").html(),
			_price=$(".product_price").html(),
			_cookie=$.cookie("products");
			if(_cookie==null||_cookie==""){
				var _cookie=[{"id":_id,"title":_title,"price":_price,"amount":_amount_1}];				
				$.cookie("products",_cookie,{expires:7});
			}else{
				for(var i=0,len=_cookie.length;i<len;i++){
					if(_cookie[i].id===_id){
						_cookie[i].amount+=_amount_1;
						if(_cookie[i].amount>=99){
							_cookie[i].amount=99;
						}
					}	
				};
				$.cookie("products",_cookie,{expires:7});
			}		
	})
	//end
})