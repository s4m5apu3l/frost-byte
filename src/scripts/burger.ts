import { gsap } from 'gsap';

let menuOpen = false;
let menuTl: gsap.core.Timeline | null = null;
let active = false;

function closeMenu(burger: HTMLElement) {
  menuOpen = false;
  burger.classList.remove('active');
  burger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  menuTl?.reverse();
}

function buildMenuTimeline(overlay: HTMLElement) {
  const isDesktop = window.matchMedia('(min-width: 769px)').matches;
  const leftPanel = overlay.querySelector<HTMLElement>('.menu-panel-left');
  const rightPanel = overlay.querySelector<HTMLElement>('.menu-panel-right');
  const links = overlay.querySelectorAll<HTMLElement>('.menu-link');
  const socialsLabel = overlay.querySelector<HTMLElement>('.menu-socials-label');
  const socialLinks = overlay.querySelectorAll<HTMLElement>('.menu-social-link');
  const footer = overlay.querySelector<HTMLElement>('.menu-footer');

  const tl = gsap.timeline({ paused: true });

  if (isDesktop) {
    if (leftPanel) gsap.set(leftPanel, { xPercent: -100 });
    if (rightPanel) gsap.set(rightPanel, { xPercent: 100 });
    tl.set(overlay, { visibility: 'visible' })
      .to(leftPanel!, { xPercent: 0, duration: 0.7, ease: 'power3.inOut' }, 0)
      .to(rightPanel!, { xPercent: 0, duration: 0.7, ease: 'power3.inOut' }, 0)
      .fromTo(
        links,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.4'
      );
    if (socialsLabel) {
      tl.fromTo(socialsLabel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.4');
    }
    if (socialLinks.length) {
      tl.fromTo(socialLinks, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out' }, '-=0.3');
    }
    if (footer) {
      tl.fromTo(footer, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2');
    }
  } else {
    if (rightPanel) gsap.set(rightPanel, { xPercent: 100 });
    gsap.set(links, { opacity: 0, y: 30 });
    tl.set(overlay, { visibility: 'visible' })
      .to(rightPanel!, { xPercent: 0, duration: 0.6, ease: 'power3.inOut' })
      .fromTo(
        links,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      );
    if (footer) {
      gsap.set(footer, { opacity: 0, y: 10 });
      tl.fromTo(footer, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2');
    }
  }

  return tl;
}

export function initBurger() {
  const burger = document.getElementById('burger');
  const overlay = document.getElementById('menuOverlay');
  if (!burger || !overlay) return;

  if (active) return;
  active = true;

  const links = overlay.querySelectorAll('.menu-link');
  const mm = gsap.matchMedia();

  mm.add('(min-width: 769px)', () => {
    menuTl = buildMenuTimeline(overlay);
    return () => {
      menuTl?.kill();
      menuTl = null;
    };
  });

  mm.add('(max-width: 768px)', () => {
    menuTl = buildMenuTimeline(overlay);
    return () => {
      menuTl?.kill();
      menuTl = null;
    };
  });

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    burger.classList.toggle('active', menuOpen);
    burger.setAttribute('aria-expanded', String(menuOpen));
    document.body.classList.toggle('menu-open', menuOpen);
    if (menuOpen) menuTl?.play();
    else menuTl?.reverse();
  });

  links.forEach((link) => {
    link.addEventListener('click', () => closeMenu(burger));
  });
}
