# iindev - Agent Instructions

## Context

**iindev** = иинд + dev. Иинд - якутское слово-шутка (Кэскил). Лендинг iindev.xyz - веб-разработка и AI-автоматизация.

## Architecture

Astro 6 static site. `output: 'static'`, `trailingSlash: 'ignore'`. Integrations: `@astrojs/sitemap`. GSAP for all animation. GitHub Pages (gh-pages branch) at iindev.xyz.

```
src/
  pages/           index, brief, 404, works/lendos, legal/{terms,privacy,consent}
  components/
    base/          Cursor, Header, Head, Footer, Loader, MenuOverlay, Slideover
    sections/      About, Cta, Process, Services, Work
    ui/            Seo
  scripts/         animations.ts, burger.ts, cursor.ts, loader.ts
  styles/          global.css
  layouts/         BaseLayout.astro
  consts.ts        SITE config, NAV links
  data/            projects.ts
public/
  CNAME            iindev.xyz
  .nojekyll        
  assets/
```

**Path aliases** (tsconfig): `@/*` -> `src/*`, `@components/*`, `@layouts/*`, `@scripts/*`, `@styles/*`

**TS quirk:** `verbatimModuleSyntax: true` — must use `import type` for type-only imports.

**GSAP imports:** `import { gsap } from 'gsap'` / `import { ScrollTrigger } from 'gsap/ScrollTrigger'`. Register in each script: `gsap.registerPlugin(ScrollTrigger)`.

**Services section:** horizontal scroll on desktop via `gsap.matchMedia()` + pinned `scrub: 1`. Mobile falls back to normal flow.

## Commands

| Command | What |
|---|---|
| `npm run dev` / `npm start` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview built output |
| `npx astro check` | Typecheck Astro files |

No linter. `astro check` is the verification step.

## Deploy

`main` = source, `gh-pages` = built output. Deploy: `npx gh-pages -d dist --dotfiles`

Pre-deploy checklist — every time:
1. `public/CNAME` must contain `iindev.xyz` (GitHub Pages resets custom domain without it)
2. `public/.nojekyll` must exist (without it `_astro/` gets wrong MIME, site breaks)
3. `astro.config.mjs` `site` must be `https://iindev.xyz`
4. After `npm run build`, verify `dist/CNAME` and `dist/.nojekyll` exist
5. Always use `--dotfiles` flag (gh-pages npm skips dotfiles by default)
6. Never delete CNAME or .nojekyll from public/

## Design

See `DESIGN.md` for tokens, typography, spacing, radius, motion, cursor, and component specs.

## Code Rules

- **No comments** in HTML, CSS, JS — ever. Remove existing when editing.
- **GSAP only** for animations. No CSS-only animation, no CSS transitions for motion.
- Regular hyphens (`-`) only, never long dashes (—).
- `prefers-reduced-motion: reduce` kills all transitions (0.01ms). Orbs hidden. Loader skipped.

## Workflow

- Build one section at a time. Order: loader -> header -> hero -> services -> process -> cta -> footer.
- Wait for approval before next section.
- Every issue: state problem -> why -> fix -> "Approve?" before writing code.

## Tone

Professional, minimal, premium. Dark theme + cyan accent (#5eead4). No marketing fluff. Якутский корень - один намек, не перебор.
