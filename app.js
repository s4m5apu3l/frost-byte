document.addEventListener('DOMContentLoaded', () => {

  const loader = document.getElementById('loader');
  if (!loader) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    loader.style.visibility = 'hidden';
    loader.style.display = 'none';
    document.body.removeAttribute('aria-busy');
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

const suffixes = ['ev', 'iinda', 'iiaaana', 'jhons', 'ustria', 'spesodejdu', 'a', 'jigirinch', 'igidon'];
let suffixIndex = 0;
let cycling = false;
let menuOpen = false;
let menuTl = null;

function showHero() {
  const header = document.getElementById('header');
  const heroTl = gsap.timeline({ delay: 0.2 });

  heroTl.fromTo(header, {
    y: -80, opacity: 0
  }, {
    y: 0, opacity: 1, duration: 0.6, ease: 'power3.out'
  })
  .to('.hc', {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out'
  }, '-=0.4')
  .fromTo('#heroSuffix', {
    opacity: 0, yPercent: 100
  }, {
    opacity: 1, yPercent: 0, duration: 0.8, ease: 'power3.out'
  }, '-=0.5')
  .to('.hero-tag', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
  }, '-=0.3')
  .to('.hero .btn-primary', {
    opacity: 1, y: 0, duration: 0.6, ease: 'power3.out'
  }, '-=0.3')
  .call(() => {
    cycling = true;
    cycleSuffix();
  }, null, '+=2');

  initBurger();
  initHeaderScroll();
}

function cycleSuffix() {
  if (!cycling) return;

  const el = document.getElementById('heroSuffix');
  suffixIndex = (suffixIndex + 1) % suffixes.length;

  const tl = gsap.timeline({
    onComplete: () => {
      if (cycling) {
        gsap.delayedCall(1.8, cycleSuffix);
      }
    }
  });

  tl.to(el, {
    yPercent: -100, opacity: 0, duration: 0.3, ease: 'power2.in'
  })
  .call(() => { el.textContent = suffixes[suffixIndex]; })
  .set(el, { yPercent: 100 })
  .to(el, {
    yPercent: 0, opacity: 1, duration: 0.35, ease: 'power3.out'
  });
}

function initBurger() {
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('menuOverlay');
  const links = overlay.querySelectorAll('.menu-link');
  const socials = overlay.querySelectorAll('.menu-social');

  menuTl = gsap.timeline({ paused: true });

  menuTl.to(overlay, {
    visibility: 'visible', opacity: 1, duration: 0.4, ease: 'power2.inOut'
  })
  .fromTo(links, {
    opacity: 0, y: 40
  }, {
    opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out'
  }, '-=0.2')
  .fromTo(socials, {
    opacity: 0, y: 15
  }, {
    opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out'
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
