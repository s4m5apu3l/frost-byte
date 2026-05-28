# Agent Instructions — iindev

## Project context

**iindev** = iin (иинд) + dev (development). Игра слов.

**Иинд** — якутское слово. Из фильма Кэскил. Выражение "Инник диигин да" = "типа значит так говоришь". В народе стало шуткой/стёбом — говоришь нелепость и добавляешь "иинд" или "ииндиинда".

**Бизнес-модель:** Демо-сайты для малого бизнеса. Клиент платит сколько хочет. Полная прозрачность — домен, VPS, исходный код. AI-ускорение делает сроки короче конкурентов в разы.

**Конкуренты:** platforma.bz — лендинги от 50К, магазины от 150К. Мы — быстрее, дешевле, прозрачнее.

**Целевая аудитория:** Малый бизнес в Якутске и не только. Кто не может позволить 150К за сайт.

## Always load these skills

1. **caveman** — `C:/Users/slavk/.agents/skills/caveman/SKILL.md` (mode: full)
2. **karpathy-guidelines** — `C:/Users/slavk/.agents/skills/karpathy-guidelines/SKILL.md`
3. **gsap-core** — `C:/Users/slavk/Desktop/iindev/iindev-landing/.agents/skills/gsap-core/SKILL.md`
4. **gsap-scrolltrigger** — `C:/Users/slavk/Desktop/iindev/iindev-landing/.agents/skills/gsap-scrolltrigger/SKILL.md`
5. **gsap-timeline** — `C:/Users/slavk/Desktop/iindev/iindev-landing/.agents/skills/gsap-timeline/SKILL.md`
6. **gsap-performance** — `C:/Users/slavk/Desktop/iindev/iindev-landing/.agents/skills/gsap-performance/SKILL.md`

## Default behavior

- Use caveman-full communication style
- Follow karpathy-guidelines for all coding work
- Always use GSAP for animations (no CSS-only animation)
- Default mode: `minimalistic` — clean, ultra-smooth, premium

## Design system

**Read DESIGN.md before any design work.**  
Design tokens, typography, and motion rules are in `DESIGN.md` at project root.

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

- Primary output: HTML + CSS + vanilla JS (no framework needed)
- Always GSAP-powered animations
- Mobile-first, responsive
- Accessible (focus states, reduced motion)
