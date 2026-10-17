---
name: Edward Attuati
description: Vetro su luce calda. Liquid glass over Edward's own warm photography, with paper sheets that carry the reading.
colors:
  forest: "#23251b"
  forest-0: "#141610"
  sun: "#dfc38e"
  sun-ink: "#7a5a1c"
  sun-ink-reading: "#5c4210"
  paper: "#f1eee2"
  paper-2: "#e7e3d3"
  ink-2: "#4f5144"
  ink-2-reading: "#393b30"
  cream: "#fbf6e8"
  line: "rgba(35, 37, 27, .14)"
  live-green: "#2f4219"
  live-dot: "#4e6b26"
  sage-mist: "#dfe3cf"
  chrono-amber: "#8a5a12"
  chrono-mist: "#efe0bd"
  scadoo-sage: "#3f5a1c"
  memive-mist: "#e9dfc6"
  glass-clear: "rgba(255, 252, 240, .22)"
  glass-clear-hover: "rgba(255, 252, 240, .36)"
  glass-panel: "rgba(250, 247, 234, .30)"
  glass-reading: "rgba(248, 241, 222, .72)"
  glass-smoke: "rgba(28, 30, 22, .84)"
  glass-smoke-hover: "rgba(20, 22, 16, .92)"
  glass-opal: "rgba(255, 255, 255, .55)"
typography:
  display:
    fontFamily: "'Instrument Serif', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(3.3rem, 7vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.025em"
  headline-page:
    fontFamily: "'Instrument Serif', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(2.75rem, 6.2vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Instrument Serif', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Instrument Serif', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(1.6rem, 2.4vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  accent-italic:
    fontFamily: "'Instrument Serif', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif"
    fontSize: "clamp(1.45rem, 2.2vw, 1.95rem)"
    fontWeight: 400
    lineHeight: 1.1
  title-sans:
    fontFamily: "'Hanken Grotesk', 'Avenir Next', 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans', 'Noto Sans CJK SC', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  lede:
    fontFamily: "'Hanken Grotesk', 'Avenir Next', 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans', 'Noto Sans CJK SC', sans-serif"
    fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Hanken Grotesk', 'Avenir Next', 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans', 'Noto Sans CJK SC', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    fontFeature: "\"kern\", \"liga\""
  button:
    fontFamily: "'Hanken Grotesk', 'Avenir Next', 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans', 'Noto Sans CJK SC', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.005em"
  nav:
    fontFamily: "'Hanken Grotesk', 'Avenir Next', 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans', 'Noto Sans CJK SC', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1
  label:
    fontFamily: "'Hanken Grotesk', 'Avenir Next', 'Segoe UI', system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans', 'Noto Sans CJK SC', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  pill: "999px"
  shot-frame: "40px"
  sheet: "34px"
  shot-screen: "32px"
  panel: "30px"
  menu: "20px"
  card: "16px"
  menu-item: "14px"
spacing:
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "48px"
  space-8: "64px"
  space-9: "96px"
  space-10: "144px"
