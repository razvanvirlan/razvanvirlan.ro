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
      const business = form.querySelector('#business')?.value.trim() || '';

      const whatsappText = `Salut Razvan, sunt ${name}.${phone ? `\nTelefon: ${phone}` : ''}${business ? `\nAfacere: ${business}` : ''}\n\nAm nevoie de un website profesional.`;
      const whatsappUrl = `https://wa.me/40746614443?text=${encodeURIComponent(whatsappText)}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  // --- Sticky Mobile CTA ---
  const stickyCta = document.getElementById('sticky-cta');
  const heroSection = document.getElementById('hero');
  const contactSection = document.getElementById('contact');

  if (stickyCta && heroSection) {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === heroSection) {
          // Show sticky CTA when hero is NOT visible
          if (!entry.isIntersecting) {
            stickyCta.classList.add('visible');
          } else {
            stickyCta.classList.remove('visible');
          }
        }
      });
    }, { threshold: 0.1 });

    stickyObserver.observe(heroSection);

    // Hide sticky CTA when contact section is visible
    if (contactSection) {
      const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            stickyCta.classList.remove('visible');
          }
        });
      }, { threshold: 0.2 });

      contactObserver.observe(contactSection);
    }
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
