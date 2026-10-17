"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Award, ShieldCheck, Clock, Users, ArrowUpRight } from "lucide-react";

interface AboutProps {
  onOpenBooking?: (projectName?: string) => void;
  onOpenBrochure?: (projectName?: string) => void;
}

export function About({
  onOpenBooking,
  onOpenBrochure
}: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pure fade-in reveal effect with STRICTLY NO slide-in from left
      if (imageRef.current && textRef.current) {
        gsap.fromTo(
          [imageRef.current, textRef.current],
          {
            opacity: 0,
            y: 24, // Subtle vertical breath only, zero horizontal (no x, no slide from left)
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="our-story"
        className="w-full bg-white text-slate-900 overflow-hidden min-h-[500px] md:h-[60vh] flex flex-col md:flex-row items-stretch relative p-6 sm:p-8 md:p-10"
      >
        {/* Left Side: Clean Editorial Text */}
        <div
          ref={textRef}
          className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-8 md:px-10 lg:px-14 py-8 md:py-0 bg-white order-1"
        >
          <div className="max-w-xl">
            {/* Category / Eyebrow */}
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-8 h-[2px] bg-[#265CA0]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#265CA0] font-bold select-none">
                About Hum Emerald
              </span>
            </div>

            {/* Headline matching screenshot */}
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-normal text-slate-900 tracking-tight leading-[1.08] mb-6">
              Modern Homes.<br />
              <span className="italic font-light">Elevated</span><br />
              Lifestyle.
            </h2>

            {/* Body Paragraphs matching screenshot with bold highlights */}
            <div className="space-y-4 text-sm sm:text-base text-slate-600 font-normal leading-relaxed mb-8 max-w-xl font-sans">
              <p>
                Discover thoughtfully designed <strong className="font-bold text-slate-900">2 & 3 BHK residences</strong> in a <strong className="font-bold text-slate-900">G+21 storey tower</strong>, created for modern families who value comfort, convenience, and a well-rounded lifestyle.
              </p>
              <p>
                With spacious homes, thoughtfully planned amenities, and excellent connectivity to key destinations across <strong className="font-bold text-slate-900">Borivali West</strong>, experience a home where everyday living feels more comfortable, connected, and fulfilling.
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183C68] hover:bg-[#265CA0] border border-[#183C68] hover:border-[#265CA0] text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-[#183C68]/20 hover:shadow-xl hover:shadow-[#265CA0]/30 transition-all duration-300 cursor-pointer group shrink-0"
              >
                <span>Explore More</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div
          ref={imageRef}
          className="w-full md:w-1/2 h-[340px] sm:h-[400px] md:h-full relative overflow-hidden rounded-none shrink-0 order-2"
        >
          <Image
            src="/Image/emerald.png"
            alt="HUM Developers — Elevating the Everyday"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center rounded-none select-none transition-transform duration-700 hover:scale-105"
          />
        </div>
      </section>

      {/* Interactive Story & Heritage Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-10 rounded-none max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-500 hover:text-slate-900 transition-colors rounded-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-[2px] bg-[#265CA0]" />
                <span className="text-xs font-bold tracking-[0.25em] text-[#265CA0] uppercase">
                  THE HUM DEVELOPERS LEGACY
                </span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl text-slate-900 font-black uppercase tracking-tight mt-1">
                Building Dreams, Shaping Futures
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Founded on the foundational values of integrity, craftsmanship, and customer trust,
                HUM Developers has grown to become one of the most respected boutique developers
                across Mumbai&apos;s prime Western Suburbs.
              </p>
              <p>
                Over the past 20+ years, our team has delivered architectural landmarks that reflect
                modern urban living without compromising on space, structural security, or vastu
                principles.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 gap-4 my-8 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#265CA0] shrink-0 mt-0.5" />
                <div>
                  <div className="text-lg font-bold text-slate-900">20+ Years</div>
                  <div className="text-xs text-slate-500">Unblemished Legacy</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#265CA0] shrink-0 mt-0.5" />
                <div>
                  <div className="text-lg font-bold text-slate-900">1,200+</div>
                  <div className="text-xs text-slate-500">Delighted Families</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#265CA0] shrink-0 mt-0.5" />
                <div>
                  <div className="text-lg font-bold text-slate-900">100%</div>
                  <div className="text-xs text-slate-500">MahaRERA Compliant</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#265CA0] shrink-0 mt-0.5" />
                <div>
                  <div className="text-lg font-bold text-slate-900">Zero</div>
                  <div className="text-xs text-slate-500">Litigation Record</div>
                </div>
              </div>
            </div>

            {/* Modal CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  onOpenBooking?.("HUM Heritage Consultation");
                }}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#265CA0] hover:bg-[#183C68] text-white text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors rounded-none"
              >
                <span>Schedule Consultation</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  onOpenBrochure?.("HUM Heritage Brochure");
                }}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors rounded-none"
              >
                <span>Download Brochure</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
