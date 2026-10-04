import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { mainNavItems, footerNavItems } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-slate-900">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <span className="font-extrabold text-lg tracking-wider text-white uppercase block mb-3">
              {siteConfig.name}
            </span>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>
            <p className="text-xs text-slate-500">
              {siteConfig.contact.address} &bull; {siteConfig.contact.phone}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {mainNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#C5A880] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Coordinates */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-300 tracking-wider mb-4">
              Direct Contact
            </h4>
            <p className="text-sm text-slate-400 mb-2">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-sky-400">
                {siteConfig.contact.email}
              </a>
            </p>
            <div className="flex gap-4 mt-4 text-xs text-slate-500">
              <a href={siteConfig.contact.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-slate-300">
                Instagram
              </a>
              <a href={siteConfig.contact.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-300">
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 gap-4">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {footerNavItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-slate-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
