# Agent Instructions — iindev

## Project context

**iindev** = iin (иинд) + dev (development). Игра слов.

**Иинд** — якутское слово. Из фильма Кэскил. Выражение "Инник диигин да" = "типа значит так говоришь". В народе стало шуткой/стёбом — говоришь нелепость и добавляешь "иинд" или "ииндиинда".

**Бизнес-модель:** Демо-сайты для малого бизнеса. Клиент платит сколько хочет. Полная прозрачность — домен, VPS, исходный код. AI-ускорение делает сроки короче конкурентов в разы.

**Конкуренты:** platforma.bz — лендинги от 50К, магазины от 150К. Мы — быстрее, дешевле, прозрачнее.

**Целевая аудитория:** Малый бизнес в Якутске и не только. Кто не может позволить 150К за сайт.

**Философия lendos:** Студии берут предоплату за обещание. Мы берём оплату за результат. Сначала делаем. Потом вы решаете, сколько это стоит. Если не стоит — не платите. Это не щедрость. Это стандарт, до которого рынок ещё не дошёл.

## Architecture

Astro 5 static site. GSAP for all animation. Deployed to GitHub Pages (gh-pages branch) at iindev.xyz.

```
src/
  pages/           — Astro pages (index, brief, 404, works/lendos)
  components/      — Astro components (sections, base, ui)
  scripts/         — TypeScript (animations, cursor, loader, burger)
  styles/          — global.css
  layouts/         — BaseLayout.astro
  consts.ts        — SITE config, NAV links
  data/            — projects.ts
public/            — static assets copied to dist as-is
  CNAME            — iindev.xyz (MUST exist for gh-pages custom domain)
  .nojekyll        — MUST exist or GitHub Pages ignores _astro/ dir (MIME error)
  assets/          — favicon, og-image, etc
```

## Deployment

**Branch:** `main` = source code, `gh-pages` = built output

**Deploy command:** `npx gh-pages -d dist --dotfiles`

**CRITICAL — always verify before deploy:**
1. `public/CNAME` must contain `iindev.xyz` — without it GitHub Pages resets custom domain
2. `public/.nojekyll` must exist — without it GitHub Pages ignores `_astro/` (JS returns text/html MIME, site breaks)
3. `astro.config.mjs` `site` must be `https://iindev.xyz`
4. After build, verify `dist/CNAME` and `dist/.nojekyll` exist before running `npx gh-pages`
5. Always use `--dotfiles` flag or `.nojekyll` won't be published (gh-pages npm package skips dotfiles by default)
6. Never delete CNAME or .nojekyll from public/

## Sections (index.html)

| Section | Desktop padding | Mobile padding | Notes |
|---|---|---|---|
| Hero | 5rem 0 3rem | 4rem 0 2rem | 100dvh, orbs fade in 2.5s after text |
| Work | 4rem 0 | 3.5rem 0 | Bento grid, project cards open slideover |
| About | 5rem 0 | 6rem 0 | Animated chars, stats grid |
| Services | 100dvh pinned | auto | Horizontal scroll pinned |
| Process | 4rem 0 | 3.5rem 0 | 5-step grid |
| CTA | 5rem 0 3rem | 4rem 0 2.5rem | Title + button to /brief |
| Footer | 0 | 0 | Card with ambient orbs |

## Design tokens

- **Colors:** bg #050505, surface #161616, accent #5eead4, text #f2f2f2, muted #888888
- **Font:** Onest (Google Fonts)
- **Border:** rgba(255,255,255,0.08)
- **Radius:** 20px cards, 100px buttons, 10px inputs

## Always load these skills

1. **caveman** — `C:/Users/slavk/.agents/skills/caveman/SKILL.md` (mode: full)
2. **karpathy-guidelines** — `C:/Users/slavk/.agents/skills/karpathy-guidelines/SKILL.md`
3. **review-first** — `C:/Users/slavk/.agents/skills/review-first/SKILL.md`
4. **gsap-core** — `C:/Users/slavk/Desktop/iindev/iindev-landing/.agents/skills/gsap-core/SKILL.md`
5. **gsap-scrolltrigger** — `C:/Users/slavk/Desktop/iindev/iindev-landing/.agents/skills/gsap-scrolltrigger/SKILL.md`
6. **gsap-timeline** — `C:/Users/slavk/Desktop/iindev/iindev-landing/.agents/skills/gsap-timeline/SKILL.md`
7. **gsap-performance** — `C:/Users/slavk/Desktop/iindev/iindev-landing/.agents/skills/gsap-performance/SKILL.md`

## Default behavior

- Use caveman-full communication style
- Follow karpathy-guidelines for all coding work
- Follow review-first: every issue = problem → why → fix → "Approve?" before code
- Always use GSAP for animations (no CSS-only animation)
- Default mode: `minimalistic` — clean, ultra-smooth, premium

## Tone

- Professional, minimalistic, premium
- No marketing fluff — direct, specific language
- Dark theme with cyan accent
- Ultra smooth animations that impress clients
- Local vibe: якутский корень, но не перебор — один намёк достаточно

## Code style

- **No comments** in HTML, CSS, JS - ever. Code must be self-explanatory.
- Remove all existing comments when editing files.
- Always use regular hyphens (`-`) instead of long dashes (`—`).

## Iteration rules

- Build **one section at a time** — never all at once.
- Order: loader → header → hero → services → process → cta → footer.
- Each section built from scratch, shown to user, wait for **«норм»** before next.
- If user says fix — iterate on that section until approved.
- Only move to next section when current is approved.

## Scope rules

- Primary output: Astro 5 + GSAP + TypeScript
- Always GSAP-powered animations
- Mobile-first, responsive
- Accessible (focus states, reduced motion)