components:
  button-glass:
    backgroundColor: "{colors.glass-clear}"
    textColor: "{colors.forest}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-glass-hover:
    backgroundColor: "{colors.glass-clear-hover}"
  button-smoke:
    backgroundColor: "{colors.glass-smoke}"
    textColor: "{colors.cream}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-smoke-hover:
    backgroundColor: "{colors.glass-smoke-hover}"
  button-opal:
    backgroundColor: "{colors.glass-opal}"
    textColor: "{colors.forest}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  button-smoke-on-paper:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
  chip-glass:
    backgroundColor: "rgba(255, 252, 240, .18)"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  nav-pill:
    backgroundColor: "{colors.glass-panel}"
    textColor: "{colors.forest}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "6px"
    height: "56px"
  nav-item:
    textColor: "{colors.forest}"
    typography: "{typography.nav}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
  nav-item-active:
    backgroundColor: "rgba(255, 255, 255, .5)"
  panel-glass:
    backgroundColor: "{colors.glass-panel}"
    rounded: "{rounded.panel}"
  panel-reading:
    backgroundColor: "{colors.glass-reading}"
    textColor: "{colors.forest}"
    rounded: "{rounded.panel}"
    padding: "clamp(32px, 5vw, 72px)"
  sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.forest}"
    rounded: "{rounded.sheet}"
    padding: "144px 24px 178px"
  window:
    textColor: "{colors.cream}"
    padding: "144px 24px"
  card-repo:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.card}"
    padding: "18px 20px"
  tag:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    padding: "5px 11px"
  live-badge:
    backgroundColor: "{colors.sage-mist}"
    textColor: "{colors.live-green}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px 6px 10px"
  input-pill:
    backgroundColor: "rgba(255, 253, 245, .75)"
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  plan:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.panel}"
    padding: "clamp(26px, 3.4vw, 40px)"
  plan-pro:
    backgroundColor: "{colors.forest}"
    textColor: "#f3eedc"
    rounded: "{rounded.panel}"
    padding: "clamp(26px, 3.4vw, 40px)"
  shot-frame:
    rounded: "{rounded.shot-frame}"
    padding: "8px"
    width: "240px"
---

# Design System: Edward Attuati

## Overview

**Creative North Star: "Vetro su luce calda"**

Every page stands on one of Edward's own photographs, full bleed and fixed behind everything: the canal at golden hour, Kyoto bamboo, New York at night. Over that ground floats real liquid glass: a translucent, warm-tinted material with live backdrop blur and saturation, a specular sheen, a light rim brighter at the top left, and, on Chromium, true edge refraction from SVG displacement maps. Glass carries the controls and the short, urgent things (nav, hero, buttons, chips, the atom bubble, dialogs). When reading gets dense, warm sand-paper sheets slide up over the photo with large rounded top corners, and the page alternates between looking through the glass at the photograph and reading on paper.

The world is calm, human and tactile. Its palette is sampled from the canal photo, not picked from a UI kit: dark mossy forest ink, sand paper, and gold from sunlight on water. Type pairs a high-contrast editorial serif (Instrument Serif, always weight 400) for names, headings and numerals with a warm grotesk (Hanken Grotesk) for everything that has to work. Motion is a soft spring: glass squashes when pressed, sections rise out of a blur.

It explicitly refuses the category default for developer portfolios (dark neon with glow and mono labels) and its opposite (a white Swiss card grid), and it replaces the site's former violet, cyan and pink palette with a more human one.

**Key Characteristics:**
- Owner photography as the ground on every page, fixed behind content, with a soft radial vignette.
- One glass material in four tints: clear, panel, reading, smoke; opal when it sits on paper.
- Paper sheets (34px top corners, 34px overlap) for dense reading, alternating with windows onto the photo.
- Instrument Serif at weight 400 only; Hanken Grotesk for body and UI; no uppercase tracking labels.
- Every control is a pill; spring easing `cubic-bezier(.32, .72, 0, 1)` throughout.
- Product pages keep the world and swap a single accent.

## Colors

A warm, low-chroma palette sampled from a canal at sunset: forest ink, sand paper and sun gold, with one accent hue per product.

### Primary
- **Canal Forest Ink** (forest): the ink of the system. Body and heading text on paper and on reading glass, the fill of dark-on-paper buttons, the Pro pricing plan, the CV sheet rule. Also the ground's fallback color.

### Secondary
- **Sun on Water** (sun): light gold that only lives where it sits on dark or on the photo: the text-selection fill, the keyboard focus ring over the photo, the scrollbar thumb, list markers on the forest Pro plan, the easter-egg progress bar. It is never text on paper (1.46:1).

### Tertiary
- **Burnished Gold Ink** (sun-ink): the readable gold. The cycling greeting, italic heading accents, timeline dates, skill-group headings, the typewriter caret, link hover on the email, and the focus ring on every paper sheet. Inside reading-glass panels it darkens to **Deep Burnished Gold** (sun-ink-reading) so it holds over dark parts of the photo.
- **Product accents** (`--accent`, with `--accent-soft` for tinted pills): **Chrono Amber** (chrono-amber, with chrono-mist), **Scadoo Sage** (scadoo-sage, with sage-mist), and Memive, which keeps Burnished Gold Ink (with memive-mist). The accent colors product taglines, step numerals, duration pills, FAQ plus signs, check marks and progress bars.

