# Agent Rule: Luxury Real Estate Landing Page Architecture & 2-Day Delivery Standard

## 1. Scope & Objective
This rule governs the autonomous generation, styling, and delivery of all **Real Estate Showcase** microsites and property landing pages. 

When a user or client requests a landing page for any real estate development (residential tower, penthouse collection, luxury villa enclave, or turnkey estate), the agent must unconditionally follow this architecture to guarantee a **2-day delivery cycle**:
- **Day 1**: Ingest brand logo, extract dynamic color palette, populate decoupled data contracts, scaffold complete V1 landing page (10 sections + 3 modals), and ship interactive staging URL.
- **Day 2**: Process client copy/image tweaks via `src/data/*.ts` without touching React JSX, verify lead capture routing, conduct CWV/responsive QA, and deploy to production by end of Day 2.

---

## 2. Mandatory 10-Section Architecture & Flow

All real estate landing pages must implement the following sequential section flow in `app/(site)/page.tsx`:

| Order | Section Component | Purpose & Interaction | Core Visuals |
| :--- | :--- | :--- | :--- |
| **01** | `LuxuryNavbar` | Floating glassmorphic header, sticky blur on scroll, brand logo, direct call hotline, VIP appointment CTA. | Brand logo, subtle border, smooth backdrop-blur |
| **02** | `HeroParallax` | Aperture Carousel or looping video hero with interactive typology switcher pills (1BHK, 2BHK, 3BHK, Salon), floating badges, and 3 CTA triggers: "Book Private Tour", "Download Brochure", "Watch Film". | Full-bleed architectural renders or 4K drone video |
| **03** | `About` (Project) | Editorial architectural overview. Asymmetric split: evocative poetic copy with serif italic accents on the left, full-bleed render with hover zoom on the right. Key metrics grid (Towers, Storeys, Units, Possession). | High-res exterior render (`hover:scale-105 duration-700`) |
| **04** | `AboutDeveloper` | Developer trust & legacy builder. Track record (Sq.Ft. delivered, awards, decades of trust), MahaRERA / RERA certificate badge with authentic QR code. | Developer executive portraits, awards, RERA QR code |
| **05** | `ImageGallery` | Master GSAP Timeline pinned scroller. Stage 1: Title scale-up; Stage 2: Center photo expand to 100vw x 100vh; Stage 3: Smooth horizontal scroller across categorized renders (Exterior, Living, Bedroom, Amenities) with lightbox modal zoom. | High-res staged interior & exterior photography |
| **06** | `AmenityScroller` | Curated lifestyle amenities (Infinity Pool, Sky Lounge, Fitness Center, Zen Garden, Children's Arena). Each card triggers `AmenityDetailModal` for deep dive specs. | Close-up lifestyle photography |
| **07** | `FloorPlanScrubber` | Interactive typology selector (1BHK, 2BHK, 3BHK, Penthouse). Displays carpet area (Sq.Ft./Sq.M.), room dimensions, ceiling height, facing, and opens blueprint zoom modal. | High-res architectural 2D/3D floor plan blueprints |
| **08** | `LocationRadar` | Strategic connectivity matrix showing commute times (Metro, Airport, Business Hubs, Schools, Malls) with styled interactive or vector map visual. | Neighborhood landmarks, transit lines, distances |
| **09** | `Contact` | VIP Sales Gallery suite. Interactive visit scheduler (date picker, slot selection, unit choice, phone/email validation), WhatsApp direct chat, physical gallery address, directions. | Map embed, sales gallery photography |
| **10** | `Footer` | Comprehensive legal disclaimers, official MahaRERA / state registration number, QR code preview, privacy policy, and copyright. | Regulatory badges, developer branding |

### Persistent Modal Suite:
- `BookingModal`: VIP Private Viewing appointment scheduler with date picker, slot selector, and lead capture.
- `BrochureModal`: Instant digital brochure download gate capturing phone number and email address.
- `BrandFilmModal`: Cinematic full-screen property video player modal with audio toggle and viewing CTA.

---

## 3. Aesthetic Principles: Minimal Content, Rich Imagery & Editorial Typography

### 3.1 The 75 / 25 Visual-to-Text Ratio
Real estate is a high-ticket, emotion-driven decision. Buyers want to experience the spatial volume, daylight, and premium finishes.
- **Never create dense text walls**. Limit paragraphs to 2 to 3 concise sentences.
- Use **editorial headlines** paired with metadata badges (e.g. `G+21 STOREYS`, `DEC 2026 POSSESSION`, `ZERO SPACE WASTAGE`).
- Rely on rich, professional architectural photography: golden hour natural light, illuminated dusk exterior elevations, double-height ceilings, and macro material textures (Italian marble, raw travertine, brushed bronze).

### 3.2 Luxury Typography & Deliberate Italic Accents
- **Headings**: Use a distinguished luxury serif (`font-heading`, `font-serif` e.g., *Cormorant Garamond*, *Playfair Display*, *Cinzel*).
- **Curated Italic Accents**: Style 1 or 2 high-emotion words in each headline in a lighter, italic serif:
  ```html
  <h2 className="font-heading text-4xl sm:text-5xl text-slate-900 leading-tight">
    Modern Homes.<br />
    <span className="italic font-light">Elevated</span><br />
    Lifestyle.
  </h2>
  ```
- **Body Font**: Use a clean, modern, ultra-legible sans-serif (`font-sans` e.g., *Plus Jakarta Sans*, *Inter*, *Outfit*).
- **Caps Badges**: `text-xs uppercase tracking-[0.25em] font-bold` for metadata tags and section subtitles.

### 3.3 Dynamic Theming Derived from Company Logo
The color scheme must be derived directly from the client's provided company or project logo, ensuring tailored brand alignment:

1. **Sapphire / Royal Blue Theme** (e.g., Hum Emerald / Hum Sapphire):
   - Primary: `#265CA0` | Secondary: `#183C68` | Background: `#FFFFFF` / `#F8FAFC`
   - Vibe: Prestigious, crisp, architectural urban living.
2. **Tuscan Bronze & Terracotta Theme** (e.g., Mejuma Tuscany):
   - Primary: `#C5A880` | Accent: `#38352C` (Espresso Stone) | Background: `#FAF8F5` (Warm Linen)
   - Vibe: Artisanal, earthy, serene, private estate sanctuary.
3. **High-Roller Gold & Noir Theme** (e.g., Sobha Privy Collection):
   - Primary: `#D4AF37` / `#9B802E` | Secondary: `#0F0F11` (Obsidian) | Background: `#0B0F17`
   - Vibe: Opulent, dramatic, ultra-luxury high-rise penthouses.
4. **Super Minimalist Blanc & Noir Theme** (e.g., Mr. C Residences Boca Raton):
   - Primary: `#111111` | Secondary: `#71717A` (Muted Zinc) | Background: `#FFFFFF`
   - Vibe: Understated ultra-wealth, gallery whitespace, refined quiet luxury.
5. **Emerald Botanical Green Theme**:
   - Primary: `#1B4D3E` | Secondary: `#0D281E` | Background: `#F7F9F6`
   - Vibe: Biophilic, sustainable forest living, eco-resort villas.

#### Universal Luxury Denominators (Across All Themes):
- **Image Hover Effects**: `hover:scale-105 transition-transform duration-700 ease-out`.
- **Hairline Borders**: `border-white/10` (dark) or `border-slate-200` (light) for refined framing.
- **Scroll Inertia**: Lenis smooth scroll or GSAP ScrollTrigger scrubbing.
- **Glassmorphism**: `backdrop-blur-md` on sticky navbars and modal overlays.

---

## 4. Benchmark References & Key Takeaways

Agents must reference and match the standard of these real-world benchmarks:

1. **[Mejuma Tuscany](https://www.mejuma-tuscany.com/)**
   - *Aesthetic*: Tuscan turnkey villa development.
   - *Key Takeaways*: Earthy warm palette (`#38352C`, `#F1F1F1`), slow cinematic storytelling, line reveal animations (`width: 0%` to `100%`), natural stone textures, minimal whitespace pacing.
2. **[Azimute Residencial](https://azimuteresidencial.com.br/)**
   - *Aesthetic*: Modern coastal residential development.
   - *Key Takeaways*: High-impact looping video background, clean typography, interactive floorplan viewer, neighborhood connectivity radar, smooth scroll transitions.
3. **[Mr. C Residences Boca Raton (Super Minimal)](https://mrcresidencesbocaraton.com/)**
   - *Aesthetic*: Ultra-minimalist luxury hotel-branded condominiums.
   - *Key Takeaways*: Extreme minimalism, maximum whitespace, high-impact photography, refined serif/italic accents, zero visual clutter, discreet VIP inquiry triggers.
4. **[Sobha Privy Collection](https://sobha-privy-collection.com/)**
   - *Aesthetic*: Dubai waterfront & skyline ultra-luxury residences.
   - *Key Takeaways*: Deep dark luxury noir and warm gold accents, full-bleed interactive visual gallery, instant digital brochure download gate, private viewing scheduler.
5. **[HUM Emerald Heights (Vercel Benchmark)](https://newhum-one.vercel.app/)**
   - *Aesthetic*: Proven production benchmark for Hum Developers.
   - *Key Takeaways*: Full 10-section flow, aperture carousel with room switchers, master GSAP scroll gallery, interactive floorplan scrubber, location radar, and complete modal suite.
6. **[HUM Sapphire (Vercel Benchmark)](https://hum-sapphire-rho.vercel.app/)**
   - *Aesthetic*: Proven production benchmark for Hum Sapphire.
   - *Key Takeaways*: High-converting VIP lead capture, MahaRERA QR integration, responsive mobile experience.

---

## 5. Decoupled Content Contracts (`src/data/`)

To preserve the 2-day delivery SLA, all client-customizable data must reside in decoupled TypeScript files:
- `src/data/units.ts`: Typologies, carpet area, bedrooms, floor plans, pricing guidance, inventory availability.
- `src/data/projects.ts`: Project narrative, location, possession date, RERA details, gallery images.
- `src/data/amenities.ts`: Lifestyle amenities list, descriptions, and high-res photography.
- `src/data/siteConfig.ts`: Contact info, sales gallery coordinates, WhatsApp number, meta tags.

**Rule**: During Day 2 revisions, the agent must NEVER modify React component logic or JSX to update client copy, pricing, or photos. All modifications must be made strictly inside `src/data/*.ts`.

---

## 6. Pre-Flight Delivery Checklist
Before delivering the project to the client at the end of Day 2, verify:
- [ ] Brand colors match the company logo accurately.
- [ ] All 10 core sections are active and visually balanced.
- [ ] BookingModal, BrochureModal, and BrandFilmModal open and close smoothly without scroll locking bugs.
- [ ] FloorPlanScrubber shows clear carpet area specifications and blueprint zoom works on touch & desktop.
- [ ] Lead capture sends data to Google Sheets and triggers email alert via Resend.
- [ ] WhatsApp button opens direct chat with pre-filled inquiry text.
- [ ] MahaRERA / local RERA number and QR code are displayed prominently in the Footer and Developer section.
- [ ] Mobile navigation and responsiveness verified across 375px, 768px, and 1280px+ viewports.
