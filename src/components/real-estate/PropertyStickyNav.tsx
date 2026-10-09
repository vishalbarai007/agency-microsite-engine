"use client";

import React, { useState, useEffect } from "react";
import { PhoneCall } from "lucide-react";

interface PropertyStickyNavProps {
  onOpenBooking: () => void;
}

export function PropertyStickyNav({ onOpenBooking }: PropertyStickyNavProps) {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "overview",
        "story",
        "typologies",
        "amenities",
        "floorplans",
        "connectivity",
        "faqs"
      ];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-[69px] z-30 w-full bg-[#121215]/95 backdrop-blur-md border-y border-[#9B802E]/20 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-12">
        <div className="flex items-center gap-8 overflow-x-auto text-[11px] uppercase tracking-[0.2em]">
          <a
            href="#overview"
            className={`transition-colors py-3 border-b-2 ${
              activeSection === "overview"
                ? "text-[#C5A880] border-[#C5A880]"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Overview
          </a>
          <a
            href="#story"
            className={`transition-colors py-3 border-b-2 ${
              activeSection === "story"
                ? "text-[#C5A880] border-[#C5A880]"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Philosophy
          </a>
          <a
            href="#typologies"
            className={`transition-colors py-3 border-b-2 ${
              activeSection === "typologies"
                ? "text-[#C5A880] border-[#C5A880]"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Residences
          </a>
          <a
            href="#amenities"
            className={`transition-colors py-3 border-b-2 ${
              activeSection === "amenities"
                ? "text-[#C5A880] border-[#C5A880]"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Amenities
          </a>
          <a
            href="#floorplans"
            className={`transition-colors py-3 border-b-2 ${
              activeSection === "floorplans"
                ? "text-[#C5A880] border-[#C5A880]"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Floor Plans
          </a>
          <a
            href="#connectivity"
            className={`transition-colors py-3 border-b-2 ${
              activeSection === "connectivity"
                ? "text-[#C5A880] border-[#C5A880]"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Neighbourhood
          </a>
          <a
            href="#faqs"
            className={`transition-colors py-3 border-b-2 ${
              activeSection === "faqs"
                ? "text-[#C5A880] border-[#C5A880]"
                : "text-slate-400 border-transparent hover:text-white"
            }`}
          >
            Queries
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="goldenLineBtn text-[10px]"
          >
            <PhoneCall className="w-3 h-3 text-[#C5A880]" />
            Request Callback
          </button>
        </div>
      </div>
    </div>
  );
}
