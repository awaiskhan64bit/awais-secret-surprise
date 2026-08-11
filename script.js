const cursor=document.getElementById('cursor');
let pointerX=innerWidth/2,pointerY=innerHeight/2;
addEventListener('pointermove',e=>{pointerX=e.clientX;pointerY=e.clientY;if(cursor)cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`},{passive:true});
document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>cursor?.classList.add('big'));el.addEventListener('mouseleave',()=>cursor?.classList.remove('big'))});
const tiltEls=document.querySelectorAll('.product-card,.story,.feature,.giant-bag,.bag3d');
tiltEls.forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.setProperty('--hover-rx',`${-y*5}deg`);el.style.setProperty('--hover-ry',`${x*6}deg`);el.classList.add('hovering')});el.addEventListener('pointerleave',()=>{el.classList.remove('hovering');el.style.removeProperty('--hover-rx');el.style.removeProperty('--hover-ry')})});
const send=document.getElementById('send');if(send)send.onclick=()=>{document.getElementById('sent')?.classList.add('show');send.textContent='SENT ✓'};
document.querySelector('.menu')?.addEventListener('click',()=>document.body.classList.toggle('menu-open'));

// ROAST/01 — ART-DIRECTED SCROLL CHOREOGRAPHY. No fades. No shared float.
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduce)return;
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 const groups=[
  ['.hero-copy',(p)=>`translate3d(${-p*55}px,${p*28}px,0) rotate(${p*-2}deg)`],['.hero-object',(p)=>`translate3d(${p*75}px,${p*-95}px,0) rotate(${p*3}deg) scale(${1-p*.03})`],['.bag3d',(p)=>`translate3d(${p*-120}px,${p*125}px,70px) rotateY(${p*22}deg) rotateZ(${p*9}deg)`],['.ring',(p,i)=>`translate3d(${p*(i?-150:90)}px,${p*(i?65:-70)}px,0) rotate(${p*(i?-35:28)}deg)`],['.bean3d',(p,i)=>`translate3d(${Math.sin(p*4+i)*38}px,${p*(i%2?120:-150)}px,${Math.cos(p*3+i)*45}px) rotate(${p*(i%2?100:-80)}deg)`],['.feature',(p,i)=>`translate3d(${(i-1)*p*55}px,${p*(i===1?-50:30)}px,0) rotateY(${(i-1)*p*6}deg)`],['.product-card',(p,i)=>`translate3d(${(i%2?1:-1)*p*(45+i*13)}px,${p*(i%2?-35:45)}px,0) rotate(${(i%2?1:-1)*p*2.2}deg)`],['.product-visual',(p)=>`translate3d(${p*-45}px,${p*25}px,0)`],['.giant-bag',(p)=>`translate3d(${p*90}px,${p*-55}px,90px) rotateY(${p*24}deg) rotateZ(${p*-6}deg)`],['.product-info',(p)=>`translate3d(${p*-55}px,${p*30}px,0)`],['.map-stage',(p)=>`translate3d(${p*28}px,${p*-42}px,0) scale(${1+p*.035})`],['.map-ring',(p)=>`translate3d(${p*90}px,${p*-55}px,0) rotate(${p*35}deg) scale(${1+p*.1})`],['.pin',(p,i)=>`translate3d(${p*(i===0?-110:i===1?55:135)}px,${p*(i===1?95:-70)}px,${p*30}px) rotate(${p*(i===1?-14:9)}deg)`],['.story',(p,i)=>`translate3d(${p*(i===0?-35:i===1?48:-55)}px,${p*(i===0?25:-22)}px,0) rotateY(${p*(i===0?5:-4)}deg)`],['.contact-form',(p)=>`translate3d(${p*-45}px,${p*25}px,0) rotate(${p*1}deg)`],['.origin-copy',(p)=>`translate3d(${p*30}px,${p*-20}px,0)`],['.pairing',(p)=>`translate3d(${p*-22}px,${p*18}px,0)`]
 ];
 const items=[];for(const [sel,fn] of groups)document.querySelectorAll(sel).forEach((el,i)=>{el.style.willChange='transform';items.push({el,fn,i})});
 const rail=document.createElement('div');rail.className='scroll-line';rail.innerHTML='<i></i>';document.body.append(rail);
 const local=el=>{const r=el.getBoundingClientRect();return clamp(((innerHeight/2-(r.top+r.height/2))/(innerHeight+r.height))*2,-1,1)};
 let y=scrollY,prev=y,v=0;
 function tick(){const target=scrollY;y+=(target-y)*.09;v+=(target-prev-v)*.16;prev+=(target-prev)*.09;const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);rail.firstElementChild.style.height=(y/max*100)+'%';items.forEach(o=>o.el.style.transform=o.fn(local(o.el),o.i));document.querySelectorAll('.marquee-big div').forEach((el,i)=>el.style.transform=`translate3d(${-(y*.22+i*280)%1250}px,${clamp(v*.2,-7,7)}px,0)`);requestAnimationFrame(tick)}tick();
})();