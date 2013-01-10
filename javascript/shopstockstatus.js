var ordercuxiao = 0;//是否有订单促销满减满赠（0：初始值，1：有，2：没有）
//库存JS
var morepricearea = null;//一品多价商品地区JSON 
function detailurchinSend(o){
	try{
		o.each(function(){
	    	var u = $(this).attr("urchin");
	    	$(this).find("a").click(function(){
	    		urchinTracker(u);
	    	});
	    });
	}catch(e){};}

//获取延保服务
//function yanbaofuwu(){
//	$("#Yanbao").hide();
// 	$('#YanbaoCon').hide("");
// 	var pid = $("#p_id").attr("value");
//   	var url = detailitem.base_url+'/interfaces/findYBPriceByitemid.action',
//       	param = 'itemid='+pid+"&a="+Math.random();
//   	jQuery.getJSON(url,param,function(data){
//   		if(!data || data.length < 1){
//   			return;
//   		}
//   		var ybcontent = '<p>保修时间更长，更省心；维修范围更广，更舒心&nbsp;&nbsp;<em>[</em><a href="'+detailitem.base_url+'/yanbao/" target="_blank">了解详情</a><em>]</em></p>'+
//   			'<p class="narrow"><label for="cs1"><input type="radio" name="cs" id="0"/>不购买延保</label>';
//   		for(var i=0;i<data.length;i++){
//   			ybcontent += '<label for="cs1"><input type="radio" name="cs" id="'+data[i].codeidid+'"/>'+data[i].baoyear+'年延保'+data[i].memberprice+'元</label>';
//       	}
//    	ybcontent += '</p>';
//       	$('#YanbaoCon').html(ybcontent);
//       	$("#Yanbao").attr("va",1);
//       	$('#Yanbao').show();
//   });
//}
//获取无货商品推荐
function getStockItem(brandid,catalogid,cityid,countyid){
   	var url = detailitem.base_url+'/interfaces/detailpage/stockItems.action?brandid='+brandid+'&catalogid='+catalogid+'&cityid='+cityid+'&countyid='+countyid+'&a='+Math.random();
    jQuery.ajax({type:"get",url:url,success:function(res){
    	if(res == null || res.length <= 0){
    		$("#stockrecommend").hide();
    		return;
    	}
    	var data = eval("("+res+")");
    	if(data.length <= 0){
    		$("#stockrecommend").hide();
    		return;
    	}
   		var content = '<h3 id="other-tip"> 您所选地区商品已售完，欢迎选择其他商品</h3><div class="other-list"><ul>';
   		for(var i=0;i<data.length;i++){
   			if(i < (data.length-1)){
   				content += '<li class="li-bgimg"><div class="other-img"><a target="_blank" href="'+detailitem.base_url+'/product/'+data[i].id+'.html"><img alt="'+data[i].name+'" src="'+data[i].img+'" onerror="imgERROR(this, \'no_pic_120_120.jpg\');"/></a></div>'
   	            +'<div class="other-title"><a target="_blank"  href="'+detailitem.base_url+'/product/'+data[i].id+'.html">'+data[i].name+'</a></div>'
   	            +'<div class="other-price"><img src="http://price.51mdq.com/iprice/'+Math.floor(data[i].id/1000)+'/'+ data[i].id +',2.png" onerror="imgERROR(this, \'noprice,2.jpg\');"/></div></li>';  
   			}else{
   				content += '<li><div class="other-img"><a target="_blank" href="'+detailitem.base_url+'/product/'+data[i].id+'.html"><img alt="'+data[i].name+'" src="'+data[i].img+'" onerror="imgERROR(this, \'no_pic_120_120.jpg\');"/></a></div>'
   	            +'<div class="other-title"><a target="_blank"  href="'+detailitem.base_url+'/product/'+data[i].id+'.html">'+data[i].name+'</a></div>'
   	            +'<div class="other-price"><img src="http://price.51mdq.com/iprice/'+Math.floor(data[i].id/1000)+'/'+ data[i].id +',2.png" onerror="imgERROR(this, \'noprice,2.jpg\');"/></div></li>';  
   			}
       	}
   		content += '</ul></div>';
    	$("#stockrecommend").html(content);
    	$("#stockrecommend").show();
    }});
}
//function showYB(){
//	$('#YanbaoCon').show();
//}
function urchin(type){
	if(type == 1){
		urchinTracker("/Virtual/detail/yaobaotime.html");
	}else if(type == 2){
		urchinTracker("/Virtual/detail/shoppingcart.html");
	}else if(type == 3){
		urchinTracker("/Virtual/detail/fenqifukuan.html");
	}else if(type == 4){
		urchinTracker("/Virtual/detail/tcbuy.html");
	}else if(type == 5){
		urchinTracker("/Virtual/detail/sdbuy.html");
	}
}
//积分属性
function getPointLink(){
	$("#jifen").hide();
	$('#jifen').html("");
	var pid = $("#p_id").attr("value");
	var curl = detailitem.base_url+"/interfaces/point/getPointLink.action?id="+pid+"&a="+Math.random();
    jQuery.ajax({type:"get",url:curl,success:function(res){
    	if(res != null && res != "" && res != "null"){
    		$('#jifen').html(res);
    		$("#jifen").show();
    		detailurchinSend($("#jfdd"));
    	}
    }});
}
//function showyanbao(){
//	if($("#Yanbao").attr("va")==1){
//		$("#Yanbao").show();
//	}
//}
function getFreight(data){
	if(!data)
		return ;
	$("#yfdesc").html("");
	$("#wldesc").html("");
	if(data.isArrive==1){
		if(data.freightPrice == '0' || data.freightPrice == 0){
			$("#yfdesc").html("免运费。");
		}else{
			$("#yfdesc").html("收取运费"+data.freightPrice+"元。");
		}
		$("#J-stock-help").css("display","inline");
		if(detailitem.product_venderid == "2011102716210000"){
			var ps = "";
			if(data.goodsPattern == "G3PP" || data.goodsPattern == "3PP"){
				$("#wldesc").html("");
			}else if(data.goodsPattern == "3PL"){
				ps="第三方承运商";
				$("#wldesc").html("预计送达日期<em>"+data.comeTime+"</em>，请在<em>"+data.refuseOrderTime+"</em>内下单并选择\"物流配送\"，由"+ps+"发货，");
			}else{
				ps = "库巴物流";
				$("#wldesc").html("预计送达日期<em>"+data.comeTime+"</em>，请在<em>"+data.refuseOrderTime+"</em>内下单并选择\"物流配送\"，由"+ps+"发货，");
			}
		}
	}else{
		$("#wldesc").html("很抱歉，该商品无法配送至当前区域，欢迎查看其它地区。");
   	}
}
//是否显示价格保护，有货时为0
function showJiaBao(kucunstate){
	var jbstate = $("#pricejiabao").attr("state"); // 0不符合要求，1：符合要求
	if(jbstate == 0){
		$("#pricejiabao").hide();
		return;
	}
	//1294,1295, 1296, 1297, 1298, 1299, 1300, 1459
	//金饰品吊坠/项链;；金饰品手镯/手链/脚链；金饰品戒指；金饰品耳饰；宝宝金饰品；工艺金；工艺银；银饰宝宝银
	if(detailitem.product_catid == "1294" ||detailitem.product_catid == "1295" ||detailitem.product_catid == "1296" ||detailitem.product_catid == "1297"
		 ||detailitem.product_catid == "1298" ||detailitem.product_catid == "1299" || detailitem.product_catid == "1230" || detailitem.product_catid == "1459" ){
		$("#pricejiabao").hide();
		return;
	}
	//商品无货
	if(kucunstate != 0){
		$("#pricejiabao").hide();
		return;
	}
	var url = "http://interface.coupon.coo8.com/admin/ProPromotion/interfaces/product.action?productId="+detailitem.productno+ "&random=" + Math.random();
	if(ordercuxiao == 0){
		jQuery.getScript(url, function() {
	       if(data ==null){
	    	   $("#pricejiabao").show();
	    	   ordercuxiao = 2;
	    	   return ;
	       }
	       $("#pricejiabao").hide();
	       ordercuxiao = 1;
	       return ;
		}) ;
	}else{
		if(detailitem.isMorePrice){
			jQuery.getScript(url, function() {
		       if(data ==null){
		    	   $("#pricejiabao").show();
		    	   ordercuxiao = 2;
		    	   return ;
		       }
		       $("#pricejiabao").hide();
		       ordercuxiao = 1;
		       return ;
			}) ;
		}else{
			if(ordercuxiao == 2){
				$("#pricejiabao").show();
			}else{
				$("#pricejiabao").hide();
			}
		}
	}
}
//获取库存状态
function getKuCun(city_id,productid){
	var producttype = 0;//正常商品
	var kucunstate="";
	var states = ["现货","预订","无货","在途"];
	var classes = ["stock-status-yes","stock-status-yes","stock-status-no","stock-status-yes"];
	var wltext = ["","该商品预计15-20天后发货，敬请谅解。","很抱歉，该商品暂时缺货，欢迎查看其它商品。","商品采购途中，4-10天入库后可发货。"];
//	var wltext = ["","","",""];
	$("#wldesc").html("");
	$("#kcdesc").html("");
	$("#yfdesc").html("");
	$("#J-stock-help").hide();
 	if(detailitem.isMorePrice){
 		detailitem.product_id = productid;
 	}
	//下架商品不访问库存
	if((parseInt(detailitem.product_status)&4)!=0){
		kucunstate = states[2];
		$("#kcdesc").attr("class",classes[2]);
		$("#kcdesc").text(kucunstate);
		getStockItem(detailitem.product_brandid,detailitem.product_catid,detailitem.cityID,detailitem.countyID);
		return;
	}
	if(detailitem.product_venderid == "2011102716210000"){
		var ccurl= "http://www.coo8.com/interfaces/stock/hasStock.action" +
			"?itemid=" + detailitem.product_id + "&province=" + detailitem.provinceID + "&city=" + detailitem.cityID + 
			"&county=" + detailitem.countyID + "&a=" + Math.random(); // FIXME 三级区域，是否改好！diqu_id
		jQuery.getScript(ccurl, function() {
			if(data == null){
				return ;
			}
			detailitem.kucunstatus = data.storeStatus;//全局变量，用于判定显示大图中的立即购买是否显示
			kucunstate = states[detailitem.kucunstatus];
			$("#kcdesc").attr("class",classes[detailitem.kucunstatus]);
			$("#kcdesc").text(kucunstate);
			canbuy(detailitem.kucunstatus);
			if(detailitem.kucunstatus == 0 ){
				getFreight(data);
			}else{
				$("#wldesc").text(wltext[detailitem.kucunstatus]);
			}
		   	if(detailitem.kucunstatus==0 || detailitem.kucunstatus==1 || detailitem.kucunstatus==3){
		   //		showyanbao();
		    	$("#stockrecommend").hide();
		 	}else{
		   //     $("#Yanbao").hide();
		        getStockItem(detailitem.product_brandid,detailitem.product_catid,detailitem.cityID,detailitem.countyID);
			}
		   	if(detailitem.isMorePrice){
		   		changeItem(productid,detailitem.kucunstatus);
			}else{
				tccanbuy();
				fqcanbuy(detailitem.kucunstatus);
				showJiaBao(detailitem.kucunstatus);
			}
			
			data=null;
		});
	}else{
		var curl="http://www.coo8.com/interfaces/quantity/quantity.action" +
        "?itemId=" + detailitem.product_id + "&province=" + detailitem.provinceID + "&city=" + detailitem.cityID + 
		"&county=" + detailitem.countyID + "&a=" + Math.random();
		jQuery.getScript(curl, function() {
			if(data == null){
				return ;
			}
			detailitem.kucunstatus = data.storeStatus;//全局变量，用于判定显示大图中的立即购买是否显示
			kucunstate = states[detailitem.kucunstatus];
			$("#kcdesc").attr("class",classes[detailitem.kucunstatus]);
			$("#kcdesc").text(kucunstate);
			canbuy(detailitem.kucunstatus);
			//第3方商家在无货状态下不显示物流状态
			if(detailitem.kucunstatus == 0 ){
				getFreight(data);
			}
		   	if(detailitem.kucunstatus==0 || detailitem.kucunstatus==1 || detailitem.kucunstatus==3){
		    	$("#stockrecommend").hide();
		 	}else{
		        getStockItem(detailitem.product_brandid,detailitem.product_catid,detailitem.cityID,detailitem.countyID);
			}
		   	if(detailitem.isMorePrice){
		   		changeItem(productid,detailitem.kucunstatus);
			}else{
				tccanbuy();
				fqcanbuy(detailitem.kucunstatus);
			   	showJiaBao(detailitem.kucunstatus);
			}
		
			data=null;
		});
		
	}
}

