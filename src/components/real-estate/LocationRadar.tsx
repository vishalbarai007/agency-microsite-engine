"use client";

import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";

interface ConnectivityCategory {
  category: string;
  items: {
    name: string;
    time: string;
  }[];
}

const CONNECTIVITY_DATA: ConnectivityCategory[] = [
  {
    category: "TRANSPORT",
    items: [
      { name: "New Link Road", time: "3 MINS" },
      { name: "Shimpoli Metro Station", time: "3 MINS" },
      { name: "Borivali West Metro Station", time: "5 MINS" },
    ],
  },
  {
    category: "HEALTHCARE",
    items: [
      { name: "Mangalmurti Hospital", time: "4 MINS" },
    ],
  },
  {
    category: "EDUCATION",
    items: [
      { name: "Nalanda Law College", time: "6 MINS" },
      { name: "Swami Vivekanand International School", time: "5 MINS" },
    ],
  },
];

const EMERALD_LOCATION = {
  name: "HUM Emerald Heights",
  address: "Off New Link Road, Near Dahanukarwadi Metro, Kandivali West, Mumbai 400067",
  lat: 19.2085,
  lng: 72.8362,
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=HUM+Emerald+Heights+Kandivali+West+Mumbai",
};

interface LocationRadarProps {
  onOpenBooking?: (projectName?: string) => void;
}

export function LocationRadar({ onOpenBooking }: LocationRadarProps) {
  return (
    <section
      id="connectivity"
      className="relative w-full bg-[#0F172A] text-white py-16 sm:py-24 overflow-hidden border-t border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A880]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-normal">
              Location & Connectivity
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight uppercase font-['Outfit',sans-serif]">
            Mumbai At Your Doorstep
          </h2>
        </div>

        {/* 2-Column Split: Google Map on Left | Minimal Connectivity on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Google Map with Pinned HUM Emerald Heights */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl h-[420px] sm:h-[480px] lg:h-[500px]">
              <iframe
                title="HUM Emerald Heights Location Map"
                src={`https://maps.google.com/maps?q=${EMERALD_LOCATION.lat},${EMERALD_LOCATION.lng}&hl=en&z=15&output=embed`}
                className="w-full h-full border-0 select-none"
                loading="eager"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Minimal floating pill at bottom */}
              <div className="absolute bottom-3 inset-x-3 bg-[#0F172A]/90 backdrop-blur-md border border-white/15 px-4 py-3 rounded-lg flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <div className="truncate">
                    <span className="text-white font-medium block truncate">
                      {EMERALD_LOCATION.name}
                    </span>
                    <span className="text-slate-400 text-[11px] block truncate">
                      {EMERALD_LOCATION.address}
                    </span>
                  </div>
                </div>
                <a
                  href={EMERALD_LOCATION.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#C5A880] hover:text-white transition-colors text-xs font-normal uppercase tracking-wider shrink-0"
                >
                  <span>Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Editorial Connectivity List */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-8">
            {CONNECTIVITY_DATA.map((section, idx) => (
              <div key={idx} className="space-y-1">
                {/* Category Header */}
                <div className="text-[#C5A880] text-xs uppercase tracking-[0.25em] font-normal mb-3">
                  {section.category}
                </div>

                {/* Items with subtle borders */}
                <div className="divide-y divide-white/10">
                  {section.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="py-3.5 flex items-center justify-between gap-4 text-white/90"
                    >
                      <span className="font-['Cormorant_Garamond',serif] not-italic text-lg sm:text-xl font-normal tracking-wide text-slate-100">
                        {item.name}
                      </span>
                      <span className="text-xs sm:text-sm uppercase tracking-widest text-slate-400 font-normal shrink-0">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationRadar;
export { LocationRadar as MinimalTransitRadar };
