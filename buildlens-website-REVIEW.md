# REVIEW.md — Code Review Rules for BuildLens Marketing Website

> These rules define what Claude (and human reviewers) should flag during code review. Security items are blockers. Everything else is graded.

---

## Security — Always Block

- API keys, tokens, or form endpoint URLs hardcoded in client-side code (must use `PUBLIC_` env vars via `import.meta.env`)
- .env files included in commits
- Inline event handlers (`onclick`, `onload`) in HTML — all JS goes through script modules
- External script tags loading from untrusted CDNs (GSAP should come from npm, not CDN)
- Form actions pointing to hardcoded URLs instead of environment variables

## Performance — Must Fix

- Images without explicit `width` and `height` attributes (causes CLS)
- Images above the fold missing `loading="eager"` and `fetchpriority="high"`
- Images below the fold missing `loading="lazy"`
- Non-woff2 font formats being loaded
- Fonts not preloaded in `<head>`
- GSAP ScrollTrigger instances created without being stored for cleanup
- `will-change` left on elements permanently (must be added before animation, removed after)
- CSS animations used for scroll-triggered effects (must use GSAP)
- `setTimeout` / `setInterval` used for animation timing (must use GSAP)
- Lenis not synced with GSAP ticker (causes double-rAF)
- `position: fixed` on animated elements (use transforms only)
- Large unoptimized images (must use Astro `<Image>` component or pre-optimized WebP/AVIF)
- Bundle imports pulling in entire libraries when only specific modules needed

## Design System Compliance (Rembrandt Chiaroscuro) — Must Fix

- Colors not using CSS custom properties from `global.css`
- Default Tailwind palette colors used instead of Rembrandt design tokens
- Light or white backgrounds anywhere on the site — backgrounds MUST use `--bg-abyss` through `--bg-shelf` depth tiers or `--glass-*` layers
- Flat solid backgrounds on cards/surfaces instead of glass layers (`--glass-03`, `--glass-05`, etc.)
- Hard-coded border colors instead of `--border-subtle` / `--border-mid` / `--border-strong` / `--border-bright`
- Fixed pixel sizes on headings instead of `clamp()` fluid scaling
- Section vertical padding less than `4rem` (sections need massive whitespace)
- Typography not following the defined hierarchy (DM Sans 400-800 + JetBrains Mono)
- Font loaded from Google Fonts CDN instead of self-hosted woff2
- Missing hover states on clickable elements — hover should shift glass opacity up one tier and border to `--border-strong`
- Missing text-shadow glow on hero/stat headings (`text-shadow: 0 0 60px var(--accent-glow)`)
- Missing `radial-gradient` on body element (should use `--bg-body`, not flat color)
- PlatformPreview section not using 3D perspective-shift carousel — screenshots must use `perspective: 1200px`, `rotateY`, `blur()` depth transitions, and ScrollTrigger pin. No simple fade sliders.
- Browser-chrome frames on screenshots not matching Rembrandt palette (`--bg-shelf` header, `--bg-raised` body, `--border-semi`)
- Screenshot images not wrapped in Astro `<Image>` for WebP optimization

## Architecture — Must Fix

- React, Vue, Svelte, or any framework components introduced without explicit approval
- UI component libraries (shadcn, Radix, MUI, etc.) imported
- CSS `scroll-behavior: smooth` used anywhere (Lenis handles scrolling)
- Animation logic placed inside Astro components instead of script modules
- Script modules missing `init()` and `destroy()` function exports
- `init.ts` not updated to include new script modules
- `astro:before-swap` cleanup missing new ScrollTrigger instances
- `astro:page-load` init missing new script initializations
- Data attributes not used for interaction targeting (scripts should query `data-*` attributes, not class names)
- Inline `<script>` tags with animation logic not using TypeScript

## Accessibility (WCAG 2.1 AA) — Must Fix

- Missing `prefers-reduced-motion` handling in any animation script
- `prefers-reduced-motion` not listening for runtime changes (`mediaQuery.addEventListener('change')`)
- Custom cursor visible to screen readers (must be `aria-hidden="true"`)
- Interactive elements not keyboard navigable
- Magnetic buttons applying transform on keyboard focus (transform is pointer-only; focus must show ring, no movement)
- Magnetic buttons missing focus ring (`outline: 2px solid var(--accent); outline-offset: 4px`)
- Magnetic button still mid-transform when focus arrives (must snap to rest position instantly)
- `[data-magnetic]` elements smaller than 44x44px (WCAG 2.5.5 target size)
- Form inputs missing visible `<label>` elements (placeholder text alone is not sufficient)
- Form error messages not connected via `aria-describedby`
- Images missing alt text (decorative images need `alt=""` + `role="presentation"`)
- Skip-to-content link missing from BaseLayout
- Focus indicators invisible against dark background (must use accent color outline, `outline-offset: 4px`)
- Color as the only indicator of state (needs icon/text backup)
- Scroll reveal pre-animation state using `display:none` or `visibility:hidden` (must use `opacity:0` + `transform` only — content must remain in accessibility tree)
- Counter animation final values not in DOM as text content on page load (number must be readable before JS runs)
- Marquee missing screen-reader-accessible static content (`aria-hidden="true"` on visual marquee + `sr-only` `<ul>` with same content)
- Heading hierarchy skipping levels (H1 → H3 without H2)
- `<html>` tag missing `lang="en"` attribute
- `--text-muted` (#5A5A58) used for meaningful content (3.2:1 contrast — below AA threshold. Use only for decorative/supplementary text)

## Responsive / Mobile — Should Fix

- Custom cursor not disabled on touch devices (check `matchMedia('(hover: hover)')`)
- Magnetic button effects not disabled on touch
- Layouts breaking below 375px viewport width
- Text bleeding completely off viewport on mobile (Hero heading can bleed on desktop, must be contained on mobile)
- Horizontal scroll appearing on any mobile viewport
- Touch targets smaller than 44x44px
- Mobile menu not covering full viewport
- Parallax intensity not reduced on mobile

## Code Quality — Should Fix

- Script files longer than 200 lines without extraction into helpers
- Duplicated animation configurations across multiple scripts
- Magic numbers in GSAP tweens (animation durations, delays should be constants)
- Missing TypeScript types on function parameters
- Dead code or commented-out blocks
- Console.log statements left in production code
- Inconsistent naming conventions

## SEO — Should Fix

- Pages missing meta title or description
- Missing Open Graph tags (og:title, og:description, og:image)
- Missing canonical URL
- Heading hierarchy broken (H1 → H3 without H2)
- Missing structured data (Organization schema on home page)
- Images missing alt text (duplicate with Accessibility, but also SEO impact)

## Build & Deploy — Should Fix

- Build warnings not investigated
- New environment variables added without updating `.env.example`
- Astro config changes that affect output path or deployment target
- Public directory files not optimized (favicon should be SVG, og-image compressed)
- GitHub Actions build check failing (`.github/workflows/build.yml` must pass `npm run build`)
- Changes pushed to main without build check passing first

---

## Review Process

**Who reviews:** Claude Code auto-reviews all commits. Manual visual QA after each major section.

**Severity levels:**
- **Block** — Security items. Cannot merge until resolved.
- **Must Fix** — Performance, design system, architecture, accessibility. Fix before merge.
- **Should Fix** — Responsive, code quality, SEO, build. Fix in this commit or track as follow-up.
- **Nit** — Style preferences, minor naming. Author's discretion.

---

*Update this file when new patterns or tools change what "good" looks like.*
