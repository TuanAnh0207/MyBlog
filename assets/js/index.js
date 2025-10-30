// Main app JS cho Blog cá nhân
// Tính năng: hash router, nạp và render bài markdown, dark/light toggle, TOC, search, filter, pagination, copy code
// Viết từng function/module về sau

(function() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  // Icon unicode cho cảm giác auto
  const icons = {
    light: '🌞',
    dark: '🌙',
    auto: '🌓'
  };
  // Kiểm tra localStorage hoặc media query
  function getSavedTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') return theme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if(btn) btn.textContent = theme === 'dark' ? icons.dark : icons.light;
  }
  // Toggle theme
  function toggleTheme() {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }
  // Khởi tạo
  document.addEventListener('DOMContentLoaded', function() {
    if (!btn) return;
    const theme = getSavedTheme();
    applyTheme(theme);
    btn.addEventListener('click', toggleTheme);
  });
})();

// Hero slider effect: smooth slide transition
(function () {
  const track = document.querySelector('.hero-slider .slides-track');
  const slides = document.querySelectorAll('.hero-slider .slide');
  const dots = document.querySelectorAll('.hero-slider .dot');
  const btnPrev = document.getElementById('prev-slide');
  const btnNext = document.getElementById('next-slide');
  let idx = 0, max = slides.length;
  function showSlide(i) {
    idx = (i+max)%max;
    if(track) track.style.transform = `translateX(-${idx*100}vw)`;
    dots.forEach((d, j) => d.classList.toggle('active', idx===j));
  }
  if(track && slides.length && btnPrev && btnNext) {
    btnPrev.onclick = function(){ showSlide(idx-1); }
    btnNext.onclick = function(){ showSlide(idx+1); }
    dots.forEach((dot, i) => dot.onclick = () => showSlide(i));
    showSlide(idx);
  }
})();

// Featured post slider
(function(){
  const container = document.querySelector('.featured-slider');
  const windowEl = document.querySelector('.featured-slider-window');
  const track = document.querySelector('.featured-slider-track');
  const slides = document.querySelectorAll('.featured-slide');
  const prev = document.querySelector('.featured-slider-prev');
  const next = document.querySelector('.featured-slider-next');
  const dots = document.querySelectorAll('.featured-slider-dots .dot');
  let idx = 0; let timerId = null; const INTERVAL_MS = 2500; let slideW = 0;

  function applyTransform(){ if(track) track.style.transform = `translateX(-${(idx*slideW)|0}px)`; }

  function measure(){
    if(!windowEl || !track) return;
    // turn off transition during layout
    const prevTransition = track.style.transition;
    track.style.transition = 'none';
    slideW = Math.round(windowEl.getBoundingClientRect().width);
    slides.forEach(s=>{ s.style.minWidth = slideW+'px'; s.style.maxWidth = slideW+'px'; });
    track.style.width = (slides.length * slideW) + 'px';
    applyTransform();
    // force reflow then restore transition
    void track.offsetHeight; // reflow
    track.style.transition = prevTransition || '';
  }

  function showSlide(i){
    idx = (i + slides.length) % slides.length;
    applyTransform();
    dots.forEach((d,j)=>d.classList.toggle('active',j===idx));
  }

  function startAuto(){ if(timerId) return; timerId = setInterval(()=> showSlide(idx+1), INTERVAL_MS); }
  function stopAuto(){ if(timerId){ clearInterval(timerId); timerId=null; } }

  if(track && slides.length && prev && next){
    prev.onclick = ()=>{ stopAuto(); showSlide(idx-1); startAuto(); };
    next.onclick = ()=>{ stopAuto(); showSlide(idx+1); startAuto(); };
    dots.forEach((dot,i)=> dot.onclick = ()=>{ stopAuto(); showSlide(i); startAuto(); });
    if(container){
      container.addEventListener('mouseenter', stopAuto);
      container.addEventListener('mouseleave', startAuto);
      container.addEventListener('touchstart', stopAuto, {passive:true});
      container.addEventListener('touchend', startAuto, {passive:true});
    }
    window.addEventListener('load', ()=>{ measure(); showSlide(0); startAuto(); });
    window.addEventListener('resize', (function(){ let t; return function(){ clearTimeout(t); t=setTimeout(()=>{ measure(); showSlide(idx); }, 120); }; })());
  }
})();

// One-time intro flyby banner
(function(){
  const flyby = document.querySelector('.intro-flyby');
  const smoke = document.querySelector('.smoke-overlay');
  const seen = localStorage.getItem('introSeen') === 'true';
  function finishIntro(){
    document.body.classList.add('intro-done');
    if(flyby) flyby.style.display = 'none';
    if(smoke) smoke.style.display = 'none';
  }
  if(!flyby || !smoke){
    document.body.classList.add('intro-done');
    return;
  }
  if(seen){
    finishIntro();
    return;
  }
  // Wait smoke fade animation end
  smoke.addEventListener('animationend', function(){
    localStorage.setItem('introSeen','true');
    finishIntro();
  });
})();
