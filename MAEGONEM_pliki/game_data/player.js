function player(m){this.pid=getCookie("mchar_id");if(this.pid<1){this.pid=getCookie("user_id")}this.hash=getCookie("chash");if(this.hash){this.hash=this.hash.substr(0,10)}this.x=-1;this.y=-1;this.rx=-1;this.ry=-1;this.mx=-1;this.my=-1;this.kier=0;this.framew=32;this.frameh=48;this.nosize=true;this.dazed=false;this.dazedleft=0;this.cmap="";this.opt2=0;this.mana=0;this.energy=0;this.maxhp=10000;var g=m;var h;var f="";var o="";var n=false;var d=new Array();var e=0;var c=new Array();this.setup=function(t){t=t.split(";");for(var q in t){t[q]=t[q].split("=");if(t[q][0]=="x"||t[q][0]=="y"){this[t[q][0]]=parseInt(t[q][1])}else{this[t[q][0]]=t[q][1]}}var r=global.path;if(this.mpath.length>1){if(this.mpath.indexOf("http:")>=0){r.server=this.mpath}else{r.server="file:///"+this.mpath.slice(0,-1)}}this.img=r.characters+this.img;il.preload(this.img,"onload",this);this.lvl=parseInt(this.lvl);if(this.lvl>80){var v=new Date();v.setTime(v.getTime()+360000*24*3);setCookie("premCounter",99,v,"/","margonem.pl")}var s=["Ciułacz","Początkujący","Nowicjusz","Włóczykij","Młody uczeń","Adept","Czeladnik","Akolita","Praktykant","Poszukiwacz","Podróżnik","Obieżyświat","Tajemniczy wędrowiec","Mroczny tułacz","Czempion","Ekspert","Mistrz","Arcymistrz","Łowca artefaktów","Natchniony","Poskramiacz smoków","Naznaczony","Bohater","Bożyszcze","Szept demonów","Odcień chaosu","Gwardzista piekieł","Piekielny jeździec","Demiurg strachu","Ponury zniwiarz","Pieśń bogów","Gniew boski","Wysłannik niebios","Boska światłość","Potomek Najwyższych"];document.getElementById("lp_nick").innerHTML=this.nick+" ("+this.lvl+")";document.getElementById("lp_nick").setAttribute("tip",this.prof+(global.rpg?(", "+s[Math.min(s.length-1,(this.lvl-1)>>3)]):""));this.nextexp=Math.round(Math.pow(this.lvl,4)+10);var p=Math.round(Math.pow(this.lvl-1,4)+10);if(this.lvl==1){p=0}var u=Math.min(1,Math.max((this.exp-p)/(this.nextexp-p),0.001));document.getElementById("exp2").style.width=Math.round(document.getElementById("exp1").offsetWidth*u)+"px";addEvent(document.getElementById("exp1"),"mouseover",function(w){if(!w){var w=window.event}tip.show(w.clientX,w.clientY,"","<B>Doświadczenie:</B>"+round(hero.exp,2)+"/"+round(hero.nextexp,2)+"<B>Do "+(parseInt(hero.lvl)+1)+" poziomu:</B>"+round(hero.nextexp-hero.exp,3))});addEvent(document.getElementById("exp1"),"mouseout",function(w){tip.hide()});addEvent(document.getElementById("exp1"),"mousemove",function(w){if(!w){var w=window.event}tip.move(w.clientX,w.clientY)});addEvent(document.getElementById("stat2but"),"click",function(x){if(!x){var x=window.event}var w=Math.min(Math.floor((x.clientX-660)/23),4);if(w!=e){e=w;document.getElementById("stat2in").innerHTML=d[e];document.getElementById("stat2").style.backgroundPosition="0 "+(-98*w)+"px"}});this.rx=this.x;this.ry=this.y;this.rz=0;this.step=0;h=true;this.nosize=true};this.stats=function(u){u=u.split(";");for(var q in u){u[q]=u[q].split("=");this[u[q][0]]=u[q][1]}document.getElementById("newlvl").style.display=(this.ap>0)?"block":"none";if(this.ap>0){document.getElementById("abpoints").innerHTML="Wybierz na co przeznaczasz punkty zdolności.<br>Pozostało punktów: "+this.ap}else{document.getElementById("abpoints").innerHTML="<br>Nie masz wolnych punktów zdolności"}document.getElementById("ab11").style.display=(this.ap>0)?"block":"none";document.getElementById("ab12").style.display=(this.ap>0)?"block":"none";document.getElementById("ab13").style.display=(this.ap>0)?"block":"none";document.getElementById("ab51").style.display=(this.ap>4)?"block":"none";document.getElementById("ab52").style.display=(this.ap>4)?"block":"none";document.getElementById("ab53").style.display=(this.ap>4)?"block":"none";this.lvl=parseInt(this.lvl);this.nextexp=Math.round(Math.pow(this.lvl,4)+10);var p=Math.round(Math.pow(this.lvl-1,4)+10);if(this.lvl==1){p=0}var v=Math.min(Math.max((this.exp-p)/(this.nextexp-p),0.001),1);document.getElementById("exp2").style.width=Math.round(1+106*v)+"px";document.getElementById("gold").innerHTML=" "+round(this.gold,3);document.getElementById("lp_nick").innerHTML=this.nick+" ("+this.lvl+")";var t=parseFloat(this.hp)/parseFloat(this.maxhp);document.getElementById("life2").style.width=Math.round(1+106*t)+"px";addEvent(document.getElementById("life1"),"mouseover",function(x){if(!x){var x=window.event}tip.show(x.clientX,x.clientY,"","<B>Punkty życia:</B>"+hero.hp+"/"+hero.maxhp)});addEvent(document.getElementById("life1"),"mouseout",function(x){tip.hide()});document.getElementById("base3").innerHTML=this.st+"<br>"+this.ag+"<br>"+this.it;addEvent(document.getElementById("base3"),"mouseover",function(x){if(!x){var x=window.event}tip.show(x.clientX,x.clientY,"","<B>Bazowe statystyki:</B>"+hero.bstr+"/"+hero.bagi+"/"+hero.bint)});addEvent(document.getElementById("base3"),"mouseout",function(x){tip.hide()});var r=Math.round((parseInt(this.mina)+parseInt(this.maxa))/2);d[0]=r+" &plusmn;"+Math.round(r-this.mina)+"<br>~"+this.maga+"<br>"+this.sa+"<br>"+this.ac+"<BR>"+this.acm+"<br>";d[1]=this.honor+"<br>"+this.credits+'<br><span tip="'+this.protickets+'">'+Math.max(0,this.timetickets)+"</span>";document.getElementById("exp2").style.backgroundImage="url(http://www.margonem.pl/obrazki/interface/"+((this.timetickets>0)?"exp.png)":"noexp.png)");var s=" ("+Math.min(50,Math.round(40*this.evade/this.lvl))+"%)";var w=" ("+Math.round(20*this.block/this.lvl)+"%)";d[2]=this.crit+"%<br>x"+this.critval+"<br>x"+this.critmval+"<br>"+this.evade+s+"<br>"+this.block+w;d[3]=this.act+"<br>"+this.absorb+"<br>"+this.absorbm+"<br>"+this.heal;d[4]="";document.getElementById("stat2in").innerHTML=d[e];this.pvp=parseInt(this.pvp);if(this.pvp){global.r.pvpbutton=0;document.getElementById("pvpbutton").style.backgroundPosition="0 0"}else{global.r.pvpbutton=-44;document.getElementById("pvpbutton").style.backgroundPosition="0 -44px"}setih("mana",this.mana);setih("energy",this.energy);setih("mailnotifier",this.mails)};this.pvpclick=function(){if(!this.pvp){dbget("setpvp","mode=1")}else{dbget("setpvp","mode=0")}};this.fixwater=function(){if(map.water){if(ww=map.water[Math.round(this.rx)+Math.round(this.ry)*256]){this.rz=parseInt(ww)*4}this.update=true}else{setTimeout("hero.fixwater()",300)}};this.checkSize=function(){if(!il||!il.getsize){return}var p=il.getsize(hero.img);if(p&&(p[0]+p[1])>1){this.framew=Math.round(p[0]/4);this.frameh=Math.round(p[1]/4);document.getElementById("oHero").style.width=this.framew+"px";document.getElementById("oHero").style.height=this.frameh+"px";this.nosize=false}};var l=document.getElementById("objects");var a=document.createElement("DIV");a.setAttribute("id","oHero");l.appendChild(a);a.onclick=function(u){if(!u){var u=window.event}var p=document.getElementById("menu");var t="";t="<BUTTON onclick=\"hide('menu',true);dbget('takeitem','bag='+global.bag);\">Podnieś</BUTTON>";t+="<BUTTON onclick=dbget('walk')>Przejdź</BUTTON>";if(hero.fight_gr>0){t+="<BUTTON onclick=\"hide('menu',true);dbget('fight','leavegroup=1')\">Opuść grupę</BUTTON>"}document.getElementById("menuin").innerHTML=t;p.style.left=Math.max(0,u.clientX-60)+"px";var r=t.split("<BUTTON ");var q=502-20*r.length;p.style.top=Math.min(q,Math.max(0,u.clientY-20))+"px";show("menu",true)};this.onload=function(p){if(p){log("Can't load player image: '"+this.img+"'",2);return}document.getElementById("oHero").style.backgroundImage="url("+this.img+")";document.getElementById("oHero").style.display="block"};this.go=function(p){this.x=parseInt(p[0]);this.y=parseInt(p[1]);this.kier=parseInt(p[2]);o="";n=false;h=true};this.move=function(s){if(o.split(";").length>8){return}var q=this.x;var p=this.y;if(s=="W"){if(this.kier==1){this.x--}else{this.kier=1}}if(s=="E"){if(this.kier==2){this.x++}else{this.kier=2}}if(s=="N"){if(this.kier==3){this.y--}else{this.kier=3}}if(s=="S"){if(this.kier==0){this.y++}else{this.kier=0}}var r=(this.y*256)+parseInt(this.x);if((this.cmap.indexOf(";"+r+";")>=0)||(this.x<0)||(this.y<0)||(this.x>=map.width())||(this.y>=map.height())||(el.collision(this.x,this.y))){this.x=q;this.y=p;return}if(this.x!=q||this.y!=p){if(o!=""){o+=";"}o+=this.x+","+this.y}h=true;n=true};this.synchMove=function(r){c=r.split(",");if(map.id>0&&c[2]!=map.id){document.location.reload()}if(o==""){if(c[0]==this.x&&c[1]==this.y){return}log("Coords out of sync[0]: xy="+r+"; hero="+this.x+","+this.y+"; ml="+o);this.x=parseInt(c[0]);this.y=parseInt(c[1]);h=true;return}var t=o.split(";");var p=-1,s=-1;for(var q=0;q<t.length;q++){ml1=t[q].split(",");dx=Math.abs(ml1[0]-c[0])+Math.abs(ml1[1]-c[1]);if(dx<2){p=q;s=dx}}if(p>=0){if((dx==0)&&(t.length-1==p)){o=""}else{ml2=new Array();for(var q=p;q<t.length;q++){ml2[q-p]=t[q]}o=ml2.join(";")}}else{log("Coords out of sync[1]: xy="+r+"; hero="+this.x+","+this.y+"; ml="+o);this.x=parseInt(c[0]);this.y=parseInt(c[1]);h=true;o=""}};this.forceMove=function(p,q){if(o.split(";")>8){return}this.x=p;this.y=q;h=true;if(o!=""){o+=";"}o+=this.x+","+this.y;n=true};this.doMove=function(){if(o.length==0){return false}dbget("go","dir="+this.kier+"&ml="+o);n=false;return true};this.run=function(){if(this.nosize){this.checkSize()}var v=document.getElementById("oHero");if(!global.battle.now&&!global.battle.agrnow&&(Math.abs(this.rx-this.x)<1.5)&&(Math.abs(this.ry-this.y)<1.5)){if(k[g+0]){this.move("W")}if(k[g+1]){this.move("E")}if(k[g+2]){this.move("N")}if(k[g+3]){this.move("S")}for(i=0;i<4;i++){k[g+i]=false}if(h){this.mx=-1;this.my=-1}if((this.mx>=0)&&(this.my>=0)&&(this.rx==this.x)&&(this.ry==this.y)){var x=this.x-this.mx;var w=this.y-this.my;var u=this.kier;if(Math.abs(x)>=Math.abs(w)&&Math.abs(x)>0){if(x>0){this.kier=1;this.move("W")}else{this.kier=2;this.move("E")}}if(((Math.abs(w)>Math.abs(x))||(!h))&&Math.abs(w)>0){if(w>0){this.kier=3;this.move("N")}else{this.kier=0;this.move("S")}}if((Math.abs(x)<Math.abs(w))&&(!h)&&Math.abs(x)>0){if(x>0){this.kier=1;this.move("W")}else{this.kier=2;this.move("E")}}if(!h){this.mx=-1;this.my=-1}if(u!=this.kier){h=true}}}var r=this.rx;var q=this.ry;if(this.rx+2<this.x){this.rx=parseFloat(this.x)-2}else{if(this.ry+2<this.y){this.ry=parseFloat(this.y)-2}else{if(this.rx-2>this.x){this.rx=parseFloat(this.x)+2}else{if(this.ry-2>this.y){this.ry=parseFloat(this.y)+2}}}}var t=0.25;var s=0.25;if(Math.abs(this.rx-this.x)>1){t=0.5}if(Math.abs(this.ry-this.y)>1){s=0.5}if(this.rx>this.x){this.rx-=t}if(this.ry>this.y){this.ry-=s}if(this.rx<this.x){this.rx+=t}if(this.ry<this.y){this.ry+=s}if(r!=this.rx||q!=this.ry){h=true}if(this.rx-this.x!=0||this.ry-this.y!=0){this.step=(this.step+1)&3}else{this.step=0}if(h){map.center(this.rx,this.ry);if(ww=map.water[Math.round(this.rx)+Math.round(this.ry)*256]){var p=parseInt(ww)*4;if(p>this.rz){this.rz++}if(p<this.rz){this.rz--}if(p>this.rz+2){this.rz+=2}if(p<this.rz-2){this.rz-=2}if(v.style.height!=this.frameh-this.rz){v.style.height=this.frameh-this.rz}}else{if(v.style.height!=this.frameh+"px"){v.style.height=this.frameh;this.rz=0}}v.style.left=(this.rx-map.left())*32-(this.framew-32)/2;v.style.top=(this.ry-map.top())*32-(this.frameh-this.rz-32);v.style.backgroundPosition=(this.step*this.framew)+"px "+(-this.kier*this.frameh)+"px";v.style.zIndex=2+parseInt(this.y);h=false}};var j="";this.talker="";this.talkerid=0;this.initTalk=function(s,r){show("dialog",true);var q=document.getElementById("dialog");j=r.split("\n");var p=j[0].split(" ")[0];this.talkerid=s;this.runTalk(p)};this.addTalk=function(p,q){j=q.split("\n");this.runTalk(p)};var b=function(p){if(p.charAt(p.length-1)!="."){return p+"."}else{return p}};this.runTalk=function(t){t=t.toString();if(t=="END"){this.endTalk();return}t=b(t);var s=0;while(b(j[s].split(" ")[0])!=t){s++;if(s>=j.length){this.endTalk();return}}var v=document.getElementById("dialog");var q=j[s].split("->");q[0]=q[0].substr(t.length);if(q.length==2){var u="<B class=title>"+this.talker+":</B>"+q[0]+"<DIV class=dbut onclick=";if(q[1].indexOf("END")>=0){u+='"hero.endTalk();">koniec</DIV>'}else{q[1]="'lp="+parseInt(q[1])+"&zkim="+this.talkerid+"'";u+="\"dbget('dialog',"+q[1]+')">dalej</DIV>'}v.innerHTML=u}else{u="";var r=1;while((s+r<j.length)&&(j[s+r].split(" ")[0].indexOf(t)>=0)){var p=j[s+r].split("->");p[0]=p[0].substr(p[0].indexOf(" "));p[1]="'lp="+parseInt(p[1])+"&zkim="+this.talkerid+"'";u+="<DIV class=dbut onclick=\"dbget('dialog',"+p[1];u+=')">'+p[0]+"</DIV>";r++}v.innerHTML="<B class=title>"+this.talker+":</B>"+q[0]+u}};this.endTalk=function(q,p){hide("dialog",true)};this.countDazed=function(){if(this.dazedleft>60){var p=Math.round(this.dazedleft/60)+" minut"}else{var p=this.dazedleft+" sekund"}document.getElementById("dazedleft").innerHTML=p;if(this.dazedleft>1){setTimeout("hero.countDazed()",1000)}else{hide("dazed",true);this.dazed=false}};this.checkReqs=function(r){function q(u,s,t){req=u.split("<B class=att>"+s);if(req.length>1){r2=req[1].split("</B>");if(r2.length>1&&parseInt(r2[0])>t){u=req.join("<B class=att2>"+s)}}return u}function p(t,s){req=t.split("<B class=att>"+s);if(req.length>1){r2=req[1].split("</B>");if((r2.length>1)&&(r2[0].indexOf(hero.prof)<0)){t=req.join("<B class=att2>"+s)}}return t}r=q(r,"Wymagana siła: ",this.bstr);r=q(r,"Wymagany intelekt: ",this.bint);r=q(r,"Wymagana zręczność: ",this.bagi);r=q(r,"Wymagany poziom: ",this.lvl);r=p(r,"Wymagana profesja");return r};this.setMousePos=function(q,p){this.mx=Math.round(map.left()+Math.ceil(q/32)-1);this.my=Math.round(map.top()+Math.ceil(p/32)-1)};this.resetMouse=function(){this.mx=-1;this.my=-1;global.movebymouse=false}};