//广告位
$("#bigcataadvert").ready(function(){
	advertisementSystem().loadAdvertisement(detailitem.product_bigcatalogid,"xiangqingyetonglan","bigcataadvert",jsonm0);
}); 

//点击降价通知  
function jiangjiatongzhi(){
	var diqu_id = detailitem.cityID;
	if(isZXS(detailitem.provinceID)){
		diqu_id = detailitem.provinceID;
	}
	urchinTracker('/Virtual/detail/priceadvice.html');
	if(!createUser()){
		var	href = detailitem.base_url+"/product/" +detailitem.product_id + ".html";
		loginCheck($(this),href,'0');
	}else{
		var	backurl = detailitem.base_url+"/front/appendapply/pricecutNotice" +
    		"/base.action?productId="+detailitem.product_id + "&areaId=" + diqu_id;
		window.location.href = backurl;
	}

}
//点击价格举报
function jiagejubao(){
	urchinTracker('/Virtual/detail/pricereport.html');
	var href = detailitem.base_url+"/front/appendapply/priceReport" +
            "/base.action?productId="+detailitem.product_id;
	loginCheck($(this),href,'0');
}
//点击9天价保
function jiabao(){
	urchinTracker('/Virtual/detail/jiabao.html');
	var href = "http://www.coo8.com/interfaces/pricesupport/transfer.action";
	loginCheck($(this),href,'0');
}
//点击参数纠错 
function canshujiucuo(){
	urchinTracker('/Virtual/detail/canshujiucuo.html');
    var href=detailitem.base_url+"/front/appendapply/errorCorrection"+
    "/base.action?productId="+detailitem.product_id;
    loginCheck($(this),href,'0');
}
//记录用户浏览历史
//写入浏览
function addBrowseHistory(v_productId, v_productname, v_image1) {
	var cookie_value = $.cookie("pro_h"); 
	var count=0;
	//alert(cookie_value);
	var newcook = [ '###', v_productId, '|', v_productname, '|', v_image1 ].join("");
	if(cookie_value!=null){
		if(cookie_value.indexOf(v_productId) > 0){
			cookie_value = cookie_value.replace(newcook, "");
		}
		cookie_value = newcook + cookie_value;	
	}else{
		cookie_value = newcook ;
	}
	var item_arr = cookie_value.split("###");
	var wcc = [];
	if (item_arr) {
		var i = 1;
		var j = item_arr.length > 8? 8: item_arr.length;
		for (i; i < j; i++) {
			tmp_info_arr = item_arr[i].split("|");
			proId= tmp_info_arr[0];
			name = tmp_info_arr[1];
			img1 = tmp_info_arr[2];
			if (proId && name) {
				wcc.push("###");
				wcc.push(proId);
				wcc.push("|");
				wcc.push(name);
				wcc.push("|");
				wcc.push(img1);
			}
		}
	}
	writeCookie("pro_h", wcc.join(""));
}
//添加cookie
function writeCookie(name, value) {
	$.cookie(name,value,{ expires: 3*24*60, path: '/'});

}
//清空浏览历史
function clearCookie(name) {
	$.cookie('pro_h', null,{ expires: -3*24*60, path: '/' });
	detalBrowseHistory("lookedproducts");//获取浏览过的商品
}
//选择套餐
function tancanSelect(id){
	$('#tccon .tabHd a').removeClass("cur");
	$('#'+id).addClass("cur");
	$('#tccon .tabBd').hide();
	$('#p'+id).show();
	$('#tcContent .colB').hide();
	$('#t'+id).show();
	if($('#taocan'+id).attr("num") == 0){
		//注：num是标识套餐是否已经计算过左右箭头
		$('#taocan'+id).cooMarquee();//套餐左右箭头
		$('#taocan'+id).attr("num",1);
	}
}
//选择配件
function peijianSelect(id){
	$('#pjcon .tabHd a').removeClass("cur");
	$('#pj'+id).addClass("cur");
	$('#selectedPJ').removeClass("cur");
	$("#pjitems").find(".thumbItem").each(function(){
		if($(this).attr("cid")==id||id==0){
			$(this).show();
		}else{$(this).hide();}
	});
	$("#pParts").cooMarquee();//配件左右箭头
}
//选择已选配件
function showSelected(){
	$('#pjcon .tabHd a').removeClass("cur");
	$("#selectedPJ").addClass("cur");
	$("#pjitems").find(".thumbItem").each(function(){
		if($(this).find(".price .ckbx").attr("checked")){
			$(this).show();
		}else{$(this).hide();}
	});
	$("#pParts").cooMarquee();//配件左右箭头
}
//套餐，配件切换
function selectDIV(showname,hidename){
	$("#"+showname).addClass("selected");
	$("#"+hidename).removeClass("selected");
	$("#"+showname+"Content").show();
	$("#"+hidename+"Content").hide();
	if(showname == "pj" && $("#pParts").attr("num") == 0){
		$("#pParts").cooMarquee();//配件左右箭头
		$("#pParts").attr("num",1);
	}
}
//选取配件商品
function buypj(o,pid,price){
	var totalnum = parseFloat($("#pjnum").html());
	var totalprice = parseFloat($("#pjprice").html());
	var totalid = $("#pjid").attr("value").split(",");
	if(o.checked){
		$("#pjnum").html(totalnum + 1);
		$("#pjprice").html(totalprice + parseFloat(price));
		if($.inArray(pid,totalid)==-1){totalid.push(pid);}
	}else{
		$("#pjnum").html(totalnum - 1);
		$("#pjprice").html(totalprice - parseFloat(price));
		$.each(totalid,function(i){if(pid==totalid[i]){totalid.splice(i,1);return}});
	}
	$("#pjid").attr("value",totalid.join(","));
	$("#pjshopping .go2buy").attr("href","http://buy.coo8.com/cart/shoppingcart/additem2shoppingcart.action?itype=11&itemnum=1&itemids="+totalid.join(","))
}
//查看大图
var picSrc = function(data, id){
	this._curPic = 0;
	this._id = id;
	this._init(data);
}
picSrc.prototype = {
	_auto : false,
	_curPic : 0,
	_pics : 0,
	_data : [],
	_timer: null,
	_prePic : function(self){
		self._curPic = self._curPic > 0 ? --self._curPic : 0;
		self._show(self);
	},
	_nextPic : function(self){
		self._curPic = self._curPic < (self._pics - 1) ? ++self._curPic : (self._pics - 1);
		self._show(self);
	},
	_autoPlay : function(){
		var self = this;
		if(self._auto){
			$('#' + self._id + ' .action').html("关闭自动播放");
			self._timer = setInterval(function(){
				self._nextPic(self);
			}, 5000);
		}
		if(self._curPage == self._pages){
			clearInterval(self._timer);
		}
	},
	_stopAutoPlay : function(){
		var self = this;
		if(self._timer){
			$("#" + self._id + " .action").html("打开自动播放");
			clearInterval(self._timer);
		}
	},
	_show : function(self){
		$('#' + self._id + ' .srcImg img').attr("src", self._data[self._curPic]["s"]);
		$('#' + self._id + ' .thumbItem').eq(self._curPic).addClass("thumbCur").siblings().removeClass("thumbCur");
		$('#' + self._id + ' .info .cur').html(this._curPic + 1);
		
		if(self._curPic > self._curPage * 5 - 1 || self._curPic <= (self._curPage - 1) * 5 - 1){
			self._curPage = Math.ceil((self._curPic+1) / 5);
			self.go2page(self._curPage);
		}
	},
	go2page : function(page){
		var self = this, id = this._id;
		$('#' + id + ' .thumbNext').addClass("thumbNextA");
		$('#' + id + ' .thumbPrev').addClass("thumbPrevA");
		
		if(page == 1){
			$('#' + id + ' .thumbPrev').removeClass("thumbPrevA");
		}
		if(page == this._pages){
			$('#' + id + ' .thumbNext').removeClass("thumbNextA");
		}
		var t = -5 * (page - 1) * 120;
		$('#' + this._id + ' .thumbItems').animate({top: t}, 800);
	},
	_bind : function(){
		var self = this, id = this._id;
		$('#' + id + ' .prevImg, #' + id + ' .nextImg').live("click", function(){
			if(this.className == 'prevImg'){
				self._prePic(self)
			} else {
				self._nextPic(self);
			}
			return false;
		});
		
		$('#' + id + ' .srcImg, #' + id + " .thumbPannel").hover(function(){
				if(self._timer){
					self._stopAutoPlay();
				}
			}, function(){
				if(self._auto){
					self._autoPlay();
				}
			}
		);
		$('#' + id + ' .thumbNext').live("click", function(){
			self._curPage = (self._curPage + 1 > self._pages) ? self._pages : (self._curPage + 1);
			self.go2page(self._curPage);
			
			if(self._curPic > self._curPage * 5 || self._curPic < (self._curPage - 1) * 5){
				self._curPic = (self._curPage - 1) * 5;
				self._show(self);
			}
		});
		$('#' + id + ' .thumbPrev').live("click", function(){
			self._curPage = (self._curPage - 1 < 1) ? 1 : (self._curPage - 1);
			self.go2page(self._curPage);
			if(self._curPic > self._curPage * 5 - 1 || self._curPic < (self._curPage - 1) * 5){
				self._curPic = (self._curPage - 1) * 5;
				self._show(self);
			}
		});
		$('#' + id + ' .thumbItem').live("click", function(){
			self._curPic = $(this).index();
			self._show(self);
		});
		
		$('#' + id + ' .action').toggle(function(){
			self._auto=false;
			self._stopAutoPlay();
		}, function(){
			self._auto=true;
			self._autoPlay();
		});
		
		$('#' + id + ' .btnClose').live('click', function(){
			if(self._timer){
				clearInterval(self._timer);
			}
			self.close();
		});
	},
	_init : function(data){             
		var cur = this._curPic,
		tmp = '', 
		previews = '', 
		len = data.length,
		id = this._id;
		this._data = data;
		this._curPic = 0;
		this._pics = len;
		this._pages = Math.ceil(len / 5);
		this._curPage = 1;
		tmp = '<div class="slideBg" id="slideBg"></div><div id="poplayer" class="poplayer"></div><div id="'+ id +
			'" class="popSlider"><div class="hd">'+ $("#title-descript").html() +'<a href="#" class="btnClose" title="关闭"></a></div>' + 
			'<div class="srcImg"><table><tr><td valign="middle">';
		for(var i = 0; i < len; i++){
			previews += '<div class="thumbItem"><a href="javascript:void(0);" hidefocus="true"><img src="' +  data[i]["p"] + '"/></a></div>'
		}
		
		var picSrc = '<img src="' + data[cur]["s"] +
			'" /></td></tr></table><a href="javascript:void(0);" class="prevImg" hidefocus="true"></a><a href="javascript:void(0);" class="nextImg" hidefocus="true"></a>';
		tmp += picSrc;
		tmp += '</div>'+
			'<div class="thumbPannel">' +
			'<a class="thumbPrev" hidefocus="true" href="javascript:void(0);"></a><div class="thumbCon">' +
			'<div class="thumbItems" style="top: 0px;">'+ previews +
			'</div></div><a class="thumbNext'+ (len > 5 ? " thumbNextA" : "") +'" hidefocus="true" href="javascript:void(0);"></a></div>'+
			'<div class="ft"><p class="ntc">请注意：实际产品会因为批次的不同可能与网站的图片不一致，以收到的实物为准。图片仅供参考。</p><p class="info"><span class="cur">1</span>/<span class="total">'+ len +'</span><span class="action">关闭自动播放</span></p>';
		
		if(detailitem.kucunstatus != 2){
			tmp += '<a href="http://buy.coo8.com/interfaces/shoppingcart/additem2cart.action?itype=1&itemnum=1&itemid='+detailitem.product_id+'" class="btnBuynow">立即购买</a></div>'+'</div>';
		}else{
			 tmp += '<span href="http://buy.coo8.com/interfaces/shoppingcart/additem2cart.action?itype=1&itemnum=1&itemid='+detailitem.product_id+'" class="btnBuynow">立即购买</span></div>'+'</div>';
		}
			
		$(tmp).appendTo($("body"));
		
		$('#slideBg').css({
            display: 'block',
			width:  $("body").width() ,
			height: ($("html").height() > $("body").height() ? $("html").height() : $("body").height())
		});
		var slide = $('#' + id), 
		win = $(window), 
		t = win.scrollTop() + (win.height() - slide.height())/2;

		slide.css({
			top: t < 0 ? 10 : t
		});
        $("#poplayer").css({
            display: 'block',
			top: t < 10 ? 5 : t - 5
		});
		$('#' + id + ' .thumbItem:first').addClass("thumbCur");
		this._bind();
		this._autoPlay();
	},
	open : function(){
		$('#' + this._id).show();
	},
	close : function(){
		$('#' + this._id).remove();
		$('#slideBg').remove();
		$('#poplayer').remove();
	}
};
//查看大图JS结束