//购买按钮，闪电购按钮是否生效
function canbuy(status){
	var jnbtstr = "go2buy buy-jieneng";
	var classstr = "buy-cart";
	var sdbuystr = "buy-fast";
	var sdbuytitle = $("#sdBuy").attr("title");
	if(status==0 || status==1 || status==3){
		$("#jnbtshopping").replaceWith("<a id='jnbtshopping' class='"+jnbtstr+"' ></a>");
		$("#shopping").replaceWith("<a id='shopping' class='"+classstr+"'  onClick='urchin(2);'></a>");
	//	$("#sdBuy").replaceWith("<a id='sdBuy' class='"+sdbuystr+"' onClick='urchin(5);' title='"+sdbuytitle+"'></a>");
	}else{
		$("#jnbtshopping").replaceWith("<span id='jnbtshopping' class='"+jnbtstr+"'></span>");
		$("#shopping").replaceWith("<span id='shopping' class='"+classstr+"'></span>");
//		$("#sdBuy").replaceWith("<span id='sdBuy' class='"+sdbuystr+"' title='"+sdbuytitle+"'></span>");
	}
}
function sdcanbuy(status){
	var sdbuystr = $("#sdBuy").attr("class");
	var sdbuytitle = $("#sdBuy").attr("title");
/**	if(status==0){
		$("#sdBuy").replaceWith("<a id='sdBuy' class='"+sdbuystr+"' onClick='urchin(5);' title='"+sdbuytitle+"'></a>");
	}else{
		$("#sdBuy").replaceWith("<span id='sdBuy' class='"+sdbuystr+"' title='"+sdbuytitle+"'></span>");
	}*/
}
//分期付款按钮是否生效
function fqcanbuy(status){
	var installmentstr = "buy-fqfk";
	var installmentstyle = $("#installment").attr("style");
	var value = $("#installment").attr("value");
	if(status==0 || status==1 || status==3){
		$("#installment").replaceWith("<a id='installment' class='"+installmentstr+"' value='"+value+"' style='"+installmentstyle+"' onClick='urchin(3);'></a>");
	}else{
		$("#installment").replaceWith("<span id='installment' class='"+installmentstr+"' value='"+value+"' style='"+installmentstyle+"'></span>");
	}
}
function tccanbuy(){
	if(detailitem.kucunstatus==2){
		//套餐,配件购买按钮失效
       	$(".colB .go2buy").each(function(){
       	   var href =  $(this).attr("href");
       	    $(this).replaceWith("<span href='"+href+"' class='go2buy'></span>");
       	});
	}else{
		//套餐，配件购买按钮有效
       	$(".colB .go2buy").each(function(){
       	   var href =  $(this).attr("href");
       	    $(this).replaceWith("<a href='"+href+"' class='go2buy' onClick='urchin(4);'></a>");
       	});
	}
}

