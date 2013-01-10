var delurl="http://buy.coo8.com/cart/shoppingcart/deleteshoppingcartitemsmall.action";
var Cart=Cart||{};
Cart.url="http://buy.coo8.com/cart/shoppingcart/queryshoppingcartcount.action";
 
Cart.initialize=false;
Cart.makeSingleItemStringArray=function(price,count,name,img,itemId,itemtype,refmainitemid,isNeedLink){
    var startLink="<a href='http://www.coo8.com/product/"+(isNeedLink?itemId:refmainitemid)+".html' target='_blank' >";
    var endLink="</a>";
    var box=[	"<li class='clearfix'>",
             		"<div class='pic'>",startLink,"<img src='",img,"' width='50px' height='50px' />",endLink,"</div>",
             		"<div class='title'>",startLink,name,endLink,"</div>",
             		"<div class='info'><em>￥<b>",price,"</b><span>×",count,"</span></em>","<a class='del' href='javascript:void(0);' tid='",itemId,"' ttype='",itemtype,"' tmid='",refmainitemid,"'>删除</a></div>",
             	"</li>"
             ];
    return box.join("");
};

Cart.reset=function(){
    this.initialize=true;
    setTimeout(function(){
        Cart.initialize=false;
    },10000);
};

Cart.resovleData=function(data){
    if(typeof(data)=='undefined'||data==null||typeof(data.allitemcount)=='undefined'||data.allitemcount==null||data.allitemcount==0){
        $("#cart_count").text(0);
        $("#myCart .bd").html("<p class='mcTip'>你买或者不买，商品就在这里；<br>你信或者不信，库巴就是便宜。 </p>");
    }else{
        var html=[];
        html.push("<ul class='list'>");
        $.each(data.taocanList,function(i,item){
            html.push(Cart.makeSingleItemStringArray(item.itemprice,item.itemcount,item.itemname,item.mainItemImage,item.itemId,item.itemtype,item.refmainitemid,false));
        });
        $.each(data.shangpinList,function(i,item){
            html.push(Cart.makeSingleItemStringArray(item.itemprice,item.itemcount,item.itemname,item.itemImage,item.itemId,item.itemtype,item.refmainitemid,true));
        });
        /*$.each(data.yanbaoList,function(i,item){
            html.push(Cart.makeSingleItemStringArray(item.itemprice,item.itemcount,item.itemname,'http://p1.51mdq.com/images/yanbao-ctr.gif',item.itemId,item.itemtype,item.refmainitemid,false));
        });*/
        html.push("</ul>");
    	html.push("<div class='ft clearfix'>");
	        html.push("<p class='total'>共<em>",data.allitemcount,"</em>件商品 金额合计：<strong>￥<b>",data.price,"</b></strong></p>");
	        html.push("<a class='btnCheckout' href='http://buy.coo8.com/cart/shoppingcart/queryshoppingcart.action'><span>去购物车并结算</span></a>");
        html.push("</div>");
        $("#cart_count").text(data.allitemcount);
        $("#myCart .bd").html(html.join(""));
        $("#myCart .bd").find(".del").one("click",function(){
            $.getJSON(delurl+"?callback=?"+"&cartitemid="+$(this).attr("tid")+"&itype="+$(this).attr("ttype")+"&refmainitemid="+$(this).attr("tmid"),function(data){
                Cart.resovleData(data);
            });
            return false;
        });
    };
};
Cart.queryCount=function(){
	$("#cart_count").text($.cookie("cartItemCount")||0);
};
Cart.queryData=function(){
    $("#myCart .bd").addClass("cart-load");
    $("#myCart .bd").html("");
    Cart.reset();
    $.getJSON(Cart.url+"?callback=?",function(data){
        Cart.resovleData(data);
        $("#myCart .bd").removeClass("cart-load");
    });
};

Cart.hide=function(){
    $("#myCart .bd").fadeOut(200);
};

Cart.show=function(){
    $("#myCart .bd").fadeIn(300);
    if(this.initialize){
        return false;
    };
    
    Cart.queryData();
    $("#myCart").addClass("myCart-hover");
};




