"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

import type { HeroSlide } from "../lib/fallbackContent";

/**
 * LubreezolHero — bright full-width slider
 *
 * Image fit (no more over-zoom):
 *  - Desktop height = min(100svh, 56.25vw) → hero never gets taller than a
 *    16:9 frame, so a 16:9 photo is barely cropped on any screen.
 *  - Mobile: photo sits on top in a 16:10 frame, text card below it
 *    (photo is no longer hidden behind the card).
 *  - Each slide has its own `position` (focal point) — tweak it if the
 *    important part of a photo gets cut (e.g. "left center", "70% 50%").
 *
 * Photos: bright landscape 16:9 images in /public — sl1.png, sl2.png, sl3.png
 * (1920x1080 or larger).
 */

const AUTOPLAY_MS = 6000;

// "contain" = poori photo dikhti hai, kuch cut nahi hota (blurred fill side mein)
// "cover"   = poori screen bharti hai, lekin edges cut ho sakte hain
const IMAGE_FIT = "contain";


const INDUSTRIES = [
  "Automotive",
  "Industrial Manufacturing",
  "Construction",
  "Agriculture",
  "Transportation",
  "Marine",
  "Power Generation",
];

export default function LubreezolHero({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  const next = () => setActive((i) => (i + 1) % slides.length);
  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);

  // Autoplay — timer restarts on every slide change (manual or auto)
  useEffect(() => {
    const id = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active]);

  const slide = slides[active];

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-brand-bg pt-16 md:h-[min(100svh,56.25vw)] md:min-h-[640px] md:pt-0"
    >
      {/* Photo frame: 16:9 on mobile, full-bleed on desktop */}
      <div className="relative aspect-video w-full md:absolute md:inset-0 md:aspect-auto">
        {slides.map((s, i) => (
          <div
            key={s.image}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Soft blurred copy fills any empty side space */}
            {IMAGE_FIT === "contain" && (
              <Image
                src={s.image}
                alt=""
                fill
                quality={40}
                sizes="25vw"
                className="scale-110 object-cover blur-2xl"
              />
            )}
            {/* Main photo — "contain" shows the whole picture, nothing cut */}
            <Image
              src={s.image}
              alt=""
              fill
              priority={i === 0}
              quality={85}
              sizes="100vw"
              style={{ objectPosition: s.position }}
              className={IMAGE_FIT === "contain" ? "object-contain" : "object-cover"}
            />
          </div>
        ))}

        {/* Slide controls */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 md:bottom-24 md:right-10 md:gap-3">
          <span className="hidden rounded-full bg-white/90 px-3 py-1.5 font-mono text-xs text-brand-navy shadow-card sm:inline-block">
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-navy shadow-card transition-colors hover:bg-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy md:h-10 md:w-10"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-navy shadow-card transition-colors hover:bg-brand-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy md:h-10 md:w-10"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Text card: overlaps photo on mobile, floats left on desktop */}
      <div className="relative z-10 mx-auto max-w-container px-4 md:flex md:h-full md:items-center md:px-6 md:pb-20 md:pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative -mt-8 max-w-[34rem] overflow-hidden rounded-2xl border border-white/70 bg-white/95 p-6 shadow-[0_24px_60px_-20px_rgba(28,28,28,0.3)] backdrop-blur-md md:mt-0 md:p-9"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-brand-gold" aria-hidden />

            <p className="mb-4 flex items-center gap-3 text-sm font-semibold text-brand-navy">
              <span className="h-px w-8 bg-brand-gold" aria-hidden />
              {slide.eyebrow}
            </p>

            <h1 className="font-display text-3xl leading-[1.1] tracking-tight text-brand-ink [text-wrap:balance] md:text-[2.75rem]">
              {slide.heading}
            </h1>

            <p className="mt-4 text-[15px] leading-relaxed text-brand-muted md:text-base">
              {slide.body}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={slide.href}
                className="group inline-flex items-center gap-2 rounded-md bg-brand-gold px-6 py-3.5 font-semibold text-brand-ink shadow-brand-gold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              >
                {slide.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-md border border-brand-navy/25 px-6 py-3.5 font-semibold text-brand-navy transition-colors duration-200 hover:border-brand-navy hover:bg-brand-navy/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              >
                Contact us
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom strip: progress bars + industries */}
      <div className="relative z-20 mt-6 border-t border-brand-ink/5 bg-white md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:bg-white/95 md:backdrop-blur-md">
        <div className="mx-auto flex max-w-container flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-1.5 w-14 overflow-hidden rounded-full bg-brand-ink/10"
              >
                {i === active && (
                  <motion.span
                    key={active}
                    className="absolute inset-y-0 left-0 bg-brand-navy"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  />
                )}
                {i < active && <span className="absolute inset-0 bg-brand-navy" />}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-brand-muted">
            <span className="font-semibold text-brand-ink">Industries we serve</span>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {INDUSTRIES.map((industry) => (
                <li key={industry} className="whitespace-nowrap">
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* WhatsApp quick contact */}
      <a
        href="https://wa.me/923212550469"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold md:bottom-28 md:right-10"
      >
        <MessageCircle size={20} />
      </a>
    </section>
  );
}