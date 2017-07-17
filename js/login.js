$(function(){
	//启用cookie插件
	$.cookie.json=true;
	//加载footer
	$.get("footer.html",function(data){
		$(data).appendTo("#footer");
	});
	//登录框
	var _username=$.cookie("username")||[];
	if(_username.length!=0){
		$("#login_username").val(_username[0]);
	}
	
		
		$("#login_btn").click(function(){
			var _user=$("#login_username").val(),
			    _password=$("#login_password").val();
			if(_user==null){
				return;
			}
//			$.post("login.php",{"user":_user,"password":_password},function(data){
				var data=[{"status":1}];
				if(data[0].status===1){
					var u_name=[];
					u_name.push(_user);
					console.log(u_name);
					$.cookie("username",u_name,{expires:7});
					location.href="index.html";
				}
				
//			},json);
		})
	
})