var Suggest={preValue:""};

Suggest.hide = function(){
    $(searchResultDiv).hide();
    $(".suggestContent li").removeClass("hover");
	Suggest.setInputValue(function(){
    	$(searchInputId).val(Suggest.preValue);
    });
};

Suggest.hide2 = function(){
    $(searchResultDiv).hide();
    $(".suggestContent li").removeClass("hover");
};

Suggest.sendSuggestRequest=function(value){
	 if($.trim(value)==""){
    	$(searchResultDiv).hide();
    	$(searchResultDiv).empty();
    	return;	
	   }
    var url='http://www.coo8.com/interfaces/search/showRecommendTerm.action?searchKeywords='+encodeURIComponent(encodeURIComponent(value));
    $.getScript(url,function(){
        Suggest.handSuggestReponse(q_result);
    });
};

Suggest.resolvingResult=function(result){
    if(typeof(result)=='undefined'||result==null||result.length==0)return"";
    var content=[];
    for(var i=0;i<result.length;i++){
        content.push("<li class=''><span class='srchKeyword'> ");
        content.push(result[i].t,"</span><em>约");
        content.push(result[i].n,"条</em></li>");
    };
    return content.join("");
};

Suggest.handSuggestReponse=function(result){
    var content=Suggest.resolvingResult(result);
    if(content==""){
        $(searchResultDiv).empty();
        Suggest.hide2();
        return false;
    };
    
    $(searchResultDiv).html(content);
    $(searchResultDiv).show();
    result=[];
    
    $(".suggestContent li").hover(function(){
        $(this).addClass("hover").siblings().removeClass("hover");
    }, function(){
        $(this).removeClass("hover");
    }).click(function(){
    	var v = $(this).find("span").text();
    	Suggest.setInputValue(function(){$(searchInputId).val(v);});
        Suggest.submits(v);
    });
};

Suggest.isHideOrEmpty=function(){
    return $(searchResultDiv)[0].style.display=="none"|| $(".suggestContent li").length == 0;
};

Suggest.isNoneSelect = function(){
	return $(searchResultDiv).find(".hover").length == 0;
}

Suggest.upSelectItem=function(){
	if(Suggest.isNoneSelect()){
		$(searchInputId).val($(searchResultDiv).find("li:last span").text());
		$(searchResultDiv).find("li:last").addClass("hover");
	} else {
		Suggest.moveSelectItem(true);
	}
};

Suggest.moveSelectItem = function(up){
	var l = $(searchResultDiv).find(".hover");
	var down = !up;
	if((l.index() == 0 && up) || ($(searchResultDiv).find("li").size() == (l.index() + 1) && down)) {
		$(searchInputId).val(Suggest.preValue);
		l.removeClass("hover");
		return;
	}
	
	if(up){
		l.prev().addClass("hover").siblings().removeClass("hover");
		$(searchInputId).val($(searchResultDiv).find(".hover").find("span").text());
	}else{
		l.next().addClass("hover").siblings().removeClass("hover");
		$(searchInputId).val($(searchResultDiv).find(".hover").find("span").text());
	};
};

Suggest.downSelectItem=function(){
    if(Suggest.isNoneSelect()){
    	$(searchInputId).val($(searchResultDiv).find("li:first span").text());
    	$(searchResultDiv).find("li:first").addClass("hover");
    }else{
    	Suggest.moveSelectItem(false);
    };
};

Suggest.reShowSuggestion=function(call){
    if(Suggest.isHideOrEmpty()){
       $(searchResultDiv).show();
    }else{
        Suggest.setInputValue(call);
    };
};

var upKeyCode=38;
var downKeyCode=40;
var escKeyCode=27;
var enterKeyCode=13;

Suggest.onkeyupFun=function(e){
    var event=window.event||e;
    switch (event.keyCode) {
	case upKeyCode:
		Suggest.reShowSuggestion(Suggest.upSelectItem);return false;
	case downKeyCode:
		Suggest.reShowSuggestion(Suggest.downSelectItem);return false;
	case escKeyCode:
		isTrigger=false;
		Suggest.reShowSuggestion(Suggest.hide);
		isTrigger = false;
	    setTimeout(function(){isTrigger=true;},10);
		return false;
	case enterKeyCode:
		var obj = $(searchInputId).val();
		Suggest.submits(obj);return false;
	};
};

