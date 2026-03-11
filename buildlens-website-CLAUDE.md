# CLAUDE.md — BuildLens Marketing Website

## Project Overview

Premium marketing website for BuildLens, a construction logistics management platform. The site follows a Locomotive.ca / Awwwards-tier interaction design language — kinetic typography, GSAP-driven scroll reveals, custom cursor, magnetic buttons, smooth scrolling via Lenis, and intentional asymmetric layouts. Built by a non-developer (vibe coder) using AI pair-programming — explain technical decisions in plain language, keep jargon minimal.

---

## Tech Stack

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | Astro 5.x | Zero-JS baseline. Use View Transitions API for page transitions. No Virtual DOM. |
| Scripting | Vanilla TypeScript | Inside Astro `<script>` tags. No React, no Vue, no Svelte unless explicitly requested as an Island. |
| Animation | GSAP 3.12+ | ScrollTrigger for scroll-based. SplitText for text reveals. `quickTo` for cursor. |
| Smooth Scroll | Lenis | Global smooth scroll. Sync with GSAP ticker — do NOT double-raf. |
| Styling | Tailwind CSS 4.x + native CSS | Tailwind for structure/utility. Native CSS for clip-paths, masking, typography `clamp()`, and custom animations. |
| Fonts | Self-hosted woff2 | DM Sans (variable, 400-800) + JetBrains Mono (400-600). Preloaded, Latin subset only. |
| Hosting | Vercel | Auto-deploy from main branch. |
| Forms | Netlify Forms or Formspree | Zero-backend form handling. |
| Dev Server | `astro dev` | Default port 4321. |

---

## File Structure

```
buildlens-website/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # HTML shell, font preload, global CSS, Lenis init, cursor mount
│   ├── pages/
│   │   ├── index.astro               # Home — assembles Hero, Marquee, ValueProp, ModuleGrid, Stats, Preview, Testimonial, CTA
│   │   ├── platform.astro            # Platform deep dive — all 12 modules
│   │   ├── about.astro               # Company story
│   │   ├── contact.astro             # Demo request form
│   │   └── 404.astro                # Custom 404 page
│   ├── components/                   # Astro components — one per section
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Cursor.astro
│   │   ├── Hero.astro
│   │   ├── Marquee.astro
│   │   ├── ValueProp.astro
│   │   ├── ModuleGrid.astro
│   │   ├── Stats.astro
│   │   ├── PlatformPreview.astro
│   │   ├── Testimonial.astro
│   │   ├── CTASection.astro
│   │   └── MagneticButton.astro
│   ├── scripts/                      # TypeScript animation/interaction modules
│   │   ├── init.ts                   # Master orchestrator — initializes all scripts, handles page transitions
│   │   ├── cursor.ts                 # Custom cursor with hover states
│   │   ├── magnetic.ts               # Magnetic pull on buttons/links
│   │   ├── reveal.ts                 # Scroll reveal utility (lines, fade, stagger, counter)
│   │   ├── parallax.ts               # Parallax on images and elements
│   │   ├── marquee.ts                # Infinite horizontal scroll
│   │   ├── lenis.ts                  # Lenis init + GSAP ticker sync
│   │   └── nav.ts                    # Nav scroll behavior + mobile menu
│   ├── styles/
│   │   ├── global.css                # CSS variables (design tokens), reset, base typography, cursor styles
│   │   ├── animations.css            # Clip-path utilities, keyframes
│   │   └── fonts.css                 # @font-face declarations
│   └── assets/
│       ├── fonts/                    # .woff2 files
│       └── images/                   # Optimized WebP/AVIF + SVG icons
├── public/
│   ├── favicon.svg
│   └── og-image.png
├── astro.config.mjs
├── tailwind.config.mjs               # Theme extension with design tokens
├── tsconfig.json
└── package.json
```

---

## Design System — Rembrandt Chiaroscuro

"Light is the design language. Elements don't have backgrounds — they have light."