### Neutral
- **Sand Paper** (paper): the sheet surface; the reading ground.
- **Darker Sand** (paper-2): tags, repository cards, the free pricing plan, inline code backgrounds; one step below paper.
- **Moss Grey Ink** (ink-2): secondary text on paper (ledes, places, descriptions). Darkens to **Deep Moss Ink** (ink-2-reading) inside reading glass.
- **Night Forest** (forest-0): the body background behind the photo, and the shot placeholder.
- **Cream** (cream): text on the photograph and on smoke glass (window ledes at 86% opacity, footer at 86–90%, chips on the atom, toasts, the scroll cue).
- **Hairline** (line): the 1px rules between timeline entries, project rows, FAQ items and list rows.
- **Live greens** (live-green on sage-mist, with a live-dot): the "live" and "now" status markers. These are the only status colors.

### Named Rules
**The Sampled Palette Rule.** Every hue comes from the ground photography's warm golds and mossy darks. No saturated blues, violets, cyans or pinks; the one cool tone in the build is the chrono-app's sky grey.

**The Readable Gold Rule.** Sun gold (sun) appears only on dark surfaces or over the photo. On paper, gold text is always sun-ink (5.46:1 on paper), and inside reading glass it is sun-ink-reading.

**The One Accent Per Product Rule.** A product page changes `--accent` and `--accent-soft` and nothing else. Layout, glass, type and neutrals stay identical across Memive, Chrono and Scadoo.

## Typography

**Display Font:** Instrument Serif (with Iowan Old Style, Palatino Linotype, Georgia, serif), self-hosted in roman and italic at weight 400.
**Body Font:** Hanken Grotesk (with Avenir Next, Segoe UI, system-ui, -apple-system, then PingFang SC, Hiragino Sans, Noto Sans CJK SC for the Chinese and Japanese translations), self-hosted as a variable font, 300–800.
**Mono:** none at the system level. Scadoo defines a page-local system monospace stack only for its real Dart code sample and dependency names.

**Character:** an editorial serif with tight, negative tracking gives the name and headings a printed, personal voice. A warm, open grotesk handles reading and every interactive label.

### Hierarchy
- **Display** (400, `clamp(3.3rem, 7vw, 6rem)`, 0.9, -0.025em): the name "Edward Attuati" in the hero and product names on product pages (`clamp(3.4rem, 8vw, 6rem)`).
- **Headline, page** (400, `clamp(2.75rem, 6.2vw, 5.25rem)`, 0.98, -0.02em): page titles on About, Sitemap and Scadoo privacy.
- **Headline** (400, `clamp(2.25rem, 4.6vw, 3.75rem)`, 1.02, -0.02em, balanced wrap): section headings, paired with a lede in a two-column section head.
- **Title** (400 serif, `clamp(1.6rem, 2.4vw, 2.1rem)`, 1.1): timeline entries; project names and row titles use the same serif at 1.7–3.9rem.
- **Accent italic** (Instrument Serif italic 400, `clamp(1.45rem, 2.2vw, 1.95rem)`, 1.1): the 38-language greeting, product taglines, skill-group headings, the CV section heads, and italic emphasis words inside serif headlines (colored sun-ink or accent).
- **Serif numerals** (400, 3.4rem, 1): step numbers and prices, with tabular figures.
- **Sans title** (700, 1.25rem, 1.25): step titles; feature-point titles at 700 1.0625rem.
- **Lede** (400, `clamp(1.0625rem, 1.4vw, 1.25rem)`, 1.6, max 60ch): the paragraph that follows a headline; ink-2 on paper, cream at 86% on the photo.
- **Body** (400, 1.0625rem, 1.65, kerning and ligatures on): reading text, held to 46–68ch per component.
- **Button** (600, 1rem, 1, +0.005em) and **Nav** (600, 0.9375rem, 1): every pill control.
- **Label** (600, 0.8125rem, 1): chips, live badges, "now" markers, the scroll cue, mobile tab labels (600, 0.6875rem).

