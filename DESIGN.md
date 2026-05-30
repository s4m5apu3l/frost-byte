# Design System — iindev

## Colors

| Token | Value | Usage |
|---|---|---|
| --bg | #050505 | Page background |
| --surface | #161616 | Cards, inputs |
| --surface-elevated | #111111 | Mockup bars, nested surfaces |
| --text | #f2f2f2 | Headlines, body |
| --text-muted | #888888 | Descriptions, labels |
| --accent | #5eead4 | CTAs, highlights, active states |
| --accent-glow | rgba(94,234,212,0.15) | Button shadows, input focus rings |
| --border | rgba(255,255,255,0.08) | Dividers, card borders |

## Typography

**Font:** Onest (Google Fonts), weights: 300/400/500/600/700

| Element | Size | Weight | Spacing |
|---|---|---|---|
| Hero title | clamp(2.5rem, 5vw, 5rem) | 700 | -0.03em |
| Section title | clamp(2rem, 4vw, 3.5rem) | 700 | -0.03em |
| CTA title | clamp(2.5rem, 6vw, 5rem) | 700 | -0.03em |
| Body / desc | 0.9375-1.0625rem | 400-500 | normal |
| Label / tag | 0.75rem | 500 | 0.1em, uppercase |
| Stat number | clamp(3rem, 6vw, 5rem) | 700 | -0.03em |
| Input | 0.9375rem | 400 | normal |

Line-height: 1.1 titles, 1.4-1.6 body.

## Spacing

Base unit: 1rem (16px). Sections use rem padding.

| Context | Value |
|---|---|
| Section padding (desktop) | 4-5rem vertical |
| Section padding (mobile) | 3.5-4rem vertical |
| Inner gap (title → content) | 2.5rem |
| Grid gap (cards) | 1.5-2rem |
| Component gap (form fields) | 0.75rem |
| Wrapper padding | 2rem desktop, 1rem mobile |

## Radius

| Element | Value |
|---|---|
| Cards | 20px |
| Buttons | 100px (pill) |
| Inputs | 10px |
| Footer card | 24px |
| Badges/tags | 100px (pill) |

## Motion

**All animation via GSAP. No CSS-only animation.**

| Animation | Duration | Ease |
|---|---|---|
| Text reveal (translateY) | 0.5-0.8s | power3.out |
| Stagger (lines, cards) | 0.08-0.12s | - |
| Hover (scale, translate) | 0.3s | cubic-bezier(0.32,0.72,0,1) |
| Loader word morph | 0.4s per group | power3.out |
| Loader exit (yPercent) | 0.7s | power3.inOut |
| Orb fade-in | 2.5s | power2.out, stagger 0.4s |
| Page transition (yPercent) | 0.6s in, 0.7s out | power3.inOut |

**Reduced motion:** `prefers-reduced-motion: reduce` kills all transitions (0.01ms). Orbs hidden. Loader skipped.

## Cursor

- Dot: 6px, accent, mix-blend-mode: difference
- Trail: 24px, accent border, opacity 0.3
- Hover: dot scale(4), trail scale(1.5)
- Hidden on touch devices via `(hover: none)`

## Components

### Cards
Surface bg, border 8% white, 20px radius. Hover: border → 30% accent, optional bg gradient fades in.

### Buttons
Pill shape, accent bg, dark text. Hover: translateY(-2px) + scale(1.03) + glow shadow. Active: scale(0.98).

### Inputs
Surface bg, border 8% white, 10px radius. Floating label: top 0.75rem → 0.25rem on focus, font shrinks, color → accent. Focus: accent border + 3px glow ring + subtle bg tint.

### Slideover
Right panel, 480px. Backdrop blur dark. Close button top-right. Content stacked: tag → title → desc → list → philosophy → works link → CTA.
