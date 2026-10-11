/* ════════════════════════════════════════════════════════════════════
   Homepage: atomo, saluti, macchina da scrivere, Konami, GitHub reale
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = k => (window.EA && EA.t ? EA.t(k) : k);
  const lang = () => (window.EA && EA.lang) || 'it';

  /* ── SALUTI IN 38 LINGUE ───────────────────────────────────────── */
  const GREETINGS = ['Hello','Bonjour','Hola','Ciao','こんにちは','Guten Tag','Olá','नमस्ते','سلام','Hej','Merhaba','안녕하세요','你好','Sawubona','Shalom','Szia','Selamat','Dobrý den','Aloha','Jambo','Hoi','Salut','Привіт','Γεια σου','Halló','Hei','Сайн уу','Kamusta','Привет','مرحبا','Sveiki','Päivää','Kia ora','Hallo','नमस्कार','Moi','Kaixo','Labas'];
  (function greet() {
    const el = $('#greet'); if (!el) return;
    let i = Math.floor(Math.random() * GREETINGS.length);
    el.textContent = GREETINGS[i];
    if (reduce) return;                       // movimento ridotto: un saluto fermo e sempre visibile
    setInterval(() => {
      el.classList.add('swap');
      setTimeout(() => { i = (i + 1) % GREETINGS.length; el.textContent = GREETINGS[i]; el.classList.remove('swap'); }, 300);
    }, 2800);
  })();

  /* ── MACCHINA DA SCRIVERE ──────────────────────────────────────── */
  const tw = { el: $('#typewriter'), timer: null, run: 0 };
  function typewriter() {
    if (!tw.el) return;
    const words = t('typewriter'); if (!Array.isArray(words) || !words.length) return;
    const run = ++tw.run; clearTimeout(tw.timer);
    let w = 0, c = 0, deleting = false;
    if (reduce) { tw.el.textContent = words[0]; tw.timer = setInterval(() => { if (run !== tw.run) return; w = (w + 1) % words.length; tw.el.textContent = words[w]; }, 3200); return; }
    (function step() {
      if (run !== tw.run) return;
      const word = words[w];
      c += deleting ? -1 : 1;
      tw.el.textContent = word.slice(0, c);
      let delay = deleting ? 28 : 58;
      if (!deleting && c === word.length) { deleting = true; delay = 1700; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 380; }
      tw.timer = setTimeout(step, delay);
    })();
  }

  /* ── TESTI CHE DIPENDONO DALLA LINGUA ──────────────────────────── */
  function renderTags() {
    document.querySelectorAll('[data-tags]').forEach(ul => {
      const v = t(ul.dataset.tags); if (typeof v !== 'string') return;
      ul.innerHTML = v.split(/\s+·\s+/).map(x => `<li>${x}</li>`).join('');
    });
  }
  function onLang() { renderTags(); typewriter(); renderGitHub(); atom && atom.relabel(); }
  document.addEventListener('ea:lang', onLang);

  /* ── ATOMO NELLA BOLLA DI VETRO ────────────────────────────────── */
  const atom = (function () {
    const bubble = $('#bubble'), canvas = $('#atom');
    if (!bubble || !canvas) return null;
    const ctx = canvas.getContext('2d');
    const hero = $('#home'), stateEl = $('#atom-state'), egg = $('#egg'), eggText = $('#egg-text'), eggBar = $('#egg-bar');

    // colori presi dalla foto: oro del sole, arancio del tramonto, verde acqua del canale
    const STATES = [
      { key: 'atom-ground',  rgb: [243, 226, 181], speed: 1 },
      { key: 'atom-excited', rgb: [233, 145,  91], speed: 2.2 },
      { key: 'atom-quantum', rgb: [169, 210, 196], speed: 3.5 },
    ];
    let si = 0;
    const col = (a, k = 1) => { const c = STATES[si].rgb; return `rgba(${Math.min(255, c[0] * k)|0},${Math.min(255, c[1] * k)|0},${Math.min(255, c[2] * k)|0},${a})`; };

    // 4 orbite, 7 elettroni (come l'atomo originale)
    const ORBITS = [
      { tilt: 1.18, rot: 0.00, n: 3, w: 1.00 },
      { tilt: 1.18, rot: 2.09, n: 2, w: 0.86 },
      { tilt: 1.18, rot: 4.19, n: 1, w: 1.14 },
      { tilt: 0.30, rot: 0.60, n: 1, w: 0.72 },
    ];
    const electrons = [];
    ORBITS.forEach((o, oi) => { for (let k = 0; k < o.n; k++) electrons.push({ o: oi, ph: k / o.n * Math.PI * 2 + oi, trail: [] }); });

    let W = 0, H = 0, R = 0, dpr = 1;
    function size() {
      dpr = Math.min(2, devicePixelRatio || 1);
      const r = bubble.getBoundingClientRect(); W = r.width; H = r.height; R = Math.min(W, H) * 0.36;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    new ResizeObserver(size).observe(bubble); size();

    // rotazione 3D: punto sull'orbita → spazio → vista
    let viewY = 0, viewX = 0, tiltX = 0, tiltY = 0, aimX = 0, aimY = 0;
    function project(o, a) {
      let x = Math.cos(a) * R, y = Math.sin(a) * R, z = 0;
      let ca = Math.cos(o.tilt), sa = Math.sin(o.tilt);
      [y, z] = [y * ca - z * sa, y * sa + z * ca];                 // inclinazione
      ca = Math.cos(o.rot); sa = Math.sin(o.rot);
      [x, y] = [x * ca - y * sa, x * sa + y * ca];                 // rotazione nel piano
      const vy = viewY + tiltY, vx = viewX + tiltX;
      ca = Math.cos(vy); sa = Math.sin(vy); [x, z] = [x * ca + z * sa, -x * sa + z * ca];
      ca = Math.cos(vx); sa = Math.sin(vx); [y, z] = [y * ca - z * sa, y * sa + z * ca];
      const p = 900 / (900 + z);
      return { x: W / 2 + x * p, y: H / 2 + y * p, z, p };
    }

    // particelle e onde
    const parts = [], ripples = [];
    function burst(x, y, n) {
      for (let i = 0; i < n; i++) {
        const a = Math.PI * 2 * i / n + (Math.random() - .5) * .5, v = 1.2 + Math.random() * 3.6;
        parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, decay: .014 + Math.random() * .02, r: 1.1 + Math.random() * 2.6, rgb: STATES[si].rgb });
      }
    }
    const ripple = () => ripples.push({ r: R * .25, a: .7 });

    // velocità: stato × passaggio del mouse × lampo
    let hovered = false, flash = 1, flashTo = 0, speedMul = reduce ? .35 : 1;
    const speed = () => STATES[si].speed * (hovered ? 1.8 : 1) * flash * speedMul;
    function flashSpeed(v, ms) { flash = v; clearTimeout(flashTo); flashTo = setTimeout(() => { flash = 1; }, ms); }

    let last = performance.now(), ang = 0;
    function frame(now) {
      const dt = Math.min(48, now - last) / 16.67; last = now;
      ang += .018 * speed() * dt;
      viewY += .0035 * dt * (reduce ? .3 : 1);
      tiltX += (aimX - tiltX) * .075; tiltY += (aimY - tiltY) * .075;

      ctx.clearRect(0, 0, W, H);

      // nucleo: un piccolo sole
      const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, R * .55);
      g.addColorStop(0, col(.95, 1.05)); g.addColorStop(.18, col(.55)); g.addColorStop(1, col(0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(W / 2, H / 2, R * .55, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(255,250,236,.95)'; ctx.beginPath(); ctx.arc(W / 2, H / 2, R * .075, 0, Math.PI * 2); ctx.fill();

      // orbite, più luminose davanti
      ORBITS.forEach(o => {
        let prev = null;
        for (let i = 0; i <= 96; i++) {
          const pt = project(o, i / 96 * Math.PI * 2);
          if (prev) {
            const front = (1 - (pt.z + R) / (2 * R));
            ctx.strokeStyle = `rgba(255,248,230,${.12 + front * .5})`;
            ctx.lineWidth = .8 + front * 1.4;
            ctx.beginPath(); ctx.moveTo(prev.x, prev.y); ctx.lineTo(pt.x, pt.y); ctx.stroke();
          }
          prev = pt;
        }
      });

      // elettroni con scia
      electrons.forEach(e => {
        const o = ORBITS[e.o];
        const p = project(o, e.ph + ang * o.w);
        e.trail.push(p); if (e.trail.length > 20) e.trail.shift();
        for (let i = 1; i < e.trail.length; i++) {
          const a = i / e.trail.length;
          ctx.strokeStyle = col(a * .55); ctx.lineWidth = a * 3.2 * p.p;
          ctx.beginPath(); ctx.moveTo(e.trail[i - 1].x, e.trail[i - 1].y); ctx.lineTo(e.trail[i].x, e.trail[i].y); ctx.stroke();
        }
        const r = (3.2 + (1 - (p.z + R) / (2 * R)) * 3) * p.p;
        const eg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        eg.addColorStop(0, col(.9, 1.08)); eg.addColorStop(1, col(0));
        ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.arc(p.x, p.y, r * .7, 0, Math.PI * 2); ctx.fill();
      });

      // onde
      for (let i = ripples.length - 1; i >= 0; i--) {
        const w = ripples[i]; w.r += 4.2 * dt; w.a -= .016 * dt;
        if (w.a <= 0) { ripples.splice(i, 1); continue; }
        ctx.strokeStyle = col(w.a); ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.arc(W / 2, H / 2, w.r, 0, Math.PI * 2); ctx.stroke();
      }
      // particelle
      for (let i = parts.length - 1; i >= 0; i--) {
        const q = parts[i]; q.x += q.vx * dt; q.y += q.vy * dt; q.vx *= .965; q.vy *= .965; q.life -= q.decay * dt;
        if (q.life <= 0) { parts.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(${q.rgb[0]},${q.rgb[1]},${q.rgb[2]},${q.life})`;
        ctx.beginPath(); ctx.arc(q.x, q.y, q.r * q.life, 0, Math.PI * 2); ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // inclinazione verso il puntatore
    addEventListener('pointermove', e => {
      const r = bubble.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width * .55), dy = (e.clientY - (r.top + r.height / 2)) / (r.height * .55);
      if (Math.hypot(dx, dy) < 1.8) { aimX = -dy * .5; aimY = dx * .5; } else { aimX = 0; aimY = 0; }
    }, { passive: true });
    bubble.addEventListener('pointerenter', () => { hovered = true; });
    bubble.addEventListener('pointerleave', () => { hovered = false; });

    // stato e contatore dell'easter egg
    let clicks = 0, done = false;
    function relabel() { stateEl.textContent = t(STATES[si].key); if (clicks >= 5 && !done) counter(); }
    function counter() {
      const k = clicks < 10 ? 'egg-1' : clicks < 15 ? 'egg-2' : clicks < 18 ? 'egg-3' : 'egg-4';
      eggText.textContent = `${clicks}/20 · ${t(k)}`;
      eggBar.style.width = (clicks / 20 * 100) + '%';
      egg.classList.add('show'); egg.classList.toggle('hot', clicks >= 15);
    }
    function milestone() { burst(W / 2, H / 2, 70); flashSpeed(9, 700); for (let i = 0; i < 3; i++) setTimeout(ripple, i * 120); }
    function excite(x, y) {
      if (done) return;
      burst(x, y, 30 + Math.min(clicks * 2, 40)); ripple();
      si = (si + 1) % STATES.length; relabel();
      flashSpeed(6 + clicks * .3, 400);
      clicks++;
      if (clicks >= 5) counter();
      if (clicks === 10 || clicks === 15) milestone();
      if (!reduce && clicks === 15) hero.classList.add('charging');
      if (!reduce && clicks === 18) { hero.classList.remove('charging'); hero.classList.add('charging-hard'); }
      if (clicks >= 20) explode();
    }
    function explode() {
      done = true; hero.classList.remove('charging', 'charging-hard');
      egg.classList.remove('show'); speedMul = .2; burst(W / 2, H / 2, 60);
      document.querySelectorAll('.hero-panel, .atom-meta, .scroll-cue').forEach(el => { el.style.transition = 'opacity .5s'; el.style.opacity = '0'; });
      setTimeout(() => {
        const veil = $('#veil'), bar = $('#veil-bar'), pct = $('#veil-pct');
        veil.hidden = false; EA.refreshGlass && EA.refreshGlass(veil);
        requestAnimationFrame(() => requestAnimationFrame(() => { veil.classList.add('show'); bar.style.width = '100%'; }));
        const t0 = performance.now();
        (function count(now) { const p = Math.min(1, (now - t0) / 1700); pct.textContent = Math.round(p * 100) + '%'; if (p < 1) requestAnimationFrame(count); })(t0);
        setTimeout(() => { location.href = '/aboutme.html'; }, 1950);
      }, 520);
    }

    // click vs trascinamento
    let down = null, dragging = false;
    bubble.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY }; dragging = false; bubble.setPointerCapture(e.pointerId); });
    bubble.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!dragging && Math.hypot(dx, dy) > 6) { dragging = true; bubble.classList.add('dragging'); }
      if (dragging) {
        const k = 0.55;                               // il vetro oppone resistenza
        bubble.style.transform = `translate(${dx * k}px, ${dy * k}px)`;
        if (Math.random() < .5) { const r = bubble.getBoundingClientRect(); burst(e.clientX - r.left, e.clientY - r.top, 2); }
      }
    });
    function release(e) {
      if (!down) return;
      if (dragging) { bubble.classList.remove('dragging'); bubble.style.transform = ''; ripple(); }
      else { const r = bubble.getBoundingClientRect(); excite(e.clientX - r.left, e.clientY - r.top); }
      down = null; dragging = false;
    }
    bubble.addEventListener('pointerup', release);
    bubble.addEventListener('pointercancel', () => { down = null; dragging = false; bubble.classList.remove('dragging'); bubble.style.transform = ''; });
    bubble.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); excite(W / 2, H / 2); } });

    return { relabel };
  })();

  /* ── KONAMI ↑↑↓↓←→←→BA ─────────────────────────────────────────── */
  (function konami() {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let i = 0; const dlg = $('#konami'); if (!dlg) return;
    addEventListener('keydown', e => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === seq[i]) { if (++i === seq.length) { i = 0; dlg.showModal(); EA.refreshGlass && EA.refreshGlass(dlg.querySelector('.glass')); } }
      else i = k === seq[0] ? 1 : 0;
    });
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  })();

  /* ── EMAIL ─────────────────────────────────────────────────────── */
  const toast = $('#toast'); let toastTo;
  function say(msg) { toast.textContent = msg; toast.classList.add('show'); clearTimeout(toastTo); toastTo = setTimeout(() => toast.classList.remove('show'), 2200); }
  function copyMail() { const m = 'edwardattuati@icloud.com'; (navigator.clipboard ? navigator.clipboard.writeText(m) : Promise.reject()).then(() => say(t('email-copied')), () => { location.href = 'mailto:' + m; }); }
  ['#mail', '#copy-mail'].forEach(s => { const b = $(s); b && b.addEventListener('click', copyMail); });

  /* ── GITHUB: dati reali dall'API ───────────────────────────────── */
  let gh = null;
  async function loadGitHub() {
    try { const c = JSON.parse(sessionStorage.getItem('ea-gh') || 'null'); if (c && Date.now() - c.at < 30 * 60e3) return c; } catch (e) {}
    const [u, r] = await Promise.all([
      fetch('https://api.github.com/users/edward070707').then(x => { if (!x.ok) throw x.status; return x.json(); }),
      fetch('https://api.github.com/users/edward070707/repos?sort=pushed&per_page=12').then(x => { if (!x.ok) throw x.status; return x.json(); }),
    ]);
    const data = { at: Date.now(), repos: u.public_repos, followers: u.followers, since: u.created_at,
      list: r.filter(x => !x.fork).slice(0, 4).map(x => ({ name: x.name, desc: x.description, lang: x.language, url: x.html_url, pushed: x.pushed_at })) };
    try { sessionStorage.setItem('ea-gh', JSON.stringify(data)); } catch (e) {}
    return data;
  }
  function renderGitHub() {
    const list = $('#gh-list'); if (!list) return;
    if (gh === 'error') { list.innerHTML = `<li class="gh-note">${t('gh-error')}</li>`; return; }
    if (!gh) return;
    const pr = new Intl.PluralRules(lang());
    const n = (v, k) => `<span class="nw"><b>${v}</b> ${t(k + '-' + (pr.select(v) === 'one' ? 'one' : 'other'))}</span>`;
    $('#gh-sum').innerHTML = [n(gh.repos, 'gh-repo'), n(gh.followers, 'gh-fol'),
      `<span class="nw">${t('gh-since-t').replace('{y}', `<b>${new Date(gh.since).getFullYear()}</b>`)}</span>`].join(' · ');
    const f = new Intl.DateTimeFormat(lang(), { day: 'numeric', month: 'short', year: 'numeric' });
    list.innerHTML = gh.list.map(x => `<li><a href="${x.url}" target="_blank" rel="noopener"><strong>${x.name}</strong>` +
      (x.desc ? `<span>${x.desc.replace(/</g, '&lt;')}</span>` : '') +
      `<span>${[x.lang, t('gh-updated') + ' ' + f.format(new Date(x.pushed))].filter(Boolean).join(' · ')}</span></a></li>`).join('');
  }
  if ('IntersectionObserver' in window && $('#code')) {
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); loadGitHub().then(d => { gh = d; renderGitHub(); }, () => { gh = 'error'; renderGitHub(); }); } }, { rootMargin: '400px' });
    io.observe($('#code'));
  }

  onLang();
})();
