"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Facebook
} from "lucide-react";

interface LuxuryNavbarProps {
  onOpenBooking: () => void;
}

/**
 * 5 Primary Navigation Links as specified:
 * Residence, Projects, Amenities, Gallery, Location
 */
const MENU_LINKS = [
  {
    number: "01",
    label: "Residence",
    targetId: "residences",
    tagline: "Intelligent Floor Plans & Suites"
  },
  {
    number: "02",
    label: "Projects",
    targetId: "projects",
    tagline: "Flagship High-Rise Developments"
  },
  {
    number: "03",
    label: "Amenities",
    targetId: "amenities",
    tagline: "Podium & Rooftop Recreation"
  },
  {
    number: "04",
    label: "Gallery",
    targetId: "gallery",
    tagline: "Day & Twilight Visual Tour"
  },
  {
    number: "05",
    label: "Location",
    targetId: "connectivity",
    tagline: "Western Corridor Connectivity"
  }
];

export function LuxuryNavbar({ onOpenBooking }: LuxuryNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Monitor vertical scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    handleScroll(); // Initial check on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle ESC key to close full-page menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when fullscreen menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Smooth scroll handler for anchor links
  const handleNavClick = (targetId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  // Open booking/contact modal and close fullpage menu if active
  const handleContactClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    onOpenBooking();
  };

  return (
    <>
      {/* =========================================================================
          1. MAIN NAVIGATION BAR (3 ITEMS ONLY: MENU | LOGO | CONTACT)
          - Initially 100% transparent with white items on top of cinematic hero
          - On scroll: transitions to pristine white background with no margins
         ========================================================================= */}
      <nav
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-md shadow-slate-900/5 py-3.5 sm:py-4 text-slate-900"
            : "bg-transparent border-b border-transparent py-5 sm:py-7 text-white"
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          {/* ITEM 1 (LEFT-MOST): Minimalist Hamburger Icon + "Menu" Text */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#265CA0] rounded py-1 pr-2 transition-transform duration-200 active:scale-95"
          >
            {/* Elegant two-line hamburger icon (Privy Collection style) */}
            <div className="flex flex-col justify-center gap-1.5 w-6 h-5">
              <span
                className={`block h-[2px] transition-all duration-300 ${
                  isScrolled
                    ? "bg-slate-900 group-hover:bg-[#265CA0]"
                    : "bg-white group-hover:bg-white/80"
                } w-6 group-hover:w-4`}
              />
              <span
                className={`block h-[2px] transition-all duration-300 ${
                  isScrolled
                    ? "bg-slate-900 group-hover:bg-[#265CA0]"
                    : "bg-white group-hover:bg-white/80"
                } w-4 group-hover:w-6`}
              />
            </div>

            {/* "Menu" Text */}
            <span
              className={`text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-200 ${
                isScrolled
                  ? "text-slate-900 group-hover:text-[#265CA0]"
                  : "text-white group-hover:text-white/80"
              }`}
            >
              Menu
            </span>
          </button>

          {/* ITEM 2 (CENTER): HUM Developers Logo (Links to Landing Page) */}
          <Link
            href="/"
            aria-label="HUM Developers - Home"
            className="flex items-center justify-center transition-opacity hover:opacity-90"
          >
            <Image
              src={isScrolled ? "/humLogo.svg" : "/humLogoWhite.png"}
              alt="HUM Developers"
              width={160}
              height={50}
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* ITEM 3 (RIGHT-MOST): "Contact" CTA (Opens Contact/Booking Modal) */}
          <button
            type="button"
            onClick={handleContactClick}
            aria-label="Open Contact & Site Visit Form"
            className={`text-xs sm:text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-200 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#265CA0] rounded group ${
              isScrolled
                ? "text-slate-900 hover:text-[#265CA0]"
                : "text-white hover:text-white/80"
            }`}
          >
            <span>Contact</span>
            {/* Subtle animated underline */}
            <span
              className={`absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                isScrolled ? "bg-[#265CA0]" : "bg-white"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* =========================================================================
          2. FULL-PAGE SLIDE-IN NAVIGATION MENU
          - Slides in from top with smooth fade effect
          - Rich HUM Developer Blue background (#265CA0 -> #163B66) with crisp white text
          - Left: 5 links (Residence, Projects, Amenities, Gallery, Location)
          - Right: Socials + Get in Touch direct contacts
         ========================================================================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="fullscreen-nav-overlay"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] w-screen h-screen overflow-y-auto bg-gradient-to-br from-[#0F172A] to-[#1E4D88] text-white flex flex-col justify-between selection:bg-white selection:text-[#265CA0]"
          >
            {/* Subtle Architectural Watermark Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* TOP BAR INSIDE MENU: Close | White Logo | Contact */}
            <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-5 sm:py-7 flex items-center justify-between border-b border-white/15">
              {/* Close Button on Left */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Navigation Menu"
                className="group flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors py-1 focus:outline-none"
              >
                <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-white" />
                </div>
                <span>Close</span>
              </button>

              {/* Logo in Center */}
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                aria-label="HUM Developers - Home"
                className="flex items-center justify-center"
              >
                <Image
                  src="/humLogoWhite.png"
                  alt="HUM Developers"
                  width={150}
                  height={46}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </Link>

              {/* Contact Trigger on Right */}
              <button
                type="button"
                onClick={handleContactClick}
                className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors py-1 relative group"
              >
                <span>Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            </div>

            {/* MENU BODY: Split 2-Column Luxury Layout */}
            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-14 py-10 sm:py-16 my-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* =============================================================
                    LEFT COLUMN: 5 PRIMARY NAVIGATION LINKS
                   ============================================================= */}
                <div className="lg:col-span-7 xl:col-span-8">
                  <nav aria-label="Fullscreen Links List">
                    <ul className="space-y-4 sm:space-y-6">
                      {MENU_LINKS.map((link, index) => (
                        <motion.li
                          key={link.targetId}
                          initial={{ opacity: 0, x: -35 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.12 + index * 0.07,
                            duration: 0.45,
                            ease: "easeOut"
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleNavClick(link.targetId)}
                            className="group flex items-baseline text-left w-full py-1 focus:outline-none transition-transform duration-300 group-hover:translate-x-3"
                          >
                            {/* Number Indicator (01, 02, etc.) */}
                            <span className="font-mono text-xs sm:text-sm md:text-base font-semibold text-white/45 tracking-widest mr-4 sm:mr-8 group-hover:text-white transition-colors duration-300">
                              {link.number}
                            </span>

                            {/* Link Headline */}
                            <div className="flex flex-col">
                              <span className="font-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white group-hover:text-white/90 transition-colors duration-200">
                                {link.label}
                              </span>
                              <span className="text-[11px] sm:text-xs text-white/60 font-medium tracking-wider uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                                {link.tagline}
                              </span>
                            </div>

                            {/* Arrow Indicator on Hover */}
                            <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 ml-3 text-white/30 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-300 self-center" />
                          </button>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>

                {/* =============================================================
                    RIGHT COLUMN: SOCIALS & GET IN TOUCH
                   ============================================================= */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                  className="lg:col-span-5 xl:col-span-4 lg:border-l lg:border-white/15 lg:pl-12 flex flex-col justify-between space-y-8 sm:space-y-10"
                >
                  {/* Socials Section */}
                  <div>
                    <h3 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/50 font-bold mb-4">
                      Socials
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="https://www.instagram.com/humdevelopers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                          <Instagram className="w-4 h-4 text-white" />
                        </div>
                        <span>Instagram</span>
                      </a>

                      <a
                        href="https://www.linkedin.com/company/hum-developers-pvt-ltd/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                          <Linkedin className="w-4 h-4 text-white" />
                        </div>
                        <span>LinkedIn</span>
                      </a>

                      <a
                        href="https://www.facebook.com/share/14JzTVqibyp/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                          <Facebook className="w-4 h-4 text-white" />
                        </div>
                        <span>Facebook</span>
                      </a>
                    </div>
                  </div>

                  {/* Get In Touch Section */}
                  <div>
                    <h3 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/50 font-bold mb-3">
                      Get In Touch
                    </h3>
                    <p className="font-heading text-lg sm:text-xl font-bold text-white mb-4 leading-snug">
                      Let&apos;s build something landmark together.
                    </p>

                    <div className="space-y-2.5 text-xs text-white/80">
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-3.5 h-3.5 text-white/60 shrink-0" />
                        <a
                          href="tel:+919920061100"
                          className="hover:text-white transition-colors font-bold text-white"
                        >
                          +91 99200 61100
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-3.5 h-3.5 text-white/60 shrink-0" />
                        <a
                          href="mailto:info@humdevelopers.com"
                          className="hover:text-white transition-colors"
                        >
                          info@humdevelopers.com
                        </a>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          Kandivali (W) &amp; Borivali (W), Mumbai, MH
                        </span>
                      </div>
                    </div>

                    {/* Quick Booking CTA Button */}
                    <button
                      type="button"
                      onClick={handleContactClick}
                      className="mt-6 w-full py-3.5 px-6 rounded-full bg-white text-[#265CA0] hover:bg-slate-100 font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-black/20 flex items-center justify-center gap-2 group active:scale-98"
                    >
                      <Calendar className="w-4 h-4 text-[#265CA0]" />
                      <span>Schedule Sample Flat Tour</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* BOTTOM COMPLIANCE STRIP INSIDE MENU */}
            <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>MahaRERA: PM1180002502952 &bull; 100% RERA Certified Deliveries</span>
              </div>
              <div>
                &copy; {new Date().getFullYear()} HUM Developers. All rights reserved.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
