/* ═══════════════════════════════════════════════════
   WEDDING INVITATION — MAIN JAVASCRIPT
   KalaiPixels Photography
═══════════════════════════════════════════════════ */

/* ─── STAR GENERATORS ─── */
function generateStars(containerId, count, maxSize = 3, randomTwinkle = true) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * maxSize + 0.5;
    const opacity = Math.random() * 0.7 + 0.2;
    star.className = 'hero-star';
    star.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: #ffffff;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: ${opacity};
      ${randomTwinkle ? `animation: twinkle ${2 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 3}s;` : ''}
    `;
    container.appendChild(star);
  }
}

/* ─── LANDING STARS ─── */
function generateLandingStars() {
  const container = document.getElementById('landingStars');
  if (!container) return;
  for (let i = 0; i < 180; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2.5 + 0.3;
    const baseOpacity = Math.random() * 0.7 + 0.2;
    star.className = 'landing-star';
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --base-opacity: ${baseOpacity};
      --dur: ${2 + Math.random() * 5}s;
      --delay: ${Math.random() * 4}s;
    `;
    container.appendChild(star);
  }
}

/* ─── LANDING PETALS ─── */
function generatePetals() {
  const container = document.getElementById('landingPetals');
  if (!container) return;
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.cssText = `
      left: ${Math.random() * 100}%;
      --fall-dur: ${6 + Math.random() * 8}s;
      --fall-delay: ${Math.random() * 8}s;
      width: ${6 + Math.random() * 8}px;
      height: ${8 + Math.random() * 10}px;
      transform: rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(petal);
  }
}

/* ─── OPEN INVITATION BUTTON ─── */
document.getElementById('openInvitationBtn').addEventListener('click', function () {
  const landing = document.getElementById('landing-page');
  const main = document.getElementById('main-website');

  landing.classList.add('fade-out');

  setTimeout(() => {
    landing.style.display = 'none';
    main.classList.remove('hidden');
    document.body.style.overflow = 'auto';

    // Init everything after reveal
    initScrollProgress();
    initFloatingLamps();
    initIntersectionObserver();
    initParallax();
    generateStars('heroStars', 160, 2.5);
    generateStars('countdownStars', 100, 2);
    generateStars('footerStars', 80, 2);
    initCountdown();
    window.scrollTo(0, 0);
  }, 850);
});

/* ─── SCROLL PROGRESS ─── */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ─── FLOATING DEEPAM LAMPS ─── */
function initFloatingLamps() {
  const lamps = document.querySelectorAll('.lamp');
  let lastScrollY = 0;

  const updateLamps = () => {
    const scrollY = window.scrollY;
    const maxScroll = 600;
    const progress = Math.min(scrollY / maxScroll, 1);
    // Descend from -100px to 10px as user scrolls
    const y = -100 + progress * 110;

    lamps.forEach((lamp, i) => {
      lamp.style.transform = `translateY(${y}px)`;
      lamp.style.setProperty('--lamp-y', `translateY(${y}px)`);
      lamp.style.opacity = progress > 0.05 ? Math.min(progress * 2, 0.85) : 0;
    });

    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', updateLamps, { passive: true });
  updateLamps();
}

/* ─── INTERSECTION OBSERVER (reveal animations) ─── */
function initIntersectionObserver() {
  const items = document.querySelectorAll('.reveal-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  items.forEach(item => observer.observe(item));
}

/* ─── PARALLAX TEMPLE ─── */
function initParallax() {
  const temple = document.getElementById('templeSVG');
  const heroContent = document.getElementById('heroContent');

  if (!temple || !heroContent) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = document.getElementById('hero').offsetHeight;
    if (scrollY < heroHeight) {
      const pct = scrollY / heroHeight;
      temple.style.transform = `translateY(${scrollY * 0.25}px)`;
      heroContent.style.opacity = 1 - pct * 1.6;
      heroContent.style.transform = `translateY(${-scrollY * 0.15}px)`;
    }
  }, { passive: true });
}

/* ─── COUNTDOWN ─── */
function initCountdown() {
  const weddingDate = new Date('2025-07-25T08:30:00+05:30');

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('cdDays').textContent = '00';
      document.getElementById('cdHours').textContent = '00';
      document.getElementById('cdMins').textContent = '00';
      document.getElementById('cdSecs').textContent = '00';
      return;
    }

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cdDays').textContent  = String(days).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cdMins').textContent  = String(mins).padStart(2, '0');
    document.getElementById('cdSecs').textContent  = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ─── MUSIC TOGGLE ─── */
const musicToggle = document.getElementById('musicToggle');
const musicIcon   = document.getElementById('musicIcon');
const bgMusic     = document.getElementById('bgMusic');
let musicPlaying  = false;

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
      bgMusic.pause();
      musicIcon.textContent = '♪';
      musicToggle.style.background = 'rgba(10,3,8,0.8)';
      musicPlaying = false;
    } else {
      bgMusic.volume = 0.3;
      bgMusic.play().catch(() => {});
      musicIcon.textContent = '♫';
      musicToggle.style.background = 'rgba(139,0,0,0.7)';
      musicPlaying = true;
    }
  });
}

/* ─── INIT LANDING ─── */
(function initLanding() {
  generateLandingStars();
  generatePetals();
  document.body.style.overflow = 'hidden'; // lock scroll on landing
})();

/* ─── SMOOTH SCROLL for internal links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── TWINKLING STAR KEYFRAME (injected dynamically) ─── */
(function injectTwinkle() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: var(--base-opacity, 0.6); transform: scale(1); }
      50%       { opacity: 0.08; transform: scale(0.6); }
    }
  `;
  document.head.appendChild(style);
})();
