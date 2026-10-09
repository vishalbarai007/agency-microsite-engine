"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Menu, X, ShieldCheck } from "lucide-react";

interface LuxuryNavbarProps {
  onOpenBooking: () => void;
}

export function LuxuryNavbar({ onOpenBooking }: LuxuryNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Luxury Ticker */}
      <div className="bg-[#0A0A0C] border-b border-[#9B802E]/20 text-[#A0A0A0] text-[11px] py-2 px-6 hidden md:block tracking-wider">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#C5A880]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              MahaRERA: P51900030114 | Official Developer Showcase
            </span>
            <span>South Mumbai &bull; London &bull; Pune &bull; Bangalore</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:+912267161111"
              className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C5A880]" />
              Concierge: +91 (22) 6716 1111
            </a>
            <span className="text-[#C5A880]/60">|</span>
            <span className="text-white">EN / INR (₹)</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-[#0F0F11]/95 backdrop-blur-md border-b border-[#9B802E]/25 py-3.5 shadow-2xl"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/real-estate" className="flex flex-col group">
            <span className="font-serif text-2xl md:text-3xl tracking-[0.18em] font-medium text-white group-hover:text-[#C5A880] transition-colors">
              LODHA
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880] -mt-0.5">
              Luxury Residences
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[12px] uppercase tracking-[0.2em] text-[#D9D9D9]">
            <a href="#overview" className="hover:text-[#C5A880] transition-colors">
              Overview
            </a>
            <a href="#typologies" className="hover:text-[#C5A880] transition-colors">
              Residences
            </a>
            <a href="#amenities" className="hover:text-[#C5A880] transition-colors">
              Lifestyle
            </a>
            <a href="#floorplans" className="hover:text-[#C5A880] transition-colors">
              Floor Plans
            </a>
            <a href="#connectivity" className="hover:text-[#C5A880] transition-colors">
              Neighbourhood
            </a>
            <a href="#rera" className="hover:text-[#C5A880] transition-colors">
              RERA
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="goldenBorderBtn text-xs py-2.5 px-5"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Private Viewing
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:text-[#C5A880]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Flyout */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F0F11] border-b border-[#9B802E]/30 px-6 py-6 text-sm flex flex-col gap-4">
            <a
              href="#overview"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 uppercase tracking-widest text-xs py-2 border-b border-white/5"
            >
              Overview
            </a>
            <a
              href="#typologies"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 uppercase tracking-widest text-xs py-2 border-b border-white/5"
            >
              Residences & Typologies
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 uppercase tracking-widest text-xs py-2 border-b border-white/5"
            >
              Lifestyle Amenities
            </a>
            <a
              href="#floorplans"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 uppercase tracking-widest text-xs py-2 border-b border-white/5"
            >
              Floor Plans
            </a>
            <a
              href="#connectivity"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 uppercase tracking-widest text-xs py-2 border-b border-white/5"
            >
              Neighbourhood
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="goldenFilledBtn w-full mt-2 text-center"
            >
              Book Private Viewing
            </button>
          </div>
        )}
      </header>
    </>
  );
}
