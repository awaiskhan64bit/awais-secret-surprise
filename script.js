const cursor=document.getElementById('cursor');
let pointerX=innerWidth/2,pointerY=innerHeight/2;
addEventListener('pointermove',e=>{pointerX=e.clientX;pointerY=e.clientY;if(cursor)cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`},{passive:true});
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.classList.add('big'));el.addEventListener('mouseleave',()=>cursor?.classList.remove('big'))});
const tiltEls=document.querySelectorAll('.product-card,.story,.feature,.giant-bag,.bag3d');
tiltEls.forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--hover-rx',`${-y*5}deg`);el.style.setProperty('--hover-ry',`${x*6}deg`);el.classList.add('hovering')});el.addEventListener('pointerleave',()=>{el.classList.remove('hovering');el.style.removeProperty('--hover-rx');el.style.removeProperty('--hover-ry')})});
const send=document.getElementById('send');if(send)send.onclick=()=>{document.getElementById('sent')?.classList.add('show');send.textContent='SENT ✓'};
document.querySelector('.menu')?.addEventListener('click',()=>document.body.classList.toggle('menu-open'));

// ROAST/01 SCROLL CHOREOGRAPHER
// Deliberately scroll-linked: nothing waits for an IntersectionObserver and nothing fades.
// Elements continuously translate/rotate/scale according to their position in the viewport.
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce)return;
 const candidates=[...document.querySelectorAll('.hero-copy,.hero-object,.feature,.product-card,.story,.page-title,.product-visual,.product-info,.map-stage,.origin-copy,.pairing,.contact-form,.contact-band,.bean3d,.ring,.map-ring,.giant-bag,.bag3d')];
 const items=candidates.map((el,i)=>({el,i,depth:(i%5-2),speed:.55+(i%4)*.18,phase:i*.73}));
 items.forEach(o=>{o.el.style.willChange='translate, rotate, scale';o.el.style.transformOrigin='center center';o.el.style.setProperty('--scroll-y','0px');o.el.style.setProperty('--scroll-x','0px');o.el.style.setProperty('--scroll-r','0deg');o.el.style.setProperty('--scroll-s','1');o.el.style.setProperty('--hover-rx','0deg');o.el.style.setProperty('--hover-ry','0deg')});
 const rail=document.createElement('div');rail.className='scroll-line';rail.innerHTML='<i></i>';document.body.appendChild(rail);
 const counter=document.createElement('div');counter.className='scroll-number';counter.innerHTML='<b>01</b> / <span>100</span>';document.body.appendChild(counter);
 let current=scrollY,target=scrollY,last=scrollY,velocity=0,raf=0;
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 function render(){
   target=scrollY;current+=(target-current)*.085;velocity+=(target-last-velocity)*.18;last+=(target-last)*.085;
   const max=Math.max(1,document.documentElement.scrollHeight-innerHeight),progress=clamp(current/max,0,1);
   rail.firstElementChild.style.height=`${progress*100}%`;counter.querySelector('b').textContent=String(Math.round(progress*99)+1).padStart(2,'0');
   const reads=items.map(o=>{const r=o.el.getBoundingClientRect();const center=r.top+r.height/2;const distance=(center-innerHeight/2)/innerHeight;return {o,distance,r}});
   reads.forEach(({o,distance,r})=>{
     const near=clamp(1-Math.abs(distance)*.72,.05,1);
     const wave=Math.sin(distance*2.7+o.phase)*12*near;
     const direction=o.depth*5*near;
     let y=clamp(-distance*38*o.speed,-70,70)+wave*.35;
     let x=direction+Math.sin(distance*1.9+o.phase)*18*near;
     let rot=clamp(distance*5+Math.sin(distance*2+o.phase)*3,-9,9);
     let scale=1+clamp((1-Math.abs(distance))*0.035,-.03,.035);
     if(o.el.classList.contains('hero-object')||o.el.classList.contains('product-visual')){y*=1.35;x*=1.5;rot*=1.5;scale=1+clamp(-distance*.035,-.035,.035)}
     if(o.el.classList.contains('page-title')){x+=Math.sin(current*.002+o.phase)*10;rot+=Math.sin(current*.0015)*1.5}
     if(o.el.classList.contains('marquee-big'))x=-current*.25;
     o.el.style.translate=`${x}px ${y}px`;
     o.el.style.rotate=`calc(${rot}deg + var(--hover-rx))`;
     o.el.style.scale=`${scale}`;
   });
   document.querySelectorAll('.marquee-big div').forEach((el,i)=>{el.style.translate=`${-((current*.32+i*240)%1200)}px 0`});
   document.querySelectorAll('.ticker span').forEach((el,i)=>{el.style.translate=`${Math.sin(current*.001+i)*6}px 0`});
   document.querySelectorAll('.bean3d').forEach((el,i)=>{el.style.rotate=`${Math.sin(current*.002+i)*18}deg`;el.style.translate=`${Math.cos(current*.0017+i)*12}px ${Math.sin(current*.0012+i)*18}px`});
   document.querySelectorAll('.ring,.map-ring').forEach((el,i)=>{el.style.rotate=`${(i? -1:1)*current*.025}deg`;el.style.translate=`${Math.sin(current*.001+i)*18}px ${Math.cos(current*.0013+i)*14}px`});
   raf=requestAnimationFrame(render);
 }
 cancelAnimationFrame(raf);raf=requestAnimationFrame(render);
})();
