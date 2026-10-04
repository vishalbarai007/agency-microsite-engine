# Real Estate & Architectural Showcase Architecture

## 1. Executive Summary
Real estate developers, luxury villa projects, and high-end brokerage agencies are among the most lucrative clients for micro-websites ($1,200 to $3,500 per launch). These clients need a dedicated single-property or inventory launchpad featuring:
- **Interactive Unit Inventory**: Filterable unit grid by bedroom count (1BHK, 2BHK, 3BHK, Penthouse, Villa) and sqft.
- **Architectural Floor Plan Lightbox**: High-resolution zoomable architectural floor plans inside an accessible Radix dialog modal.
- **Touch-Friendly Gallery Carousel**: High-speed touch slider powered by Embla Carousel.
- **Pinned "Schedule Private Viewing" Drawer**: Floating Action Button (FAB) that opens a VIP appointment booking drawer.

---

## 2. Tech Stack & Dependencies

| Tool | Purpose | Advantage |
| :--- | :--- | :--- |
| **`embla-carousel-react`** | High-res photo slider | Frictionless touch swiping, 4KB footprint, zero layout shifts |
| **`@radix-ui/react-dialog`** | Floor plan zoom modal | WAI-ARIA accessible modal dialog with focus traps and keyboard navigation |
| **Decoupled `units.ts`** | Property inventory contract | Agents or brokers can update prices or status (Available/Sold) in 1 file |

---

## 3. Data Model (`src/data/units.ts`)

```typescript
export interface RealEstateUnit {
  id: string;
  name: string;
  category: "2BHK" | "3BHK" | "Penthouse" | "Villa";
  areaSqFt: number;
  carpetAreaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  priceRange: string;
  status: "Available" | "Reserved" | "Sold Out";
  floorPlanUrl: string;
  galleryImages: string[];
  features: string[];
}

export const unitsData: RealEstateUnit[] = [
  {
    id: "unit-p1",
    name: "Sky Duplex Penthouse",
    category: "Penthouse",
    areaSqFt: 4200,
    carpetAreaSqFt: 3600,
    bedrooms: 4,
    bathrooms: 5,
    priceRange: "$2.8M - $3.2M",
    status: "Available",
    floorPlanUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
    ],
    features: ["Private Infinity Plunge Pool", "Double-Height Living Ceiling", "Private Elevator Foyer"]
  },
  {
    id: "unit-v1",
    name: "Oceanfront Horizon Villa",
    category: "Villa",
    areaSqFt: 5800,
    carpetAreaSqFt: 5100,
    bedrooms: 5,
    bathrooms: 6,
    priceRange: "$4.5M",
    status: "Reserved",
    floorPlanUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200"
    ],
    features: ["Direct Beach Access", "Private 4-Car Subterranean Garage", "Biophilic Courtyard"]
  }
];
```

---

## 4. Architectural Floor Plan Modal (`src/components/sections/FloorPlanModal.tsx`)

```typescript
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { RealEstateUnit } from "@/data/units";

export function FloorPlanModal({ unit }: { unit: RealEstateUnit }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2 text-xs font-semibold uppercase text-sky-400 hover:text-sky-300 transition-colors">
          <ZoomIn className="w-4 h-4" /> View Blueprint & Floor Plan
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl p-6 z-50 shadow-2xl overflow-y-auto">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
            <div>
              <Dialog.Title className="text-xl font-bold text-white">{unit.name} &bull; Blueprint</Dialog.Title>
              <Dialog.Description className="text-xs text-slate-400 mt-1">
                {unit.areaSqFt} Sq. Ft. &bull; {unit.bedrooms} Bed &bull; {unit.bathrooms} Bath
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="relative w-full h-[450px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
            <Image src={unit.floorPlanUrl} alt={`${unit.name} Floor Plan`} fill className="object-contain p-4" />
          </div>

          <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm font-semibold text-slate-300">
              Pricing: <span className="text-sky-400 font-bold">{unit.priceRange}</span>
            </div>
            <a href="#contact" className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors">
              Schedule Private Viewing
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

---

## 5. Pinned Floating Action Button (FAB)
To maximize appointment booking conversions, a persistent floating CTA button stays pinned at the bottom-right corner of the mobile and desktop viewports, opening a quick inquiry drawer with one tap.
