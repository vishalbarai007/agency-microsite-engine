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
