---
name: airbnb-clone-component
description: >
  Use when creating or modifying any component in the Airbnb listing-page clone.
  Enforces design tokens, accessibility patterns, and animation conventions
  specific to this project.
---

# Airbnb Clone Component Skill

## Project Context
This is a pixel-perfect clone of an Airbnb listing page built with:
- **React 19** + **TypeScript** (strict mode)
- **Vite 8** as the build tool
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion 13** for animations
- **Lucide React** for icons

## Component Architecture
```
src/
├── App.tsx                    — Root: owns overlay state (none/phototour/lightbox)
├── data/listing.ts            — Static property data + TypeScript types
└── components/
    ├── ListingPage/           — Main property view
    │   ├── ListingPage.tsx    — Orchestrator, layout grid
    │   ├── Navbar.tsx         — Sticky header with logo + nav links
    │   ├── HeroGrid.tsx       — 1+4 photo grid with "Show all photos"
    │   ├── ListingHeader.tsx  — Title, rating, location breadcrumb
    │   ├── HostCard.tsx       — Host info inline (top of left column)
    │   ├── HighlightsSection.tsx — 3 highlight rows + description
    │   ├── AmenitiesSection.tsx  — Amenity grid with show/hide
    │   ├── DatePicker.tsx     — Dual-calendar date selector
    │   ├── ReviewsSection.tsx — Rating bars + review cards
    │   ├── LocationSection.tsx — Map placeholder
    │   ├── HostInfoSection.tsx — Full host profile
    │   ├── HouseRules.tsx     — 3-column things-to-know
    │   └── ReservationCard.tsx — Sticky sidebar with price + booking
    ├── PhotoTour/
    │   └── PhotoTour.tsx      — Full-screen photo grid overlay
    └── Lightbox/
        └── Lightbox.tsx       — Single photo viewer with nav
```

## State Flow
```
App (overlay: 'none' | 'phototour' | { lightbox, index })
 ├── ListingPage → onShowAllPhotos() → opens PhotoTour
 │                onPhotoClick(i) → opens Lightbox at i
 ├── PhotoTour  → onClose() → back to none
 │              → onPhotoClick(i) → opens Lightbox at i
 └── Lightbox   → onClose() → back to none
```

## Overlay Conventions
Every overlay MUST:
1. Use `role="dialog"` + `aria-modal="true"`
2. Move focus to close button on mount (`closeButtonRef.current?.focus()`)
3. Restore focus to trigger on unmount (`previousFocusRef.current?.focus()`)
4. Lock body scroll (`document.body.style.overflow = 'hidden'`) and restore on cleanup
5. Close on `Escape` key via `window.addEventListener('keydown', ...)`
6. Use `motion.div` with `initial/animate/exit` for enter/exit animation
7. Be wrapped in `<AnimatePresence>` in the parent

## Tailwind Conventions
- Use `[#HEXVAL]` for Airbnb brand colours (not custom config)
- Use `focus-visible:outline-2 focus-visible:outline-[#222]` on all buttons
- Never add `outline-none` to buttons
- Hover states: `hover:bg-[#F7F7F7]` for surface hovers, `hover:text-[#717171]` for text

## Adding New Components
1. Place in the appropriate subdirectory
2. Use named exports, not default-only
3. Define a `Props` interface at the top of the file
4. All image `<img>` tags need an `alt` prop and `onError` fallback for user avatars
5. Wrap in `motion.*` only if the component has an animation requirement
