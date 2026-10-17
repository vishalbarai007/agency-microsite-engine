"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  // ChevronLeft,
  // ChevronRight,
  Maximize2,
  X,
  ArrowUpRight,
  Calendar,
  Layers
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface FloorPlanScrubberProps {
  onOpenBooking?: (unitName?: string) => void;
}

interface FloorPlanSlide {
  id: "floorplan" | "1bhk" | "2bhk" | "3bhk";
  tabLabel: string;
  badge: string;
  title: string;
  tagline: string;
  specs: string;
  image: string;
}

const FLOOR_PLAN_SLIDES: FloorPlanSlide[] = [
  {
    id: "floorplan",
    tabLabel: "Floor Plan",
    badge: "Master Layout",
    title: "Tower Master Floor Plan",
    tagline: "Wing Cluster Blueprint & Core Layout",
    specs: "Zero Space Wastage • Vastu Aligned • Natural Cross-Ventilation",
    image: "/Image/floorplan.png",
  },
  {
    id: "1bhk",
    tabLabel: "1 BHK",
    badge: "Smart Luxe",
    title: "1 BHK Top View Cutaway",
    tagline: "Spacious Living, Dining & Master Suite",
    specs: "Efficient 465 Sq.Ft. Carpet • French Windows • Ergonomic Kitchen",
    image: "/Image/1bhk.png",
  },
  {
    id: "2bhk",
    tabLabel: "2 BHK",
    badge: "Family Grand",
    title: "2 BHK Top View Cutaway",
    tagline: "Dual Balconies, Master & Guest Bedrooms",
    specs: "Expansive 680 Sq.Ft. Carpet • 2 Designer Bathrooms • Dedicated Utility",
    image: "/Image/2bhk.png",
  },
  {
    id: "3bhk",
    tabLabel: "3 BHK",
    badge: "Sky Residence",
    title: "3 BHK Top View Cutaway",
    tagline: "Palatial Living Salon & 3 En-Suite Bedrooms",
    specs: "Luxury 950 Sq.Ft. Carpet • Panoramic Balconies • Pooja Nook",
    image: "/Image/3bhk.png",
  },
];

export function FloorPlanScrubber({ onOpenBooking }: FloorPlanScrubberProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Auto-advance carousel every 2 seconds, paused on hover
  useEffect(() => {
    if (isPaused || isZoomOpen) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % FLOOR_PLAN_SLIDES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused, isZoomOpen]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? FLOOR_PLAN_SLIDES.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % FLOOR_PLAN_SLIDES.length);
  };

  const currentSlide = FLOOR_PLAN_SLIDES[currentIndex];

  return (
    <section
      id="residences"
      className="relative w-full h-screen min-h-[720px] md:h-[100vh] text-slate-900 overflow-hidden flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 lg:px-12 select-none"
    >
      {/* =========================================================================
          BACKGROUND DESIGN: WHITE BG WITH LOW-OPACITY TEXTURE BG.PNG & OVERLAY LAYER
         ========================================================================= */}
      {/* 1. Base White */}
      <div className="absolute inset-0 -z-20 pointer-events-none" />

      {/* 2. Texture bg.png with low opacity */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url('/Image/bg.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          opacity: 0.35,
        }}
      />


      {/* =========================================================================
          TOP HEADER: MINIMAL TEXT WITH CHAPTER & INTERACTIVE SECTION SWITCHER TABS
         ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 shrink-0">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="w-8 h-[2px] bg-[#265CA0]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#265CA0] font-bold">
              04 / ARCHITECTURAL BLUEPRINTS
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase leading-tight">
            Master Layout &amp; Top Views
          </h2>
        </div>
      </div>

      {/* =========================================================================
          CENTER STAGE: CAROUSEL WITH PREV/NEXT ARROWS & 2SEC AUTO-ROTATION
         ========================================================================= */}
      <div
        className="relative max-w-7xl mx-auto w-full flex-1 my-3 sm:my-4 flex items-center justify-center min-h-0 z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >

        {/* Interactive Center Stage Card */}
        <div className="relative w-full h-full max-h-[72vh] bg-white/95 border border-slate-200/90 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center p-3 sm:p-6 group/stage">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide.id}
              custom={direction}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center cursor-zoom-in"
              onClick={() => setIsZoomOpen(true)}
            >
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain p-2 sm:p-4 select-none drop-shadow-md"
              />
            </motion.div>
          </AnimatePresence>

          {/* Top-Right High-Res Zoom Trigger */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-[#265CA0] text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md transition-all shadow-md cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Zoom</span>
          </button>

          {/* Floating Minimal Info Badges */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-auto sm:left-6 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
            <span className="px-3 py-1 bg-[#265CA0] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow">
              {currentSlide.badge}
            </span>
            <span className="px-3.5 py-1 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-800 text-xs font-semibold rounded-md shadow-xs">
              {currentSlide.title}
            </span>
            <span className="hidden md:inline-block px-3 py-1 bg-white/80 backdrop-blur-md text-slate-500 text-xs font-normal rounded-md">
              {currentSlide.specs}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM CONTROL & PROGRESS STRIP
         ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 z-10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-700 uppercase tracking-wider">
            {currentIndex + 1} / {FLOOR_PLAN_SLIDES.length}
          </span>
          <div className="flex gap-1.5">
            {FLOOR_PLAN_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i ? "w-7 bg-[#265CA0]" : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
         
        </div>

        {/* Direct CTA Button in Theme Deep Blue */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onOpenBooking?.(currentSlide.title)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#183C68] hover:bg-[#265CA0] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <span>Enquire Layout</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          FULLSCREEN ZOOM LIGHTBOX MODAL
         ========================================================================= */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-6xl h-[88vh] bg-white rounded-none border border-slate-200 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white z-10 shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#265CA0] text-white text-[11px] font-bold uppercase tracking-wider rounded-none">
                  {currentSlide.badge}
                </span>
                <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 uppercase">
                  {currentSlide.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors rounded-none"
                aria-label="Close zoom"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="relative flex-1 w-full bg-slate-50 p-4 sm:p-6 overflow-hidden flex items-center justify-center">
              <Image
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <p className="text-xs text-slate-600 font-medium">
                {currentSlide.specs}
              </p>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsZoomOpen(false);
                    onOpenBooking?.(currentSlide.title);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#265CA0] hover:bg-[#183C68] text-white text-xs font-semibold uppercase tracking-wider rounded-none transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Request Full PDF Plan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FloorPlanScrubber;
export const AzimuteResidencesScrubber = FloorPlanScrubber;
