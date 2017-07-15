$(function(){
	//引入header和footer
	$.get("header.html",function(data){
		$(data).appendTo("#header");
	})
	$.get("footer.html",function(data){
		$(data).appendTo("#footer");
	})
	//大图轮播
	var _width=$(window).innerWidth();
			  $(".banner_lunbo").xmCarousel(
		{
			width:_width,
			height:340,
			imgs:[{
				imgSrc:"../img/banner1.jpg",
				href:"#"
			},
			{
				imgSrc:"../img/banner2.jpg",
				href:"#"
			},
			{
				imgSrc:"../img/banner3.jpg",
				href:"#"
			}
			]
		}
	)
		//index商品模板加载
		$.getJSON("../data/index_list.json",function(json){
			var data={
				list:json
			}
			var html=template("index_list",data);
			$(html).appendTo(".index_global_list");
			
		})
		
		
			  
			  //end
})