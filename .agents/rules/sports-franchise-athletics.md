# Agent Rule: Sports Franchise, Athletics & Motorsports Microsite Architecture

## 1. Scope & Objective
This rule governs the autonomous generation, styling, animation, 3D integration, and delivery of all **Sports Franchise, Athletic Club, Motorsports / F1 Team, and Tournament** microsites.

When a client or user requests a website for a sports franchise (cricket, football, basketball, motorsport racing team, rugby, or athletic performance academy), the agent must unconditionally follow this architecture to guarantee a **3-day production delivery standard**:
- **Day 1**: Ingest club crest/logo, extract dynamic color palette, populate decoupled data contracts (`src/data/*.ts` for roster, fixtures, standings, milestones, sponsors), scaffold all 11 core sections, and deploy an interactive staging link.
- **Day 2**: Configure interactive Three.js 3D assets (ball / helmet / trophy / vehicle), wire GSAP ScrollTrigger depth zoom and clip-path card stacks, refine semi-transparent glassmorphic Bento news grids, and verify mobile touch interactions.
- **Day 3**: Optimize Core Web Vitals (CWV), bundle performance, responsive testing across mobile/tablet/desktop, verify lead/partnership routing, and ship production build.

---

## 2. Benchmark References & Architectural Takeaways

All sports implementations must reference and embody the design, flow, and motion standards established by these world-class benchmarks:

### 1. [Nick Ho Motorsports](https://nickho-motorsports.nl/)
- **Core Aesthetic**: High-octane motorsport speed, architectural precision, dark mode noir with radiant amber/orange energy.
- **Key Architectural Takeaways**:
  - **Pinned Depth Scroll Hero**: Section is pinned via GSAP ScrollTrigger for at least **80vh–85vh** of physical scroll distance. The giant centerpiece typography (e.g. `LEEDS`, `MOTORSPORTS`, `RACING`) scales up dramatically (1x &rarr; 7x) zooming past the camera while smoothly fading out, disappearing completely only after scrolling 80vh+.
  - **Architectural Dividers**: Ultra-fine vertical grid lines (`border-white/[0.04]` to `border-white/[0.08]`) establishing structure across the viewport.
  - **3-Column Centered Layout**: Left stats column (matches, wins, win-rate), center hero typography, right team motto & venue info, and bottom matchday card.
  - **Sponsors Depth Wall**: Pinned 200vh viewport with dual vertical columns translating upward with scroll inertia around a central pinned 3D asset.

### 2. [Cadillac F1 Team](https://www.cadillacf1team.com/)
- **Core Aesthetic**: Elite factory racing, aerodynamic precision, technical telemetry, carbon-fiber dark mode with stark contrast typography.
- **Key Architectural Takeaways**:
  - **Clip-Path Vertical Card Stacking**: Pinned desktop roster stack where each card reveals from bottom to top using `clipPath: inset(100% 0% 0% 0%)` &rarr; `inset(0% 0% 0% 0%)`, stacking like technical telemetry cards.
  - **Cutout Player & Driver Photography**: Transparent high-resolution athlete cutouts paired with large oversized jersey number watermarks (`text-[18vw]` with subtle opacity).
  - **Telemetry Badges**: Compact athletic stat badges (Role, Nationality, Strike Rate, Wickets, Podium Finishes, Lap Times).

### 3. [Gallery Play](https://gallery-play.be/)
- **Core Aesthetic**: Dynamic kinetic energy, interactive athletics, editorial movement, full-bleed media scaling.
- **Key Architectural Takeaways**:
  - **Expanding GSAP Full-Screen Scroller**: 3-card preview carousel that scales and expands on scroll from a contained card to a 100vw &times; 100vh cinematic full-screen gallery.
  - **Micro-Interactions**: Magnetic hover effects, custom cursors, smooth drag velocity, and high-contrast editorial captions.

### 4. [Manchester United](https://www.manutd.com/en)
- **Core Aesthetic**: Historic sports dynasty, matchday tension, fan culture, dispatches, commercial partner synergy.
- **Key Architectural Takeaways**:
  - **Matchday Fixtures & Countdown**: Prominent fixture ticker with venue, opponent crests, and live ticking countdown clock (Days / Hours / Mins / Secs).
  - **Championship Trophy & Milestone Showcase**: Historic honors timeline with interactive year scrubbers (e.g. 2016, 2018, 2024), illuminated trophy renders, and record lists.
  - **League Points Table**: Clean, high-energy standings grid with current form indicators (`W`, `L`, `D` pills) and dynamic highlighting for the home club.