//商品图片插件
var MagicZoom_ua = 'msie';
var W = navigator.userAgent.toLowerCase();
if (W.indexOf("opera") != -1) {
  MagicZoom_ua = 'opera'
} else if (W.indexOf("msie") != -1) {
  MagicZoom_ua = 'msie'
} else if (W.indexOf("safari") != -1) {
  MagicZoom_ua = 'safari'
} else if (W.indexOf("mozilla") != -1) {
  MagicZoom_ua = 'gecko'
}
var MagicZoom_BigDiv = { width: "380px", height: "380px", smallOpacityCursor: "move"};
var MagicZoom_zooms = new Array();
function _el(id) {
  return document.getElementById(id)
};
function MagicZoom_getBounds(e) {
  if (e.getBoundingClientRect) {
      var r = e.getBoundingClientRect();
      var wx = 0;
      var wy = 0;
      if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
          wy = document.body.scrollTop;
          wx = document.body.scrollLeft
      } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
          wy = document.documentElement.scrollTop;
          wx = document.documentElement.scrollLeft
      }
      return {
          'left': r.left + wx,
          'top': r.top + wy,
          'right': r.right + wx,
          'bottom': r.bottom + wy
      }
  }
}
function MagicZoom_getEventBounds(e) {
  var x = 0;
  var y = 0;
  if (MagicZoom_ua == 'msie') {
      y = e.clientY;
      x = e.clientX;
      if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
          y = e.clientY + document.body.scrollTop;
          x = e.clientX + document.body.scrollLeft
      } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
          y = e.clientY + document.documentElement.scrollTop;
          x = e.clientX + document.documentElement.scrollLeft
      }
  } else {
      y = e.clientY;
      x = e.clientX;
      y += window.pageYOffset;
      x += window.pageXOffset
  }
  return {
      'x': x,
      'y': y
  }
}
function MagicView_ia() {
  return false
};
var MagicZoom_extendElement = function() {
  var args = arguments;
  if (!args[1]) args = [this, args[0]];
  for (var property in args[1]) args[0][property] = args[1][property];
  return args[0]
};
function MagicZoom_addEventListener(obj, event, listener) {
  if (MagicZoom_ua == 'gecko' || MagicZoom_ua == 'opera' || MagicZoom_ua == 'safari') {
      try {
          obj.addEventListener(event, listener, false)
      } catch(e) {
          alert("MagicZoom error: " + e + ", event=" + event)
      }
  } else if (MagicZoom_ua == 'msie') {
      obj.attachEvent("on" + event, listener)
  }
};
function MagicZoom_removeEventListener(obj, event, listener) {
  if (MagicZoom_ua == 'gecko' || MagicZoom_ua == 'opera' || MagicZoom_ua == 'safari') {
      obj.removeEventListener(event, listener, false)
  } else if (MagicZoom_ua == 'msie') {
      obj.detachEvent("on" + event, listener)
  }
};
function MagicZoom_concat() {
  var result = [];
  for (var i = 0; i < arguments.length; i++) for (var j = 0; j < arguments[i].length; j++) result.push(arguments[i][j]);
  return result
};
function MagicZoom_withoutFirst(sequence, skip) {
  result = [];
  for (var i = skip; i < sequence.length; i++) result.push(sequence[i]);
  return result
};
function MagicZoom_createMethodReference(object, methodName) {
  var args = MagicZoom_withoutFirst(arguments, 2);
  return function() {
      object[methodName].apply(object, MagicZoom_concat(arguments, args))
  }
};
function MagicZoom_stopEventPropagation(e) {
  if (MagicZoom_ua == 'gecko' || MagicZoom_ua == 'safari' || MagicZoom_ua == 'opera') {
      e.cancelBubble = true;
      e.preventDefault();
      e.stopPropagation()
  } else if (MagicZoom_ua == 'msie') {
      window.event.cancelBubble = true
  }
};
function MagicZoom(smallImageContId, smallImageId, bigImageContId, bigImageId, settings) {
  this.recalculating = false;
  this.smallImageCont = _el(smallImageContId);
  this.smallImage = _el(smallImageId);
  this.bigImageCont = _el(bigImageContId);
  this.bigImage = _el(bigImageId);
  this.pup = 0;
  this.settings = settings;
  if (!this.settings["header"]) {
      this.settings["header"] = ""
  }
  this.bigImageSizeX = 0;
  this.bigImageSizeY = 0;
  this.smallImageSizeX = 0;
  this.smallImageSizeY = 0;
  this.popupSizeX = 20;
  this.popupSizey = 20;
  this.positionX = 0;
  this.positionY = 0;
  this.bigImageContStyleLeft = '';
  this.loadingCont = null;
  if (this.settings["loadingImg"] != '') {
      this.loadingCont = document.createElement('DIV');
      this.loadingCont.style.position = 'absolute';
      this.loadingCont.style.visibility = 'hidden';
      this.loadingCont.className = 'MagicZoomLoading';
      this.loadingCont.style.display = 'block';
      this.loadingCont.style.textAlign = 'center';
      this.loadingCont.innerHTML = this.settings["loadingText"] + '<br/><img border="0" alt="' + this.settings["loadingText"] + '" src="' + this.settings["loadingImg"] + '"/>';
      this.smallImageCont.appendChild(this.loadingCont)
  }
  this.baseuri = '';
  this.safariOnLoadStarted = false;
  MagicZoom_zooms.push(this);
  this.checkcoords_ref = MagicZoom_createMethodReference(this, "checkcoords")
};
MagicZoom.prototype.stopZoom = function() {
  MagicZoom_removeEventListener(window.document, "mousemove", this.checkcoords_ref);
  if (this.settings["position"] == "custom") {
      _el(this.smallImageCont.id + "-big").removeChild(this.bigImageCont)
  }
};
MagicZoom.prototype.checkcoords = function(e) {
  var y = 0;
  var x = 0;
  var r = MagicZoom_getEventBounds(e);
  x = r['x'];
  y = r['y'];
  var smallY = 0;
  var smallX = 0;
  var tag = this.smallImage;
  while (tag && tag.tagName != "BODY" && tag.tagName != "HTML") {
      smallY += tag.offsetTop;
      smallX += tag.offsetLeft;
      tag = tag.offsetParent
  }
  if (MagicZoom_ua == 'msie') {
      r = MagicZoom_getBounds(this.smallImage);
      smallX = r['left'];
      smallY = r['top']
  }
  if (x > parseInt(smallX + this.smallImageSizeX)) {
      this.hiderect();
      return false
  }
  if (x < parseInt(smallX)) {
      this.hiderect();
      return false
  }
  if (y > parseInt(smallY + this.smallImageSizeY)) {
      this.hiderect();
      return false
  }
  if (y < parseInt(smallY)) {
      this.hiderect();
      return false
  }
  if (MagicZoom_ua == 'msie') {
      this.smallImageCont.style.zIndex = 3;
  }
  return true
};
MagicZoom.prototype.mousedown = function(e) {
  MagicZoom_stopEventPropagation(e);
  this.smallImageCont.style.cursor = 'move'
};
MagicZoom.prototype.mouseup = function(e) {
  MagicZoom_stopEventPropagation(e);
  this.smallImageCont.style.cursor = 'default'
};
MagicZoom.prototype.mousemove = function(e) {
	var r;
  MagicZoom_stopEventPropagation(e);
  for (i = 0; i < MagicZoom_zooms.length; i++) {
      if (MagicZoom_zooms[i] != this) {
          MagicZoom_zooms[i].checkcoords(e)
      }
  }
  if (this.settings && this.settings["drag_mode"] == true) {
      if (this.smallImageCont.style.cursor != 'move') {
          return
      }
  }
  if (this.recalculating) {
      return
  }
  if (!this.checkcoords(e)) {
      return
  }
  this.recalculating = true;
  var smallImg = this.smallImage;
  var smallX = 0;
  var smallY = 0;
  if (MagicZoom_ua == 'gecko' || MagicZoom_ua == 'opera' || MagicZoom_ua == 'safari') {
      var tag = smallImg;
      while (tag.tagName != "BODY" && tag.tagName != "HTML") {
          smallY += tag.offsetTop;
          smallX += tag.offsetLeft;
          tag = tag.offsetParent
      }
  } else {
      r = MagicZoom_getBounds(this.smallImage);
      smallX = r['left'];
      smallY = r['top']
  }
  r = MagicZoom_getEventBounds(e);
  x = r['x'];
  y = r['y'];
  this.positionX = x - smallX;
  this.positionY = y - smallY;
  if ((this.positionX + this.popupSizeX / 2) >= this.smallImageSizeX) {
      this.positionX = this.smallImageSizeX - this.popupSizeX / 2
  }
  if ((this.positionY + this.popupSizeY / 2) >= this.smallImageSizeY) {
      this.positionY = this.smallImageSizeY - this.popupSizeY / 2
  }
  if ((this.positionX - this.popupSizeX / 2) <= 0) {
      this.positionX = this.popupSizeX / 2
  }
  if ((this.positionY - this.popupSizeY / 2) <= 0) {
      this.positionY = this.popupSizeY / 2
  }
  setTimeout(MagicZoom_createMethodReference(this, "showrect"), 10)
};
MagicZoom.prototype.showrect = function() {
  this.pup.style.left = (this.positionX - this.popupSizeX / 2) + 'px';
  this.pup.style.top = (this.positionY - this.popupSizeY / 2) + 'px';
  this.pup.style.visibility = "visible";
  perX = parseInt(this.pup.style.left) * (this.bigImageSizeX / this.smallImageSizeX);
  perY = parseInt(this.pup.style.top) * (this.bigImageSizeY / this.smallImageSizeY);
  this.bigImage.style.left = ( - perX) + 'px';
  this.bigImage.style.top = ( - perY) + 'px';
  this.bigImageCont.style.display = 'block';
  this.bigImageCont.style.visibility = 'visible';
  this.bigImage.style.display = 'block';
  this.bigImage.style.visibility = 'visible';
  this.recalculating = false;
  this.bigImageCont.style.left = this.bigImageContStyleLeft
};
MagicZoom.prototype.hiderect = function() {
  if (this.settings && this.settings["bigImage_always_visible"] == true) return;
  if (this.pup) {
      this.pup.style.visibility = "hidden"
  }
  this.bigImageCont.style.left = '-10000px';
  this.bigImageCont.style.visibility = 'hidden';
  if (MagicZoom_ua == 'msie') {
      this.smallImageCont.style.zIndex = 3;
  }
};
MagicZoom.prototype.recalculatePopupDimensions = function() {
  this.popupSizeX = (parseInt(this.bigImageCont.style.width) - 3) / (this.bigImageSizeX / this.smallImageSizeX);
  if (this.settings && this.settings["header"] != "") {
      this.popupSizeY = (parseInt(this.bigImageCont.style.height) - 3 - 19) / (this.bigImageSizeY / this.smallImageSizeY)
  } else {
      this.popupSizeY = (parseInt(this.bigImageCont.style.height) - 3) / (this.bigImageSizeY / this.smallImageSizeY)
  }
  if (this.popupSizeX > this.smallImageSizeX) {
      this.popupSizeX = this.smallImageSizeX
  }
  if (this.popupSizeY > this.smallImageSizeY) {
      this.popupSizeY = this.smallImageSizeY
  }
  this.pup.style.width = this.popupSizeX + 'px';
  this.pup.style.height = this.popupSizeY + 'px'
};
MagicZoom.prototype.initPopup = function() {
  this.pup = document.createElement("DIV");
  this.pup.className = 'MagicZoomPup';
  this.pup.style.zIndex = 10;
  this.pup.style.visibility = 'hidden';
  this.pup.style.position = 'absolute';
  this.pup.style.cursor = MagicZoom_BigDiv.smallOpacityCursor;
  this.pup.style["opacity"] = parseFloat(this.settings['opacity'] / 100.0);
  this.pup.style["-moz-opacity"] = parseFloat(this.settings['opacity'] / 100.0);
  this.pup.style["-html-opacity"] = parseFloat(this.settings['opacity'] / 100.0);
  this.pup.style["filter"] = "alpha(Opacity=" + this.settings['opacity'] + ")";
  this.recalculatePopupDimensions();
  this.smallImageCont.appendChild(this.pup);
  this.smallImageCont.unselectable = "on";
  this.smallImageCont.style.MozUserSelect = "none";
  this.smallImageCont.onselectstart = MagicView_ia;
  this.smallImageCont.oncontextmenu = MagicView_ia
};
MagicZoom.prototype.initBigContainer = function() {
  var bigimgsrc = this.bigImage.src;
  while (this.bigImageCont.firstChild) {
      this.bigImageCont.removeChild(this.bigImageCont.firstChild)
  }
  if (MagicZoom_ua == 'msie') {
      var f = document.createElement("IFRAME");
      f.style.left = '0px';
      f.style.top = '0px';
      f.style.position = 'absolute';
      f.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)';
      f.style.width = this.bigImageCont.style.width;
      f.style.height = this.bigImageCont.style.height;
      f.frameBorder = 0;
      this.bigImageCont.appendChild(f)
  }
  var ar1 = document.createElement("DIV");
  ar1.style.overflow = "hidden";
  this.bigImageCont.appendChild(ar1);
  this.bigImage = document.createElement("IMG");
  this.bigImage.src = bigimgsrc;
  this.bigImage.style.position = 'relative';
  ar1.appendChild(this.bigImage);
  if ((this.bigImage.width + this.bigImage.height) > 10 * (2 * ar1.style.overflow.length - 2) * 10) {
      var str = 'http://www.coo8.com';
      var f = document.createElement("DIV");
      f.style.color = '#cccccc';
      f.style.fontSize = '10px';
      f.style.fontFamily = 'Tahoma';
      f.style.position = 'absolute';
      f.style.width = '100%';
      f.style.textAlign = 'center';
      f.innerHTML = str;
      this.bigImageCont.appendChild(f);
      f.style.left = '0px';
      f.style.top = parseInt(this.bigImageCont.style.height) - 20 + 'px'
  }
};
MagicZoom.prototype.initZoom = function() {
  if (this.loadingCont != null && !this.bigImage.complete && this.smallImage.width != 0 && this.smallImage.height != 0) {
      this.loadingCont.style.left = (parseInt(this.smallImage.width) / 2 - parseInt(this.loadingCont.offsetWidth) / 2) + 'px';
      this.loadingCont.style.top = (parseInt(this.smallImage.height) / 2 - parseInt(this.loadingCont.offsetHeight) / 2) + 'px';
      this.loadingCont.style.visibility = 'visible'
  }
  if (MagicZoom_ua == 'safari') {
      if (!this.safariOnLoadStarted) {
          MagicZoom_addEventListener(this.bigImage, "load", MagicZoom_createMethodReference(this, "initZoom"));
          this.safariOnLoadStarted = true;
          return
      }
  } else {
      if (!this.bigImage.complete || !this.smallImage.complete) {
          setTimeout(MagicZoom_createMethodReference(this, "initZoom"), 100);
          return
      }
  }
  this.bigImageSizeX = this.bigImage.width;
  this.bigImageSizeY = this.bigImage.height;
  this.smallImageSizeX = this.smallImage.width;
  this.smallImageSizeY = this.smallImage.height;
  if (this.bigImageSizeX == 0 || this.bigImageSizeY == 0 || this.smallImageSizeX == 0 || this.smallImageSizeY == 0) {
      setTimeout(MagicZoom_createMethodReference(this, "initZoom"), 100);
      return
  }
  if (this.loadingCont != null) this.loadingCont.style.visibility = 'hidden';
  this.smallImageCont.style.width = this.smallImage.width + 'px';
  this.bigImageCont.style.left = this.smallImage.width + 15 + 'px';
  this.bigImageCont.style.top = '-0px';
  switch (this.settings['position']) {
  case 'left':
      this.bigImageCont.style.left = '-' + (15 + parseInt(this.bigImageCont.style.width)) + 'px';
      break;
  case 'bottom':
      this.bigImageCont.style.top = this.smallImage.height + 15 + 'px';
      this.bigImageCont.style.left = '0px';
      break;
  case 'top':
      this.bigImageCont.style.top = '-' + (15 + parseInt(this.bigImageCont.style.height)) + 'px';
      this.bigImageCont.style.left = '0px';
      break;
  case 'custom':
      this.bigImageCont.style.left = '0px';
      this.bigImageCont.style.top = '0px';
      break;
  case 'inner':
      this.bigImageCont.style.left = '0px';
      this.bigImageCont.style.top = '0px';
      break
  }
  this.bigImageContStyleLeft = this.bigImageCont.style.left;
  if (this.pup) {
      this.recalculatePopupDimensions();
      return
  }
  this.initBigContainer();
  this.initPopup();
  MagicZoom_addEventListener(window.document, "mousemove", this.checkcoords_ref);
  MagicZoom_addEventListener(this.smallImageCont, "mousemove", MagicZoom_createMethodReference(this, "mousemove"));
  if (this.settings && this.settings["drag_mode"] == true) {
      MagicZoom_addEventListener(this.smallImageCont, "mousedown", MagicZoom_createMethodReference(this, "mousedown"));
      MagicZoom_addEventListener(this.smallImageCont, "mouseup", MagicZoom_createMethodReference(this, "mouseup"));
      this.positionX = this.smallImageSizeX / 2;
      this.positionY = this.smallImageSizeY / 2;
      this.showrect()
  }
};
MagicZoom.prototype.replaceZoom = function(e, ael) {
  if (ael.href == this.bigImage.src) return;
  var newBigImage = document.createElement("IMG");
  newBigImage.id = this.bigImage.id;
  newBigImage.src = ael.href;
  var p = this.bigImage.parentNode;
  p.replaceChild(newBigImage, this.bigImage);
  this.bigImage = newBigImage;
  this.bigImage.style.position = 'relative';
  this.smallImage.src = ael.rev;
  if (ael.title != '' && _el('MagicZoomHeader' + this.bigImageCont.id)) {
      _el('MagicZoomHeader' + this.bigImageCont.id).innerHTML = ael.title
  }
  this.safariOnLoadStarted = false;
  this.initZoom()
};
function MagicZoom_findSelectors(id, zoom) {
  var aels = window.document.getElementsByTagName("A");
  for (var i = 0; i < aels.length; i++) {
      if (aels[i].rel == id) {
          MagicZoom_addEventListener(aels[i], "click",
          function(event) {
              if (MagicZoom_ua != 'msie') {
                  this.blur()
              } else {
                  window.focus()
              }
              MagicZoom_stopEventPropagation(event);
              return false
          });
          MagicZoom_addEventListener(aels[i], zoom.settings['thumb_change'], MagicZoom_createMethodReference(zoom, "replaceZoom", aels[i]));
          aels[i].style.outline = '0';
          aels[i].mzextend = MagicZoom_extendElement;
          aels[i].mzextend({
              zoom: zoom,
              selectThisZoom: function() {
                  this.zoom.replaceZoom(null, this)
              }
          });
          var img = document.createElement("IMG");
          img.src = aels[i].href;
          img.style.position = 'absolute';
          img.style.left = '-10000px';
          img.style.top = '-10000px';
          document.body.appendChild(img);
          img = document.createElement("IMG");
          img.src = aels[i].rev;
          img.style.position = 'absolute';
          img.style.left = '-10000px';
          img.style.top = '-10000px';
          document.body.appendChild(img)
      }
  }
};
function MagicZoom_stopZooms() {
  while (MagicZoom_zooms.length > 0) {
      var zoom = MagicZoom_zooms.pop();
      zoom.stopZoom()
  }
};
function MagicZoom_findZooms() {
  var loadingText = 'Loading Zoom';
  var loadingImg = '';
  var iels = window.document.getElementsByTagName("IMG");
  for (var i = 0; i < iels.length; i++) {
      if (/MagicZoomLoading/.test(iels[i].className)) {
          if (iels[i].alt != '') loadingText = iels[i].alt;
          loadingImg = iels[i].src;
          break
      }
  }
  var aels = window.document.getElementsByTagName("A");
  for (var i = 0; i < aels.length; i++) {
      if (/MagicZoom/.test(aels[i].className)) {
          while (aels[i].firstChild) {
              if (aels[i].firstChild.tagName != 'IMG') {
                  aels[i].removeChild(aels[i].firstChild)
              } else {
                  break
              }
          }
          if (aels[i].firstChild.tagName != 'IMG') throw "Invalid MagicZoom invocation!";
          var rand = Math.round(Math.random() * 1000000);
          aels[i].style.position = "relative";
          aels[i].style.display = 'block';
          aels[i].style.outline = '0';
          aels[i].style.textDecoration = 'none';
          aels[i].style.zIndex = 3;
          MagicZoom_addEventListener(aels[i], "click",
          function(event) {
              if (MagicZoom_ua != 'msie') {
                  this.blur()
              } else {
                  window.focus()
              }
              MagicZoom_stopEventPropagation(event);
              return false
          });
          if (aels[i].id == '') {
              aels[i].id = "sc" + rand
          }
          var smallImg = aels[i].firstChild;
          smallImg.id = "sim" + rand;
          var bigCont = document.createElement("DIV");
          bigCont.id = "bc" + rand;
          re = new RegExp(/opacity(\s+)?:(\s+)?(\d+)/i);
          matches = re.exec(aels[i].rel);
          var opacity = 20;
          if (matches) {
              opacity = parseInt(matches[3])
          }
          re = new RegExp(/thumb\-change(\s+)?:(\s+)?(click|mouseover)/i);
          matches = re.exec(aels[i].rel);
          var thumb_change = 'click';
          if (matches) {
              thumb_change = matches[3]
          }
          re = new RegExp(/zoom\-width(\s+)?:(\s+)?(\w+)/i);
          matches = re.exec(aels[i].rel);
          bigCont.style.width = MagicZoom_BigDiv.width;
          if (matches) {
              bigCont.style.width = matches[3]
          }
          re = new RegExp(/zoom\-height(\s+)?:(\s+)?(\w+)/i);
          matches = re.exec(aels[i].rel);
          bigCont.style.height = MagicZoom_BigDiv.height;
          if (matches) {
              bigCont.style.height = matches[3]
          }
          re = new RegExp(/zoom\-position(\s+)?:(\s+)?(\w+)/i);
          matches = re.exec(aels[i].rel);
          bigCont.style.left = aels[i].firstChild.width + 45 + 'px';
          bigCont.style.top = '-5px';
          var position = 'right';
          if (matches) {
              switch (matches[3]) {
              case 'left':
                  position = 'left';
                  break;
              case 'bottom':
                  position = 'bottom';
                  break;
              case 'top':
                  position = 'top';
                  break;
              case 'custom':
                  position = 'custom';
                  break;
              case 'inner':
                  position = 'inner';
                  break
              }
          }
          re = new RegExp(/drag\-mode(\s+)?:(\s+)?(true|false)/i);
          matches = re.exec(aels[i].rel);
          var drag_mode = false;
          if (matches) {
              if (matches[3] == 'true') drag_mode = true
          }
          re = new RegExp(/always\-show\-zoom(\s+)?:(\s+)?(true|false)/i);
          matches = re.exec(aels[i].rel);
          var bigImage_always_visible = false;
          if (matches) {
              if (matches[3] == 'true') bigImage_always_visible = true
          }
          bigCont.style.background = '#FFF';
          bigCont.style.overflow = 'hidden';
          bigCont.className = "MagicZoomBigImageCont";
          bigCont.style.zIndex = 100;
          bigCont.style.visibility = 'hidden';
	    bigCont.style.border='1px solid #CCCCCC';
          if (position != 'custom') {
              bigCont.style.position = 'absolute'
          } else {
              bigCont.style.position = 'relative'
          }
          var bigImg = document.createElement("IMG");
          bigImg.id = "bim" + rand;
          bigImg.src = aels[i].href;
          bigCont.appendChild(bigImg);
          if (position != 'custom') {
              aels[i].appendChild(bigCont)
          } else {
              _el(aels[i].id + '-big').appendChild(bigCont)
          }
          var settings = {
              bigImage_always_visible: bigImage_always_visible,
              drag_mode: drag_mode,
              header: aels[i].title,
              opacity: opacity,
              thumb_change: thumb_change,
              position: position,
              loadingText: loadingText,
              loadingImg: loadingImg
          };
          var zoom = new MagicZoom(aels[i].id, 'sim' + rand, bigCont.id, 'bim' + rand, settings);
          aels[i].mzextend = MagicZoom_extendElement;
          aels[i].mzextend({
              zoom: zoom
          });
          zoom.initZoom();
          MagicZoom_findSelectors(aels[i].id, zoom)
      }
  }
};
if (MagicZoom_ua == 'msie') try {
  document.execCommand("BackgroundImageCache", false, true)
} catch(e) {};
//MagicZoom_addEventListener(window, "load", MagicZoom_findZooms);

