var ordercuxiao = 0;//�Ƿ��ж�����������������0����ʼֵ��1���У�2��û�У�
//���JS
var morepricearea = null;//һƷ�����Ʒ����JSON 
function detailurchinSend(o){
	try{
		o.each(function(){
	    	var u = $(this).attr("urchin");
	    	$(this).find("a").click(function(){
	    		urchinTracker(u);
	    	});
	    });
	}catch(e){};}

//��ȡ�ӱ�����
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
//   		var ybcontent = '<p>����ʱ���������ʡ�ģ�ά�޷�Χ���㣬������&nbsp;&nbsp;<em>[</em><a href="'+detailitem.base_url+'/yanbao/" target="_blank">�˽�����</a><em>]</em></p>'+
//   			'<p class="narrow"><label for="cs1"><input type="radio" name="cs" id="0"/>�������ӱ�</label>';
//   		for(var i=0;i<data.length;i++){
//   			ybcontent += '<label for="cs1"><input type="radio" name="cs" id="'+data[i].codeidid+'"/>'+data[i].baoyear+'���ӱ�'+data[i].memberprice+'Ԫ</label>';
//       	}
//    	ybcontent += '</p>';
//       	$('#YanbaoCon').html(ybcontent);
//       	$("#Yanbao").attr("va",1);
//       	$('#Yanbao').show();
//   });
//}
//��ȡ�޻���Ʒ�Ƽ�
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
   		var content = '<h3 id="other-tip"> ����ѡ������Ʒ�����꣬��ӭѡ��������Ʒ</h3><div class="other-list"><ul>';
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
//��������
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
			$("#yfdesc").html("���˷ѡ�");
		}else{
			$("#yfdesc").html("��ȡ�˷�"+data.freightPrice+"Ԫ��");
		}
		$("#J-stock-help").css("display","inline");
		if(detailitem.product_venderid == "2011102716210000"){
			var ps = "";
			if(data.goodsPattern == "G3PP" || data.goodsPattern == "3PP"){
				$("#wldesc").html("");
			}else if(data.goodsPattern == "3PL"){
				ps="������������";
				$("#wldesc").html("Ԥ���ʹ�����<em>"+data.comeTime+"</em>������<em>"+data.refuseOrderTime+"</em>���µ���ѡ��\"��������\"����"+ps+"������");
			}else{
				ps = "�������";
				$("#wldesc").html("Ԥ���ʹ�����<em>"+data.comeTime+"</em>������<em>"+data.refuseOrderTime+"</em>���µ���ѡ��\"��������\"����"+ps+"������");
			}
		}
	}else{
		$("#wldesc").html("�ܱ�Ǹ������Ʒ�޷���������ǰ���򣬻�ӭ�鿴����������");
   	}
}
//�Ƿ���ʾ�۸񱣻����л�ʱΪ0
function showJiaBao(kucunstate){
	var jbstate = $("#pricejiabao").attr("state"); // 0������Ҫ��1������Ҫ��
	if(jbstate == 0){
		$("#pricejiabao").hide();
		return;
	}
	//1294,1295, 1296, 1297, 1298, 1299, 1300, 1459
	//����Ʒ��׹/����;������Ʒ����/����/����������Ʒ��ָ������Ʒ���Σ���������Ʒ�����ս𣻹����������α�����
	if(detailitem.product_catid == "1294" ||detailitem.product_catid == "1295" ||detailitem.product_catid == "1296" ||detailitem.product_catid == "1297"
		 ||detailitem.product_catid == "1298" ||detailitem.product_catid == "1299" || detailitem.product_catid == "1230" || detailitem.product_catid == "1459" ){
		$("#pricejiabao").hide();
		return;
	}
	//��Ʒ�޻�
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
//��ȡ���״̬
function getKuCun(city_id,productid){
	var producttype = 0;//������Ʒ
	var kucunstate="";
	var states = ["�ֻ�","Ԥ��","�޻�","��;"];
	var classes = ["stock-status-yes","stock-status-yes","stock-status-no","stock-status-yes"];
	var wltext = ["","����ƷԤ��15-20��󷢻��������½⡣","�ܱ�Ǹ������Ʒ��ʱȱ������ӭ�鿴������Ʒ��","��Ʒ�ɹ�;�У�4-10������ɷ�����"];
//	var wltext = ["","","",""];
	$("#wldesc").html("");
	$("#kcdesc").html("");
	$("#yfdesc").html("");
	$("#J-stock-help").hide();
 	if(detailitem.isMorePrice){
 		detailitem.product_id = productid;
 	}
	//�¼���Ʒ�����ʿ��
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
			"&county=" + detailitem.countyID + "&a=" + Math.random(); // FIXME ���������Ƿ�ĺã�diqu_id
		jQuery.getScript(ccurl, function() {
			if(data == null){
				return ;
			}
			detailitem.kucunstatus = data.storeStatus;//ȫ�ֱ����������ж���ʾ��ͼ�е����������Ƿ���ʾ
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
			detailitem.kucunstatus = data.storeStatus;//ȫ�ֱ����������ж���ʾ��ͼ�е����������Ƿ���ʾ
			kucunstate = states[detailitem.kucunstatus];
			$("#kcdesc").attr("class",classes[detailitem.kucunstatus]);
			$("#kcdesc").text(kucunstate);
			canbuy(detailitem.kucunstatus);
			//��3���̼����޻�״̬�²���ʾ����״̬
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

//����ť�����繺��ť�Ƿ���Ч
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
//���ڸ��ť�Ƿ���Ч
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
		//�ײ�,�������ťʧЧ
       	$(".colB .go2buy").each(function(){
       	   var href =  $(this).attr("href");
       	    $(this).replaceWith("<span href='"+href+"' class='go2buy'></span>");
       	});
	}else{
		//�ײͣ��������ť��Ч
       	$(".colB .go2buy").each(function(){
       	   var href =  $(this).attr("href");
       	    $(this).replaceWith("<a href='"+href+"' class='go2buy' onClick='urchin(4);'></a>");
       	});
	}
}

//��ͨ��Ʒ����ѡ��
function checkdiqu(){
	var arr = $.cookie("diquID");
	var plat = $.cookie("diquPlat");//��ʶ�û�cookie�еĳ���ID�Ƿ�Ϊ�³���ID
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
		e.message = e.message + "  : ģ��" +��m;
		throw(e);
	}
}
//����һƷ�����Ʒ����ʱ����ȡ��Ʒ���ײͣ�����������ȣ��ӱ���ȡ�ڿ�淽����
function changeItem(productid,status){
	detailitem.product_id = productid;
	$("#p_id").attr("value",productid);//���ۣ���ѯʹ��
	var did=parseInt(productid/1000);
	$("#itemimg").attr("src","http://price.51mdq.com/iprice/"+did+"/"+productid+",4.png");
	//��ȡ����������Ϣ
	orderCuxiao();
	//��ȡ��Ʒ9��۱��飨9��۱���
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_jiabao.html?a="+Math.random(),function(res){
			$("#price-note #pricejiabao").remove();
			if(res==null || res==""){
			} else {
				$(res).appendTo("#price-note");
			}
		   	showJiaBao(status);
		});
	}, "��ȡ9��۱�");
	//һƷ�����Ʒ��ȡ���״̬������Ʒ�ֻ���Ԥ������;ʱ�������ӱ�����
