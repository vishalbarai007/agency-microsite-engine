"use client";

import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import {
  X,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  Calendar,
  MessageSquare,
  ArrowRight,
  Layers
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface HumAmenity {
  id: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  specs: {
    placement: string;
    access: string;
    hours: string;
    atmosphere: string;
  };
  thumbnailImage: string;
  galleryImages: string[];
  highlights: string[];
  availableAt: string;
}

interface AmenityDetailModalProps {
  amenity: HumAmenity | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: (amenityName?: string) => void;
}

export function AmenityDetailModal({
  amenity,
  isOpen,
  onClose,
  onOpenBooking
}: AmenityDetailModalProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isPaused, setIsPaused] = useState(false);

  // Cache active amenity so exit animation has data during unmount
  const cachedAmenityRef = useRef<HumAmenity | null>(amenity);
  if (amenity) {
    cachedAmenityRef.current = amenity;
  }
  const currentAmenity = amenity || cachedAmenityRef.current;

  // Stop background scroll and pause Lenis while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.stop === "function") {
      lenis.stop();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      if (lenis && typeof lenis.start === "function") {
        lenis.start();
      }
    };
  }, [isOpen]);

  // Gather unique images (at max 4 landscape boxes on right side)
  const allImages = currentAmenity
    ? Array.from(
        new Set(
          [
            currentAmenity.thumbnailImage,
            ...(currentAmenity.galleryImages || [])
          ].filter(Boolean)
        )
      )
    : [];

  const thumbnailImages = allImages.slice(0, 4);

  // Reset active index when amenity changes
  useEffect(() => {
    setActiveIndex(0);
    setDirection("up");
  }, [currentAmenity?.id]);

  // Auto-advance vertical carousel every 3.5s (pauses on hover)
  useEffect(() => {
    if (!isOpen || isPaused || thumbnailImages.length <= 1) return;

    const timer = setInterval(() => {
      setDirection("up");
      setActiveIndex((prev) => (prev + 1) % thumbnailImages.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, thumbnailImages.length]);

  if (!currentAmenity) return null;

  const handleSelectThumbnail = (idx: number) => {
    setDirection(idx > activeIndex ? "up" : "down");
    setActiveIndex(idx);
  };

  const currentImage =
    thumbnailImages[activeIndex] || currentAmenity.thumbnailImage;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) onClose();
          }}
        >
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="fixed inset-0 bg-slate-950/75 backdrop-blur-md z-50"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: "-48%", x: "-50%" }}
                animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
                exit={{ opacity: 0, scale: 0.96, y: "-48%", x: "-50%" }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                data-lenis-prevent
                className="fixed top-1/2 left-1/2 z-50 w-[95vw] max-w-5xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 shadow-2xl rounded-none text-slate-900 focus:outline-none"
              >
                {/* Modal Header Bar with Close Button */}
                <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-[2px] bg-[#265CA0]" />
                    <span className="text-xs uppercase tracking-[0.25em] text-[#265CA0] font-bold">
                      {currentAmenity.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-none transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  {/* =========================================================================
                      MODAL CAROUSEL STRUCTURE: VERTICAL BOTTOM-TO-TOP CAROUSEL WITH
                      4 SMALL LANDSCAPE THUMBNAIL BOXES (WIDTH > HEIGHT) ON RIGHT SIDE
                     ========================================================================= */}
                  <div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Main Stage: Vertically Animated Preview Image */}
                    <div className="lg:col-span-9 relative h-[320px] sm:h-[420px] md:h-[480px] bg-slate-950 overflow-hidden rounded-none shadow-lg">
                      <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                          key={activeIndex}
                          custom={direction}
                          initial={{
                            y: direction === "up" ? "100%" : "-100%",
                            opacity: 0.3
                          }}
                          animate={{
                            y: "0%",
                            opacity: 1
                          }}
                          exit={{
                            y: direction === "up" ? "-100%" : "100%",
                            opacity: 0.3
                          }}
                          transition={{
                            y: { type: "spring", stiffness: 260, damping: 28 },
                            opacity: { duration: 0.35 }
                          }}
                          className="absolute inset-0 w-full h-full"
                        >
                          <Image
                            src={currentImage}
                            alt={`${currentAmenity.name} preview`}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 75vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                        </motion.div>
                      </AnimatePresence>

                      {/* Bottom Overlay on Main Image */}
                      <div className="absolute bottom-5 left-5 right-5 z-20 text-white flex items-end justify-between gap-4 pointer-events-none">
                        <div>
                          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#93C5FD] font-bold block mb-1">
                            {currentAmenity.category}
                          </span>
                          <h4 className="font-heading text-xl sm:text-2xl font-black uppercase text-white [text-shadow:_0_2px_8px_rgba(0,0,0,0.85)]">
                            {currentAmenity.name}
                          </h4>
                        </div>
                        <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider rounded-none">
                          {activeIndex + 1} / {thumbnailImages.length}
                        </div>
                      </div>
                    </div>

                    {/* Right Side: At Max 4 Small Landscape Thumbnail Boxes (width > height) */}
                    <div className="lg:col-span-3 flex lg:flex-col gap-3 justify-between overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                      {thumbnailImages.map((img, idx) => {
                        const isSelected = activeIndex === idx;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSelectThumbnail(idx)}
                            className={`relative flex-1 lg:flex-initial h-20 sm:h-24 lg:h-[110px] w-28 sm:w-36 lg:w-full shrink-0 overflow-hidden transition-all rounded-none border-2 text-left group/thumb ${
                              isSelected
                                ? "border-[#265CA0] shadow-md ring-2 ring-[#265CA0]/30"
                                : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400"
                            }`}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${idx + 1}`}
                              fill
                              sizes="160px"
                              className="object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                            />
                            <div
                              className={`absolute inset-0 transition-colors ${
                                isSelected
                                  ? "bg-[#265CA0]/20"
                                  : "bg-black/25 group-hover/thumb:bg-transparent"
                              }`}
                            />
                            <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded-none bg-black/75 text-[9px] font-bold text-white tracking-widest">
                              0{idx + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* =========================================================================
                      BELOW MODAL CAROUSEL: AMENITY OVERVIEW & SPECIFICATIONS
                     ========================================================================= */}
                  <div className="space-y-6 pt-2">
                    {/* Tagline & Title */}
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#EBF3FC] text-[#265CA0] text-xs uppercase tracking-widest font-bold mb-2">
                        <span>{currentAmenity.tagline}</span>
                      </div>
                      <h3 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 uppercase">
                        {currentAmenity.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 font-normal leading-relaxed">
                        {currentAmenity.overview}
                      </p>
                    </div>

                    {/* 4 Clean Amenity Specifications Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#F8FAFC] border border-slate-200 rounded-none shadow-sm">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                          Location
                        </span>
                        <span className="font-heading text-sm sm:text-base font-bold text-slate-900 block mt-1">
                          {currentAmenity.specs.placement}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                          Access
                        </span>
                        <span className="font-heading text-sm sm:text-base font-bold text-[#265CA0] block mt-1">
                          {currentAmenity.specs.access}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                          Timings
                        </span>
                        <span className="font-heading text-sm sm:text-base font-bold text-slate-900 block mt-1">
                          {currentAmenity.specs.hours}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                          Atmosphere
                        </span>
                        <span className="font-heading text-sm sm:text-base font-bold text-slate-900 block mt-1">
                          {currentAmenity.specs.atmosphere}
                        </span>
                      </div>
                    </div>

                    {/* Key Lifestyle Highlights Checklist */}
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-[#265CA0] font-bold mb-3">
                        Curated Experience Highlights
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentAmenity.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-white border border-slate-200/90 rounded-none shadow-xs"
                          >
                            <div className="w-5 h-5 rounded-full bg-[#EBF3FC] text-[#265CA0] flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                            <span className="text-xs text-slate-700 font-medium leading-relaxed">
                              {highlight}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Availability Note */}
                    <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-none flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#265CA0] shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Availability Across Portfolios
                          </span>
                          <span className="text-xs text-slate-600 block mt-0.5">
                            {currentAmenity.availableAt}
                          </span>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block px-3 py-1 bg-[#265CA0] text-white text-[11px] font-bold uppercase tracking-wider rounded-none">
                        Prime Feature
                      </span>
                    </div>

                    {/* Direct Action Buttons Strip */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenBooking?.(currentAmenity.name);
                        }}
                        className="w-full sm:flex-1 py-3.5 px-6 bg-[#265CA0] hover:bg-[#183C68] text-white text-xs font-bold uppercase tracking-wider rounded-none shadow-md transition-colors flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Schedule Experience Visit</span>
                      </button>

                      <a
                        href={`https://wa.me/919920061100?text=${encodeURIComponent(
                          `Hello HUM Developers, I would like to know more about the ${currentAmenity.name} and amenity provisions.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-none shadow transition-all shrink-0"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp Concierge</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
}
