import Link from "next/link";
import Image from "next/image";
import { heroData } from "@/data/hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 px-6 py-28">
      {/* Background Image Layer with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroData.backgroundMedia.url}
          alt={heroData.headline}
          fill
          priority
          className="object-cover opacity-25 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {heroData.badge && (
          <div className="inline-block mb-6">
            <span className="text-xs uppercase tracking-widest font-semibold px-4 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#C5A880]/10 text-[#C5A880]">
              {heroData.badge}
            </span>
          </div>
        )}

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
          {heroData.headline}
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          {heroData.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="gold" size="lg" className="w-full sm:w-auto h-13 px-8 text-xs uppercase tracking-wider font-bold">
            <Link href={heroData.primaryCta.href}>
              {heroData.primaryCta.label} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>

          {heroData.secondaryCta && (
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-13 px-8 text-xs uppercase tracking-wider border-slate-700 hover:bg-slate-800">
              <Link href={heroData.secondaryCta.href}>
                {heroData.secondaryCta.label}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
