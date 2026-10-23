/**
 * Animated favicon. Firefox animates the SVG favicon by itself; Chrome, Edge and Safari only show
 * its first frame. So we draw the same animation on a small canvas and swap the tab icon about
 * ten times a second (browsers slow this down in background tabs).
 * Background fades navy → purple → blue over 9 s; a light streak slides over the A every 4.5 s.
 *
 * It runs as a small inline script at the top of <body>, so it takes over the tab icon while the
 * page is still loading. The colour follows the clock (not page load), so moving to another page
 * carries on the fade where it was instead of jumping back to navy.
 */
const SCRIPT = `(function(){
if(window.__favMotion)return;window.__favMotion=1;
if(matchMedia("(prefers-reduced-motion: reduce)").matches||/firefox/i.test(navigator.userAgent))return;
var S=64,cv=document.createElement("canvas");cv.width=S;cv.height=S;var c=cv.getContext("2d");if(!c||!window.Path2D||!window.DOMMatrix)return;
var a=new Path2D();a.addPath(new Path2D("M26.6 12h10.8l14.6 40h-10.4l-2.9-8.4H25.3L22.4 52H12zM27.9 36.2h8.2L32 23.8z"),new DOMMatrix().translate(32,32).scale(1.1).translate(-32,-32));
var bg=new Path2D();if(bg.roundRect)bg.roundRect(0,0,64,64,9);else bg.rect(0,0,64,64);
var N=[31,36,108],P=[134,57,250],B=[15,138,229];
function e(x){return x*x*(3-2*x)}
function m(p,q,k){return[0,1,2].map(function(i){return Math.round(p[i]+(q[i]-p[i])*k)})}
function col(t){var p=(t%9)/9;return p<1/3?m(N,P,e(p*3)):p<2/3?m(P,B,e((p-1/3)*3)):m(B,N,e((p-2/3)*3))}
var link=document.createElement("link");link.rel="icon";link.type="image/png";
function park(){var l=document.querySelectorAll('link[rel~="icon"]');for(var i=0;i<l.length;i++)if(l[i]!==link)l[i].rel="x-static-icon";if(!link.isConnected)document.head.appendChild(link)}
function draw(){var t=Date.now()/1000;c.clearRect(0,0,S,S);c.save();c.clip(bg);var k=col(t);c.fillStyle="rgb("+k.join(",")+")";c.fillRect(0,0,S,S);c.restore();
c.save();c.clip(a,"evenodd");c.fillStyle="#FFFFFF";c.fillRect(0,0,S,S);
var p=(t%4.5)/4.5,sx=p<.7?0:150*e((p-.7)/.3);
if(sx>0&&sx<150){c.setTransform(1,0,Math.tan(-18*Math.PI/180),1,0,0);var x=-40+sx,g=c.createLinearGradient(x,0,x+28,0);g.addColorStop(0,"rgba(134,57,250,0)");g.addColorStop(.5,"rgba(134,57,250,0.4)");g.addColorStop(1,"rgba(134,57,250,0)");c.fillStyle=g;c.fillRect(x,0,28,64)}
c.restore();park();link.href=cv.toDataURL("image/png")}
draw();setInterval(draw,100);
})();`;

export function FaviconMotion() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
