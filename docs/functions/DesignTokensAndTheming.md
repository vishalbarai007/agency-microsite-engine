# Design Tokens, Visual Archetypes & Theming Engine

## 1. Executive Summary
AI-generated websites often look bland or repetitive when prompted without strict aesthetic boundaries. The Design Tokens and Theming Engine solves this by mapping the client's declared aesthetic "vibe" (from `client-spec.json`) directly to opinionated, production-grade design token systems.

Instead of generic designs, the agent applies calibrated typography pairings, harmonic color palettes, border-radius standards, and shadow scales tailored to one of 4 design archetypes: **Premium Editorial**, **Funky Neo-Brutalist**, **Minimal Clean**, and **Bold Tech**.

---

## 2. The 4 Calibrated Aesthetic Archetypes

### 2.1 Premium Editorial (`"vibe": "premium"`)
- **Target Industries**: Luxury architecture, interior curation, high-end hospitality, jewelry, private wealth management.
- **Typography**: 
  - *Headings*: `Playfair Display` or `Cormorant Garamond` (Editorial serif)
  - *Body*: `Plus Jakarta Sans` or `Inter` (Geometric clean sans)
- **Palette**:
  - *Background*: Deep Obsidian (`#0F0F11` or `#141416`)
  - *Primary Accent*: Warm Champagne / Muted Gold (`#C5A880` / `#D4AF37`)
  - *Borders*: Hairline metallic borders (`rgba(197, 168, 128, 0.2)`)
- **Visual Rhythm**: High letter-spacing (`tracking-widest`), generous vertical whitespace (`py-28`), subtle fade-ins, high-contrast imagery.

### 2.2 Funky Neo-Brutalist (`"vibe": "funky"`)
- **Target Industries**: Indie record labels, streetwear brands, gen-z creator drops, creative dev agencies.
- **Typography**:
  - *Headings*: `Space Grotesk` or `Syne` (Bold, eccentric sans)
  - *Body*: `Space Mono` or `Inter`
- **Palette**:
  - *Background*: Cream (`#FFFDF5`) or Deep Slate (`#0B0F19`)
  - *Accents*: High-voltage Electric Lime (`#84CC16`), Cyber Yellow (`#FACC15`), Neon Pink (`#F43F5E`)
  - *Borders*: Heavy 2px to 3px solid borders (`border-2 border-black dark:border-white`)
  - *Shadows*: Hard offset shadows with zero blur (`shadow-[4px_4px_0px_#000]`)
- **Visual Rhythm**: Tilted badge stickers (`rotate-2`), oversized buttons, marquee ticker tapes.

### 2.3 Minimal Clean (`"vibe": "minimal"`)
- **Target Industries**: Boutique law firms, venture studios, clinical wellness, high-end consulting.
- **Typography**:
  - *Headings & Body*: `Geist` or `Inter` (Pure Swiss typography)
- **Palette**:
  - *Monochromatic*: Neutral Zinc (`#09090B`, `#27272A`, `#71717A`, `#FAFAFA`)
  - *Accent*: Single subtle ice-blue or neutral slate highlight
- **Visual Rhythm**: Strict 8pt grid, razor-thin borders (`border-zinc-800`), restrained micro-interactions.

### 2.4 Bold Tech (`"vibe": "bold-tech"`)
- **Target Industries**: AI startups, Web3 protocols, cloud infrastructure, developer tools.
- **Typography**:
  - *Headings*: `Plus Jakarta Sans` (Heavy bold geometric)
  - *Code/Badges*: `JetBrains Mono` or `Fira Code`
- **Palette**:
  - *Background*: Deep Cosmic Slate (`#090D16`)
  - *Accents*: Neon Cyan (`#06B6D4`), Hyper Violet (`#8B5CF6`), Electric Emerald (`#10B981`)
  - *Effects*: Glowing radial mesh gradients, glassmorphism (`backdrop-blur-xl bg-slate-900/60`)

---

## 3. Design Token Matrix Table

| Archetype | Primary Heading Font | Body Font | Primary Color | Accent Color | Border Radius | Shadow Style |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`premium`** | Cormorant Garamond | Plus Jakarta Sans | `#0F0F11` | `#C5A880` (Gold) | `rounded-none` / `rounded-md` | Soft diffuse ambient |
| **`funky`** | Space Grotesk | Space Mono | `#000000` | `#84CC16` (Lime) | `rounded-none` / `rounded-2xl` | `4px 4px 0px #000` |
| **`minimal`** | Geist Sans | Geist Sans | `#09090B` | `#FAFAFA` (Zinc) | `rounded-lg` | Hairline border only |
| **`bold-tech`** | Plus Jakarta Sans | Inter | `#090D16` | `#38BDF8` (Cyan) | `rounded-xl` | Glowing colored ring |

---

## 4. Integration into Tailwind (`tailwind.config.ts`)

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)"
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)"
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px rgba(0, 0, 0, 1)",
        glow: "0 0 25px -5px var(--accent-glow)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
```

---

## 5. Automated Agent Execution Rule
When an AI agent (Antigravity or Claude) reads `client-spec.json`, it must unconditionally apply the font pairing, color variables, and container padding scales defined above without manual prompting.
