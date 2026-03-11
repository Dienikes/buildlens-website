# Claude Code Prompt: BuildLens Marketing Website

## Your Role

You are an elite Creative Frontend Developer who specializes in Awwwards-winning, high-interaction marketing websites. You are building a premium marketing website for BuildLens — a construction logistics management platform. The aesthetic reference is Locomotive.ca: kinetic typography, scroll-driven storytelling, custom cursor physics, magnetic button interactions, massive whitespace, and grid-defying layouts.

You are NOT building a SaaS application. You are building a marketing site that sells the vision of BuildLens through interaction design and spatial architecture. Content is secondary to feel. The site must make visitors think "these people build serious software" before they read a single word.

---

## Project Knowledge Files

Before writing any code, read and internalize these files in the project root:

1. **CLAUDE.md** (`buildlens-website-CLAUDE.md`) — Tech stack, architecture rules, coding patterns, design system, file structure. This is your source of truth.
2. **REVIEW.md** (`buildlens-website-REVIEW.md`) — Code review rules. Every line of code you write must pass these checks.
3. **Spec** (`buildlens-website-spec.md`) — Full product specification. Page architecture, section designs, interaction system specifications, build sequence.

---

## Technical Constraints (Non-Negotiable)

1. **Astro 5.x** — Zero-JS baseline. View Transitions API for page transitions. No Virtual DOM.
2. **Vanilla TypeScript** — All scripts in Astro `<script>` tags or imported `.ts` modules. NO React. NO Vue. NO Svelte. NO framework Islands unless I explicitly approve one.
3. **GSAP 3.12+** — ScrollTrigger for scroll-based animations. SplitText for text reveals. `quickTo` for cursor tracking. This is the ONLY animation engine.
4. **Lenis** — Global smooth scroll. Synced with GSAP ticker. Never use `scroll-behavior: smooth`.
5. **Tailwind CSS 4.x + Native CSS** — Tailwind for structural utility. Native CSS/SCSS for clip-paths, masks, `clamp()` typography, and complex animations.
6. **Self-hosted fonts** — woff2 only. Preloaded. Latin subset. No Google Fonts CDN calls.
7. **Rembrandt Chiaroscuro design** — layered depth backgrounds (`#05060A` → `#0D1117` → `#1C2128`), warm gold text (`#E8E0D4`), Rembrandt Gold accent (`#F0E6D3`), glass layers for surfaces. Body uses radial gradient, not flat color. Never white backgrounds. Light is the design language.
8. **No UI component libraries** — No shadcn, Radix, MUI, DaisyUI. Everything hand-built.

---

## Git Workflow (Non-Negotiable)

**This is NOT a "dump all code at once" project.** The codebase must be organized, readable, and version-controlled with discipline.

### Rules:
1. **Phase 1 commits to `main`.** After that, every phase gets its own feature branch.
2. **Atomic commits** — one logical unit per commit (one component, one script module, one fix). Never commit an entire phase as a single blob.
3. **Every commit must build.** Run `npm run build` before every commit. If it fails, fix it first.
4. **Merge to main via PR** after each phase is complete and verified. Squash merge is fine for clean history.
5. **Conventional commit messages:** `feat:`, `fix:`, `style:`, `refactor:`, `perf:`, `chore:`

### Branch naming per phase:
| Phase | Branch |
|-------|--------|
| 2: Interaction Utilities | `feat/interaction-utilities` |
| 3: Navigation | `feat/navigation` |
| 4: Home Sections | `feat/home-sections` |
| 5: Footer | `feat/footer` |
| 6a-c: Interior Pages | `feat/platform-page`, `feat/about-page`, `feat/contact-page` |
| 7: Performance | `perf/optimization` |
| 8: SEO & Meta | `feat/seo-meta` |

### Workflow per phase:
```bash
git checkout main && git pull origin main
git checkout -b feat/phase-name
# ... build, make atomic commits ...
git push -u origin feat/phase-name
gh pr create --title "feat: Phase X — description" --body "Summary"
gh pr merge --squash
```

---

## Build Order

Execute in this exact sequence. Each phase builds on the previous. Do not skip ahead.

### Phase 1: Project Scaffold

```bash
npm create astro@latest buildlens-website -- --template minimal --typescript strict
cd buildlens-website
npx astro add tailwind
npm install gsap @studio-freight/lenis
```

Create the file structure from CLAUDE.md. Set up:

