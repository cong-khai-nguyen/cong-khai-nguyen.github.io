// Ajatix Image/Banner Slider
// Copyright (C) 2011-2016 Ajatix. All rights reserved.
// http://www.ajatix.com
(function($){var d=document, de=d.documentElement;if(!$){$=function(s, c){var out=[];if(typeof s!=="string")out=out.concat(s);else{var es=(c||d).querySelectorAll(s);for(var i=0;i<es.length;i++)out.push(es[i]);}var meths={css:function(p,v){var e=this;if(typeof p=="object"){for(var s in p)e.style[s]=p[s];}else{if(arguments.length>1){e.style[p]=v;}else{return [e.currentStyle? e.currentStyle[p]:window.getComputedStyle(e, "")[p]];}}},addClass:function(s){if(this.className.indexOf(s)==-1)this.className+=" "+s;},removeClass:function(s){this.className=this.className.replace(new RegExp(" ?"+s+"\\b"), "");},on:function(e,h){this.addEventListener?this.addEventListener(e,h):this.attachEvent&&this.attachEvent('on'+e,h);}};for(var meth in meths)(function(n,m){out[n]=function(){var r=[];for(var i=0;i<this.length;i++)r.push(m.apply(this[i],arguments));return r[0]? r[0][0]:out;}}(meth, meths[meth]));return out;}}function createDiv(id, parent){var div=d.createElement('div');if(id!='')div.id=id;parent.appendChild(div);return div;}function onLoad(){var hasTouch=('ontouchstart' in window);var listIR=[];var bResizing=false;var resizingTimer=null;var sTouch={},eTouch={},isOurTouch='undef',startUl,on='AJXIRRBCUUCC';function showPics(id,num){var m=listIR[id];if(m.n===num)return true;if(m.ncur!=-1){StopAnimation(m);prepareSlide(m, m.imgs[num].src);}m.n=num;if(m.ncur!=-1){if(!m.animating){hideCaption(m, true,function(){m.slidediv.style.display='block';showSlide(m);});}}else{SetCurDataCap(m);showCaption(m, true);ShowArrows(m);}m.ncur=num;};function showCaption(m, a, f){if(m.curcapa.style.display=='block'&&m.curcapa.innerHTML==''||m.curcaprich.style.display=='block'&&m.curcaprich.innerHTML==''){if(f)f();return;}m.curcapdiv.style.display='block';if(a==true){moveTo([[m.curcapdiv,{bottom:'0%'}]], 500,f);}else{m.curcapdiv.style.bottom='0px';}}function hideCaption(m, a, f){if(a==true){moveTo([[m.curcapdiv,{bottom:'-100%'}]],500,f);}else{m.curcapdiv.style.bottom='-100%';}}function SetCurDataCap(o){var itm=o.imgs[o.n];o.curcaprich.style.display=(itm.rc?'block':'none');o.curcapa.style.display=(itm.rc?'none':'block');if(itm.rc){o.curcaprich.innerHTML=itm.alt;}else{o.curcapa.href=itm.link;o.curcapa.innerHTML=itm.alt;o.curcapa.target=itm.target;}}function SetCurDataDiv(o){if(o.imgs.length>0){var itm=o.imgs[o.n==-1?0:o.n];var bLin=!(itm.link[itm.link.length-1]=='#');if(bLin){o.cura.href=itm.link;o.cura.target=itm.target;}var img=bLin? o.curimg:o.curimgdiv;img.src='';img.src=itm.src;o.divbtnwrap.style.cursor=(bLin?'pointer':'default');}}function SetCurSlide(o){if(o.imgs.length>0){var n=(o.n==-1?0:o.n);var is=o.slideimgs;is[1].src=o.imgs[n].src;is[1].iN=n;var np=n, nn=n;if(n>0){np=n-1;}else{np=o.imgs.length-1;}if(n<o.imgs.length-1){nn=n+1;}else{nn=0;}is[0].src=o.imgs[np].src;is[0].iN=np;is[2].src=o.imgs[nn].src;is[2].iN=nn;o.slidediv.style.left=-o.divpics.offsetWidth+'px';}}function StopAnimation(m){if(m.animating){if(m.slidediv.mtimer)clearInterval(m.slidediv.mtimer);SetCurDataDiv(m);m.animating=false;SetCurDataCap(m);}}function autoShow(){for(var id in listIR){var m=listIR[id];autoShowOne(m);}}function autoShowOne(m,pn){if(pn){pn=(pn>=1?1:(pn<=-1?-1:1));}var iN;var iA=(pn?pn:1);if(!pn&&m.n==m.liPics.length-1){m.n=-1;}iN=m.n+iA;if(iN>=0&&iN<=m.liPics.length-1){showCurBtn(m, iN);showPics(m.id,iN);}}function createNavigationBar(o, div){o.btndiv=createDiv('', div);o.btndiv.className='ajxbtn';var s='<ul>';for(var l=0;l<cnt;l++){s+='<li>'+(l+1)+'</li>'}s+='</ul>';o.btndiv.innerHTML=s;var newHTML='<div class="ajxleft"></div><div class="ajxnavpics">'+o.btndiv.innerHTML+'</div><div class="ajxright"></div>';o.btndiv.innerHTML=newHTML;o.ulBtn=$('ul', o.btndiv)[0];o.liBtn=$('li', o.ulBtn);o.btnpicdiv=$('.ajxnavpics', o.btndiv)[0];var s=o.ulBtn.style;s.position='relative';s.left='0px';s.width=o.liBtn.length*24+'px';var dvs=$('div', o.btndiv);for(var k=0;k<dvs.length;++k){if(dvs[k].className=='ajxright'){o.arr=dvs[k];dvs[k].obj=o;function evntAR(e){var o=this.obj;var evt=e||window.event;evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;var wh=parseInt(o.ulBtn.style.width)-(parseInt(o.ulBtn.style.left)*(-1)+o.Cvis*24);moveTo([[o.ulBtn,{left:parseInt(o.ulBtn.style.left)-Math.min(((o.Cvis==1)?1:(o.Cvis-1))*24, wh)}]], 500, function(){ShowArrows(o);});return false;}if(hasTouch){dvs[k].ontouchstart=evntAR;}else{dvs[k].onclick=evntAR;}}else if(dvs[k].className=='ajxleft'){o.arl=dvs[k];dvs[k].obj=o;function evntAL(e){var o=this.obj;var evt=e||window.event;evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;var wh=parseInt(o.ulBtn.style.left)*(-1);moveTo([[o.ulBtn,{left:parseInt(o.ulBtn.style.left)+Math.min(((o.Cvis==1)?1:(o.Cvis-1))*24, wh)}]], 500, function(){ShowArrows(o);});return false;}if(hasTouch){dvs[k].ontouchstart=evntAL;}else{dvs[k].onclick=evntAL;}}}function evntBtn(e){var o=this;var evt=e||window.event;evt.stopPropagation?evt.stopPropagation():evt.cancelBubble=true;if(o.className=='ajxcur')return false;handleButton(o);return false;}function handleButton(o){if(listIR[o._id].animating){o.timer_s=setTimeout(function(){handleButton(o);}, 100);return;}if(hasTouch){stopAutoplay(o._id);}unselBtn(o._id);o.className='ajxcur';showPics(o._id,o.I);if(hasTouch){startAutoplay(o._id);}}for(var k=0;k<o.liBtn.length;k++){var btn=o.liBtn[k];btn.I=k;btn._id=o.id;if(hasTouch){btn.ontouchstart=evntBtn;}else{btn.onclick=evntBtn;}}}function showNavigationBar(m){var bShowScroll=(m.liBtn.length>GetCountVisabledBtn(m, false));m.Cvis=GetCountVisabledBtn(m, bShowScroll);var Wbtn=m.Cvis*24;m.btnpicdiv.style.width=Wbtn+'px';var Wbar=Wbtn+(bShowScroll?30:0)+4;var k=m.divw.offsetWidth/1250;m.btndiv.style.right=Math.round(5*k)+'px';m.divbtnwrap.style.bottom=Math.round(4*k)+'px';m.arr.style.display=(bShowScroll?'block':'none');m.arl.style.display=(bShowScroll?'block':'none');showCurBtn(m);}function GetNavOffset(m){return Math.round(5*m.divw.offsetWidth/1250);}function GetCountVisabledBtn(m, bSS){return Math.min(Math.floor((m.divw.offsetWidth-GetNavOffset(m)-(bSS?(15+15):0)-4)/24),m.liBtn.length);}function showCurBtn(m, iN){unselBtn(m.id);if(iN===undefined){iN=(m.ncur==-1?0:m.ncur);}m.liBtn[iN].className='ajxcur';if(m.Cvis<m.liBtn.length){var lft=parseInt(m.ulBtn.style.left),Pos=(iN)*24+lft,End=(m.Cvis-1)*24;if(Pos<0){moveTo([[m.ulBtn,{left:lft-Pos}]], 200, function(){ShowArrows(m);});}else if(Pos>End){moveTo([[m.ulBtn,{left:lft-(Pos-End)}]], 200, function(){ShowArrows(m);});}else{var L1=m.Cvis*24-lft,Lbtns=m.liBtn.length*24;if(L1>Lbtns&&lft<0){lft+=L1-Lbtns;lft=(lft>0?0:lft);moveTo([[m.ulBtn,{left:lft}]], 200, function(){ShowArrows(m);});}else{ShowArrows(m);}}}else{m.ulBtn.style.left='0px';}}function createSliderElements(m){m.animating=false;m.divpics=$('.ajxpics', m.divw)[0];m.curdiv=d.createElement('div');m.curdiv.className='ajxcurdiv';m.curdiv.style.display='none';m.curadiv=d.createElement('div');m.curadiv.className='ajxcura';m.cura=d.createElement('a');m.cura.className='ajxcura';m.curimg=d.createElement('img');m.curimg.className='ajxcurimg';m.curimg._id=m.id;m.curimgdiv=d.createElement('img');m.curimgdiv.className='ajxcurimg';m.curimgdiv._id=m.id;m.cura.appendChild(m.curimg);m.curadiv.appendChild(m.curimgdiv);m.curdiv.appendChild(m.cura);m.curdiv.appendChild(m.curadiv);m.divbtnwrap=d.createElement('div');m.divbtnwrap.className='ajxbtnwrap';m.divw.appendChild(m.divbtnwrap);m.divbtnwrap._id=m.id;m.divbtnwrap.onclick=function(){var m=listIR[this._id];var itm=m.imgs[m.n==-1?0:m.n];if(itm.link[itm.link.length-1]=='#'){return false;}location=itm.link;};m.curcapdiv=d.createElement('div');m.curcapdiv.className='ajxcurcapdiv';m.curcapdiv.style.bottom='-100%';m.curcapdiv.style.opacity=1;var bgdiv=d.createElement('div');bgdiv.className='ajxbgdiv';m.curcapa=d.createElement('a');m.curcapa.className='ajxcurcapa';m.curcaprich=d.createElement('div');m.curcaprich.className='ajxcurcapa';m.curcapdiv.appendChild(bgdiv);m.curcapdiv.appendChild(m.curcapa);m.curcapdiv.appendChild(m.curcaprich);m.curdiv.appendChild(m.curcapdiv);m.divpics.appendChild(m.curdiv);m.slidediv=d.createElement('div');m.slidediv.className='ajxslidediv';m.slideimgs=[];for(var j=0;j<3;++j){m.slideimgs[j]=d.createElement('img');m.slidediv.appendChild(m.slideimgs[j]);}m.slidediv.style.display='none';m.divpics.appendChild(m.slidediv);m.curimgdiv.onload=m.curimg.onload=function(){var m=listIR[this._id];var itm=m.imgs[m.n==-1?0:m.n];var bLin=(itm.link[itm.link.length-1]=='#'?false:true);if(bLin){m.cura.style.display='block';m.curadiv.style.display='none';}else{m.curadiv.style.display='block';m.cura.style.display='none';}m.slidediv.style.display='none';if(m.divf)m.divf.style.display='none';SetCurSlide(m);};m.dir=1;m.p=1;m.d=0;createNavigationBar(m, m.divbtnwrap);SetSizes(m);$(window).on('resize', ResizeAll);SetCurDataDiv(m);}function ShowArrows(m){if(m.arr){m.arr.className='ajxright'+(parseInt(m.ulBtn.style.left)<=(m.Cvis-m.liPics.length)*24?' ajxrightd':'');}if(m.arl){m.arl.className='ajxleft'+(parseInt(m.ulBtn.style.left)==0?' ajxleftd':'');}}function showSlide(m){m.animating=true;moveTo([[m.slidediv,{left:(m.dir==0?0:-2*m.divpics.offsetWidth)}]], 1000, function(){SetCurDataDiv(m);SetCurDataCap(m);showCaption(m,true);m.animating=false;});}function prepareSlide(o, img){o.slidediv.style.left=-o.divpics.offsetWidth+'px';o.slideimgs[o.dir==0?0:2].src=img;}function unselBtn(id){for(var k=0;k<listIR[id].liBtn.length;k++){listIR[id].liBtn[k].className='';}}var divs=$('.'+on);for(var i=0;i<divs.length;i++){var obj={};obj.autoT=null;obj.n=-1;obj.ncur=-1;obj.id='id'+i;divs[i]._id=obj.id;obj.divw=divs[i];obj.imgs=[];obj.liPics=$('.ajxpics>ul>li', divs[i]);var cnt=obj.liPics.length;for(var j=0;j<cnt;j++){var itm={};var a=$('a', obj.liPics[j])[0];itm.link=a.href;var img=$('img', obj.liPics[j])[0];itm.src=img.src;itm.alt=img.alt;itm.target=a.target;itm.rc=(itm.link[itm.link.length-1]=='#'?true:false);obj.imgs[j]=itm;}for(var j=0;j<cnt;j++){var cdivs=$('div', obj.liPics[j]);if(cdivs.length>0&&cdivs[0].className=='ajxrc'){obj.imgs[j].rc=true;obj.imgs[j].alt=cdivs[0].innerHTML;}}listIR[obj.id]=obj;if(!hasTouch){divs[i].onmouseover=function(){stopAutoplay(this._id);};divs[i].onmouseout=function(){startAutoplay(this._id);};}if(hasTouch){var evt=window.navigator.msPointerEnabled ? 'MSPointerDown':'touchstart';$(divs[i]).on(evt, StartTouch);evt=window.navigator.msPointerEnabled ? 'MSPointerUp':'touchend';$(divs[i]).on(evt, EndTouch);evt=window.navigator.msPointerEnabled ? 'MSPointerMove':'touchmove';$(divs[i]).on(evt, MoveTouch);}}initShow();function initShow(){for(var id in listIR){var m=listIR[id];if(m.imgs.length>0){m.testimg=d.createElement('img');m.testimg.obj=m;m.testimg.onload=function(){var m=this.obj;createSliderElements(m);$(window).on('pagehide', StartPlayAll);m.curdiv.style.display='block';autoShowOne(m);startAutoplay(m.id);};m.testimg.src=m.imgs[0].src;}}}function SetSizes(m){var mw=$(m.divw).css('max-width');m.divpics.style.width=mw;do{var z=m.divw.offsetWidth/parseInt(mw);}while(!z);m.divw.style.height=m.divpics.offsetHeight*z+'px';if(m.divpics.style.transform==undefined){m.divpics.style.zoom=z;}else{m.divpics.style.transform='scale('+z+','+z+')';}showNavigationBar(m);}function ResizeAll(){if(bResizing){if(resizingTimer!=null){clearTimeout(resizingTimer);}resizingTimer=setTimeout(ResizeAll, 200);return;}bResizing=true;for(var id in listIR){var m=listIR[id];SetSizes(m);}bResizing=false;}function stopAutoplay(id){var m=listIR[id];if(m.autoT!=null){clearInterval(m.autoT);m.autoT=null;}}function startAutoplay(id){var m=listIR[id];if(m.autoT==null){var getFn=function(m){var fn=function(){autoShowOne(m);};return fn;};m.autoT=setInterval(getFn(m),4050);}}function StartPlayAll(event){for(var id in listIR){startAutoplay(id);}}function StartTouch(event){isOurTouch='undef';stopAutoplay(this._id);sTouch.x=event.touches[0].pageX;sTouch.y=event.touches[0].pageY;for(var i in sTouch)eTouch[i]=sTouch[i];var m=listIR[this._id];startUl=parseInt(m.slidediv.style.left);}function EndTouch(event){var dx=eTouch.x-sTouch.x,dy=eTouch.y-sTouch.y,d1=(dy>=0?dy:-dy),delta=dx,dd=(delta>0?delta:-delta);for(var i in sTouch)eTouch[i]=sTouch[i];if(dd>5||d1>5){event.preventDefault ? event.preventDefault():(event.returnValue=false);}var id=this._id;if(isOurTouch!='our'||delta==0){startAutoplay(id);return;}var m=listIR[id];if(dd>m.divpics.offsetWidth*0.2){m.n=m.slideimgs[(delta>0?0:2)].iN;m.ncur=m.n;showCurBtn(m, m.ncur);SetCurDataCap(m);moveTo([[m.slidediv,{left:(delta>0?0:-2*m.divpics.offsetWidth)}]],100, function(){SetCurDataDiv(m);hideCaption(m,false);showCaption(m,true);});}else{moveTo([[m.slidediv,{left:startUl}]],100, function(){m.slidediv.style.display='none';});}startAutoplay(id);if(dd>5){event.stopPropagation();return false;}}function MoveTouch(event){var x=event.touches[0].pageX,y=event.touches[0].pageY;eTouch.x=x;eTouch.y=y;while(isOurTouch=='undef'){var dx=x-sTouch.x,dy=y-sTouch.y;dx=(dx>=0?dx:-dx);dy=(dy>=0?dy:-dy);isOurTouch=(dx>=dy?'our':'sys');}if(isOurTouch=='sys'){return;}event.preventDefault ? event.preventDefault():(event.returnValue=false);var m=listIR[this._id],d1=x-sTouch.x,md=(d1>0?d1:-d1);m.slidediv.style.display='block';if(md<m.divpics.offsetWidth){m.slidediv.style.left=startUl+d1+'px';}else{m.slidediv.style.left=(d1>0?0:-2*m.divpics.offsetWidth)+'px';m.n=m.slideimgs[(d1>0?0:2)].iN;m.ncur=m.n;showCurBtn(m, m.ncur);SetCurDataDiv(m);m.slidediv.style.display='block';sTouch.x=x;}}function moveTo(pairs, speed, f){function getTime(){return window.performance&&performance.now&&performance.now()||new Date;}var oldpos=[];for(var i=0;i<pairs.length;i++){oldpos[i]={};for(var n in pairs[i][1])oldpos[i][n]=parseInt(pairs[i][0].style[n]);}var tstart=getTime();if(!speed)speed=1000;var e=pairs[0][0];var requestAnimFrame=window.requestAnimationFrame||function(callback, element){window.setTimeout(callback, 1000/60);};function animloop(timestamp){if(typeof timestamp!=typeof tstart)timestamp=getTime();var s=(timestamp-tstart)/speed;if(s>1)s=1;var v=((-Math.cos(s*Math.PI)/2)+0.5);for(var i=0;i<pairs.length;i++){for(var n in pairs[i][1]){var u=(pairs[i][1][n]+'').match(/\d+(\S*)/)[1]||'px';pairs[i][0].style[n]=Math.floor((parseInt(pairs[i][1][n])-oldpos[i][n])*v)+oldpos[i][n]+u;}}if(s<1)requestAnimFrame(animloop);else if(f)f();}requestAnimFrame(animloop);}function fadeTo(e, opacity, speed, f){var so=parseFloat(e.style.opacity);var tstart=new Date;if(!speed)speed=500;if(e.timer)clearInterval(e.timer);e.timer=setInterval(function(){var s=(new Date-tstart)/speed;if(s>1)s=1;var v=so+(opacity-so)*s;e.style.opacity=v;e.style.filter='alpha(opacity='+v*100+')';e.style.display='block';if(s==1){clearInterval(e.timer);if(opacity==1)e.style.filter='';if(opacity==0){e.style.display='none';e.style.opacity=0;e.style.filter='alpha(opacity=0)';}if(f)f();}}, 15);}};function addOnReady(f,fu){var isReady=false,ready=function(){if(!isReady){isReady=true;f();};};if(d.addEventListener){d.addEventListener('DOMContentLoaded',ready,false);window.addEventListener('load',ready,false);}if(window.attachEvent)window.attachEvent('onload',ready);if(d.documentElement.doScroll&&window==top){(function(){if(!isReady){try{d.documentElement.doScroll('left');}catch(E){setTimeout(arguments.callee,0);return;}ready();}})()}}addOnReady(onLoad, onLoad);})(window.jQuery);