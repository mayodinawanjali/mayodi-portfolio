// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================================
// TYPING EFFECT (hero headline)
// ============================================
const typedEl = document.getElementById('typed');
const words = ['code', 'design', 'and problem-solving', 'future.']; // Edit these words
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = words[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = current.substring(0, charIndex);

  let delay = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === current.length) {
    delay = 1400; // pause at full word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 300;
  }

  setTimeout(typeLoop, delay);
}

// Respect reduced-motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  typedEl.textContent = words[0];
} else {
  typeLoop();
}

// ============================================
// SCROLL SPY — highlight active nav link
// ============================================
const sections = document.querySelectorAll('main section[id]');
const navLinkEls = document.querySelectorAll('.nav__link');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle(
          'is-active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => spyObserver.observe(section));

// ============================================
// FADE-IN ON SCROLL
// ============================================
const revealTargets = document.querySelectorAll(
  '.about__grid, .timeline__item, .skill-card, .project-card, .contact__link'
);

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============================================
// FOOTER YEAR
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();
