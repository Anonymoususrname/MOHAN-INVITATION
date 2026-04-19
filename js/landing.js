/* ══════════════════════════════════════
   LANDING PAGE JS
══════════════════════════════════════ */

// ── STAR CANVAS ──────────────────────
const canvas = document.getElementById('star-canvas');
const ctx    = canvas.getContext('2d');
let stars    = [];
let W, H;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.min(Math.floor(W * H / 900), 300);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + .3,
      a: Math.random(),
      speed: Math.random() * .008 + .003,
      phase: Math.random() * Math.PI * 2,
    });
  }
}

function drawStars(t) {
  ctx.clearRect(0, 0, W, H);

  // Deep sky gradient
  const grad = ctx.createRadialGradient(W*.5, H*.5, 0, W*.5, H*.5, Math.max(W,H)*.8);
  grad.addColorStop(0,   '#1a0e05');
  grad.addColorStop(.6,  '#0d0804');
  grad.addColorStop(1,   '#050302');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle vignette
  const vig = ctx.createRadialGradient(W*.5, H*.5, H*.2, W*.5, H*.5, H*.8);
  vig.addColorStop(0, 'transparent');
  vig.addColorStop(1, 'rgba(0,0,0,.55)');
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  stars.forEach(s => {
    const alpha = .35 + .65 * (.5 + .5 * Math.sin(t * s.speed * 60 + s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,245,210,${alpha})`;
    ctx.fill();
  });

  // Occasional golden shimmer
  if (Math.sin(t * .4) > .95) {
    const sx = stars[0].x, sy = stars[0].y;
    const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 60);
    g.addColorStop(0, 'rgba(201,148,58,.15)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.fillRect(sx - 60, sy - 60, 120, 120);
  }
}

let lastTime = 0;
function loop(ts) {
  const t = ts / 1000;
  drawStars(t);
  lastTime = t;
  requestAnimationFrame(loop);
}

resizeCanvas();
initStars();
requestAnimationFrame(loop);
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });


// ── PETALS ───────────────────────────
const petalColors = ['#c9943a','#e8c46a','#8b1a1a','#d4944a','#f0d090'];
const petalWrap   = document.getElementById('petals');

function createPetal() {
  const p = document.createElement('div');
  p.className = 'petal';
  const size = 8 + Math.random() * 10;
  p.style.cssText = `
    left: ${Math.random() * 100}%;
    width: ${size}px;
    height: ${size * 1.4}px;
    background: ${petalColors[Math.floor(Math.random() * petalColors.length)]};
    opacity: ${.3 + Math.random() * .5};
    animation-duration: ${5 + Math.random() * 8}s;
    animation-delay: ${-Math.random() * 8}s;
    border-radius: ${Math.random() > .5 ? '50% 0 50% 0' : '0 50% 0 50%'};
  `;
  petalWrap.appendChild(p);
  setTimeout(() => p.remove(), 15000);
}

setInterval(createPetal, 600);
for (let i = 0; i < 12; i++) createPetal();


// ── COUNTDOWN RING ───────────────────
const DURATION   = 6;  // seconds before auto-enter
const ringEl     = document.getElementById('ring-progress');
const numEl      = document.getElementById('ring-number');
const circumference = 2 * Math.PI * 44; // r=44

let timeLeft = DURATION;
ringEl.style.strokeDashoffset = '0';

const timer = setInterval(() => {
  timeLeft--;
  numEl.textContent = timeLeft;

  const progress = timeLeft / DURATION;
  ringEl.style.strokeDashoffset = (circumference * (1 - progress)).toString();

  if (timeLeft <= 0) {
    clearInterval(timer);
    enterSite();
  }
}, 1000);

// ── ENTER SITE ───────────────────────
window.enterSite = function () {
  clearInterval(timer);
  const screen = document.getElementById('landing-screen');
  screen.classList.add('fade-out');
  setTimeout(() => {
    screen.style.display = 'none';
    const mainSite = document.getElementById('main-site');
    mainSite.style.display = 'block';
    // Make iframe fill viewport properly
    const frame = document.getElementById('site-frame');
    frame.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    frame.onload = () => {
      document.body.style.overflow = 'auto';
      frame.style.height = '100%';
      document.documentElement.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, 900);
};
