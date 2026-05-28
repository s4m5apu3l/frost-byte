# thecirclecompany.co — DNA Analysis

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Styling | Tailwind CSS v4 |
| Animation | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Numbers | number-flow-react (animated counter) |
| Font | Haffer (variable font, Displaay Type Foundry) |

## Visual System

### Colors
| Token | Value | Role |
|---|---|---|
| Background | `#0A0A0A` (darkgrey) | Page bg |
| Primary | `rgba(254,0,62)` — crimson red | Accent, glow, hover |
| Primary glow | `rgba(110,22,28,0.72)` | Ambient orbs |
| Text primary | `white` | Headlines |
| Text secondary | `white/40` — `white/60` | Body, descriptions |
| Text muted | `white/25` — `white/30` | Labels, numbers |
| Borders | `white/8`, `white/[0.07]`, `#1F1F1F` | Dividers, cards |
| Footer card | `#130909` | Deep reddish-black |

### Typography
| Element | Spec |
|---|---|
| Font | Haffer (variable, custom weights) |
| Hero | `clamp(2.5rem, 7vw, 7rem)`, weight 790, tracking -0.03em |
| Section titles | `clamp(1.75rem, 4vw, 3.5rem)`, weight 790 |
| Card titles | `44px`, weight 570 |
| Body | `text-sm`, white/40, leading-relaxed |
| Labels | `text-xs`, uppercase, tracking-[0.12em], white/30 |
| Numbers | `140px`, font-thin, white/6 opacity |
| Weights used | 570, 650, 790 (variable font precision) |

### Layout
| Token | Value |
|---|---|
| Max width | 1600px |
| Container padding | px-4 sm:px-8 lg:px-12 |
| Section padding | py-16 sm:py-20 md:py-24 |
| Grid | 12-column (Tailwind) |

## Key Effects

### 1. Ambient Glow (Footer)
Multiple layered radial gradients with blur:
```css
background:
  radial-gradient(ellipse 90% 55% at 88% -5%, rgba(110,22,28,0.72) 0%, transparent 65%),
  radial-gradient(ellipse 65% 65% at 8% 95%, rgba(254,0,62,0.28) 0%, transparent 65%),
  radial-gradient(ellipse 55% 65% at 52% 62%, rgba(4,2,2,0.95) 0%, transparent 60%),
  #130909;
```
Plus blur orbs:
```css
/* Orb 1 */
background: radial-gradient(ellipse, rgba(140,25,35,0.45) 0%, transparent 70%);
filter: blur(60px);

/* Orb 2 */
background: radial-gradient(ellipse, rgba(254,0,62,0.22) 0%, transparent 68%);
filter: blur(50px);
```

### 2. Noise Texture Overlay
SVG feTurbulence noise at 2.5% opacity:
```css
background-image: url("data:image/svg+xml,...feTurbulence...");
background-size: 160px 160px;
opacity: 0.025;
```

### 3. Button Hover (Slide Background)
```css
/* Button */
relative overflow-hidden;

/* ::before pseudo-element */
absolute inset-0 bg-primary;
transform: translateX(-101%);
transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);

/* On hover */
hover:translate-x-0;
```
Text and icon stay on top (z-10), color transitions to white.

### 4. Link Hover (Growing Line)
```css
/* Each link has */
inline-flex items-center gap-1.5;

/* ::before pseudo-element (the line) */
w-2.5 h-px bg-primary;
transform-origin: left;
transform: scaleX(0);
transition: transform 300ms;

/* On hover */
hover:scaleX-100;
hover:text-white;
```

### 5. Horizontal Scroll Section (Services)
- **Pinned**: section pinned while scrolling vertically
- **Inner scrolls horizontally**: content moves left via translate3d
- **Cards**: 420px wide, full height, border-right separator
- **Card effects**:
  - Radial gradient glow at bottom-left (crimson, opacity 0 → 1)
  - Vertical line grows from top (scaleY 0 → 1)
  - Large number (140px, 6% opacity)
  - Tag pill with border
  - Bottom progress bar (width 0% → 100%)
  - Title + description
  - "Explore" link with arrow

### 6. Scroll Reveals
Elements start with inline styles:
```css
opacity: 0;
transform: translateY(40px); /* or 16px, 20px, 30px depending on element */
```
Animated in on scroll via GSAP ScrollTrigger.

### 7. Number Animation
`number-flow-react` component — digits slide vertically when changing.

### 8. Process Section (How We Work)
- 12-column grid
- Number (col-span-1) + Title (col-span-3) + Description (col-span-8)
- Border-bottom separators (`border-white/8`)
- Hover: title changes to primary color (`group-hover:text-primary`)
- Scroll reveal per row

### 9. Footer Architecture
- Outer: `rounded-3xl border border-white/[0.07]`
- Inner: `rounded-[23px] overflow-hidden` with gradient background
- Newsletter form with mail icon + rounded input + button
- 12-column grid: Logo+desc | Services | Company+Connect
- Bottom bar: copyright + email

## Page Structure

1. **Hero** — massive text, primary accent, CTA button
2. **Services** — horizontal scroll (desktop) / grid (mobile), 6 service cards
3. **Process** — 5 steps, 12-column grid, hover color change
4. **Work** — selected work showcase, infinite scroll, animated numbers
5. **CTA** — "Stop waiting. Start shipping." + email link
6. **Footer** — massive rounded card with ambient glow + noise

## What Makes It Premium

- **Custom variable font** (Haffer) with precise weights (570, 650, 790)
- **Very wide container** (1600px) — feels spacious
- **Extremely subtle borders** — `white/8`, almost invisible
- **Multiple ambient glow layers** — 4+ radial gradients in footer alone
- **Noise texture** — adds tactile, paper-like feel
- **Horizontal scroll pinned section** — unexpected, memorable
- **Animated numbers** — micro-delight
- **Custom easing everywhere** — `cubic-bezier(0.16, 1, 0.3, 1)`
- **Lenis smooth scroll** — buttery feel
- **Consistent opacity hierarchy** — white/25, /30, /40, /55, /60

## For iindev — What to Replicate

Since we use vanilla HTML/CSS/JS + GSAP (not Next.js + Tailwind):

| Effect | Approach |
|---|---|
| Dark void + accent glow | CSS radial gradients + backdrop-filter |
| Noise texture | CSS SVG noise overlay (pointer-events-none) |
| Blur glow orbs | CSS radial-gradient + filter: blur() |
| Button hover slide | CSS ::before with translateX |
| Link hover line | CSS ::before with scaleX |
| Horizontal scroll | GSAP ScrollTrigger pin + containerAnimation |
| Scroll reveals | GSAP ScrollTrigger batch |
| Animated numbers | GSAP counter or custom JS |
| Smooth scroll | Lenis (can add) or native |
| Custom font | Space Grotesk (free alternative to Haffer) |

## Color Adaptation for iindev

Instead of crimson red, keep cyan accent:
- Primary: `oklch(82% 0.14 180)` — electric cyan
- Glow: `oklch(82% 0.14 180 / 0.15)` — cyan ambient
- Background: `oklch(4% 0.003 180)` — deep void
- Same opacity hierarchy with white

## Font Adaptation

Haffer is paid (~$200+). Free alternatives:
- **Space Grotesk** — already in project, geometric, close feel
- **Inter** — too generic, skip
- **Geist** — modern, premium (free from Vercel)
- **Satoshi** — similar geometric feel (free from Fontshare)
