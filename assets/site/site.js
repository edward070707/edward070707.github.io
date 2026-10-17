/* ════════════════════════════════════════════════════════════════════
   edwardattuati.com — comportamento condiviso
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';
  const doc = document.documentElement;
  doc.classList.add('js');

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── VETRO LIQUIDO: rifrazione ai bordi ─────────────────────────────
     Per ogni elemento di vetro genera una mappa di spostamento: vicino al
     bordo i pixel dello sfondo vengono tirati verso l'interno, come in una
     lente convessa. backdrop-filter con un filtro SVG funziona solo su
     Chromium; altrove resta la sfocatura satura del CSS. */
  const isChromium = !!(navigator.userAgentData && navigator.userAgentData.brands &&
    navigator.userAgentData.brands.some(b => /Chromium/.test(b.brand)));
  // Solo su computer: su telefono il calcolo costa troppo e la sfocatura CSS basta.
  const refract = isChromium && matchMedia('(hover: hover) and (pointer: fine)').matches;
  let svgDefs = null;
  const mapCache = new Map();

  function ensureDefs() {
    if (svgDefs) return svgDefs;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    svgDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(svgDefs);
    document.body.appendChild(svg);
    return svgDefs;
  }

  /* La mappa è neutra (128,128) ovunque tranne che in una fascia lungo il
     bordo: si riempie tutta in un colpo e si calcolano solo i pixel vicini
     ai lati. Bassa risoluzione: feImage la stira e la mappa è morbida. */
  function displacementMap(w, h, r, band) {
    const key = [w, h, r, band].join('x');
    if (mapCache.has(key)) return mapCache.get(key);
    const s = 0.3;
    const cw = Math.max(2, Math.round(w * s)), ch = Math.max(2, Math.round(h * s));
    const c = document.createElement('canvas'); c.width = cw; c.height = ch;
    const g = c.getContext('2d'); const img = g.createImageData(cw, ch); const d = img.data;
    new Uint32Array(d.buffer).fill(0xFF808080);                // neutro, opaco
    const hx = w / 2, hy = h / 2, rr = Math.min(r, hx, hy);
    const edge = Math.ceil((Math.max(rr, band) + 2) * s);       // fascia da calcolare, in pixel della mappa
    for (let y = 0; y < ch; y++) {
      const fullRow = y < edge || y >= ch - edge;
      for (let x = 0; x < cw; x++) {
        if (!fullRow && x === edge) x = Math.max(edge, cw - edge); // salta il centro
        const px = (x + .5) / s - hx, py = (y + .5) / s - hy;
        const qx = Math.abs(px) - (hx - rr), qy = Math.abs(py) - (hy - rr);
        const sd = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - rr;   // <0 dentro
        const inside = -sd;
        if (inside >= band) continue;
        let nx = 0, ny = 0;
        if (qx > 0 && qy > 0) { const l = Math.hypot(qx, qy) || 1; nx = qx / l * Math.sign(px); ny = qy / l * Math.sign(py); }
        else if (qx > qy) nx = Math.sign(px); else ny = Math.sign(py);
        const t = (1 - Math.max(inside, 0) / band) ** 2;
        const i = (y * cw + x) * 4;
        d[i] = 128 - nx * t * 127; d[i + 1] = 128 - ny * t * 127;
      }
    }
    g.putImageData(img, 0, 0);
    const url = c.toDataURL();
    mapCache.set(key, url);
    return url;
  }

  let filterSeq = 0;
  function applyRefraction(el) {
    if (!refract) return;
    const w = el.offsetWidth, h = el.offsetHeight;             // misure senza trasformazioni
    if (w < 8 || h < 8) return;
    if (el._lgSize === w + 'x' + h) return;                    // niente da rifare
    el._lgSize = w + 'x' + h;
    const cs = getComputedStyle(el);
    const radius = parseFloat(cs.borderTopLeftRadius) || 0;
    const band = Math.min(parseFloat(cs.getPropertyValue('--lg-band')) || 22, Math.min(w, h) / 2);
    const scale = parseFloat(cs.getPropertyValue('--lg-scale')) || 38;
    const blur = (parseFloat(cs.getPropertyValue('--blur')) || 14) / 2;
    const id = el.dataset.lgId || ('lg' + (++filterSeq));
    el.dataset.lgId = id;
    const NS = 'http://www.w3.org/2000/svg';
    const defs = ensureDefs();
    let f = defs.querySelector('#' + id);
    if (!f) { f = document.createElementNS(NS, 'filter'); f.id = id; defs.appendChild(f); }
    f.setAttribute('x', '0'); f.setAttribute('y', '0'); f.setAttribute('width', w); f.setAttribute('height', h);
    f.setAttribute('filterUnits', 'userSpaceOnUse'); f.setAttribute('color-interpolation-filters', 'sRGB');
    f.innerHTML =
      `<feImage href="${displacementMap(w, h, radius, band)}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none" result="map"/>` +
      `<feDisplacementMap in="SourceGraphic" in2="map" scale="${scale}" xChannelSelector="R" yChannelSelector="G" result="bent"/>` +
      `<feGaussianBlur in="bent" stdDeviation="${blur}" result="soft"/>` +
      `<feColorMatrix in="soft" type="saturate" values="1.7"/>`;
    el.style.backdropFilter = `url(#${id})`;
  }

  /* Il lavoro si fa a pezzi, quando il browser è libero: mai un blocco unico
     durante il caricamento. */
  const idle = window.requestIdleCallback || (cb => setTimeout(() => cb({ timeRemaining: () => 8 }), 50));
  const glassQueue = new Set();
  let pumping = false;
  function pump(deadline) {
    for (const el of glassQueue) {
      glassQueue.delete(el);
      applyRefraction(el);
      if (deadline.timeRemaining() < 5) break;
    }
    if (glassQueue.size) idle(pump, { timeout: 1500 }); else pumping = false;
  }
  function scheduleGlass(el) {
    glassQueue.add(el);
    if (!pumping) { pumping = true; idle(pump, { timeout: 1500 }); }
  }

  function initGlass(root = document) {
    if (!refract) return;
    doc.classList.add('lg-refract');
    const els = root.querySelectorAll('.glass, .gbtn:not(.on-paper .gbtn):not(.sheet .gbtn), .gchip, [data-glass]');
    const ro = new ResizeObserver(entries => entries.forEach(e => scheduleGlass(e.target)));
    els.forEach(el => ro.observe(el));                          // l'osservatore li segnala tutti una prima volta
  }
  window.EA = window.EA || {};
  EA.refreshGlass = el => { if (el) { el._lgSize = ''; scheduleGlass(el); } };

  /* ── COMPARSA ALLO SCROLL ──────────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('in')); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    els.forEach(el => io.observe(el));
  }

  /* ── NAVIGAZIONE: sezione attiva ───────────────────────────────── */
  function initNavSpy() {
    const links = [...document.querySelectorAll('.nav a[href^="#"], .tabbar a[href^="#"]')];
    const ids = [...new Set(links.map(a => a.getAttribute('href').slice(1)))];
    const secs = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!secs.length) return;
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'));
    }), { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(s => io.observe(s));
  }

  /* ── LINGUE ────────────────────────────────────────────────────── */
  const LANGS = { it: 'Italiano', en: 'English', es: 'Español', zh: '中文', ja: '日本語' };
  EA.lang = 'it';
  EA.t = key => {
    const dict = (window.EA_I18N || {})[EA.lang] || {};
    const base = (window.EA_I18N || {}).it || {};
    return dict[key] !== undefined ? dict[key] : base[key];
  };
  /* date dei percorsi formattate nella lingua scelta */
  function renderDates(L) {
    document.querySelectorAll('.tl-when[data-from]').forEach(el => {
      const from = el.dataset.from, to = el.dataset.to;
      const d = s => new Date(Number(s.slice(0, 4)), s.length > 4 ? Number(s.slice(5, 7)) - 1 : 0, 1);
      let out = from + ' – ' + (to || EA.t('present'));
      if (/-\d\d$/.test(from)) {
        const f = new Intl.DateTimeFormat(L, { month: 'short', year: 'numeric' });
        out = to ? (f.formatRange ? f.formatRange(d(from), d(to)) : f.format(d(from)) + ' – ' + f.format(d(to)))
                 : f.format(d(from)) + ' – ' + EA.t('present');
      }
      el.textContent = out;
    });
  }
  EA.setLang = function (lang) {
    if (!LANGS[lang]) lang = 'it';
    EA.lang = lang;
    doc.lang = lang;
    try { localStorage.setItem('ea-lang', lang); } catch (e) {}
    document.querySelectorAll('[data-i18n]').forEach(el => { const v = EA.t(el.dataset.i18n); if (v !== undefined) el.textContent = v; });
    document.querySelectorAll('[data-i18n-html]').forEach(el => { const v = EA.t(el.dataset.i18nHtml); if (v !== undefined) el.innerHTML = v; });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => { const v = EA.t(el.dataset.i18nAlt); if (v !== undefined) el.alt = v; });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { const v = EA.t(el.dataset.i18nAria); if (v !== undefined) el.setAttribute('aria-label', v); });
    document.querySelectorAll('.lang-menu button').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false'));
    document.querySelectorAll('[data-lang-code]').forEach(el => el.textContent = lang.toUpperCase());
    document.querySelectorAll('.lang-btn').forEach(b => b.setAttribute('aria-label', (EA.t('lang-label') || 'Lingua') + ': ' + lang.toUpperCase()));
    renderDates(lang);
    document.dispatchEvent(new CustomEvent('ea:lang', { detail: lang }));
  };
  function initLang() {
    if (!window.EA_I18N) return;          // pagina in una sola lingua
    document.querySelectorAll('.lang').forEach(wrap => {
      const btn = wrap.querySelector('.lang-btn');
      btn && btn.addEventListener('click', () => { const o = wrap.classList.toggle('open'); btn.setAttribute('aria-expanded', o); });
      wrap.querySelectorAll('.lang-menu button').forEach(b => b.addEventListener('click', () => {
        EA.setLang(b.dataset.lang); wrap.classList.remove('open'); btn && btn.setAttribute('aria-expanded', 'false');
      }));
      document.addEventListener('click', e => { if (!wrap.contains(e.target)) { wrap.classList.remove('open'); btn && btn.setAttribute('aria-expanded', 'false'); } });
      wrap.addEventListener('keydown', e => { if (e.key === 'Escape') { wrap.classList.remove('open'); btn && btn.focus(); } });
    });
    let saved = null;
    try { saved = localStorage.getItem('ea-lang'); } catch (e) {}
    const browser = (navigator.language || 'it').slice(0, 2);
    EA.setLang(saved || (LANGS[browser] ? browser : 'it'));
  }

  /* ── COPIA EMAIL (pagine interne: [data-copy-mail]) ────────────── */
  EA.say = function (msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast glass'; t.setAttribute('role', 'status'); t.setAttribute('aria-live', 'polite'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(EA.say.to); EA.say.to = setTimeout(() => t.classList.remove('show'), 2200);
  };
  function initCopy() {
    document.querySelectorAll('[data-copy-mail]').forEach(b => b.addEventListener('click', () => {
      const m = 'edwardattuati@icloud.com';
      (navigator.clipboard ? navigator.clipboard.writeText(m) : Promise.reject())
        .then(() => EA.say(EA.t('email-copied') || 'Email copiata'), () => { location.href = 'mailto:' + m; });
    }));
  }

  /* ── avvio ─────────────────────────────────────────────────────── */
  function start() {
    initLang();
    initGlass();
    initReveal();
    initNavSpy();
    initCopy();
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
