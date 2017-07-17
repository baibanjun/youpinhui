$(function(){
	//加载footer
	$.get("footer.html",function(data){
		$(data).appendTo("#footer");
	});
	//验证码请求
//	$("#re_get_code").click(function(){
//		key_1=0;$("#register_v_code").val("");
//		$.getJSON("http://route.showapi.com/26-4?showapi_appid=38809&showapi_sign=582e7652defd406dae2602b5d431e462",
//			function(json){
//				console.log(json);
//				$(".v_code .code_img img").attr("src",json.showapi_res_body.img_path);
//				$("#register_v_code").blur(function(){
//					var _code=$(this).val();
//					if(_code===json.showapi_res_body.text){
//						$(".code_error").show().html("验证通过！！！").css({"color":"green"});
//						key_1=1;
//					}else{
//						$(".code_error").show().html("验证码有误").css({"color":"red"});
//					}
//				})
//			});
//	}).click();
  	//判断手机号码格式
  	var key_1=1,key_2=0,key_3=0,key_4=0,key_5=0,key_6=0;
	$("#register_tel_num").blur(function(){
		var tel_num=$(this).val();
		if(/^[1][34578][0-9]{9}$/.test(tel_num)){
			$(".tel_num .tel_error").show().html("输入正确").css({"color":"green"});
			key_2=1;
		}else{
			$(".tel_num .tel_error").show();
		}
	});
	//密码格式判断
	
	$("#set_password").blur(function(){
		$("#check_password").blur();
		var _password=$(this).val();
		if(/^[a-z]\w{5,8}$/.test(_password)){
			$(".password_status").show().html("密码安全").css({"color":"green"});
			key_3=1;
		}else{
			$(".password_status").show().html("密码格式有误").css({"color":"red"});
			key_3=0;
		}	
	});
	//确认密码
	$("#check_password").blur(function(){
		var _password=$(this).val();
		if(_password===$("#set_password").val()&&_password!=""){
			$(".check_error").show().html("密码安全").css({"color":"green"});
			key_4=1;
		}else{
			$(".check_error").show().html("两次输入的密码不相同").css({"color":"red"});
			key_4=0;
		}
	});
	
	//短信验证码
	$("#get_message_btn").click(function(){
		$("#phone_message").val(1234);
		$("#phone_message").blur();
	})
	$("#phone_message").blur(function(){
		var _message=$("#phone_message").val();
			if(_message==="1234"){
				$(".tel_code_error").show().html("验证通过").css({"color":"green"});
				key_5=1;
			}else{
				$(".tel_code_error").show().html("手机验证码有误").css({"color":"red"});
				key_5=0;
			}
	})
	//勾选用户协议
	$(".user_read input[type='checkbox']").click(function(){
		var _checked=$(this).prop("checked");
	        if(_checked){
	        	key_6=1;
	        }else{
	        	key_6=0;
	        }
	})
	
	//提交注册信息
	$("#post_btn").click(function(){
		var _key=key_1*key_2*key_3*key_4*key_5*key_6;
		if(_key===1){
//			var _username=$("#register_tel_num").val();
//			console.log(_username);
//			$.cookie("username",_username,{expires:7});
			location.href="login.html";
		}else{
			return;
		}
	})
	//end
})
