const c=document.getElementById('cursor');addEventListener('pointermove',e=>{if(c){c.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`}});document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>c&&c.classList.add('big'));el.addEventListener('mouseleave',()=>c&&c.classList.remove('big'))});document.querySelectorAll('.product-card,.story,.feature,.giant-bag,.bag3d').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateZ(10px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});const send=document.getElementById('send');if(send)send.onclick=()=>{document.getElementById('sent').classList.add('show');send.textContent='SENT ✓'};document.querySelector('.menu')?.addEventListener('click',()=>document.body.classList.toggle('menu-open'));
// Scroll engine: reveal + depth + horizontal drift + velocity tilt + section progress.
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduce)return;
 const els=[...document.querySelectorAll('.feature,.product-card,.story,.page-title,.origin-copy,.pairing,.contact-form,.contact-band,.hero-copy,.hero-object,.product-info,.map-stage')];
 els.forEach((el,i)=>{el.dataset.reveal='';el.style.transitionDelay=Math.min(i%4*70,210)+'ms'});
 document.querySelectorAll('.hero-object,.bag3d,.giant-bag,.map-stage,.pairing').forEach((el,i)=>el.dataset.parallax=(i%2?'0.10':'-0.08'));
 document.querySelectorAll('.bean3d,.ring,.map-ring').forEach(el=>el.dataset.rotateScroll=i=>{});
 const line=document.createElement('div');line.className='scroll-line';line.innerHTML='<i></i>';document.body.appendChild(line);
 const num=document.createElement('div');num.className='scroll-number';num.innerHTML='<b>01</b> / 100';document.body.appendChild(num);
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12,rootMargin:'0px 0px -8% 0px'});els.forEach(e=>io.observe(e));
 let current=0,target=0,velocity=0,last=scrollY;
 function frame(){target=scrollY;velocity+=(target-last-velocity)*.12;last+=(target-last)*.09;current+=(target-current)*.075;
  const max=document.documentElement.scrollHeight-innerHeight;line.firstElementChild.style.height=(max?current/max*100:0)+'%';num.querySelector('b').textContent=String(Math.min(99,Math.max(1,Math.round(max?current/max*99:1))).padStart(2,'0'));
  document.querySelectorAll('[data-parallax]').forEach((el,i)=>{const r=el.getBoundingClientRect(),center=r.top+r.height/2-innerHeight/2;const amt=parseFloat(el.dataset.parallax)||.08;el.style.transform=`translate3d(0,${center*amt*-1}px,0)`});
  document.querySelectorAll('.bean3d,.ring,.map-ring').forEach((el,i)=>{const r=el.getBoundingClientRect(),p=(r.top-innerHeight*.5)/innerHeight;el.style.transform=`translate3d(${Math.sin(current*.003+i)*8}px,${p*-18}px,0) rotate(${p*(i%2?7:-7)+current*.025*(i%2?1:-1)}deg)`});
  document.querySelectorAll('.marquee-big div').forEach(el=>el.style.transform=`translateX(${-(current*.28%900)}px)`);
  requestAnimationFrame(frame)}requestAnimationFrame(frame);
 let raf;addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{document.body.style.setProperty('--scroll-v',Math.min(18,Math.abs(scrollY-last)))})},{passive:true});
})();
