document.addEventListener('DOMContentLoaded', () => {
  history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const loader = document.getElementById('loader');
  if (!loader) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    loader.style.visibility = 'hidden';
    loader.style.display = 'none';
    document.body.removeAttribute('aria-busy');
    document.body.classList.remove('is-loading');
    showHero();
    return;
  }

  document.body.style.overflow = 'hidden';

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(loader, {
        visibility: 'hidden',
        display: 'none',
        pointerEvents: 'none'
      });
      loader.style.willChange = 'auto';
      document.getElementById('loaderWord').style.willChange = 'auto';
      document.body.style.overflow = '';
      document.body.removeAttribute('aria-busy');
      document.body.classList.remove('is-loading');
      showHero();
    }
  });

  tl.to('.lc', {
    opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out'
  })
  .to('.lw', {
    opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out'
  }, '-=0.35')
  .to('.loader-bar-fill', {
    width: '35%', duration: 0.6, ease: 'power1.inOut'
  }, '-=0.6')
  .to({}, { duration: 0.6 })
  .to('.lw', {
    opacity: 0, y: -15, scale: 0.5, duration: 0.35, stagger: 0.04, ease: 'power2.in'
  })
  .set('.lw', { display: 'none' })
  .fromTo('.lv', {
    opacity: 0, y: 15
  }, {
    opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out'
  })
  .to('.loader-bar-fill', {
    width: '70%', duration: 0.4, ease: 'power1.inOut'
  }, '-=0.4')
  .to({}, { duration: 0.4 })
  .to('#loaderWord', {
    rotation: 90, scale: 2.5, duration: 0.7, ease: 'power2.inOut'
  })
  .to('.loader-bar-fill', {
    width: '100%', duration: 0.5, ease: 'power2.inOut'
  }, '-=0.5')
  .to('#loader', {
    borderBottomLeftRadius: '50px',
    borderBottomRightRadius: '50px',
    duration: 0.3,
    ease: 'power2.inOut'
  })
  .to('#loader', {
    yPercent: -100, duration: 0.7, ease: 'power3.inOut'
  }, '-=0.1');

});

gsap.registerPlugin(ScrollTrigger);

const suffixes = ['ev', 'iinda', 'iiaaana', 'jhons', 'ustria', 'spesodejdu', 'a', 'jigirinch', 'igidon'];
let suffixIndex = 0;
let cycling = false;
let menuOpen = false;
let menuTl = null;

function showHero() {
  const header = document.getElementById('header');

  gsap.set(header, { y: -80, opacity: 0 });
  gsap.set('.hero-pre', { opacity: 0, y: 10 });
  gsap.set('.hero-line', { opacity: 0, y: '100%' });
  gsap.set('.hero-desc', { opacity: 0, y: 20 });
  gsap.set('.hero .btn-primary', { opacity: 0, y: 20 });

  const heroTl = gsap.timeline({ delay: 0.2 });

  heroTl.fromTo(header, {
    y: -80, opacity: 0
  }, {
    y: 0, opacity: 1, duration: 0.6, ease: 'power3.out'
  })
  .to('.hero-pre', {
    opacity: 1, y: 0, duration: 0.5, ease: 'power3.out'
  }, '-=0.3')
  .to('.hero-line', {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out'
  }, '-=0.3')
  .to('.hero-desc', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
  }, '-=0.5')
  .to('.hero .btn-primary', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
  }, '-=0.4')
  .call(() => {
    cycling = true;
    cycleSuffix();
  }, null, '+=2');

  initBurger();
  initHeaderScroll();
  initAmbient();
  initWork();
  initAbout();
  initServices();
  initProcess();
  initCta();
}

function initAbout() {
  gsap.fromTo('.about-line', {
    opacity: 0, y: 60
  }, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.about', start: 'top 75%' }
  });

  gsap.fromTo('.about-stat', {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }
  });
}

function initAmbient() {
  gsap.utils.toArray('.hero-orb').forEach((orb, i) => {
    gsap.to(orb, {
      x: gsap.utils.random(-60, 60),
      y: gsap.utils.random(-40, 40),
      duration: gsap.utils.random(18, 28),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 3
    });
  });
}

function cycleSuffix() {
  if (!cycling) return;

  const el = document.getElementById('heroPreSuffix');
  suffixIndex = (suffixIndex + 1) % suffixes.length;

  const tl = gsap.timeline({
    onComplete: () => {
      if (cycling) {
        gsap.delayedCall(1.8, cycleSuffix);
      }
    }
  });

  tl.to(el, {
    opacity: 0, duration: 0.2, ease: 'power2.in'
  })
  .call(() => { el.textContent = suffixes[suffixIndex]; })
  .to(el, {
    opacity: 1, duration: 0.25, ease: 'power3.out'
  });
}

