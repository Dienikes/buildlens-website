# BuildLens Marketing Website: Complete Product Specification

## Overview

**Name:** BuildLens Marketing Website

**One-Liner:** A premium, Awwwards-caliber marketing website that positions BuildLens as the modern standard for construction logistics management — built to convert visitors into demo requests.

**Core Problem:** BuildLens has no public-facing digital presence. Prospective clients (construction support firms, GCs, subcontractors) have no way to evaluate the platform, understand its value prop, or request a demo. The website needs to communicate "enterprise-grade product built by people who've actually coordinated construction logistics" — not another generic SaaS landing page.

---

## What This Website Does

1. Communicates BuildLens's value proposition through kinetic typography, scroll-driven storytelling, and immersive interaction design
2. Showcases all 12 platform modules with visual depth — not feature lists, but experiential sections that let visitors feel the product
3. Drives conversions to demo requests / contact forms with magnetic CTAs and scroll-triggered engagement
4. Establishes brand credibility through premium visual design language (Locomotive/Awwwards tier)
5. Performs at 90+ Lighthouse scores despite heavy animation — zero-JS baseline with progressive enhancement

---

## Target Audience

**Primary:** Decision-makers at construction support firms and general contractors (operations managers, PMs, company owners) evaluating construction management software.

**Secondary:** Subcontractors, architects, and owner's reps who interact with construction logistics teams and would recommend or require BuildLens.

**Design implication:** The site must feel high-end and professional — these are people evaluating enterprise software purchases, not browsing a consumer app. The interaction design should communicate technical sophistication without alienating non-technical construction professionals.

---

## Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Framework | Astro 5.x | Zero-JS baseline, direct DOM control, no Virtual DOM conflicts with GSAP. View Transitions API for page transitions |
| Scripting | Vanilla TypeScript in Astro `<script>` tags | Direct DOM manipulation for animations. No framework overhead. Islands only where absolutely necessary |
| Animation | GSAP 3.12+ with ScrollTrigger, SplitText | Industry standard for complex timelines, scroll-based interactions, and text reveals |
| Smooth Scroll | Lenis | Buttery-smooth scrolling physics, plays well with ScrollTrigger |
| Styling | Tailwind CSS 4.x + native CSS/SCSS | Tailwind for structural utility, native CSS for clip-paths, masking, typography scaling, and custom animations |
| Fonts | Self-hosted via @font-face | Performance — no external font requests. DM Sans (variable, geometric humanist sans) paired with JetBrains Mono for accent labels |
| Hosting | Vercel or Netlify | Auto-deploy from Git, edge CDN, zero config |
| Analytics | Vercel Analytics or Plausible | Privacy-first, minimal JS footprint |
| Forms | Netlify Forms or Formspree | Zero-backend form handling for demo requests |

**Monthly infrastructure cost:** $0-20 (hosting free tier + form service)

---

## Site Architecture

### Pages

| Page | Purpose | Priority |
|------|---------|----------|
| Home (`/`) | Hero + value prop + module showcase + social proof + CTA | P0 — build first |
| Platform (`/platform`) | Deep dive into all 12 modules with interactive sections | P1 |
| About (`/about`) | Founder bio, military-to-construction credibility narrative, company values | P2 |
| Contact (`/contact`) | Demo request form, contact details | P1 |

### Navigation

- Fixed nav bar with logo left, links right, CTA button far right
- Nav links: Platform, About, Contact
- CTA button: "Request Demo" (magnetic hover effect)
- Nav background transitions from transparent to dark on scroll
- Mobile: full-screen overlay menu with staggered text reveals

---

## Design System

### Color Palette — Rembrandt Chiaroscuro System

"You don't make things beautiful by making everything bright. You make things beautiful by controlling WHERE the light falls."

**Background depth tiers** — not a flat dark, but layered spatial depth:

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-abyss` | `#05060A` | Deepest background — outer page edges, footer |
| `--bg-deep` | `#08090E` | Primary page background |
| `--bg-mid` | `#0D1117` | Section backgrounds, card containers |
| `--bg-raised` | `#161B22` | Elevated surfaces — nav on scroll, modals |
| `--bg-shelf` | `#1C2128` | Highest surface — tooltips, dropdowns |
| `--bg-body` | `radial-gradient(ellipse at 30% 20%, #0D1117 0%, #08090E 50%, #05060A 100%)` | Body background — subtle vignette with off-center light source |

**Glass layers** — transparency creates the illusion of light hitting surfaces:

| Token | Value | Usage |
|-------|-------|-------|
| `--glass-01` | `rgba(255,255,255,0.01)` | Barely-there surface hint |
| `--glass-03` | `rgba(255,255,255,0.03)` | Default card background |
| `--glass-05` | `rgba(255,255,255,0.05)` | Hovered card background |
| `--glass-08` | `rgba(255,255,255,0.08)` | Active / selected state |
| `--glass-12` | `rgba(255,255,255,0.12)` | Maximum emphasis |

**Text** — warm gold tones, not clinical white:

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-lit` | `#E8E0D4` | Headings, primary text (warm parchment white) |
| `--text-mid` | `#8B8578` | Body text, descriptions |
| `--text-shadow` | `#4A4A52` | Captions, labels, metadata |
| `--text-deep` | `#2A2A30` | Decorative text only — never for meaningful content |

**Accent — Rembrandt Gold:**

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#F0E6D3` | Primary accent — CTAs, active states, hover indicators, nav logo highlight |
| `--accent-dim` | `#8B7D6B` | Muted accent for secondary elements |
| `--accent-glow` | `rgba(240,230,211,0.06)` | Subtle glow behind accent elements |
| `--accent-bg` | `rgba(240,230,211,0.08)` | Accent background for buttons, badges |
| `--accent-border` | `rgba(240,230,211,0.20)` | Accent border for CTAs and highlights |

**Borders** — glass-like edges, not hard lines:

| Token | Value | Usage |
|-------|-------|-------|
| `--border-subtle` | `rgba(255,255,255,0.04)` | Default borders |
| `--border-mid` | `rgba(255,255,255,0.06)` | Slightly emphasized |
| `--border-strong` | `rgba(255,255,255,0.08)` | Hover state borders |
| `--border-bright` | `rgba(255,255,255,0.12)` | Active / focus state borders |

