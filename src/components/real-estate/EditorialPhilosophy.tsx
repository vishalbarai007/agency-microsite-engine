"use client";

import React from "react";
import Image from "next/image";
import { Award, Compass, Sparkles, Building } from "lucide-react";

export function EditorialPhilosophy() {
  return (
    <section id="story" className="py-28 bg-[#0F0F11] text-white relative overflow-hidden">
      {/* Background Architectural Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9B802E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow and Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-medium">
              Architectural Philosophy
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.15] mb-6">
            An ethereal landscape. <br />
            <span className="italic text-[#C5A880]">Conceived on Mother Earth.</span>
          </h2>
          <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            At Lodha, we believe that true luxury does not shout; it breathes. Every tower is
            orientated to capture maritime sea breezes and solar daylight geometry, surrounded
            by dense groves of mature trees, tranquil water cascades, and private gardens designed
            in collaboration with world-renowned landscape artisans.
          </p>
        </div>

        {/* Dual Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Main Visual */}
          <div className="lg:col-span-7 relative h-[420px] sm:h-[520px] w-full rounded-sm overflow-hidden border border-[#9B802E]/20 shadow-2xl group">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400"
              alt="Lodha Bellevue Architectural View"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block mb-1">
                Landscape & Topography
              </span>
              <p className="font-serif text-lg text-white">
                Over 85% open landscaped greenery amidst Mumbai’s bustling metropolis.
              </p>
            </div>
          </div>

          {/* Secondary Editorial Pillar */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="p-8 bg-[#141417] border border-[#9B802E]/20 rounded-sm">
              <Sparkles className="w-6 h-6 text-[#C5A880] mb-4" />
              <h3 className="font-serif text-2xl text-white mb-2">
                Thoughtfully Planned Residences
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                Grand 11.5 to 22-foot clear ceiling heights, expansive living decks, and discrete service
                corridors ensure your personal haven remains secluded from domestic operational flows.
              </p>
              <div className="text-[11px] uppercase tracking-widest text-[#C5A880] flex items-center gap-2">
                <span>Saint Amand Hospitality Integrated</span>
              </div>
            </div>

            <div className="relative h-[220px] sm:h-[260px] w-full rounded-sm overflow-hidden border border-[#9B802E]/20">
              <Image
                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800"
                alt="Interior Marble Suite"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
          </div>
        </div>

        {/* Brand Legacy Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-[#9B802E]/20">
          <div>
            <div className="font-serif text-3xl sm:text-5xl text-[#C5A880] font-normal mb-1">
              40+
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              Years of Architectural Legacy
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl sm:text-5xl text-[#C5A880] font-normal mb-1">
              50,000+
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              Discerning Families Housed
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl sm:text-5xl text-[#C5A880] font-normal mb-1">
              85M+
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              Sq. Ft. Prime Real Estate Delivered
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl sm:text-5xl text-[#C5A880] font-normal mb-1">
              Global
            </div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">
              Footprint in London & India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