function initBurger() {
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('menuOverlay');
  const leftPanel = overlay.querySelector('.menu-panel-left');
  const rightPanel = overlay.querySelector('.menu-panel-right');
  const links = overlay.querySelectorAll('.menu-link');
  const linkLabels = overlay.querySelectorAll('.menu-link-label');
  const linkTexts = overlay.querySelectorAll('.menu-link-text');
  const socialsLabel = overlay.querySelector('.menu-socials-label');
  const socialLinks = overlay.querySelectorAll('.menu-social-link');
  const footer = overlay.querySelector('.menu-footer');

  gsap.set(leftPanel, { xPercent: -100 });
  gsap.set(rightPanel, { xPercent: 100 });
  gsap.set(linkLabels, { opacity: 0, y: 10 });
  gsap.set(linkTexts, { opacity: 0, y: 30 });
  gsap.set(socialsLabel, { opacity: 0, y: 10 });
  gsap.set(socialLinks, { opacity: 0, y: 15 });
  gsap.set(footer, { opacity: 0, y: 10 });

  menuTl = gsap.timeline({ paused: true });

  menuTl
    .set(overlay, { visibility: 'visible' })
    .to(leftPanel, {
      xPercent: 0, duration: 0.7, ease: 'power3.inOut'
    }, 0)
    .to(rightPanel, {
      xPercent: 0, duration: 0.7, ease: 'power3.inOut'
    }, 0)
    .fromTo(linkLabels, {
      opacity: 0, y: 10
    }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out'
    }, '-=0.4')
    .fromTo(linkTexts, {
      opacity: 0, y: 30
    }, {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out'
    }, '-=0.5')
    .fromTo(socialsLabel, {
      opacity: 0, y: 10
    }, {
      opacity: 1, y: 0, duration: 0.4, ease: 'power3.out'
    }, '-=0.4')
    .fromTo(socialLinks, {
      opacity: 0, y: 15
    }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out'
    }, '-=0.3')
    .fromTo(footer, {
      opacity: 0, y: 10
    }, {
      opacity: 1, y: 0, duration: 0.4, ease: 'power3.out'
    }, '-=0.2');

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    burger.classList.toggle('active', menuOpen);
    burger.setAttribute('aria-expanded', menuOpen);
    document.body.classList.toggle('menu-open', menuOpen);

    if (menuOpen) {
      menuTl.play();
    } else {
      menuTl.reverse();
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      menuTl.reverse();
    });
  });
}

function initWork() {
  gsap.fromTo('.work-title', {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.work', start: 'top 80%' }
  });

  gsap.fromTo('.work-card', {
    opacity: 0, y: 60, scale: 0.95
  }, {
    opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '.work-bento', start: 'top 80%' }
  });

  initTilt();
}

function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    });
  });
}

function initServices() {
  const track = document.querySelector('.services-track');
  const wrapper = document.querySelector('.services-track-wrapper');
  if (!track || !wrapper) return;

  gsap.fromTo('.services-label', {
    opacity: 0, y: 20
  }, {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.services', start: 'top 80%' }
  });

  gsap.fromTo('.services-line', {
    opacity: 0, y: 30
  }, {
    opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.services', start: 'top 75%' }
  });

  const mm = gsap.matchMedia();

  mm.add('(min-width: 769px)', () => {
    const inner = document.querySelector('.services-inner');
    if (!inner) return;

    const getScrollAmount = () => {
      return -(inner.scrollWidth - window.innerWidth);
    };

    gsap.to(inner, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: '.services',
        start: 'top top',
        end: () => '+=' + Math.abs(getScrollAmount()),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  });
}

function initProcess() {
  gsap.fromTo('.process-label', {
    opacity: 0, y: 20
  }, {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.process', start: 'top 80%' }
  });

  gsap.fromTo('.process-title', {
    opacity: 0, y: 30
  }, {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.process', start: 'top 75%' },
    delay: 0.1
  });

  gsap.fromTo('.process-step', {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.process-track', start: 'top 80%' }
  });
}

function initCta() {
  gsap.fromTo('.cta-label', {
    opacity: 0, y: 20
  }, {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta', start: 'top 80%' }
  });

  gsap.fromTo('.cta-line', {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta', start: 'top 75%' }
  });

  gsap.fromTo('.cta-desc', {
    opacity: 0, y: 20
  }, {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta', start: 'top 70%' },
    delay: 0.2
  });

  gsap.fromTo('.cta-btn', {
    opacity: 0, y: 20
  }, {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.cta', start: 'top 65%' },
    delay: 0.3
  });

  gsap.fromTo('.footer-card', {
    opacity: 0, y: 60
  }, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer', start: 'top 85%' }
  });

  gsap.fromTo('.footer-links-col', {
    opacity: 0, y: 20
  }, {
    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.footer-main', start: 'top 85%' }
  });
}

function initHeaderScroll() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    if (menuOpen) return;
    const current = window.scrollY;
    if (current > lastScroll && current > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    lastScroll = current;
  }, { passive: true });
}