All colors defined as CSS custom properties in `src/styles/global.css`. The palette uses layered depth, warm gold tones, and glass transparency — not flat dark surfaces.

**Background depth tiers** (darkest → lightest):
- `--bg-abyss` (`#05060A`) — deepest, page edges, footer
- `--bg-deep` (`#08090E`) — primary page background
- `--bg-mid` (`#0D1117`) — section backgrounds, card containers
- `--bg-raised` (`#161B22`) — elevated: nav on scroll, modals
- `--bg-shelf` (`#1C2128`) — highest: tooltips, dropdowns
- `--bg-body` — `radial-gradient(ellipse at 30% 20%, #0D1117, #08090E, #05060A)` for body element

**Glass layers** (used for card/surface backgrounds):
- `--glass-01` through `--glass-12` — `rgba(255,255,255, 0.01-0.12)`
- Default card: `--glass-03`. Hovered card: `--glass-05`. Active: `--glass-08`.

**Text** (warm gold, not clinical white):
- `--text-lit` (`#E8E0D4`) — headings, primary text
- `--text-mid` (`#8B8578`) — body text, descriptions
- `--text-shadow` (`#4A4A52`) — decorative labels only (fails WCAG for meaningful content)
- `--text-deep` (`#2A2A30`) — decorative only

**Accent — Rembrandt Gold:**
- `--accent` (`#F0E6D3`) — CTAs, active states, hover, nav logo highlight
- `--accent-dim` (`#8B7D6B`) — secondary accent elements
- `--accent-glow` (`rgba(240,230,211,0.06)`) — glow/shadow behind accent elements
- `--accent-bg` (`rgba(240,230,211,0.08)`) — button backgrounds
- `--accent-border` (`rgba(240,230,211,0.20)`) — CTA borders

**Borders** (glass-like, not hard lines):
- `--border-subtle` (`rgba(255,255,255,0.04)`) — default
- `--border-mid` (`rgba(255,255,255,0.06)`)
- `--border-strong` (`rgba(255,255,255,0.08)`) — hover
- `--border-bright` (`rgba(255,255,255,0.12)`) — focus/active

**Shadows:**
- `--shadow-sm` through `--shadow-float` — see spec for full values
- `--shadow-glow` (`0 0 20px rgba(240,230,211,0.05)`) — accent glow

**Fonts:** DM Sans (variable, 400-800) + JetBrains Mono (400-600). Self-hosted woff2, Latin subset.

Hard rules:
- Never use white or light backgrounds. Rembrandt = controlled light on deep dark.
- Never use flat surface colors. Use glass layers (`--glass-*`) for card backgrounds.
- Never use default Tailwind palette colors. Always use design tokens.
- Typography sizes use `clamp()` for fluid scaling — never fixed pixel sizes for headings.
- Whitespace is a design element. Sections get `8rem` to `16rem` vertical padding.
- Text glows on headings and stats: `text-shadow: 0 0 60px var(--accent-glow)` for subtle warmth.

---

## Architecture Rules

1. **No UI component libraries.** No shadcn, no Radix, no MUI, no DaisyUI. Everything is hand-built Astro components + Tailwind + native CSS. The design language is custom.

2. **No framework Islands unless absolutely necessary.** Default is Vanilla TypeScript in `<script>` tags. If a component genuinely needs reactive state (unlikely for a marketing site), use a Preact Island. Never React.

3. **GSAP is the only animation engine.** No CSS animations for anything scroll-triggered. CSS `@keyframes` only for perpetual micro-animations (cursor pulse, loading spinners). All scroll-based, reveal, and interactive animations go through GSAP + ScrollTrigger.

4. **Lenis owns scrolling.** Never use native smooth scroll (`scroll-behavior: smooth`). Lenis handles all scroll physics. Sync Lenis with GSAP ticker: `lenis.on('scroll', ScrollTrigger.update)` and add Lenis `raf` to GSAP ticker.

