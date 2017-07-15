define(["jquery", "cookie"], function($){
	$.cookie.json = true;
	$.get("/html/include/header.html", function(data){
		var _user = $.cookie("loginUser");
		if (_user){
			$(data).filter(".login_reg").hide().end()
				   .filter(".user_info").show().html("欢迎：<a href='#'>"+ _user.username +"</a>").end()
				   .appendTo(".header");
		} else {
			$(data).appendTo(".header");
		}
	});

	$.get("/html/include/footer.html", function(data){
		$(data).appendTo(".footer");
	})
});