Suggest.setInputValue=function(call){
    isTrigger=false;
    call();
    isTrigger=true;
};

var isTrigger=true;
var isAutoSend=false;

Suggest.valueChange=function(){
    if(isAutoSend){
        isAutoSend=false;
        return false;
    };
    
    if(!isTrigger){
        return false;
    };
    
    Suggest.preValue = $(searchInputId).val();
    Suggest.sendSuggestRequest(Suggest.preValue);
    return false;
};

Suggest.onInputBlur=function(){
    setTimeout(function(){    	
        Suggest.hide();
    },100);
};

Suggest.submits = function (obj) {
//	var obj = $(searchInputId).val();
//	if (escape($(searchInputId).val()).indexOf("%u") == -1) {
//		if ($(".suggestContent li").length > 0) {
//			obj = $(searchResultDiv).find("li:first span").text();
//		}
//	}	
	window.location.href="http://www.coo8.com/interfaces/search/showSearchResult.action?searchKeywords=" + encodeURIComponent(encodeURIComponent(obj)); 
};

function clickSearch(){
	var obj = $(searchInputId).val();
    Suggest.submits(obj);
};

function ppkRead(name, second) {
    if (!second) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    } else {
        var val = ppkRead(name);
        if (val) {
            var arr = val.split('&');
            for (var i = 0, len = arr.length; i < len; i++) {
                if (arr[i].indexOf(second) > -1) {
                    return arr[i].substring(arr[i].indexOf("=") + 1);
                }
            }
            return null;
        }
        return null;
    }
}
function ManageCPSCookie(userName){
    var cpsCookie = $.cookie("COO8CPS_KEY");
    if (cpsCookie != null && cpsCookie.indexOf("PartnerCode=1015")>=0)
    {
        if (!(userName.substring(0, 2) == "QQ" && userName.substring(2).length == 15))
        {
        	deleteCookie("COO8CPS_KEY","/","coo8.com");
        }
    }
}
function getTitle() {
    var loginUser = new Object();
    loginUser.UserId = ppkRead("UserInfo", "UserId");
    loginUser.UserName = decodeURIComponent(ppkRead("UserInfo", "UserName"));
    loginUser.NickName = decodeURIComponent(ppkRead("UserInfo", "NickName"));
    loginUser.Token = ppkRead("UserInfo", "Token");
    loginUser.Security = ppkRead("UserInfo", "Security");
    var nickName = $.cookie("JUN");
    if (loginUser.Token != null
    && loginUser.UserId != null
    && loginUser != null) {
    	ManageCPSCookie(loginUser.UserName);
        var showName = (loginUser.NickName == "" || loginUser.NickName == null || loginUser.NickName=="null") ? loginUser.UserName : loginUser.NickName;
        return ["<span class='welcome'>", showName ,"，您好，欢迎回来！</span><a class='login' href='javascript:logout();'>[退出]</a>"].join("");
    }
    else {
    	if(nickName!=null && nickName!=""){
    		return ["<span class='welcome'>", nickName ,"，您好，欢迎光临库巴购物网！</span><a class='login' href='javascript:login();'>请登录</a><a class='register' style=\"color:#EA5504;\" href='javascript:regist();'>免费注册</a>"].join("");
    	}else{
    		return "<span class='welcome'>您好，欢迎光临库巴购物网！</span><a class='login' href='javascript:login();'>请登录</a><a class='register' style=\"color:#EA5504;\" href='javascript:regist();'>免费注册</a>";
    	}
    }
}
function $$() {
    var id = document.getElementById("loginfo");
    if (id) {
        id.innerHTML = getTitle();
    }
}
function login(){
    var url="https://passport.coo8.com/sso/transfer.action?t=login&ReturnUrl="+escape(top.document.URL);
    window.location.href=url;
};

