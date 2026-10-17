# Agent Rule: Design Tokens & Aesthetic Presets

## Objective
When generating microsites from `client-spec.json`, the agent must unconditionally apply the typography, palette, border, and shadow rules defined in this specification based on the client's declared `"vibe"`.

---

## 1. Aesthetic Mappings

### 1.1 "premium" (Luxury, Architecture, Fine Jewelry)
- **Headings Font**: Cormorant Garamond (`font-serif`)
- **Body Font**: Plus Jakarta Sans (`font-sans`)
- **Background**: `#0F0F11` (Deep Obsidian)
- **Primary Text**: `#F8FAFC`
- **Accent Color**: `#C5A880` (Champagne Gold)
- **Borders**: Hairline gold / muted slate (`border-slate-800 hover:border-[#C5A880]/40`)
- **Rhythm**: Generous letter spacing (`tracking-widest` on badges/caps, `tracking-tight` on titles), high vertical padding (`py-28`).

### 1.2 "funky" (Streetwear, Creative Studios, Creator Drops)
- **Headings Font**: Space Grotesk (`font-sans`)
- **Body Font**: Space Mono (`font-mono`)
- **Background**: `#0B0F19` or `#FFFDF5`
- **Accent Color**: `#84CC16` (Electric Lime) or `#FACC15` (Cyber Yellow)
- **Borders**: Heavy 2px to 3px solid border (`border-2 border-black dark:border-white`)
- **Shadows**: Hard offset box shadow (`shadow-[4px_4px_0px_#000]`)
- **Rhythm**: Rotated badge stickers (`rotate-2`, `-rotate-1`), high contrast buttons.

### 1.3 "minimal" (Swiss Design, Consulting, Architecture)
- **Headings & Body Font**: Geist Sans (`font-sans`)
- **Background**: `#09090B` (Neutral Zinc)
- **Accent Color**: `#FAFAFA`
- **Borders**: Hairline border (`border-zinc-800`)
- **Rhythm**: Strict 8pt spacing grid, no drop shadows, understated transitions.

### 1.4 "bold-tech" (SaaS, AI, Web3 Protocols)
- **Headings Font**: Plus Jakarta Sans (`font-sans`)
- **Badges/Code Font**: JetBrains Mono (`font-mono`)
- **Background**: `#090D16` (Midnight Slate)
- **Accent Color**: `#38BDF8` (Electric Cyan) & `#8B5CF6` (Violet)
- **Effects**: Glassmorphism (`backdrop-blur-xl bg-slate-900/60`), radial mesh gradients, colored glowing halos.

### 1.5 "luxury-real-estate" (High-Rise Residences, Villas, Penthouses)
- **Headings Font**: Cormorant Garamond / Playfair Display (`font-heading`, `font-serif`, `font-editorial`).
- **Editorial Italic Accents**: Deliberately style 1 or 2 emotional words in each headline with `<span className="italic font-light">` for high-end editorial flair.
- **Body Font**: Plus Jakarta Sans or Inter (`font-sans`).
- **Metadata Badges**: Clean uppercase sans or monospace with wide tracking (`text-xs uppercase tracking-[0.25em] font-bold`).
- **Logo-Derived Palette**:
  - Dynamically extract primary, secondary, and accent colors from the client's company/project logo (e.g., Sapphire Blue `#265CA0`, Tuscan Terracotta `#C5A880`, Gold `#D4AF37`, Minimalist Noir `#111111`, Emerald Green `#1B4D3E`).
- **Common Luxury Denominators**:
  - Hairline borders (`border-white/10` or `border-slate-200`).
  - Image hover motion: `transition-transform duration-700 ease-out hover:scale-105`.
  - Subtle noise/grain texture overlay option for tactile print aesthetic.
  - Smooth inertia scroll (Lenis or GSAP ScrollTrigger).
  - Floating glassmorphic surfaces (`backdrop-blur-md bg-white/90` or `bg-slate-950/80`).

---

## 2. Enforcement Checklist
- [ ] No generic default Tailwind colors without mapping to the active vibe.
- [ ] For luxury-real-estate, primary palette must match the company logo.
- [ ] Headings in luxury-real-estate use serif typography with curated italic accents.
- [ ] High visual-to-text ratio (75% visual / 25% text) maintained across all sections.
- [ ] Mobile navigation drawer styles match the chosen archetype.
- [ ] Buttons use the corresponding border radius (`rounded-none` or `rounded-full` for luxury-real-estate vs `rounded-xl` for bold-tech).
