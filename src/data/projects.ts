export interface HumProject {
  id: string;
  name: string;
  slug: string;
  location: string;
  region: "Kandivali" | "Borivali" | "All";
  status: "Ongoing" | "Completed";
  tagline: string;
  config: string;
  reraNumber: string;
  reraQrCode: string;
  bannerImage: string;
  thumbnailImage: string;
  galleryImages: string[];
  overview: string;
  highlights: string[];
  priceGuidance: string;
  possession: string;
}

export const humProjectsData: HumProject[] = [
  {
    id: "hum-emerald-heights",
    name: "HUM Emerald Heights",
    slug: "hum-emerald-heights",
    location: "Kandivali (West), Mumbai",
    region: "Kandivali",
    status: "Ongoing",
    tagline: "Effortless Modern Living",
    config: "1, 2, 2.5 & 3 BHK + Jodi Options",
    reraNumber: "PM1180002502952",
    reraQrCode: "https://cdn.sanity.io/images/3wmbb6cw/production/d8df8e640b64e1186a582da9d185ef4f3104b025-256x256.png",
    bannerImage: "https://cdn.sanity.io/images/3wmbb6cw/production/cffe754409c8cee80dd0bafbc1acebf73a314fbd-1440x517.jpg",
    thumbnailImage: "https://cdn.sanity.io/images/3wmbb6cw/production/78b671926f9f490fab0b5a1730fa753696667c2a-2000x732.jpg",
    galleryImages: [
      "https://cdn.sanity.io/images/3wmbb6cw/production/78b671926f9f490fab0b5a1730fa753696667c2a-2000x732.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/5305d4bb79173938d201b9cfaa7b0f86a6662a59-900x440.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/3e1294592a087152bcccb6ae5861fe9cce85c1c0-900x400.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/6dc02418cefd57c9988c0bd30bde40464261e035-402x280.jpg"
    ],
    overview: "Step into a home designed for comfort, functionality, and effortless modern living. HUM Emerald Heights offers thoughtfully planned residences along with jodi options for those seeking more space and flexibility, transforming Mumbai’s urban skyline.",
    highlights: [
      "Intelligent floor planning with zero space wastage",
      "Sky-lounge and recreational amenities on rooftop",
      "Minutes away from Metro Line 2A & Kandivali Station",
      "MahaRERA certified with guaranteed on-time delivery commitment"
    ],
    priceGuidance: "From ₹89 Lakhs*",
    possession: "Dec 2026"
  },
  {
    id: "hum-solaris",
    name: "HUM Solaris",
    slug: "hum-solaris",
    location: "Borivali (West), Mumbai",
    region: "Borivali",
    status: "Ongoing",
    tagline: "A Brighter Way of Living",
    config: "Limited 2 & 3 BHK Flats Available",
    reraNumber: "P51800048123",
    reraQrCode: "https://cdn.sanity.io/images/3wmbb6cw/production/41c761423c67c7ba9b85dc9fb29193f3ee9e92dd-1280x1280.jpg",
    bannerImage: "https://cdn.sanity.io/images/3wmbb6cw/production/86f7d0b78a4030c0e90c74c209c15485c29f4676-1440x517.png",
    thumbnailImage: "https://cdn.sanity.io/images/3wmbb6cw/production/3389b12891977e718ac7bf619b35fad3e5732f28-5166x1892.png",
    galleryImages: [
      "https://cdn.sanity.io/images/3wmbb6cw/production/17d84ef8809b804a076b30e1e511b8aabc19b978-900x440.png",
      "https://cdn.sanity.io/images/3wmbb6cw/production/c922b5c78c23972e1949263e4b31aaf024094aa5-900x440.png",
      "https://cdn.sanity.io/images/3wmbb6cw/production/1d3c349f62c30d3510ad956fa6a9e03f42ced69c-900x440.png"
    ],
    overview: "With soaring towers that rise magnificently into the skyline, HUM Solaris redefines contemporary Mumbai living. Designed with solar daylight orientation and modern luxuries for a luminous lifestyle.",
    highlights: [
      "Soaring architectural tower with panoramic horizons",
      "Exclusive low-density floors with only selected residences per tier",
      "Rooftop yoga pavilion & fitness club",
      "Walking proximity to Link Road and metro corridors"
    ],
    priceGuidance: "From ₹1.38 Cr*",
    possession: "Mid 2027"
  },
  {
    id: "hum-durga",
    name: "HUM Durga",
    slug: "hum-durga",
    location: "Kandivali (West), Mumbai",
    region: "Kandivali",
    status: "Ongoing",
    tagline: "Elevating Luxury Living in Mumbai",
    config: "2 & 3 BHK Sophisticated Homes",
    reraNumber: "P51800049210",
    reraQrCode: "https://cdn.sanity.io/images/3wmbb6cw/production/9acc3ee79ce8053caf80434aa58a133ae0abfc7a-1280x1280.jpg",
    bannerImage: "https://cdn.sanity.io/images/3wmbb6cw/production/0c8c388827f35408e1e1342f440e489d12c4685a-1440x517.png",
    thumbnailImage: "https://cdn.sanity.io/images/3wmbb6cw/production/7761cb98db9659b20149a3df2c377374d055bdd0-5166x1892.png",
    galleryImages: [
      "https://cdn.sanity.io/images/3wmbb6cw/production/639529aff18041a10989bfef301c6b671bfa9236-920x540.png",
      "https://cdn.sanity.io/images/3wmbb6cw/production/8eb0593ab5dee557c35dcaaa73a6a88366448613-900x440.png",
      "https://cdn.sanity.io/images/3wmbb6cw/production/71a2fb5b19f737d3e8511d6b403985473cbec613-900x440.png"
    ],
    overview: "Prized possessions earn you admiration among those influenced by you. Seeking inspiration from precious milestones, HUM Durga provides a distinguished enclave of tranquil residences.",
    highlights: [
      "Acoustic double-glazed windows ensuring quiet interiors",
      "Imported marble finish and premium bath fittings",
      "Spacious designer balconies with safety railings",
      "Comprehensive multi-tier 24/7 security & video access"
    ],
    priceGuidance: "From ₹1.42 Cr*",
    possession: "Late 2026"
  },
  {
    id: "gs-heights",
    name: "HUM GS Heights",
    slug: "gs-heights",
    location: "Kandivali (West), Mumbai",
    region: "Kandivali",
    status: "Ongoing",
    tagline: "Elevated Twin-Tower Living",
    config: "2 & 3 BHK Twin Towers",
    reraNumber: "P51800031940",
    reraQrCode: "https://cdn.sanity.io/images/3wmbb6cw/production/303a114e283d17a241641bb44dd51241fe991e76-256x256.png",
    bannerImage: "https://cdn.sanity.io/images/3wmbb6cw/production/dc5c3a6c0549738a8293add4be371768a4164ea4-1440x517.jpg",
    thumbnailImage: "https://cdn.sanity.io/images/3wmbb6cw/production/bb03b27c23cd4d2e9471d0360d5b774c8687c2a9-402x208.jpg",
    galleryImages: [
      "https://cdn.sanity.io/images/3wmbb6cw/production/840cb4cd78c5366588214b2a5763a6feef82a9f7-900x440.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/9dd9dd6946fe88022585a40633f0b3d2ee556828-900x440.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/b871070dfc6c071b776b79048579daabb743fac5-900x440.jpg"
    ],
    overview: "Sophisticated residences with curated spaces and upscale amenities, defining contemporary Mumbai living. Features imposing twin towers with high-speed elevators and panoramic suburban views.",
    highlights: [
      "Twin-tower architectural prestige in prime Kandivali (W)",
      "High-speed branded elevators with power backup",
      "Multi-level podium car parking with EV chargers",
      "Designer entrance lobby with Italian marble finishes"
    ],
    priceGuidance: "From ₹1.50 Cr*",
    possession: "Dec 2026"
  },
  {
    id: "hum-gagansagar",
    name: "HUM Gagansagar",
    slug: "hum-gagansagar",
    location: "Borivali (West), Mumbai",
    region: "Borivali",
    status: "Ongoing",
    tagline: "Redefining Luxury in Mumbai",
    config: "2, 3 BHK & Duplex Penthouses",
    reraNumber: "P51800037889",
    reraQrCode: "https://cdn.sanity.io/images/3wmbb6cw/production/9697ab2991ef16d28ffe0edd672b758018c95d03-1280x1280.jpg",
    bannerImage: "https://cdn.sanity.io/images/3wmbb6cw/production/f8bb282180b282fd18d71937719b9927b39dad1e-1440x517.png",
    thumbnailImage: "https://cdn.sanity.io/images/3wmbb6cw/production/855f98c55ca8c52129500768d4b78250115b0feb-401x280.png",
    galleryImages: [
      "https://cdn.sanity.io/images/3wmbb6cw/production/e3875cf2195302b0b91b669c6d9a4eed1ab97da1-5166x1892.png",
      "https://cdn.sanity.io/images/3wmbb6cw/production/0042d671da9480e1ad94106302743842af7e0c36-920x540.png",
      "https://cdn.sanity.io/images/3wmbb6cw/production/123d9c82a9a2d5368ec95eaf16d4b73873e8c8ea-900x440.png"
    ],
    overview: "Nestled in prime Borivali West, HUM Gagansagar offers spacious homes designed for maximum comfort, ventilation, and understated luxury, surrounded by quiet residential avenues.",
    highlights: [
      "Expansive floor plans with private decks",
      "Peaceful residential neighborhood close to schools & temples",
      "Modern clubhouse and indoor games zone",
      "Quick access to Borivali Station & Western Express Highway"
    ],
    priceGuidance: "From ₹1.65 Cr*",
    possession: "Mid 2026"
  },
  {
    id: "hum-sapphire",
    name: "HUM Sapphire",
    slug: "hum-sapphire",
    location: "Borivali (West), Mumbai",
    region: "Borivali",
    status: "Ongoing",
    tagline: "Modern Homes. Elevated Lifestyle.",
    config: "2 & 3 BHK Residences",
    reraNumber: "P51800041209",
    reraQrCode: "https://cdn.sanity.io/images/3wmbb6cw/production/e27b6581085b56c5a0fc1ada09946791bb08170d-256x256.jpg",
    bannerImage: "https://cdn.sanity.io/images/3wmbb6cw/production/b4595354f1e23bf7cfd1a553688a2a1de7616c22-1440x517.jpg",
    thumbnailImage: "https://cdn.sanity.io/images/3wmbb6cw/production/81a9e8ae63e39ae91116bec84918312f45b6675f-402x280.jpg",
    galleryImages: [
      "https://cdn.sanity.io/images/3wmbb6cw/production/1c25eaaeee8f6a2079ec749aff2c55dd663d8e19-2000x732.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/5c868a55c41104aab70a95c18b8231098031eb1e-900x400.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/58c01408e895bb7052e2bf01b0ce0307e48b7c3d-900x400.jpg"
    ],
    overview: "Discover thoughtfully designed 2 & 3 BHK residences situated for prime convenience. HUM Sapphire connects you seamlessly across Mumbai while providing quiet residential seclusion.",
    highlights: [
      "Superior cross-ventilation in all master bedrooms",
      "Automated sensor lighting in public corridors",
      "Children's play park and reflexology garden",
      "Prime location near Borivali commercial landmarks"
    ],
    priceGuidance: "From ₹1.48 Cr*",
    possession: "Late 2026"
  },
  {
    id: "hum-galaxy-heights",
    name: "HUM Galaxy Heights",
    slug: "hum-galaxy-heights",
    location: "Kandivali (West), Mumbai",
    region: "Kandivali",
    status: "Completed",
    tagline: "Where Refined Living Meets Contemporary Luxury",
    config: "1 & 2 BHK Delivered Residences",
    reraNumber: "P51800028811",
    reraQrCode: "https://cdn.sanity.io/images/3wmbb6cw/production/8262b5b4882199b55fa3bb91e6166c1df6afb24f-256x256.jpg",
    bannerImage: "https://cdn.sanity.io/images/3wmbb6cw/production/ce51786168715e52f407debb17ba65ee5531d28a-1440x517.jpg",
    thumbnailImage: "https://cdn.sanity.io/images/3wmbb6cw/production/04ec961d3d3d54a35eaef2cc2ca60259593f25e8-402x280.jpg",
    galleryImages: [
      "https://cdn.sanity.io/images/3wmbb6cw/production/3ac25a600936e901a2091f4bab353a1aabfbc69f-2000x732.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/8067a862bbd985cb1c5f86586ccfd1f7f7348aab-900x400.jpg",
      "https://cdn.sanity.io/images/3wmbb6cw/production/64a275f9edcc22421dd85428c09ee92be9335ce4-900x400.jpg"
    ],
    overview: "Welcome to HUM Galaxy Heights, a successfully delivered milestone project where families have created joyous memories for years. A thriving community with zero maintenance backlog.",
    highlights: [
      "Fully delivered & occupied with Occupancy Certificate (OC)",
      "Vibrant cooperative housing society community",
      "Fully functional gym and landscaped recreation area",
      "Zero GST on ready-to-move inventory"
    ],
    priceGuidance: "Completed & Delivered",
    possession: "Ready to Move (OC Received)"
  }
];
