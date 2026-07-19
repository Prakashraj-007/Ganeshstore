# UNDERSTANDME.md — Sri Ganesh Store Website

A plain-language guide to everything that was built, how it's organized, and how to change it.

---

## 1. What This Project Is

A **modern, premium, responsive business website** for **Sri Ganesh Store** — a wholesale & retail provision store.

- It is **NOT an e-commerce site**. There is no cart, no checkout, no product listings.
- Its purpose: showcase the business, build customer trust, and attract wholesale/B2B customers (hotels, restaurants, caterers).
- The **Business Customer Portal** is a placeholder "Coming Soon" page only. Ordering system, admin panel and backend come in later phases.

**Status:** Phase 1 complete. Production build passes, ESLint clean, all 8 routes verified working (July 2026).

---

## 2. Tech Stack

| Tool | Version | Used For |
|---|---|---|
| Next.js (App Router) | 16.2.10 | Framework — all pages are statically prerendered |
| React | 19 | UI |
| TypeScript | 5 | Type safety |
| Tailwind CSS | v4 | All styling (theme configured in CSS, **no** `tailwind.config.js`) |
| Framer Motion | 12 | Animations (scroll reveals, counters, slider, mobile menu) |
| Lucide React | 1.24 | Icons |
| next/font | built-in | Poppins (headings) + Inter (body) |

---

## 3. How to Run

```bash
npm install        # first time only
npm run dev        # development at http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
```

---

## 4. Pages (Routes)

| Route | File | What's On It |
|---|---|---|
| `/` | `src/app/page.tsx` | Home: Hero + stats, Why Choose Us, Services, Categories preview, Hotels & Restaurants band, Achievements counters, Gallery preview, Testimonials slider, CTA band |
| `/about` | `src/app/about/page.tsx` | Company intro, Mission & Vision cards, business history timeline (1999–2024), Why Choose Us |
| `/services` | `src/app/services/page.tsx` | All 8 services as cards |
| `/categories` | `src/app/categories/page.tsx` | 12 product categories (icons only — **no products**, by design) |
| `/hotels-restaurants` | `src/app/hotels-restaurants/page.tsx` | 5 business segments, 6 B2B benefits, 4-step "How It Works", portal CTAs |
| `/gallery` | `src/app/gallery/page.tsx` | Masonry gallery with filters: All / Shop / Warehouse / Delivery / Shelves |
| `/contact` | `src/app/contact/page.tsx` | Phone, WhatsApp, Email, Hours cards + address + embedded Google Map |
| `/portal` | `src/app/portal/page.tsx` | **Placeholder** "Coming Soon" page for the future Business Customer Portal |

Also: `src/app/loading.tsx` — global loading spinner, `src/app/layout.tsx` — root layout (fonts, metadata, Navbar + Footer wrap every page).

---

## 5. THE MOST IMPORTANT FILE: `src/lib/data.ts`

**Almost all website content lives in this single file.** Edit it to change the site without touching any component.

It contains:

- `BUSINESS` — name, tagline, **phone, WhatsApp number/link, email, address, business hours, Google Maps embed URL**. ⚠️ These are placeholder values — replace with real details.
- `NAV_LINKS` — navbar/footer menu items
- `HERO_STATS` — the 6 stat cards on the hero (years, customers, hotels, restaurants, caterers, wholesale clients)
- `ACHIEVEMENTS` — the 5 animated counters
- `WHY_CHOOSE_US` — 7 feature cards
- `SERVICES` — 8 service cards
- `CATEGORIES` — 12 product categories (each with icon + color tint)
- `B2B_SEGMENTS` / `B2B_BENEFITS` — Hotels & Restaurants page content
- `TIMELINE` — About page history milestones (placeholder story — edit to the real one)
- `TESTIMONIALS` — slider quotes (placeholder names — replace with real customers)
- `GALLERY_IMAGES` — gallery photos (currently Unsplash URLs — swap for real shop photos)
- `HERO_IMAGE`, `ABOUT_IMAGE`, `B2B_IMAGE` — large page images

**To use your own photos:** put files in `public/` (e.g. `public/gallery/shop1.jpg`) and change the URLs in `data.ts` to `/gallery/shop1.jpg`. If you keep external images from another domain, add that domain to `next.config.ts` → `images.remotePatterns`.

---

## 6. Component Structure