function logout(){
	var url = "https://passport.coo8.com/sso/login/logout.action";
	window.location.href=url;
};

function regist(){
    var url="https://passport.coo8.com/sso/transfer.action?t=reg&ReturnUrl="+escape(top.document.URL);
    window.location.href=url;
};
function cookiecity(){
	if (!$.cookie("del_diqu") || (($.cookie("del_diqu") - 0) > 1)){/*一个周左右要删掉*/
		$.cookie("diquID", null, {path:'/'});
		$.cookie("del_diqu","2",{path:'/',expires:30*24*60*60, domain:".coo8.com"})
	}
	var plat = $.cookie("diquPlat");//标识用户cookie中的城市ID是否为新城市ID
	var arr = $.cookie("diquID");
	if(arr){
		var idStr=unescape(arr);
  		var diquValue = idStr.split(",");
  		if(diquValue.length >= 6 && plat!=null){
  			return false;
  		}
	}

	var provinceID="11000000",provinceName="北京市",
		cityID="11050000",cityName="东城区",
		countyID="11050100",countyName="三环内";
	var curl = "http://www.coo8.com/front/checkIp/ipToCity.action?callback=?&a=" + Math.random();
	$.getJSON(curl,function(res){
		if(res!=null){
			provinceID=res.provinceid;
			provinceName=res.provincename;
			cityID=res.cityid;
			cityName=res.cityname;
			countyID=res.countyid;
			countyName=res.countyname;
		}
		setAreaCookie(provinceID, provinceName,cityID,cityName,countyID,countyName);
	});
};

