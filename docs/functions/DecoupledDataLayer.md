# Decoupled Data Layer & Content Contracts

## 1. Executive Summary
The Decoupled Data Layer is the architectural backbone of the Agency Microsite Engine. By separating all client-facing copy, images, navigation items, pricing, and testimonials into pure TypeScript data files (`src/data/*.ts`), the UI components (`src/components/`) remain 100% agnostic to business content.

When a client requests text changes, new photos, or added services during revisions or under a monthly maintenance retainer, developers or AI agents modify only the data files. Zero JSX/TSX layout code is touched, eliminating the risk of broken styling or regression bugs.

---

## 2. Directory Structure & File Mapping

```plaintext
src/
├── types/
│   └── dataContracts.ts      # Strict TypeScript interfaces defining the shape of all content
│
├── data/                      # PURE CONTENT LAYER (Zero JSX/UI Code)
│   ├── siteConfig.ts          # Brand name, SEO metadata, contact details, social links
│   ├── navigation.ts          # Header navigation tree and footer link columns
│   ├── hero.ts                # Main headline, subheadline, CTA buttons, background assets
│   ├── offerings.ts           # Services, products, or feature highlight cards
│   ├── testimonials.ts        # Client reviews, ratings, quotes, and avatars
│   ├── faqs.ts                # Frequently Asked Questions accordion data
│   └── units.ts               # (Optional) Real estate unit inventory & floor plans
│
└── components/
    └── sections/              # PURE PRESENTATION LAYER (Imports data/ and iterates)
        ├── Hero.tsx           # Imports { heroData } from "@/data/hero"
        ├── FeatureGrid.tsx    # Imports { offeringsData } from "@/data/offerings"
        ├── FaqAccordion.tsx   # Imports { faqsData } from "@/data/faqs"
        └── ...
```

---

## 3. Strict Data Contracts (`src/types/dataContracts.ts`)

Every data file is strictly typed to guarantee compile-time safety and IDE autocompletion:

```typescript
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  ogImage: string;
  theme: "premium" | "funky" | "minimal" | "bold-tech";
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  contact: {
    email: string;
    phone?: string;
    address?: string;
    socials: {
      instagram?: string;
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  };
}

export interface HeroContent {
  badge?: string;
  headline: string;
  subheadline: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  backgroundMedia: {
    type: "image" | "video";
    url: string;
    poster?: string;
  };
}

export interface OfferingItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  badge?: string;
  features?: string[];
  ctaLink?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  avatarUrl: string;
  rating?: number; // 1 to 5
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
```

---

## 4. Implementation Example: Decoupled Offerings

### 4.1 Data File (`src/data/offerings.ts`)
```typescript
import { OfferingItem } from "@/types/dataContracts";

export const offeringsData: OfferingItem[] = [
  {
    id: "service-1",
    title: "Bespoke Spatial Design",
    tagline: "Harmonizing light, volume, and material",
    description: "End-to-end architectural blueprints and spatial planning for private luxury residences and contemporary commercial spaces.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    badge: "Signature",
    features: [
      "Custom 3D volumetric modeling",
      "Sustainable bioclimatic analysis",
      "Permit & structural engineering documentation"
    ],
    ctaLink: "#contact"
  },
  {
    id: "service-2",
    title: "Interior Curation & Styling",
    tagline: "Tactile elegance and custom millwork",
    description: "Curated interior styling, custom furniture manufacturing, acoustic dampening, and bespoke lighting master plans.",
    imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200",
    badge: "Turnkey",
    features: [
      "Artisan joinery & millwork details",
      "Natural material & stone sourcing",
      "Circadian lighting design"
    ],
    ctaLink: "#contact"
  }
];
```

### 4.2 Presentation Component (`src/components/sections/FeatureGrid.tsx`)
```typescript
import { offeringsData } from "@/data/offerings";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export function FeatureGrid() {
  return (
    <section id="services" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {offeringsData.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all">
              <div className="relative h-64 w-full">
                <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                {item.badge && (
                  <span className="absolute top-4 left-4 bg-sky-500/90 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="p-8">
                <p className="text-xs uppercase font-semibold text-sky-400 tracking-wider mb-2">{item.tagline}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{item.description}</p>
                {item.features && (
                  <ul className="space-y-2 mb-6">
                    {item.features.map((feat, i) => (
                      <li key={i} className="flex items-center text-xs text-slate-300 gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}
                {item.ctaLink && (
                  <Link href={item.ctaLink} className="inline-block text-sm font-semibold text-sky-400 hover:text-sky-300">
                    Inquire about {item.title} &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 5. Agency Benefits & Revenue Retention

1. **Zero Merge Conflicts**: When working on tight 5-day sprints, copywriters can update `src/data/*.ts` while developers work on animations and layout without touching the same files.
2. **Instant Retainer Work**: When an agency client pays $99/month for maintenance, updating their phone number, adding a new testimonial, or replacing a hero photo takes exactly **60 seconds**.
3. **Automated AI Refactoring**: AI agents (Antigravity/Claude) can ingest a brief and rewrite `src/data/*.ts` with 100% precision because of the strict TypeScript contracts.
