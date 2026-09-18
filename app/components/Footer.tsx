import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Oil Finder', href: '/oil-finder' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="lz-footer-bg relative overflow-hidden text-white">
      <style>{`
        .lz-footer-bg {
          background:
            radial-gradient(circle at 8px 8px, rgba(255,255,255,0.08) 1px, transparent 1.5px) 0 0/28px 28px,
            linear-gradient(115deg, #0A2E63 0%, #0E4A9E 55%, #1360C4 100%);
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-container px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Lubreezol Lubricants & Chemicals"
                width={36}
                height={46}
                className="h-10 w-auto"
              />
              <span className="font-display text-lg tracking-tight text-white">
                LUBREEZOL
              </span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">
              A Subsidiary of Karim Group of Companies
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              High-performance lubrication solutions for automotive, industrial,
              and commercial applications — engineered for reliability, efficiency,
              and long-term equipment protection.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.15em] text-white/90">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-[0.15em] text-white/90">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="tel:+923212550469"
                  className="flex items-start gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/80" aria-hidden />
                  0321-2550469
                </a>
              </li>
              <li>
                <a
                  href="mailto:Lubreezollubricants@gmail.com"
                  className="flex items-start gap-2.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/80" aria-hidden />
                  Lubreezollubricants@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm leading-relaxed text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/80" aria-hidden />
                Office No. 425-426, SP Chamber, Plot No. 89/C9, Estate Avenue, SITE, Karachi
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-8 sm:flex-row">
          <p className="text-xs text-white/60">
            © {year} Lubreezol Lubricants &amp; Chemicals. All rights reserved.
          </p>
          <p className="text-xs text-white/60">
            A Subsidiary of Karim Group of Companies
          </p>
        </div>
      </div>
    </footer>
  );
}