//普通商品地区选择
function checkdiqu(){
	var arr = $.cookie("diquID");
	var plat = $.cookie("diquPlat");//标识用户cookie中的城市ID是否为新城市ID
	var finderr = false;
	if(plat == null || arr == null){
		var curl = detailitem.base_url+"/front/checkIp/ipToCity.action?callback=?&a="+Math.random();
  		$.getJSON(curl,function(res){
  			if(res!=null){
				detailitem.provinceID=res.provinceid;
				detailitem.provinceName=res.provincename;
				detailitem.cityID=res.cityid;
				detailitem.cityName=res.cityname;
				detailitem.countyID=res.countyid;
				detailitem.countyName=res.countyname;
				finderr=true;
			}
  		});
	}else{
  		var idStr=unescape(arr);
  		var diquValue = idStr.split(",");
  		if(diquValue.length >= 6){
  			var pNames = diquValue[1].split(":");
			var	province="";
			for(var i=0;i<pNames.length-1;i++){
				province+=String.fromCharCode(pNames[i]);
			}  
			var cNames = diquValue[3].split(":");
			var	city="";
			for(var i=0;i<cNames.length-1;i++){
				city+=String.fromCharCode(cNames[i]);
			} 
			var conNames = diquValue[5].replace('\"','').split(":");
			var	county="";
			for(var i=0;i<conNames.length-1;i++){
				county+=String.fromCharCode(conNames[i]);
			} 
  			detailitem.provinceID = diquValue[0].replace('\"','');
			detailitem.provinceName=province;	
			detailitem.cityID=diquValue[2];
			detailitem.cityName=city;	
			detailitem.countyID=diquValue[4];
			detailitem.countyName=county;	
  		}else{
  			var curl = detailitem.base_url+"/front/checkIp/ipToCity.action?callback=?&a="+Math.random();
  	  		$.getJSON(curl,function(res){
  	  			if(res!=null){
  					detailitem.provinceID=res.provinceid;
  					detailitem.provinceName=res.provincename;
  					detailitem.cityID=res.cityid;
  					detailitem.cityName=res.cityname;
  					detailitem.countyID=res.countyid;
  					detailitem.countyName=res.countyname;
  					finderr=true;
  				}
  	  		});
  		}
	}
  	var coo = $.cookie("diquID");
  	if(coo==null || finderr){
  		setDiquCookie(detailitem.provinceID,detailitem.provinceName,detailitem.cityID,detailitem.cityName,detailitem.countyID,detailitem.countyName);
  	}
	$("#areaselect").html(detailitem.provinceName+detailitem.cityName+detailitem.countyName);
	getKuCun(detailitem.cityID,0);
}
function setDiquCookie(provinceid,provincename,cityid,cityname,countyid,countyname) {
	var province="";
	for(var i=0;i<provincename.length;i++){
		province+=provincename.charCodeAt(i)+":";
	}
	var city="";
	for(var i=0;i<cityname.length;i++){
		city+=cityname.charCodeAt(i)+":";
	}
	var county="";
	for(var i=0;i<countyname.length;i++){
		county+=countyname.charCodeAt(i)+":";
	}
	$.cookie("diquPlat",provinceid, {expires:3*24*60*60, path:'/',domain:'.coo8.com' });
	$.cookie("diquID", "\""+ provinceid + "," + province +","+cityid+","+city+","+countyid+","+county+ "\"", {expires:3*24*60*60, path:'/',domain:'.coo8.com' });
};
function catchControl(f,m){
	try{f();}catch(e){
		e.message = e.message + "  : 模块" +　m;
		throw(e);
	}
}
//更改一品多价商品地区时，获取赠品，套餐，配件，促销等（延保获取在库存方法）
function changeItem(productid,status){
	detailitem.product_id = productid;
	$("#p_id").attr("value",productid);//评论，咨询使用
	var did=parseInt(productid/1000);
	$("#itemimg").attr("src","http://price.51mdq.com/iprice/"+did+"/"+productid+",4.png");
	//获取订单促销信息
	orderCuxiao();
	//获取商品9天价保块（9天价保）
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_jiabao.html?a="+Math.random(),function(res){
			$("#price-note #pricejiabao").remove();
			if(res==null || res==""){
			} else {
				$(res).appendTo("#price-note");
			}
		   	showJiaBao(status);
		});
	}, "获取9天价保");
	//一品多价商品获取库存状态，当商品现货，预定，在途时，请求延保服务
