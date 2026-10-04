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
  rating?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
