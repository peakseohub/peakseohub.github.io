document.addEventListener('DOMContentLoaded', () => {
  console.info('PeakSEOHub v4 LUX loaded');
  setTimeout(() => {
    document.body.classList.remove('preload');
    const shimmer = document.getElementById('shimmer');
    if (shimmer) shimmer.style.display = 'none';
  }, 900);
  const floating = document.querySelector('.floating-cta');
  if (floating) floating.classList.add('pulse');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        closeMobileNav();
      }
    });
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.fade-in-up').forEach(el => io.observe(el));
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroBg) {
      heroBg.style.transform = `translateY(${Math.min(scrolled * -0.06, 0)}px) scale(${1 + Math.min(scrolled / 3000, 0.02)})`;
    }
  }, {passive: true});
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if (navLinks) navLinks.style.display = expanded ? '' : 'flex';
    });
  }
  function closeMobileNav() {
    if (window.innerWidth <= 680 && navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      if (navLinks) navLinks.style.display = 'none';
    }
  }
  const form = document.getElementById('contact-form');
  const msgBox = document.getElementById('form-msg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msgBox.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        msgBox.textContent = 'Please complete your name, email and a brief message.';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        msgBox.textContent = 'Please enter a valid email address.';
        return;
      }
      msgBox.textContent = 'Sending...';
      fetch(form.action, {
        method: form.method,
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(response => {
        if (response.ok) {
          msgBox.textContent = 'Thanks! Your request has been received — we will reply within 48 hours.';
          form.reset();
        } else {
          response.json().then(data => {
            msgBox.textContent = data.error || 'Submission failed. Please try again later.';
          }).catch(() => {
            msgBox.textContent = 'Submission failed. Please try again later.';
          });
        }
      }).catch(() => {
        msgBox.textContent = 'Network error. Please try again later.';
      });
    });
  }
});