//	if(detailitem.kucunstatus!=2){
//		yanbaofuwu();
//	}
	//获取积分
	getPointLink();
	//获取商品分期按钮
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_fenqifukuan.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#moreprice_fqfk").hide();
			} else {
				$("#moreprice_fqfk").html(res);
				$("#moreprice_fqfk").show();
			}
			fqcanbuy(status);
		});
	}, "获取分期按钮");
	//获取促销语
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_gift.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#item_gift").hide();
			} else {
				$("#item_gift").html(res);
				$("#item_gift").show();
			}
		});
	}, "获取商品名称");
	//获取赠品html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_zengpin.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#zengpin").hide();
			} else {
				$("#zengpin").html(res);
				$("#zengpin").show();
				detailurchinSend($("#zengpin"));
			}
		});
	}, "获取赠品");
	
	//获取促销信息html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_cuxiao.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#cuxiao").hide();
			} else {
				$("#cuxiao").html(res);
				$("#cuxiao").show();
			}
		});
		
	}, "获取促销信息");
	//获取套餐与配件菜单html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_Accessories_left.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#moreprice_accesso").hide();
			} else {
				$("#moreprice_accesso").html(res);
				$("#moreprice_accesso").show();
			}
		});
	}, "获取套餐与配件菜单");
	
	//获取优惠套餐html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_youhuitaocan.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#moreprice_yhtc").hide();
			} else {
				$("#moreprice_yhtc").html(res);
				$("#moreprice_yhtc").show();
			}
			$(".pItem:visible .thumbPannel").cooMarquee();//显示的套餐左右箭头
			$(".pItem:visible .thumbPannel").attr("num",1);
			tccanbuy();
			detailurchinSend($("#tccon"));
		});
	}, "获取优惠套餐");
	
	//获取推荐配件html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_tuijianpeijian.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#moreprice_tjpj").hide();
			} else {
				$("#moreprice_tjpj").html(res);
				$("#moreprice_tjpj").show();
			}
			$("#pParts").cooMarquee();//配件左右箭头
			$("#pParts").attr("num",1);
			tccanbuy();
			detailurchinSend($("#pjcon"));
		});
	}, "获取推荐配");
	//获取购物车限购html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_shop_buycount.html?a="+Math.random(),function(res){
			if(res==null || res==""){
			} else {
				$("#choose-num").html(res);
			}
		});
	}, "获取购物车限购html");
}