**Shadows** — depth comes from darkness, not from borders:

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.3)` | Cards at rest |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.4)` | Elevated elements |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.5)` | Modals, dropdowns |
| `--shadow-glow` | `0 0 20px rgba(240,230,211,0.05)` | Accent glow effect |
| `--shadow-float` | `0 20px 60px rgba(0,0,0,0.6)` | Maximum elevation (hero elements) |

### Typography

**Primary font:** DM Sans — geometric humanist sans-serif. Warm but precise. Self-hosted woff2 (subset to Latin via `pyftsubset`).
**Monospace accent:** JetBrains Mono — for labels, data values, and code-style accents.

| Element | Font | Weight | Size (desktop) | Behavior |
|---------|------|--------|-----------------|----------|
| H1 (Hero) | DM Sans | 800 | `clamp(4rem, 10vw, 12rem)` | Bleeds off viewport edges, kinetic reveal, text-shadow glow |
| H2 (Section) | DM Sans | 800 | `clamp(2.5rem, 5vw, 6rem)` | Line-by-line clip reveal on scroll |
| H3 (Subsection) | DM Sans | 700 | `clamp(1.5rem, 3vw, 2.5rem)` | Fade up reveal |
| Body | DM Sans | 400-500 | `1rem / 1.125rem` | Standard, `--text-mid` color |
| Accent/Label | JetBrains Mono | 400-600 | `0.625rem-0.75rem` | Uppercase, letter-spaced 1.5-3px, `--text-shadow` color, `--accent` color for highlighted labels |
| Numbers/Stats | DM Sans | 800 | `clamp(3rem, 8vw, 8rem)` | Counter animation, `font-variant-numeric: tabular-nums`, accent color with `text-shadow: 0 0 40px var(--accent-glow)` |

### Spacing System

Use an 8px grid. Key spacing tokens: `--space-xs: 0.5rem`, `--space-sm: 1rem`, `--space-md: 2rem`, `--space-lg: 4rem`, `--space-xl: 8rem`, `--space-2xl: 12rem`, `--space-3xl: 16rem`.

Sections separated by massive whitespace (`--space-2xl` to `--space-3xl`). Let the content breathe.

---

## Layout Wireframes

These ASCII wireframes define the spatial architecture for key sections. Claude Code should match these proportions — they are not suggestions, they are the layout spec.

### Hero Section Wireframe (Desktop — 1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [LOGO]                    Platform   About   Contact   [Request Demo]  │  ← Nav (fixed)
│                                                                          │
│                                                                          │
│                                                                          │
│ ──────────────────────────────────┐                                      │
│  CONSTRUCTION                     │                                      │  ← Line 1 reveals first
│ ──────────────────────────────────┘                                      │    clamp(4rem, 10vw, 12rem)
│ ──────────────────────────────────────────┐                              │    Bleeds off LEFT edge
│  LOGISTICS. ONE                           │                              │  ← Line 2 reveals second
│ ──────────────────────────────────────────┘                              │    via negative margin-left
│ ──────────────────────────────────────────────────┐                      │
│  SOURCE OF TRUTH.                                 │                      │  ← Line 3 reveals third
│ ──────────────────────────────────────────────────┘                      │
│                                                                          │
│                                      ┌──────────────────────────────┐   │
│                                      │  BuildLens consolidates      │   │  ← Subtext: right-aligned
│                                      │  purchase orders, submittals,│   │    in the right 33% of
│                                      │  scheduling, and field       │   │    viewport. data-reveal="fade"
│                                      │  coordination into a single  │   │
│                                      │  operational hub.            │   │
│                                      └──────────────────────────────┘   │
│                                                                          │
│                                                   ┌─────────────────┐   │
│                                                   │  Request a Demo │   │  ← CTA: data-magnetic
│                                                   └─────────────────┘   │    bottom-right quadrant
│                              ↓ Scroll                                    │  ← Animated chevron
└──────────────────────────────────────────────────────────────────────────┘
```

