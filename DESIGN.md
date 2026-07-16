---
version: beta
name: apps-landing-page
description: A calm, Apple-elegant design system for an App Landing Page / app directory. One Action Blue (#0066cc) accent — overridable per app via the `--accent` CSS variable — SF Pro Display/Text with subtle negative tracking, generous-but-not-museum whitespace, and a compact type ladder tuned for scannable landing-page density rather than full-bleed product tiles. Layout and rhythm take cues from minimal app sites like getnoir.app — sticky slim nav, hero with app icon + tagline + App Store badge + device screenshot, alternating feature blocks, and a quiet footer.

colors:
  primary: "#0066cc"
  primary-focus: "#0071e3"
  primary-on-dark: "#2997ff"
  ink: "#1d1d1f"
  body: "#1d1d1f"
  body-on-dark: "#ffffff"
  body-muted: "#6e6e73"
  ink-muted-80: "#333333"
  ink-muted-48: "#86868b"
  divider-soft: "#d2d2d7"
  hairline: "#e0e0e0"
  canvas: "#ffffff"
  canvas-parchment: "#f5f5f7"
  surface-pearl: "#fafafc"
  surface-tile-1: "#1d1d1f"
  surface-tile-2: "#2a2a2c"
  surface-tile-3: "#000000"
  surface-black: "#000000"
  surface-chip-translucent: "#d2d2d7"
  on-primary: "#ffffff"
  on-dark: "#ffffff"

typography:
  hero-display:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.5px
  display-lg:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.3px
  display-md:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 26px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.2px
  lead:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  lead-airy:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: 0
  tagline:
    fontFamily: "SF Pro Display, system-ui, -apple-system, sans-serif"
    fontSize: 19px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0.2px
  eyebrow:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 1px
    textTransform: uppercase
  body-strong:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.2px
  body:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: -0.2px
  caption:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: -0.1px
  caption-strong:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.1px
  button-large:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: 0
  button-utility:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.29
    letterSpacing: -0.1px
  fine-print:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  micro-legal:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: 0
  nav-link:
    fontFamily: "SF Pro Text, system-ui, -apple-system, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: -0.1px

rounded:
  none: 0px
  xs: 5px
  sm: 8px
  md: 11px
  lg: 18px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px
  section-lg: 96px

components:
  global-nav:
    backgroundColor: "{colors.surface-black}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    height: 48px
    position: sticky
    backdropBlur: true
  hero:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.hero-display}"
    centered: true
    maxWidth: 1024px
    padding: "{spacing.section-lg}"
  app-hero:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.hero-display}"
    layout: "two-column"
    iconSize: 96px
    padding: "{spacing.section-lg}"
  app-dock:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    padding: "{spacing.lg}"
    gap: "{spacing.lg}"
  catalog-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.hairline}"
  catalog-card-alt:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
  feature-section:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-lg}"
    padding: "{spacing.section}"
    maxWidth: 1024px
  showcase-item:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display-md}"
    layout: "split-alternating"
    padding: "{spacing.section}"
  store-badge:
    backgroundColor: transparent
    height: 48px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-primary-focus:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  button-primary-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    transform: "scale(0.95)"
  text-link:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.body}"
  text-link-on-dark:
    backgroundColor: transparent
    textColor: "{colors.primary-on-dark}"
    typography: "{typography.body}"
  site-footer:
    backgroundColor: "{colors.canvas-parchment}"
    textColor: "{colors.ink-muted-80}"
    typography: "{typography.fine-print}"
    padding: "{spacing.xxl}"
---

## Overview

This system is built for an **App Landing Page / app directory**, not Apple's full-bleed product-marketing pages. The previous spec (`Apple-design-analysis`) was modelled on apple.com product tiles — a "museum gallery" of edge-to-edge canvases at ~1 viewport each, with a hero at 56px, tile headlines at 40px, and a 28px lead. That scale and density are wrong for a page whose job is to *introduce apps quickly and drive a download*: too much type, too much air, too few scannable sections.

