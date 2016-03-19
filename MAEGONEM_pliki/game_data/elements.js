function addEvent(a,b,c){if(a.attachEvent){a.attachEvent("on"+b,c)}else{if(a.addEventListener){a.addEventListener(b,c,false)}}}function delEvent(a,b,c){if(a.detachEvent){a.detachEvent("on"+b,c)}else{if(a.removeEventListener){a.removeEventListener(b,c,false)}}}function elements(){this.eList=new Array()}elements.prototype.add=function(b){var a=b.split(";");if(a[0]=="type=other"){if(a[1]!="id="+hero.pid){this.eList[this.eList.length]=new eOther(b)}}if(a[0]=="type=npc"){this.eList[this.eList.length]=new eNPC(b)}if(a[0]=="type=item"){this.eList[this.eList.length]=new eItem(b)}if(a[0]=="type=equip"){this.eList[this.eList.length]=new eEquip(b)}if(a[0]=="type=trade"){this.eList[this.eList.length]=new eTrade(b)}if(a[0]=="type=gateway"){this.eList[this.eList.length]=new eGateway(b)}if(a[0]=="type=shop"){this.eList[this.eList.length]=new eShop(b)}if(a[0]=="type=troop"){this.eList[this.eList.length]=new eTroop(b)}};elements.prototype.del=function(c,b){for(var a in this.eList){if((this.eList[a].id==c)&&(this.eList[a].type==b)){ol.free(this.eList[a].uid);delete this.eList[a]}}};elements.prototype.delall=function(b){for(var a in this.eList){if(this.eList[a].type==b){ol.free(this.eList[a].uid);delete this.eList[a]}}};elements.prototype.draw=function(){for(var a in this.eList){this.eList[a].draw()}};elements.prototype.lookfor=function(d,c){if(d.target){var b=d.target}else{if(d.srcElement){var b=d.srcElement}}for(var a in this.eList){if(this.eList[a].uid==b.id){this.eList[a][c](d)}}};elements.prototype.list=function(b){for(var a in this.eList){if(this.eList[a].type==b){log(this.eList[a].name+" ITEM#"+this.eList[a].id+"."+global.serverno)}}};elements.prototype.collision=function(a,c){for(var b in this.eList){if((this.eList[b].type=="npc"&&this.eList[b].attack!=4)){if(this.eList[b].x==a&&this.eList[b].y==c){return true}}}return false};elements.prototype.checkAgressive=function(a,c){if(global.battle.now||global.battle.agrnow){return}for(var b in this.eList){if((this.eList[b].type=="npc")&&(this.eList[b].attack==3)&&(hero.lvl<parseInt(this.eList[b].lvl)+2)){if((Math.abs(this.eList[b].x-a)<2)&&(Math.abs(this.eList[b].y-c)<2)){global.battle.agrnow=true;hero.doMove();battlespeed=false;if(hero.opt&8){battlespeed=confirm("Naciśnij OK aby zawalczyć turowo, lub Anuluj dla szybkiej walki")}dbget("fight","attack="+this.eList[b].id+"&auto="+(battlespeed?"0":"1"));return}}}};elements.prototype.callHandler=function(b,c){for(var a in this.eList){if(this.eList[a].type==b){this.eList[a].handler(c)}}};function eBase(){}eBase.prototype.init=function(c,e){c=c.split(";");for(var b in c){c[b]=c[b].split("=");var a=c[b][0];c[b][0]="";this[a]=c[b].join("=").slice(1)}if(e){this.icon=e+this.icon}this.uid=ol.assign(this.icon,(this.type!="other")&&(this.type!="gateway"));var d=document.getElementById(this.uid);addEvent(d,"click",function(f){if(!f){var f=window.event}el.lookfor(f,"onclick")});addEvent(d,"mouseover",function(f){if(!f){var f=window.event}el.lookfor(f,"onover")});addEvent(d,"mouseout",function(f){if(!f){var f=window.event}el.lookfor(f,"onout")});addEvent(d,"mousemove",function(f){if(!f){var f=window.event}el.lookfor(f,"onmove")})};eBase.prototype.draw=function(){};eBase.prototype.handler=function(){};eBase.prototype.onclick=function(a){};eBase.prototype.onover=function(a){};eBase.prototype.onout=function(a){tip.hide()};eBase.prototype.onmove=function(a){};function eOther(a){this.init(a,global.path.characters);this.rx=this.x;this.ry=this.y;this.rz=0;this.step=0;this.nosize=true;this.framew=32;this.frameh=48}eOther.prototype=new eBase;eOther.prototype.checkSize=function(){if(!il||!il.getsize){return}var a=il.getsize(this.icon);if(a&&(a[0]+a[1])>1){this.framew=Math.round(a[0]/4);this.frameh=Math.round(a[1]/4);document.getElementById(this.uid).style.width=this.framew+"px";document.getElementById(this.uid).style.height=this.frameh+"px";this.nosize=false}};eOther.prototype.draw=function(){if(this.nosize){this.checkSize()}var f=document.getElementById(this.uid);var e=this.rx;var c=this.ry;if(this.rx+2<this.x){this.rx=parseFloat(this.x)-2}if(this.ry+2<this.y){this.ry=parseFloat(this.y)-2}if(this.rx-2>this.x){this.rx=parseFloat(this.x)+2}if(this.ry-2>this.y){this.ry=parseFloat(this.y)+2}var a=0.25;var h=0.25;if(Math.abs(this.rx-this.x)>1){a=0.5}if(Math.abs(this.ry-this.y)>1){h=0.5}if(this.rx>this.x){this.rx-=a}if(this.ry>this.y){this.ry-=h}if(this.rx<this.x){this.rx+=a}if(this.ry<this.y){this.ry+=h}if(this.rx-this.x!=0||this.ry-this.y!=0){this.step=(this.step+1)&3}else{this.step=0}var b=(this.rx-map.left())*32-(this.framew-32)/2;var d=(this.ry-map.top())*32-(this.frameh-32);if((b>-32)&&(b<513)&&(d>-32)&&(d<513)){if(ww=map.water[Math.round(this.rx)+Math.round(this.ry)*256]){var g=parseInt(ww)*4;if(g>this.rz){this.rz++}if(g<this.rz){this.rz--}if(g>this.rz+3){this.rz=g}if(g<this.rz-3){this.rz=g}if(f.style.height!=this.frameh-this.rz){f.style.height=this.frameh-this.rz}}else{if(f.style.height!=this.frameh+"px"){f.style.height=this.frameh;this.rz=0}}f.style.left=b;f.style.top=d+this.rz;f.style.backgroundPosition=(this.step*this.framew)+"px "+(-this.direction*this.frameh)+"px";f.style.zIndex=2+parseInt(this.y);f.style.display="block"}else{f.style.display="none"}};eOther.prototype.handler=function(b){b=b.split(";");for(var a in b){b[a]=b[a].split("=");this[b[a][0]]=b[a][1]}};eOther.prototype.onover=function(f){var d="<B>"+this.nick+"</B>";if(this.clan>0){d+="<i>["+global.clans[this.clan]+"]</i>"}var c=["Ciułacz","Początkujący","Nowicjusz","Włóczykij","Młody uczeń","Adept","Czeladnik","Akolita","Praktykant","Poszukiwacz","Podróżnik","Obieżyświat","Tajemniczy wędrowiec","Mroczny tułacz","Czempion","Ekspert","Mistrz","Arcymistrz","Łowca artefaktów","Natchniony","Poskramiacz smoków","Naznaczony","Bohater","Bożyszcze","Szept demonów","Odcień chaosu","Gwardzista piekieł","Piekielny jeździec","Demiurg strachu","Ponury zniwiarz","Pieśń bogów","Gniew boski","Wysłannik niebios","Boska światłość","Potomek Najwyższych"];var a="<center>"+c[Math.min(c.length-1,(this.lvl-1)>>3)]+"</center>";var b=this.rights;if(b>0){if(b&1){d+="Admin"}else{if(b&16){d+="Super MG"}else{if(b&2){d+="MG"}else{if(global.rpg){d+="Członek Rady<BR>"+a}else{d+="Pomocnik<BR>Lvl: "+this.lvl}}}}}else{d+=global.rpg?a:("Lvl: "+this.lvl)}if(global.pvp&&pvpfr(hero.prof0)!=pvpfr(this.prof)){tip.show(f.clientX,f.clientY,"other2",d)}else{tip.show(f.clientX,f.clientY,"other",d)}};eOther.prototype.onclick=function(g){if(Math.abs(this.x-hero.x)+Math.abs(this.y-hero.y)>1){return}var a=document.getElementById("menu");var b=document.getElementById("menuin");var f="";f+="<BUTTON onclick=\"hide('menu',true);dbget('fight','attackpvp="+this.id+"');\">Atakuj</BUTTON>";f+="<BUTTON onclick=\"hide('menu',true);dbget('trade','tt=1&who="+this.id+"');\">Handluj</BUTTON>";if(this.x==hero.x&&this.y==hero.y){f+="<BUTTON onclick=\"hide('menu',true);dbget('takeitem');\">Podnieś</BUTTON>";f+="<BUTTON onclick=dbget('walk')>Przejdź</BUTTON>"}f+="<BUTTON onclick=\"hide('menu',true);dbget('fight','joingroup="+this.id+"');\">Grupuj</BUTTON>";b.innerHTML=f;a.style.left=(g.clientX-60)+"px";var d=f.split("<BUTTON ");var c=502-20*d.length;a.style.top=Math.min(c,Math.max(0,g.clientY-20))+"px";show("menu",true)};function eNPC(a){this.init(a,global.path.npc);if(this.questmark>0){this.quid=ol.assign("http://www.margonem.pl/obrazki/inne/quest_mark.gif",true)}}eNPC.prototype=new eBase;eNPC.prototype.draw=function(){var d=document.getElementById(this.uid);if(this.questmark>0){var e=document.getElementById(this.quid)}var b=(this.x-map.left())*32;var c=(this.y-map.top())*32;if((b>-32)&&(b<513)&&(c>-32)&&(c<513)){var a=Math.max(0,d.offsetWidth/2-16);if((this.attack==4||this.attack==5)&&(Math.round(d.offsetWidth/64)==(d.offsetWidth/64))){a+=16}var f=Math.max(0,d.offsetHeight-32);d.style.left=b-a;d.style.top=c-f;d.style.zIndex=2+parseInt(this.y)+((this.attack==4)?parseInt(this.wtype):0);d.style.display="block";if(this.questmark>0){e.style.left=b+13;e.style.top=c-f-13;e.style.zIndex=2+parseInt(this.y);e.style.display="block"}}else{d.style.display="none";if(this.questmark>0){e.style.display="none"}}};eNPC.prototype.onover=function(d){if(this.lvl==0&&this.attack==4){return}var c="<B>"+this.nick+"</B>";if(this.attack!=4){if(this.lvl>0){var b="";if(this.attack==2||this.attack==3){if(hero.lvl-this.lvl>13){b="style='color:#888'"}else{if(this.lvl-hero.lvl>19){b="style='color:#f50'"}else{if(this.lvl-hero.lvl>9){b="style='color:#ff0'"}}}}var a="Lvl: "+this.lvl;if((this.attack==2||this.attack==3)&&global.rpg){if(hero.lvl-this.lvl>13){a="Niewarty uwagi"}else{if(this.lvl-hero.lvl>19){a="Potężny przeciwnik"}else{if(this.lvl-hero.lvl>9){a="Poważny rywal"}else{a="Zwykły przeciwnik"}}}}c+="<span "+b+">"+a+((this.fight_gr>0)?" (grp)":"")+"</span>"}if(this.wtype>79){c+="<I>heros</I>"}else{if(this.wtype>29){c+="<I>elita III</I>"}else{if(this.wtype>19){c+="<I>elita II</I>"}else{if(this.wtype>9){c+="<I>elita</I>"}}}}}tip.show(d.clientX,d.clientY,"npc",c)};eNPC.prototype.onclick=function(d){if(Math.abs(this.x-hero.x)>1||Math.abs(this.y-hero.y)>1){return}var a=document.getElementById("menu");var b=document.getElementById("menuin");var c="";if(this.attack==0){c="<BUTTON onclick=\"hide('menu',true);dbget('dialog','zkim="+this.id+"');hero.talker='"+this.nick+"'\">Rozmawiaj</BUTTON>"}if(this.attack==2||this.attack==3){c="<BUTTON onclick=\"hide('menu',true);dbget('fight','auto=1&attack="+this.id+"');\">Szybka walka</BUTTON><BUTTON onclick=\"hide('menu',true);dbget('fight','auto=0&attack="+this.id+"');\">Walka turowa</BUTTON>"}if(this.attack==5){if(this.wtype==1){but_name="Uruchom"}else{but_name="Obejrzyj"}c="<BUTTON onclick=\"hide('menu',true);dbget('dialog','zkim="+this.id+"');hero.talker='"+this.nick+"'\">"+but_name+"</BUTTON>"}if(this.attack==4){return}b.innerHTML=c;a.style.left=(d.clientX-60)+"px";a.style.top=(d.clientY-20)+"px";show("menu",true)};function eTroop(c){c=c.split(";");for(var b in c){c[b]=c[b].split("=");var a=c[b][0];c[b][0]="";this[a]=c[b].join("=").slice(1)}this.isnpc=(this.id<0)?1:0;if(this.isnpc){path=global.path.npc+"/"}else{path=global.path.characters}this.icon=path+this.icon;ol.oRoot="battleplace";this.nosize=true;this.framew=32;this.frameh=48;if(global.battle.posx[this.posy]>0){this.posx=global.battle.posx[this.posy];global.battle.posx[this.posy]++;global.battle.width[this.posy][this.posx]=this.framew}else{this.posx=0;global.battle.posx[this.posy]=1;global.battle.width[this.posy]=new Array();global.battle.width[this.posy][0]=this.framew}this.uid=ol.assign(this.icon,this.isnpc==1);var d=document.getElementById(this.uid);if(this.id==hero.pid){global.battle.myteam=this.team}if((global.battle.selected==0)&&(this.team!=global.battle.myteam)){global.battle.selected=this.id}if(this.id!=global.battle.selected){d.style.border="none"}else{document.getElementById(this.uid).style.border="1px solid "+(this.team==global.battle.myteam?"yellow":"red")}addEvent(d,"click",function(f){if(!f){var f=window.event}el.lookfor(f,"onclick")});addEvent(d,"mouseover",function(f){if(!f){var f=window.event}el.lookfor(f,"onover")});addEvent(d,"mouseout",function(f){if(!f){var f=window.event}el.lookfor(f,"onout")});addEvent(d,"mousemove",function(f){if(!f){var f=window.event}el.lookfor(f,"onmove")})}eTroop.prototype=new eBase;eTroop.prototype.checkSize=function(){if(!il||!il.getsize){return}var a=il.getsize(this.icon);if(a&&(a[0]+a[1])>1){if(this.isnpc){nw=a[0];nh=a[1]}else{nw=Math.round(a[0]/4);nh=Math.round(a[1]/4)}this.framew=nw;this.frameh=nh;global.battle.width[this.posy][this.posx]=this.framew;this.nosize=false}};eTroop.prototype.draw=function(){if(this.nosize){this.checkSize()}var d=document.getElementById(this.uid);if(this.hpp>0){var b=Math.max(0,d.offsetWidth/2-16);var e=Math.max(0,d.offsetHeight-32);var a=-8,c=0;for(i=0;i<global.battle.width[this.posy].length;i++){if(i<this.posx){c+=global.battle.width[this.posy][i]+8}a+=global.battle.width[this.posy][i]+8}d.style.left=Math.round(256-a/2)+c+"px";d.style.top=(160-this.posy*20-e)+"px";if(!this.isnpc){d.style.backgroundPosition=(this.team==1)?"0px "+this.frameh+"px":"0px 0px"}d.style.zIndex=375-parseInt(this.posy);d.style.display="block"}else{d.style.display="none"}};eTroop.prototype.handler=function(b){b=b.split(";");for(var a in b){if(b[a]=="selection=off"){document.getElementById(this.uid).style.border="none"}}};eTroop.prototype.onover=function(b){if(this.id==hero.pid){var a="Moja postać<br>Życie: "+this.hpp+"%"}else{var a="<B>"+this.nick+"</B>Lvl: "+this.lvl+"<BR>Życie: "+this.hpp+"%"}tip.show(b.clientX,b.clientY,"other",a)};eTroop.prototype.onclick=function(a){el.callHandler("troop","selection=off");document.getElementById(this.uid).style.border="1px solid "+(this.team==global.battle.myteam?"yellow":"red");global.battle.selected=this.id};function eItem(a){this.init(a,global.path.items);this.stats=hero.checkReqs(this.stats)}eItem.prototype=new eBase;eItem.prototype.draw=function(){var c=document.getElementById(this.uid);var a=(this.x-map.left())*32;var b=(this.y-map.top())*32;if((a>-32)&&(a<513)&&(b>-32)&&(b<513)){c.style.left=a;c.style.top=b;c.style.zIndex=1+parseInt(this.y);c.style.display="block"}else{c.style.display="none"}};eItem.prototype.onclick=function(a){};eItem.prototype.onover=function(b){var a="<B>"+this.name+"</B>"+this.stats;if(global.debug){a+="<BR>#"+this.id}tip.show(b.clientX,b.clientY,"item",a)};function initEqGlobals(){e1=new Object();e1.x=document.getElementById("equip").offsetLeft;e1.y=document.getElementById("equip").offsetTop;e1.w=document.getElementById("equip").offsetWidth;e1.h=document.getElementById("equip").offsetHeight;e1.posx=new Array(37,0,37,74,0,37,74,37,0);e1.posy=new Array(0,35,35,35,71,71,71,106,106);b1=new Object();b1.x=535;b1.y=270;b1.w=225;b1.h=233;s1=new Object();s1.x=130;s1.y=75;s1.w=260;s1.h=384;t1=new Object();t1.x=312;t1.y=0;t1.w=200;t1.h=260;t2=new Object();t2.x=413;t2.y=63;t2.w=97;t2.h=33}function blinkDrop(b,a){if(b&1){document.getElementById(a).style.backgroundColor="transparent"}else{document.getElementById(a).style.backgroundColor="#fc0"}b--;if(b){setTimeout("blinkDrop("+b+',"'+a+'")',500)}}function eEquip(c){c=c.split(";");for(var b in c){c[b]=c[b].split("=");var a=c[b][0];c[b][0]="";this[a]=c[b].join("=").slice(1)}if(this.state>0&&this.state<20){ol.oRoot="equip"}else{ol.oRoot="bag"}this.icon=global.path.items+this.icon;this.uid=ol.assign(this.icon,false);var d=document.getElementById(this.uid);d.className="cequip";this.bag=-1;if(this.state>=20){this.orgx=(this.state-20)*33;this.orgy=201;d.style.top=this.orgy+"px";d.style.left=this.orgx+"px";this.ox=b1.x;this.oy=b1.y;this.inbag=true}else{if(this.state>0){this.orgy=e1.posy[this.state-1];this.orgx=e1.posx[this.state-1];d.style.top=this.orgy+"px";d.style.left=this.orgx+"px";this.ox=e1.x;this.oy=e1.y;this.inbag=false;if((this.state==9)&&(this.id!=global.lastdrop)){blinkDrop(6,this.uid);global.lastdrop=this.id}}else{this.orgx=this.x*33;this.bag=Math.floor(this.y/6);this.orgy=(this.y%6)*33;if(global.bag!=this.bag){d.style.display="none"}else{d.style.display="block"}d.style.top=this.orgy+"px";d.style.left=this.orgx+"px";this.ox=b1.x;this.oy=b1.y;this.inbag=true}}this.drag=false;this.heal=this.stats.indexOf("Leczy")>=0;if(this.stats.indexOf("Strzał:")>=0){s=this.stats.split("Strzał: ");strz=parseInt(s[1]);if(strz<51){d.style.backgroundColor="#a00"}else{d.style.backgroundColor="transparent"}}else{if(this.stats.indexOf("<b class=expires>")>=0){d.style.backgroundColor="#da0"}else{d.style.backgroundColor="transparent"}}this.stats=hero.checkReqs(this.stats);addEvent(d,"click",function(f){if(!f){var f=window.event}el.lookfor(f,"onclick")});addEvent(d,"mouseover",function(f){if(!f){var f=window.event}el.lookfor(f,"onover")});addEvent(d,"mouseout",function(f){if(!f){var f=window.event}el.lookfor(f,"onout")});addEvent(d,"mousedown",function(f){if(!f){var f=window.event}el.lookfor(f,"ondown")})}eEquip.prototype=new eBase;eEquip.prototype.handler=function(a){if(a=="ask9"&&this.state==9){global.confirmdel=true}if(a=="bag"&&this.inbag&&this.state<20){var b=document.getElementById(this.uid);if(global.bag!=this.bag){b.style.display="none"}else{b.style.display="block"}}};eEquip.prototype.onover=function(b){var a="<B>"+this.name+"</B>"+this.stats;if(this.price>0){a+="Wartość: "+this.price}if(global.debug){a+="<BR>#"+this.id}tip.show(b.clientX,b.clientY,"item",a)};eEquip.prototype.ondown=function(c){this.x=c.clientX;this.y=c.clientY;var b=document.getElementById(this.uid);var a=document.getElementById("oDrag").style;a.backgroundImage=b.style.backgroundImage;global.drag=this;this.mdown=nowms();tip.hide();b.style.opacity=0.5;b.style.filter="alpha(opacity=50)";if(ie6){c.cancelBubble=true}a.display="block";mousemove(c)};eEquip.prototype.onup=function(f){var d=document.getElementById(this.uid);global.drag=false;d.style.opacity=1;d.style.filter="";var b=document.getElementById("oDrag").style;b.display="none";if(ie6){f.cancelBubble=true}var h=f.clientX;var g=f.clientY;if((h>e1.x)&&(h<e1.x+e1.w)&&(g>e1.y)&&(g<e1.y+e1.h)){if(h>e1.x&&h<e1.x+32&&g>e1.y+106&&g<e1.y+138){global.confirmdel=false;el.callHandler("equip","ask9");if(!global.confirmdel||((ge("dialog").style.display!="block")&&confirm("Na pewno zniszczyć przedmiot?"))){dbget("moveitem","stan=-2&iid="+this.id)}}else{if(this.stats.indexOf("Leczy")>=0||this.itemclass==16||this.stats.indexOf("Zawiera ")>=0){dbget("moveitem","stan=-4&iid="+this.id)}else{dbget("moveitem","stan=1&iid="+this.id)}}}else{if((h>b1.x)&&(h<b1.x+b1.w)&&(g>b1.y)&&(g<b1.y+b1.h)){var k=Math.round((h-b1.x-16)/33);var j=Math.round((g-b1.y-16)/33);var a=nowms();var c=a-this.mdown;if(c<0){c+=60000}if(this.itemclass==24&&c<300&&k<3){global.bag=k;el.callHandler("equip","bag")}else{if(j==6){if(this.itemclass==24){dbget("moveitem","stan=1&iid="+this.id+"&dx="+k)}else{dbget("moveitem","stan=2&iid="+this.id+"&bag="+k)}}else{dbget("moveitem","stan=0&iid="+this.id+"&dx="+k+"&dy="+j+"&bag="+global.bag)}if(this.inbag){this.orgx=k*33;this.orgy=j*33}}}else{if((h>s1.x)&&(h<s1.x+s1.w)&&(g>s1.y)&&(g<s1.y+s1.h)&&(document.getElementById("shop").style.display=="block")){dbget("shop","kto="+hero.talkerid+"&sprzedaj="+this.id)}else{if((h>t1.x)&&(h<t1.x+t1.w)&&(g>t1.y)&&(g<t1.y+t1.h)&&(document.getElementById("trade").style.display=="block")){if((h>t2.x)&&(h<t2.x+t2.w)&&(g>t2.y)&&(g<t2.y+t2.h)){dbget("trade","who="+global.trader+"&tt=3&it="+this.id+"&tx="+Math.min(2,Math.round((h-t2.x)/33)))}else{dbget("trade","who="+global.trader+"&tt=3&it="+this.id+"&tx=3")}}else{if(ge("mails").style.display=="block"&&h<512&&g<256){if(this.stats.indexOf("Związany z właścicielem")>=0){alert("Przedmiotów związanych nie można wysyłać!")}else{global.attitem=this.id;ge("attitem").innerHTML='<img src="'+this.icon+'" tip="<b>'+this.name+"</B>"+this.stats+'">'}}else{if(ge("auctions").style.display=="block"&&h<512){if(this.stats.indexOf("Związany z właścicielem")>=0){if(confirm("Czy na pewno chcesz wystawić przedmiot związany?\nPrzedmiot nie zostanie zwrócony jeśli się nie sprzeda,\njednak możesz zarobić Smocze Łzy jeśli ktoś go kupi.")){newauction(this.id,'<img src="'+this.icon+'" tip="<b>'+this.name+"</B>"+this.stats+'">',1)}}else{newauction(this.id,'<img src="'+this.icon+'" tip="<b>'+this.name+"</B>"+this.stats+'">',0)}}else{if(h<512){if(confirm("Na pewno wyrzucić przedmiot?"+((hero.lvl<20)?"\nMożesz zniszczyć przedmiot wkładając go w pole pod mieczem.\nKiedy zaatakujesz potwora, to pole jest automatycznie czyszczone.":""))){dbget("moveitem","stan=-1&iid="+this.id)}}}}}}}}d.style.left=this.orgx+"px";d.style.top=this.orgy+"px"};function eTrade(c){c=c.split(";");for(var b in c){c[b]=c[b].split("=");var a=c[b][0];c[b][0]="";this[a]=c[b].join("=").slice(1)}if(this.x>2){this.y2=t2.y+51}else{this.y2=t2.y}if(hero.pid==this.y){this.x2=102;this.drag=true}else{this.x2=2;this.drag=false}this.icon=global.path.items+this.icon;this.uid=ol.assign(this.icon,false);var d=document.getElementById(this.uid);d.className="cequip";this.stats=hero.checkReqs(this.stats);this.ox=0;this.oy=0;this.orgx=312+this.x2+(this.x>2?1:this.x)*32;this.orgy=this.y2;d.style.top=this.orgy+"px";d.style.left=this.orgx+"px";d.style.zIndex=306;this.inbag=true;addEvent(d,"click",function(f){if(!f){var f=window.event}el.lookfor(f,"onclick")});addEvent(d,"mouseover",function(f){if(!f){var f=window.event}el.lookfor(f,"onover")});addEvent(d,"mouseout",function(f){if(!f){var f=window.event}el.lookfor(f,"onout")});addEvent(d,"mousedown",function(f){if(!f){var f=window.event}el.lookfor(f,"ondown")})}eTrade.prototype=new eBase;eTrade.prototype.onover=function(b){var a="<B>"+this.name+"</B>"+this.stats;if(this.price>0){a+="Wartość: "+this.price}if(global.debug){a+="<BR>#"+this.id}tip.show(b.clientX,b.clientY,"item",a)};eTrade.prototype.ondown=function(c){if(ie6){c.cancelBubble=true}if(!this.drag){return}this.x=c.clientX;this.y=c.clientY;var b=document.getElementById(this.uid);var a=document.getElementById("oDrag").style;a.backgroundImage=b.style.backgroundImage;global.drag=this;tip.hide();b.style.opacity=0.5;b.style.filter="alpha(opacity=50)";a.display="block";mousemove(c)};eTrade.prototype.onup=function(f){if(ie6){f.cancelBubble=true}if(!this.drag){return}var d=document.getElementById(this.uid);global.drag=false;d.style.opacity=1;d.style.filter="";var b=document.getElementById("oDrag").style;b.display="none";var c=f.clientX;var a=f.clientY;if((c>t1.x)&&(c<t1.x+t1.w)&&(a>t1.y)&&(a<t1.y+t1.h)&&(document.getElementById("trade").style.display=="block")){if((c>t2.x)&&(c<t2.x+t2.w)&&(a>t2.y)&&(a<t2.y+t2.h)){dbget("trade","who="+global.trader+"&tt=4&it="+this.id+"&tx="+Math.min(2,(c-t2.x)>>5))}else{dbget("trade","who="+global.trader+"&tt=4&it="+this.id+"&tx=3")}}else{dbget("trade","who="+global.trader+"&tt=5&it="+this.id)}};function eGateway(b){this.icon=global.path.wwwserver+"/obrazki/inne/exit.png";this.init(b);this.name=global.towns[parseInt(this.id)];var a=document.getElementById(this.uid);if(ie6){a.style.background="";a.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.icon+"', sizingMethod='scale')"}a.style.height="32px";a.style.zIndex=1}eGateway.prototype=new eBase;eGateway.prototype.draw=function(){var c=document.getElementById(this.uid);var a=(this.x-map.left())*32;var b=(this.y-map.top())*32;if((a>-32)&&(a<513)&&(b>-32)&&(b<513)){c.style.left=a;c.style.top=b;c.style.display="block";if(ie6&&c.style.background!=""){c.style.background=""}}else{c.style.display="none"}};eGateway.prototype.onover=function(b){var a="<B>"+this.name+"</B>";if(this.lock>0){a+="(wymaga klucza)"}tip.show(b.clientX,b.clientY,"gateway",a)};function eShop(c){c=c.split(";");for(var b in c){c[b]=c[b].split("=");var a=c[b][0];c[b][0]="";this[a]=c[b].join("=").slice(1);this[c[b][0]]=c[b][1]}this.icon=global.path.items+this.icon;ol.oRoot="shopin";this.uid=ol.assign(this.icon,false);var d=document.getElementById(this.uid);d.className="cequip";this.orgx=(ie6?0:7)+(this.x*32);this.orgy=(ie6?0:7)+(this.y*32);d.style.top=this.orgy+"px";d.style.left=this.orgx+"px";this.ox=s1.x;this.oy=s1.y;this.drag=false;this.stats=hero.checkReqs(this.stats);addEvent(d,"click",function(f){if(!f){var f=window.event}el.lookfor(f,"onclick")});addEvent(d,"mouseover",function(f){if(!f){var f=window.event}el.lookfor(f,"onover")});addEvent(d,"mouseout",function(f){if(!f){var f=window.event}el.lookfor(f,"onout")});addEvent(d,"mousedown",function(f){if(!f){var f=window.event}el.lookfor(f,"ondown")})}eShop.prototype=new eBase;eShop.prototype.onover=function(b){var a="<B>"+this.name+"</B>"+this.stats;a+="<BR>Cena: "+round(this.price,2);a=a.split("Związany z właścicielem").join("Wiąże po kupieniu");tip.show(b.clientX,b.clientY,"item",a)};eShop.prototype.ondown=function(c){this.x=c.clientX;this.y=c.clientY;var b=document.getElementById(this.uid);var a=document.getElementById("oDrag").style;a.backgroundImage=b.style.backgroundImage;global.drag=this;tip.hide();b.style.opacity=0.5;b.style.filter="alpha(opacity=50)";if(ie6){c.cancelBubble=true}a.display="block";mousemove(c)};eShop.prototype.onup=function(f){var d=document.getElementById(this.uid);global.drag=false;d.style.opacity=1;d.style.filter="";var b=document.getElementById("oDrag").style;b.display="none";if(ie6){f.cancelBubble=true}var c=f.clientX;var a=f.clientY;if((c>b1.x)&&(c<b1.x+b1.w)&&(a>b1.y)&&(a<b1.y+b1.h)){dbget("shop","kto="+hero.talkerid+"&kup="+this.id+"&bag="+global.bag)}d.style.left=this.orgx+"px";d.style.top=this.orgy+"px"};