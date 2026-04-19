/* ══════════════════════════════════════
   INVITATION PAGE JS
   Arjun & Meenakshi · 14 Feb 2026
══════════════════════════════════════ */

/* ── SCROLL PROGRESS BAR ── */
const scrollBar = document.getElementById('scroll-bar');
window.addEventListener('scroll', () => {
  const total  = document.documentElement.scrollHeight - window.innerHeight;
  const prog   = (window.scrollY / total) * 100;
  scrollBar.style.width = prog + '%';
}, { passive: true });


/* ── HERO CANVAS (stars + warm glow) ── */
const hCanvas = document.getElementById('hero-canvas');
const hCtx    = hCanvas.getContext('2d');
let hW, hH, hStars = [];

function resizeHero() {
  hW = hCanvas.width  = hCanvas.offsetWidth;
  hH = hCanvas.height = hCanvas.offsetHeight;
  buildHeroStars();
}

function buildHeroStars() {
  hStars = [];
  const n = Math.min(Math.floor(hW * hH / 1200), 220);
  for (let i = 0; i < n; i++) {
    hStars.push({
      x: Math.random() * hW,
      y: Math.random() * hH * .75,
      r: Math.random() * 1.2 + .2,
      phase: Math.random() * Math.PI * 2,
      speed: .004 + Math.random() * .008,
    });
  }
}

function drawHero(t) {
  hCtx.clearRect(0, 0, hW, hH);

  // Gradient sky
  const sky = hCtx.createLinearGradient(0, 0, 0, hH);
  sky.addColorStop(0,   '#050302');
  sky.addColorStop(.35, '#0d0804');
  sky.addColorStop(.65, '#1a0e05');
  sky.addColorStop(.85, '#2a1505');
  sky.addColorStop(1,   '#3d1f08');
  hCtx.fillStyle = sky;
  hCtx.fillRect(0, 0, hW, hH);

  // Warm horizon glow
  const hor = hCtx.createRadialGradient(hW*.5, hH, 0, hW*.5, hH, hH*.55);
  hor.addColorStop(0,  'rgba(201,148,58,.18)');
  hor.addColorStop(.5, 'rgba(139,30,30,.07)');
  hor.addColorStop(1,  'transparent');
  hCtx.fillStyle = hor;
  hCtx.fillRect(0, 0, hW, hH);

  // Stars
  hStars.forEach(s => {
    const a = .3 + .7 * (.5 + .5 * Math.sin(t * s.speed * 60 + s.phase));
    hCtx.beginPath();
    hCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    hCtx.fillStyle = `rgba(255,245,210,${a})`;
    hCtx.fill();
  });
}

const heroObs = new ResizeObserver(resizeHero);
heroObs.observe(hCanvas);
resizeHero();

let heroT = 0;
function heroLoop(ts) {
  heroT = ts / 1000;
  drawHero(heroT);
  requestAnimationFrame(heroLoop);
}
requestAnimationFrame(heroLoop);


/* ── PARALLAX on hero text + temple ── */
const heroText      = document.getElementById('hero-text');
const templePrllx   = document.getElementById('temple-parallax');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroText.style.transform    = `translateY(${y * .25}px)`;
    heroText.style.opacity      = 1 - (y / window.innerHeight) * 1.4;
    templePrllx.style.transform = `translateY(${y * .12}px)`;
  }
}, { passive: true });


/* ── FLOATING DEEPAM LAMPS (scroll-triggered) ── */
const lampContainer = document.getElementById('lamp-container');
let lastLampScroll = 0;

function makeLampSVG() {
  return `<svg width="36" height="60" viewBox="0 0 36 60" xmlns="http://www.w3.org/2000/svg">
    <!-- Base -->
    <rect x="14" y="40" width="8"  height="18" fill="#6b3f10"/>
    <ellipse cx="18" cy="58" rx="10" ry="4" fill="#4a2810"/>
    <!-- Bowl -->
    <ellipse cx="18" cy="40" rx="13" ry="5"  fill="#8b5e1a"/>
    <ellipse cx="18" cy="36" rx="11" ry="7"  fill="#a07020"/>
    <ellipse cx="18" cy="33" rx="9"  ry="5"  fill="#c9943a"/>
    <!-- Wick -->
    <rect x="17" y="25" width="2" height="9" fill="#3d1f08" opacity=".7"/>
    <!-- Flame -->
    <ellipse cx="18" cy="21" rx="4" ry="7"  fill="#e8c46a" style="animation:flameFlic 1.2s ease-in-out infinite"/>
    <ellipse cx="18" cy="18" rx="2" ry="4"  fill="#fffde0" style="animation:flameFlic 1.2s .2s ease-in-out infinite"/>
    <!-- Glow -->
    <circle  cx="18" cy="21" r="10"          fill="#c9943a" opacity=".12"/>
  </svg>`;
}

window.addEventListener('scroll', () => {
  const now = window.scrollY;
  if (now - lastLampScroll > 160 && now > 200) {
    lastLampScroll = now;
    spawnLamp();
  }
}, { passive: true });