//	if(detailitem.kucunstatus!=2){
//		yanbaofuwu();
//	}
	//��ȡ����
	getPointLink();
	//��ȡ��Ʒ���ڰ�ť
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
	}, "��ȡ���ڰ�ť");
	//��ȡ������
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_gift.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#item_gift").hide();
			} else {
				$("#item_gift").html(res);
				$("#item_gift").show();
			}
		});
	}, "��ȡ��Ʒ����");
	//��ȡ��Ʒhtml
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
	}, "��ȡ��Ʒ");
	
	//��ȡ������Ϣhtml
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_cuxiao.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#cuxiao").hide();
			} else {
				$("#cuxiao").html(res);
				$("#cuxiao").show();
			}
		});
		
	}, "��ȡ������Ϣ");
	//��ȡ�ײ�������˵�html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_Accessories_left.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#moreprice_accesso").hide();
			} else {
				$("#moreprice_accesso").html(res);
				$("#moreprice_accesso").show();
			}
		});
	}, "��ȡ�ײ�������˵�");
	
	//��ȡ�Ż��ײ�html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_youhuitaocan.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#moreprice_yhtc").hide();
			} else {
				$("#moreprice_yhtc").html(res);
				$("#moreprice_yhtc").show();
			}
			$(".pItem:visible .thumbPannel").cooMarquee();//��ʾ���ײ����Ҽ�ͷ
			$(".pItem:visible .thumbPannel").attr("num",1);
			tccanbuy();
			detailurchinSend($("#tccon"));
		});
	}, "��ȡ�Ż��ײ�");
	
	//��ȡ�Ƽ����html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_tuijianpeijian.html?a="+Math.random(),function(res){
			if(res==null || res==""){
				$("#moreprice_tjpj").hide();
			} else {
				$("#moreprice_tjpj").html(res);
				$("#moreprice_tjpj").show();
			}
			$("#pParts").cooMarquee();//������Ҽ�ͷ
			$("#pParts").attr("num",1);
			tccanbuy();
			detailurchinSend($("#pjcon"));
		});
	}, "��ȡ�Ƽ���");
	//��ȡ���ﳵ�޹�html
	catchControl(function(){
		jQuery.get(detailitem.base_url+"/pblock/"+did+"/"+productid+"/b_shop_buycount.html?a="+Math.random(),function(res){
			if(res==null || res==""){
			} else {
				$("#choose-num").html(res);
			}
		});
	}, "��ȡ���ﳵ�޹�html");
}

