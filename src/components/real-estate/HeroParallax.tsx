"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  ApertureCarousel,
  ApertureCarouselHandle,
  Slide
} from "@/components/ui/aperture-carousel";

interface HeroParallaxProps {
  onOpenBooking?: (projectName?: string) => void;
  onOpenBrochure?: (projectName?: string) => void;
  onOpenBrandFilm?: () => void;
  onSelectProject?: (slug: string) => void;
}

/**
 * 5 Full-Bleed Slides:
 * Slide 0: High-Impact Photography "HUM Emerald Heights"
 * Slide 1–4: Autoplaying Muted Videos for 1 BHK, 2 BHK, 3 BHK, and Grand Living Salon
 */
const HERO_SLIDES: Slide[] = [
  {
    image: "https://cdn.sanity.io/images/3wmbb6cw/production/98cb2c2d4f9a75bfb71f3458d5036e9fc0b98c47-2000x1125.jpg",
    title: "HUM Emerald Heights",
    caption: "Kandivali West, Mumbai · Experience Elevated Living Across 1, 2, 2.5 & 3 BHK Luxury Residences.",
    alt: "HUM Emerald Heights Luxury Residences",
    projectId: "emerald-overview",
  },
  {
    video: "https://assets.mixkit.co/videos/4861/4861-720.mp4",
    poster: "/Image/1bhk.png",
    title: "1 BHK Smart Luxe Suite",
    caption: "Thoughtfully planned living & dining salon with zero space wastage, master bedroom, and panoramic French windows.",
    alt: "1 BHK Smart Luxe Suite - HUM Emerald",
    projectId: "1bhk-suite",
  },
  {
    video: "https://assets.mixkit.co/videos/5047/5047-720.mp4",
    poster: "/Image/2bhk.png",
    title: "2 BHK Grand Family Residence",
    caption: "Expansive layout featuring dual sunlit balconies, private master sanctuary, children's bedroom, and modular kitchen.",
    alt: "2 BHK Grand Family Residence - HUM Emerald",
    projectId: "2bhk-residence",
  },
  {
    video: "https://assets.mixkit.co/videos/4183/4183-720.mp4",
    poster: "/Image/3bhk.png",
    title: "3 BHK Presidential Sky Residence",
    caption: "Palatial multi-generational living with 3 en-suite bedrooms, sweeping skyline views, and bespoke luxury finishes.",
    alt: "3 BHK Presidential Sky Residence - HUM Emerald",
    projectId: "3bhk-presidential",
  },
  {
    video: "https://assets.mixkit.co/videos/43525/43525-720.mp4",
    poster: "https://cdn.sanity.io/images/3wmbb6cw/production/98cb2c2d4f9a75bfb71f3458d5036e9fc0b98c47-2000x1125.jpg",
    title: "Luxury Living & Dining Salon",
    caption: "Sophisticated open-concept entertainment space with designer Italian marble flooring and ambient mood lighting.",
    alt: "Luxury Living Salon - HUM Emerald",
    projectId: "living-salon",
  },
];

/**
 * Static Bottom Navigation Switcher Configurations (HUM Emerald Rooms)
 */
const HERO_CONFIGURATIONS = [
  {
    id: "1bhk-suite",
    name: "1 BHK Smart Luxe",
    shortName: "1 BHK Suite",
    area: "465 Sq.Ft. Carpet",
    tagline: "Smart Space Engineered",
    image: "/Image/1bhk.png",
    slideIndex: 1,
  },
  {
    id: "2bhk-residence",
    name: "2 BHK Grand Family",
    shortName: "2 BHK Grand",
    area: "680 Sq.Ft. Carpet",
    tagline: "Dual Balconies",
    image: "/Image/2bhk.png",
    slideIndex: 2,
  },
  {
    id: "3bhk-presidential",
    name: "3 BHK Presidential",
    shortName: "3 BHK Sky Suite",
    area: "950 Sq.Ft. Carpet",
    tagline: "3 En-Suite Bedrooms",
    image: "/Image/3bhk.png",
    slideIndex: 3,
  },
  {
    id: "living-salon",
    name: "Grand Living Salon",
    shortName: "Living & Dining",
    area: "Double-Height Vibe",
    tagline: "Italian Marble Finish",
    image: "https://cdn.sanity.io/images/3wmbb6cw/production/98cb2c2d4f9a75bfb71f3458d5036e9fc0b98c47-2000x1125.jpg",
    slideIndex: 4,
  },
];

