(function(){var g="1.0.2.1";if(window._mvq&&!(window._mvq instanceof Array)){return}var a=window._mv_loader={};a._cmdRunnerList=[];a.reg=function(i,j){this._cmdRunnerList.push([i,j])};a.KD=a.cmdList=[];a.runCmd=function(){for(var m=0,j=this._cmdRunnerList.length;m<j;m++){var k=this._cmdRunnerList[m];k[1].apply(k[0],arguments)}};a.support=function(j){function i(n){this.runner=n}i.prototype={push:function(){var o=arguments.length;for(var p=0;p<o;p++){var n=[];Array.prototype.push.apply(n,arguments[p]);var q=n.shift();this.runner[q]&&this.runner[q].apply(this.runner,n)}}};var m=window._mv_loader,k=m.cmdList,l=new i(j);m.reg(l,l.push);l.push.apply(l,k);return};var h={};if("https:"==document.location.protocol){var c=["https://material-ssl.mediav.com/bjjs/mba.js","https://material-ssl.mediav.com/static/mv.js","","","","https://material-ssl.mediav.com/bjjs/fpass.js"]}else{var c=["http://material.mediav.com/bjjs/mba.js","http://static.mediav.com/mv.js","","","","http://material.mediav.com/bjjs/fpass.js"]}var f=["xueersi.com"];function b(k){var n=false;for(var m=0,j=f.length;m<j;m++){k.indexOf(f[m])>=0&&(n=true)}return n}if(b(document.domain)){c[1]=0}function e(){var p=window._mv_config=window._mv_config||{};m&&m[0]&&(p.siteid=m[0][1]);var o=window.mv_switch||31;p.siteid&&h[p.siteid]&&(o=h[p.siteid]);var m=window._mvq;if(window._mvq){for(var k=0,j=m.length;k<j;k++){a.runCmd.call(a,m[k]);a.cmdList.push(m[k])}}window._mvq=m={};m.push=function(){a.runCmd.apply(a,arguments);Array.prototype.push.apply(a.cmdList,arguments)};for(var k=0,j=c.length;k<j;k++){if(o&Math.pow(2,k)){try{c[k]&&d(c[k])}catch(n){}}}}function d(j){if(!j){return}var i=document.createElement("script");i.type="text/javascript";i.async=true;i.src=j;var k=document.getElementsByTagName("script")[0];k.parentNode.insertBefore(i,k)}e()})();