# Changelog — Supun Portfolio

All changes made to the design prototype after initial implementation.

---

## Implemented from prototype
- Built `portfolio.html` in full from the Claude Design handoff
- Added `<meta>` description and Open Graph tags
- Added `rel="noopener noreferrer"` on all external links
- Added `aria-hidden` on all decorative elements

---

## Changes

### Marquee strip — real tech icons
- Replaced hand-drawn placeholder SVG icons with real brand logos via **Iconify** (`simple-icons` set)
- Icons: React, Next.js, TypeScript, Node.js, Python, Azure, Docker, PostgreSQL, Tailwind CSS, Figma, Git, Astro
- Icons inherit `currentColor` so the dim → accent-on-hover effect is preserved
- Added Iconify CDN script to `<head>`

### Hero title — green periods
- Wrapped the `.` in `mind.` and `CLOUD.` with `<span class="dot-green">` 
- Both periods render in `var(--accent)` green
- Note: the tittle on the `i` in "mind" is not targetable via CSS on Instrument Serif — only the periods were changed

### Hero → strip bridge
- Added a `.bridge` element between the hero section and the marquee strip
- Two glowing green lines (accent color, fade to transparent at edges) flank centered mono text: `full-stack · cloud · design`
- Same glow style as the progress bar

### About stats — prefix, suffix & baseline alignment
- Added `$` prefix to the 400 stat, changed suffix from `K USD` → `K`
- All four stats restructured with `.stat-numrow` flex container
- Suffix (and prefix) now sit at the **same baseline** as the number bottom, not below it
- Prefix and suffix font size scales with viewport via `clamp`

### Favicon
- Added `<link rel="icon">` pointing to `uploads/favicon.ico`

### Project 05 — J-CERT Sri Lanka
- Slot: P/05 (third-width card)
- Live site: https://www.j-certsrilanka.com/
- Media: `uploads/proj1.gif` (1920×912)
- Card aspect ratio set to `1920/912` to match GIF exactly — no cropping
- GIF rendered as `<img loading="lazy" decoding="async">` with `transform: translateZ(0)` and `will-change: filter` for GPU-layer promotion (reduces jank)
- Subtle green border pulse animation (`.gif-pulse`) signals the recording is live
- Corner accent brackets retained

### Project 01 — restored to placeholder
- Reverted to placeholder art after J-CERT was moved to P/05

---

## Assets added to `uploads/`
| File | Purpose |
|------|---------|
| `jcert.png` | Static screenshot of J-CERT Sri Lanka (unused after GIF added) |
| `proj1.gif` | Screen recording of J-CERT Sri Lanka — used in P/05 |
| `favicon.ico` | Site favicon |
