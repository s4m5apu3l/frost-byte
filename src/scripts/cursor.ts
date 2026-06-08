import { gsap } from 'gsap';

const LENGTH = 40;
const SIZE = 4;
const LERP = 0.4;

let rafId: number | null = null;
let points: { x: number; y: number }[] = [];
let mouse = { x: 0, y: 0 };
let active = false;
let cleanup: (() => void) | null = null;

const hoverSelector =
  'a, button, [role="button"], input, textarea, select, .work-card, .services-card, .menu-link, .form-submit, .slideover-close, .slideover-cta, .slideover-works';

function teardown() {
  if (rafId !== null) cancelAnimationFrame(rafId);
  if (cleanup) cleanup();
  rafId = null;
  cleanup = null;
  active = false;
  points = [];
}

function init() {
  const canvasEl = document.getElementById('cursorCanvas') as HTMLCanvasElement | null;
  const dotEl = document.getElementById('cursorDot');
  if (!canvasEl || !dotEl) return;
  if (active) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  active = true;
  const canvas: HTMLCanvasElement = canvasEl;
  const dot: HTMLElement = dotEl;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();

  for (let i = 0; i < LENGTH; i++) points.push({ x: -1000, y: -1000 });

  const onMove = (e: MouseEvent) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    gsap.to(dot, { x: mouse.x - 3, y: mouse.y - 3, duration: 0.18, ease: 'power3.out', overwrite: 'auto' });
  };
  const onOver = (e: Event) => {
    const t = e.target as Element | null;
    if (t?.closest(hoverSelector)) dot.classList.add('hover');
  };
  const onOut = (e: Event) => {
    const t = e.target as Element | null;
    if (t?.closest(hoverSelector)) dot.classList.remove('hover');
  };
  const onLeave = () => {
    canvas.style.opacity = '0';
    dot.style.opacity = '0';
  };
  const onEnter = () => {
    canvas.style.opacity = '1';
    dot.style.opacity = '1';
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseover', onOver);
  document.addEventListener('mouseout', onOut);
  document.documentElement.addEventListener('mouseleave', onLeave);
  document.documentElement.addEventListener('mouseenter', onEnter);
  window.addEventListener('resize', resize);

  cleanup = () => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseover', onOver);
    document.removeEventListener('mouseout', onOut);
    document.documentElement.removeEventListener('mouseleave', onLeave);
    document.documentElement.removeEventListener('mouseenter', onEnter);
    window.removeEventListener('resize', resize);
  };

  function render() {
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

    points[0].x = mouse.x;
    points[0].y = mouse.y;
    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const prev = points[i - 1];
      p.x += LERP * (prev.x - p.x);
      p.y += LERP * (prev.y - p.y);
    }

    ctx!.lineCap = 'round';
    ctx!.lineJoin = 'round';
    ctx!.lineWidth = SIZE;

    for (let i = 1; i < points.length; i++) {
      const p = points[i];
      const prev = points[i - 1];
      const alpha = (1 - i / points.length) * 0.9;
      ctx!.strokeStyle = `rgba(94, 234, 212, ${alpha.toFixed(3)})`;
      ctx!.beginPath();
      ctx!.moveTo(prev.x, prev.y);
      ctx!.lineTo(p.x, p.y);
      ctx!.stroke();
    }

    rafId = requestAnimationFrame(render);
  }
  render();
}

export function initCursor() {
  init();
}

export function killCursor() {
  teardown();
  const canvas = document.getElementById('cursorCanvas') as HTMLCanvasElement | null;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx?.setTransform(1, 0, 0, 1, 0, 0);
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  }
}
