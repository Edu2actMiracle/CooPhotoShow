if(referUrl == null || referUrl == '') referUrl = "Directinput";
var ipinyouReferUrl=escape(encodeURI(referUrl)), ipinyouUrl=escape(encodeURI(url));
var meSiteId = "", adMaterialId = "";
ipinyouGetAdFrom(url.href);if(adMaterialId == "") ipinyouGetAdFrom(referUrl);
if(meSiteId != "" && adMaterialId != ""){
	var date = new Date();
	date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
	document.cookie = "meSiteId=" + meSiteId + ";path=/;expires=" + date.toGMTString();
	document.cookie = "adMaterialId=" + adMaterialId + ";path=/;expires=" + date.toGMTString();
}else{
	meSiteId = ipinyouGetCookieValue("meSiteId");
	adMaterialId = ipinyouGetCookieValue("adMaterialId");
}
var params = "?clReferUrl="+ipinyouReferUrl+"&clUrl="+ipinyouUrl+"&owLabelId="+owLabelId+"&owId="+owId+"&meSiteId="+meSiteId+"&adMaterialId="+adMaterialId;
for(var i=0;i<successUrl.length;i++){
	if(url.href.indexOf(successUrl[i]) == 0){
		document.writeln("<script type='text/javascript' src='http://optimus.ipinyou.com/ai.jsp"+params+"&r="+Math.random()+"></script>")
		break;
	}
}
document.writeln("<script type='text/javascript' src='http://optimus.ipinyou.com/collect.jsp"+params+"&jsType=4&r="+Math.random()+"'><\/script>");
function ipinyouGetAdFrom(currentUrl){
	var beginIndex = currentUrl.indexOf("meSiteId=");
	if(beginIndex != -1){
		beginIndex += 9;
		var endIndex = currentUrl.indexOf("&", beginIndex);
		if(endIndex != -1)
			meSiteId = currentUrl.substring(beginIndex, endIndex);
		else
			meSiteId = currentUrl.substring(beginIndex);
		
		beginIndex = currentUrl.indexOf("adMaterialId=");
		if(beginIndex != -1){
			beginIndex += 13;
			endIndex = currentUrl.indexOf("&", beginIndex);
			if(endIndex != -1)
				adMaterialId = currentUrl.substring(beginIndex, endIndex);
			else
				adMaterialId = currentUrl.substring(beginIndex);
		}
	}
}
function ipinyouGetCookieValue(cookieName){
	var cookieValue = document.cookie.match(new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)"));
	if(cookieValue != null) {
		cookieValue = unescape(cookieValue[2]);
		var beginIndex = cookieValue.indexOf("&");
		if(beginIndex > -1)
			cookieValue = cookieValue.substring(0,beginIndex);
	} else {
		cookieValue = "";
	}
	return cookieValue;
}