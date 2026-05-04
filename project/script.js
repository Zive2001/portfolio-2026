/* ==========================================================
   SUPUN portfolio — scroll choreography
   ========================================================== */

(() => {
  const $  = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp  = (a, b, t) => a + (b - a) * t;

  /* ----- progress bar ----- */
  const progress = $('#progress');
  const onScrollProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? window.scrollY / h : 0;
    progress.style.width = (p * 100).toFixed(2) + '%';
  };

  /* ----- sticky rail label ----- */
  const railNum   = $('#rail-num');
  const railLabel = $('#rail-label');
  const sections  = $$('[data-section]');

  const updateRail = () => {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let active = sections[0];
    for (const s of sections){
      const t = s.offsetTop;
      if (mid >= t) active = s;
    }
    if (active){
      railNum.textContent   = active.dataset.section;
      railLabel.textContent = active.dataset.label;
    }
  };

  /* ============================================================
     HERO scroll-morph: type scales up + fades, foot fades down
     hero is 260vh -> 1.6 viewport of pinned scroll
     ============================================================ */
  const hero      = $('.hero');
  const heroStage = $('.hero-stage');
  const heroFoot  = $('.hero-foot');
  const heroMeta  = $('.hero-meta');

  const updateHero = () => {
    const rect = hero.getBoundingClientRect();
    const total = hero.offsetHeight - window.innerHeight;
    const passed = clamp(-rect.top, 0, total);
    const t = total > 0 ? passed / total : 0;   // 0 → 1

    // first 70% scale text up & let it drift up
    const t1 = clamp(t / 0.7, 0, 1);
    const scale = lerp(1, 1.6, t1);
    const ty    = lerp(0, -80, t1);
    const opacity = 1 - clamp((t - 0.55) / 0.4, 0, 1);

    heroStage.style.transform = `translateY(${ty}px) scale(${scale})`;
    heroStage.style.opacity   = opacity;

    // foot drifts away
    heroFoot.style.transform = `translateY(${lerp(0, 80, t1)}px)`;
    heroFoot.style.opacity   = 1 - t1;
    heroMeta.style.opacity   = 1 - clamp(t / 0.4, 0, 1);
  };

  /* ============================================================
     WORK is now a static editorial grid — no JS pinning needed
     ============================================================ */

  /* ============================================================
     Tilt cards — perspective react to mouse + scroll progress
     ============================================================ */
  const tiltEls = $$('[data-tilt]');
  tiltEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = lerp(6, -6, py);
      const ry = lerp(-8, 8, px);
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      // for service radial highlight
      el.style.setProperty('--mx', (px*100).toFixed(1)+'%');
      el.style.setProperty('--my', (py*100).toFixed(1)+'%');
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ============================================================
     Reveal-by-line (about) + counters
     ============================================================ */
  const revealIO = new IntersectionObserver((entries) => {
    for (const e of entries){
      if (e.isIntersecting){
        e.target.classList.add('in');
        revealIO.unobserve(e.target);
      }
    }
  }, { threshold: 0.3 });

  $$('[data-lines]').forEach(el => revealIO.observe(el));

  /* counters */
  const animateCounter = (el) => {
    const target = +el.dataset.counter;
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counterIO = new IntersectionObserver((entries) => {
    for (const e of entries){
      if (e.isIntersecting){
        animateCounter(e.target);
        counterIO.unobserve(e.target);
      }
    }
  }, { threshold: 0.5 });
  $$('[data-counter]').forEach(el => counterIO.observe(el));

  /* ============================================================
     Master scroll loop (rAF-batched)
     ============================================================ */
  let raf = 0;
  let pending = false;
  const schedule = () => {
    if (pending) return;
    pending = true;
    raf = requestAnimationFrame(() => {
      pending = false;
      onScrollProgress();
      updateRail();
      updateHero();
    });
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);

  /* init */
  schedule();

  /* ============================================================
     Smooth nav-scroll: account for sticky header offset is fine
     since CSS already uses scroll-behavior: smooth
     ============================================================ */
})();
