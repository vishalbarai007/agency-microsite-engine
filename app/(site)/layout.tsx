import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { Toaster } from "sonner";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import "../globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage }]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-[#C5A880] selection:text-slate-950">
        <SmoothScrollProvider>
          {children}
          <Toaster position="bottom-right" theme="dark" richColors />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
