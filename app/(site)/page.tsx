import { Navbar } from "@/components/reusable/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/reusable/Footer";
import { testimonialsData } from "@/data/testimonials";
import Image from "next/image";
import { Star } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Navbar />

      <main className="flex-1">
        <Hero />
        <FeatureGrid />

        {/* Philosophy & Narrative Section */}
        <section id="philosophy" className="py-28 bg-slate-900/40 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] block mb-3">
                Architectural Ethos
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Space Is Not An Empty Void. It Is An Instrument of Stillness.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Every residence we design begins with an archaeological study of light and stone. We do not impose generic glass boxes onto living terrain; rather, our structures emerge organically from the contours of the Earth.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-800">
                <div>
                  <div className="text-3xl font-extrabold text-[#C5A880]">24+</div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Private Sanctuaries Built</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#C5A880]">100%</div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mt-1">Bioclimatic Compliance</div>
                </div>
              </div>
            </div>

            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
                alt="Velox Studio Architectural Villa"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-28 bg-slate-950 border-t border-slate-900">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] block mb-2">
                Client Endorsements
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                Patron Reflections
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonialsData.map((t) => (
                <div key={t.id} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-[#C5A880] mb-4">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-base italic leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-slate-800/60">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-700">
                      <Image src={t.avatarUrl} alt={t.authorName} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{t.authorName}</div>
                      <div className="text-xs text-slate-400">{t.authorRole} &bull; {t.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FaqAccordion />

        {/* Contact & Inquiries Section */}
        <section id="contact" className="py-28 bg-slate-900/30 border-t border-slate-900">
          <div className="max-w-4xl mx-auto px-6 text-center mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] block mb-2">
              Private Commission
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Initiate Your Sanctuary
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Our principal architect reviews every submission personally. Please outline your location, vision, and timeline below.
            </p>
          </div>

          <div className="px-6">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