//一品多价商品地区选择
function morepricediqu(){
	 var curl = detailitem.base_url+"/interfaces/detailpage/findShowArea.action?itemid="+detailitem.product_itemid+"&a="+Math.random();
	jQuery.ajax({type:"get",url:curl,success:function(res){
		if(res==null || res==""){
		} else {
			var d = eval("("+res+")");
			$("#areaselect").html(d.provincename+d.cityname+d.countyname);
			$("#areaselect").attr("pid",d.provinceid);
			$("#areaselect").attr("cid",d.cityid);
			$("#areaselect").attr("couid",d.countyid);
			detailitem.provinceID=d.provinceid;
			detailitem.provinceName=d.provincename;
			detailitem.cityID=d.cityid;
			detailitem.cityName=d.cityname;
			detailitem.countyID=d.countyid;
			detailitem.countyName=d.countyname;
			detailitem.product_id=d.productid;
		}
		getKuCun(detailitem.cityID,detailitem.product_id);
	}});
}

function kucunalready(){
	if(detailitem.isMorePrice){
		morepricediqu();
	}else{
		checkdiqu();
		if((parseInt(detailitem.product_status)&4)==0){
//			yanbaofuwu();
			getPointLink();
		}
	}
}
kucunalready();
//获取特殊属性
function teshushuxing(){
	var result=parseInt(detailitem.product_specialStatus&2);
	if(result != 0){
	    var productid = detailitem.product_itemid.substring(1,detailitem.product_itemid.length);
	   	var curl = detailitem.base_url+"/interfaces/querySpecialItemByItemid.action?id=" +productid+"&a="+Math.random();
	    jQuery.ajax({type:"post",url:curl,success:function(res){
	    	if(res==null || res==""){
	 			return;
	    	}else{
	    		
	        	var json = eval("(" + res + ")"), 
	            	select = json["selected"],
	            	content="";//特殊属性html
	            var selects="";
	            for(var p in json){
	                if(p!="selected"){
	                	var svalue="";//已选择的属性值
	                    selects=(select+"").split(",");
	                    for(var i=0;i<selects.length;i++){
	                        var svalues = selects[i].split("^");
	                        if(p == svalues[0]){
	                            svalue=svalues[1];
	                            break;
	                        }
	                    }
	                    var jsons = (json[p]+"").split(",");
	                	content += '<dl class="pProps"><dt>'+p+'：</dt> <dd>';
	                	for(var i=0;i<jsons.length;i++){
                            var jsonss =  jsons[i].split("^");
                        	if(jsonss[3]=="null"){
                        		//显示文字
                        		if(svalue==jsonss[0]){
 	                            	content += '<div class="pProp on"><a href="'+detailitem.base_url+'/product/'+jsonss[1]+'.html" title="'+jsonss[0]+'">'+jsonss[0]+'</a></div>';
 	                            } else {
 	                            	content += '<div class="pProp"><a href="'+detailitem.base_url+'/product/'+jsonss[1]+'.html" title="'+jsonss[0]+'">'+jsonss[0]+'</a></div>';
 	                            }
                        	}else{
                        		//显示图片
                        		if(svalue==jsonss[0]){
	                             	content += '<div class="pProp on"> <a href="'+detailitem.base_url+'/product/'+jsonss[1]+'.html" title="'+jsonss[0]+'" style="cursor: pointer;"><img src="'+jsonss[3]+'"/></a></div>';
                        		} else {
                        			content += '<div class="pProp"> <a href="'+detailitem.base_url+'/product/'+jsonss[1]+'.html" title="'+jsonss[0]+'" style="cursor: pointer;"><img src="'+jsonss[3]+'"/></a></div>';
	                         	}
                        	}
                        }
	                    content += '</dd></dl>';
	                }
	            }
	            content += "";
	            $("#teshushuxing").html(content);
	            $("#teshushuxing").show();
	            detailurchinSend($("#tssx"));
			}
		}});
	}
}
teshushuxing();//特殊属性
/**
 * 拼接购物车url,考虑购买数量，延保
 * @param url
 */