### Named Rules
**The Serif Speaks, Sans Works Rule.** Instrument Serif is used only at weight 400, for names, headings, numerals and italic accents. Hierarchy in serif comes from size and italics, never from bolding it. Hanken Grotesk carries body, buttons, navigation and labels.

**The No Kicker Rule.** Headings stand on their own: no uppercase, tracked eyebrow labels above them. The build has no `text-transform: uppercase` anywhere in the shared system.

## Layout

Pages are a vertical alternation of two surfaces over the fixed photograph. A **window** is transparent, so the photograph shows through, with cream text and `144px` vertical padding. A **sheet** is a paper slab with `34px` top corners that overlaps the previous window by `34px`, so the photo appears to slide under the paper, padded `144px 24px 178px`. A window after a sheet overlaps it by the same `34px`, and a page's last sheet can close with all four corners rounded. The CV is the one exception: a single printed document (`min(920px, 100%)`, 6px corners) on a desk over the photo.

Content sits in a `min(1180px, 100%)` wrap, or a `min(760px, 100%)` narrow column for prose. Heroes fill `100svh` with `118–120px` top padding and `clamp(20px, 5.5vw, 84px)` side padding. The home hero is a two-column grid (`1.08fr / .92fr`, `3vw` gap): a glass panel capped at `660px` on the left, the atom in its glass bubble on the right. Product heroes pair the glass panel with a tilted phone screenshot when one exists. Section heads are a two-column grid (headline left, lede right, aligned to the baseline, `24px 48px` gaps) with `64px` below.

Dense lists are ruled, not boxed: timeline rows (`220px` date column, `36px` vertical padding), project rows (three columns with a `170px` screenshot), name/label/description rows, two-column card lists and FAQ items, all separated by 1px hairlines.

The spacing scale runs 16, 24, 32, 48, 64, 96, 144px (`--space-4` to `--space-10`). The large steps make the sheet rhythm, and component gaps are set locally (6–56px).

Responsive behaviour: at 960px and below, section heads, timelines, projects, steps, plans and the GitHub block collapse to one column, and skills drop to two. At 820px and below, the top nav hides its section links and a floating glass tab bar appears at the bottom (`bottom: max(14px, env(safe-area-inset-bottom))`), heroes stack and pin their content toward the bottom on product pages, and the scroll cue is removed. At 760px, card lists and the CV body go single column. At 520px, feature points go single column.

## Elevation & Depth

Depth is physical and layered: the photograph at the back, glass floating over it, paper sheets sliding over both. Glass reads as a lens rather than a card: inset highlights draw a lit top edge and a hairline rim, a soft-light specular gradient sits inside, a 1px masked gradient border is brightest at the top left, and a long, soft cast shadow places it above the photo. Paper sheets cast an upward shadow onto the window they cover. On Chromium, refraction is real: each glass element gets an SVG filter whose displacement map pulls the backdrop inward near the rounded edge, then blurs it and boosts saturation to 1.7. Elsewhere the CSS blur and saturation stand alone.

### Shadow Vocabulary
- **Glass rest** (`inset 0 1px 0 rgba(255,255,255,.75), inset 0 -1px 1px rgba(255,255,255,.22), inset 0 0 0 1px rgba(255,255,255,.20), 0 18px 40px -18px rgba(14,16,10,.55), 0 2px 6px rgba(14,16,10,.12)`): every glass panel, button and chip over the photo.
- **Opal on paper** (`inset 0 1px 0 #fff, inset 0 0 0 1px rgba(35,37,27,.10), 0 10px 24px -14px rgba(35,37,27,.45)`): glass buttons on paper, where there is nothing to refract.
- **Sheet lift** (`0 -30px 60px -30px rgba(14,16,10,.45)`): the shadow a sheet casts upward over the photo.
- **Shot frame** (`inset 0 1px 0 rgba(255,255,255,.95), inset 0 0 0 1px rgba(255,255,255,.4), 0 30px 60px -28px rgba(14,16,10,.6), 0 4px 12px rgba(14,16,10,.12)`): the glass phone frame around real app screenshots, with a forest-tinted variant on paper.
- **Document** (`0 40px 90px -30px rgba(0,0,0,.7)`): the CV sheet on its desk.

