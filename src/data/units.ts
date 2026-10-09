export interface RealEstateUnit {
  id: string;
  name: string;
  category: "3BHK" | "4BHK" | "5BHK" | "Penthouse" | "Villa";
  areaSqFt: number;
  carpetAreaSqFt: number;
  carpetAreaSqM: number;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  ceilingHeight: string;
  facing: string;
  priceRange: string;
  priceRaw: string;
  possession: string;
  reraRegistration: string;
  tower: string;
  status: "Available" | "Few Remaining" | "Reserved" | "Sold Out";
  floorPlanUrl: string;
  galleryImages: string[];
  features: string[];
  description: string;
}

export const unitsData: RealEstateUnit[] = [
  {
    id: "unit-3bhk-luxury",
    name: "The Grand Regal Residence",
    category: "3BHK",
    areaSqFt: 2150,
    carpetAreaSqFt: 1780,
    carpetAreaSqM: 165.4,
    bedrooms: 3,
    bathrooms: 3.5,
    balconies: 2,
    ceilingHeight: "11.5 ft",
    facing: "Mahalaxmi Racecourse & Arabian Sea",
    priceRange: "₹5.85 Cr — ₹6.40 Cr",
    priceRaw: "5.85 Cr*",
    possession: "Dec 2026",
    reraRegistration: "P51900030114",
    tower: "Tower Aurelia — Wings A & B",
    status: "Available",
    floorPlanUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200"
    ],
    features: [
      "Expansive 28 ft wide wrap-around living deck",
      "Separate staff quarters with dedicated service entrance",
      "Master suite with imported Italian marble bath & walk-in wardrobe",
      "VRV air conditioning with multi-stage HEPA filtration"
    ],
    description: "Conceived for sophisticated urban living, this residence offers an uninterrupted panoramic horizon of the Arabian Sea and the lush greenery of the Mahalaxmi Racecourse."
  },
  {
    id: "unit-4bhk-royal",
    name: "The Imperial Horizon Suite",
    category: "4BHK",
    areaSqFt: 3450,
    carpetAreaSqFt: 2890,
    carpetAreaSqM: 268.5,
    bedrooms: 4,
    bathrooms: 4.5,
    balconies: 3,
    ceilingHeight: "12.0 ft",
    facing: "Arabian Sea Sunset & City Skyline",
    priceRange: "₹9.20 Cr — ₹10.50 Cr",
    priceRaw: "9.20 Cr*",
    possession: "Dec 2026",
    reraRegistration: "P51900030114",
    tower: "Tower Solitaire — Floors 25-42",
    status: "Few Remaining",
    floorPlanUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200"
    ],
    features: [
      "Private elevator lobby delivering direct foyer access",
      "Double master suites with bespoke Saint Amand bath fittings",
      "Dedicated butler pantry and chef kitchen preparation zone",
      "Floor-to-ceiling acoustic double-glazed glass walls"
    ],
    description: "An architectural marvel positioned on high floors, offering cross-ventilation, dual-aspect light corridors, and private entertaining salons."
  },
  {
    id: "unit-5bhk-mansion",
    name: "The Sky Palace Residence",
    category: "5BHK",
    areaSqFt: 4850,
    carpetAreaSqFt: 4120,
    carpetAreaSqM: 382.7,
    bedrooms: 5,
    bathrooms: 6,
    balconies: 4,
    ceilingHeight: "12.5 ft",
    facing: "360° Unobstructed Sea & Skyline",
    priceRange: "₹14.50 Cr — ₹16.00 Cr",
    priceRaw: "14.50 Cr*",
    possession: "Mid 2027",
    reraRegistration: "P51900030114",
    tower: "Tower Solitaire — Exclusive Upper Tier",
    status: "Available",
    floorPlanUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200"
    ],
    features: [
      "Full-floor layout with 360-degree daylight exposures",
      "Private temperature-regulated wine cellar & tasting niche",
      "Grand banqueting salon accommodating 24 guests",
      "Priority basement car parking with 4 EV charging bays"
    ],
    description: "Spanning expansive proportions, the Sky Palace epitomizes bespoke luxury with discreet service circulation and aristocratic entertainment quarters."
  },
  {
    id: "unit-penthouse-duplex",
    name: "The Presidential Duplex Penthouse",
    category: "Penthouse",
    areaSqFt: 6900,
    carpetAreaSqFt: 5850,
    carpetAreaSqM: 543.5,
    bedrooms: 5,
    bathrooms: 7,
    balconies: 4,
    ceilingHeight: "22 ft Double-Height Living Room",
    facing: "Crown View — Arabian Sea & Harbour",
    priceRange: "₹24.00 Cr Onwards",
    priceRaw: "24.00 Cr*",
    possession: "Mid 2027",
    reraRegistration: "P51900030114",
    tower: "Crown Penthouse Levels (Floors 52 & 53)",
    status: "Available",
    floorPlanUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    galleryImages: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200"
    ],
    features: [
      "Private rooftop infinity cantilever plunge pool",
      "Double-height cathedral glazing looking over the marine horizon",
      "Private hydraulic internal elevator connecting both duplex levels",
      "Exclusive access to Saint Amand 24/7 dedicated butler corps"
    ],
    description: "The pinnacle of high-rise aristocratic living in South Mumbai. A singular sky trophy residence crowned with private open-air sky terrace."
  }
];