export function HeroParallax({
  onSelectProject
}: HeroParallaxProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselRef = useRef<ApertureCarouselHandle>(null);

  const handleSelectThumbnail = (slideIndex: number, id: string) => {
    carouselRef.current?.goTo(slideIndex);
    if (onSelectProject) {
      onSelectProject(id);
    }
  };

  return (
    <section id="overview" className="relative w-full h-[100svh] overflow-hidden bg-[#0A0F1D]">
      <style>{`
        @keyframes ap-fill-strip {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      {/* 5-Slide Aperture Iris Reveal Carousel */}
      <ApertureCarousel
        ref={carouselRef}
        slides={HERO_SLIDES}
        height="100svh"
        autoplay={5000}
        duration={1100}
        ink="#ffffff"
        onChange={setActiveSlideIndex}
      >
        {/*
          Static Bottom Strip:
          Persistent across all sliders, contains the auto-fill progress track,
          the 4 project thumbnails, and Scroll To Explore cue.
          Uses data-no-lens="1" so pointer events do not trigger the aperture lens canvas.
        */}
        <div
          data-no-lens="1"
          className="absolute bottom-0 inset-x-0 z-20 w-full pointer-events-auto bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/80 to-transparent pt-10 pb-8 sm:pb-10 px-4 sm:px-6"
        >
          {/* Auto-fill progress track placed just above Static Bottom Strip */}
          <div className="max-w-7xl mx-auto px-4 mb-3" aria-hidden="true">
            <div className="h-[2px] w-full bg-white/15 rounded-full overflow-hidden">
              {activeSlideIndex === 0 && (
                <div
                  key={`ap-fill-strip-${activeSlideIndex}`}
                  className="h-full bg-white origin-left"
                  style={{
                    animation: "ap-fill-strip 5000ms linear forwards",
                  }}
                  onAnimationEnd={() => carouselRef.current?.go(1)}
                />
              )}
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 pb-4 sm:pb-6 w-full flex flex-col md:flex-row items-center justify-between gap-5  pt-4">
            {/* 4 HUM Emerald Suite & Room Thumbnails Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full md:w-auto">
              {HERO_CONFIGURATIONS.map((config) => {
                const isCurrent = activeSlideIndex === config.slideIndex;
                return (
                  <button
                    key={config.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectThumbnail(config.slideIndex, config.id);
                    }}
                    className={`text-left p-2 sm:p-2.5 rounded-lg transition-all duration-300 flex items-center gap-2.5 sm:gap-3 border backdrop-blur-md cursor-pointer ${
                      isCurrent
                        ? "bg-[#265CA0]/40 border-[#265CA0] shadow-[0_0_20px_rgba(38,92,160,0.6)] ring-1 ring-[#265CA0]"
                        : "bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/25"
                    }`}
                  >
                    <div className="relative w-11 h-9 sm:w-12 sm:h-10 rounded overflow-hidden shrink-0 border border-white/10 bg-slate-900">
                      <Image
                        src={config.image}
                        alt={config.name}
                        fill
                        className="object-cover"
                        sizes="60px"
                      />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-[#265CA0]/30 mix-blend-overlay" />
                      )}
                    </div>
                    <div className="min-w-0 pr-1">
                      <div className="text-[11px] sm:text-xs font-bold text-white truncate flex items-center gap-1.5 font-sans">
                        <span>{config.shortName}</span>
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                        )}
                      </div>
                      <div className="text-[10px] text-white/70 truncate font-sans">
                        {config.area}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Side: Scroll Cue Only */}
            <div className="flex items-center self-end md:self-center">
              <a
                href="#heritage"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors group py-2"
              >
                <span className="hidden sm:inline">Scroll To Explore</span>
                <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#265CA0] group-hover:text-[#265CA0] transition-colors">
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </ApertureCarousel>
    </section>
  );
}

export default HeroParallax;
export { HeroParallax as SobhaHeroParallax };