function getShoppingcartUrl(url){
	var pid = $("#p_id").attr("value");
	var s = $("#buycount").val();
	if(!Numcheck(s)){
		$("#buycount").val(1);
		s=1;
	}
//	var num = $("#YanbaoCon input:radio:checked").size();
//	if(num > 0){
//		var ybid =  $("#YanbaoCon input:radio:checked").attr("id");
//		if(ybid != 0){
//			url = url+"itype=12&itemnum="+s+"&itemid="+ybid+"&refmainitemid="+pid+"&a="+Math.random();
//		}else{
//			url = url+"itype=1&itemnum="+s+"&itemid="+pid+"&a="+Math.random();
//		}
//	}else{
//		url = url+"itype=1&itemnum="+s+"&itemid="+pid+"&a="+Math.random();
//	}
	url = url+"itype=1&itemnum="+s+"&itemid="+pid+"&a="+Math.random();
	return url;
}
//点击购物车
function shoppingCar(){
	var pid = $("#p_id").attr("value");
	var url = "http://buy.coo8.com/interfaces/shoppingcart/additem2cart.action?";
//	var url = "http://buy.coo8.com/cart/shoppingcart/addnormalcart.action?";
	var curl = getShoppingcartUrl(url);
	$("#shopping").attr("href",curl);
}
//点击节能补贴购物车
function jnbtshoppingCart(){
	var pid = $("#p_id").attr("value");
	var curl = "http://buy.coo8.com/interfaces/shoppingcart/additem2cart.action?itype=1&itemnum=1&itemid="+pid;
	$("#jnbtshopping").attr("href",curl);
}
function closePop(){
	$(".popWrap").remove();
}

