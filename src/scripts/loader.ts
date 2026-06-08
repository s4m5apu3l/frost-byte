import { gsap } from 'gsap';

const isHome = () => {
  const path = window.location.pathname;
  return path === '/' || path === '/index.html';
};

let initialized = false;
let onReady: (() => void) | null = null;

function runHeroLoader(done: () => void) {
  const loader = document.getElementById('heroLoader');
  if (!loader) return done();

  gsap.set(loader, { autoAlpha: 1 });

  const tl = gsap.timeline({ onComplete: done });
  tl.to('.lc', { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' })
    .to('.lw', { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.35')
    .to('.loader-bar-fill', { width: '35%', duration: 0.6, ease: 'power1.inOut' }, '-=0.6')
    .to({}, { duration: 0.6 })
    .to('.lw', { opacity: 0, y: -15, scale: 0.5, duration: 0.35, stagger: 0.04, ease: 'power2.in' })
    .set('.lw', { display: 'none' })
    .set('.lv', { display: 'inline-block' })
    .fromTo('.lv', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(1.4)' })
    .to('.loader-bar-fill', { width: '70%', duration: 0.4, ease: 'power1.inOut' }, '-=0.4')
    .to({}, { duration: 0.4 })
    .to('#loaderWord', { rotation: 90, scale: 2.5, duration: 0.7, ease: 'power2.inOut' })
    .to('.loader-bar-fill', { width: '100%', duration: 0.5, ease: 'power2.inOut' }, '-=0.5')
    .to('#heroLoader', { borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px', duration: 0.3, ease: 'power2.inOut' })
    .to('#heroLoader', { yPercent: -100, duration: 0.7, ease: 'power3.inOut' }, '-=0.1');
}

function showContent() {
  document.documentElement.classList.remove('skip-loader');
  document.body.classList.remove('is-loading');
  document.body.removeAttribute('aria-busy');
  document.body.style.overflow = '';
  onReady?.();
}

export function initLoader(callback: () => void) {
  if (initialized) return;
  initialized = true;
  onReady = callback;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showContent();
    return;
  }

  if (isHome()) {
    runHeroLoader(showContent);
  } else {
    showContent();
  }
}

export function initTransitionHandlers() {
  const bar = document.getElementById('routeBar');

  document.addEventListener('astro:before-preparation', () => {
    document.body.classList.add('is-loading');
    document.body.setAttribute('aria-busy', 'true');
    if (bar) {
      gsap.set(bar, { scaleX: 0, opacity: 1 });
      gsap.to(bar, { scaleX: 0.6, duration: 0.8, ease: 'power2.out' });
    }
  });

  document.addEventListener('astro:page-load', () => {
    if (bar) {
      gsap.to(bar, {
        scaleX: 1,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          gsap.to(bar, { opacity: 0, duration: 0.3, onComplete: () => gsap.set(bar, { scaleX: 0 }) });
        },
      });
    }
    document.body.classList.remove('is-loading');
    document.body.removeAttribute('aria-busy');
    document.body.style.overflow = '';
  });
}