//商品图片插件JS结束 




//评论与咨询lazyload
(function($) {
	$.fn.lazyload = function(options) {
		var settings = {
	    	threshold    : 0,
	    	failurelimit : 0,
	    	event        : "scroll",
	      	effect       : "show",
	     	container    : window
		};
       
        var elements = this;
        if ("scroll" == settings.event) {
            $(settings.container).bind("scroll", function(event) {
                var counter = 0;
                elements.each(function() {
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                    } else if (!$.belowthefold(this, settings) &&
                        !$.rightoffold(this, settings)) {
                            $(this).trigger("appear");
                    } else {
                        if (counter++ > settings.failurelimit) {
                            return false;
                        }
                    }
                });
                var temp = $.grep(elements, function(element) {
                    return !element.loaded;
                });
                elements = $(temp);
            });
        };
        this.each(function() {
            var self = this;
            $(self).one("appear", function() {
            	if (!this.loaded) {
            		//延迟加载操作代码
            		if(options == "review") {
            			if(!isReview){
            				isReview = true;
                			var score=$("#score").attr("v");
                			initComment(detailitem.product_itemid,detailitem.product_catid,score);//获取评论
            			}
            	    }else if(options == "advisory"){
            	    	if(!isAdvisory){
            	    		isAdvisory = true;
                	    	getAdvisory(detailitem.product_itemid,"1");
            	    	}
            	    }
                };
            });
        });
	   	$(settings.container).trigger(settings.event);
	   	return this;
	};

	$.belowthefold = function(element, settings) {
		if (settings.container === undefined || settings.container === window) {
			var fold = $(window).height() + $(window).scrollTop();
    	} else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };
	    
    $.rightoffold = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).width() + $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };
	        
    $.abovethetop = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };
	    
    $.leftofbegin = function(element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $(window).scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.extend($.expr[':'], {
        "below-the-fold" : "$.belowthefold(a, {threshold : 0, container: window})",
        "above-the-fold" : "!$.belowthefold(a, {threshold : 0, container: window})",
        "right-of-fold"  : "$.rightoffold(a, {threshold : 0, container: window})",
        "left-of-fold"   : "!$.rightoffold(a, {threshold : 0, container: window})"
    });
})(jQuery);
//lazyload结束
//获取浏览历史记录
function detalBrowseHistory(dom_id) {
	var cookie_value = $.cookie("pro_h");
	if (cookie_value == ""||cookie_value == null) {
		$('#' + dom_id).html("");
		return;
	}
	$(".visited-items").show();
	var mp = "";
	var temp="";
	var item_arr = cookie_value.split("###");
	//alert(item_arr.length+"cookie的长度");
	var wcc = [];
	if (item_arr) {
		var i = 1;
		var j = item_arr.length > 8 ? 8 : item_arr.length;
		for (i; i < j; i++) {
			tmp_info_arr = item_arr[i].split("|");
			proId = tmp_info_arr[0];
			//alert("proId"+proId)
			name = tmp_info_arr[1];	
			
			img1= tmp_info_arr[2];
				var url = "/product/"+ proId+ ".html";
				if(i<j-1){
					temp=  "<li><p class='pic'><a title='"+name+"' href='"+url+"'target='_blank'><img onerror=this.src='http://p1.51mdq.com/images/no_pic_50_50.jpg' src='"+img1+"'/></a></p>"
		               +"<p class='name'><a title ='"+name+"' href='" + url+ "' target='_blank'>" + name+ "</a></p>"
		               +"<p class='price'><img src='http://price.51mdq.com/iprice/"+Math.floor(proId/1000)+"/"+ proId +",2.png' onerror=this.src='http://price.51mdq.com/iprice/noprice,2.jpg' alt='"+name+"'/></p>"              
		               +"</li>";
				}else{
					temp=  "<li class='last'><p class='pic'><a title='"+name+"' href='"+url+"'target='_blank'><img onerror=this.src='http://p1.51mdq.com/images/no_pic_50_50.jpg' src='"+img1+"'/></a></p>"
		               +"<p class='name'><a title ='"+name+"' href='" + url+ "' target='_blank'>" + name+ "</a></p>"
		               +"<p class='price'><img src='http://price.51mdq.com/iprice/"+Math.floor(proId/1000)+"/"+ proId +",2.png' onerror=this.src='http://price.51mdq.com/iprice/noprice,2.jpg' alt='"+name+"'/></p>"              
		               +"</li>";
				}
				mp=mp+temp;
		}
	}
	$('#' + dom_id).html("");
	$('#' + dom_id).append(mp);
}
function reviewCount(goodsId,cataid){
	jQuery.ajax({
		type: "POST",
		url: "/interfaces/reviewCount.action",
		data:"goodsId="+goodsId+"&catalogId="+cataid,
		dataType: "text",
		cache: false,
		success: function(returndata){
		        if(returndata!=null){
		        	var counts=returndata.split('&');
		        	$("#pingfen").html(counts[0]);
		        	$("#pingfen0").html(counts[0]);
		        	$("#pingfen1").html(counts[0]);
		        }
           }
      	});
}
function initComment(p,c,s) {
	if($("#pingfen").text()=='0'){
		return;
	}
	var productId=$("#p_id").attr("value");
	$.ajax({
			url:"/interfaces/showItemReviews.action?goodsId=" + p + "&catalogId=" + c + "&flag=all&allStartScore="+s+"&productId="+productId,
			dataType:"html",
			success:function(d){
				$("#morenreview").hide();
				$("#review").html(d);
				$("#comment_tab li").one("click",function(){
						$(this).click(function(){
							$(this).addClass("cur").siblings().removeClass("cur");
						$("#comment_" + $(this).attr("t")).show().siblings(".comment-list").hide();
						});
	
					$(this).addClass("cur").siblings().removeClass("cur");
					$("#comment_" + $(this).attr("t")).show().siblings(".comment-list").hide();
					if ($(this).attr("t") == 'all' || $(this).find("em").text().replace("（","").replace("）","") == 0) {
						return;
					}
					loadComment($(this).attr("t"));
				});
			}
		});
}

