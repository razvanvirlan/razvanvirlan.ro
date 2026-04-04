/* ============================================
   razvanvirlan.ro — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // --- Sticky Navbar ---
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile Menu ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active', isOpen);
    menuBtn.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) toggleMenu();
  }));

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Counter Animation ---
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '+';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(eased * target);
      el.textContent = current + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // --- FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          other.querySelector('.faq__answer').style.maxHeight = '0';
        }
      });

      // Toggle current
      item.classList.toggle('active', !isOpen);
      answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
    });
  });

  // --- Contact Form → WhatsApp ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name').value.trim();
      const phone = form.querySelector('#phone').value.trim();
      const message = form.querySelector('#message').value.trim();

      const whatsappText = `Salut Razvan, sunt ${name}.${phone ? `\nTelefon: ${phone}` : ''}${message ? `\n\n${message}` : ''}`;
      const whatsappUrl = `https://wa.me/40746614443?text=${encodeURIComponent(whatsappText)}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--color-accent)'
            : '';
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
});
