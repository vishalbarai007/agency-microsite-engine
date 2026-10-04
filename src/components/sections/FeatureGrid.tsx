import Image from "next/image";
import Link from "next/link";
import { offeringsData } from "@/data/offerings";
import { Check, ArrowUpRight } from "lucide-react";

export function FeatureGrid() {
  return (
    <section id="services" className="py-28 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] block mb-2">
            Signature Offerings
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Crafted for Spatial Permanence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offeringsData.map((item) => (
            <div
              key={item.id}
              className="group bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#C5A880]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[#C5A880] font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-8">
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                    {item.tagline}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C5A880] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {item.features && (
                    <ul className="space-y-2 mb-6">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center text-xs text-slate-300 gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {item.ctaLink && (
                <div className="px-8 pb-8 pt-0">
                  <Link
                    href={item.ctaLink}
                    className="inline-flex items-center text-xs uppercase tracking-wider font-bold text-[#C5A880] hover:text-white transition-colors"
                  >
                    Request Consultation <ArrowUpRight className="ml-1 w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
