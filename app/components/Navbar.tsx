"use client";

import { useState } from "react";
import { Download, User, MapPin, Search, Menu, X } from "lucide-react";

/**
 * Navbar
 * Overlay header in the Fuchs.com style, matched to the reference screenshot:
 *
 *  - Row 1: thin, semi-transparent full-width brand strip
 *      "LUBREEZOL LUBRICANTS PAKISTAN LTD." (bold + light suffix), top-left
 *  - Row 2: main nav row (same translucent blue) with pipe-separated links,
 *      right-aligned icon set (download / user / map-pin / EN / search)
 *  - Right: white logo panel level with row 2 that hangs BELOW the bar,
 *      with a two-line grey tagline and the logo image — it overlays
 *      whatever sits underneath, exactly like the reference.
 *
 * Usage:
 *   <Navbar logoSrc="/logo.png" tagline="Lubricants. Technology. People." />
 * Requires Tailwind CSS + lucide-react.
 */

const LINKS = [
  { label: "Company", href: "#" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#" },
  { label: "Brands", href: "#" },
  { label: "Career", href: "#" },
];

export default function Navbar({
  logoSrc,
  tagline = "Lubricants.\nTechnology. People.",
}: {
  logoSrc: string;
  tagline?: string;
}) {
  const [open, setOpen] = useState(false);

  // Split the tagline into the two stacked lines used on the white panel.
  const [tagTop, ...tagRest] = tagline.split("\n");

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="flex w-full items-start">
        {/* ── Translucent blue bar ─────────────────────────────── */}
        <div className="relative flex-1 min-w-0">
          {/* Row 1 — brand strip */}
          <div className="bg-[#0F4E91]/90 px-4 md:px-10 py-1.5">
            <a
              href="/"
              className="text-[13px] md:text-[15px] tracking-tight text-white"
            >
              <span className="font-extrabold">LUBREEZOL</span>{" "}
              <span className="font-light text-white/85">
                LUBRICANTS PAKISTAN LTD.
              </span>
            </a>
          </div>

          {/* Row 2 — nav links + icon set */}
          <div className="bg-[#0F4E91]/80 backdrop-blur-[2px] px-4 md:px-10 py-2.5">
            <div className="flex items-center justify-between gap-4">
              {/* Links with pipe separators */}
              <nav
                aria-label="Primary"
                className="hidden lg:flex items-center text-white text-[15px] font-semibold"
              >
                {LINKS.map((link, i) => (
                  <span key={link.label} className="flex items-center">
                    {i > 0 && <span className="mx-4 text-white/35 font-normal">|</span>}
                    <a
                      href={link.href}
                      className="hover:text-white/75 transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  </span>
                ))}
              </nav>

              {/* Icons — right aligned, same as reference */}
              <div className="flex items-center gap-4 md:gap-5 text-white ml-auto">
                <Download size={17} className="hidden sm:block cursor-pointer hover:text-white/70 transition-colors" />
                <User size={17} className="hidden sm:block cursor-pointer hover:text-white/70 transition-colors" />
                <MapPin size={17} className="hidden sm:block cursor-pointer hover:text-white/70 transition-colors" />
                <span className="hidden sm:inline text-[13px] font-medium text-white/90">EN</span>
                <Search size={17} className="cursor-pointer hover:text-white/70 transition-colors" />

                {/* Mobile toggle */}
                <button
                  className="lg:hidden ml-1"
                  onClick={() => setOpen((v) => !v)}
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                >
                  {open ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── White logo panel — level with row 2, hangs below the bar ── */}
        <div className="relative shrink-0 bg-white px-3 md:px-5 pt-2.5 pb-6 md:pb-8 w-[150px] md:w-[210px]">
          <div className="flex items-center justify-center gap-2 md:gap-3">
            <div className="hidden md:block text-[9px] leading-[1.35] text-neutral-500 font-medium tracking-wide text-left">
              {tagTop}
              <br />
              {tagRest.join(" ")}
            </div>
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Lubreezol logo"
                className="h-9 md:h-11 w-auto object-contain"
              />
            ) : (
              <span className="text-[#0F4E91] font-extrabold text-2xl leading-none">LZ</span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0F4E91] px-6 py-4 border-t border-white/10">
          <div className="flex flex-col gap-4 text-sm text-white/90">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}