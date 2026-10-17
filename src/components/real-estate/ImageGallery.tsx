"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

interface ImageGalleryProps {
  onOpenBooking?: (projectName?: string) => void;
}

export function ImageGallery({ onOpenBooking }: ImageGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const centerInitialBadgeRef = useRef<HTMLDivElement>(null);
  const slide1FullBadgeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Master GSAP Timeline tied to ScrollTrigger
      // Total scroll length: 250vh (50vh title + 50vh scale + 5 slides x 30vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // ------------------------------------------------------------------------
      // STAGE 1: 0 -> 50vh (Timeline 0 -> 50)
      // Title starts small and smoothly scales up to full size
      // ------------------------------------------------------------------------
      gsap.set(titleWrapRef.current, { scale: 0.72, opacity: 0.75, transformOrigin: "center center" });
      tl.to(
        titleWrapRef.current,
        {
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          duration: 50,
        },
        0
      );

      // ------------------------------------------------------------------------
      // STAGE 2: 50vh -> 100vh (Timeline 50 -> 100)
      // Center image expands to full screen (100vw x 100vh).
      // Left and right floating cards slide out and fade away.
      // Title fades out.
      // ------------------------------------------------------------------------
      tl.to(
        titleWrapRef.current,
        {
          opacity: 0,
          y: -40,
          scale: 1.05,
          duration: 25,
          ease: "power1.in",
        },
        50
      );

      if (leftCardRef.current) {
        tl.to(
          leftCardRef.current,
          {
            xPercent: -60,
            opacity: 0,
            duration: 35,
            ease: "power1.in",
          },
          50
        );
      }

      if (rightCardRef.current) {
        tl.to(
          rightCardRef.current,
          {
            xPercent: 60,
            opacity: 0,
            duration: 35,
            ease: "power1.in",
          },
          50
        );
      }

      // Initial card label fades out as image expands
      if (centerInitialBadgeRef.current) {
        tl.to(
          centerInitialBadgeRef.current,
          {
            opacity: 0,
            duration: 20,
            ease: "power1.in",
          },
          50
        );
      }

      // Center card expands to fill 100vw x 100vh with 0 border radius and borderless
      if (centerCardRef.current) {
        tl.to(
          centerCardRef.current,
          {
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
            borderWidth: "0px",
            borderColor: "transparent",
            boxShadow: "none",
            duration: 50,
            ease: "power2.inOut",
          },
          50
        );
      }

      // Full-bleed editorial badge for Slide 1 appears when expansion completes
      if (slide1FullBadgeRef.current) {
        gsap.set(slide1FullBadgeRef.current, { opacity: 0, y: 30 });
        tl.to(
          slide1FullBadgeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 20,
            ease: "power1.out",
          },
          80
        );
      }

      // ------------------------------------------------------------------------
      // STAGE 3 to 7: 100vh -> 250vh (Timeline 100 -> 250)
      // Horizontal slide right-to-left: remaining HUM Emerald images slide into view
      // ------------------------------------------------------------------------
      if (trackRef.current) {
        // Slide 2: 1 BHK Smart Luxe (100 -> 130)
        tl.to(
          trackRef.current,
          {
            xPercent: -16.666667,
            duration: 30,
            ease: "none",
          },
          100
        );

        // Slide 3: 2 BHK Grand Family Suite (130 -> 160)
        tl.to(
          trackRef.current,
          {
            xPercent: -33.333333,
            duration: 30,
            ease: "none",
          },
          130
        );

        // Slide 4: 3 BHK Presidential Sky Suite (160 -> 190)
        tl.to(
          trackRef.current,
          {
            xPercent: -50,
            duration: 30,
            ease: "none",
          },
          160
        );

        // Slide 5: Horizon Infinity Sky Pool (190 -> 220)
        tl.to(
          trackRef.current,
          {
            xPercent: -66.666667,
            duration: 30,
            ease: "none",
          },
          190
        );

        // Slide 6: HUM Emerald Heights Iconic Landmark (220 -> 250)
        tl.to(
          trackRef.current,
          {
            xPercent: -83.333333,
            duration: 30,
            ease: "none",
          },
          220
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative w-full h-[100svh] overflow-hidden bg-[#FFFFFF] text-slate-900"
    >
      {/* Background Architectural Texture (Repeat, 50% Opacity) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-repeat"
        style={{
          backgroundImage: "url('/Image/bg.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
        aria-hidden="true"
      />

      <div id="heritage" className="absolute top-0 pointer-events-none" />

      {/* Pinned Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center bg-[#FFFFFF]"
      >
        {/* Background Architectural Texture (Repeat, 50% Opacity) */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-50 bg-repeat"
          style={{
            backgroundImage: "url('/Image/bg.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
          aria-hidden="true"
        />

        {/*
          STAGE 1 TITLE:
          Starts small, scales up to full size over 50vh, then fades as center image expands.
        */}
        <div
          ref={titleWrapRef}
          className="absolute top-8 sm:top-12 md:top-14 z-30 text-center max-w-4xl mx-auto px-6 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-8 h-[2px] bg-[#265CA0]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#265CA0] font-bold">
              HUM EMERALD GALLERY 
            </span>
            <span className="w-8 h-[2px] bg-[#265CA0]" />
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight uppercase leading-[1.1]">
            Imagine Living Here.
          </h2>
        </div>

        {/* Left Floating Image Card (Initially visible with Center & Right) */}
        <div
          ref={leftCardRef}
          className="hidden md:block absolute left-[3%] lg:left-[6%] top-1/2 -translate-y-1/2 z-20 w-[220px] lg:w-[260px] h-[320px] lg:h-[390px] rounded-0 overflow-hidden shadow-xl border border-slate-200 bg-white pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src="/Image/emerald.png"
              alt="HUM Emerald Heights Elevation"
              fill
              sizes="260px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#60A5FA] font-bold block mb-0.5">
                KANDIVALI (W)
              </span>
              <span className="text-sm font-bold truncate block">HUM Emerald Heights</span>
            </div>
          </div>
        </div>

        {/* Right Floating Image Card (Initially visible with Center & Left) */}
        <div
          ref={rightCardRef}
          className="hidden md:block absolute right-[3%] lg:right-[6%] top-1/2 -translate-y-1/2 z-20 w-[220px] lg:w-[260px] h-[320px] lg:h-[390px] rounded-0 overflow-hidden shadow-xl border border-slate-200 bg-white pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src="https://cdn.sanity.io/images/3wmbb6cw/production/78b671926f9f490fab0b5a1730fa753696667c2a-2000x732.jpg"
              alt="HUM Emerald Amenities & Podium Deck"
              fill
              sizes="260px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] uppercase tracking-widest text-[#60A5FA] font-bold block mb-0.5">
                LIFESTYLE PODIUM
              </span>
              <span className="text-sm font-bold truncate block">25+ Curated Amenities</span>
            </div>
          </div>
        </div>

        {/*
          CONTINUOUS FULLSCREEN HORIZONTAL SLIDER TRACK:
          w-[600vw] h-full flex with 0 gap between slides.
          Initially center card is framed inside Slide 1.
          When scrolled:
          - Center card expands to 100vw x 100vh.
          - Track shifts horizontally revealing Slides 2 to 6 (at least 6 images total).
        */}
        <div
          ref={trackRef}
          className="absolute inset-0 z-10 flex h-full w-[600vw] will-change-transform pointer-events-auto"
        >
          {/* ================================================================ */}
          {/* SLIDE 1: CENTER CARD THAT EXPANDS TO FULL SCREEN                  */}
          {/* ================================================================ */}
          <div className="relative w-[100vw] h-full shrink-0 flex items-center justify-center overflow-hidden">
            <div
              ref={centerCardRef}
              className="relative w-[88vw] sm:w-[580px] lg:w-[640px] h-[360px] sm:h-[440px] lg:h-[480px] rounded-0 overflow-hidden shadow-2xl border-2 border-white/80 bg-slate-900 transition-none will-change-[width,height,border-radius]"
            >
              <Image
                src="https://cdn.sanity.io/images/3wmbb6cw/production/98cb2c2d4f9a75bfb71f3458d5036e9fc0b98c47-2000x1125.jpg"
                alt="Double-Height Grand Italian Marble Lobby"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

              {/* Initial Center Card Label (Stage 1) */}
              <div
                ref={centerInitialBadgeRef}
                className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 right-5 sm:right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none"
              >
                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#60A5FA] font-bold block mb-1">
                    HUM EMERALD · GRAND ARRIVAL
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold font-heading">
                    Double-Height Grand Italian Marble Lobby
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 max-w-md">
                    24-Ft Clear Ceiling • Acoustic Double-Glazing • 24/7 Concierge
                  </p>
                </div>
              </div>

              {/* Fullscreen Editorial Overlay (Stage 2: Full Viewport Active) */}
              <div
                ref={slide1FullBadgeRef}
                className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto"
              >
                <div className="max-w-xl text-white">
                  <div className="text-xs uppercase tracking-[0.25em] text-white/70 font-semibold mb-1.5">
                    01 / 06 · LANDMARK ARRIVAL
                  </div>
                  <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                    Double-Height Grand Marble Lobby
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 mt-1.5 font-normal">
                    <strong className="font-semibold text-white">24-Ft Clear Ceiling</strong> • Italian Imported Marble • 24/7 White-Glove Concierge Desk
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenBooking?.("HUM Emerald - Grand Lobby")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer shrink-0"
                >
                  <span>Explore Lobby</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SLIDE 2: 1 BHK SMART LUXE RESIDENCE                               */}
          {/* ================================================================ */}
          <div className="relative w-[100vw] h-full shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src="https://cdn.sanity.io/images/3wmbb6cw/production/5305d4bb79173938d201b9cfaa7b0f86a6662a59-900x440.jpg"
              alt="HUM Emerald 1 BHK Smart Luxe Residence"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
              <div className="max-w-xl text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-[#60A5FA] font-semibold mb-1.5">
                  02 / 06 · 1 BHK SMART LUXE
                </div>
                <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  1 BHK Smart Luxe Residence
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-1.5 font-normal">
                  <strong className="font-semibold text-white">Intelligent Space Planning</strong> • Zero Area Wastage • Maximum Daylight & Cross-Ventilation
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking?.("HUM Emerald - 1 BHK Residence")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer shrink-0"
              >
                <span>Explore 1 BHK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SLIDE 3: 2 BHK GRAND FAMILY SUITE                                 */}
          {/* ================================================================ */}
          <div className="relative w-[100vw] h-full shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src="https://cdn.sanity.io/images/3wmbb6cw/production/3e1294592a087152bcccb6ae5861fe9cce85c1c0-900x400.jpg"
              alt="HUM Emerald 2 BHK Grand Family Suite"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
              <div className="max-w-xl text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-[#34D399] font-semibold mb-1.5">
                  03 / 06 · 2 BHK GRAND LIVING
                </div>
                <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  2 BHK Grand Family Suite
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-1.5 font-normal">
                  <strong className="font-semibold text-white">Spacious Master Bedroom</strong> • Premium Vitrified Flooring • French Windows & Elegant Dining Alcove
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking?.("HUM Emerald - 2 BHK Suite")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer shrink-0"
              >
                <span>Explore 2 BHK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SLIDE 4: 3 BHK PRESIDENTIAL SKY RESIDENCE                          */}
          {/* ================================================================ */}
          <div className="relative w-[100vw] h-full shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src="https://cdn.sanity.io/images/3wmbb6cw/production/cffe754409c8cee80dd0bafbc1acebf73a314fbd-1440x517.jpg"
              alt="HUM Emerald 3 BHK Presidential Sky Suite"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
              <div className="max-w-xl text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-[#F59E0B] font-semibold mb-1.5">
                  04 / 06 · 3 BHK SKY RESIDENCE
                </div>
                <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  3 BHK Presidential Sky Suite
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-1.5 font-normal">
                  <strong className="font-semibold text-white">Expansive Living Salon</strong> • Walk-In Wardrobe Space • Unobstructed Panoramic Skyline Views
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking?.("HUM Emerald - 3 BHK Sky Suite")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer shrink-0"
              >
                <span>Explore 3 BHK</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SLIDE 5: ROOFTOP INFINITY HORIZON POOL                            */}
          {/* ================================================================ */}
          <div className="relative w-[100vw] h-full shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src="https://cdn.sanity.io/images/3wmbb6cw/production/639529aff18041a10989bfef301c6b671bfa9236-920x540.png"
              alt="HUM Emerald Rooftop Infinity Pool"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
              <div className="max-w-xl text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-[#38BDF8] font-semibold mb-1.5">
                  05 / 06 · ROOFTOP SKY OASIS
                </div>
                <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  Horizon Infinity Sky Pool
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-1.5 font-normal">
                  <strong className="font-semibold text-white">Rooftop Temperature-Controlled Pool</strong> • Sunken Sun-Decks • Stargazing Sunset Terrace
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking?.("HUM Emerald - Infinity Pool")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer shrink-0"
              >
                <span>Explore Amenities</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================================================================ */}
          {/* SLIDE 6: HUM EMERALD HEIGHTS ICONIC LANDMARK                      */}
          {/* ================================================================ */}
          <div className="relative w-[100vw] h-full shrink-0 flex items-center justify-center overflow-hidden">
            <Image
              src="/Image/emerald.png"
              alt="HUM Emerald Heights Iconic Landmark Kandivali West"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
              <div className="max-w-xl text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-[#60A5FA] font-semibold mb-1.5">
                  06 / 06 · MODERN URBAN ICON
                </div>
                <h3 className="font-heading text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  HUM Emerald Heights
                </h3>
                <p className="text-xs sm:text-sm text-white/75 mt-1.5 font-normal">
                  <strong className="font-semibold text-white">Kandivali (West), Mumbai</strong> • MahaRERA: PM1180002502952 • G+22 Storey Masterpiece with 25+ Lifestyle Amenities
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenBooking?.("HUM Emerald Heights - Landmark Tour")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md transition-all shadow-lg cursor-pointer shrink-0"
              >
                <span>Schedule Visit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageGallery;
export { ImageGallery as Sobha3ImageParallax };