### 5. [The Performance Lab](https://theperformancelab.ca/)
- **Core Aesthetic**: Athletic human performance, biometric science, brutalist sports typography, clean monochromatic contrast with vivid neon/orange accents.
- **Key Architectural Takeaways**:
  - **Frosted Semi-Transparent Bento Grids**: Glassmorphic dispatches and facility cards (`bg-white/10 backdrop-blur-md border border-white/20`) that let vibrant club gradient colors glow through.
  - **High-Contrast Typography**: Ultra-bold condensed headings (`font-black uppercase tracking-tight`) paired with modern monospace or geometric sans-serif metadata.

---

## 3. Mandatory 11-Section Sports Architecture & Flow

Every sports microsite must implement the following sequential section flow in `app/(site)/page.tsx`:

| Order | Section Component | Purpose & Interaction | Key Animation / 3D Specs |
| :--- | :--- | :--- | :--- |
| **01** | `SportsNavbar` | Floating header with club crest, quick overlay drawer, and partner CTA. | Transparent on hero &rarr; converts to vibrant team gradient on scroll with drop-down logo badge. |
| **02** | `HeroDepthScroll` | Cinematic team photo hero with 3-column layout, left stats, right details, and bottom countdown card. | **GSAP Pinned Depth Scroll**: Center typography zooms 1x &rarr; 7x toward camera, disappearing after **80vh+** of scroll. |
| **03** | `PlayingRosterStack` | Player lineup / driver roster showcase with stats, role, and bio modal. | **Cadillac F1 Stacking**: Pinned desktop viewport with bottom-to-top clip-path reveal (`clipPath: inset(100% 0% 0% 0%)`). Mobile swipe carousel. |
| **04** | `MatchdayFixtures` | Upcoming fixtures and previous results with live countdown ticker. | Horizontal auto-scrolling track with smooth pause on hover and ticket purchase triggers. |
| **05** | `MilestonesShowcase`| Historic championships, trophies, records, and club heritage. | Interactive year pill scrubber (e.g. 2016, 2018, 2024) with split-screen illuminated trophy hero and record bullets. |
| **06** | `NewsDispatchesBento`| Latest articles, press releases, and match analysis in Bento layout. | **Frosted Semi-Transparent Glass** (`bg-white/10 backdrop-blur-md`). **Cascading Domino Slide**: Grid 1 &rarr; 2 &rarr; 3 &rarr; 4 sequential shift. |
| **07** | `PointsTableStandings`| League standings and tournament table with home team highlight. | Skewed geometric header cards, form guide badges (`W`/`L`), and net run rate / goal differential metrics. |
| **08** | `SpotlightReels` | Player lifestyle, behind-the-scenes moments, and fan culture. | Video hover preview cards with Instagram reels integration and engagement metrics. |
| **09** | `Sponsors3DScroll` | Commercial partners showcase with interactive 3D centerpiece. | **Pinned 200vh Viewport**: Interactive 3D asset (ball / helmet / trophy) rotates on scroll progress; dual vertical sponsor columns translate with inertia. |
| **10** | `GalleryExpandScroller`| High-resolution matchday action photography. | **Gallery Play 3-Card GSAP**: Expands from contained cards to full-bleed 100vw &times; 100vh full-screen scroller. |
| **11** | `ContactPartnership`| Corporate sponsorship inquiry, VIP hospitality, and membership. | Semi-transparent vibrant frosted glass card, Zod-validated inputs, toast feedback. |
| **12** | `SportsFooter` | Club crest, social media channels, sponsor marks, legal disclaimers. | Clean architectural footer with copyright and regulatory notices. |

---

## 4. Animation & 3D Standards

### 4.1 Hero Pinned Depth Zoom Standard
- The hero section must be pinned using GSAP ScrollTrigger:
```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: heroRef.current,
    start: "top top",
    end: () => `+=${Math.round(Math.max(window.innerHeight * 0.85, 750))}`,
    scrub: 0.6,
    pin: true,
    anticipatePin: 1,
    onLeave: () => window.dispatchEvent(new CustomEvent("hero-scrolled-change", { detail: { isPastHero: true } })),
    onEnterBack: () => window.dispatchEvent(new CustomEvent("hero-scrolled-change", { detail: { isPastHero: false } }))
  }
});

// Center typography zooms toward camera and disappears after scrolling 80vh+
tl.to(centerTextRef.current, { scale: 7, ease: "power2.in", duration: 1 }, 0);
tl.to(centerTextRef.current, { opacity: 0, ease: "power1.in", duration: 0.75 }, 0.25);

// Side columns slide off-screen during first 40-50% of scroll
tl.to(leftColRef.current, { x: -400, opacity: 0, ease: "power2.in", duration: 0.5 }, 0);
tl.to(rightColRef.current, { x: 400, opacity: 0, ease: "power2.in", duration: 0.5 }, 0);
tl.to(bottomCardRef.current, { y: 180, opacity: 0, ease: "power2.in", duration: 0.5 }, 0);
```