function setAreaCookie(provinceid,provincename,cityid,cityname,countyid,countyname) {
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

var searchInputId = "#searchKeywords";
var searchResultDiv = "#suggestionDiv";
$(document).ready(function(){
    $("#J-quick-menu .menu-item .sub-menu").hover(function(){
            $(this).addClass("sub-menu-hover");
        }, function(){
            $(this).removeClass("sub-menu-hover");
    });
    
    var _isOut = true, _timer1 = null, _timer2 = null;
    $("#myCart").hover(function(){
        if(_isOut){
        _timer1 = setTimeout(function(){
            Cart.show();
            _isOut = false;
        }, 150);
        } else {
        clearTimeout(_timer2);
        }
    },function(){
        if(!_isOut){
        _timer2 = setTimeout(function(){
            Cart.hide();
            _isOut = true;
        }, 150);
        } else {
        clearTimeout(_timer1);
        }
    });
   
    $("#AllCategories").one("mouseover",function(){
        $.ajax({
            url:"/mblock/11/b_all_catalog.html?a="+Math.random(),
            dataType:"html",
            contentType:"text/html",
            success:function(data){
                $("#allCatalogBlock").html(data);
            }
        });
    });
    if(!$("#AllCategories").attr("f")){
        $("#AllCategories").hover(function(){
            $(this).addClass("ACHover");
        },function(){
            $(this).removeClass("ACHover");
        });
    }

	if($(searchInputId)[0]){
		$(searchInputId).keydown(Suggest.onkeyupFun);
		$(searchInputId).blur(Suggest.onInputBlur);		
	    if("\v"=="v"){
	        isAutoSend=true;
	        $(searchInputId)[0].onpropertychange=Suggest.valueChange;
	    }else{
	        $(searchInputId)[0].addEventListener("input",Suggest.valueChange,false);
	    };
	    
	    $("#sumitButton").click(clickSearch);
	};
	Cart.queryCount();
	cookiecity();
	return false;
});


/*
 * 读地区的cookie
 */
function getcookie(){
	var diquValue = "";
	var diquID = "";
	var arr=document.cookie.match(new RegExp("(^| )diquID=([^;]*)(;|$)"));
	if(arr!=null){
		var idStr=unescape(arr[2]);
		 diquValue = idStr.split(",");
		if(diquValue.length >=4){
			var provinceid = diquValue[0].replace('\"','');
			if(isZXS(provinceid)){
				return provinceid;
			}else{
				return diquValue[2].replace('\"','');
			}
		}
	}
	return 11000000;
}
function isZXS(cityid){
	 if(cityid==11000000 || cityid==12000000 || cityid==21000000 || cityid==74000000 || cityid == 83000000 || cityid == 82000000 || cityid == 81000000){
		 return true;
	 }
	 return false;
}
function getDiquName(){
	var diquValue = "";
	var diquID = "";
	var diquName="";
	var arr=document.cookie.match(new RegExp("(^| )diquID=([^;]*)(;|$)"));
	if(arr!=null){
		var idStr=unescape(arr[2]);
		 diquValue = idStr.split(",");
		if(diquValue.length >= 4){
			var provinceid = diquValue[0].replace('\"','');
			var diquNames;
			if(isZXS(provinceid)){
				diquNames = diquValue[1].split(":");
			}else{
				diquNames = diquValue[3].split(":");
			}
			for(var i=0;i<diquNames.length-1;i++){
				diquName+=String.fromCharCode(diquNames[i]);
			}
		}
	}else{
		diquName="北京市";
	}
	return diquName;
}
function isWidthScreen(){
	return screen.width >= 1280;
}

/*
 * 广告 方玉
 * */
function advertisementSystem () {
	var cataid;
	var spaceid;
	var areaid = getAreaId();
	function loadad(cataid,spaceid,addiv,callbackFunction,isscreennotchange, count){
		var addiv1 = $('#' + addiv);
//		if (!isscreennotchange) {
//			if (screen.width>=1280){//如果是宽屏
//				spaceid=spaceid+"_big";
//			}
//		}
		var adUrl = '/gg/' + spaceid + "/" + cataid + "/" + spaceid + '_' + cataid + '_' + areaid + '.html';
        $.ajax({
            url         : adUrl,
            dataType    : "json",
            error       : function(){},
            cache       : false,
            success     : function(data){
                var ad = data.adList;
                if(!ad){
                    return ;
                }
                callbackFunction(data, addiv1, count);
            }
        });
	}
	function getAreaId(){
		var rv = getcookie();
		if(rv){
			return rv;
		}else{
			return "11000000";
		}
	}
	return {
		/**
		 * 加载广告接口
		 * 
		 * 参数:
		 * cataid分类ID,
		 * spaceid广告位ID,
		 * addiv广告位DIV的ID,
		 * callbackFunction回调函数，目前有几个，如果是显示第一个传jsonm0，焦点图传jsonm1，友情链接传jsonm2，精彩活动传jsonm3，广告列表jsonm4,以后如果有其它样式，自己写JS
		 * isscreennotchange宽窄屏不同时广告大小不变（true，不分宽窄屏，false分宽窄屏）
		 * count 回调函数是jsonm4时广告列表中的广告个数,值为0时展示所有返回的广告
		 */
		loadAdvertisement : function(cataid,spaceid,addiv,callbackFunction,isscreennotchange, count){
			loadad(cataid,spaceid,addiv,callbackFunction,isscreennotchange, count);
		}
	}
}


/**
 * 显示第一个
 */
function jsonm0(adspacejson,addiv){
	var ad = adspacejson.adList[0];
	var htmlContent="";
	//看看是什么类型的广告，拼接的不同
	if(!ad){
		return;
	}
	if(ad.type==1){
		var link = ad.picturelink;
		var url;
		if (adspacejson.screentype == 'big' && isWidthScreen()) {
			url = ad.pictureurlbig;
		} else {
			url = ad.pictureurl;
		}
		var tishi = ad.tishi;
		htmlContent += "<a href='" + link + "' target='_blank' alt='" + tishi + "'><img src='" + url + "'/></a>";
	}else if(ad.type==2){
		htmlContent += ad.code;
	}else if(ad.type==3){
		var link = ad.wenzilink;
		var wenzicode = ad.wenzicode;
		var width = ad.wenziwidth;
		htmlContent += "<a href='" + link + "' target='_blank' ><font size='" + width + "'>'" + wenzicode + "'</font></a>";
	}else if(ad.type==4){
		var url = ad.flashurl;
		var width = adspacejson.width;
		var height = adspacejson.height;
		if (isWidthScreen()) {
			width = adspacejson.widthbig;
			height = adspacejson.heightbig;
		}
		htmlContent = 
			"<object type='application/x-shockwave-flash' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' id='A78090_swf' width='" + width + "' height='"+height+"'>"
			+"<param value='" + url + "' name='movie'>"
			+"<param value='High' name='quality'>"
			+"<param value='opaque' name='wmode'>"
			+"<param value='always' name='allowscriptaccess'>"
			+"<param value='adlink=&amp;_did=2882465' name='flashvars'>"
			+"<embed flashvars='adlink=&amp;_did=2882465' allowscriptaccess='always' wmode='opaque' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' quality='High' src='" + url + "' id='A78090_swf' width='" + width + "' height='" + height + "'>"
			+"</object>";
	}
	addiv.html(htmlContent);
}
/**
 * 根据JSON对象拼出焦点图样式
 */
function jsonm1(adspacejson,addiv){
	var htmlContent = "<ul class='slider-wrap' style='top: -615px;'>";
	if (adspacejson.screentype == 'big' && isWidthScreen()) {
		$.each(adspacejson.adList,function(i,ad){
			htmlContent += "<li><a href='" + ad.picturelink + "' target='_blank'><img alt='" + ad.tishi + "' title='" + ad.tishi + "' src='" + ad.pictureurlbig + "'></a></li>";
		});
	} else {
		$.each(adspacejson.adList,function(i,ad){
			htmlContent += "<li><a href='" + ad.picturelink + "' target='_blank'><img alt='" + ad.tishi + "' title='" + ad.tishi + "' src='" + ad.pictureurl + "'></a></li>";
		});
	}
    htmlContent += "</ul>";
	addiv.html(htmlContent);
	addiv.cooSlider();
}
/** 
 * 根据JSON对象拼出滚动样式一（友情链接）
 */
function jsonm2(adspacejson,addiv){
	var htmlContent = "<a href='javascript:void(0);' hidefocus='true' class='thumbPrev'></a>" + 
	"<div class='thumbCon'>" + 
	"<div style='left: 0px;' class='thumbItems'>";
	if (adspacejson.screentype == 'big' && isWidthScreen()) {
		$.each(adspacejson.adList,function(i,ad){
			htmlContent += "<div class='thumbItem'><a href='" + ad.picturelink + "' target='_blank'><img alt='" + ad.tishi + "' src='" + ad.pictureurlbig + "'></a></div>";
		});
	} else {
		$.each(adspacejson.adList,function(i,ad){
			htmlContent += "<div class='thumbItem'><a href='" + ad.picturelink + "' target='_blank'><img alt='" + ad.tishi + "' src='" + ad.pictureurl + "'></a></div>";
		});
	}
	htmlContent += "</div>" + "</div>" +
	"<a href='javascript:void(0);' hidefocus='true' class='thumbNext thumbNextA'></a>";
	
	addiv.html(htmlContent);
	addiv.cooMarquee();
}
/**
 * 根据JSON对象拼出滚动样式二（精彩活动）
 */
function jsonm3(adspacejson,addiv){
	//去模版里面找
	var htmlContent = "<a class='thumbPrev' hidefocus='true' href='javascript:void(0);'></a>" + 
	"<div class='thumbCon'>" + 
		"<div class='thumbItems' style='left: 0px;'>";
	if (adspacejson.screentype == 'big' && isWidthScreen()) {
		$.each(adspacejson.adList,function(i,ad){
			htmlContent += "<div class='thumbItem'>" +
			"<p class='pic'><a href='" + ad.picturelink + "' target='_blank'><img src='" + ad.pictureurlbig + "' alt='" + ad.tishi + "'></a></p>" +
			"<p class='name'><a href='" + ad.picturelink + "' target='_blank'>" + ad.adname + "</a></p></div>";
		});
	} else {
		$.each(adspacejson.adList,function(i,ad){
			htmlContent += "<div class='thumbItem'>" +
			"<p class='pic'><a href='" + ad.picturelink + "' target='_blank'><img src='" + ad.pictureurl + "' alt='" + ad.tishi + "'></a></p>" +
			"<p class='name'><a href='" + ad.picturelink + "' target='_blank'>" + ad.adname + "</a></p></div>";
		});
	}
	htmlContent += "</div></div>" + 
	"<a class='thumbNext thumbNextA' hidefocus='true' href='javascript:void(0);'></a>";
	
	addiv.html(htmlContent);
	addiv.cooMarquee();
}
/**
 * 显示广告列表
 */
function jsonm4(adspacejson,addiv, count){
	var ads = adspacejson.adList,
        htmlContent="",
        count = (count <= 0 || count > ads.length) ? ads.length : count;
	if(!ads){
		return;
	}
    if (adspacejson.screentype == 'big' && isWidthScreen()){
        for(var i = 0; i < count; i++){
            htmlContent += '<div class="gg-item gg-item-'
                        + (i + 1)
                        + '"><a href="' + ads[i].picturelink + '" target="_blank"'
                        + ' title="' + ads[i].tishi
                        + '"><img src="' + ads[i].pictureurlbig
                        + '" alt="' + ads[i].tishi
                        + '" /></a></div>';
        }
    } else {
        for(var i = 0; i < count; i++){
            htmlContent += '<div class="gg-item gg-item-'+
                        + (i + 1)
                        + '"><a href="' + ads[i].picturelink + '" target="_blank"'
                        + ' title="' + ads[i].tishi 
                        + '"><img src="' + ads[i].pictureurl
                        + '" alt="' + ads[i].tishi
                        + '" /></a></div>';
        }
    }
	addiv.html(htmlContent);
}
var Area = Area || {};
Area.areaId = function(){
	var r = getcookie();
	return r ? r : "11000000";
}
Area.show = function(s,r){
	$("#" + s + "_" + r + " div img").each(function(){$(this).attr("src", $(this).attr("osrc"));});
	$("#" + s + "_" + r + " div").attr("style", "display:block;");
	$("#" + s + "_" + r + " li").removeClass("lazy-load");
}
Area.pnp = function(s,r,pu,pi){
	$.ajax({url:"/redis/json/"+ s +"_"+r+"_"+this.areaId()+".html?a="+Math.random(),
		error: function(){Area.show(s,r);},
		dataType:"json",
		success:function(data){
			if (data){
				for (var i = 0; i < data.length; i++) {
					var tempData = data[i];
					var temp = $("#"+s+"_"+r+" div[pid="+tempData.position+"]");
					if (temp.length == 0) continue;
					var spic = "";
					if(tempData.showpic > 0){
						spic = "<a href='"+pu+tempData.id+".html' target='_blank' class='tag tag"+tempData.showpic+"'></a>";
					}
					var str=["<p class='pic'>",spic,"<a href='",pu,tempData.id,".html' target='_blank' ><img alt='",tempData.productname,"' src=\"",tempData.mainimg3,"\" width='120px' height='120px' onerror=\"imgERROR(this,'no_pic_120_120.jpg');\"/></a></p>"];
					str.push("<p class='name'><a href='",pu,tempData.id,".html target='_blank' title='",tempData.productname,"'>",tempData.productname,"<em>",tempData.gift,"</em></a></p>");
					str.push("<p class='price'>库巴价：<img src='",pi,Math.floor(tempData.id/1000),"/",tempData.id,",1.png' height='22px' onerror=\"imgERROR(this,'noprice,1.jpg');\"/></p>");
					temp.html(str.join(''));
				}
			}
			Area.show(s,r);
		}
	});
}
function deleteCookie(name, path, domain) {
    if (getCookie(name)) document.cookie = name + '=' +
	            ((path) ? ';path=' + path : '') +
	            ((domain) ? ';domain=' + domain : '') +
	            ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}
function getCookie(name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start == -1) return null;
    var end = document.cookie.indexOf(';', len);
    if (end == -1) end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
    //return (decodeURIComponent(document.cookie.substring(len, end)));
}