**Product Screenshots** — Copy these 4 pre-built product screenshots into `src/assets/images/`:
- `screenshot-gantt.png` — Schedule & Gantt View (hero product shot, task list + SVG Gantt bars + stat cards + today line)
- `screenshot-dashboard.png` — Project Dashboard (Baghdad Training Facility, 6 stat cards, activity feed, milestones)
- `screenshot-pipeline.png` — Pursuit Pipeline Board (5-column Kanban, military/construction projects, discipline tags)
- `screenshot-rfi.png` — RFI & Submittal Tracker (table with status pills, filter bar, priority colors)
These screenshots use the Rembrandt palette (bg-mid #0D1117 backgrounds, glass layers, gold accent #F0E6D3, DM Sans + JetBrains Mono fonts, status colors: green #2DD4A8, amber #F5A623, red #E84855, blue #4C8BF5, purple #8B5CF6). The source JSX component is `product-screenshots.jsx` in the project root — render it to generate the PNGs, or build the screenshots as static HTML and capture them. Each screenshot should be wrapped in a browser-chrome frame (3 dots + URL bar).

- `astro.config.mjs` with ViewTransitions enabled
- `tailwind.config.mjs` with custom theme extending design tokens from the spec
- `src/styles/global.css` with all CSS custom properties, reset, base typography
- `src/styles/fonts.css` with @font-face for DM Sans (download woff2 variable font from https://fonts.google.com/specimen/DM+Sans, subset to Latin with `pyftsubset`, place in `src/assets/fonts/`). Also JetBrains Mono weights 400-600 for monospace accent labels.
- `src/layouts/BaseLayout.astro` — HTML shell with `lang="en"`, font preload `<link>`, skip-to-content link as first focusable element, global CSS import, Lenis init script, Cursor component mount, Nav, Footer, View Transitions `<ViewTransitions />`
- `.github/workflows/build.yml` — GitHub Actions CI that runs `npm run build` on push to main and PRs. Catches build-breaking changes.
- `.env.example` with `PUBLIC_FORM_ENDPOINT=` and `PUBLIC_SITE_URL=` (committed to repo — no actual values)

**Git — Phase 1 only commits directly to main:**
```bash
git init
git add -A
git commit -m "chore: initial Astro scaffold with Tailwind, GSAP, Lenis"
gh repo create buildlens-website --public --source=. --push
```

**Connect Vercel:**
```bash
npm i -g vercel
vercel link    # Connect to project named "buildlens"
```
Enable auto-deploy from `main` in Vercel dashboard. Every merge to main triggers a production deploy. PR branches get preview URLs automatically.

Verify: `npm run dev` loads a page with Rembrandt radial gradient background, DM Sans font rendering, and Lenis smooth scrolling. Skip-to-content link visible on Tab. `<html lang="en">` present. GitHub repo exists at github.com/[you]/buildlens-website. Vercel project connected.

### Phase 2: Interaction Utilities

**Git:** `git checkout -b feat/interaction-utilities` — Commit each script module individually (e.g., `feat: add Lenis + GSAP sync module`, `feat: add custom cursor with hover states`, etc.). After all 7 modules work, push and merge PR to main.

Build these as standalone TypeScript modules in `src/scripts/`. Each module exports `init()` and `destroy()` functions.

**2a. Lenis + GSAP Sync (`lenis.ts`)**
```
- Initialize Lenis with default options
- Sync Lenis scroll with GSAP ScrollTrigger:
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
- Export lenis instance for other modules
- destroy(): lenis.destroy(), remove ticker callback
```

**2b. Custom Cursor (`cursor.ts`)**
```
- Create outer circle (30px, border: 1px solid accent) and inner dot (8px, solid accent)
- Position: fixed, pointer-events: none, z-index: 9999
- Outer follows mouse with gsap.quickTo (duration: 0.5, ease: power3)
- Inner follows with gsap.quickTo (duration: 0.15)
- Hover states via data-cursor attribute:
  - [data-cursor="pointer"]: outer scales to 60px, bg accent 20% opacity
  - [data-cursor="action"]: outer scales to 80px, shows text label
  - Default: border-only circle + dot
- Hide on viewport leave, disable on touch devices
- destroy(): remove elements, kill quickTo instances
```

**2c. Magnetic Buttons (`magnetic.ts`)**
```
- Query all [data-magnetic] elements
- POINTER ONLY (never on keyboard focus):
  - On pointermove within 100px radius: translate element toward cursor (strength: 0.3 * (1 - distance/radius))
  - On pointerleave: GSAP tween back to (0,0) with elastic.out ease
- KEYBOARD FOCUS HANDLING:
  - On focus: do NOT apply magnetic transform. Show focus ring (outline: 2px solid accent, offset: 4px)
  - If mid-transform on focus: snap to (0,0) instantly (GSAP duration: 0)
  - On blur: remove focus ring
- GUARD RAILS:
  - All [data-magnetic] elements minimum 44x44px (WCAG 2.5.5)
  - Disable entirely on touch devices (matchMedia('(hover: hover)'))
- destroy(): remove all event listeners, reset transforms
```

**2d. Scroll Reveal (`reveal.ts`)**
```
- [data-reveal="lines"]: GSAP SplitText → split into lines → wrap each in overflow:hidden → ScrollTrigger animates y:100% → y:0, stagger:0.1, ease:power4.out
- [data-reveal="fade"]: opacity:0 + y:40 → opacity:1 + y:0
- [data-reveal="stagger"]: children animate with stagger:0.15
- [data-reveal="counter"]: number counts from 0 to data-target
- All triggers: start "top 85%"
- Store all ScrollTrigger instances in array for cleanup
- destroy(): kill all stored ScrollTriggers, revert SplitText
```

**2e. Parallax (`parallax.ts`)**
```
- [data-parallax="0.2"]: element moves at 20% scroll speed
- For images: container has overflow:hidden, image has scale(1.15), translateY based on scroll
- Use ScrollTrigger with scrub: true
- destroy(): kill all ScrollTriggers
```

**2f. Marquee (`marquee.ts`)**
```
- Duplicate inner content to 2x viewport width
- GSAP tween: x from 0 to -50%, repeat:-1, ease:none
- data-marquee-direction="reverse" for opposite direction
- Hover: speed increases 2x
- destroy(): kill tweens
```

**2g. Master Init (`init.ts`)**
```
- Import all script modules
- initAll(): call each module's init() in order
- destroyAll(): call each module's destroy()
- Listen for astro:page-load → destroyAll() then initAll()
- Listen for astro:before-swap → destroyAll()
- Check prefers-reduced-motion: if true, skip all inits, show content statically
```

Verify: Custom cursor follows mouse on desktop, disappears on mobile. Magnetic effect works on test button. Adding `data-reveal="fade"` to any element makes it animate on scroll.

### Phase 3: Navigation

**Git:** `git checkout -b feat/navigation` — Commit Nav.astro and nav.ts separately. Merge PR to main when desktop + mobile nav both work.

Build `Nav.astro`:
- Fixed position, full width, z-index: 100
- Logo left, nav links center-right, CTA button far right
- Background: transparent initially, transitions to `--bg-raised` with `backdrop-filter: blur(12px)` on scroll (use ScrollTrigger or IntersectionObserver)
- Links: "Platform", "About", "Contact" — each with `data-magnetic` attribute
- CTA: "Request Demo" — `data-magnetic` + `data-cursor="action"`
- Mobile: hamburger icon, full-screen overlay menu with staggered text reveals using GSAP timeline
- Links use Astro View Transitions `<a>` tags

### Phase 4: Home Page Sections

**Git:** `git checkout -b feat/home-sections` — Commit each section component individually (e.g., `feat: add Hero section with kinetic type reveals`). Final commit assembles them in index.astro. Merge PR to main when all 8 sections render.

Build each section as an Astro component. Assemble them in `src/pages/index.astro`.

**4a. Hero.astro**
- Full viewport height (`min-h-screen`)
- Monumental heading: "Construction logistics. One source of truth." — text split across 2-3 lines
- Heading uses `clamp(4rem, 10vw, 12rem)` font size, bleeds off left edge with negative margin
- Subtext right-aligned in the right third
- CTA button bottom-right with `data-magnetic`
- Scroll indicator bottom-center (animated chevron)
- Heading has `data-reveal="lines"`, subtext has `data-reveal="fade"`
- Subtle parallax grid/texture background

**4b. Marquee.astro**
- Two rows of scrolling text, opposite directions
- Content: "Purchase Orders", "Submittals", "Scheduling", "BOMs", "Subcontractor Management", "Budget Tracking", "Equipment Sourcing", "Document Control"
- Semi-transparent text, accent color highlight capability
- `data-marquee-direction="forward"` and `data-marquee-direction="reverse"`

**4c. ValueProp.astro**
- Asymmetric split layout: 60/40
- Left: "The Problem" label (monospace, uppercase, accent) + heading "Spreadsheets. Email chains. Shared drives. Hope." + body text
- Right: abstract visual element or dashboard mockup with parallax offset
- All text has `data-reveal="lines"` or `data-reveal="fade"`

**4d. ModuleGrid.astro**
- Asymmetric CSS Grid: NOT a uniform 3-column grid
- Use `grid-template-columns` and `grid-template-rows` with varied spans
- 12 cards for BuildLens modules, each showing: icon, module name, one-liner
- Cards have `data-reveal="stagger"`, hover states with border glow and scale(1.02)
- Each card: `data-cursor="action"` with "Explore" label

**4e. Stats.astro**
- Full-width band, horizontal layout
- Stats: "12 modules", "100% data propagation", "0 double-entry", "1 source of truth"
- Numbers use `data-reveal="counter"` with `data-target` values
- Subtle parallax offsets on each stat

**4f. PlatformPreview.astro — 3D Perspective-Shift Screenshot Carousel**

This is the marquee section. It must feel like a Linear/Stripe/Apple product reveal — not a generic SaaS image slider.

**Architecture:**
- Outer container: `perspective: 1200px`, `overflow: hidden`, full viewport width
- Inner stage: pinned via GSAP ScrollTrigger (`pin: true`, `scrub: 1`)
- 4 screenshot "cards" stacked absolutely, each containing: browser-chrome frame + screenshot image + caption block
- Total scroll distance: `400vh` mapped to 4 transitions (100vh per screenshot)
- Progress indicator: thin horizontal bar at bottom (`--accent` color, width transitions from 0% → 100% across the 4 screenshots)

**Screenshots in order:**
1. `screenshot-gantt.png` — "Master Your Schedule" — Schedule & Gantt View (hero shot, enters first)
2. `screenshot-dashboard.png` — "Command Your Project" — Project Dashboard
3. `screenshot-pipeline.png` — "Own Your Pipeline" — Pursuit Pipeline Board
4. `screenshot-rfi.png` — "Track Every Detail" — RFI & Submittal Tracker

**GSAP Timeline per transition (repeat for each screenshot swap):**
```
Exiting screenshot:
  - rotateY: 0 → 8deg (tilts away from viewer)
  - scale: 1 → 0.92
  - filter: blur(0px) → blur(4px)
  - opacity: 1 → 0
  - duration: 0.4 (relative to scrub timeline)

Entering screenshot:
  - rotateY: -8deg → 0 (rotates in from opposite side)
  - scale: 0.92 → 1
  - filter: blur(4px) → blur(0px)
  - opacity: 0 → 1
  - duration: 0.4

Caption text (beside or below the screenshot):
  - Exits FIRST: y: 0 → -30, opacity: 1 → 0 (0.15 duration)
  - Enters AFTER screenshot settles: y: 30 → 0, opacity: 0 → 1 (0.2 duration, stagger 0.05 for heading vs body)
```

**Parallax depth within each card:**
- Browser chrome frame: moves at 1x scroll speed (container)
- Screenshot image inside frame: moves at 0.85x (creates floating-UI illusion)
- Apply via `translateY` offset tied to ScrollTrigger progress

**Browser chrome frame spec:**
- Header: `--bg-shelf` (#1C2128), 12px padding, 3 dots (red/amber/green, 12px), URL bar in JetBrains Mono 12px `--text-mid`
- Body: screenshot image, `border-radius: 12px` on outer frame, `border: 1px solid --border-semi`
- Shadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`

**Progress indicator:**
- 4 small dots (8px) at bottom of pinned section
- Active dot: `--accent` (#F0E6D3) with glow shadow
- Inactive dots: `--border-semi` (rgba 255,255,255,0.08)
- Dots transition smoothly as scroll progresses

**Reduced motion fallback:** If `prefers-reduced-motion`, skip the pin and 3D transitions. Show all 4 screenshots vertically stacked with simple `data-reveal="fade"` on each. No perspective, no blur, no rotation.

**Touch/mobile:** Disable 3D rotations. Use simple crossfade between screenshots instead. Keep the pin and scrub behavior but with opacity-only transitions. Reduce scroll distance to `300vh`.

**4g. Testimonial.astro**
- Centered large quote text
- `data-reveal="lines"` on quote
- Attribution fades in after quote

**4h. CTASection.astro**
- Full-width, centered heading: "Ready to see it in action?"
- Large CTA button with `data-magnetic` and `data-cursor="action"`
- Secondary text link to contact page

### Phase 5: Footer

**Git:** `git checkout -b feat/footer` — Commit Footer.astro. After MVP Gate checklist passes, merge PR to main.

Build `Footer.astro`:
- Full-width dark band
- Logo, nav links, contact info (email, phone, "Madison, AL")
- Minimal, clean, no clutter

### >>> MVP GATE — DEPLOY HOME PAGE FIRST <<<

After Phase 5, the Home page is a fully functional single-page marketing site. Merge the footer branch to main — this triggers auto-deploy to Vercel. Review the live site. Iterate on timing, spacing, feel. Get my feedback. Do NOT proceed to interior pages until I confirm the Home page is right.

**MVP Checklist before proceeding:**
- [ ] All 8 Home sections render correctly
- [ ] Custom cursor, magnetic buttons, scroll reveals functional on desktop
- [ ] Touch: cursor disabled, magnetic disabled, content accessible
- [ ] `prefers-reduced-motion`: animations disabled, content visible statically
- [ ] Keyboard: Tab through all interactive elements, focus rings visible, magnetic buttons stay at rest on focus
- [ ] Page weight: < 500KB initial load
- [ ] Lighthouse: 85+ Performance (90+ target comes in Phase 7)
- [ ] No console errors
- [ ] GitHub Actions build check passes
- [ ] Vercel auto-deploy from main succeeds — live site at buildlens.vercel.app
- [ ] Git history is clean: scaffold commit → interaction utilities PR → navigation PR → home sections PR → footer PR

### Phase 6: Interior Pages

Each sub-page gets its own branch. Build, verify, merge to main one at a time.

**6a. Platform Page (`platform.astro`)** — Branch: `feat/platform-page`
- Hero with "The Platform" heading, kinetic reveal
- **Product Screenshot Gallery** — Below the hero, showcase 4 product screenshots in browser-chrome frames with scroll-triggered reveals:
  1. `screenshot-gantt.png` — Schedule & Gantt View (hero-size, full-width with parallax)
  2. `screenshot-dashboard.png` — Project Dashboard (appears on scroll, slight rotate-in)
  3. `screenshot-pipeline.png` — Pursuit Pipeline Board (Kanban view)
  4. `screenshot-rfi.png` — RFI & Submittal Tracker
  Each screenshot section includes a heading (e.g., "Master Your Schedule"), 2-3 lines of capability text, and the screenshot in a browser-chrome frame. Alternate layout: text-left/image-right, then image-left/text-right.
- 12 module sections, each with:
  - Module name as a large heading
  - Key capabilities as body text (pull from buildlens-suite-overview.md)
  - Visual element or icon
  - Alternating left/right layouts
  - Each section has scroll reveals

**6b. About Page (`about.astro`)** — Branch: `feat/about-page`. See full spec in `buildlens-website-spec.md` → "About Page Full Specification" for wireframes, responsive breakpoints, and exact copy. Summary of sections:

- **Section 1: Hero** — "Built by Operators." heading with kinetic reveal + story paragraph
- **Section 2: Founder Bio** — Tim Rollins. Photo is provided: `Tim Rollins BIO image.png` in project root — copy to `src/assets/images/tim-rollins.png` and use Astro `<Image>` for WebP optimization. 55/45 split layout (text left, photo right on desktop). Stacks on tablet/mobile (photo on top). Includes:
  - Background (20+ yrs Army, Green Beret, 1st SFG, 200-person task force, $20M budget)
  - Credential tags as horizontal pills (B.S., SAP ERP, PM Certified, OSHA 30, TS/SCI, Demolitions Instructor, K9 Handler)
  - "The Pivot" — pull quote + military-to-construction narrative
- **Section 3: Stats Band** — 4 counters (20+ Years, 16+ Missions, $20M+ Budget, 500+ Soldiers Trained). 4-across desktop → 2x2 tablet → stacked mobile.
- **Section 4: Values** — "How We Build" with 3 cards (Operator-First Design, Single Source of Truth, Built to Ship). 3-col desktop → 2-col tablet → stacked mobile.
- **Section 5: CTA** — "Want to work with operators who've been in your boots?" + magnetic demo button

**Responsive critical rules for About page:**
- Bio splits to stacked layout at `< 1280px` (photo moves above text)
- Stats shift to 2x2 grid at `< 1280px`, single column at `< 768px`
- Values cards 2-col at `< 1280px`, single col at `< 768px`
- Photo parallax disabled on mobile, reduced to 0.05 on tablet
- Section padding: `12rem` desktop → `8rem` tablet → `4rem` mobile
- CTA button: auto-width desktop/tablet → full-width (`w-full`) mobile
- Heading bleed: slight left bleed on desktop, contained (no bleed) on tablet and mobile

**6c. Contact Page (`contact.astro`)** — Branch: `feat/contact-page`
- "Let's Talk" heading with kinetic reveal
- Demo request form: Name, Email, Company, Role, Message
- Form uses action endpoint from env var
- Magnetic submit button
- Contact info sidebar: email, phone, location

**6d. 404 Page (`404.astro`)** — Add to whichever interior page branch is last, or its own `feat/404-page` branch.
- Minimal dark page with "Lost on the jobsite?" heading
- Link back to home with `data-magnetic`
- Consistent with site design language

### Phase 7: Performance & Polish

**Git:** `git checkout -b perf/optimization` — Commit each optimization as a separate fix (e.g., `perf: subset fonts to Latin only`, `perf: optimize hero image loading`). Merge PR to main.

- Run Lighthouse on every page. Fix anything below 90 Performance / 95 Accessibility.
- Subset fonts to Latin characters only
- Verify all images use Astro `<Image>` or are manually optimized WebP
- Test page transitions: navigate between all pages 10+ times, monitor memory in devtools
- Verify `prefers-reduced-motion` gracefully disables all animations
- Verify custom cursor and magnetic effects disabled on touch devices
- Cross-browser test: Chrome, Firefox, Safari
- Responsive test: 375px, 768px, 1024px, 1440px, 1920px

### Phase 8: SEO & Meta

**Git:** `git checkout -b feat/seo-meta` — Merge PR to main when all meta tags, sitemap, and structured data are in place. This is the final merge — main is now the production-ready site.

- Add meta tags to each page (title, description, og:image)
- Generate sitemap.xml via Astro
- Add robots.txt
- Add structured data (Organization schema) to home page
- Page titles format: "[Page] | BuildLens — Construction Logistics Platform"

---

## Content Reference

Pull all BuildLens module descriptions and capabilities from `buildlens-suite-overview.md`. The 12 modules:

1. Project Dashboard
2. Purchase Order Management
3. Submittal Tracking
4. Equipment & Material Sourcing
5. Subcontractor Management
6. Bills of Materials (BOM)
7. Project Scheduling
8. Client & Contact Management (CRM)
9. Budget & Cost Tracking
10. Document Management
11. Reporting & Analytics
12. Notifications & Workflow Automation

For the hero, value prop, and CTA sections — the core messaging is:
- BuildLens replaces the patchwork of spreadsheets, email threads, shared drives, and disconnected tools
- Every module feeds the same underlying data layer — change in one place propagates everywhere
- Built from the ground up by people who have coordinated construction logistics in the field
- Single source of truth for project data

---

## Quality Gates

Before considering any phase complete, verify:

1. No Tailwind default colors used — only Rembrandt design tokens
2. No white/light/flat backgrounds — use depth tiers (`--bg-abyss` → `--bg-shelf`) and glass layers (`--glass-*`)
3. All animations use GSAP (not CSS transitions/animations for scroll effects)
4. All ScrollTrigger instances stored for cleanup
5. Page transitions don't leak memory
6. `prefers-reduced-motion` disables all motion AND listens for runtime changes
7. Custom cursor hidden on touch devices
8. Magnetic buttons: no transform on keyboard focus, focus ring visible, min 44x44px
9. Scroll reveal pre-animation state uses `opacity:0` + `transform` only (never `display:none` or `visibility:hidden`)
10. Counter final values present in DOM as text before JS executes
11. Marquee has `aria-hidden="true"` + `sr-only` static content for screen readers
12. All heading hierarchy valid (no skipped levels)
13. `<html lang="en">` present
14. GitHub Actions build check passes
15. Lighthouse Performance: 90+ (85+ acceptable at MVP gate)
16. No console errors or warnings in devtools
17. Git: each phase on its own branch, merged to main via PR — no direct commits to main after Phase 1
18. Git: atomic commits (one component/module per commit) — no phase-sized blobs
19. Git: `npm run build` passes before every commit

---

## What Success Looks Like

When someone loads this site, the first thing they should feel is: "this is premium." The kinetic typography should draw the eye. The custom cursor should make them move their mouse around just to see it react. The scroll should feel like silk. The magnetic buttons should be satisfying to hover. And by the time they reach the CTA, they should want to click it — not because of the copy, but because the entire experience communicated competence, precision, and craft.

That's the bar. Build to it.
