$(function(){
	$.get("header.html",function(data){
		$(data).appendTo("#header");
	})
	$.get("footer.html",function(data){
		$(data).appendTo("#footer");
	})
	
	//end
})