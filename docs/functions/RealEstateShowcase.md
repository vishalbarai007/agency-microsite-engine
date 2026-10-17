# Luxury Real Estate Landing Page Architecture & 2-Day Turnaround Framework

## 1. Executive Summary & The 2-Day Delivery SOP

Real estate developers, luxury high-rises, residential towers, and private villa collections represent an agency's highest-margin web category ($2,000 to $6,000 per project). 

To scale client acquisition and guarantee rapid, predictable execution, this engine enforces a **2-Day Turnaround SOP**:
- **Day 1: Scaffold & Staging**: Ingest the client's brand logo, extract the primary/accent color scheme, populate decoupled data contracts (`src/data/`), scaffold the 10 core luxury sections and 3 modal suites, and deploy an interactive V1 staging link for client review.
- **Day 2: Revisions & Production Launch**: Incorporate client copy/pricing adjustments strictly via `src/data/*.ts` without touching React JSX, wire Google Sheets webhook and Resend email alerts, execute mobile and Core Web Vitals (CWV) QA, connect custom domain, and hand over the live website by end of Day 2.

```
┌─────────────────────────────────────────────────────────────┐
│ DAY 1: SCAFFOLD VERSION 1                                   │
│ Logo Extraction -> client-spec.json -> Data Contracts ->    │
│ 10 Sections + 3 Modals -> Deploy V1 Preview to Client       │
├─────────────────────────────────────────────────────────────┤
│ DAY 2: REVISIONS & HANDOFF                                  │
│ Client Feedback -> src/data/*.ts edits -> Lead Routing ->   │
│ Mobile/CWV QA -> Custom Domain Mapping -> Production Deploy │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Standard 10-Section Architecture & Flow

Every real estate microsite generated through this engine uses the battle-tested, high-converting section flow proven in production:

| Section | Component | Functionality & Key Interactions |
| :--- | :--- | :--- |
| **01. Sticky Header** | `LuxuryNavbar.tsx` | Glassmorphic floating header (`backdrop-blur-md`), brand logo, section anchors (`#about`, `#gallery`, `#amenities`, `#residences`, `#location`), direct phone dialer, and "Schedule Private Viewing" CTA. |
| **02. Hero Parallax** | `HeroParallax.tsx` | Full-bleed Aperture Carousel with smooth transitions or looping video background, dynamic room switcher thumbnails (1 BHK, 2 BHK, 3 BHK, Living Salon), floating project badges, and 3 quick action buttons: "Book Private Tour", "Download Brochure", "Watch Film". |
| **03. Project Overview** | `About.tsx` | Editorial split-screen layout: evocative architectural narrative with luxury serif italic accents, key metrics grid (Towers, Storeys, Units, Possession), and full-bleed high-res render with subtle hover zoom (`hover:scale-105 duration-700`). |
| **04. Developer Legacy** | `AboutHumDeveloper.tsx` | Builder credibility, track record (delivered sqft, happy families, on-time possession track record), MahaRERA / RERA certificate badge with authentic QR code. |
| **05. Curated Gallery** | `ImageGallery.tsx` | Master GSAP Timeline pinned scroller: Title scale-up -> Center photo expands to full-screen (100vw x 100vh) -> Horizontal scroller across categorized renders (Exterior, Living Salon, Master Bedroom, Sky Terrace) with interactive lightbox modal zoom. |
| **06. Lifestyle Amenities**| `AmenityScroller.tsx` | Curated lifestyle amenity cards (Infinity Pool, Sky Lounge, Wellness Gym, Zen Garden, Children's Play Zone) with `AmenityDetailModal.tsx` for deep dive specifications and high-res photography. |
| **07. Residences & Plans** | `FloorPlanScrubber.tsx` | Interactive typology selector (1 BHK, 2 BHK, 3 BHK, Penthouse, Villa), carpet area specifications (Sq.Ft./Sq.M.), room dimensions, ceiling height, facing, and high-res blueprint zoom lightbox. |
| **08. Location Radar** | `LocationRadar.tsx` | Strategic connectivity radar displaying commute times (Metro 3 mins, Airport 25 mins, Business District 10 mins, Schools & Malls 8 mins) with styled interactive or minimalist architectural map. |
| **09. VIP Sales Suite** | `Contact.tsx` | Interactive private visit scheduler with date picker, slot selector, unit choice, phone/email validation, WhatsApp direct link with pre-filled message, and physical sales gallery location. |
| **10. Regulatory Footer**| `Footer.tsx` | Comprehensive legal disclaimers, official MahaRERA / local RERA registration number, authentic QR code preview, developer copyright, and navigation links. |

### Interactive Modal Suite:
- **`BookingModal.tsx`**: VIP Private Viewing appointment scheduler drawer with slot and date selection.
- **`BrochureModal.tsx`**: Instant PDF E-Brochure digital download gate capturing lead phone and email.
- **`BrandFilmModal.tsx`**: Cinematic full-screen video player modal with audio toggle and viewing CTA.

---

## 3. Aesthetic Principles & Editorial Standards

### 3.1 Minimal Content, Rich Imagery Rule (75 / 25 Ratio)
- Real estate is sold through **spatial volume, lighting, and finishes**, not walls of text.
- Maintain a strict 75% visual to 25% text ratio across all sections.
- Keep paragraphs under 3 sentences. Highlight key phrases using bold text or metadata badges (`G+21 STOREYS`, `DEC 2026 POSSESSION`).
- Source or render high-impact architectural imagery: golden hour natural sunlight, warm dusk exterior lighting with glowing interiors, double-height ceilings, and macro material textures (Italian marble, raw travertine, brushed bronze).

### 3.2 Editorial Typography & Italic Accents
- **Headings**: Cormorant Garamond or Playfair Display (`font-heading`, `font-serif`).
- **Curated Italic Accents**: Deliberately style 1 or 2 emotional words per headline in an elegant, lighter italic serif:
  ```tsx
  <h2 className="font-heading text-4xl sm:text-5xl text-slate-900 leading-tight">
    Modern Homes.<br />
    <span className="italic font-light">Elevated</span><br />
    Lifestyle.
  </h2>
  ```
- **Body Font**: Modern, crisp sans-serif (`font-sans` e.g., Plus Jakarta Sans, Inter, Jost).
- **Metadata Badges**: Clean uppercase sans or monospace with wide tracking (`text-xs uppercase tracking-[0.25em] font-bold`).

### 3.3 Dynamic Theming Derived from Company Logo
The client website palette is derived directly from their provided company or project logo:

| Brand Logo Palette | Primary Accent | Secondary Tone | Background Base | Mood |
| :--- | :--- | :--- | :--- | :--- |
| **Sapphire / Royal Blue** (e.g. Hum Emerald / Hum Sapphire) | `#265CA0` | `#183C68` (Deep Navy) | Crisp White `#FFFFFF` or Ice `#F8FAFC` | Prestigious, architectural urban living |
| **Bronze / Tuscan Terracotta** (e.g. Mejuma Tuscany) | `#C5A880` | `#38352C` (Espresso Stone) | Warm Linen `#FAF8F5` | Earthy, artisanal, serene timeless luxury |
| **Warm Gold & Noir** (e.g. Sobha Privy Collection) | `#D4AF37` / `#9B802E` | `#0F0F11` (Obsidian) | Noir Slate `#0B0F17` | High-roller, opulent, dramatic night glamour |
| **Super Minimalist Blanc & Noir** (e.g. Mr. C Residences) | `#111111` | `#71717A` (Muted Zinc) | Pure White `#FFFFFF` | Understated ultra-wealth, gallery quiet luxury |
| **Emerald Forest Green** | `#1B4D3E` | `#0D281E` | Alabaster `#F7F9F6` | Biophilic, sanctuary, sustainable luxury |

#### Universal Luxury Denominators:
- **Image Hover Scaling**: `transition-transform duration-700 ease-out hover:scale-105` on all cards and gallery slides.
- **Hairline Framing**: `border-white/10` (dark mode) or `border-slate-200` (light mode).
- **Tactile Grain / Textures**: Subtle noise overlay options to convey editorial print texture.
- **Scroll Inertia**: Lenis smooth scroll or GSAP ScrollTrigger scrubbing.

---

## 4. Live Benchmark References

The agent and engineering team reference these live production benchmarks for interaction design, pacing, and layout rhythm:

1. **[Mejuma Tuscany](https://www.mejuma-tuscany.com/)**
   - *Aesthetic*: Tuscan turnkey villa development.
   - *Takeaways*: Earthy warm palette (`#38352C`, `#F1F1F1`), slow cinematic storytelling, line reveal animations (`width: 0%` to `100%`), natural stone textures, minimal whitespace pacing.
2. **[Azimute Residencial](https://azimuteresidencial.com.br/)**
   - *Aesthetic*: Modern coastal architectural residential tower in Brazil.
   - *Takeaways*: High-impact looping video background, clean typography, interactive floorplan viewer, neighborhood connectivity radar, smooth scroll transitions.
3. **[Mr. C Residences Boca Raton (Super Minimal)](https://mrcresidencesbocaraton.com/)**
   - *Aesthetic*: Ultra-minimalist luxury hotel-branded condominiums.
   - *Takeaways*: Extreme minimalism, maximum whitespace, high-impact photography, refined serif/italic accents, zero visual clutter, discreet VIP inquiry triggers.
4. **[Sobha Privy Collection](https://sobha-privy-collection.com/)**
   - *Aesthetic*: Dubai waterfront & skyline ultra-luxury residences.
   - *Takeaways*: Deep dark luxury noir and warm gold accents, full-bleed interactive visual gallery, instant digital brochure download gate, private viewing scheduler.
5. **[HUM Emerald Heights (Vercel Benchmark)](https://newhum-one.vercel.app/)**
   - *Aesthetic*: Proven production benchmark for Hum Developers.
   - *Takeaways*: Full 10-section flow, aperture carousel with room switchers, master GSAP scroll gallery, interactive floorplan scrubber, location radar, and complete modal suite.
6. **[HUM Sapphire (Vercel Benchmark)](https://hum-sapphire-rho.vercel.app/)**
   - *Aesthetic*: Proven production benchmark for Hum Sapphire.
   - *Takeaways*: High-converting VIP lead capture, MahaRERA QR integration, responsive mobile experience.

---

## 5. Decoupled Content Contracts (`src/data/`)

To preserve the 2-day delivery SLA, all client-customizable data must reside in decoupled TypeScript files:
- `src/data/units.ts`: Typologies, carpet area, bedrooms, floor plans, pricing guidance, inventory availability.
- `src/data/projects.ts`: Project narrative, location, possession date, RERA details, gallery images.
- `src/data/amenities.ts`: Lifestyle amenities list, descriptions, and high-res photography.
- `src/data/siteConfig.ts`: Contact info, sales gallery coordinates, WhatsApp number, meta tags.

**Rule**: During Day 2 revisions, the agent must NEVER modify React component logic or JSX to update client copy, pricing, or photos. All modifications must be made strictly inside `src/data/*.ts`.