export interface AmenityItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Wellness & Spa" | "Leisure & Culture" | "Sports & Fitness" | "Hospitality & Security";
  image: string;
  description: string;
  stat?: string;
}

export const luxuryAmenitiesData: AmenityItem[] = [
  {
    id: "amenity-pool",
    title: "50-Metre Olympic Lap Pool",
    subtitle: "Temperature-Regulated Infinity Edge",
    category: "Wellness & Spa",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1000",
    description: "Surrounded by cabanas and lush frangipani groves, offering sunrise swim sessions with skyline backdrop.",
    stat: "50m Length"
  },
  {
    id: "amenity-concierge",
    title: "Saint Amand 5-Star Hospitality",
    subtitle: "Bespoke White-Glove Concierge",
    category: "Hospitality & Security",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
    description: "On-call sommeliers, private chef sourcing, luxury travel bookings, and discrete residential housekeeping.",
    stat: "24/7 Service"
  },
  {
    id: "amenity-temple",
    title: "Sacred Marble Sanctuary & Jain Temple",
    subtitle: "Serene Contemplative Pavilion",
    category: "Leisure & Culture",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000",
    description: "Carved entirely from pristine white Makrana marble, surrounded by meditative water rills and lotus ponds.",
    stat: "10,000 sq.ft."
  },
  {
    id: "amenity-clubhouse",
    title: "The Grand Aurelia Club",
    subtitle: "Private Members Lounge & Screening Salon",
    category: "Leisure & Culture",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
    description: "Features a private Dolby Atmos 24-seat screening theatre, banquet ballrooms, and cigar & cognac humidor.",
    stat: "45,000 sq.ft."
  },
  {
    id: "amenity-sports",
    title: "Championship Sports Pavilion",
    subtitle: "Indoor Squash, Tennis & FIFA-Grade Turf",
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000",
    description: "Air-conditioned glass-backed squash courts, professional synthetic turf tennis court, and pilates reformers.",
    stat: "6 Courts"
  },
  {
    id: "amenity-wellness",
    title: "Ayurvedic & Hydrotherapy Spa",
    subtitle: "Thermal Suites, Steam & Vichy Showers",
    category: "Wellness & Spa",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000",
    description: "Tailored treatments administered by master practitioners in private couple therapy pavilions.",
    stat: "8 Suites"
  }
];

export interface ConnectivityPoint {
  destination: string;
  timeMins: string;
  category: "Business Hub" | "Transit & Aviation" | "High-Street & Dining" | "Education & Healthcare";
  distanceKm: string;
}

export const connectivityData: ConnectivityPoint[] = [
  { destination: "Bandra-Kurla Complex (BKC)", timeMins: "14 mins", category: "Business Hub", distanceKm: "7.8 km" },
  { destination: "Lower Parel Commercial CBD", timeMins: "8 mins", category: "Business Hub", distanceKm: "3.2 km" },
  { destination: "Chhatrapati Shivaji Maharaj Airport (T2)", timeMins: "24 mins", category: "Transit & Aviation", distanceKm: "14.5 km" },
  { destination: "Mumbai Coastal Road Expressway", timeMins: "4 mins", category: "Transit & Aviation", distanceKm: "1.8 km" },
  { destination: "The Palladium & High Street Phoenix", timeMins: "7 mins", category: "High-Street & Dining", distanceKm: "2.9 km" },
  { destination: "The Willingdon Sports Club & Turf Club", timeMins: "5 mins", category: "High-Street & Dining", distanceKm: "2.1 km" },
  { destination: "Dhirubhai Ambani International School", timeMins: "16 mins", category: "Education & Healthcare", distanceKm: "9.0 km" },
  { destination: "H. N. Reliance Foundation Hospital", timeMins: "12 mins", category: "Education & Healthcare", distanceKm: "5.4 km" }
];