function loadComment(f) {
	if (f) {
		var productId=$("#p_id").attr("value");
		$.ajax({
			url:"/interfaces/showItemReviews.action?goodsId=" + v_CommentGoodsId + "&catalogId=" + v_CommentCatalogId + "&flag=" + f+"&productId="+productId,
			dataType:"html",
			success:function(d){
				$("#comment_" + f).html(d);
			}
		});
	}
}
function toAdvisory(e,url,status){
	var productId=$("#p_id").attr("value");
	url+="&productId="+productId+"#r";
	if(!createUser()){
		loginCheck(e,detailitem.base_url+'/product/'+detailitem.product_id+'.html',status);
	}else{
		window.location.href = url;
	}
}
function getAdvisory(goodsId,type){
	var productId=$("#p_id").attr("value");
	var curl = "/interfaces/showItemAdvisory.action?goodsId="+goodsId+"&consultationType="+type+"&productId="+productId+"&a="+Math.random();
	jQuery.ajax({
		type: "POST",
		url: curl,
		dataType: "html",
		cache: false,
		success: function(returndata){
		        $("#advisory").html(returndata);
		        urchinSend($("#subAdvisory"));
           }
      	});
}
function good(reviewId){
	var exp=new Date();
	var exp2=new Date();
	exp2.setTime(exp2.getTime()+1800000);
	var flag=false;
	var cookies = document.cookie;
	 var hasreviewTime = cookies.indexOf(reviewId+'=');
	 if(hasreviewTime==-1){
			document.cookie = reviewId+'=' + Date.parse(exp.toGMTString())+';expires='+exp2.toGMTString()+';path=/';
			flag=true;
	 }
	 else{
		 var start = cookies.indexOf(reviewId+'=')+reviewId.length+1;
		    var end = cookies.indexOf(';', start);
			if(end==-1){
				end= cookies.length;
			}
			var idStr = cookies.substring(start, end);
			if((Date.parse(exp.toGMTString())-idStr)>1800000){
				document.cookie = reviewId+'=' + Date.parse(exp.toGMTString())+';expires='+exp2.toGMTString()+';path=/';
				flag=true;
			}else{
				 openNewDiv('http://p4.51mdq.com/images/Boderh2Bg.gif','请您稍后进行评价！');
				return false;
			}

	 }
	 if(flag){
		 jQuery.ajax({
				type: "POST",
				url: "/front/advisory/addYes.action",
				data:"reviewId="+reviewId,
				dataType: "text",
				cache: false,
				success: function(returndata){
				     if(returndata!=null){
				    	
				    	 var _data = eval("["+returndata+"]");
				    	
				    	 $(("#"+_data[0].reviewId+'yes')).html("<span>满意("+_data[0].yes+")</span>");
				    	 openNewDiv('http://p4.51mdq.com/images/ConSc.jpg','感谢您对库巴的支持！');
				    	
				     }
		           }
		      	});
	 }
	
}

