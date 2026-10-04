export interface FallbackArticle {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
  mainImage: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const fallbackArticles: FallbackArticle[] = [
  {
    _id: "post-1",
    title: "Bioclimatic Architecture: Harnessing Wind & Topography",
    slug: "bioclimatic-architecture-coastal-living",
    publishedAt: "2026-09-15T10:00:00Z",
    excerpt: "How passive solar positioning and natural stone thermal mass create self-cooling tropical residences.",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
    author: {
      name: "Aarav Desai",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
    }
  },
  {
    _id: "post-2",
    title: "Acoustic Tuning in Duplex Penthouses",
    slug: "acoustic-tuning-duplex-penthouses",
    publishedAt: "2026-08-28T14:30:00Z",
    excerpt: "Eliminating urban vibration and echo through concealed micro-perforated wood paneling.",
    mainImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
    author: {
      name: "Natasha Roy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
    }
  }
];
