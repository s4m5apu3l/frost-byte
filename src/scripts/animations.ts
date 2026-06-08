import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const suffixes = ['iinda', 'igidon', 'iiana djons', 'ustria spesodejdy', 'iebit baay da', 'igistan'];
let cycling = false;
let suffixIndex = 0;
let cycleTimeout: number | null = null;
let scrollTriggers: ScrollTrigger[] = [];

function cycleSuffix() {
  if (!cycling) return;
  const el = document.getElementById('heroPreSuffix');
  if (!el) { cycling = false; return; }
  suffixIndex = (suffixIndex + 1) % suffixes.length;
  const tl = gsap.timeline({
    onComplete: () => {
      if (cycling) cycleTimeout = window.setTimeout(cycleSuffix, 1800);
    },
  });
  tl.to(el, { opacity: 0, duration: 0.2, ease: 'power2.in' })
    .call(() => { el.textContent = suffixes[suffixIndex]; })
    .to(el, { opacity: 1, duration: 0.25, ease: 'power3.out' });
}

export function initHeroAnimations() {
  const header = document.getElementById('header');
  if (!header) return;

  if (cycleTimeout) clearTimeout(cycleTimeout);
  suffixIndex = 0;
  cycling = false;

  gsap.set(header, { y: -80, opacity: 0 });
  gsap.set('.hero-pre', { opacity: 0, y: 10 });
  gsap.set('.hero-line', { opacity: 0, y: '100%' });
  gsap.set('.hero-desc', { opacity: 0, y: 20 });
  gsap.set('.hero .btn-primary', { opacity: 0, y: 20 });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.fromTo(header, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    .to('.hero-pre', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    .to('.hero-line', { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, '-=0.3')
    .to('.hero-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
    .to('.hero .btn-primary', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
    .to('.hero-orb', { opacity: 1, duration: 2.5, stagger: 0.4, ease: 'power2.out' }, '-=0.4')
    .call(() => { cycling = true; cycleSuffix(); }, [], '+=0.5')
    .call(() => { gsap.set('.hero-line', { willChange: 'auto' }); });

  initHeaderScroll(header);
  initAmbient();
}

function initHeaderScroll(header: HTMLElement) {
  let lastScroll = 0;
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (document.body.classList.contains('menu-open') || ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        if (current > lastScroll && current > 100) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
        lastScroll = current;
        ticking = false;
      });
    },
    { passive: true }
  );
}

function initAmbient() {
  const orbs = document.querySelectorAll<HTMLElement>('.hero-orb');
  if (!orbs.length) return;
  orbs.forEach((orb, i) => {
    const tween = gsap.to(orb, {
      x: gsap.utils.random(-60, 60),
      y: gsap.utils.random(-40, 40),
      duration: gsap.utils.random(18, 28),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: i * 3,
    });
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => tween.play(),
      onLeave: () => tween.pause(),
      onEnterBack: () => tween.play(),
      onLeaveBack: () => tween.pause(),
    });
  });
}

function initAbout() {
  if (!document.querySelector('.about')) return;
  document.querySelectorAll<HTMLElement>('.about-line').forEach((line) => {
    const textNodes: { node: ChildNode; frag: DocumentFragment }[] = [];
    const allChars: HTMLElement[] = [];
    const normalChars: HTMLElement[] = [];
    const accentChars: HTMLElement[] = [];

    line.childNodes.forEach((node) => {
      if (node.nodeType === 3 && node.textContent?.trim()) {
        const chars = node.textContent.split('');
        const frag = document.createDocumentFragment();
        chars.forEach((c) => {
          const span = document.createElement('span');
          span.className = 'about-char';
          span.textContent = c === ' ' ? '\u00A0' : c;
          frag.appendChild(span);
          allChars.push(span);
          normalChars.push(span);
        });
        textNodes.push({ node, frag });
      } else if (node.nodeType === 1 && (node as HTMLElement).classList.contains('about-accent')) {
        const chars = (node.textContent || '').split('');
        const frag = document.createDocumentFragment();
        chars.forEach((c) => {
          const span = document.createElement('span');
          span.className = 'about-char about-char--accent';
          span.textContent = c === ' ' ? '\u00A0' : c;
          frag.appendChild(span);
          allChars.push(span);
          accentChars.push(span);
        });
        textNodes.push({ node, frag });
      }
    });
    textNodes.forEach(({ node, frag }) => {
      node.parentNode?.replaceChild(frag, node);
    });

    const stConfig = { trigger: line, start: 'top 80%', end: 'top 40%', scrub: 1 };
    const tl = gsap.timeline({ scrollTrigger: stConfig });
    tl.fromTo(allChars, { opacity: 0.3, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: 'power3.out' })
      .to(normalChars, { color: 'var(--text)', stagger: 0.03 }, 0)
      .to(accentChars, { color: 'var(--accent)', stagger: 0.03 }, 0);
    scrollTriggers.push(tl.scrollTrigger!);
  });

  const statST = ScrollTrigger.create({
    trigger: '.about-grid',
    start: 'top 80%',
  });
  gsap.fromTo('.about-stat', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', scrollTrigger: statST });
  scrollTriggers.push(statST);

  document.querySelectorAll<HTMLElement>('.about-stat-num[data-count]').forEach((el) => {
    const target = parseInt(el.dataset.count!, 10);
    if (isNaN(target)) return;
    const suffix = el.querySelector('.about-stat-suffix');
    const suffixText = suffix?.textContent || '';
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%' },
      onUpdate: () => {
        el.innerHTML = Math.round(obj.val) + `<span class="about-stat-suffix">${suffixText}</span>`;
      },
    });
  });

  const techST = ScrollTrigger.create({
    trigger: '.about-tech',
    start: 'top 90%',
  });
  gsap.fromTo('.about-tech-pill', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power3.out', scrollTrigger: techST });
  scrollTriggers.push(techST);
}