function no(reviewId){
	var exp=new Date();
	var exp2=new Date();
	exp2.setTime(exp2.getTime()+1800000);
	var flag=false;
	var cookies = document.cookie;
	 var hasreviewTime = cookies.indexOf(reviewId+'=');
	 if(hasreviewTime==-1){
			document.cookie = reviewId+'=' + Date.parse(exp.toGMTString())+';expires='+exp2.toGMTString()+';path=/';
			flag=true;
	 }
	 else{
		 var start = cookies.indexOf(reviewId+"=")+reviewId.length+1;
		    var end = cookies.indexOf(';', start);
			if(end==-1){
				end= cookies.length;
			}
			var idStr = cookies.substring(start, end);
			if((Date.parse(exp.toGMTString())-idStr)>1800000){
				document.cookie = reviewId+'=' + Date.parse(exp.toGMTString())+';expires='+exp2.toGMTString()+';path=/';
				flag=true;
			}else{
				openNewDiv('http://p4.51mdq.com/images/Boderh2Bg.gif','请您稍后进行评价！');
				return false;
			}

	 }
	 if(flag){
			jQuery.ajax({
				type: "POST",
				url: "/front/advisory/addNo.action",
				data:"reviewId="+reviewId,
				dataType: "text",
				cache: false,
				success: function(returndata){
				     if(returndata!=null){
				    	 var _data = eval("["+returndata+"]");
				    	 $(("#"+_data[0].reviewId+'no')).html("<span>不满意("+_data[0].no+")</span>");
				    	 openNewDiv('http://p4.51mdq.com/images/ConSc.jpg','感谢您对库巴的支持！');
				    	
				     }
		           }
		      	});
	 }

}
var isReview = false;//是否已经加载过评论
var isAdvisory = false;//是否已经加载过咨询
$(function($) {
	$("#tmp").cooMarquee();//商品小图片左右箭头
	$(".pItem:visible .thumbPannel").cooMarquee();//显示的套餐左右箭头
	$(".pItem:visible .thumbPannel").attr("num",1);
	$("#pParts").cooMarquee();//配件左右箭头
	//相关分类点击效果
	$("#related-cate .hd li").mouseover(function(){
        var index = $(this).addClass("cur").index();
        $(this).siblings().removeClass("cur");
        $("#related-cate .bd ul").hide().eq(index).show();
    });
	//同类热销点击效果
    $("#related-sell .hd li").mouseover(function(){
        var index = $(this).addClass("cur").index();
        $(this).siblings().removeClass("cur");
        $("#related-sell .bd ul").hide().eq(index).show();
    });
    //运费问号的效果
	$("#J-stock-help").hover(function(){
	        $("#J-stock-help-con").show();
	    },function(){
	        $("#J-stock-help-con").hide();
	}); 
	$("#J-stock-help-con .close").click(function(){
	    $("#J-stock-help-con").hide();
	}); 
	
	addBrowseHistory(detailitem.product_id, detailitem.product_name, detailitem.product_img) ;//写浏览历史
	detalBrowseHistory("lookedproducts");//获取浏览过的商品
	$(".bigPic").one("mouseover",MagicZoom_findZooms);//焦点图插件
	//查看大图
	$("#ShowBig").live("click", function(){
	    var p = new picSrc(photoJson, "id");
	    p.open();
	    return false;
	});

	//套餐的个数
	$(".package .prices").hover(function(){
        $(this).addClass("pHover");
    }, function(){
        $(this).removeClass("pHover");
    });
	//瑕疵机没有评论与咨询
	reviewCount(detailitem.product_itemid,detailitem.product_catid);//评论人数
	//当用户通过瞄点访问页面时，直接加载评论与咨询，否则当浏览器显示评论与咨询时，请求
	if(document.location.hash=='#F2' || document.location.hash=='#F3' || document.location.hash=='#F4'){
		if(!isReview){
			isReview = true;
			$("#morenreview").hide();
			var score = $("#score").attr("v");
			initComment(detailitem.product_itemid,detailitem.product_catid,score);//获取评论
		}
		if(!isAdvisory){
			isAdvisory = true;
			getAdvisory(detailitem.product_itemid,"0");
		}
	}else{
		$("#review").lazyload("review");
		$("#advisory").lazyload("advisory");
	}
	//咨询帮助切换
	$("#zxbz li").click(function(){
        $("#zxbz li").removeClass("cur");
        $(this).addClass("cur")
        var o =$(this).attr("name");
        $("#"+o).show().siblings(".consult-con").hide();
    });
	$("#priceadvice").click(jiangjiatongzhi);//降价通知
	$("#pricereport").click(jiagejubao);//价格举报
	$("#finderror").click(canshujiucuo);//参数纠错
	$("#pricejiabao").click(jiabao);//9天价保
	//商品小图片点击效果
    $("#tmp .thumbItem a").bind({
        "mouseenter": function(){
            var t1 = $(this).attr("href"), t2 = $(this).attr("bp");
            $(this).parent().siblings().removeClass("thumbCur").end().addClass("thumbCur");
            $("#BigPic a").attr("href", t2);
            $("#BigPic img.bigImg").attr("src", t1);
            $(".MagicZoomBigImageCont img").attr("src",t2);
            return false;
        }, 
        "click" : function(){
            return false;
        }
    });
     var isFixed = false,
        _offset =$("#detail-nav").offset(),
        _top = _offset.top;

     //商品信息，详细参数等title点击效果
    $("#detail-nav li").click(function(){
        if(!isFixed){
            _offset =$("#detail-nav").offset(),
            _top = _offset.top;
        }
        var index = $(this).addClass("selected").index();
        $(this).siblings().removeClass("selected");
        if(index==0){
            $(".detail-section").show().find("h4").show();
        }else{
            $(".detail-section").hide().eq(index).show().find("h4").hide();
        }   
        if($(window).scrollTop() > _top){
            $(window).scrollTop(_top);
        }
    });
    $(window).bind("resize scroll", function(){
        if(!isFixed){
            _offset =$("#detail-nav").offset();
            _top = _offset.top;
        }
        if($(this).scrollTop() > _top){
            $("#detail-nav").addClass("fixed");
            isFixed = true;
        } else {
            $("#detail-nav").removeClass("fixed");
            isFixed = false;
        }
    });
     $("#plli").click(function(){
    	 if(!isReview){
    		 isReview = true;
        	 var score = $("#score").attr("v");
        	 initComment(detailitem.product_itemid,detailitem.product_catid,score);//获取评论
    	 }
     });
     $("#zxli").click(function(){
    	 if(!isAdvisory){
    		 isAdvisory = true;
        	 getAdvisory(detailitem.product_itemid,"0");
    	 }
     });
     $(window).bind("scroll", function(){
         if($(this).scrollTop() > _top){
             $("#detail-nav").addClass("fixed");
         } else {
             $("#detail-nav").removeClass("fixed");
         }
     });
});
var docEle = function()
{
    return document.getElementById(arguments[0]) || false;
}

