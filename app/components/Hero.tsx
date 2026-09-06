"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

/**
 * LubreezolHero
 * Drop-in hero section for a Next.js page (works as a Client Component).
 *
 * Usage in app router:
 *   "use client";
 *   import LubreezolHero from "@/components/LubreezolHero";
 *   export default function Page() { return <LubreezolHero />; }
 *
 * Requires Tailwind CSS (default in most Next.js setups) and lucide-react:
 *   npm install lucide-react
 *
 * Fonts: loads "Space Grotesk" (display) + "Inter" (body) from Google Fonts
 * inline for portability. If you already load fonts in your root layout,
 * remove the <style> block below and just reference the font-family classes.
 */

// Free-to-use stock photos (Pexels license — free for commercial & personal
// use, no attribution required). Swap these for your own product/plant
// photography whenever it's ready.
const SLIDES = [
  {
    image:
      "https://images.pexels.com/photos/27358360/pexels-photo-27358360.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heading: "Lubricants. Engineered for industry.",
    body: "Lubreezol formulates high-performance lubricants for automotive, industrial, and marine applications — built to reduce wear and extend the life of the equipment that depends on them.",
    cta: "Explore products",
  },
  {
    image:
      "https://images.pexels.com/photos/28080033/pexels-photo-28080033.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heading: "One partner, every application.",
    body: "From engine oils to industrial greases, our range covers the full spectrum of lubrication needs across manufacturing, transport, and heavy machinery.",
    cta: "See industries",
  },
  {
    image:
      "https://images.pexels.com/photos/11377370/pexels-photo-11377370.jpeg?auto=compress&cs=tinysrgb&w=1920",
    heading: "Formulated. Tested. Trusted.",
    body: "Every product leaves our lab having passed rigorous performance testing, so your machinery runs longer with fewer stops.",
    cta: "Our quality standards",
  },
];

export default function LubreezolHero() {
  const [active, setActive] = useState(0);

  const next = () => setActive((i) => (i + 1) % SLIDES.length);
  const prev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[active];

  return (
    <div className="lz-hero-root -mt-[72px]">
      {/* dangerouslySetInnerHTML avoids a server/client hydration mismatch on the & in the fonts URL */}
      <style
        dangerouslySetInnerHTML={{
          __html: `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .lz-hero-root { font-family: 'Inter', sans-serif; }
        .lz-display { font-family: 'Space Grotesk', sans-serif; }`,
        }}
      />

      <div className="relative w-full overflow-hidden bg-[#0B1B2B]">
        {/* Hero body — the sticky translucent navbar overlays this photo */}
        <div className="relative min-h-[560px] md:min-h-[620px] flex items-center">
          {/* Background photo (swaps per slide) */}
          <div className="absolute inset-0">
            {SLIDES.map((s, i) => (
              <img
                key={i}
                src={s.image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-600 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            {/* Darken + tint the photo so text stays legible and the palette stays on-brand */}
            <div className="absolute inset-0 bg-[#0B1B2B]/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B2B] via-[#0B1B2B]/30 to-transparent" />
            <div className="absolute -right-24 top-1/4 h-[520px] w-[520px] rounded-full bg-[#C79A3C] opacity-20 blur-[120px]" />
          </div>

          {/* Overlay content panel */}
          <div className="relative z-20 w-full px-6 md:px-10">
            <div className="max-w-xl bg-[#123A5E]/90 backdrop-blur-sm px-7 py-8 md:px-10 md:py-10">
              <h1 className="lz-display text-white text-3xl md:text-4xl font-semibold leading-tight mb-4">
                {slide.heading}
              </h1>
              <p className="text-white/85 text-sm md:text-base leading-relaxed mb-6 max-w-md">
                {slide.body}
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-white text-sm font-semibold border-b-2 border-[#C79A3C] pb-1 hover:gap-3 transition-all"
              >
                {slide.cta}
              </a>
            </div>
          </div>

          {/* Vertical side tab */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#123A5E] text-white text-xs font-medium tracking-wide px-2 py-4 hidden md:flex items-center"
            style={{ writingMode: "vertical-rl" }}
          >
            Contact us
          </button>

          {/* Floating help icon */}
          <button className="absolute bottom-6 right-6 z-20 h-11 w-11 rounded-full bg-white text-[#0B1B2B] flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <MessageCircle size={18} />
          </button>

          {/* Carousel controls */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full border border-white/30 text-white/80 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-16 md:right-20 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full border border-white/30 text-white/80 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-[#C79A3C]" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}