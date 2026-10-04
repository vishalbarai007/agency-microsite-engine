import { faqsData } from "@/data/faqs";

export function FaqAccordion() {
  return (
    <section id="faqs" className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A880] block mb-2">
            Inquiry Guidance
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Frequently Addressed Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqsData.map((faq) => (
            <details
              key={faq.id}
              className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 transition-all duration-200 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none text-base md:text-lg font-bold text-white group-hover:text-[#C5A880] transition-colors">
                <span>{faq.question}</span>
                <span className="ml-4 flex-shrink-0 text-slate-500 group-open:rotate-45 transition-transform duration-200 text-2xl font-light">
                  +
                </span>
              </summary>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-sm text-slate-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