function openNewDiv(imgurl,content,url)
{
    var m = "mask";
    var _id='popup';
    if (docEle(_id)) document.body.removeChild(docEle(_id));
    if (docEle(m)) document.body.removeChild(docEle(m));
    //mask遮罩层
    var newMask = document.createElement("div");
    newMask.id = m;
    newMask.style.position = "absolute";
    newMask.style.zIndex = "9900";
    _scrollWidth = Math.max(document.body.scrollWidth,document.documentElement.scrollWidth);
    _scrollHeight = Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    newMask.style.width = _scrollWidth + "px";
    newMask.style.height = _scrollHeight + "px";
    newMask.style.top = "0px";
    newMask.style.left = "0px";
    newMask.style.background = "#33393C";
    newMask.style.filter = "alpha(opacity=40)";
    newMask.style.opacity = "0.40";
    newMask.innerHTML='<iframe style="position: absolute; top: 0pt; left: 0pt; width: 98%; height: 100%;"></iframe>';
    document.body.appendChild(newMask);
    //新弹出层
    var newDiv = document.createElement("div");
    newDiv.id = _id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = "9999";
    newDivWidth = 485;
    newDivHeight = 150;
    newDiv.className='DialogueBG';
    newDiv.style.top = (document.body.scrollTop + document.body.clientHeight/2 - newDivHeight/2) + "px";
    newDiv.style.left = (document.body.scrollLeft + document.body.clientWidth/2 - newDivWidth/2) + "px";
    newDiv.innerHTML ='<div class="DialogueBox"><div class="top"><span>温馨提示</span><span class="Close"><img src="http://p4.51mdq.com/images/DialogueBoxClose.jpg" id="closepopup"></span></div>'
    	+'<div class="ConBox"><div class="Con"><img src="'+imgurl+'"><span>'+content+'</span></div><p id="timer" style="text-align:center;">5秒后自动关闭</p>'
    	+'</div></div>';
    document.body.appendChild(newDiv);
     newDiv.style.left=($(window).width()-452)/2+$(window).scrollLeft()+ "px";
     newDiv.style.top=($(window).height()-200)/2+$(window).scrollTop()+ "px";
    //弹出层滚动居中
    function newDivCenter()
    {
    	newDiv.style.left=($(window).width()-452)/2+$(window).scrollLeft()+ "px";
	     newDiv.style.top=($(window).height()-200)/2+$(window).scrollTop()+ "px";
    }
    if(document.all)
    {
        window.attachEvent("onscroll",newDivCenter);
    }
    else
    {
        window.addEventListener('scroll',newDivCenter,false);
    }
    //关闭新图层和mask遮罩层
    var newA = document.getElementById("closepopup");
    newA.onclick = function()
    {
        if(document.all)
        {
            window.detachEvent("onscroll",newDivCenter);
        }
        else
        {
            window.removeEventListener('scroll',newDivCenter,false);
        }
        document.body.removeChild(docEle(_id));
        document.body.removeChild(docEle(m));
        if(url!=undefined){
        	window.location.href=url;
        }
        return false;
    }
    if(url!=undefined){
    	count(5,url);
    }else{
    	count(5);
    }
}
function count(countFlag,url){
	if(document.getElementById("timer")!=null){
		document.getElementById("timer").innerHTML =countFlag+"秒自动关闭！";
	}
	if(countFlag==0){
		   function newDivCenter()
		    {
			   newDiv.style.left=($(window).width()-452)/2+$(window).scrollLeft()+ "px";
			     newDiv.style.top=($(window).height()-200)/2+$(window).scrollTop()+ "px";
		    }
		if(document.all)
        {
            window.detachEvent("onscroll",newDivCenter);
        }
        else
        {
            window.removeEventListener('scroll',newDivCenter,false);
        }
		if(document.getElementById("popup")!=null){
			
			document.body.removeChild(docEle("popup"));
		}
		if(document.getElementById("mask")){
			
			document.body.removeChild(docEle("mask"));
		}
		if(url!=undefined){
        	window.location.href=url;
        }
        return false;
	}else{
		countFlag--;
		if(document.getElementById("timer")!=null){
			if(url!=undefined){
				setTimeout("count("+countFlag+",'"+url+"')",1000);
			}
			else{
				setTimeout("count("+countFlag+")",1000);
			}
		}
	}
}