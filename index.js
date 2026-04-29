/* ============================================
   VAIBHAV MUKIR PORTFOLIO - MAIN JS
   ============================================ */

// ======================== LOADER ========================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Start hero animations after loader
    document.querySelectorAll('.animate-fade-up, .animate-fade-left').forEach(el => {
      el.style.animationPlayState = 'running';
    });
    // Start counters
    startCounters();
  }, 2200);
});

// ======================== PARTICLES ========================
function createParticles() {
  const container = document.getElementById('particles-container');
  const count = 35;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const duration = Math.random() * 15 + 10;
    const opacity = Math.random() * 0.3 + 0.1;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
      opacity: ${opacity};
    `;

    container.appendChild(particle);
  }
}

createParticles();

// ======================== NAVBAR SCROLL ========================
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }

  // Back to Top visibility
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Scroll reveal
  revealElements();

  // Skill bars
  animateBars();
});

// ======================== SMOOTH SCROLL NAV ========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile menu
      const navMenu = document.getElementById('navMenu');
      if (navMenu.classList.contains('show')) {
        new bootstrap.Collapse(navMenu).hide();
      }
    }
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ======================== SCROLL REVEAL ========================
function revealElements() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 80);
    }
  });
}

// Initial check
setTimeout(revealElements, 100);

// ======================== COUNTER ANIMATION ========================
function startCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = target > 100 ? 2000 : 1200;
    const start = performance.now();

    function update(timestamp) {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }

    requestAnimationFrame(update);
  });
}

// ======================== SKILL BARS ========================
let barsAnimated = false;

function animateBars() {
  if (barsAnimated) return;

  const barsSection = document.querySelector('.skill-bars-section');
  if (!barsSection) return;

  const rect = barsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    barsAnimated = true;
    document.querySelectorAll('.bar-fill').forEach((bar, i) => {
      const width = bar.getAttribute('data-width');
      setTimeout(() => {
        bar.style.width = width + '%';
        setTimeout(() => bar.classList.add('animated'), 1500);
      }, i * 150);
    });
  }
}

// ======================== CURSOR GLOW ========================
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 20px; height: 20px;
  background: radial-gradient(circle, rgba(201,168,76,0.6), transparent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: transform 0.05s ease;
  mix-blend-mode: screen;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ======================== BACK TO TOP ========================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ======================== FORM SUBMIT ========================
function handleFormSubmit() {
  const btn = document.querySelector('.contact-form-card .btn-gold');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #28c840, #4ade80)';
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
  }, 3000);
}

// ======================== HERO PARALLAX ========================
window.addEventListener('mousemove', (e) => {
  const heroCard = document.querySelector('.hero-avatar-card');
  if (!heroCard) return;

  const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
  heroCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// ======================== TYPING EFFECT ========================
function typeEffect(element, text, speed = 80) {
  let i = 0;
  element.textContent = '';
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

// ======================== SKILL CARD TILT ========================
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * 5;
    const rotY = ((x - centerX) / centerX) * 5;
    card.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ======================== GOLD RIPPLE ON CLICK ========================
document.addEventListener('click', (e) => {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    width: 0; height: 0;
    background: radial-gradient(circle, rgba(201,168,76,0.3), transparent);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: rippleEffect 0.6s ease-out forwards;
    pointer-events: none;
    z-index: 99998;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleEffect {
      to { width: 100px; height: 100px; opacity: 0; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ======================== CONSOLE BRANDING ========================
console.log(
  '%c VM Portfolio ',
  'background: linear-gradient(135deg, #0a1628, #1a3460); color: #c9a84c; font-size: 16px; font-weight: bold; padding: 10px 20px; border: 2px solid #c9a84c; border-radius: 6px;'
);
console.log('%c Built by Vaibhav Mukir | Java & Python Backend Developer', 'color: #8899bb; font-size: 12px;');