//һƷ�����Ʒ����ѡ��
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
//��ȡ��������
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
	            	content="";//��������html
	            var selects="";
	            for(var p in json){
	                if(p!="selected"){
	                	var svalue="";//��ѡ�������ֵ
	                    selects=(select+"").split(",");
	                    for(var i=0;i<selects.length;i++){
	                        var svalues = selects[i].split("^");
	                        if(p == svalues[0]){
	                            svalue=svalues[1];
	                            break;
	                        }
	                    }
	                    var jsons = (json[p]+"").split(",");
	                	content += '<dl class="pProps"><dt>'+p+'��</dt> <dd>';
	                	for(var i=0;i<jsons.length;i++){
                            var jsonss =  jsons[i].split("^");
                        	if(jsonss[3]=="null"){
                        		//��ʾ����
                        		if(svalue==jsonss[0]){
 	                            	content += '<div class="pProp on"><a href="'+detailitem.base_url+'/product/'+jsonss[1]+'.html" title="'+jsonss[0]+'">'+jsonss[0]+'</a></div>';
 	                            } else {
 	                            	content += '<div class="pProp"><a href="'+detailitem.base_url+'/product/'+jsonss[1]+'.html" title="'+jsonss[0]+'">'+jsonss[0]+'</a></div>';
 	                            }
                        	}else{
                        		//��ʾͼƬ
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
teshushuxing();//��������
/**
 * ƴ�ӹ��ﳵurl,���ǹ����������ӱ�
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
//������ﳵ
function shoppingCar(){
	var pid = $("#p_id").attr("value");
	var url = "http://buy.coo8.com/interfaces/shoppingcart/additem2cart.action?";
//	var url = "http://buy.coo8.com/cart/shoppingcart/addnormalcart.action?";
	var curl = getShoppingcartUrl(url);
	$("#shopping").attr("href",curl);
}
//������ܲ������ﳵ
function jnbtshoppingCart(){
	var pid = $("#p_id").attr("value");
	var curl = "http://buy.coo8.com/interfaces/shoppingcart/additem2cart.action?itype=1&itemnum=1&itemid="+pid;
	$("#jnbtshopping").attr("href",curl);
}
function closePop(){
	$(".popWrap").remove();
}

//������繺��ť
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
          	 //�����ʾû�����繺��ַ����ת
      		   var html1='<table><tr><td style="padding: "><img src="http://p4.51mdq.com/images/Boderh2Bg.gif" /></td><td style="padding: 5px 0;"><p style="margin: 0 0 10px">��ѡ���ġ�<span style="color:#F00;">'+Myjson.message+'</span>����Ʒ�������ޣ�Ϊ�˱�֤�����ķ�����������Ҫ��֤�ֻ���ſ��Թ���</p><p>������ȥ<a href="http://my.coo8.com/ucenter/userInfo.action" class="FQFKbtn2 pop-close">�û�����-��������</a>������ֻ���֤��</p></td></tr></table>';
					$().popBx({html:html1, title: '��ʾ',width:'425px'}).open(); 
					sdcanbuy(0);
					return false;
             }
			else {
            	if (Myjson.message == "NORECEIPTTOPULL"){
                 	//�����ʾû�����繺��ַ����ת
	             	var msg = '<div style="margin: 0 5px;padding: 15px 0 20px; border-bottom: 1px solid #E6E6E6;">'
	                   		 +'<p style="color: #F00; text-align: center;" ><b>��ܰ��ʾ��</b>��������Ĭ�ϵ����繺��ַ��������ɺ��Զ��ύ���ζ�����</p>'
	                   		 +'<p style="padding: 25px 0 0 165px;"><a onclick="closePop();" href="http://my.coo8.com/UCenter/AccessAddressOneKeyAdd.aspx?iforder=1&itemid='
	                   		 +detailitem.product_id+'&ct='+$('#buycount')[0].value
	                   		 +'" target="_blank" style="display: block;width: 81px; height: 27px; background: url(http://p1.51mdq.com/images/201107/SDGbtn.jpg) 0 0;"></a>'
	                   		 +'</p></div><dl style="margin: 0 5px;">'
	                   		 +'<dt style="font-weight: 700; background:url(http://s.51mdq.com/images/201107/SDGbtn.jpg) no-repeat -90px 15px; padding: 10px 0 5px 15px;">ʲô�����繺��</dt>'
	                   		 +'<dd style="text-indent: 15px;">���繺���������µ����̣�һ�ε�������ֱ���ύ������</dd><dt style="font-weight: 700; background:url(http://s.51mdq.com/images/201107/SDGbtn.jpg) no-repeat -90px 15px; padding: 10px 0 5px  15px;">���繺��ʲô�ô���</dt><dd style="text-indent: 15px;">һ����λ��Ϊ����ʡ����ʱ�䡣</dd></dl>'
 					$().popBx({html:msg, title: '���繺',width:'433px'}).open(); 
					sdcanbuy(0);
            	} else if(Myjson.message == 'USERNOTLOGIN'){
                 	loginCheck($(this),detailitem.base_url+'/product/'+detailitem.product_id+'.html','0');
            	} else {
            		var msg = '<div style="margin: 0 5px;padding: 15px 0 20px;">'
	                   		 +'<p style="color: #F00; text-align: center;"><b>��ܰ��ʾ��</b>'+Myjson.message+'</p>'
	                   		 +'<p style="padding: 25px 0 0 165px;"></p></div>';
	              	var t = $().popBx({html:msg, title: '���繺',width:'433px'}).open(); 
	              	sdcanbuy(0);
            	}
            	return false;
			}
		},
		error: function() {
			sdcanbuy(0);
			var msg = '<div style="margin: 0 5px;padding: 15px 0 20px; ">'
					+'<p style="color: #F00; text-align: center;"><b>��ܰ��ʾ��</b>������æ�����Ժ����ԣ�</p>'
				 	+'<p style="padding: 25px 0 0 165px;"></p></div>';
			$().popBx({html:msg, title: '���繺',width:'433px'}).open(); 
     	}
	});
}

//������ڸ��ť
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
	var s = "<div class='bd'><div class='Detail_Msg'><span><b>��ܰ��ʾ��</b>���ڸ�����Ʒ�ݲ�֧��һ�ι�������ͬʱ�����ӱ����񣬾����½⡣</span><br/>"+
		"����Ʒ֧�������������ÿ����ڸ��<br/><table><tr><th>����</th><th>3��</th><th>6��</th><th>12��</th></tr>"+
		"<tr><td><img src='http://p1.51mdq.com/images/201107/banken/2.gif' /></td><td><p><em>"+price3+"Ԫ</em>��3��</p><p class='g-tip'>������:"+fee3+"Ԫ</p></td><td><p><em>"+price6+"Ԫ</em>��6��</p><p class='g-tip'>������:"+fee6+"Ԫ</p></td><td>"+
		"<p><em>"+price12+"Ԫ</em>��12��</p><p class='g-tip'>������:"+fee12+"Ԫ</p></td></tr></table><span class='Gray'>�����������ÿ����߷��ڣ������˹���ˣ��Ǹ����١������ĵķ���֧����ʽ��</span>"+
		"<ol class='LCNav'><li class='ZiNone'>���ڸ������̣�</li><li class='Zi'>������ڸ���</li><li class='b'></li><li class='Zi'>���߷���</li><li class='b'></li><li class='Zi'>����ͻ�</li></ol>"+
		"</div><p class='Other'> <a href='http://www.coo8.com/help/fqfk.html' class='Cbule' target='_blank'>�鿴���ڸ������</a><a href='"+buyurl+"' class='FQFKbtn3'>������ڸ���</a></p></div>"
	var t = $().popBx({html:s, title: '���ڸ���',width:'480px'}).open(); 
}
//��������ղ�
function shoucang(e){
	urchinTracker('/Virtual/detail/shoucang.html');
	loginCheck(e,detailitem.base_url+'/product/'+detailitem.product_id+'.html','1',detailitem.product_id);
}


function showTime(c, t){
	if(!t){
		c.text("��ѽ���");
		return;
	}
	var h=["ʣ��", (t.day=='00' ? '' : '<em>'+t.day + '</em>��'),
			'<em>'+t.hour+'</em>Сʱ',
			'<em>'+ t.min+'</em>��',
			'<em>'+ t.second+'</em>��'
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
	//����ʱ��
	if($("#qianggou").attr("value") == 1 ){
		CT.init();
	    $.getScript('http://www.coo8.com/date.php', function() {
	    	saleOfLimitTime($("#qianggoutime"),start);
	    });
	}else if($("#cuxiao").attr("value") == 1){
		//����ʱ��
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
       
       var desc = " <dt>�����Żݣ�</dt><dd>"
       for(var i = 0; i < data.length; i++){
    	   var p = data[i];
    	   if(p.scheme == 1){
    		   desc += '<p><span class="imgico-mj"></span><label>'+p.ads+'</label>';
    	   }else{
    		   desc += '<p><span class="imgico-mf"></span><label>'+p.ads+'</label>';
    	   }
    	   if(p.url != null && p.url!=""){
			   desc += '<a href="'+p.url+'">�鿴����</a>';
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