function initWork() {
  if (!document.querySelector('.work')) return;
  const titleST = ScrollTrigger.create({ trigger: '.work', start: 'top 80%' });
  gsap.fromTo('.work-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: titleST });
  scrollTriggers.push(titleST);

  const cardST = ScrollTrigger.create({ trigger: '.work-bento', start: 'top 80%' });
  gsap.fromTo('.work-card', { opacity: 0, y: 60, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: cardST });
  scrollTriggers.push(cardST);

  initTilt();
}

function initTilt() {
  const cards = document.querySelectorAll<HTMLElement>('[data-tilt]:not([data-project])');
  if (!cards.length) return;
  const rectCache = new WeakMap<HTMLElement, DOMRect>();
  cards.forEach((c) => rectCache.set(c, c.getBoundingClientRect()));
  let resizeTimer: number | null = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      cards.forEach((c) => rectCache.set(c, c.getBoundingClientRect()));
    }, 200);
  });
  cards.forEach((card) => {
    const rxTo = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power2.out' });
    const ryTo = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power2.out' });
    gsap.set(card, { transformPerspective: 1000 });
    card.addEventListener('mousemove', (e) => {
      const rect = rectCache.get(card);
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      rxTo(((y - cy) / cy) * -8);
      ryTo(((x - cx) / cx) * 8);
    });
    card.addEventListener('mouseleave', () => { rxTo(0); ryTo(0); });
  });
}

function initServices() {
  if (!document.querySelector('.services')) return;
  const labelST = ScrollTrigger.create({ trigger: '.services', start: 'top 80%' });
  gsap.fromTo('.services-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: labelST });
  scrollTriggers.push(labelST);

  const lineST = ScrollTrigger.create({ trigger: '.services', start: 'top 75%' });
  gsap.fromTo('.services-line', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: lineST });
  scrollTriggers.push(lineST);

  const mm = gsap.matchMedia();
  mm.add('(min-width: 769px)', () => {
    const inner = document.querySelector<HTMLElement>('.services-inner');
    if (!inner) return;
    const getScrollAmount = () => -(inner.scrollWidth - window.innerWidth);
    const tween = gsap.to(inner, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: '.services',
        start: 'top top',
        end: () => '+=' + Math.abs(getScrollAmount()),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
    scrollTriggers.push(tween.scrollTrigger!);
  });
}

function initProcess() {
  if (!document.querySelector('.process')) return;
  const labelST = ScrollTrigger.create({ trigger: '.process', start: 'top 80%' });
  gsap.fromTo('.process-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: labelST });
  scrollTriggers.push(labelST);

  const titleST = ScrollTrigger.create({ trigger: '.process', start: 'top 75%' });
  gsap.fromTo('.process-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: titleST, delay: 0.1 });
  scrollTriggers.push(titleST);

  const stepST = ScrollTrigger.create({ trigger: '.process-track', start: 'top 80%' });
  gsap.fromTo('.process-step', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: stepST });
  scrollTriggers.push(stepST);
}

function initCta() {
  if (!document.querySelector('.cta')) return;
  const triggers: ScrollTrigger[] = [];

  const t1 = ScrollTrigger.create({ trigger: '.cta', start: 'top 80%' });
  gsap.fromTo('.cta-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: t1 });
  triggers.push(t1);

  const t2 = ScrollTrigger.create({ trigger: '.cta', start: 'top 75%' });
  gsap.fromTo('.cta-line', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: t2 });
  triggers.push(t2);

  const t3 = ScrollTrigger.create({ trigger: '.cta', start: 'top 70%' });
  gsap.fromTo('.cta-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: t3, delay: 0.2 });
  triggers.push(t3);

  const t4 = ScrollTrigger.create({ trigger: '.cta', start: 'top 65%' });
  gsap.fromTo('.cta-form', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: t4 });
  triggers.push(t4);

  const t5 = ScrollTrigger.create({ trigger: '.footer', start: 'top 85%' });
  gsap.fromTo('.footer-card', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: t5 });
  triggers.push(t5);

  const t6 = ScrollTrigger.create({ trigger: '.footer-main', start: 'top 85%' });
  gsap.fromTo('.footer-links-col', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out', scrollTrigger: t6 });
  triggers.push(t6);

  scrollTriggers.push(...triggers);
}

export function killScrollTriggers() {
  scrollTriggers.forEach((st) => st.kill());
  scrollTriggers = [];
}

export function initScrollAnimations() {
  killScrollTriggers();
  initWork();
  initAbout();
  initServices();
  initProcess();
  initCta();
  ScrollTrigger.refresh();
}
