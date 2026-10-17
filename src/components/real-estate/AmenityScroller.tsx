"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { humAmenitiesData } from "@/data/amenities";
import { AmenityDetailModal, HumAmenity } from "./AmenityDetailModal";

interface AmenityScrollerProps {
  onOpenBooking?: (amenityName?: string) => void;
  onOpenBrochure?: (amenityName?: string) => void;
  selectedFilter?: string;
}

export function AmenityScroller({
  onOpenBooking,
  onOpenBrochure,
  selectedFilter = "All"
}: AmenityScrollerProps) {
  const [selectedAmenity, setSelectedAmenity] = useState<HumAmenity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const filteredAmenities = humAmenitiesData.filter((amenity) => {
    if (selectedFilter === "All") return true;
    return amenity.category.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  // Duplicate list to create a seamless infinite loop
  const marqueeAmenities = [
    ...filteredAmenities,
    ...filteredAmenities,
    ...filteredAmenities
  ];

  const handleCardClick = (amenity: HumAmenity) => {
    setSelectedAmenity(amenity);
    setIsModalOpen(true);
  };

  return (
    <section
      id="amenities"
      className="relative w-full bg-[#0F172A] text-white py-20 sm:py-28 overflow-hidden"
    >
      {/* Top Header Section (Clean White on Dark Blue) */}
      <div className="max-w-7xl mx-auto px-6 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 h-[2px] bg-white/70" />
            <span className="text-xs uppercase tracking-[0.25em] text-white/90 font-bold">
              03 / CURATED AMENITIES
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            World-Class Amenities
          </h2>
          <p className="text-xs sm:text-sm text-white/80 mt-2.5 font-normal max-w-xl">
            Thoughtfully planned spaces for wellness, recreation, and family celebrations across our Mumbai landmarks. Click any amenity to explore full specifications and gallery views.
          </p>
        </div>
      </div>

      {/* =========================================================================
          CONTINUOUS RIGHT-TO-LEFT AUTO-CAROUSEL TRACK (PAUSE ON HOVER)
         ========================================================================= */}
      <div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex gap-6 sm:gap-8 w-max will-change-transform py-4"
          style={{
            animation: "humMarqueeRTL 48s linear infinite",
            animationPlayState: isHovered ? "paused" : "running"
          }}
        >
          {marqueeAmenities.map((amenity, idx) => (
            <div
              key={`${amenity.id}-${idx}`}
              onClick={() => handleCardClick(amenity)}
              className="relative shrink-0 w-[300px] sm:w-[380px] md:w-[440px] h-[460px] sm:h-[520px] md:h-[580px] rounded-none overflow-hidden cursor-pointer group/card bg-slate-900 border border-white/15 shadow-xl transition-all duration-300 hover:border-white hover:shadow-2xl [transform:translateZ(0)] [backface-visibility:hidden]"
            >
              {/* Card Image */}
              <Image
                src={amenity.thumbnailImage}
                alt={amenity.name}
                fill
                sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, 440px"
                className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
              />

              {/* Gradient Scrim for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Amenity Name Just Above Image in Left Bottom Corner */}
              <div className="absolute bottom-6 left-6 right-6 z-10 text-white pointer-events-none">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#93C5FD] font-bold mb-1">
                  {amenity.category}
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight [text-shadow:_0_2px_10px_rgba(0,0,0,0.85)]">
                  {amenity.name}
                </h3>
              </div>

              {/* Hover Indicator Icon */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframe animation injected via styled JSX */}
      <style jsx>{`
        @keyframes humMarqueeRTL {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
      `}</style>

      {/* =========================================================================
          INTERACTIVE AMENITY DETAIL MODAL WITH VERTICAL CAROUSEL
         ========================================================================= */}
      <AmenityDetailModal
        amenity={selectedAmenity}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTimeout(() => setSelectedAmenity(null), 300);
        }}
        onOpenBooking={onOpenBooking}
      />
    </section>
  );
}

// Named aliases for backwards compatibility
export default AmenityScroller;
export const AzimutePinnedProjects = AmenityScroller;
export const AzimutePinnedAmenities = AmenityScroller;