5. **Data attributes drive interactions.** Use `data-reveal`, `data-magnetic`, `data-parallax`, `data-cursor` attributes on HTML elements. Scripts query these attributes — components don't import script modules directly.

6. **Page transition lifecycle is sacred.** Every GSAP ScrollTrigger, every tween, every Lenis instance MUST be killed on `astro:before-swap` and reinitialized on `astro:page-load`. Memory leaks from orphaned ScrollTriggers will destroy performance after 2-3 page transitions.

7. **Mobile-first responsive.** Tailwind breakpoints: `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`. All layouts start mobile, scale up.

8. **Images are always optimized.** Use Astro `<Image>` component for automatic optimization. WebP with AVIF fallback. Always include `width`, `height`, and `loading="lazy"` (except hero/above-fold images which get `loading="eager"` and `fetchpriority="high"`).

---

## Coding Patterns to Follow

- **Component style** — Astro components (`.astro` files). Props via `Astro.props`. No client-side state in components.
- **Script style** — Each script module exports an `init()` function and a `destroy()` function. `init.ts` calls them all and handles lifecycle.
- **Styling approach** — Tailwind classes for layout, spacing, display. Native CSS (in `<style>` blocks or imported CSS) for clip-paths, masking, complex transforms, `clamp()` typography.
- **Naming** — `kebab-case` for files. `camelCase` for variables/functions. `PascalCase` for Astro components. `UPPER_SNAKE` for constants. CSS variables: `--category-name` pattern.
- **Responsive** — Mobile-first Tailwind. Custom cursor and magnetic effects disabled on touch devices via `matchMedia('(hover: hover)')`.
- **Accessibility** — `prefers-reduced-motion` check wraps ALL animation init. If reduced motion, show content statically, disable Lenis, disable cursor. Also listen for runtime changes via `mediaQuery.addEventListener('change')`.
- **Magnetic + Focus** — Magnetic transform is pointer-only. On keyboard focus: no transform, show outline ring (`2px solid var(--accent), offset 4px`). If mid-transform on focus, snap to rest instantly.

---

## Asset Sources