### 4.2 Vertical Roster Card Stacking Standard (Cadillac F1 Style)
- On desktop (`md` and up), the roster section pins for `(players.length) * 100vh`.
- Cards use stacked `clipPath` transitions:
```typescript
slides.forEach((slide, i) => {
  if (i > 0) {
    gsap.set(slide, { clipPath: "inset(100% 0% 0% 0%)", zIndex: 10 + i });
  } else {
    gsap.set(slide, { clipPath: "inset(0% 0% 0% 0%)", zIndex: 10 });
  }
});

slides.forEach((slide, i) => {
  if (i > 0) {
    tl.to(slide, {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      duration: 1
    }, (i - 1));
  }
});
```
- **Mobile Fallback**: Disable scroll hijacking completely on viewport widths `< 768px`. Provide a horizontal touch-swipe slider with left/right buttons.

### 4.3 Bento Grid Cascading Domino Animation Standard
To prevent layout thrashing, image distortion, or browser lag during pagination:
1. **Isolated Slot Wrappers**: Each grid cell must be a permanent, fixed CSS grid item with `relative overflow-hidden rounded-2xl`.
2. **Never Put `layout` on Variable Aspect-Ratio Images**: Animate the cards *inside* their respective slots using GPU-accelerated `x` transforms (`100% &rarr; 0` and `0 &rarr; -100%`) and `opacity`.
3. **Sequential Staggered Cascade**:
   - When NEXT is clicked:
     - Slot 0 updates at `0ms` (Grid 1 slides out to left & receives Card 2 from right).
     - Slot 1 updates at `80ms` (Grid 2 slides out & receives Card 3).
     - Slot 2 updates at `160ms` (Grid 3 slides out & receives Card 4).
     - Slot 3 updates at `240ms` (Grid 4 slides out & receives brand new Card 5).
   - When PREV is clicked: reverse the cascade order (Slot 3 &rarr; Slot 2 &rarr; Slot 1 &rarr; Slot 0).
4. **Animation Debounce Lock**: Set `isAnimating = true` and `disabled={isAnimating}` on controls during the transition (~560ms) to prevent spamming.

### 4.4 Interactive Three.js 3D Viewport Standard
- Center model (Cricket Ball, Racing Helmet, Football, or Trophy) rendered in high-performance WebGL using Three.js or `@react-three/fiber`:
- **Scroll Binding**: The 3D model's rotation binds directly to scroll progress:
```typescript
mesh.rotation.y = scrollProgress * Math.PI * 4;
mesh.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.35;
```
- **Lighting & Materials**: MeshStandardMaterial with realistic normal mapping, seam stitching, specular reflections, and ambient + spot lights.
- **DPR Capping**: Cap device pixel ratio at `Math.min(window.devicePixelRatio, 2)` to avoid mobile GPU thermal throttling.

---

## 5. Visual Styling & Design Tokens

### 5.1 Theming & Palette
Sports microsites demand vibrant, high-energy palettes derived from club crests:
- **Primary Team Color**: Radiant Solar Orange (`#FF4E03`), Ferrari Red (`#E10600`), Royal Cobalt (`#0047AB`), or Midnight Gold (`#FFCB05`).
- **Dark Void Background**: Deep Obsidian Noir (`#070A12` or `#0A0E1A`) providing maximum luminescence for glowing accents.
- **Frosted Glass Components**: `bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 hover:border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)]`.
- **Specular Glass Highlight**: `<div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />` on all interactive glass cards.

### 5.2 Typography System
- **Hero & Club Branding**: Condensed, ultra-black sans-serif or athletic display font (`font-redzone`, `font-black uppercase tracking-tight` or `font-heading`).
- **Metadata & Technical Stats**: Modern geometric tracking sans-serif (`font-forma`, `text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/80`).
- **Accent Details**: Gold and team-color highlight tags with subtle pulse animations.

---

## 6. Decoupled Content Contracts (`src/data/*.ts`)

All content must live strictly in isolated TypeScript data files to allow rapid 60-second client updates without touching JSX:
- `src/data/hero.ts`: Team name, tagline, left stats, next match info, hero image.
- `src/data/playing11.ts`: Athlete profiles, numbers, roles, season stats, high-res cutout images.
- `src/data/fixtures.ts`: Match schedule, home vs away, stadium venues, broadcast channels, countdown targets.
- `src/data/milestones.ts`: Championship years, trophies won, historic records.
- `src/data/news.ts`: Articles, categories, read times, dispatches.
- `src/data/pointsTable.ts`: Tournament standings, ranks, matches, won, lost, points, NRR/GD, form.
- `src/data/sponsors.ts`: Principal title sponsors, commercial partners, categories, vector logos.
- `src/data/spotlight.ts`: Video reels, social media links, fan culture highlights.
