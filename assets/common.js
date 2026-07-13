/* =========================================================================
   Mira & Maia's Game Arcade — shared engine (MM)
   Vanilla JS, zero dependencies, fully offline. Include AFTER common.css.

   Quick start for a game page:
     MM.game({
       title: 'Sim', emoji: '🔺',
       ba: 'https://beastacademy.com/playground/sim',
       rules: `<p>...</p>`,               // HTML string shown in the Rules modal
       modes: [                            // omit to skip the mode screen
         { id:'ai',  emoji:'🤖', name:'Vs Computer', sub:'You vs the robot' },
         { id:'two', emoji:'🧑‍🤝‍🧑', name:'2 Players', sub:'Take turns' },
       ],
       onStart(mode, mount){ ...build the game inside `mount`... }
     });

   Handy helpers: MM.el, MM.rand, MM.shuffle, MM.choice, MM.sound.play,
   MM.confetti, MM.win, MM.die, MM.card, MM.store/load, MM.status(...).
   ========================================================================= */
(function () {
  const MM = {};

  /* ---------------------------------------------------------------- DOM el */
  MM.el = function (tag, props, ...kids) {
    const e = document.createElement(tag);
    if (props) for (const k in props) {
      const v = props[k];
      if (k === 'class' || k === 'className') e.className = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'dataset') Object.assign(e.dataset, v);
      else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v === true) e.setAttribute(k, '');
      else if (v !== false && v != null) e.setAttribute(k, v);
    }
    for (const kid of kids.flat()) {
      if (kid == null || kid === false) continue;
      e.appendChild(typeof kid === 'string' || typeof kid === 'number' ? document.createTextNode(String(kid)) : kid);
    }
    return e;
  };
  const $ = (sel, root) => (root || document).querySelector(sel);

  /* ------------------------------------------------------------------ RNG */
  MM.rand = n => Math.floor(Math.random() * n);           // 0..n-1
  MM.range = (a, b) => a + Math.floor(Math.random() * (b - a + 1)); // a..b inclusive
  MM.choice = arr => arr[Math.floor(Math.random() * arr.length)];
  MM.shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = MM.rand(i + 1); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
  MM.sleep = ms => new Promise(r => setTimeout(r, ms));

  /* ------------------------------------------------------------- storage */
  MM.store = (k, v) => { try { localStorage.setItem('mm:' + k, JSON.stringify(v)); } catch (e) {} };
  MM.load = (k, d) => { try { const s = localStorage.getItem('mm:' + k); return s == null ? d : JSON.parse(s); } catch (e) { return d; } };

  /* -------------------------------------------------------------- audio  */
  // Synthesised sounds via Web Audio — no asset files, works offline.
  let AC = null, muted = MM_muted();
  function MM_muted() { try { return localStorage.getItem('mm:muted') === '1'; } catch (e) { return false; } }
  function ctx() { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } return AC; }
  function tone(freq, dur, type, gain, when) {
    const c = ctx(); if (!c || muted) return;
    const t0 = c.currentTime + (when || 0);
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.2, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  function noise(dur, gain) {
    const c = ctx(); if (!c || muted) return;
    const n = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    const src = c.createBufferSource(); src.buffer = buf;
    const g = c.createGain(); g.gain.value = gain || 0.15;
    src.connect(g); g.connect(c.destination); src.start();
  }
  const SOUNDS = {
    click:  () => tone(520, 0.08, 'triangle', 0.16),
    pop:    () => { tone(400, 0.07, 'sine', 0.22); tone(700, 0.09, 'sine', 0.18, 0.03); },
    place:  () => tone(330, 0.09, 'triangle', 0.2),
    ding:   () => { tone(880, 0.12, 'sine', 0.2); tone(1320, 0.14, 'sine', 0.14, 0.05); },
    wrong:  () => { tone(200, 0.18, 'sawtooth', 0.14); },
    roll:   () => noise(0.25, 0.12),
    deal:   () => noise(0.08, 0.1),
    swoosh: () => noise(0.2, 0.08),
    win:    () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.28, 'triangle', 0.2, i * 0.11)); },
    lose:   () => { [392, 330, 262].forEach((f, i) => tone(f, 0.3, 'sine', 0.18, i * 0.14)); },
    star:   () => { tone(1200, 0.1, 'sine', 0.16); tone(1600, 0.12, 'sine', 0.12, 0.04); },
  };
  MM.sound = {
    play(name) { const f = SOUNDS[name]; if (f) { try { if (AC && AC.state === 'suspended') AC.resume(); f(); } catch (e) {} } },
    get muted() { return muted; },
    toggle() { muted = !muted; try { localStorage.setItem('mm:muted', muted ? '1' : '0'); } catch (e) {} updateSoundBtn(); return muted; },
  };
  // Unlock audio on first gesture (browser autoplay policy)
  window.addEventListener('pointerdown', function once() { const c = ctx(); if (c && c.state === 'suspended') c.resume(); window.removeEventListener('pointerdown', once); }, { once: true });

  let soundBtn = null;
  function updateSoundBtn() { if (soundBtn) soundBtn.textContent = muted ? '🔇' : '🔊'; }

  /* ---------------------------------------------------------- confetti  */
  MM.confetti = function (opts) {
    opts = opts || {};
    let cv = $('#mm-confetti');
    if (!cv) { cv = MM.el('canvas', { id: 'mm-confetti' }); document.body.appendChild(cv); }
    const dpr = window.devicePixelRatio || 1;
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
    const g = cv.getContext('2d'); g.scale(dpr, dpr);
    const colors = ['#ff5a5f', '#ffd23f', '#2ec4b6', '#3a86ff', '#8338ec', '#ff70a6', '#ff9f1c'];
    const N = opts.count || 130;
    const cx = opts.x != null ? opts.x : innerWidth / 2;
    const cy = opts.y != null ? opts.y : innerHeight / 3;
    const parts = [];
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 9;
      parts.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4, r: 4 + Math.random() * 7,
        col: colors[MM.rand(colors.length)], rot: Math.random() * 6, vr: (Math.random() - .5) * .4, life: 0 });
    }
    let raf;
    (function frame() {
      g.clearRect(0, 0, cv.width, cv.height);
      let alive = false;
      for (const p of parts) {
        p.life++; p.vy += 0.22; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.vx *= 0.99;
        if (p.y < innerHeight + 30 && p.life < 220) alive = true;
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.fillStyle = p.col;
        g.globalAlpha = Math.max(0, 1 - p.life / 200);
        g.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6); g.restore();
      }
      if (alive) raf = requestAnimationFrame(frame); else g.clearRect(0, 0, cv.width, cv.height);
    })();
  };

  /* ------------------------------------------------------------- winner  */
  // MM.win({ title:'Blue Wins!', emoji:'🏆', sub:'...', onAgain:fn, onMenu:fn })
  MM.win = function (o) {
    o = o || {};
    MM.sound.play(o.lose ? 'lose' : 'win');
    if (!o.lose) MM.confetti({ count: 160 });
    let back = $('#mm-win');
    if (!back) { back = MM.el('div', { id: 'mm-win', class: 'mm-win' }); document.body.appendChild(back); }
    back.innerHTML = '';
    const card = MM.el('div', { class: 'card' },
      MM.el('div', { class: 'trophy' }, o.emoji || (o.lose ? '🙂' : '🏆')),
      MM.el('h2', { text: o.title || (o.lose ? 'Good try!' : 'You win!') }),
      o.sub ? MM.el('p', { text: o.sub }) : null,
      MM.el('div', { class: 'mm-row' },
        o.onAgain ? MM.el('button', { class: 'mm-btn green', onClick: () => { close(); o.onAgain(); } }, '🔁 Play again') : null,
        MM.el('button', { class: 'mm-btn ghost', onClick: () => { close(); (o.onMenu || (() => location.reload()))(); } }, '🎮 Menu'),
        MM.el('a', { class: 'mm-btn ghost', href: arcadeHref() }, '🏠 Arcade')
      )
    );
    back.appendChild(card); back.classList.add('open');
    function close() { back.classList.remove('open'); }
    return { close };
  };

  /* ---------------------------------------------------------------- dice */
  const PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
  MM.die = function (value) {
    const d = MM.el('div', { class: 'mm-die' });
    for (let i = 0; i < 9; i++) d.appendChild(MM.el('span', { style: { visibility: (PIPS[value] || []).includes(i) ? 'visible' : 'hidden' } }, MM.el('i')));
    return d;
  };
  MM.setDie = function (el, value) { el.replaceWith(MM.die(value)); };
  // animated roll into `el`; resolves with the value
  MM.rollDie = async function (el, sides) {
    sides = sides || 6; MM.sound.play('roll');
    el.classList.add('rolling');
    for (let i = 0; i < 6; i++) { const d = MM.die(MM.range(1, sides)); el.replaceChildren(...d.childNodes); await MM.sleep(60); }
    const v = MM.range(1, sides); const d = MM.die(v); el.replaceChildren(...d.childNodes); el.classList.remove('rolling');
    return v;
  };

  /* --------------------------------------------------------------- cards */
  MM.card = function (label, opts) {
    opts = opts || {};
    const c = MM.el('div', { class: 'mm-card' + (opts.back ? ' back' : '') }, opts.back ? '' : String(label));
    if (opts.color) c.style.color = opts.color;
    return c;
  };

  /* -------------------------------------------------------------- status */
  let statusEl = null;
  MM.status = function (html) { if (statusEl) statusEl.innerHTML = html; };
  MM.statusEl = () => statusEl;

  /* ------------------------------------------------------- page assembly */
  function arcadeHref() {
    // works whether the game sits at /ba/x/index.html or deeper; compute to site root
    const p = location.pathname;
    if (/\/(ba|mine|spot-it|printables)\/[^/]+\//.test(p)) return '../../index.html';
    if (/\/(ba|mine|spot-it|printables)\//.test(p)) return '../index.html';
    return 'index.html';
  }
  MM.arcadeHref = arcadeHref;

  MM.decor = function () { // scatter a few floating blobs
    const cols = ['#ffd23f', '#2ec4b6', '#ff70a6', '#3a86ff', '#8338ec'];
    for (let i = 0; i < 5; i++) {
      const s = 60 + MM.rand(90);
      document.body.appendChild(MM.el('div', { class: 'mm-blob', style: {
        width: s + 'px', height: s + 'px', background: cols[i % cols.length],
        // keep blobs away from the right/bottom edges so they never add scroll
        left: (4 + MM.rand(74)) + 'vw', top: (8 + MM.rand(66)) + 'vh',
        animationDelay: (i * 1.3) + 's'
      } }));
    }
  };

  // Main entry: builds chrome + optional mode screen, then calls onStart.
  MM.game = function (cfg) {
    document.title = cfg.title + " — Mira & Maia's Arcade";
    MM.decor();

    // top bar
    const rulesBtn = MM.el('button', { class: 'mm-btn ghost small', onClick: openRules }, '❓ Rules');
    soundBtn = MM.el('button', { class: 'mm-icon-btn', title: 'Sound', onClick: () => { MM.sound.toggle(); MM.sound.play('click'); } }, muted ? '🔇' : '🔊');
    const bar = MM.el('div', { class: 'mm-topbar' },
      MM.el('a', { class: 'mm-btn ghost small', href: arcadeHref() }, '🏠 Arcade'),
      MM.el('h1', { class: 'mm-title' }, MM.el('span', { class: 'emoji' }, cfg.emoji || '🎲'), cfg.title),
      rulesBtn, soundBtn
    );
    document.body.appendChild(bar);

    const stage = MM.el('div', { class: 'mm-stage' });
    statusEl = MM.el('div', { class: 'mm-status mm-hidden' });
    const statusWrap = MM.el('div', { class: 'mm-center' }, statusEl);
    const mount = MM.el('div', { id: 'mm-mount' });
    stage.append(statusWrap, mount);
    document.body.appendChild(stage);

    // rules modal
    const modal = MM.el('div', { class: 'mm-modal-back', onClick: e => { if (e.target === modal) closeRules(); } },
      MM.el('div', { class: 'mm-modal' },
        MM.el('h2', {}, (cfg.emoji || '') + ' ' + cfg.title),
        MM.el('div', { html: cfg.rules || '' }),
        cfg.ba ? MM.el('a', { class: 'ba-link', href: cfg.ba, target: '_blank', rel: 'noopener' }, '📖 See it on Beast Academy Playground →') : null,
        MM.el('div', { class: 'close-row' }, MM.el('button', { class: 'mm-btn', onClick: closeRules }, 'Got it!'))
      )
    );
    document.body.appendChild(modal);
    function openRules() { MM.sound.play('click'); modal.classList.add('open'); }
    function closeRules() { modal.classList.remove('open'); }
    MM.openRules = openRules;

    const start = (mode) => { statusEl.classList.remove('mm-hidden'); mount.innerHTML = ''; cfg.onStart(mode, mount, { restart: () => renderModes() }); };

    function renderModes() {
      statusEl.classList.add('mm-hidden');
      mount.innerHTML = '';
      if (!cfg.modes || cfg.modes.length === 0) { start(null); return; }
      const wrap = MM.el('div', { class: 'mm-panel mm-bounce-in' },
        MM.el('h2', { class: 'mm-center', style: { marginTop: 0 } }, 'How do you want to play?'),
        MM.el('div', { class: 'mm-mode-wrap' },
          cfg.modes.map(m => MM.el('div', { class: 'mm-mode-card', onClick: () => { MM.sound.play('pop'); start(m.id); } },
            MM.el('div', { class: 'big' }, m.emoji || '🎮'),
            MM.el('div', { class: 'name' }, m.name),
            m.sub ? MM.el('div', { class: 'sub' }, m.sub) : null
          ))
        )
      );
      mount.appendChild(wrap);
    }
    MM.toMenu = renderModes;
    renderModes();
  };

  window.MM = MM;
})();