| Asset | Source | License | Notes |
|-------|--------|---------|-------|
| DM Sans (primary font) | https://fonts.google.com/specimen/DM+Sans | OFL (free) | Download woff2 variable font. Subset to Latin with `pyftsubset`. Target < 60KB. |
| JetBrains Mono (monospace accent) | https://fonts.google.com/specimen/JetBrains+Mono | OFL (free) | Weight 400 only. Subset same as above. ~15KB. |
| Module icons | Hand-crafted SVGs or Lucide Icons (https://lucide.dev) | MIT | Inline SVGs, monochrome, `currentColor`. No icon font libraries. |
| Product screenshots (4) | Rendered from `product-screenshots.jsx` in project root | Internal | `screenshot-gantt.png` (Schedule & Gantt — hero shot), `screenshot-dashboard.png` (Project Dashboard), `screenshot-pipeline.png` (Pursuit Pipeline Board), `screenshot-rfi.png` (RFI Tracker). All use Rembrandt palette. Copy to `src/assets/images/`. |
| OG Image | Create 1200x630px dark image with logo + tagline | N/A | Export PNG, compress < 100KB. |
| Favicon | "BL" monogram SVG, accent color, transparent bg | N/A | `public/favicon.svg`, 32x32 viewBox. |

**No stock photography.** No icon font libraries (Font Awesome, etc.). No external CDN font loading.

---

## Things to Never Do

- **Never add React, Vue, or Svelte.** This is an Astro + Vanilla TS project. No frameworks.
- **Never use CSS `scroll-behavior: smooth`.** Lenis handles scrolling.
- **Never create ScrollTrigger instances without storing a reference for cleanup.** Every ST must be killable on page transition.
- **Never use `position: fixed` for animated elements.** Use `position: fixed` only for cursor and nav. Animated elements use transforms.
- **Never use white or light backgrounds.** Dark-only site.
- **Never inline font files as base64.** Always load via @font-face with woff2 files.
- **Never use `setTimeout` or `setInterval` for animations.** GSAP handles all timing.
- **Never forget `will-change: transform` cleanup.** Add it before animation, remove it after. Don't leave it permanent.
- **Never put `cursor: none` only on body.** Put it on `html` and ensure it applies to all elements. Override for form inputs with `cursor: text`.

---

## Environment Setup

```bash
# Create project
npm create astro@latest buildlens-website
cd buildlens-website

# Install dependencies
npm install gsap @studio-freight/lenis
npm install -D tailwindcss @astrojs/tailwind

# Start development
npm run dev              # App runs at http://localhost:4321

# Production build
npm run build            # Output: dist/

# Preview production build
npm run preview          # Local preview of built site

# Deploy
# Auto-deploys from main via Vercel (connect repo in Vercel dashboard)
```

### Required Environment Variables

| Variable | Purpose | Where to get it |
|----------|---------|-----------------|
| PUBLIC_FORM_ENDPOINT | Form submission URL | Formspree dashboard or Netlify Forms |
| PUBLIC_SITE_URL | Canonical URL | Your domain |

---

## Testing

**Current state:** No unit/integration tests. This is a marketing site — testing is visual + CI build check.

**CI Pipeline:** GitHub Actions runs `npm run build` on every push to main and on PRs. If the build breaks, the push is flagged. See `.github/workflows/build.yml`.

**Future CI additions (post-MVP):** Lighthouse CI (`@lhci/cli`) for automated performance regression checks, `html-validate` for markup correctness, `axe-core` CLI for automated accessibility audits.

**Quality checks:**
- Lighthouse audit after every major section is built. Target: 90+ Performance, 95+ Accessibility.
- Cross-browser: Chrome, Firefox, Safari (desktop + mobile).
- Responsive: Test at 375px, 768px, 1024px, 1440px, 1920px.
- Reduced motion: Toggle `prefers-reduced-motion` in devtools, verify all animations disable gracefully.
- Page transitions: Navigate between all pages 5+ times, check for memory leaks in devtools Performance tab.

---

## Git & Deployment

### Repository Setup

Create the repo as `buildlens-website` under your GitHub account. Initialize with the Astro scaffold — do NOT commit all code at once.

```bash
# After Phase 1 scaffold is working locally:
git init
git add -A
git commit -m "chore: initial Astro scaffold with Tailwind, GSAP, Lenis"
gh repo create buildlens-website --public --source=. --push
```

### Branch Strategy

Every build phase gets its own feature branch. Never commit directly to `main` after the initial scaffold.

| Phase | Branch Name | Merge After |
|-------|-------------|-------------|
| Phase 1: Scaffold | `main` (initial commit) | — |
| Phase 2: Interaction Utilities | `feat/interaction-utilities` | All 7 script modules working |
| Phase 3: Navigation | `feat/navigation` | Desktop + mobile nav complete |
| Phase 4: Home Sections | `feat/home-sections` | All 8 sections rendering |
| Phase 5: Footer | `feat/footer` | Footer complete, MVP Gate checklist passes |
| Phase 6a: Platform Page | `feat/platform-page` | Page complete with all 12 modules |
| Phase 6b: About Page | `feat/about-page` | Page complete with bio, photo, responsive |
| Phase 6c: Contact Page | `feat/contact-page` | Form working, validation in place |
| Phase 7: Performance | `perf/optimization` | Lighthouse 90+ on all pages |
| Phase 8: SEO & Meta | `feat/seo-meta` | All meta tags, sitemap, structured data |

**Workflow per phase:**
```bash
git checkout main
git pull origin main
git checkout -b feat/phase-name

# ... build the phase ...
# Make atomic commits as you go (see commit rules below)

git push -u origin feat/phase-name
gh pr create --title "feat: Phase X — description" --body "Summary of changes"
# Merge PR to main (squash merge OK for clean history)
gh pr merge --squash
```

### Commit Rules

**Commit style:** Conventional commits — `feat:`, `fix:`, `style:`, `refactor:`, `perf:`, `chore:`

**Atomic commits — one logical unit per commit.** Never dump an entire phase into a single commit. Break it up:

Good (Phase 4 example):
```
feat: add Hero section with kinetic type reveals
feat: add Marquee section with dual-direction scroll
feat: add ValueProp section with asymmetric layout
feat: add ModuleGrid section with staggered card reveals
feat: add Stats section with counter animations
feat: add PlatformPreview section with parallax container
feat: add Testimonial section with line reveals
feat: add CTASection with magnetic button
feat: assemble all sections in index.astro
```

Bad:
```
feat: add all home page sections
```

**Every commit must build.** Run `npm run build` before committing. If it doesn't compile, don't commit it.

### Vercel Deployment

Connect the repo to Vercel after the initial scaffold push:

```bash
npm i -g vercel
vercel link                    # Connect to Vercel project
vercel --prod                  # Manual deploy (auto-deploy from main is preferred)
```

**Preferred:** Enable auto-deploy in Vercel dashboard — every merge to `main` triggers a production deploy. PR branches get preview deploys automatically.

**Project name in Vercel:** `buildlens` (this gives you `buildlens.vercel.app` until a custom domain is connected).

### Environment Variables

Create `.env.example` in the project root (committed to repo — contains variable names, not values):
```
PUBLIC_FORM_ENDPOINT=          # Formspree or Netlify Forms endpoint
PUBLIC_SITE_URL=               # https://buildlens.vercel.app (or custom domain)
```

Set actual values in Vercel dashboard → Settings → Environment Variables.

---

## Known Technical Debt

- No automated testing — visual QA only
- Placeholder content throughout (lorem ipsum, stock images) — real copy and visuals TBD
- No CMS integration — all content hardcoded in Astro components. Future: consider Astro Content Collections or headless CMS.
- No i18n — English only

---

## Decisions Log

- **2026-03-10 — Chose Astro over Next.js:** Zero-JS baseline is critical for animation performance. Next.js hydration conflicts with GSAP. Astro gives direct DOM control.
- **2026-03-10 — GSAP over Framer Motion / Motion One:** GSAP is the industry standard for Awwwards-tier sites. ScrollTrigger and SplitText are battle-tested. Framer Motion is React-only.
- **2026-03-10 — Lenis over Locomotive Scroll:** Locomotive Scroll is heavier and less maintained. Lenis is lighter, plays well with ScrollTrigger, and is the current industry standard.
- **2026-03-10 — No UI library (shadcn, etc.):** The design language is intentionally custom. Pre-built components would fight the aesthetic. Everything hand-crafted.
- **2026-03-10 — Rembrandt Chiaroscuro palette over flat dark:** Layered depth system with warm gold tones is more premium than flat `#0A0A0A`. Glass layers create dimensionality. Gold accent (`#F0E6D3`) over orange (`#FF4D00`) — gold reads refined and timeless, orange reads safety vest. Light is the design language.
- **2026-03-10 — DM Sans over Space Grotesk:** Both geometric sans-serifs, but DM Sans has warmer curves that complement the Rembrandt gold palette. Supports weights 400-800 (Space Grotesk maxes at 700).
- **2026-03-10 — Product screenshots from actual code:** Screenshots rendered from real BuildLens React components (FieldOpsManager, PursuitProposalManager) using Rembrandt design tokens. 4 views: Schedule/Gantt (hero), Dashboard, Pipeline Board, RFI Tracker. Source JSX at `product-screenshots.jsx`. Gantt view is the flagship hero image for the marketing site.

---

*This file is the single source of truth for how Claude Code works in this codebase. Update it when the stack, patterns, or rules change. If code behavior and CLAUDE.md disagree, CLAUDE.md is the authority — fix the code or update the doc.*
