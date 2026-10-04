"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { mainNavItems } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded bg-[#C5A880] flex items-center justify-center text-slate-950 font-black text-sm tracking-tighter group-hover:scale-105 transition-transform">
            V
          </span>
          <span className="font-extrabold text-lg tracking-wider text-white uppercase">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-widest text-slate-400 hover:text-[#C5A880] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="gold" size="sm" className="text-xs uppercase tracking-wider">
            <Link href="#contact">Private Inquiry</Link>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-6 py-6 space-y-4">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm uppercase tracking-wider text-slate-300 hover:text-[#C5A880]"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="gold" className="w-full mt-4 text-xs uppercase tracking-wider">
            <Link href="#contact" onClick={() => setMobileOpen(false)}>
              Private Inquiry
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
