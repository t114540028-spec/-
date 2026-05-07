/* =============================================
   script.js — Capoo Creative Theme
   ============================================= */

'use strict';

// ─── Navbar: shrink on scroll ─────────────────────────────────────────────────
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
});

// ─── Mobile nav toggle ────────────────────────────────────────────────────────
const navToggler = document.getElementById('navToggler');
const navLinks   = document.getElementById('navLinks');

if (navToggler && navLinks) {
  navToggler.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ─── Smooth scroll for nav links ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Intersection Observer: reveal service items ──────────────────────────────
const revealTargets = document.querySelectorAll('.service-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// ─── SimpleLightbox: portfolio gallery ───────────────────────────────────────
if (typeof SimpleLightbox !== 'undefined') {
  new SimpleLightbox('.portfolio-box', {
    captionSelector: '.portfolio-name',
    captionsData:    'title',
    captionDelay:    250,
  });
}

// ─── Contact form: basic submit handler ──────────────────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    btn.textContent = '✅ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #43e97b, #38f9d7)';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Send Message 💙';
      btn.style.background = '';
      btn.disabled = false;
      this.reset();
    }, 3000);
  });
}

// ─── Page title scroll spy ────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id], div[id]');
const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id) {
      const id = entry.target.id;
      const name = id.charAt(0).toUpperCase() + id.slice(1);
      document.title = `🐛 Capoo's Website | ${name}`;
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => scrollSpy.observe(s));

// ─── Console greeting ─────────────────────────────────────────────────────────
console.log('%c🐛 Capoo\'s Awesome Website', 'font-size:1.4rem; font-weight:bold; color:#9b5de5;');
console.log('%cBuilt with 💙 HTML, CSS & JavaScript — Kawaii mode ON!', 'color:#f15bb5; font-size:1rem;');