What stays from Apple (the good parts):
- **One accent.** A single Action Blue (`{colors.primary}` — #0066cc) carries every interactive element. No second brand color.
- **SF Pro Display + SF Pro Text** with subtle negative tracking at display sizes for the signature "Apple tight" headline feel.
- **Restraint.** No decorative gradients, no shadows on chrome, elevation only when a screenshot/device render needs to rest on a surface.
- **Weight 600 headlines**, weight 400 body, weight 300 reserved for rare airy reads.

What changes for the landing-page job (informed by getnoir.app and similar minimal app sites):
- **Compact type ladder.** Display sizes are cut to a scannable range (hero 48 → section 32 → card 26 → lead 20). See Typography.
- **Denser rhythm.** Sections stack with ~64px vertical padding (not 80px-per-tile museum spacing), more content per viewport.
- **App-site layout.** Sticky slim nav → hero with app icon + tagline + **App Store badge** + device screenshot → feature blocks (alternating image/copy) → quiet footer. This is the getnoir.app shape, adapted to a multi-app directory.
- **Per-app accent.** Each app may override the global blue via the `--accent` CSS variable (used by `AppDock`, `AppTile`/`catalog-card`, and `app-hero` for icon tint, focus ring, and link hover). The global default remains `{colors.primary}`.

**Reference: getnoir.app.** Its hero pairs the app name with a one-line tagline, a download badge, and a device mockup; feature sections are short centered blocks with a heading + paragraph; the footer is minimal. We adopt that structure and its interaction grammar (sticky nav, hover-underlined links, scale-on-press buttons, smooth-scroll anchors) while keeping Apple's typographic discipline.

**Key Characteristics:**
- Headlines stay confident but quiet; the largest size on the page is 48px.
- Alternating light surfaces (white ↔ parchment) create rhythm — the color change is the divider, not a border or shadow.
- A single soft drop-shadow is allowed, and only under device screenshots / app iconography resting on a surface.
- Two button grammars: the blue pill CTA (`{rounded.pill}`) and quiet text links (`{typography.body}` in `{colors.primary}`).

## Colors

> The palette is intentionally small. One accent, one near-black ink, white + parchment surfaces, and a near-black for the rare dark band. Apple's discipline: color is used for *signal*, not decoration.

### Brand & Accent
- **Action Blue** (`{colors.primary}` — #0066cc): The single brand-level interactive color. All links, pill CTAs, and the focus-ring root. Press state uses a scale transform, not a hex change.
- **Focus Blue** (`{colors.primary-focus}` — #0071e3): Brighter sibling, reserved for the keyboard focus ring (`outline: 2px solid`).
- **Sky Link Blue** (`{colors.primary-on-dark}` — #2997ff): Brighter blue for in-copy links on dark surfaces, where Action Blue would disappear.
- **Per-app accent** (`--accent`): Each app supplies its own accent (e.g. its brand color) via the `--accent` CSS variable. Where used, substitute `{colors.primary}` with `var(--accent)` for icon tint, focus ring, and link hover. The global default is `#0066cc`.

### Surface
- **Pure White** (`{colors.canvas}` — #ffffff): The dominant canvas — hero, feature sections, cards.
- **Parchment** (`{colors.canvas-parchment}` — #f5f5f7): Apple's signature off-white. Used for alternating bands (App Dock, footer, alt cards) and to create rhythm.
- **Pearl** (`{colors.surface-pearl}` — #fafafc): Near-white fill for secondary "ghost" elements; lighter than parchment so it still reads against it.
- **Near-Black Tile 1** (`{colors.surface-tile-1}` — #1d1d1f): The dark surface, used sparingly (e.g. a dark feature band or the global nav).
- **Near-Black Tile 2** (`{colors.surface-tile-2}` — #2a2a2c): Micro-step lighter, for separation when a dark band sits above/below Tile 1.
- **Pure Black** (`{colors.surface-black}` — #000000): Reserved for the global nav bar and true void.
- **Translucent Chip Gray** (`{colors.surface-chip-translucent}` — #d2d2d7): Base hex for circular controls over imagery; applied at ~64% alpha in production.

### Text
- **Near-Black Ink** (`{colors.ink}` — #1d1d1f): Every headline and body paragraph on light surfaces. Near-black, not pure black, keeps the page feeling soft.
- **Body** (`{colors.body}` — #1d1d1f): Same hex as ink — one near-black tone for all light-surface text.
- **Body On Dark** (`{colors.body-on-dark}` — #ffffff): Text on dark bands and the nav.
- **Body Muted** (`{colors.body-muted}` — #6e6e73): Secondary copy (captions, descriptions) on light surfaces.
- **Ink Muted 80** (`{colors.ink-muted-80}` — #333333): Strong-emphasis text on pearl/light.
- **Ink Muted 48** (`{colors.ink-muted-48}` — #86868b): Disabled text and legal fine-print.

### Hairlines & Borders
- **Divider Soft** (`{colors.divider-soft}` — #d2d2d7): Visible hairline tone for card borders and dividers.
- **Hairline** (`{colors.hairline}` — #e0e0e0): 1px border on cards and chips.

### Brand Gradient
**No decorative gradients.** Depth comes from photography (device screenshots) and from surface-color change, never from a CSS gradient overlay.

## Typography

### Font Family
- **Display**: `SF Pro Display, system-ui, -apple-system, sans-serif` — headlines (≥ 19px).
- **Body / UI**: `SF Pro Text, system-ui, -apple-system, sans-serif` — body, captions, buttons, links below 20px.
- **Substitutes**: off-Apple platforms, use `Inter` (variable); nudge display tracking down `-0.01em` and tighten body line-height by `0.03` to approximate SF Pro.

### Hierarchy (re-sized for landing-page density)

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 48px | 600 | 1.08 | -0.5px | Hero h1 (home + app page). Largest size on the page |
| `{typography.display-lg}` | 32px | 600 | 1.15 | -0.3px | Section h2 ("Available apps", feature headings) |
| `{typography.display-md}` | 26px | 600 | 1.25 | -0.2px | Card titles, showcase-item h2 |
| `{typography.lead}` | 20px | 400 | 1.45 | 0 | Hero subcopy, intro paragraphs |
| `{typography.lead-airy}` | 18px | 300 | 1.5 | 0 | Rare airy paragraph |
| `{typography.tagline}` | 19px | 600 | 1.25 | 0.2px | Emphasis line, app tagline echo |
| `{typography.eyebrow}` | 13px | 600 | 1.2 | 1px (uppercase) | Section/category labels (`.eyebrow`) |
| `{typography.body-strong}` | 16px | 600 | 1.4 | -0.2px | Inline strong emphasis, feature items |
| `{typography.body}` | 16px | 400 | 1.5 | -0.2px | Default paragraph |
| `{typography.caption}` | 14px | 400 | 1.45 | -0.1px | Secondary captions, dock labels |
| `{typography.caption-strong}` | 14px | 600 | 1.3 | -0.1px | Emphasized captions |
| `{typography.button-large}` | 17px | 400 | 1.0 | 0 | Store-hero CTA label |
| `{typography.button-utility}` | 14px | 400 | 1.29 | -0.1px | Utility/nav button labels |
| `{typography.fine-print}` | 12px | 400 | 1.4 | 0 | Footer body, fine print |
| `{typography.micro-legal}` | 11px | 400 | 1.3 | 0 | Micro legal disclaimers |
| `{typography.nav-link}` | 13px | 400 | 1.0 | -0.1px | Global nav menu items |

### Principles
- **Negative tracking at display sizes only.** 48 / 32 / 26px headlines carry `-0.2 → -0.5px`; body and below use `~ -0.1 to 0`. Never tighten 12px or below.
- **Body at 16px.** Landing pages read better one pixel tighter than Apple's 17px product-page body; 16px keeps density high without feeling cramped.
- **Weight 600 for headlines, 400 for body, 300 reserved** for the rare airy read. Weight 500 is absent by design.
- **Line-height is context-specific.** Display 1.08–1.25 (tight); body 1.5; lead 1.45.
- **Eyebrow is a label, not a heading.** 13px, uppercase, +1px tracking — used above headings to set context (category, section name). Never used as body.

### Note on Font Substitutes
SF Pro is Apple's proprietary system font. When building off-system: use `system-ui, -apple-system, BlinkMacSystemFont` first (resolves to real SF Pro on Apple platforms); use **Inter** elsewhere, nudging tracking `-0.01em` on display and tightening body leading `0.03`.

## Layout

### Spacing System
- **Base unit:** 8px. Structural layout snaps to 4 / 8 / 12 / 16 / 24 / 32 / 48.
- **Tokens:** `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 · `{spacing.section}` 64 · `{spacing.section-lg}` 96.
- **Section vertical padding:** 64px (`{spacing.section}`) for standard sections; 96px (`{spacing.section-lg}`) for the hero band. This is tighter than the previous 80px-per-tile museum spacing — landing pages show more per scroll.
- **Card padding:** 24px (`{spacing.lg}`) inside catalog cards.
- **Button padding:** 12px vertical, 24px horizontal (primary pill).

### Grid & Container
- **Max content width:** ~1024px for text/hero sections; ~1120px for the app grid. Narrower than Apple's 1440px product grids — landing pages read better centered and contained (per getnoir.app).
- **Column patterns:** single-column centered hero; 2-column hero on app pages (copy + device screenshot); responsive app grid (3 → 2 → 1 columns); alternating split for showcase blocks.
- **Gutters:** 24px between cards in the grid.

### Whitespace Philosophy
Whitespace frames the app, but the page must *scan*. Every section begins with ~48px of air above its eyebrow/heading and ~32–48px below. Device screenshots get ≥ 24px clearance from copy. The footer is the only dense area, by intent.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Hero, feature sections, footer, body |
| Soft hairline | 1px `{colors.hairline}` border | Catalog cards |
| Backdrop blur | `backdrop-filter: blur(N)` on nav | Sticky global nav over scrolling content |
| Product shadow | `rgba(0, 0, 0, 0.18) 0 12px 40px` | Device screenshots / app iconography resting on a surface (the only true shadow) |

**Shadow philosophy.** Exactly one drop-shadow, applied to device screenshots and app icons resting on a surface — never to cards, buttons, or text. UI elevation comes from surface-color change and backdrop-blur on the sticky nav.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed dark bands (no rounding) |
| `{rounded.xs}` | 5px | Inline link chips (rare) |
| `{rounded.sm}` | 8px | App icon containers, inline imagery |
| `{rounded.md}` | 11px | Pearl ghost elements |
| `{rounded.lg}` | 18px | Catalog cards, screenshots in cards |
| `{rounded.pill}` | 9999px | Primary blue CTA, the signature Apple pill |
| `{rounded.full}` | 9999px / 50% | Circular control chips over imagery |

### Imagery Geometry
- **Hero screenshot:** device mockup (16:9–9:19.5 depending on platform), rests on the surface with the system shadow. This is the getnoir.app hero anchor.
- **App icon:** 96px in `app-hero`, 72px in `catalog-card`, 1:1, `{rounded.sm}` (8px) or masked to the platform's icon shape.
- **Catalog card:** square-ish screenshot at `{rounded.lg}` (18px), light neutral background, product centered.
- **No rounded full-bleed bands** — dark bands are rectangular; the color change is the divider.

## Components

### Top Navigation
**`global-nav`** — Persistent slim bar, pinned top, sticky with `backdrop-filter` blur. Background `{colors.surface-black}`, height 48px, links `{colors.on-dark}` in `{typography.nav-link}` (13px). Left: brand mark + family name. Right: locale menu + theme toggle. On mobile it collapses to brand + menu.

### Hero (home)
**`hero`** (class `.hero` / `TextHero`) — Centered single-column stack, max-width 1024px, padding `{spacing.section-lg}` (96px). Content: `.eyebrow` (category label) → `<h1>` in `{typography.hero-display}` (48px) → lead paragraph in `{typography.lead}` (20px) → one `{component.button-primary}` CTA. Below it sits the `app-dock` band.

### App Hero (app page)
**`app-hero`** (class `.app-hero`) — Two-column on desktop (copy left, device screenshot right), stacked on mobile. Left: app icon (96px) → `.eyebrow` (category · platforms) → `<h1>` tagline in `{typography.hero-display}` (48px) → description in `{typography.body}` (16px) → `{component.store-badge}`. Right: device screenshot with the system shadow. Per-app accent via `--accent` tints the icon and focus ring.

### App Dock
**`app-dock`** (class `.app-dock`) — Horizontal band on `{colors.canvas-parchment}`, padding `{spacing.lg}`. A row of app icons (1:1) + short names in `{typography.caption}`. Each item links to its app page; `--accent` tints the icon.

### Catalog Card (app tile)
**`catalog-card`** (class `.catalog-card` / `AppTile`) — White card, 1px `{colors.hairline}` border, `{rounded.lg}` (18px), padding `{spacing.lg}` (24px). Content: app icon (72px) → `.eyebrow` (category) → `<h2>` tagline in `{typography.display-md}` (26px) → description in `{typography.body}` → 3-item feature list → platform row → `{component.text-link}` ("Learn more"). Alternate cards use `{component.catalog-card-alt}` (parchment background) for rhythm. Previously the card title was set at 40px — now 26px.

### Feature Section
**`feature-section`** (class `.feature-section`) — Centered, max-width 1024px, padding `{spacing.section}` (64px). `.eyebrow` → `<h2>` in `{typography.display-lg}` (32px) → description → feature-list. Previously the h2 was 40px — now 32px.

### Showcase Item (feature block)
**`showcase-item`** (class `.showcase-item`) — Split image + copy, alternating left/right per item (the getnoir.app feature block). Padding `{spacing.section}` (64px). Copy side: `.eyebrow` (app name) → `<h2>` in `{typography.display-md}` (26px) → description. Image side: device screenshot with the system shadow.

### Store Badge
**`store-badge`** (class `.store-badge`) — Official App Store / Mac App Store badge (SVG), height ~48px. Links to the app's store URL. Provides the page's only external color cue.

### Buttons
**`button-primary`** — Action Blue pill. Background `{colors.primary}`, text `{colors.on-primary}` in `{typography.body}` (16px), `{rounded.pill}`, padding 12px × 24px. The full-pill radius IS the action signal.
- Active: `{component.button-primary-active}` — `transform: scale(0.95)`.
- Focus: `{component.button-primary-focus}` — 2px solid `{colors.primary-focus}` outline.

**`text-link`** — Inline body link in `{colors.primary}`. Underlined on hover. On dark surfaces use `{component.text-link-on-dark}` (Sky Link Blue).

### Footer
**`site-footer`** (class `.site-footer`) — Background `{colors.canvas-parchment}`, text `{colors.ink-muted-80}` in `{typography.fine-print}` (12px). Left: family name + lead. Right: nav links (Apps, Privacy, Contact). Vertical padding `{spacing.xxl}` (48px).

## Do's and Don'ts

### Do
- Use `{colors.primary}` (or `var(--accent)`) for every interactive element — links, pill CTAs, focus signals.
- Set headlines in `{typography.hero-display}` / `{typography.display-lg}` / `{typography.display-md}` with subtle negative tracking for the "Apple tight" cadence.
- Run body copy at `{typography.body}` (16px) — tighter than Apple's 17px, right for landing density.
- Alternate white and parchment surfaces for section rhythm; the color change is the divider.
- Reserve `{rounded.pill}` for the primary CTA and any "action" element.
- Apply the single product-shadow only to device screenshots / app icons resting on a surface.
- Use `transform: scale(0.95)` as the press state on every button.

### Don't
- Don't introduce a second accent color; every signal is the blue (or the app's `--accent`).
- Don't set display sizes above 48px — the hero is the ceiling. Don't set section headings above 32px or card titles above 26px.
- Don't add shadows to cards, buttons, or text.
- Don't use gradients as decorative backgrounds.
- Don't use weight 500 — the ladder is 300 / 400 / 600.
- Don't round full-bleed bands.
- Don't mix radius grammars — `{rounded.sm}` for icons, `{rounded.lg}` for cards, `{rounded.pill}` for pills.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Small phone | ≤ 419px | Single-column; hero h1 → 32px; app-hero stacks; sections pad 48px |
| Phone | 420–640px | Single-column stack; hero h1 → 36px; catalog grid 1-col |
| Large phone | 641–735px | Tighter section padding (48px); fine-print wraps |
| Tablet portrait | 736–833px | Global nav collapses to brand + menu; app-hero stacks |
| Tablet landscape | 834–1023px | Nav full; catalog grid 2-col; app-hero 2-col returns |
| Small desktop | 1024–1068px | Full layout; hero h1 48px; content locks at 1024px |
| Desktop | 1069–1120px | App grid 3-col; content max 1120px |
| Wide desktop | ≥ 1121px | Content locks at 1120px, margins absorb extra width |

### Touch Targets
- Minimum 44 × 44px. `{component.button-primary}` lands at ~44 × 96px (pill radius makes the hit area generous).
- Global nav links ~32 × 48px (precision desktop actions; mobile uses the menu).

### Collapsing Strategy
- **Global nav**: full row → brand + menu at ≤ 833px.
- **App hero**: 2-column → stacked at ≤ 833px; screenshot below copy.
- **Catalog grid**: 3-col → 2-col (834px) → 1-col (640px).
- **Hero typography**: 48px → 36px (640px) → 32px (419px).
- **Showcase items**: split → stacked (image above copy) at ≤ 833px.

### Image Behavior
- Device screenshots and icons use responsive `srcset`; the above-fold hero screenshot loads eagerly, the rest lazy.
- Screenshots keep their aspect ratio across breakpoints; only scale changes.

## Iteration Guide
1. Focus on ONE component at a time; reference its YAML key directly (`{component.catalog-card}`, `{component.app-hero}`).
2. Variants (`-alt`, `-active`, `-focus`) live as separate entries in `components:`.
3. Use `{token.refs}` everywhere — never inline hex.
4. Never document hover. Default and Active/Pressed states only.
5. Display headlines stay SF Pro Display 600 with negative letter-spacing. Body stays SF Pro Text 400 at 16px.
6. The single drop-shadow is reserved for device screenshots / app icons.
7. When in doubt about emphasis: alternate surface (white → parchment) before adding chrome.

## Known Gaps
- Form validation and error states are not surfaced; only the neutral store badge and theme toggle exist.
- Per-app `--accent` override is applied via inline CSS variable in components; the global token remains `{colors.primary}`.
- Dark-mode variants of catalog cards and hero were not formalized; the system documented is the light-dominant variant.
- The exact `backdrop-filter` blur radius on `{component.global-nav}` is platform-dependent; production CSS uses `saturate(180%) blur(20px)` as a baseline.