//点击闪电购按钮
function showSdBuy(){
	if(detailitem.product_venderid!=2011102716210000) return;
	if(!createUser()){
		loginCheck($(this),detailitem.base_url+'/product/'+detailitem.product_id+'.html','0');
		return;
	}
	sdcanbuy(1);
	
	var s = $("#buycount").val();
	if(!Numcheck(s)){
		$("#buycount").val(1);
		s=1;
	}
	s = Number(s);
	var url = "http://buy.coo8.com/front/oneorder/generateOrders.action?itemid=" + detailitem.product_id 
		+ "&itemcount=" +s + "&itype=1" + "&random=" + Math.random();
	$.ajax({url: url,type: "get", dataType: "jsonp",jsonp: "jsoncallback",
		success: function(Myjson) {
			if (Myjson.status == "1"){
				location.replace("http://buy.coo8.com/interfaces/order/onlySuccess.action?orderid=" + Myjson.message.toString() + "&random=" + Math.random());
			} else if(Myjson.status == "11")
             {
          	 //如果显示没有闪电购地址则跳转
      		   var html1='<table><tr><td style="padding: "><img src="http://p4.51mdq.com/images/Boderh2Bg.gif" /></td><td style="padding: 5px 0;"><p style="margin: 0 0 10px">您选购的“<span style="color:#F00;">'+Myjson.message+'</span>”商品数量有限，为了保证对您的服务质量，需要认证手机后才可以购买。</p><p>您可以去<a href="http://my.coo8.com/ucenter/userInfo.action" class="FQFKbtn2 pop-close">用户中心-个人资料</a>里进行手机认证。</p></td></tr></table>';
					$().popBx({html:html1, title: '提示',width:'425px'}).open(); 
					sdcanbuy(0);
					return false;
             }
			else {
            	if (Myjson.message == "NORECEIPTTOPULL"){
                 	//如果显示没有闪电购地址则跳转
	             	var msg = '<div style="margin: 0 5px;padding: 15px 0 20px; border-bottom: 1px solid #E6E6E6;">'
	                   		 +'<p style="color: #F00; text-align: center;" ><b>温馨提示：</b>请先设置默认的闪电购地址，设置完成后将自动提交本次订单。</p>'
	                   		 +'<p style="padding: 25px 0 0 165px;"><a onclick="closePop();" href="http://my.coo8.com/UCenter/AccessAddressOneKeyAdd.aspx?iforder=1&itemid='
	                   		 +detailitem.product_id+'&ct='+$('#buycount')[0].value
	                   		 +'" target="_blank" style="display: block;width: 81px; height: 27px; background: url(http://p1.51mdq.com/images/201107/SDGbtn.jpg) 0 0;"></a>'
	                   		 +'</p></div><dl style="margin: 0 5px;">'
	                   		 +'<dt style="font-weight: 700; background:url(http://s.51mdq.com/images/201107/SDGbtn.jpg) no-repeat -90px 15px; padding: 10px 0 5px 15px;">什么是闪电购？</dt>'
	                   		 +'<dd style="text-indent: 15px;">闪电购简化了您的下单流程，一次点击便可以直接提交订单。</dd><dt style="font-weight: 700; background:url(http://s.51mdq.com/images/201107/SDGbtn.jpg) no-repeat -90px 15px; padding: 10px 0 5px  15px;">闪电购有什么好处？</dt><dd style="text-indent: 15px;">一步到位，为您节省宝贵时间。</dd></dl>'
 					$().popBx({html:msg, title: '闪电购',width:'433px'}).open(); 
					sdcanbuy(0);
            	} else if(Myjson.message == 'USERNOTLOGIN'){
                 	loginCheck($(this),detailitem.base_url+'/product/'+detailitem.product_id+'.html','0');
            	} else {
            		var msg = '<div style="margin: 0 5px;padding: 15px 0 20px;">'
	                   		 +'<p style="color: #F00; text-align: center;"><b>温馨提示：</b>'+Myjson.message+'</p>'
	                   		 +'<p style="padding: 25px 0 0 165px;"></p></div>';
	              	var t = $().popBx({html:msg, title: '闪电购',width:'433px'}).open(); 
	              	sdcanbuy(0);
            	}
            	return false;
			}
		},
		error: function() {
			sdcanbuy(0);
			var msg = '<div style="margin: 0 5px;padding: 15px 0 20px; ">'
					+'<p style="color: #F00; text-align: center;"><b>温馨提示：</b>服务器忙，请稍候在试！</p>'
				 	+'<p style="padding: 25px 0 0 165px;"></p></div>';
			$().popBx({html:msg, title: '闪电购',width:'433px'}).open(); 
     	}
	});
}

//点击分期付款按钮
function showInstallment(){
	var pid = $("#p_id").attr("value");
	var realprice = $("#installment").attr("value");
	var price3 =  (Math.ceil((parseFloat(realprice)/3*100))/100).toFixed(2);
	var price6 = (Math.ceil((parseFloat(realprice)/6*100))/100).toFixed(2);
	var price12 = (Math.ceil((parseFloat(realprice)/12*100))/100).toFixed(2);
	var fee3 =  (Math.ceil((parseFloat(realprice)*3))/100).toFixed(2);
	var fee6 = (Math.ceil((parseFloat(realprice)*4))/100).toFixed(2);
	var fee12 = (Math.ceil((parseFloat(realprice)*5))/100).toFixed(2);
	var buyurl ="http://buy.coo8.com/cart/shoppingcart/additem2installmentcart.action?itype=1&itemnum=1&itemid="+pid;
	var s = "<div class='bd'><div class='Detail_Msg'><span><b>温馨提示：</b>分期付款商品暂不支持一次购买多个或同时购买延保服务，敬请谅解。</span><br/>"+
		"本商品支持以下银行信用卡分期付款：<br/><table><tr><th>银行</th><th>3期</th><th>6期</th><th>12期</th></tr>"+
		"<tr><td><img src='http://p1.51mdq.com/images/201107/banken/2.gif' /></td><td><p><em>"+price3+"元</em>×3期</p><p class='g-tip'>手续费:"+fee3+"元</p></td><td><p><em>"+price6+"元</em>×6期</p><p class='g-tip'>手续费:"+fee6+"元</p></td><td>"+
		"<p><em>"+price12+"元</em>×12期</p><p class='g-tip'>手续费:"+fee12+"元</p></td></tr></table><span class='Gray'>招商银行信用卡在线分期，无需人工审核，是更快速、更放心的分期支付方式。</span>"+
		"<ol class='LCNav'><li class='ZiNone'>分期付款流程：</li><li class='Zi'>申请分期付款</li><li class='b'></li><li class='Zi'>在线分期</li><li class='b'></li><li class='Zi'>库巴送货</li></ol>"+
		"</div><p class='Other'> <a href='http://www.coo8.com/help/fqfk.html' class='Cbule' target='_blank'>查看分期付款帮助</a><a href='"+buyurl+"' class='FQFKbtn3'>申请分期付款</a></p></div>"
	var t = $().popBx({html:s, title: '分期付款',width:'480px'}).open(); 
}
//点击加入收藏
function shoucang(e){
	urchinTracker('/Virtual/detail/shoucang.html');
	loginCheck(e,detailitem.base_url+'/product/'+detailitem.product_id+'.html','1',detailitem.product_id);
}


