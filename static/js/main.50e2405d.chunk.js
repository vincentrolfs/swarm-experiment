(this.webpackJsonpswarm=this.webpackJsonpswarm||[]).push([[0],{20:function(t,i,e){t.exports=e(37)},25:function(t,i,e){},26:function(t,i,e){},37:function(t,i,e){"use strict";e.r(i);var a=e(0),n=e.n(a),s=e(16),o=e.n(s),r=(e(25),e(26),e(5)),h=e(3),u=e(4),l=function(){function t(i,e){if(Object(h.a)(this,t),void 0===i||void 0===e){this.x=Math.random()-.5,this.y=Math.random()-.5;var a=v*Math.random()/this.magnitude();this.x*=a,this.x+=d.x,this.y*=a,this.y+=d.y}else this.x=i,this.y=e}return Object(u.a)(t,[{key:"add",value:function(i){return new t(this.x+i.x,this.y+i.y)}},{key:"subtract",value:function(i){return new t(this.x-i.x,this.y-i.y)}},{key:"magnitude",value:function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}},{key:"distance",value:function(t){return this.subtract(t).magnitude()}},{key:"multiply",value:function(i){return new t(this.x*i,this.y*i)}},{key:"divide",value:function(t){return this.multiply(1/t)}},{key:"moveUniform",value:function(t){t=t.divide(t.magnitude());var i=this.add(t);if(i.distance(d)<=v)return i;var e=c(d,v,this,1),a=Object(r.a)(e,2),n=a[0],s=a[1];return i.distance(n)<=i.distance(s)?n:s}}]),t}(),c=function(t,i,e,a){var n=[t.x,t.y,e.x,e.y],s=n[0],o=n[1],r=n[2],h=n[3],u=s-r,c=o-h,v=Math.sqrt(u*u+c*c);if(!(Math.abs(i-a)<=v&&v<=i+a))return[];var d=v*v,f=d*d,p=(i*i-a*a)/(2*d),m=i*i-a*a,y=Math.sqrt(2*(i*i+a*a)/d-m*m/f-1),w=(s+r)/2+p*(r-s),g=y*(h-o)/2,x=w-g,k=(o+h)/2+p*(h-o),M=y*(s-r)/2,b=k-M;return[new l(w+g,k+M),new l(x,b)]},v=350,d=new l(375,375),f=e(18),p=e(19),m=function(){function t(i){Object(h.a)(this,t),this.canvas=i,this.ctx=i.getContext("2d"),this.behaviours=[],this.positions=[],this.colors=[],this.initBehaviours(),this.initPositions(),this.initColors(),this.movementChangeTimestamps=new Array(this.behaviours.length).fill(0),this.hasMovedLastUpdate=new Array(this.behaviours.length).fill(!1),this.loopTimestamp=1,this.runLoop()}return Object(u.a)(t,[{key:"initBehaviours",value:function(){var t=parseInt(new URL(window.location.href).searchParams.get("amount"));(isNaN(t)||t<=1)&&(t=15);for(var i=this._getPermutation(t),e=0;e<t;e++){var a=i[e];do{a=Math.floor(Math.random()*t)}while(a===e);i[e]=a;var n=this.getRandomBehaviourRule();this.behaviours.push([a,n])}this.logCycles(i)}},{key:"logCycles",value:function(t){console.log("Cycles:");for(var i=0;i<t.length;i++){var e=[],a=i;do{if(-1!==e.indexOf(a)){e.push(a);break}e.push(a),a=t[a]}while(a!==i);console.log(i,e)}}},{key:"_getPermutation",value:function(t){for(var i=Object(f.a)(Array(t).keys()),e=i.length-1;e>0;e--){var a=Math.floor(Math.random()*(e+1)),n=[i[a],i[e]];i[e]=n[0],i[a]=n[1]}return i}},{key:"getRandomBehaviourRule",value:function(){return 4*Math.random()*v-2*v}},{key:"initPositions",value:function(){var t=this;this.behaviours.forEach((function(){return t.positions.push(new l)}))}},{key:"initColors",value:function(){this.colors=Object(p.a)({count:this.positions.length}).map((function(t){return t.hex()}))}},{key:"runLoop",value:function(){var t=this;setInterval((function(){t.draw(),t.updatePositions(),t.loopTimestamp++}),5)}},{key:"draw",value:function(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.drawArena();for(var t=0;t<this.positions.length;t++)this.drawAgent(t)}},{key:"drawAgent",value:function(t){var i=this.ctx,e=this.positions[t],a=e.x,n=e.y,s=this.colors[t],o=this.colors[this.behaviours[t][0]],r=1===Math.sign(this.behaviours[t][1]);i.beginPath(),i.arc(a,n,20,0,2*Math.PI,!1),i.fillStyle=s,i.fill(),i.font="15px serif",i.fillText(r?"\u2764\ufe0f":"\ud83d\udd25",a+10,n-10),i.beginPath(),i.arc(a+20/3,n+20/3,20/3,0,2*Math.PI,!1),i.fillStyle=o,i.fill()}},{key:"drawArena",value:function(){this.ctx.beginPath(),this.ctx.arc(d.x,d.y,v,0,2*Math.PI,!1),this.ctx.lineWidth=8;var t=this.ctx.createRadialGradient(d.x,d.y,v,d.x,d.y,v+50);t.addColorStop(0,"black"),t.addColorStop(.2,"white"),this.ctx.strokeStyle=t,this.ctx.stroke()}},{key:"updatePositions",value:function(){for(var t=this.positions,i=this.behaviours,e=[],a=0;a<t.length;a++)if(i[a]){var n=t[a],s=t[i[a][0]],o=i[a][1],h=this.findNewPosition(n,s,o),u=Object(r.a)(h,2),l=u[0],c=u[1];e[a]=l,this.updateHasMovedLastUpdate(a,c),this.updateBehaviour(a,c)}this.positions=e}},{key:"updateHasMovedLastUpdate",value:function(t,i){this.hasMovedLastUpdate[t]!==i&&(this.movementChangeTimestamps[t]=this.loopTimestamp,this.hasMovedLastUpdate[t]=i)}},{key:"updateBehaviour",value:function(t,i){var e=this.loopTimestamp-this.movementChangeTimestamps[t],a=1250,n=(Math.exp(e/a)-Math.exp(1/a))/(Math.exp(8)-Math.exp(1/a));Math.random()>n||(this.behaviours[t][1]=this.getRandomBehaviourRule())}},{key:"findNewPosition",value:function(t,i,e){var a=this.findDirectionMultiplier(t,i,e);if(0===a)return[t,!1];var n=i.subtract(t).multiply(a);return[t.moveUniform(n),!0]}},{key:"findDirectionMultiplier",value:function(t,i,e){var a=t.distance(i),n=Math.sign(e);return n>0&&(e=2*v-e),n*a>e?n:0}}]),t}();var y=function(){return n.a.createElement("div",{className:"wrapper"},n.a.createElement("canvas",{width:750,height:750,ref:function(t){return new m(t)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[20,1,2]]]);
//# sourceMappingURL=main.50e2405d.chunk.js.map