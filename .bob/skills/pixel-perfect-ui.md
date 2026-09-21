---
name: pixel-perfect-ui
description: >
  Use when implementing or reviewing UI components that must match a visual
  reference exactly. Provides guidance on spacing precision, colour extraction,
  animation matching, and cross-browser consistency.
---

# Pixel-Perfect UI Implementation Skill

## Approach

### 1. Measure Before You Code
- Screenshot the reference at 1x and 2x scale
- Use browser DevTools to inspect computed spacing (padding/margin/gap in px)
- Extract exact hex colours with the DevTools colour picker
- Note font-size, font-weight, line-height, letter-spacing for every text element
- Record border-radius, box-shadow, and opacity values

### 2. Colour Palette (Airbnb)
| Token | Value | Usage |
|-------|-------|-------|
| `--rausch` | `#FF385C` | Primary CTA, logo, accents |
| `--babu` | `#00A699` | Secondary accent |
| `--text-primary` | `#222222` | Body text, headings |
| `--text-secondary` | `#717171` | Subtext, captions, placeholders |
| `--border` | `#DDDDDD` | Dividers, card borders |
| `--border-focus` | `#B0B0B0` | Input borders |
| `--surface` | `#F7F7F7` | Hover backgrounds |
| `--white` | `#FFFFFF` | Card surfaces |

### 3. Typography
- **Font**: `Circular, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', sans-serif`
- **Headings**: `22–26px`, `font-weight: 600`
- **Body**: `14–16px`, `font-weight: 400`, `line-height: 1.5–1.75`
- **Labels**: `10px`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.08em`

### 4. Spacing System
Airbnb uses an 8px grid system:
- `4px` — micro gaps (icon-to-label)
- `8px` — small gaps
- `16px` — component internal padding
- `24px` — section gaps
- `32px` — large section gaps
- `80px` — page horizontal padding

### 5. Animations
| Interaction | Duration | Easing |
|-------------|----------|--------|
| Image hover scale | `400ms` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Overlay open/close | `250ms` | `ease` |
| Lightbox slide | Spring: stiffness 300, damping 30 | — |
| Button hover | `150ms` | `ease` |
| Opacity transitions | `200–300ms` | `ease` |

### 6. Accessibility Checklist
- [ ] All interactive elements have `aria-label` or visible text
- [ ] Overlays use `role="dialog"` + `aria-modal="true"`
- [ ] Focus is moved to close button when overlay opens
- [ ] Focus returns to trigger element when overlay closes
- [ ] `Escape` key closes all overlays
- [ ] Arrow key navigation in lightbox (`ArrowLeft`/`ArrowRight`)
- [ ] `focus-visible` outlines on all focusable elements (never `outline: none`)
- [ ] Images have meaningful `alt` text
- [ ] `aria-live="polite"` on dynamic counters (photo count, guest count)
- [ ] Disabled buttons have `disabled` attribute (not just styling)

### 7. Component Implementation Order
1. **Static layout** — get the structure right before animations
2. **Exact spacing** — use Tailwind's arbitrary values `[]` for non-standard sizes
3. **Hover states** — add last, confirm against reference
4. **Animations** — apply Framer Motion variants after layout is confirmed
5. **Accessibility** — add ARIA attributes, keyboard handlers, focus management

### 8. Image Fallbacks
Always provide `onError` handlers for avatar/user images:
```tsx
onError={(e) => {
  (e.currentTarget as HTMLImageElement).src =
    `https://ui-avatars.com/api/?name=${name}&background=FF385C&color=fff&size=56`
}}
```

### 9. Common Pitfalls
- Never use `outline: none` — use `focus-visible:outline-...` instead
- `sticky` positioning requires the parent to NOT have `overflow: hidden`
- `AnimatePresence` requires each child to have a unique `key`
- Body scroll lock: save and restore `document.body.style.overflow`
- `useCallback` all keyboard/navigation handlers to avoid stale closures in `useEffect`
