"use client";

import React from "react";
import Image from "next/image";
import { Download, Calendar, Compass, Shield } from "lucide-react";

interface LuxuryPropertyHeroProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export function LuxuryPropertyHero({
  onOpenBooking,
  onOpenBrochure
}: LuxuryPropertyHeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-end pb-20 pt-36 overflow-hidden">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=2000"
          alt="Lodha Luxury Real Estate Development"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multilayer Luxury Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/65 to-black/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Luxury Badge & Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#C5A880]/40 backdrop-blur-md mb-6">
          <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-medium">
            MahaRERA: P51900030114 &bull; South Mumbai
          </span>
        </div>

        {/* Poetic Editorial Headline */}
        <div className="max-w-4xl">
          <span className="block font-sans text-xs md:text-sm uppercase tracking-[0.3em] text-[#E5E3DF] mb-3">
            Lodha Bellevue &bull; Mahalaxmi
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-[1.08] mb-6">
            Easily Confused <br className="hidden sm:inline" />
            <span className="italic font-light text-[#C5A880]">with Heaven.</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-slate-300 font-light max-w-2xl leading-relaxed mb-10">
            An ethereal 5-acre urban sanctuary conceived on Mother Earth. Palatial 3, 4 & 5+ bed
            residences set in private botanical gardens, framing panoramic views of the Arabian Sea
            and the historic Mahalaxmi Racecourse.
          </p>
        </div>

        {/* Luxury Metric Strip & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-8 border-t border-[#9B802E]/25">
          {/* Key Property Specs */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A0A0] block mb-1">
                Typology
              </span>
              <span className="font-serif text-xl sm:text-2xl text-white">
                3, 4 & 5+ BHK
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A0A0] block mb-1">
                Price Guidance
              </span>
              <span className="font-serif text-xl sm:text-2xl text-[#C5A880]">
                From ₹5.85 Cr*
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A0A0] block mb-1">
                Development Area
              </span>
              <span className="font-serif text-xl sm:text-2xl text-white">
                5 Acres Green
              </span>
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#A0A0A0] block mb-1">
                Possession
              </span>
              <span className="font-serif text-xl sm:text-2xl text-white">
                Dec 2026
              </span>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
            <button
              onClick={onOpenBooking}
              className="goldenFilledBtn flex-1 sm:flex-initial"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Schedule Private Viewing
            </button>
            <button
              onClick={onOpenBrochure}
              className="goldenBorderBtn flex-1 sm:flex-initial"
            >
              <Download className="w-4 h-4 mr-1" />
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
