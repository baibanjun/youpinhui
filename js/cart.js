$(function(){
	//启用cookie插件
	$.cookie.json=true;
	//加载footer
	$.get("footer.html",function(data){
		$(data).appendTo("#footer");
	});

	//购物车商品加载
	var _cookie=$.cookie("products");
		if(_cookie==null||_cookie==""){
			location.href="index.html";
		}else{
			var data={
				list:_cookie
			};
			var html=template("cart_goods_tem",data)
			$(html).appendTo(".cart_goods_list");
		}
	//合计金额
	calcTotal();
	//单项勾选
	$(".ck_prod").on("click",function(){
		calcTotal();
	})
	
	//全选效果
	$(".check_all").click(function(){
		$(".ck_prod").prop("checked", $(this).prop("checked"));
		$(".check_all").prop("checked", $(this).prop("checked"));
				calcTotal();
	})
	//获取焦点
	var _amount;
	$(".buy_amount").focus(function(){
		_amount=$(this).val();
	});
	//失去焦点 ，更改数量
	$(".buy_amount").blur(function(){
		if(!/^[1-9][0-9]{0,1}$/.test($(this).val())) { // 格式有误
					$(this).val(_amount);
					alert("输入数量格式有误");
					return;
				}
		if ($(this).val() == _amount) // 未修改数量
					return;
		var $id=$(this).parents(".cart_goods_box").find("#product_id").text();
		var index=exist($id,_cookie);
		var product=_cookie[index];
			product.amount=Number($(this).val());
			$.cookie("products", _cookie, {expires:7});
			$(this).parents(".cart_goods_box").find(".sub").text(product.amount*product.price);
			calcTotal();
	})
	//加减号点击
	$(".minus,.add").click(function(){
					//找到商品id，确定在cookie中的位置
				var $id=$(this).parents(".cart_goods_box").find("#product_id").text();
				var index=exist($id,_cookie);
				var product=_cookie[index];

				if ($(this).is(".add")) { // 数量 +
					product.amount += 1;
					if(product.amount >= 99){
						product.amount=99;
					};
				} else { // 数量 -
					if (product.amount <= 1)
						return;
					// 在数组元素中减数量
					product.amount -= 1;
				}
				
				// 保存回 cookie
				$.cookie("products", _cookie, {expires:7});
				// 页面显示内容修改
				$(this).parents(".cart_goods_box").find(".buy_amount").val(product.amount);
				// 更新页面显示小计
				$(this).parents(".cart_goods_box").find(".sub").text(product.amount*product.price);

				// 更新显示合计
				calcTotal();
			});
	//点击行内删除
	$(".cart_goods_del").click(function(){
				var $id=$(this).parents(".cart_goods_box").find("#product_id").text();
				var index=exist($id,_cookie);
				var product=_cookie[index];
					_cookie.splice(index, 1);//cookie中删掉数据
					$.cookie("products", _cookie, {expires:7});
					$(this).parents(".cart_goods").remove();
					calcTotal();
					// 判断是否购物车为空
				if (_cookie.length == 0){
					alert("购物车为空");
					location = "index.html";
				}
	})
	//多项删除
	$("#detele_all").click(function(){
		console.log(1);
		$(".cart_goods_box").each(function(i, n){
					if($(n).children("div").eq(0).children(".ck_prod").is(":checked")){
						$(n).find(".cart_goods_del").click();
					}
				});
	})
	//生成订单按钮点击
	$("#get_order_btn").click(function(){
		console.log(1);
	})
	//合计函数
	function calcTotal() {
				var sum = 0;
				$(".cart_goods_box").each(function(i, n){
					if($(this).children("div").eq(0).children(".ck_prod").is(":checked")){
						sum+=Number( $(this).children("div").eq(5).children(".sub").text());	
					}
				});
				// 显示合计金额
				$(".money_total").text(sum);
				if(sum===0){
					$("#get_order_btn").css({"background":"#808080"});
					$('#get_order_btn').attr('disabled',"true");
				}else{
					$("#get_order_btn").css({"background":"#F70800"});
					$('#get_order_btn').removeAttr("disabled");
				}
			}
	//索引函数
	function exist(id, products) {
			for (var i = 0, len = products.length; i < len; i++) {
				if (products[i].id == id)
					return i;
			}
			return -1;
		}
 	//end
})