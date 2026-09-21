# Airbnb Listing Page Clone

A pixel-perfect clone of the Airbnb listing page built with **React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion**.

---

## Live Demo

> Deploy URL: _(update after Vercel deploy)_

---

## Features

### Three Views
| View | Description |
|------|-------------|
| **Listing Page** | Full property page — hero grid, details, amenities, dual-calendar date picker, reviews, map, host profile, house rules, sticky reservation card |
| **Photo Tour** | Full-screen overlay grid of all photos, grouped by room, with smooth open/close animation |
| **Lightbox** | Single-photo viewer with prev/next arrows, keyboard `←`/`→` nav, photo counter, dot indicators |

### Interactions & Accessibility
- `Esc` closes all overlays
- `←` / `→` keyboard navigation in Lightbox
- Focus moves to close button when overlay opens; returns to trigger on close
- `role="dialog"` + `aria-modal="true"` on all overlays
- Body scroll locked when overlays are open
- `focus-visible` outlines on all interactive elements
- `aria-live="polite"` on dynamic counters

### Animations
- Hero image scale on hover (400ms Framer Motion)
- Photo Tour: fade in/out (250ms)
- Lightbox: spring slide between photos
- Review cards: staggered fade-in on expand
- Hover overlays on all photo grids

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 19 + TypeScript (strict) |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animations | Framer Motion 13 |
| Icons | Lucide React |
| Data | Static TypeScript (`src/data/listing.ts`) |
| Deploy | Vercel |

---

## Project Structure

```
airbnb-clone/
├── .bob/
│   └── skills/
│       ├── pixel-perfect-ui.md       ← Design token + a11y skill
│       └── airbnb-clone-component.md ← Project-specific component skill
├── src/
│   ├── App.tsx                       ← Root, overlay state machine
│   ├── data/listing.ts               ← Static property data
│   └── components/
│       ├── ListingPage/              ← Main property view (10 sub-components)
│       ├── PhotoTour/                ← Full-screen photo grid overlay
│       └── Lightbox/                 ← Single photo viewer
├── public/
│   └── airbnb-icon.svg
├── index.html
├── vite.config.ts
├── tsconfig.json
└── vercel.json
```

---

## Run Locally

```bash
cd airbnb-clone
npm install
npm run dev
# → http://localhost:5173
```

## Build

```bash
npm run build     # TypeScript check + Vite build
npm run preview   # Preview production build
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

---

## Architecture Diagram

See `architecture-diagram.html` (or the exported PNG/PDF in the submission zip) for the production-scale system design covering:
- CDN / Edge layer
- API Gateway + Auth
- Microservices (Listings, Search, Booking, Payments, Messaging)
- Data layer (PostgreSQL, Redis, Elasticsearch, S3, Kafka)
- Observability, Security, CI/CD

---

## Bob Subagent Configs

`.bob/skills/` contains two skills used during development:

| Skill | Purpose |
|-------|---------|
| `pixel-perfect-ui.md` | Design tokens, animation values, a11y checklist |
| `airbnb-clone-component.md` | Component architecture, state flow, Tailwind/Framer conventions |
