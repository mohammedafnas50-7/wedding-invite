(() => {
  const w = window.WEDDING;
  const $ = (id) => document.getElementById(id);
  $('pageThreeGroom').textContent = w.groom; $('pageThreeBride').textContent = 'Fereeha Moorkan';
  $('venueName').innerHTML = w.venue.replace(' ', '<br>');
  $('venueCity').textContent = w.city; $('venueTime').innerHTML = `${w.day} Â· ${w.date}<br>${w.time}`; $('mapLink').href = w.mapUrl;
  const music = $('music'); music.src = w.music; document.querySelector('.cover-photo').style.backgroundImage = `url("${w.openingArtwork}")`; document.querySelector('.groom-bg').style.backgroundImage = `url("${w.countdownArtwork}")`;
  const open = () => { music.play().catch(()=>{}); $('musicControl').classList.add('visible'); $('invitation').hidden = false; coat(); $('cover').classList.add('open'); setTimeout(()=>$('cover').remove(),1200); };
  $('openInvite').addEventListener('click', open);
  $('musicControl').addEventListener('click', () => { if(music.paused){music.play();$('musicText').textContent='Sound on'}else{music.pause();$('musicText').textContent='Sound off'} });
  let lastClock = [];
  function countdown(){let n=Math.max(0,new Date(w.dateISO)-Date.now()), a=[['Days',864e5],['Hours',36e5],['Minutes',6e4],['Seconds',1e3]], values=[];a.forEach(([l,d])=>{let v=Math.floor(n/d);n%=d;values.push(String(v).padStart(2,'0'))});if(!$('countdown').children.length){$('countdown').innerHTML=a.map(([l],i)=>`<div class="flip-unit"><b class="flip-card" aria-label="${values[i]} ${l}"><i class="flip-top">${values[i]}</i><i class="flip-bottom">${values[i]}</i></b><span>${l}</span></div>`).join('');lastClock=values;return}values.forEach((value,i)=>{if(value===lastClock[i])return;const card=$('countdown').children[i].querySelector('.flip-card');card.classList.remove('is-flipping');void card.offsetWidth;card.querySelector('.flip-top').textContent=value;card.querySelector('.flip-bottom').textContent=value;card.setAttribute('aria-label',`${value} ${a[i][0]}`);card.classList.add('is-flipping')});lastClock=values}countdown();setInterval(countdown,1000);
  const card=$('scratchCard'), canvas=$('scratchCanvas'), hint=$('scratchHint'), ctx=canvas.getContext('2d'); let drawing=false,revealed=false;
  function coat(){const r=card.getBoundingClientRect(), d=devicePixelRatio;canvas.width=r.width*d;canvas.height=r.height*d;ctx.scale(d,d);ctx.fillStyle='#9a784a';ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle='rgba(255,235,191,.35)';ctx.font='italic 34px Cormorant Garamond';ctx.textAlign='center';ctx.fillText('A little surprise',r.width/2,r.height/2-8);ctx.font='10px DM Sans';ctx.fillText('REVEAL OUR DAY',r.width/2,r.height/2+24)}coat();
  function scratch(e){if(!drawing||revealed)return; const r=canvas.getBoundingClientRect(), p=e.touches?e.touches[0]:e;ctx.globalCompositeOperation='destination-out';ctx.beginPath();ctx.arc(p.clientX-r.left,p.clientY-r.top,26,0,Math.PI*2);ctx.fill();hint.style.opacity=0;const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;let clear=0;for(let i=3;i<pixels.length;i+=80)if(pixels[i]===0)clear++;if(clear/(pixels.length/80)>.32) reveal();}
  function reveal(){revealed=true;card.classList.add('is-revealed');canvas.style.transition='opacity .7s';canvas.style.opacity=0;hint.style.opacity=0;petalPop();}
  ['pointerdown','pointermove','pointerup','pointerleave'].forEach(type=>canvas.addEventListener(type,e=>{if(type==='pointerdown')drawing=true;if(type==='pointerup'||type==='pointerleave')drawing=false;scratch(e)}));
  function petalPop(){const box=$('petals');for(let i=0;i<26;i++){const p=document.createElement('i');p.className='petal';p.style.left=(35+Math.random()*30)+'vw';p.style.setProperty('--x',(-180+Math.random()*360)+'px');p.style.animationDelay=(Math.random()*.5)+'s';box.appendChild(p);setTimeout(()=>p.remove(),3800)}}
  const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.14});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
})();

