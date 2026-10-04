import { Navbar } from "@/components/reusable/Navbar";
import { Footer } from "@/components/reusable/Footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;

  // Standard legal or tab routes
  const validPages: Record<string, { title: string; content: string }> = {
    privacy: {
      title: "Privacy Policy",
      content: "We respect your digital privacy. Lead submissions made through our website are delivered directly to our internal sales communication channels and Google Sheets. We do not sell, rent, or share personal client contact information with third parties."
    },
    terms: {
      title: "Terms of Architectural Service",
      content: "All architectural renderings, floor plans, and spatial visualizations displayed on this portal represent conceptual designs by Velox Studio. Actual turnkey execution parameters are governed by bilateral client contracts."
    },
    license: {
      title: "Architectural & Engineering Licensure",
      content: "Velox Studio operates in compliance with national and regional architectural council licensure standards. All structural calculations are certified by licensed civil engineers."
    }
  };

  const pageData = validPages[slug];
  if (!pageData) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Navbar />
      <main className="flex-1 py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center text-xs uppercase tracking-wider text-slate-400 hover:text-[#C5A880] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Sanctuary
          </Link>
          <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight">
            {pageData.title}
          </h1>
          <div className="text-slate-300 text-base leading-relaxed p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            {pageData.content}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
