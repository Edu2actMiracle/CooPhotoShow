var _BFD = window._BFD || {};_BFD.addEvent=function(a,b,c){if(a.addEventListener){a.addEventListener(b,c,false)}else{if(a.attachEvent){a.attachEvent("on"+b,function(){c.call(a)})}else{a["on"+b]=c}}};_BFD.removeEvent=function(a,b,c){if(a.removeEventListener){a.removeEventListener(b,c,false)}else{if(a.detachEvent){a.detachEvent("on"+b,function(){c.call(a)})}else{a["on"+b]=null}}};_BFD.createElement=function(d,a){var c=document.createElement(d);if(a){for(var b in a){if(a.hasOwnProperty(b)){if(b==="class"||b==="className"){c.className=a[b]}else{if(b==="style"){c.style.cssText=a[b]}else{c.setAttribute(b,a[b])}}}}}return c};_BFD.loadScript=function(a,b){setTimeout(function(){var c=_BFD.createElement("script",{src:a,type:"text/javascript"});if(c.readyState){_BFD.addEvent(c,"readystatechange",function(){if(c.readyState==="loaded"||c.readyState==="complete"){if(b){b()}_BFD.removeEvent(c,"readystatechange",arguments.callee)}})}else{_BFD.addEvent(c,"load",function(){if(b){b()}_BFD.removeEvent(c,"load",arguments.callee)})}document.getElementsByTagName("head")[0].appendChild(c)},0)};_BFD.getByAttribute=function(f,g,a){var b=[],a=(a)?a:document,d=a.getElementsByTagName("*");for(var c=d.length-1;c>=0;c--){var e=d[c];if(f==="className"||f==="class"){if(e.className===g){b.send(e)}}else{if(e.getAttribute(f)===g){b.send(e)}}}return b};_BFD.getByClass=function(b,a){if(typeof document.getElementsByClassName==="function"){a=(a)?a:document;return Array.prototype.slice.call(a.getElementsByClassName(b))}else{return _BFD.getByAttribute("className",b,a)}};_BFD.getById=function(a){if(typeof a==="string"&&!!a){return document.getElementById(a)}};_BFD.loadCss=function(a){var b=_BFD.createElement("link",{href:a,rel:"stylesheet",type:"text/css"});document.getElementsByTagName("head")[0].appendChild(b)};

_BFD.setCookie = function(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;domain=.coo8.com;";
} 
_BFD.bfd_json = [];
_BFD.bfd_json.push(detailitem.product_bigcatalogname);
_BFD.bfd_json.push(detailitem.product_catalogname);
_BFD.bfd_new_json = _BFD.bfd_json.join("|").toString();
_BFD.bfd_jsons = [];
for(var i=0;i<_BFD.bfd_new_json.length;i++){
	_BFD.bfd_jsons.push(_BFD.bfd_new_json.charCodeAt(i));
}
_BFD.setCookie('bfd_category_goods',_BFD.bfd_jsons.join(".").toString());

_BFD.del_similar = (function(){//对于名称相似的去重 根据名称前几位来去重
	var iname = {};
	return function(arr_obj,prop,num){//对象数组  属性名称  去重名称后num个字符
		var i=0,j,flog,s_name,results=[],len = arr_obj.length;
		iname[prop] = [];
		for(;i<len;i++){
			s_name = arr_obj[i][prop].slice(0,arr_obj[i][prop].length - num);
			flog = false;
			for(j=0;j<iname[prop].length;j++){
				if(s_name === iname[prop][j]){
					flog = true;
					break;
				}else{
					continue;
				}
			}
			if(!flog){
				results.push(arr_obj[i]);
				iname[prop].push(s_name)	
			}
		}
		return results;
	}
})();

_BFD.remRepeat = function(arr, repeat_ids, num) {
	var res = [];
	var j = 0;
	if(!arr){return res;}
	for(var i = 0; i<arr.length; i++){
		var item_id = arr[i]["iid"];
		// 如果没有与需要过滤的结果重复,并且不足希望返回结果数目
		if (!repeat_ids[item_id]) {
			res.push(arr[i]);
			repeat_ids[item_id] = true;
			j++;
		}
		if (j>=num) {
			break;
		}
	}
	return res;
}
_BFD.repeat_ids = {};