### Named Rules
**The Lens Not Card Rule.** Glass is always translucent, with blur, saturation, rim light and a cast shadow. A glass surface is never an opaque fill with a drop shadow.

**The Reading Glass Rule.** Any glass panel that carries paragraphs over the photo (hero, about, contact, product heroes, panels) switches to the reading tint (`glass-reading`) with a white-to-honey veil (`linear-gradient(160deg, rgba(255,253,247,.55), rgba(255,250,236,.1) 50%, rgba(238,222,184,.32))`), and darkens its secondary ink and gold to `ink-2-reading` and `sun-ink-reading`, so text stays legible where dark forest sits behind it.

**The Opal On Paper Rule.** Glass on paper has nothing to refract, so it becomes opal: a white `.55` tint, a crisp white top edge, a forest hairline, no refraction filter. A dark button on paper becomes solid forest.

## Shapes

Shapes are soft and continuous. Every interactive control is a full pill (`999px`): buttons, chips, nav items, tab-bar items, tags, live badges, duration pills, inputs, toasts. Large containers use generous radii: glass panels and pricing plans `30px`, sheets `34px` top corners, the language menu `20px` with `14px` items. Small data cards (GitHub repositories, code blocks) use `16px`. Real app screenshots sit in a `40px` glass frame with an `8px` margin around a `32px` screen at a `390 / 844` aspect ratio, tilted 2–2.5 degrees. The atom bubble is a perfect circle. Hairlines are 1px forest at 14% opacity. The only other borders are the input's 1px forest hairline at 20% and the CV's 2px forest head rule.

Icons are inline SVG line drawings in `currentColor`, stroke 1.7–1.8, round caps and joins, 15–21px. A button's trailing icon sits in its own 30px circular well that drifts up and to the right on hover.

## Components

### Buttons
Tactile glass pills that squash when pressed.
- **Shape:** full pill (`999px`), `48px` minimum height (`44px` in dense rows and socials), `0 22px` padding, `10px` gap to the icon.
- **Clear glass (secondary):** clear tint over the photo, forest text. On hover the tint rises to `.36`, and the button lifts 1px and scales to 1.015.
- **Smoke glass (primary):** smoked tint (`glass-smoke`) with cream text, and an icon well tinted gold at `.28`. On hover it darkens to `.92`. Exactly one primary per group: "Contattami", "Apri la web app", "Leggi il CV", "Scrivimi".
- **Press:** `scale(.955, .93)` over `.18s`, a squash wider than it is tall.
- **On paper:** opal (see Elevation); a dark button on paper is solid forest.
- **Focus:** a 2px sun outline offset 3px over the photo, sun-ink on every paper sheet, sun inside the forest Pro plan, accent in FAQs.

### Chips
- **Style:** pill, `6px 12px`, label type, light glass tint `.18`, `10px` blur. On the hero atom and the scroll cue they use a dark smoke tint `.6` with cream text.
- **Tags (on paper):** darker sand pills (`5px 11px`), 500 0.8125rem, ink-2 text. No glass on paper.
- **Live badge:** a sage-mist pill with live-green text and an 8px live-dot.

### Cards / Containers
- **Glass panel:** `30px` corners, `22px` blur, a panel tint of `.30`, or the reading tint for text. Padding is fluid: `clamp(30px, 3.6vw, 54px)` in heroes, `clamp(32px, 5vw, 72px)` in about and contact panels.
- **Sheet:** paper, `34px` top corners, sheet-lift shadow (see Layout).
- **Repository card:** darker sand, `16px` corners, `18px 20px` padding. On hover it lifts 2px and darkens to `#dedac8`.
- **Pricing plan:** darker sand, or forest for Pro with `#f3eedc` text and sun list markers; `30px` corners.
- **Code block (Scadoo):** forest background, `#e9e4cf` text, page-local mono, `16px` corners.