```
src/
├── app/                    # pages (see table above)
├── lib/
│   └── data.ts             # ← ALL content/data (edit this)
└── components/
    ├── layout/
    │   ├── Navbar.tsx      # fixed navbar: transparent over hero → glass on scroll,
    │   │                   #   animated active-link pill, mobile drawer, orange portal CTA
    │   └── Footer.tsx      # quick links, services, contact, social icons, copyright
    ├── home/               # home-page sections
    │   ├── Hero.tsx        # banner + heading + 2 CTAs + 6 glass stat cards
    │   ├── WhyChooseUs.tsx
    │   ├── ServicesSection.tsx
    │   ├── CategoriesGrid.tsx   # reused on /categories via `full` prop
    │   ├── B2BSection.tsx       # dark green Hotels & Restaurants band
    │   ├── Achievements.tsx     # animated counters
    │   ├── GalleryPreview.tsx   # first 6 gallery images
    │   └── Testimonials.tsx     # auto-playing slider (6s), arrows + dots
    └── ui/                 # reusable building blocks
        ├── Reveal.tsx      # scroll-reveal animation wrapper (respects reduced motion)
        ├── Counter.tsx     # count-up number when scrolled into view
        ├── SectionHeading.tsx  # eyebrow chip + title + description
        ├── FeatureCard.tsx     # icon card used for services/features/benefits
        ├── PageHero.tsx        # green gradient header band on inner pages
        ├── GalleryGrid.tsx     # masonry grid (CSS columns) + optional filters
        └── CtaBand.tsx         # closing call-to-action band (call / WhatsApp / portal)
```

---

## 7. Design System

Defined in `src/app/globals.css` using Tailwind v4's `@theme` block (no JS config file):

**Colors** (use as `bg-primary`, `text-accent`, etc.):
| Token | Value | Use |
|---|---|---|
| `primary` | `#1B5E20` | dark green — brand |
| `primary-dark` | `#124116` | footer, dark bands |
| `primary-light` | `#2E7D32` | gradients, hovers |
| `accent` | `#FF9800` | orange — CTAs, highlights |
| `accent-dark` | `#EF6C00` | CTA hover |
| `surface` | `#F8F9FA` | light section backgrounds |
| `ink` | `#333333` | body text |

**Fonts:** `font-display` = Poppins (headings), `font-sans` = Inter (body). Loaded via `next/font` in `layout.tsx`.

**Shadows:** `shadow-soft` (resting cards) and `shadow-lift` (hover) — custom, green-tinted.

**Glassmorphism:** `.glass` (light frosted, e.g. scrolled navbar) and `.glass-dark` (dark frosted, e.g. hero stat cards) utility classes.

**Recurring patterns:**
- Cards: `rounded-2xl bg-white p-7 shadow-soft ring-1 ring-ink/5` + hover `-translate-y-1.5 shadow-lift`
- Buttons: `rounded-full` pills — white (secondary), orange `bg-accent` (primary CTA), outlined
- Section rhythm: `py-24 sm:py-28`, container `max-w-7xl px-4 sm:px-6 lg:px-8`, alternating white / `surface` backgrounds
- Animations: every section fades/slides in on scroll via `<Reveal>`; counters animate on view; smooth scrolling enabled globally

**Responsive:** mobile-first. Grids go 2 cols (mobile) → 3 (tablet) → 4–6 (desktop). Navbar collapses to hamburger below `xl`.

---

## 8. Gotchas & Notes

1. **Lucide has no brand icons** (Facebook, Instagram, X, LinkedIn were removed from the library). The Footer uses small **inline SVGs** for these instead. Social links currently point to `#` — add real URLs in `Footer.tsx` → `SOCIALS`.
2. **Tailwind v4** — theme is in `globals.css` (`@theme` block), NOT `tailwind.config.js`. Don't create one.
3. **Project folder is `C:\myproject\GS`** but the npm package is named `gs-website` (npm forbids capital letters; app was scaffolded in a temp folder and moved here).
4. **Testimonials slider** auto-advances every 6 seconds; interacting with arrows/dots resets the timer.
5. **Google Map** on `/contact` uses a generic embed query — replace `BUSINESS.mapEmbed` in `data.ts` with the store's real embed URL (Google Maps → Share → Embed a map).
6. Everything is a **server component** except the interactive ones marked `"use client"`: Navbar, Hero, Testimonials, GalleryGrid, Reveal, Counter.
7. All 8 routes are **statically prerendered** — the site can be hosted anywhere Node runs, or exported/deployed to Vercel/Netlify easily.

---

## 9. Before Going Live — Checklist

- [ ] Replace phone, WhatsApp, email, address, hours in `src/lib/data.ts` (`BUSINESS`)
- [ ] Replace the Google Maps embed URL (`BUSINESS.mapEmbed`)
- [ ] Replace Unsplash images with real shop/warehouse/delivery photos
- [ ] Replace placeholder testimonials with real customer quotes
- [ ] Edit the About-page `TIMELINE` to the real business history
- [ ] Verify the stats/achievement numbers are accurate
- [ ] Add real social media URLs in `Footer.tsx`
- [ ] Update `metadata` descriptions if wording changes

## 10. Future Phases (Not Yet Built)

- Business Customer Portal (ordering system) — currently `/portal` placeholder
- Admin panel
- Backend / database