_BFD.getByClass = function(oParent, sClass){
	var aEle=oParent.getElementsByTagName('*');
	var re=new RegExp('(^|\\s)'+sClass+'(\\s|$)', 'i');
	var aResult = [],aTmp = [],i = 0,j = 0;
	for(i=0;i<aEle.length;i++){
		if(re.test(aEle[i].className)){
			aResult.push(aEle[i]);
			break;
		}
	}
	return aResult;
}

_BFD.insertAfter = function(newElement, targetElement){
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}
	else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

_BFD.loadCss("http://static1.baifendian.com/service/kuba_new/new_kb_style.css");
_BFD.loadScript('http://static.baifendian.com/api/2.0/bcore.min.js',function(){
	new BCore(function(){

		if(detailitem.product_catalogname === "${catalogname}"){
			detailitem.product_catalogname = "Not provided";
		}

		var item_info = detailitem , // 库巴的数据对象 
			bfd_info = BFD_ITEM_INFO, // 百分点数据

			Tools = BCore.tools.Tools,
			rept = new BCore.tools.Repeat(),

			_itemid	= item_info.product_id,
			_pname = item_info.product_name,

			_itemnumber = item_info.product_itemid,
			_url = item_info.base_url+'/product/'+item_info.product_id+'.html',
			_img = (item_info.product_img3).replace("120_120","160_160"),

			_price = item_info.product_price, 
			_venderid = item_info.product_venderid,
			_category = Tools.removeRepeatArr( new Array(item_info.product_bigcatalogname,item_info.product_catalogname)),
			_category_url = Tools.removeRepeatArr( new Array(item_info.product_bigcatalogname_url,item_info.product_catalogname_url))
		
			_brand = item_info.product_brandname,
			_uid = ppkRead("UserInfo", "UserId"),

			_customid = bfd_info.client,
			//_customid = "Ctest_42",
			_cur_city = bfd_info.cur_city,

			_product_size = item_info.product_size||"";

		if(_brand === "${brandname}"){_brand = "Not provided"}

		if(!!_product_size && _product_size != ""&& _product_size != " "&& _product_size != "${size}"&& _product_size != null){
			_pname = _pname+_product_size;
		}

		this.options.cid = _customid;
		this.options.uid = _uid;

		this.options.p_t 	= "dt";//页面类型
		this.options.p_p = "rec";
		
		if(typeof(this.options.uid) == 'undefined' || this.options.uid == '' || this.options.uid == '0' || this.options.uid == null){
			this.options.uid = this.options.sid;
		}
		
		/*if(document.getElementById('SelectOver')!= null&&document.getElementById('SelectOver').innerHTML.indexOf('无')!=-1||document.getElementById('kcdesc')!= null&&document.getElementById('kcdesc').innerHTML.indexOf('无')!=-1||typeof(_BFD.getByClass(document,"lnTips")[0])!="undefined"&&_BFD.getByClass(document,"lnTips")[0].innerHTML.indexOf('已售完')!=-1){
			//商品下架
			this.send(new BCore.inputs.RmItem(_itemid));// delete item	
		}else{
				//添加商品
				var json = new BCore.inputs.JObject();
				//json.itemnumber = _itemnumber;
				json.venderid = _venderid;
				var add_item = new BCore.inputs.AddItem(_itemid);
				add_item.name = _pname;
				add_item.img = _img;
				add_item.prc = _price;
				add_item.grp = _itemnumber;
				add_item.cat = _category;
				add_item.typ = "shop";
				add_item.url = _url;
				add_item.brd = _brand;
				add_item.attr = json.toString();
		
				this.send(add_item);
				
		}*/

		this.send(new BCore.inputs.Visit(_itemid));

		var page_view = new BCore.inputs.PageView();
		page_view.p_s = _pname;//页面标签
		this.send(page_view);

		if(item_info.product_catalogname !== "Not provided"){
			var _cat_tree = [];
			var _cat_t_url = "";
			for(var i = 0;i<_category.length-1;i++){
				_cat_tree[i] = [];
				_cat_tree[i].push(_category[i]);
				_cat_tree[i].push(_category_url[i]);
			}
			
			var  _cat_name = _category[_category.length-1];
			var add_cat = new BCore.inputs.AddCat(_cat_name);
				add_cat.name = _cat_name;
				add_cat.url =  _category_url[_category.length-1];
				add_cat.ptree = new BCore.inputs.JObject().toString(_cat_tree);
			this.send(add_cat);
			this.send(new BCore.inputs.VisitCat(_cat_name));

		}

		var rfmt = new BCore.inputs.JObject();
		rfmt.iid = "$iid";
		rfmt.name = "$name";
		rfmt.price = "$price";
		rfmt.inum = "$grp";
		rfmt.category = "$pid";
		rfmt.url = "$url";
		rfmt.img = "$img";
		this.options.fmt = rfmt.toString();

		var Filter = BCore.recommends.Filter;
		var connectFilter = BCore.recommends.connectFilter;

		var filterCat = new Filter("cat","in",[item_info.product_bigcatalogname]);
		//var filterPrice  = new Filter("prc","!=",+(_price));
		//var cfiterconnectFilter = connectFilter(filterCat.toString(),"and",filterPrice.toString());

		var rec_vav = new BCore.recommends.RecVAV(_itemid,20);
		rec_vav.cat = item_info.product_catalogname;
		rec_vav.typ = "shop";
		//rec_vav.flt = cfiterconnectFilter;
		rec_vav.flt = filterCat.toString();
		rec_vav.p_bid = 'A04391D9_7A2A_35F8_7D37_1B5365A25A06';
		this.send(rec_vav, function(json){
			var rec_result = [];

			_BFD.vav_req = json[2];
			_BFD.vav_ban = "A04391D9_7A2A_35F8_7D37_1B5365A25A06";
			_BFD.vav_items = false;

			if (json&&json[3]!=null) {
				for(var i = 0;i < json[3]["length"];i++){// 重置 将数组类型 变成 字符串类型
					if(json[3][i]["inum"] && json[3][i]["inum"][0]){
						json[3][i]["inum"] = json[3][i]["inum"][0];
					}else{
						json[3][i]["inum"] = "unkwon"+i;
					}
				}
				json[3] =  _BFD.del_similar(json[3],"name",8);// 做名称相似去重 并且覆盖json[3] 

				_BFD.vav_items = json[3] =  _BFD.del_similar(json[3],"inum",0);// 做类型相似去重 并且覆盖json[3] 复制给_BFD.vav_items

				if(_BFD.vav_items.length === 0){_BFD.vav_items = false;} //如果空数组 则变为false 防止vub中setTimeout无限递归

				rec_result = _BFD.remRepeat(json[3],_BFD.repeat_ids,5);

				req_id = json[2];
			}

			if(bfd_show_vub && rec_result && rec_result.length > 0){

				var par_div = document.getElementById("related-sell");
				
				var obj_vav = document.createElement("div");
				obj_vav.className = "bfd_border";
				

				bfd_show_vub(rec_result,obj_vav);
				
				_BFD.insertAfter(obj_vav,par_div);

			}
		});
		var rec_vub = new BCore.recommends.RecVUB(_itemid,8);
		rec_vub.typ = "shop";
		//rec_vub.flt =  filterCat.toString();
		rec_vub.p_bid = 'E67D7143_543A_D8F7_79F8_C73DE01F6EB9';
		this.send(rec_vub, function(json){
			var rec_result = [];

			_BFD.vub_req = json[2];
			_BFD.vub_ban = "E67D7143_543A_D8F7_79F8_C73DE01F6EB9";
			if (json&&json[3]!=null) {
				for(var i = 0;i < json[3]["length"];i++){ // 重置 将数组类型 变成 字符串类型
					if(json[3][i]["inum"] && json[3][i]["inum"][0]){
						json[3][i]["inum"] = json[3][i]["inum"][0];
					}else{
						json[3][i]["inum"] = "unkwon"+i;
					}
				}
				json[3] =  _BFD.del_similar(json[3],"name",8);// 做名称相似去重 并且覆盖json[3]

				req_id = json[2];
			}

			try_vav_items();

			function try_vav_items(){ // 使用看还看补全

				var par_obj = _BFD.getByClass(document,"visited-items")[0];
				var obj_vub = document.createElement("div");
				obj_vub.className = "bfd_border";

				if(_BFD.vav_items && _BFD.vav_items.length > 0){
					if(!json[3]){json[3] = [];}
					json[3] = json[3].concat(_BFD.vav_items);
					rec_result = _BFD.remRepeat(json[3],_BFD.repeat_ids,8);
					if(bfd_show_vav && rec_result && rec_result.length > 0){
						bfd_show_vav(rec_result,obj_vub);
						par_obj.parentNode.insertBefore(obj_vub,par_obj);
					}

				}else if(_BFD.vav_items === false){

					rec_result = _BFD.remRepeat(json[3],_BFD.repeat_ids,8);
					if(bfd_show_vav && rec_result && rec_result.length > 0){
						bfd_show_vav(rec_result,obj_vub);
						par_obj.parentNode.insertBefore(obj_vub,par_obj);
					}

				}else{
					setTimeout(try_vav_items,100);				
				}
			}

		});

		//for 12/17 delete item by price img
		var _this = this; 
		_BFD.bfd_additem = function(){
			if(document.getElementById('SelectOver')!= null&&document.getElementById('SelectOver').innerHTML.indexOf('无')!=-1||document.getElementById('kcdesc')!= null&&document.getElementById('kcdesc').innerHTML.indexOf('无')!=-1||typeof(_BFD.getByClass(document,"lnTips")[0])!="undefined"&&_BFD.getByClass(document,"lnTips")[0].innerHTML.indexOf('已售完')!=-1){
				//商品下架
				_this.send(new BCore.inputs.RmItem(_itemid));// delete item	
			}else{
				var json = new BCore.inputs.JObject();
				//json.itemnumber = _itemnumber;
				json.venderid = _venderid;
				var add_item = new BCore.inputs.AddItem(_itemid);
				add_item.name = _pname;
				add_item.img = _img;
				add_item.prc = _price;
				add_item.grp = _itemnumber;
				add_item.cat = _category;
				add_item.typ = "shop";
				add_item.url = _url;
				add_item.brd = _brand;
				add_item.attr = json.toString();
		
				_this.send(add_item);
			}
		};
		
		_BFD.bfd_delitem = function(){
			if(_BFD.del_item==true){
				_this.send(new BCore.inputs.RmItem(_itemid));// delete item	
			}
		};
		_BFD.price_img = document.getElementById('itemimg');
		_BFD.oImg=new Image();
		_BFD.del_item = false;
		_BFD.oImg.onload=function (){
			_BFD.del_item = false;
			_BFD.bfd_additem();
			
		};
		_BFD.oImg.onerror=function (){
			_BFD.del_item = true;
			_BFD.bfd_delitem();
		};
		_BFD.oImg.src=_BFD.price_img.src;


		function bfd_show_vav(data_all,obj){
			var html = '';
			
			html = '<h2>浏览了该商品的用户还浏览了</h2>';

			var ul = document.createElement("ul");
			ul.className = "bfd_vav";
			obj.innerHTML = html;
			obj.appendChild(ul);
			var show_num = data_all.length;
			var cls = "";
			var req_id_now = "";
			//var obj_bh = {};
			var bfd_unique_id = data_all;
		
			var maxSize = bfd_unique_id.length > 8?8:bfd_unique_id.length;

			/*var c1=[],c2=[],c3=[];

			for(var l =0;l<maxSize;l++){
				var cats = bfd_unique_id[l]["category"];
				var cat_l = cats[cats.length-1]||cats[cats.length-2];
				var cat_b = cats[0];
				
				if(cat_l == item_info.product_catalogname){
					c1.push(bfd_unique_id[l]);
				}else if(cat_b == item_info.product_bigcatalogname){
					c2.push(bfd_unique_id[l]);
				}else{
					c3.push(bfd_unique_id[l]);
				}
			}
			c2 = c2.concat(c3);
			bfd_unique_id = c1.concat(c2);*/

			var req_id = '';
			for(var i=0;i<maxSize;i++){
				if (i == maxSize-1){cls = "bfd_last";}
				
				template(bfd_unique_id[i],ul,cls,i);
			}
			var bfd_logo = document.createElement('a');
			bfd_logo.href="http://www.baifendian.com";
			bfd_logo.target="_blank";
			bfd_logo.className="bfd_img_logo";
			obj.appendChild(bfd_logo);
		}
		function template(data_one,div,cls,i){
			var li = document.createElement("li");
			li.className = cls;

			var url_link = data_one.url;
			data_one.img = (data_one.img).replace("120_120","160_160");
			
			var html = "";
			html += '<a class="bfd_vav_img" href="'+url_link+'" target="_blank" title="'+data_one.name+'"><img src="'+data_one.img+'" onerror="imgERROR(this, \'no_pic_120_120.jpg\');" /></a>';
			html += '<span class="bfd_txt"><em><a href="'+url_link+'" target="_blank" title="'+data_one.name+'">'+data_one.name+'</a></em>';
			html += '<b>￥'+parseFloat(data_one.price).toFixed(2)+'</b></span>';
			li.innerHTML = html;
			div.appendChild(li);
			var _a = li.getElementsByTagName("a");
			for(var j = 0;j<_a.length;j++){
				Tools.bind(_a[j],"click",(function(x,iid){
					return function (){
						new BCore(function(){
							var fb = new $Core.inputs.FeedBack(_BFD.vub_req);
							fb.p_on = x + 1;
							fb.p_bid = _BFD.vub_ban;
							fb.iid = iid;
							this.send(fb);
						});
					}
				})(i, data_one.iid));
			}


		}


		function bfd_show_vub(data_all,obj){
			var html = '<h2>浏览了该商品的用户最终买了</h2>';
			var ul = document.createElement("ul");
			ul.className = "bfd_vub";
			obj.innerHTML = html;
			obj.appendChild(ul);
			var cls = "";
			var show_num = data_all.length;
			//var obj_bh = {};
			var bfd_unique_id = data_all;

			var maxSize = bfd_unique_id.length > 5?5:bfd_unique_id.length;

			var c1=[],c2=[],c3=[];

			for(var l =0;l<maxSize;l++){
				var cats = bfd_unique_id[l]["category"];
				var cat_l = cats[cats.length-1]||cats[cats.length-2];
				var cat_b = cats[0];
				
				if(cat_l == item_info.product_catalogname){
					c1.push(bfd_unique_id[l]);
				}else if(cat_b == item_info.product_bigcatalogname){
					c2.push(bfd_unique_id[l]);
				}else{
					c3.push(bfd_unique_id[l]);
				}
			}
			c2 = c2.concat(c3);
			bfd_unique_id = c1.concat(c2);

			for(var i=0;i<maxSize;i++){
				if (i == maxSize-1){cls = "bfd_last";}
				template_vub(bfd_unique_id[i],ul,cls,i);
			}
			var bfd_logo = document.createElement('a');
			bfd_logo.href="http://www.baifendian.com";
			bfd_logo.target="_blank";
			bfd_logo.className="bfd_img_logo";
			obj.appendChild(bfd_logo);
		}
		function template_vub(data_one,div,cls,i){
			var li = document.createElement("li");
			li.className = cls;

			var url_link = data_one.url;
			data_one.img = (data_one.img).replace("120_120","160_160");

			var num_show = (22 - 4*i)+(+(Math.random()*4).toFixed(0));
			
			var html = "";
			html += '<a class="bfd_vub_img" href="'+url_link+'" target="_blank" title="'+data_one.name+'"><img src="'+data_one.img+'" onerror="imgERROR(this, \'no_pic_120_120.jpg\');" /></a>';
			html += '<p class="bfd_title"><span class="bfd_title_span">&nbsp;<b>'+num_show+'%会买</b></span><a href="'+url_link+'" target="_blank" title="'+data_one.name+'">&nbsp;'+data_one.name+'</a></p>';

			html += '<p class="bfd_bj">￥'+parseFloat(data_one.price).toFixed(2)+'</p>';
			li.innerHTML = html;
			div.appendChild(li);

			var _a = li.getElementsByTagName("a");
			for(var j = 0;j<_a.length;j++){
				Tools.bind(_a[j],"click",(function(x,iid){
					return function (){
						new BCore(function(){
							var fb = new $Core.inputs.FeedBack(_BFD.vav_req);
							fb.p_on = x + 1;
							fb.p_bid = _BFD.vav_ban;
							fb.iid = iid;
							this.send(fb);
						});
					}
				})(i, data_one.iid));
			}
		}

	});
});
