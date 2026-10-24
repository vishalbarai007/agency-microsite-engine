# Sports Franchise, Athletics & Motorsports Showcase Framework

## 1. Executive Summary & The 3-Day Delivery Standard

Sports franchises (cricket clubs, football teams, basketball organizations), athletic academies, and motorsport racing teams (F1, GT) represent high-energy, premium agency contracts ($3,500 to $8,000 per project).

To streamline production and eliminate endless revision cycles, this engine enforces a **3-Day Turnaround Framework**:
- **Day 1: Scaffold & Decoupled Ingestion**: Extract primary and accent energy colors from the club crest or vehicle livery. Populate the decoupled data files (`src/data/` for roster, fixtures, standings, milestones, sponsors). Scaffold the 11 core sections and deploy an interactive V1 staging link.
- **Day 2: Motion, 3D & Bento Tuning**: Implement the GSAP pinned depth scroll hero (where the team name scales up and zooms past the camera, disappearing after 80vh+ of scroll), build the Cadillac F1 clip-path player stack, wire the interactive Three.js 3D model (cricket ball / helmet / trophy / car), and calibrate the cascading frosted glass Bento news grid.
- **Day 3: Mobile Touch QA & Production Launch**: Validate that mobile devices use smooth native touch swipe sliders (no scroll hijacking), optimize Core Web Vitals, cap WebGL DPR, connect the custom domain, and hand over the live website.