### Value Proposition Wireframe (Desktop — 1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ┌─ 60% ──────────────────────────────────┐  ┌─ 40% ──────────────┐   │
│   │                                         │  │                     │   │
│   │  ○ THE PROBLEM                          │  │  ┌───────────────┐ │   │
│   │    (monospace, uppercase, accent)       │  │  │               │ │   │
│   │                                         │  │  │   Abstract    │ │   │  ← Visual overlaps
│   │  Spreadsheets.                          │  │  │   Visual /    │ │   │    the text column by
│   │  Email chains.                          │  │  │   Dashboard   │ │   │    ~5% (intentional)
│   │  Shared drives.                         │  │  │   Mockup      │ │   │
│   │  Hope.                                  │  │  │               │ │   │  ← data-parallax="0.15"
│   │    (each line reveals independently)    │  │  │  data-parallax│ │   │    on the visual
│   │                                         │  │  │               │ │   │
│   │  Body text about disconnected tools...  │  │  └───────────────┘ │   │
│   │                                         │  │                     │   │
│   │  ────────────────────                   │  │                     │   │  ← Horizontal rule
│   │  (width animates on scroll progress)    │  │                     │   │    animates 0% → 100%
│   │                                         │  │                     │   │
│   │  ○ THE SOLUTION                         │  │                     │   │
│   │    BuildLens positioning text...        │  │                     │   │
│   │                                         │  │                     │   │
│   └─────────────────────────────────────────┘  └─────────────────────┘   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Module Grid Wireframe (Desktop — 1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│   ┌──────────────────────────────────┐  ┌───────────────┐  ┌─────────┐ │
│   │                                   │  │               │  │         │ │
│   │     Project Dashboard             │  │  PO Mgmt      │  │ Submit- │ │
│   │     (2-col span, tall)            │  │  (1-col)      │  │  tals   │ │
│   │                                   │  │               │  │ (1-col) │ │
│   │                                   │  ├───────────────┤  │         │ │
│   │                                   │  │               │  ├─────────┤ │
│   ├──────────────────────────────────┤  │  Equipment    │  │         │ │
│   │                                   │  │  Sourcing     │  │ Sub-    │ │
│   │     BOMs                          │  │  (1-col,tall) │  │ contrac-│ │
│   │     (2-col span)                  │  │               │  │  tors   │ │
│   │                                   │  │               │  │ (1-col) │ │
│   ├───────────────┬──────────────────┤  ├───────────────┘  └─────────┤ │
│   │               │                   │                               │ │
│   │  Scheduling   │  CRM              │  ┌──────────────────────────┐ │ │
│   │  (1-col)      │  (1-col)          │  │                          │ │ │
│   │               │                   │  │  Budget & Cost Tracking  │ │ │
│   ├───────────────┴──────────────────┤  │  (2-col span)            │ │ │
│   │                                   │  │                          │ │ │
│   │  Document Management              │  ├──────────┬───────────────┤ │ │
│   │  (2-col span)                     │  │ Report-  │  Workflow     │ │ │
│   │                                   │  │  ing     │  Automation   │ │ │
│   └───────────────────────────────────┘  └──────────┴───────────────┘ │ │
│                                                                          │
│   Grid: grid-template-columns: repeat(4, 1fr)                           │
│   Cards span 1 or 2 columns. Row heights vary. Gap: 1.5rem.            │
│   NOT a uniform grid — rhythm is intentionally broken.                   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Navigation Wireframe (Desktop)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [BL]                         Platform   About   Contact   ┌───────────┐│
│  logo                         ← data-magnetic on each →    │Request    ││
│                                                             │Demo       ││
│                                                             └───────────┘│
│                                                              ↑ magnetic  │
│                                                              + accent bg │
└──────────────────────────────────────────────────────────────────────────┘
  Background: transparent → var(--bg-primary) + backdrop-blur on scroll
  Height: 80px desktop, 64px mobile
  z-index: 100
```

### Mobile Navigation (Overlay)

```
┌────────────────────────┐
│  [BL]            [✕]   │  ← Close button
│                        │
│                        │
│                        │
│    Platform             │  ← Staggered reveal
│                        │    (each link 0.1s delay)
│    About               │    Font: clamp(2rem, 6vw, 4rem)
│                        │
│    Contact              │
│                        │
│                        │
│    ┌──────────────┐    │
│    │ Request Demo │    │  ← data-magnetic
│    └──────────────┘    │
│                        │
│                        │
│    info@buildlens.com  │  ← Footer info in overlay
│    Madison, AL         │
└────────────────────────┘
  Background: var(--bg-primary)
  Full viewport: 100vw × 100vh
```

---

## Home Page Sections (Build Sequence)

### 1. Hero Section

**Layout:** Full viewport height. Monumental heading that bleeds off the left edge. Subtext aligned to the right third of the viewport. A single CTA button bottom-right with magnetic hover. (See wireframe above for exact spatial placement.)

**Content:**
- Heading: "Construction logistics. One source of truth." (split across 2-3 lines, each line reveals independently)
- Subtext: "BuildLens consolidates purchase orders, submittals, scheduling, and field coordination into a single operational hub. Built by operators, for operators."
- CTA: "Request a Demo" (magnetic button)
- Scroll indicator: animated chevron or "Scroll" text at bottom center

**Interactions:**
- Text reveals line-by-line using GSAP SplitText + clip-path (`y: 100%` behind `overflow: hidden` wrapper)
- Subtle parallax on a background texture or grid pattern
- Hero heading letters track mouse position slightly (parallax per character, very subtle — 2-5px max)

### 2. Marquee / Scrolling Text Band

**Layout:** Full-width horizontal scrolling text band. Two rows scrolling in opposite directions.

**Content:** Key phrases: "Purchase Orders", "Submittals", "Scheduling", "BOMs", "Subcontractor Management", "Budget Tracking", "Equipment Sourcing", "Document Control" — repeated infinitely.

**Interactions:**
- Infinite horizontal scroll using GSAP horizontal tween
- Speed increases slightly on mouse hover
- Text is semi-transparent, accent color on hover per word
- Slight vertical offset between rows creates depth

### 3. Value Proposition / Problem-Solution

**Layout:** Split asymmetric — large text block on left (60%), visual element on right (40%) with intentional overlap.

**Content:**
- "The Problem" label (monospace, uppercase, accent color)
- Heading: "Spreadsheets. Email chains. Shared drives. Hope."
- Body: 2-3 sentences about the patchwork of disconnected tools construction teams rely on
- Transition to "The Solution" with BuildLens positioning

**Interactions:**
- Text elements reveal on scroll (line-by-line clip reveal)
- Right-side visual has parallax offset from its container
- A subtle horizontal rule animates its width on scroll progress

### 4. Module Showcase Grid

**Layout:** Asymmetric CSS Grid. Mix of large feature cards (spanning 2 columns) and smaller cards. Not a standard 3-column grid — intentionally break the rhythm.

**Content:** Feature each of the 12 BuildLens modules:
- Project Dashboard, PO Management, Submittal Tracking, Equipment Sourcing, Subcontractor Management, BOMs, Scheduling, CRM, Budget & Cost, Document Management, Reporting, Workflow Automation

Each card shows: module icon/visual, module name, one-sentence description.

**Interactions:**
- Cards reveal staggered on scroll (GSAP stagger with `y: 60`, `opacity: 0` → visible)
- Each card has a hover state: slight scale (`1.02`), border glow with accent color, and cursor expands to show "Explore"
- Clicking a card navigates to the `/platform` page anchored to that module section

### 5. Stats / Numbers Band

**Layout:** Full-width band with 3-4 large statistics in a horizontal row.

**Content:**
- "12 integrated modules"
- "100% data propagation across modules"
- "Zero double-entry"
- "One source of truth"

**Interactions:**
- Numbers count up from 0 on scroll enter using GSAP counter
- Each stat has a subtle parallax offset
- Background shifts from primary to slightly lighter

### 6. Platform Preview / Visual Section

**Layout:** Full-width section with a large product screenshot in a browser-chrome frame (3 dots + URL bar). Image sits in a container with rounded corners, subtle border glow, and `--shadow-xl`.

**Content:** The **Schedule & Gantt View** screenshot (`src/assets/images/screenshot-gantt.png`) serves as the hero product shot. This is the flagship view showing: 4 stat cards (Milestones 8/12, Schedule Variance -2 days, Blocked Activities 2, Float Remaining 6 days), task list with 8 construction activities, color-coded Gantt bars (complete/green, in-progress/blue, at-risk/amber, blocked/red), and a red TODAY line. Below the main screenshot, 3 thumbnail previews (Dashboard, Pipeline, RFI) appear in a horizontal row.

**Available Screenshots** (all in `src/assets/images/`):
- `screenshot-gantt.png` — Schedule & Gantt View (hero shot)
- `screenshot-dashboard.png` — Project Dashboard (Baghdad Training Facility, budget/schedule/RFI/submittal/inspection/change order cards, activity feed, milestone progress)
- `screenshot-pipeline.png` — Pursuit Pipeline Board (5-column Kanban: Identified → Evaluating → Go → Proposal In Progress → Submitted, with $44M pipeline value)
- `screenshot-rfi.png` — RFI & Submittal Tracker (table with status pills, filter bar, 6 RFIs with priority/assignee/due date)

**Interaction: 3D Perspective-Shift Carousel (scroll-driven)**

This section is pinned via GSAP ScrollTrigger. The user scrolls through all 4 product screenshots within a single viewport-height section. Total scroll distance: 400vh. Each screenshot gets 100vh of scroll.

Transition sequence (per screenshot swap):
- Exiting card: `rotateY(0 → 8deg)`, `scale(1 → 0.92)`, `filter: blur(0 → 4px)`, `opacity: 1 → 0`
- Entering card: `rotateY(-8deg → 0)`, `scale(0.92 → 1)`, `filter: blur(4px → 0)`, `opacity: 0 → 1`
- Caption text exits first (y: 0 → -30, fade out), enters after screenshot settles (y: 30 → 0, fade in, staggered heading/body)
- Container: `perspective: 1200px`

Parallax depth within each card: browser-chrome frame at 1x scroll, screenshot content at 0.85x (floating-UI effect).

Progress indicator: 4 dots at bottom, active dot uses `--accent` with glow, inactive uses `--border-semi`.

Screenshot order with captions:
1. "Master Your Schedule" — Gantt View
2. "Command Your Project" — Dashboard
3. "Own Your Pipeline" — Pipeline Board
4. "Track Every Detail" — RFI Tracker

**Reduced motion:** Skip pin and 3D. Show all 4 stacked vertically with simple fade reveals.
**Touch/mobile:** Disable 3D rotations. Use opacity-only crossfade. Reduce scroll to 300vh.

### 7. Testimonial / Social Proof

**Layout:** Large quote, centered, with attribution below. Minimal.

**Content:** Placeholder testimonial from a construction PM or operations manager.

**Interactions:**
- Quote text reveals word-by-word or line-by-line
- Attribution fades in after quote completes

### 8. CTA Section

**Layout:** Full-width, large heading centered, CTA button below.

**Content:**
- Heading: "Ready to see it in action?"
- CTA: "Request a Demo" (magnetic button, larger than nav CTA)
- Secondary link: "Or reach out directly" → contact page

**Interactions:**
- Heading reveals on scroll
- CTA button magnetic hover with expanded cursor
- Subtle background gradient shift or noise texture

### 9. Footer

**Layout:** Full-width, dark. Logo left, nav links center, contact info right.

**Content:** Logo, nav links (Platform, About, Contact), email, phone, "Madison, AL" location.

---

## About Page (`/about`) — Full Specification

### Page Purpose

This page is the credibility engine. Construction industry decision-makers evaluate vendors partly on whether the people behind the product actually understand their world. The About page answers: "Who built this and why should I trust them?" The answer — a retired Special Forces logistics operator who coordinated $20M+ budgets across 16+ missions before moving into construction — is a stronger story than most SaaS founders can tell. Lean into it.

### About Page Wireframe (Desktop — 1440px)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [NAV]                                                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                                                                          │
│  SECTION 1: HERO                                                         │
│                                                                          │
│   BUILT BY                                                               │  ← data-reveal="lines"
│   OPERATORS.                                                             │    clamp(3rem, 8vw, 10rem)
│                                                                          │    Left-aligned, bleeds slightly
│                                                                          │
│   ○ OUR STORY  (monospace label, accent)                                │
│   Body text: 2-3 sentences — "BuildLens wasn't designed in             │  ← data-reveal="fade"
│   a conference room. It was built from two decades of                    │
│   coordinating logistics under pressure..."                              │
│                                                                          │
│   ─────────────────────────── (rule, animates width)                    │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SECTION 2: FOUNDER BIO                                                  │
│                                                                          │
│   ┌─ 55% ─────────────────────────────┐  ┌─ 45% ──────────────────┐   │
│   │                                     │  │                        │   │
│   │  TIM ROLLINS                        │  │  ┌──────────────────┐ │   │
│   │  Founder & CEO                      │  │  │                  │ │   │
│   │  (data-reveal="lines")              │  │  │  Professional    │ │   │  ← Photo container
│   │                                     │  │  │  headshot or     │ │   │    aspect-ratio: 3/4
│   │  ○ BACKGROUND  (label)              │  │  │  placeholder     │ │   │    rounded-lg
│   │                                     │  │  │                  │ │   │    data-parallax="0.1"
│   │  20+ years U.S. Army, 16 with      │  │  │                  │ │   │
│   │  1st Special Forces Group.          │  │  └──────────────────┘ │   │
│   │  Managed logistics for a 200-person │  │                        │   │
│   │  special operations task force —    │  │                        │   │
│   │  $20M budget, 16+ combat missions. │  │                        │   │
│   │                                     │  │                        │   │
│   │  ○ CREDENTIALS  (label)             │  │                        │   │
│   │                                     │  │                        │   │
│   │  [Credential pills/tags]            │  │                        │   │
│   │                                     │  │                        │   │
│   │  ○ THE PIVOT  (label)               │  │                        │   │
│   │                                     │  │                        │   │
│   │  "Same complexity. Same stakes.     │  │                        │   │
│   │  Different mission."                │  │                        │   │
│   │  Body text about military →         │  │                        │   │
│   │  construction transition...         │  │                        │   │
│   │                                     │  │                        │   │
│   └─────────────────────────────────────┘  └────────────────────────┘   │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SECTION 3: BY THE NUMBERS (stats band)                                  │
│                                                                          │
│   20+            16+            $20M+           500+                     │
│   Years Active   Combat         Budget          Soldiers                │
│   Duty           Missions       Managed         Trained                 │
│   (counter)      (counter)      (counter)       (counter)               │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SECTION 4: VALUES / APPROACH                                            │
│                                                                          │
│   HOW WE BUILD                                                           │
│   (data-reveal="lines")                                                  │
│                                                                          │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐     │
│   │ Operator-First   │  │ Single Source     │  │ Built to Ship    │     │
│   │ Design           │  │ of Truth          │  │                  │     │
│   │                  │  │                  │  │                  │     │
│   │ Every feature    │  │ Change it once,  │  │ 80% now beats    │     │
│   │ exists because   │  │ it propagates    │  │ 100% never.      │     │
│   │ an operator      │  │ everywhere.      │  │ We ship fast,    │     │
│   │ needed it in     │  │ No double-entry. │  │ iterate faster.  │     │
│   │ the field.       │  │ No drift.        │  │                  │     │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘     │
│   (data-reveal="stagger")                                                │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SECTION 5: CTA                                                          │
│                                                                          │
│   Want to work with operators                                            │
│   who've been in your boots?                                             │
│                                                                          │
│   [Request a Demo]  (data-magnetic)                                      │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│  [FOOTER]                                                                │
└──────────────────────────────────────────────────────────────────────────┘
```

### About Page Wireframe (Tablet — 768px)

```
┌────────────────────────────────────────┐
│  [NAV]                                  │
├────────────────────────────────────────┤
│                                        │
│  BUILT BY                              │  ← Same heading, smaller
│  OPERATORS.                            │    clamp scales down
│                                        │
│  Story text...                         │
│                                        │
├────────────────────────────────────────┤
│                                        │
│  ┌──────────────────────────────────┐ │  ← Photo moves ABOVE bio
│  │                                   │ │    on tablet (stacks)
│  │     Professional headshot         │ │    aspect-ratio: 16/9 crop
│  │     or placeholder                │ │    max-height: 400px
│  │                                   │ │    object-fit: cover
│  └──────────────────────────────────┘ │
│                                        │
│  TIM ROLLINS                           │
│  Founder & CEO                         │
│                                        │
│  ○ BACKGROUND                          │
│  Bio text full width...                │
│                                        │
│  ○ CREDENTIALS                         │
│  [Tags wrap to 2-3 rows]              │
│                                        │
│  ○ THE PIVOT                           │
│  Transition text...                    │
│                                        │
├────────────────────────────────────────┤
│                                        │
│  20+        16+                        │  ← Stats: 2x2 grid
│  Years      Missions                   │    instead of 4-across
│                                        │
│  $20M+      500+                       │
│  Budget     Soldiers                   │
│                                        │
├────────────────────────────────────────┤
│                                        │
│  HOW WE BUILD                          │
│                                        │
│  ┌──────────┐  ┌──────────┐           │  ← Values: 2-col grid
│  │ Operator  │  │ Single   │           │    third card drops
│  │ First     │  │ Source   │           │    to next row, centered
│  └──────────┘  └──────────┘           │
│       ┌──────────┐                     │
│       │ Built to │                     │
│       │ Ship     │                     │
│       └──────────┘                     │
│                                        │
├────────────────────────────────────────┤
│  CTA + FOOTER                          │
└────────────────────────────────────────┘
```

### About Page Wireframe (Mobile — 375px)

```
┌──────────────────────┐
│  [NAV — hamburger]    │
├──────────────────────┤
│                      │
│  BUILT BY            │  ← Heading scales down
│  OPERATORS.          │    clamp hits lower bound
│                      │    NO left-edge bleed
│  Story text...       │    on mobile (contained)
│                      │
├──────────────────────┤
│                      │
│  ┌──────────────────┐│  ← Photo: full width
│  │                  ││    aspect-ratio: 4/3
│  │   Headshot       ││    max-height: 300px
│  │                  ││
│  └──────────────────┘│
│                      │
│  TIM ROLLINS         │
│  Founder & CEO       │
│                      │
│  ○ BACKGROUND        │
│  Bio text...         │  ← Full width, single col
│                      │
│  ○ CREDENTIALS       │
│  [Tags wrap freely]  │
│                      │
│  ○ THE PIVOT         │
│  Transition text...  │
│                      │
├──────────────────────┤
│                      │
│  20+                 │  ← Stats: single column
│  Years Active Duty   │    stacked vertically
│                      │    with dividers between
│  16+                 │
│  Combat Missions     │
│                      │
│  $20M+               │
│  Budget Managed      │
│                      │
│  500+                │
│  Soldiers Trained    │
│                      │
├──────────────────────┤
│                      │
│  HOW WE BUILD        │
│                      │
│  ┌──────────────────┐│  ← Values: single column
│  │ Operator-First   ││    stacked
│  │ Design           ││
│  └──────────────────┘│
│  ┌──────────────────┐│
│  │ Single Source    ││
│  │ of Truth         ││
│  └──────────────────┘│
│  ┌──────────────────┐│
│  │ Built to Ship    ││
│  └──────────────────┘│
│                      │
├──────────────────────┤
│  CTA                 │
│  [Request a Demo]    │  ← Full-width button
├──────────────────────┤
│  FOOTER              │
└──────────────────────┘
```

### About Page Content (Real Copy)

#### Section 1: Hero

**Heading:** "Built by Operators."

**Body:** "BuildLens wasn't designed in a conference room. It was built from two decades of coordinating logistics under pressure — moving people, equipment, and materials where they needed to be, when they needed to be there. The construction industry runs on the same operational complexity. We built the platform we wished we had."

#### Section 2: Founder Bio

**Name:** Tim Rollins

**Title:** Founder & CEO

**Photo:** Use `Tim Rollins BIO image.png` from the project assets. This is a professional circular-crop headshot (navy blazer, grey background). For the website, display it as follows:
- Place the original file in `src/assets/images/tim-rollins.png`
- Use Astro `<Image>` component for automatic WebP optimization
- Desktop: aspect-ratio 3:4 container, `object-fit: cover`, `object-position: center top` (frame from shoulders up), `rounded-lg`
- Tablet: full-width, aspect-ratio 16:9 crop, `max-height: 400px`, `object-fit: cover`, `object-position: center top`
- Mobile: full-width, aspect-ratio 4:3, `max-height: 300px`, `object-fit: cover`, `object-position: center top`
- The existing circular crop in the source image works well — the site can either maintain the circle or use a rounded rectangle. Rounded rectangle (`rounded-lg`) fits the site's design language better.
- Alt text: `"Tim Rollins, Founder and CEO of BuildLens"`
- `loading="lazy"` (below the fold on About page)

**Background subsection:**
"Retired U.S. Army Green Beret with 20+ years of active duty service, including 16 years with 1st Special Forces Group (Airborne). Served as the logistics lead for a 200-person special operations task force — managing a $20M+ budget across 16 combat missions in high-stakes, time-critical environments. Every mission depended on the same thing construction projects depend on: the right materials, at the right place, at the right time, with zero margin for error."

**Credentials subsection:**
Display as horizontal tag/pill elements (styled with `--bg-surface` background, `--border` border, `--text-secondary` text, rounded-full):

- B.S. Global Security & Management (Honors)
- SAP ERP Certified
- Project Management Certified
- OSHA 30
- Active TS/SCI Clearance
- Army Demolitions Instructor
- K9 Handler (Explosives Detection)

**The Pivot subsection:**

**Pull quote:** "Same complexity. Same stakes. Different mission."

**Body:** "After retiring from the Army, the transition into construction logistics was immediate — the operational DNA is identical. Purchase orders are supply requisitions. Submittals are mission briefings. Scheduling is movement planning. But where military operations run on integrated C2 systems, construction teams are still stitching together spreadsheets, email threads, and shared drives. BuildLens exists because that gap shouldn't exist."

#### Section 3: Stats Band

| Number | Label | data-target |
|--------|-------|-------------|
| 20+ | Years Active Duty | 20 |
| 16+ | Combat Missions Led | 16 |
| $20M+ | Budget Managed | 20 |
| 500+ | Soldiers Trained | 500 |

Use `data-reveal="counter"` on each number. The "+" and "$" are static text flanking the animated number.

#### Section 4: Values / Approach

**Heading:** "How We Build"

Three value cards:

**Card 1 — "Operator-First Design"**
"Every feature in BuildLens exists because an operator needed it in the field. No bloat. No features built for demo slides. If it doesn't solve a real coordination problem, it doesn't ship."

**Card 2 — "Single Source of Truth"**
"Change a PO number in one place, it propagates to every submittal, BOM, schedule, and budget line that references it. No double-entry. No version drift. No 'which spreadsheet is current?'"

**Card 3 — "Built to Ship"**
"80% now beats 100% never. We ship fast, iterate based on real operator feedback, and treat every deployment as a starting point — not a finish line."

#### Section 5: CTA

**Heading:** "Want to work with operators who've been in your boots?"

**CTA Button:** "Request a Demo" — `data-magnetic`, `data-cursor="action"`

**Secondary:** "Or reach out directly →" link to `/contact`

### About Page Responsive Breakpoints

| Element | Desktop (≥1280px) | Tablet (768-1279px) | Mobile (<768px) |
|---------|-------------------|---------------------|-----------------|
| Hero heading | `clamp(3rem, 8vw, 10rem)`, slight left-edge bleed | `clamp(2.5rem, 6vw, 5rem)`, no bleed | `clamp(2rem, 8vw, 3rem)`, no bleed, contained |
| Bio layout | 55/45 split (text left, photo right) | Stacked — photo on top, full width (16:9 crop, max-h 400px), text below full width | Stacked — photo full width (4:3, max-h 300px), text below |
| Credential tags | Single row, horizontal scroll if needed | 2-3 rows, wrapping | Free wrap, full width |
| Stats band | 4-across horizontal row | 2x2 grid | Single column, stacked with dividers |
| Values cards | 3-column grid, equal width | 2-column grid, third card centered below | Single column stack |
| CTA button | Auto-width, centered | Auto-width, centered | Full-width (`w-full`) |
| Section padding | `--space-2xl` (12rem) vertical | `--space-xl` (8rem) vertical | `--space-lg` (4rem) vertical |
| Photo parallax | `data-parallax="0.1"` active | `data-parallax="0.05"` (reduced) | Disabled |

### About Page Interactions

| Element | Animation | Trigger |
|---------|-----------|---------|
| "Built by Operators" heading | Line-by-line clip reveal | `data-reveal="lines"`, on page load (not scroll — it's the first thing visible) |
| Story body text | Fade up | `data-reveal="fade"`, start: "top 85%" |
| Horizontal rule | Width animates 0% → 100% | ScrollTrigger, scrub tied to scroll progress through Section 1 |
| "TIM ROLLINS" name | Line reveal | `data-reveal="lines"` |
| Bio subsection text | Fade up per subsection | `data-reveal="fade"`, staggered per ○-labeled block |
| Photo container | Scale from 0.97 to 1 + opacity 0 to 1 | ScrollTrigger, start: "top 80%" |
| Credential tags | Stagger reveal left to right | `data-reveal="stagger"`, stagger: 0.08 |
| Pull quote | Line-by-line reveal | `data-reveal="lines"` |
| Stats numbers | Counter animation | `data-reveal="counter"` with `data-target` |
| Values cards | Stagger reveal | `data-reveal="stagger"`, stagger: 0.15 |
| CTA heading | Line reveal | `data-reveal="lines"` |

---

## Interaction Systems (Reusable Utilities)

### 1. Custom Cursor (`cursor.ts`)

```
- Hide default cursor via CSS (`cursor: none` on `html`)
- Create two div elements: outer circle (30px) and inner dot (8px)
- Position with `position: fixed`, `pointer-events: none`, `z-index: 9999`
- Outer circle follows mouse with GSAP `quickTo` (duration: 0.5, ease: power3)
- Inner dot follows with shorter delay (duration: 0.15)
- Hover states:
  - Over clickable elements ([data-cursor="pointer"]): outer circle scales to 60px, background becomes accent with 20% opacity
  - Over text links ([data-cursor="text"]): cursor morphs to vertical bar
  - Over CTA buttons ([data-cursor="action"]): outer circle expands to 80px, shows "View" or "Explore" text
  - Default: outer circle border only (1px accent), inner dot solid accent
- Hide cursor when it leaves the viewport
- Disable entirely on touch devices (check `matchMedia('(hover: hover)')`)
```

### 2. Magnetic Buttons (`magnetic.ts`)

```
- Select all elements with [data-magnetic] attribute
- POINTER INTERACTION ONLY:
  - On pointermove (NOT mousemove — pointermove excludes touch by default on most setups,
    but also guard with matchMedia('(hover: hover)'))
  - Within a 100px radius of the element center:
    - Calculate distance from cursor to element center
    - Apply GSAP transform to element: translate toward cursor position
    - Strength = 0.3 * (1 - distance/radius) — stronger pull when closer
  - On pointerleave: GSAP tween element back to original position (duration: 0.6, ease: elastic.out)
- KEYBOARD FOCUS HANDLING (CRITICAL):
  - On focus (keyboard tab): do NOT apply any magnetic transform
  - Show clear focus ring: outline 2px solid var(--accent), outline-offset 4px
  - If element is mid-magnetic-transform when it receives focus: snap to (0,0) immediately (duration: 0)
  - On blur: remove focus ring, element stays at rest position
- GUARD RAILS:
  - All [data-magnetic] elements must be minimum 44x44px (WCAG 2.5.5 target size)
  - Magnetic pull must not cause element to overlap adjacent interactive elements
  - Disable entirely on touch devices (matchMedia('(hover: hover)'))
- destroy(): remove all event listeners, reset all transforms to (0,0)
```

### 3. Scroll Reveal (`reveal.ts`)

```
- Select all elements with [data-reveal] attribute
- For [data-reveal="lines"]:
  - Use GSAP SplitText to split into lines
  - Wrap each line in an overflow:hidden container
  - On scroll enter (ScrollTrigger, start: "top 85%"):
    - Animate each line: y: 100% → y: 0, duration: 1, stagger: 0.1, ease: power4.out
- For [data-reveal="fade"]:
  - Animate: opacity: 0 → 1, y: 40 → 0, duration: 0.8, ease: power3.out
- For [data-reveal="stagger"]:
  - Animate children: opacity: 0 → 1, y: 60 → 0, stagger: 0.15, ease: power3.out
- For [data-reveal="counter"]:
  - Animate number from 0 to data-target value using GSAP snap
```

### 4. Parallax (`parallax.ts`)

```
- Select all elements with [data-parallax] attribute
- data-parallax="0.2" means the element moves at 20% of scroll speed relative to container
- Use ScrollTrigger to create a yPercent tween based on scroll position
- For images inside containers: image has a slight scale (1.15) and translates within its overflow:hidden container
```

### 5. Marquee (`marquee.ts`)

```
- Duplicate content to fill 2x viewport width
- GSAP horizontal tween: x from 0 to -50% of total width, repeat: -1, ease: none
- Speed controlled by duration (default: 20s for full cycle)
- Reverse direction option via data attribute
- Pause on visibility change (IntersectionObserver)
```

---

## Page Transition System

```
- Use Astro View Transitions API
- On page exit: current page content fades out (opacity: 1 → 0, duration: 0.4)
- On page enter: new page content fades in with slight y offset (opacity: 0 → 1, y: 20 → 0, duration: 0.6)
- CRITICAL: All GSAP ScrollTrigger instances and Lenis must be destroyed on page exit and reinitialized on page enter
- Use astro:page-load and astro:before-swap events for lifecycle management
- Kill all GSAP tweens and ScrollTriggers in a cleanup function before transition
```

---

## File Structure

```
buildlens-website/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # HTML shell, font loading, global styles, Lenis init
│   ├── pages/
│   │   ├── index.astro               # Home page — assembles all home sections
│   │   ├── platform.astro            # Platform deep dive
│   │   ├── about.astro               # About / team page
│   │   ├── contact.astro             # Contact / demo request form
│   │   └── 404.astro                # Custom 404 page
│   ├── components/
│   │   ├── Nav.astro                 # Navigation bar
│   │   ├── Footer.astro              # Site footer
│   │   ├── Cursor.astro              # Custom cursor markup
│   │   ├── Hero.astro                # Hero section
│   │   ├── Marquee.astro             # Scrolling text band
│   │   ├── ValueProp.astro           # Problem/solution section
│   │   ├── ModuleGrid.astro          # Module showcase grid
│   │   ├── Stats.astro               # Statistics band
│   │   ├── PlatformPreview.astro     # Dashboard mockup section
│   │   ├── Testimonial.astro         # Social proof section
│   │   ├── CTASection.astro          # Bottom CTA
│   │   └── MagneticButton.astro      # Reusable magnetic button component
│   ├── scripts/
│   │   ├── cursor.ts                 # Custom cursor logic
│   │   ├── magnetic.ts               # Magnetic button interactions
│   │   ├── reveal.ts                 # Scroll reveal animations
│   │   ├── parallax.ts               # Parallax effects
│   │   ├── marquee.ts                # Infinite scroll marquee
│   │   ├── lenis.ts                  # Lenis smooth scroll init + ScrollTrigger sync
│   │   ├── nav.ts                    # Nav scroll behavior + mobile menu
│   │   └── init.ts                   # Master initialization — orchestrates all scripts, handles page transitions
│   ├── styles/
│   │   ├── global.css                # CSS variables, resets, typography, cursor styles
│   │   ├── animations.css            # Keyframe animations, clip-path utilities
│   │   └── fonts.css                 # @font-face declarations
│   └── assets/
│       ├── fonts/                    # Self-hosted font files (woff2)
│       └── images/                   # Optimized images, SVG icons
├── public/
│   ├── favicon.svg
│   └── og-image.png                  # Social sharing image
├── astro.config.mjs                  # Astro config — ViewTransitions, Tailwind integration
├── tailwind.config.mjs               # Tailwind theme extension with design tokens
├── tsconfig.json
├── package.json
└── .env.example                      # Form endpoint URL, analytics ID
```

---

## Build Sequence

| Phase | Deliverable | Estimated Time |
|-------|-------------|----------------|
| 1 | Project scaffold — Astro + Tailwind + GSAP + Lenis installed. BaseLayout with font loading, CSS variables, Lenis init. Empty page shells. CI pipeline (`astro build` check via GitHub Actions). | Day 1 |
| 2 | Custom cursor system — cursor.ts fully functional with hover states. Cursor.astro component. | Day 1-2 |
| 3 | Scroll reveal utility — reveal.ts with all reveal types (lines, fade, stagger, counter). Tested standalone. | Day 2 |
| 4 | Magnetic button utility — magnetic.ts functional. MagneticButton.astro component. | Day 2 |
| 5 | Navigation — Nav.astro with scroll-triggered background, mobile menu, magnetic links. | Day 3 |
| 6 | Hero section — Full hero with kinetic type, line reveals, parallax background, CTA. | Day 3-4 |
| 7 | Marquee section — Infinite scroll, dual direction, hover speed change. | Day 4 |
| 8 | Value proposition section — Asymmetric layout, text reveals, parallax visual. | Day 4-5 |
| 9 | Module grid — Asymmetric CSS Grid, staggered reveals, hover states with cursor expansion. | Day 5-6 |
| 10 | Stats band — Counter animations, parallax offsets. | Day 6 |
| 11 | Platform preview — Image parallax, scale reveal, clip-path mask. | Day 6 |
| 12 | Testimonial + CTA + Footer — Complete remaining home sections. | Day 7 |
| 13 | Page transitions — Astro View Transitions with GSAP/Lenis lifecycle management. | Day 7-8 |

### >>> MVP GATE — STOP HERE AND DEPLOY <<<

After Phase 13, deploy the Home page to Vercel. This is a fully functional single-page marketing site with all interaction systems working. Review it live, iterate on timing/spacing/feel, get feedback. Do NOT proceed to interior pages until the Home page feels right. Everything after this is additive.

**MVP Deployment Checklist:**
- [ ] Home page loads with all 8 sections rendering correctly
- [ ] Custom cursor, magnetic buttons, scroll reveals all functional on desktop
- [ ] Touch devices: cursor disabled, magnetic disabled, content still accessible
- [ ] `prefers-reduced-motion`: all animations disabled, content visible statically
- [ ] Page weight: < 500KB initial load (excluding images)
- [ ] Lighthouse Performance: 85+ (90+ target comes in Phase 16)
- [ ] No console errors
- [ ] Vercel deploy succeeds from main branch

| Phase | Deliverable | Estimated Time |
|-------|-------------|----------------|
| 14 | Platform page — Module deep-dive sections with scroll-driven storytelling. | Day 8-10 |
| 15 | About + Contact pages — Team narrative, demo request form. | Day 10-11 |
| 16 | Performance pass — Lighthouse audit, image optimization, font subsetting, animation performance. Target 90+ all categories. | Day 11-12 |
| 17 | Responsive pass — Mobile/tablet breakpoints for all sections and interactions. Touch device cursor disable. | Day 12-13 |
| 18 | Polish — Micro-interactions, timing refinement, cross-browser testing. | Day 13-14 |

---

## Performance Requirements

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Total JS bundle (excluding GSAP): < 50KB gzipped
- All images: WebP/AVIF with proper srcset and lazy loading
- Fonts: woff2 only, subset to Latin characters, preloaded
- GSAP ScrollTrigger: use `will-change: transform` sparingly, only on actively animating elements
- Lenis: `raf` mode synced with GSAP ticker, not double-requestAnimationFrame

---

## Accessibility Requirements (WCAG 2.1 AA)

**Compliance target:** WCAG 2.1 Level AA. This is not optional — it's the standard for commercial websites and protects against legal exposure.

### Core Requirements

- All interactive elements keyboard navigable (Tab, Enter, Space, Escape)
- Skip-to-content link as first focusable element in BaseLayout
- ARIA labels on custom cursor (hidden from accessibility tree via `aria-hidden="true"`)
- Semantic HTML throughout: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<header>`
- Heading hierarchy: one `<h1>` per page, no skipped levels (H1 → H2 → H3, never H1 → H3)
- Form inputs: visible `<label>` elements (not just placeholder text), `aria-describedby` for error messages, `aria-required` for required fields
- Alt text on all images (decorative images get `alt=""` and `role="presentation"`)
- Language attribute: `<html lang="en">`

### Reduced Motion (Critical)

```
@media (prefers-reduced-motion: reduce) {
  /* All GSAP animations: disabled entirely, content shown in final state */
  /* Lenis smooth scroll: disabled, native scroll restored */
  /* Custom cursor: disabled, native cursor restored */
  /* Marquee: stopped, shows static content */
  /* Parallax: disabled, elements at rest position */
  /* Scroll reveals: content visible immediately, no animation */
}
```

Implementation: `init.ts` checks `window.matchMedia('(prefers-reduced-motion: reduce)')` BEFORE initializing any animation module. If true, skip all animation inits. Also listen for changes (user can toggle mid-session): `mediaQuery.addEventListener('change', callback)`.

### Magnetic Buttons & Focus States (Critical Interaction)

Magnetic buttons create a specific accessibility problem: the visual transform pulls the button away from its DOM position, which can confuse keyboard users and break the visual connection between focus indicator and element.

**Rules for magnetic.ts:**
- Magnetic transform ONLY activates on `pointermove` events (mouse/trackpad)
- On `focus` (keyboard navigation): NO magnetic transform. Element stays at its DOM position.
- On `focus`: show a clear focus ring — `outline: 2px solid var(--accent); outline-offset: 4px;`
- On `blur`: remove focus ring normally
- When magnetic transform is active and element receives `focus`: immediately snap back to (0,0) position (GSAP duration: 0, no elastic ease)
- `[data-magnetic]` elements must have minimum touch/click target of 44x44px (WCAG 2.5.5)
- The magnetic pull radius (100px) must NOT cause the element to overlap or occlude adjacent interactive elements

### Color Contrast

All text/background combinations must meet WCAG AA contrast ratios. The Rembrandt palette was designed with contrast as a first-class concern:

| Combination | Ratio | Status |
|-------------|-------|--------|
| `--text-lit` (#E8E0D4) on `--bg-abyss` (#05060A) | 15.5:1 | Pass (AAA) |
| `--text-lit` (#E8E0D4) on `--bg-deep` (#08090E) | 15.2:1 | Pass (AAA) |
| `--text-lit` (#E8E0D4) on `--bg-mid` (#0D1117) | 14.5:1 | Pass (AAA) |
| `--text-lit` (#E8E0D4) on `--bg-raised` (#161B22) | 13.2:1 | Pass (AAA) |
| `--text-lit` (#E8E0D4) on `--bg-shelf` (#1C2128) | 12.4:1 | Pass (AAA) |
| `--text-mid` (#8B8578) on `--bg-abyss` (#05060A) | 5.5:1 | Pass (AA) |
| `--text-mid` (#8B8578) on `--bg-deep` (#08090E) | 5.4:1 | Pass (AA) |
| `--text-mid` (#8B8578) on `--bg-mid` (#0D1117) | 5.2:1 | Pass (AA) |
| `--accent` (#F0E6D3) on `--bg-abyss` (#05060A) | 16.4:1 | Pass (AAA) |
| `--accent` (#F0E6D3) on `--bg-deep` (#08090E) | 16.1:1 | Pass (AAA) |
| `--accent` (#F0E6D3) on `--bg-mid` (#0D1117) | 15.3:1 | Pass (AAA) |
| `--accent-dim` (#8B7D6B) on `--bg-deep` (#08090E) | 5.0:1 | Pass (AA) |
| `--text-shadow` (#4A4A52) on `--bg-abyss` (#05060A) | 2.3:1 | FAIL — decorative text only |
| `--text-shadow` (#4A4A52) on `--bg-deep` (#08090E) | 2.3:1 | FAIL — decorative text only |

**Rules:**
- `--text-shadow` is ONLY for decorative labels, section dividers, and metadata that is also communicated through other means (not as the sole source of information)
- `--accent` (#F0E6D3) is safe for ANY text size on ANY background tier — 15.3:1 minimum
- Body text uses `--text-mid` which passes AA on all background tiers
- Headings use `--text-lit` which passes AAA on all background tiers

### Keyboard Navigation Map

| Key | Action |
|-----|--------|
| Tab | Move focus to next interactive element |
| Shift+Tab | Move focus to previous interactive element |
| Enter/Space | Activate focused button or link |
| Escape | Close mobile menu overlay, close any modal |
| Arrow keys | Navigate within nav links (optional enhancement) |

### Screen Reader Considerations

- Custom cursor: `aria-hidden="true"`, never announced
- Marquee: `aria-hidden="true"` on the visual marquee, provide a static `<ul>` with `sr-only` class listing the same content for screen readers
- Scroll reveal animations: content must be in the DOM and accessible before animation triggers — never use `display:none` or `visibility:hidden` for pre-animation state. Use `opacity:0` + `transform` only.
- Counter animations: the final number must be in the DOM as text content from page load. The visual animation is progressive enhancement.

---

## SEO Requirements

- Semantic HTML structure
- Meta tags: title, description, og:image, twitter:card
- Structured data (Organization schema)
- Sitemap.xml generated by Astro
- robots.txt
- Canonical URLs
- Page titles: "[Page] | BuildLens — Construction Logistics Platform"

---

## Asset Sourcing Guide

### Fonts

| Font | Role | Source | License | How to Prepare |
|------|------|--------|---------|----------------|
| DM Sans | Primary font — all headings, body, UI. Geometric humanist sans-serif. Warm but precise. | https://fonts.google.com/specimen/DM+Sans | OFL (free, open source) | Download variable woff2 from Google Fonts. Subset to Latin characters using `pyftsubset` (command: `pyftsubset DMSans-Variable.woff2 --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD" --flavor=woff2`). Place in `src/assets/fonts/`. Expected: ~40-60KB for variable font. |
| DM Sans weights needed | 400 (Regular — body), 500 (Medium — secondary text), 600 (SemiBold — labels), 700 (Bold — subheadings), 800 (ExtraBold — headings, hero, stats) | Same source | Same | Use variable font (single file, all weights). Variable font is strongly preferred. |
| JetBrains Mono | Monospace accent for labels, data values, code-style elements | https://fonts.google.com/specimen/JetBrains+Mono | OFL (free) | Same subsetting process. Weights: 400, 500, 600. Expected: ~20KB after subset. |

**Total font budget: < 100KB for all weights combined.**

### Icons

Do NOT use icon libraries (Font Awesome, Heroicons, etc.). All icons must be:

- Hand-crafted SVGs or sourced from Lucide Icons (https://lucide.dev — MIT license, tree-shakeable)
- Inline SVGs in Astro components (not loaded as image files)
- Monochrome, using `currentColor` for fill/stroke so they inherit text color
- 24x24px default viewBox
- For the 12 module icons in ModuleGrid: create simple, abstract line-art icons that communicate the module concept. These can be geometric shapes — they don't need to be literal. Think: circle with crosshairs for Dashboard, stacked rectangles for BOMs, calendar grid for Scheduling, etc.

### Images & Mockups

| Asset | What to Use (Placeholder Phase) | What to Use (Production) |
|-------|--------------------------------|--------------------------|
| Founder headshot | `Tim Rollins BIO image.png` — already provided. Copy to `src/assets/images/tim-rollins.png`. Process via Astro `<Image>` for WebP conversion. | Same image, optimized |
| Platform Preview screenshot | Use `screenshot-gantt.png` as hero product shot inside a browser-chrome frame. Below it, show 3 thumbnails (`screenshot-dashboard.png`, `screenshot-pipeline.png`, `screenshot-rfi.png`). All images already use Rembrandt palette. Frame uses `--bg-shelf` header, `--bg-raised` body, `--border-semi` borders. Aspect ratio: 16:9. | Already production-ready — these are rendered from actual BuildLens product code. |
| Hero background texture | CSS-generated subtle grid pattern (1px lines at `--border` color, 80px spacing) or SVG noise texture | Same or custom generative art |
| Module card visuals | Icon only (see above) | Icon + subtle gradient or abstract element per module |
| OG Image (social sharing) | Generate a 1200x630px dark image with BuildLens logo + tagline in Figma or Canva. Export as PNG, compress to < 100KB. | Professional branded OG image |
| Favicon | Simple "BL" monogram SVG in accent color against transparent bg. 32x32px. Save as `public/favicon.svg`. | Proper brand favicon set (16, 32, 180, 192, 512) |

**No stock photography.** This site sells through interaction design and typography, not hero images. If photography is added later, it should be real project photography — construction sites, equipment, teams — not stock.

---

## CI/CD Setup

Add during Phase 1 (scaffold). Lightweight — just a build check.

### GitHub Actions (`.github/workflows/build.yml`)

```yaml
name: Build Check
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
```

That's it. No test runner, no lint CI, no deploy pipeline. Vercel handles deployment automatically on push to main. The GitHub Action just catches build-breaking changes before they hit production.

### Git Workflow

The codebase is built incrementally with disciplined version control — not dumped as one mass of code.

**Repository:** `buildlens-website` on GitHub. Created in Phase 1 after the scaffold is working locally.

**Branching strategy:** Phase 1 commits directly to `main`. Every subsequent phase gets its own feature branch (`feat/interaction-utilities`, `feat/navigation`, `feat/home-sections`, `feat/footer`, `feat/platform-page`, `feat/about-page`, `feat/contact-page`, `perf/optimization`, `feat/seo-meta`). Each branch merges to `main` via PR (squash merge) after the phase is verified.

**Commit discipline:** Atomic commits — one logical unit per commit (one component, one script module, one fix). Every commit must pass `npm run build`. Conventional commit messages: `feat:`, `fix:`, `style:`, `refactor:`, `perf:`, `chore:`.

**Vercel auto-deploy:** Connected to `main` branch. Every merge to `main` triggers a production deploy. PR branches get preview deploy URLs automatically, useful for reviewing before merge.

**Target git history at MVP Gate (end of Phase 5):**
```
main
├── chore: initial Astro scaffold with Tailwind, GSAP, Lenis
├── ← merged PR: feat/interaction-utilities (7+ commits)
├── ← merged PR: feat/navigation (2-3 commits)
├── ← merged PR: feat/home-sections (9+ commits)
└── ← merged PR: feat/footer (1-2 commits)
```

**Future additions (post-MVP):**
- Lighthouse CI via `@lhci/cli` (automated performance regression checks)
- HTML validation via `html-validate`
- Accessibility audit via `axe-core` CLI

---

## Accounts & Services Needed

| Service | Purpose | Cost |
|---------|---------|------|
| Vercel or Netlify | Hosting + forms | Free tier |
| GitHub | Code repository | Free |
| DM Sans (self-host, OFL license) | Primary font | Free (open source) |
| Plausible or Vercel Analytics | Privacy-first analytics | Free → $9/mo |
| Domain (buildlens.com or similar) | Custom domain | $10-15/year |
| Formspree (if not using Netlify Forms) | Form backend | Free tier (50 submissions/mo) |

**Total early stage: $0-25/month**
