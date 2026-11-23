(()=>{const d=document,rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
// cursor spotlight
const s=d.querySelector('.spot');if(s&&matchMedia('(hover:hover)').matches)addEventListener('pointermove',e=>{s.style.setProperty('--x',e.clientX+'px');s.style.setProperty('--y',e.clientY+'px')},{passive:true});
// reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
d.querySelectorAll('.reveal').forEach(el=>rm?el.classList.add('in'):io.observe(el));
// count-up stats
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,n=+el.dataset.count,t0=performance.now();if(rm)return;
 const f=t=>{const k=Math.min(1,(t-t0)/1100);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)}),{threshold:.6});
d.querySelectorAll('[data-count]').forEach(el=>{if(!rm)el.textContent='0';co.observe(el)});
// scroll-spy nav
const links=[...d.querySelectorAll('.toc a')];if(links.length){const secs=links.map(a=>d.querySelector(a.getAttribute('href')));
 const spy=()=>{let i=0;secs.forEach((sec,j)=>{if(sec&&sec.getBoundingClientRect().top<innerHeight*.4)i=j});
  if(innerHeight+scrollY>=d.documentElement.scrollHeight-4)i=secs.length-1;links.forEach((a,j)=>a.classList.toggle('act',j===i))};
 addEventListener('scroll',spy,{passive:true});spy()}
// writing filters + show more
const rows=[...d.querySelectorAll('.rows .row')],more=d.querySelector('.more'),LIM=8;let f='all',open=false;
const apply=()=>{let shown=0,total=0;rows.forEach(r=>{const ok=f==='all'||r.dataset.lane===f;if(ok)total++;const vis=ok&&(open||shown<LIM);if(vis)shown++;r.hidden=!vis});
 if(more){more.hidden=open||total<=LIM;more.textContent=`Show all ${total} posts`}};
d.querySelectorAll('.filters button').forEach(b=>b.addEventListener('click',()=>{d.querySelectorAll('.filters button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});f=b.dataset.f;apply()}));
more&&more.addEventListener('click',()=>{open=true;apply()});apply();
})();