```
┌─────────────────────────────────────────────────────────────┐
│ DAY 1: SCAFFOLD VERSION 1                                   │
│ Crest Ingestion -> client-spec.json -> Data Contracts ->    │
│ 11 Sections -> Deploy Interactive V1 Staging Link           │
├─────────────────────────────────────────────────────────────┤
│ DAY 2: ANIMATIONS & 3D                                      │
│ GSAP Pinned Depth Zoom -> Cadillac F1 Player Stack ->       │
│ 3D Three.js Model -> Cascading Glassmorphic Bento Grid      │
├─────────────────────────────────────────────────────────────┤
│ DAY 3: MOBILE QA & HANDOFF                                  │
│ Touch-friendly Swipers -> CWV & DPR Audit -> Custom Domain  │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Standard 11-Section Sports Architecture & Flow

Every sports microsite generated through this engine uses the high-converting, high-energy section flow proven in production:

| Section | Component | Functionality & Key Interactions |
| :--- | :--- | :--- |
| **01. Dynamic Header** | `SportsNavbar.tsx` | Transparent on hero &rarr; converts to dynamic team gradient on scroll with drop-down logo badge, quick overlay drawer, and partner CTA. |
| **02. Pinned Depth Hero**| `HeroSection.tsx` | **Nick Ho Motorsports Style**: Pinned for 85vh. Background photo with dark vignette. Left stats, right motto/venue, bottom next match card with live countdown. Center typography zooms 1x &rarr; 7x toward camera, disappearing after **80vh+** of scroll. |
| **03. Playing Roster Stack**| `Playing11Section.tsx`| **Cadillac F1 Style**: Pinned desktop viewport with bottom-to-top clip-path reveal (`clipPath: inset(100% 0% 0% 0%)`). Transparent cutout athlete images, jersey number watermarks, telemetry stats. Touch swipe slider fallback on mobile. |
| **04. Matchday Fixtures**| `FixturesSection.tsx` | Horizontal auto-scrolling track with home vs away match cards, stadium venues, live ticking countdown clock, and ticket booking links. |
| **05. Trophy Milestones**| `MilestoneSection.tsx`| Interactive year pill scrubber (e.g. 2016, 2018, 2024), illuminated split-screen trophy hero with ambient glow, records list, and championship highlights. |
| **06. News Dispatches** | `NewsSection.tsx` | **Frosted Semi-Transparent Glass Bento**: `bg-white/10 backdrop-blur-md border border-white/20`. Sequential cascading domino slide on Next/Prev (Grid 1 &rarr; Grid 2 &rarr; Grid 3 &rarr; Grid 4) with zero layout thrashing or image distortion. |
| **07. Points Table** | `PointsTableSection.tsx`| Skewed geometric header cards, team rankings, matches, won, lost, points, NRR/GD, and form guide badges (`W`/`L`/`D`). Dynamic highlight for home franchise. |
| **08. Social Spotlight**| `SpotlightSection.tsx`| Video hover preview cards with Instagram reels integration, player lifestyle behind-the-scenes, and fan culture highlights. |
| **09. Sponsors 3D Wall**| `SponsorsSection.tsx` | **200vh Pinned Viewport**: Interactive 3D WebGL element (Season Cricket Ball, Racing Helmet, Trophy) rotating on scroll progress. Dual vertical sponsor columns translating with scroll inertia. Mobile horizontal gliding ticker. |
| **10. Full-Screen Gallery**| `GallerySection.tsx` | **Gallery Play Style**: 3-card preview expanding on scroll into a 100vw &times; 100vh full-screen cinematic carousel. |
| **11. Partnership Suite** | `ContactSection.tsx` | Semi-transparent vibrant frosted glass card, Zod-validated corporate sponsorship and VIP membership inquiries, toast notifications. |
| **12. Sports Footer** | `Footer.tsx` | Club crest, official partner strip, social channels, legal disclaimers. |

---

## 3. Real-World Benchmark References

This engine builds upon the visual and interactive excellence of these five global benchmarks:

1. **[Nick Ho Motorsports](https://nickho-motorsports.nl/)**
   - *Key Patterns*: Pinned depth scroll hero with center typography zooming toward the camera, vertical architectural lines, 3-column layout, and pinned 3D sponsor depth walls.
2. **[Cadillac F1 Team](https://www.cadillacf1team.com/)**
   - *Key Patterns*: Pinned vertical card stacks with bottom-to-top clip-path reveal, high contrast athlete cutouts, telemetry stats badges, and aerodynamic dark mode styling.
3. **[Gallery Play](https://gallery-play.be/)**
   - *Key Patterns*: Full-screen GSAP photo scrollers that expand from contained cards to full viewport, bold kinetic typography, and fluid transitions.
4. **[Manchester United](https://www.manutd.com/en)**
   - *Key Patterns*: Matchday countdown clocks, championship honors timeline, tournament points standings with form pills, and fan-first commercial integration.
5. **[The Performance Lab](https://theperformancelab.ca/)**
   - *Key Patterns*: Frosted semi-transparent Bento cards, human athletic energy, high contrast black & neon/orange accents, and brutalist sports typography.

---

## 4. Animation & 3D Guidelines

### 4.1 GSAP Depth Zoom
- Pin the hero using `end: () => "+=" + Math.round(Math.max(window.innerHeight * 0.85, 750))` with `scrub: 0.6` and `pin: true`.
- Center typography expands to `scale: 7` over the full scroll duration and fades to `opacity: 0` between `0.25` and `1.0`, disappearing completely after scrolling 80vh+.
- Surrounding stats and matchday cards slide off-screen during the first 40–50% of the timeline to draw full focus to the team name.

### 4.2 Bento Grid Cascading Domino Slide
- **Never put Framer Motion `layout` on variable aspect-ratio images** across different column spans in CSS Grid.
- Use **dedicated slot containers** with `relative overflow-hidden rounded-2xl` to keep the CSS Grid permanently locked.
- Stagger slot updates by `80ms` (0ms, 80ms, 160ms, 240ms) so cards slide out and in sequentially like a wave.
- Use `isAnimating` state locks to debounce Next/Prev buttons during transitions (~560ms).

### 4.3 Three.js WebGL Performance
- Cap device pixel ratio with `Math.min(window.devicePixelRatio, 2)` to eliminate mobile frame drops.
- Clean up WebGL renderers and geometries in `useEffect` unmount hooks.
- Drive 3D rotations directly from scroll progress: `mesh.rotation.y = scrollProgress * Math.PI * 4`.