function showTime(c, t){
	if(!t){
		c.text("活动已结束");
		return;
	}
	var h=["剩余", (t.day=='00' ? '' : '<em>'+t.day + '</em>天'),
			'<em>'+t.hour+'</em>小时',
			'<em>'+ t.min+'</em>分',
			'<em>'+ t.second+'</em>秒'
			];
	c.html(h.join(''));
}
function saleOfLimitTime(tag, now){
	var x = tag;
	CT.push(x.attr("et"), now, function(t){
		showTime(x,t);
	});
}
function addBuynum(){
	var s = $("#buycount").val();
	if(!Numcheck(s)){
		s=1;
	}
	s = Number(s);
	s = s+1;
	$("#buycount").val(s);
	return false;
}
function reductBuynum(){
	 var s =$("#buycount").val();
	 if(!Numcheck(s)){
		$("#buycount").val(1);
		s=1;
	 }
	 s = Number(s);
	 if(s == 1){
        return;
	 } else {
        s = s-1;
	 }
	 $("#buycount").val(s);
	 return false;
}
function Numcheck(ss){ 
	var re = /^\+?[1-9][0-9]*$/;
	var stem = ss.indexOf(".");
   if(re.test(ss) && stem < 0) 
    { 
	   return true;
    } 
return false;
} 

function checkNum(){
	var s = $("#buycount").val();
	if(!Numcheck(s)){
		$("#buycount").val(1);
	}
}
function alreadyUse(){
	$("#shopping:not(span)").live("click",shoppingCar);
	$("#installment:not(span)").live("click",showInstallment);
	$("#installment:not(span)").live("mouseover",function(){
         $(this).siblings(".fqfk-pop-tip").show();
     });
	$("#installment:not(span)").live("mouseout", function(){
         $(this).siblings(".fqfk-pop-tip").hide();
	});
	$("#jnbtshopping:not(span)").live("click",jnbtshoppingCart)
//	$("#sdBuy:not(span)").live("click",showSdBuy);
	$("#favorite").click(shoucang);
	//抢购时间
	if($("#qianggou").attr("value") == 1 ){
		CT.init();
	    $.getScript('http://www.coo8.com/date.php', function() {
	    	saleOfLimitTime($("#qianggoutime"),start);
	    });
	}else if($("#cuxiao").attr("value") == 1){
		//促销时间
		CT.init();
	    $.getScript('http://www.coo8.com/date.php?a='+Math.random(), function() {
	    	saleOfLimitTime($("#cuxiaotime"),start);
	    });
	}
	$("#buycount").live("change",checkNum);
	$('.sns-share-con a[id!=moreicon]:gt(1)').hide();
	$('#moreicon').click(function(){	
		$('.sns-share-con a[id!=moreicon]:gt(1)').each(function(i, elem) {
			$(elem).toggle($(elem).css('display') == 'none');
 		});

		$(this).toggleClass("moreA");
	});
}
function orderCuxiao(){
	var properties = $("#item_propertys").val();
	if($.trim(properties) == "X"){
		return;
	}
	$("#ordercuxiao").hide();
	data = null;
	var url = "http://interface.coupon.coo8.com/admin/ProPromotion/interfaces/product.action?productId="+detailitem.productno+ "&random=" + Math.random();
	jQuery.getScript(url, function() {
       if(data ==null){
    	   ordercuxiao = 2;
    	   return;
       }
       
       var desc = " <dt>订单优惠：</dt><dd>"
       for(var i = 0; i < data.length; i++){
    	   var p = data[i];
    	   if(p.scheme == 1){
    		   desc += '<p><span class="imgico-mj"></span><label>'+p.ads+'</label>';
    	   }else{
    		   desc += '<p><span class="imgico-mf"></span><label>'+p.ads+'</label>';
    	   }
    	   if(p.url != null && p.url!=""){
			   desc += '<a href="'+p.url+'">查看详情</a>';
		   }
		   desc += '</p>';
       }
       desc += '</dd>';
       $("#ordercuxiao").html(desc);
       $("#ordercuxiao").show();
       ordercuxiao = 1;
       data = null;
	}) ;
}
$(function($) {
	alreadyUse();
	orderCuxiao();
})

