/* ============================================================
   NAVIGATION — Sticky shadow & hamburger menu
   ============================================================ */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');
const darkToggle = document.getElementById('darkToggle');

// Sticky navbar shadow on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a nav link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ============================================================
   CASE TOGGLE — Expand / collapse case analysis sections
   ============================================================ */
function toggleCase(id) {
  const body   = document.getElementById(id);
  const icon   = document.getElementById('icon-' + id);
  const header = body ? body.previousElementSibling : null;

  if (!body) return;

  const isOpen = body.classList.contains('open');

  if (isOpen) {
    body.classList.remove('open');
    if (icon)   icon.classList.remove('open');
    if (header) header.setAttribute('aria-expanded', 'false');
  } else {
    body.classList.add('open');
    if (icon)   icon.classList.add('open');
    if (header) header.setAttribute('aria-expanded', 'true');
  }
}

// Keyboard accessibility for case headers
document.querySelectorAll('.case-header').forEach(header => {
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      header.click();
    }
  });
});

/* ============================================================
   DARK MODE TOGGLE
   ============================================================ */
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function initDarkMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true' || (saved === null && prefersDark.matches)) {
    document.body.classList.add('dark');
    darkToggle.textContent = 'Light';
  } else {
    document.body.classList.remove('dark');
    darkToggle.textContent = 'Dark';
  }
}

darkToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  darkToggle.textContent = isDark ? 'Light' : 'Dark';
  localStorage.setItem('darkMode', isDark);
});

initDarkMode();

/* ============================================================
   FADE-IN ANIMATIONS — Intersection Observer
   ============================================================ */
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));