function spawnLamp() {
  if (Math.random() > .45) return; // random sparse appearance
  const lamp = document.createElement('div');
  lamp.className = 'float-lamp';
  lamp.innerHTML = makeLampSVG();

  const x = 5 + Math.random() * 90;
  const dur  = 6 + Math.random() * 8;
  const sway = 1.5 + Math.random() * 2;

  lamp.style.cssText = `
    left: ${x}%;
    top: -80px;
    animation: lampDescend ${dur}s linear forwards,
               lampSway    ${sway}s ease-in-out infinite;
  `;
  lampContainer.appendChild(lamp);
  setTimeout(() => lamp.remove(), (dur + 2) * 1000);
}


/* ── COUNTDOWN ── */
const weddingDate = new Date('2026-02-14T07:00:00');

function updateCountdown() {
  const diff = weddingDate - Date.now();
  if (diff <= 0) {
    ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }
  const d  = Math.floor(diff / 86400000);
  const h  = Math.floor((diff % 86400000) / 3600000);
  const m  = Math.floor((diff % 3600000)  / 60000);
  const s  = Math.floor((diff % 60000)    / 1000);

  document.getElementById('cd-days') .textContent = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins') .textContent = String(m).padStart(2,'0');
  document.getElementById('cd-secs') .textContent = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);


/* ── COUNTDOWN STAR CANVAS ── */
const cCanvas = document.getElementById('count-canvas');
const cCtx    = cCanvas.getContext('2d');
let cW, cH, cStars = [];

function resizeCount() {
  cW = cCanvas.width  = cCanvas.offsetWidth;
  cH = cCanvas.height = cCanvas.offsetHeight;
  cStars = [];
  const n = Math.min(Math.floor(cW * cH / 1400), 140);
  for (let i = 0; i < n; i++) {
    cStars.push({
      x: Math.random() * cW,
      y: Math.random() * cH,
      r: Math.random() * 1 + .2,
      phase: Math.random() * Math.PI * 2,
    });
  }
}
const cObs = new ResizeObserver(resizeCount);
cObs.observe(cCanvas);
resizeCount();

function drawCount(t) {
  cCtx.clearRect(0, 0, cW, cH);
  cCtx.fillStyle = '#1a0e05';
  cCtx.fillRect(0, 0, cW, cH);
  cStars.forEach(s => {
    const a = .2 + .6 * (.5 + .5 * Math.sin(t * .5 + s.phase));
    cCtx.beginPath();
    cCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    cCtx.fillStyle = `rgba(255,240,200,${a})`;
    cCtx.fill();
  });
}
function countLoop(ts) {
  drawCount(ts / 1000);
  requestAnimationFrame(countLoop);
}
requestAnimationFrame(countLoop);


/* ── INTERSECTION OBSERVER REVEALS ── */
const revealItems = document.querySelectorAll('.reveal-item');
const revealObs   = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      // Stagger siblings
      const siblings = Array.from(e.target.closest('.section-inner, section')
        ?.querySelectorAll('.reveal-item') || [e.target]);
      const idx = siblings.indexOf(e.target);
      setTimeout(() => {
        e.target.classList.add('visible');
      }, idx * 120);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(el => revealObs.observe(el));


/* ── MUSIC TOGGLE ── */
const bgMusic    = document.getElementById('bg-music');
const iconOn     = document.getElementById('music-icon-on');
const iconOff    = document.getElementById('music-icon-off');
let   musicPlaying = false;

window.toggleMusic = function () {
  if (!musicPlaying) {
    bgMusic.volume = .35;
    bgMusic.play().then(() => {
      musicPlaying = true;
      iconOn.style.display  = 'block';
      iconOff.style.display = 'none';
    }).catch(() => {
      // autoplay blocked — show feedback
      showMusicNote();
    });
  } else {
    bgMusic.pause();
    musicPlaying = false;
    iconOn.style.display  = 'none';
    iconOff.style.display = 'block';
  }
};

function showMusicNote() {
  const note = document.createElement('div');
  note.style.cssText = `
    position:fixed; bottom:5rem; right:1.5rem;
    background:rgba(13,8,4,.9); color:var(--gold,#c9943a);
    font-family:Cinzel,serif; font-size:.75rem;
    padding:.6rem 1rem; border:1px solid #c9943a;
    z-index:1000; border-radius:2px; letter-spacing:.08em;
    animation: fadeInOut 3s forwards;
  `;
  note.textContent = 'Tap to enable music ♫';
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}

// Start in muted state — show off icon
iconOn.style.display  = 'none';
iconOff.style.display = 'block';

// Try autoplay on first interaction
document.body.addEventListener('click', () => {
  if (!musicPlaying) {
    bgMusic.volume = .35;
    bgMusic.play().then(() => {
      musicPlaying = true;
      iconOn.style.display  = 'block';
      iconOff.style.display = 'none';
    }).catch(() => {});
  }
}, { once: true });