### Inputs / Fields
- **Style:** pill, `48px` high, `0 20px` padding, a cream-white fill at `.75` and a forest hairline at `.2`.
- **Focus:** a 2px solid forest outline offset 2px. Only the Memive waitlist uses an input.

### Navigation
- **Desktop:** a fixed glass pill centred `18px` from the top, `56px` high with `6px` inner padding. It holds the serif "EA" mark (400, 1.35rem), section links, a 1px separator, the CV link and the language selector, all in nav type and forest. Hover gives a white `.28` wash; the current section a white `.5` pill (nav spy). The language menu is a glass dropdown with a hover bridge and pressed state.
- **Mobile (≤820px):** the nav keeps the mark, CV and language; a floating glass tab bar at the bottom holds 21px line icons over 0.6875rem labels, and the current tab gets a white `.52` pill.
- **Entrance:** the nav drops in from `-24px` and the tab bar rises from `30px`, both on the spring.

### Cursor
The system cursor is kept everywhere. A custom glass-droplet cursor was built and then removed at Edward's request: it hid the text underneath it.

### Signature: Phone shot in glass
Real app screenshots (never mockups) sit in a translucent glass frame (see Shapes), tilted 2–2.5 degrees. In product heroes they slide in with a small tilt (transform only, always visible).

### Motion
- Spring `cubic-bezier(.32, .72, 0, 1)` for transforms, hover and state; out-expo `cubic-bezier(.16, 1, .3, 1)` for fades and the photograph's entrance.
- Reveal: elements start at `translateY(26px)` with `blur(8px)` and resolve over `.9–1.1s`, staggered with `--d`.
- The ground photo eases in from `scale(1.08)` over `1.6s`. Panels rise `24px` from `scale(.98)`. Entrances animate transform only: content is never invisible or blurred while loading, so it counts as painted at once (LCP) and costs no filter work.
- Under `prefers-reduced-motion`, every animation and transition collapses to `.01ms` and reveals are shown at once; the greeting and typewriter hold still and the atom stays still, moving only for a moment when touched.
- **Pause control (WCAG 2.2.2):** the home hero has a "Ferma animazioni" glass chip that stops the atom, greeting and typewriter; the choice is remembered in `localStorage` (`ea-motion`). The atom also stops whenever it is off screen or the tab is hidden.
- **Refraction budget:** true edge refraction runs only on Chromium with a fine pointer (desktop). Displacement maps are computed at 0.3 scale, only along the edge band, and in idle-time slices; phones get the CSS blur and saturate glass.

## Do's and Don'ts

### Do:
- **Do** stand every page on an owner photograph in the fixed ground layer, with its radial vignette, and choose its focal point with `--focus`.
- **Do** use the glass material for controls and short content over the photo, and switch to the reading tint as soon as a panel carries paragraphs.
- **Do** move dense reading onto paper sheets that overlap the window by `34px`.
- **Do** keep one smoke-glass primary button per action group, with the trailing arrow icon in its circular well.
- **Do** use sun-ink (or the product accent) for gold and accent text on paper, and sun only on dark or over the photo.
- **Do** show only real app screenshots, in the glass phone frame, each with a provenance sidecar beside the raster.
- **Do** drive motion with the spring curve and honour `prefers-reduced-motion`.

### Don't:
- **Don't** build a dark neon developer portfolio with glows and mono labels, or a white Swiss card grid; both are the defaults this world refuses.
- **Don't** bring back the violet, cyan and pink palette, or any saturated hue the photography does not contain.
- **Don't** bold Instrument Serif, or set uppercase tracked eyebrows above headings.
- **Don't** put sun gold text or cream text on paper.
- **Don't** apply clear glass or refraction on paper; it has nothing to bend there and becomes opal.
- **Don't** use emoji or icon fonts; icons are inline SVG line drawings in `currentColor`.
- **Don't** use monospace outside real code.
