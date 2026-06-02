let cur=0,tot=3,timer;
const DELAY=7000;
document.addEventListener('DOMContentLoaded',()=>{
  const slides=document.querySelectorAll('.hero__slide');
  tot=slides.length||3;
  const v0=slides[0]?.querySelector('.hero__video');
  if(v0)v0.play().catch(()=>{});
  startAuto();
  const hero=document.querySelector('.hero');
  if(hero){hero.addEventListener('mouseenter',stopAuto);hero.addEventListener('mouseleave',startAuto);}
  let tx=0;
  if(hero){hero.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});hero.addEventListener('touchend',e=>{const d=tx-e.changedTouches[0].clientX;if(Math.abs(d)>50)d>0?go(cur+1):go(cur-1)},{passive:true});}
  document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1);});
});
function go(i){
  const slides=document.querySelectorAll('.hero__slide');
  const dots=document.querySelectorAll('.hero__dot');
  const vids=document.querySelectorAll('.hero__video');
  if(!slides.length)return;
  slides[cur].classList.remove('active');
  dots[cur]?.classList.remove('active');
  vids[cur]?.pause();
  cur=(i+tot)%tot;
  slides[cur].classList.add('active');
  dots[cur]?.classList.add('active');
  const v=vids[cur];
  if(v){v.currentTime=0;v.play().catch(()=>{});}
}
function startAuto(){stopAuto();timer=setInterval(()=>go(cur+1),DELAY);}
function stopAuto(){if(timer)clearInterval(timer);}
window.heroNext=()=>{stopAuto();go(cur+1);setTimeout(startAuto,2000);};
window.heroPrev=()=>{stopAuto();go(cur-1);setTimeout(startAuto,2000);};
window.heroGo=i=>{stopAuto();go(i);setTimeout(startAuto,2000);};
