'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Gauge } from 'lucide-react';
import Image from 'next/image';

/**
 * Lubrezool — Hero Section (Light Theme)
 *
 * Palette (from logo):
 *   Navy   #2A3391  — structural block, headline accent, outline buttons
 *   Gold   #FBC72E  — flame accent, primary CTA
 *   Ink    #1C1C1C  — headline text (matches wordmark weight)
 *   Bg     #FAFAF8  — warm off-white, not stark white
 *
 * Fonts (add via next/font in app/layout.tsx):
 *   Display : Archivo Black
 *   Body    : Barlow / Inter
 *   Utility : JetBrains Mono (grade stamps, eyebrow label)
 *
 * Logo: place the uploaded logo at /public/logo.png
 */

const industries = [
  'Automotive',
  'Industrial Manufacturing',
  'Construction',
  'Agriculture',
  'Transportation',
  'Marine',
  'Power Generation',
];

const gradeStamps = [
  { code: 'SAE 5W-30', label: 'Engine Oil', position: 'left-0 top-4 sm:top-8' },
  { code: 'ISO VG 68', label: 'Hydraulic Oil', position: 'right-0 top-1/2 -translate-y-1/2' },
  { code: 'GL-5 80W-90', label: 'Gear Oil', position: 'left-4 sm:left-10 bottom-0' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#FAFAF8] text-[#1C1C1C]">
      {/* Navy corner block — echoes the logo's own navy panel */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#2A3391]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#FBC72E]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-32 lg:grid-cols-2 lg:pt-28">
        {/* ---------- Left column: message ---------- */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2A3391]/20 bg-[#2A3391]/[0.06] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#2A3391]"
          >
            Lubricants &amp; Specialty Chemicals
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[Archivo_Black] text-5xl leading-[1.05] tracking-tight text-[#1C1C1C] sm:text-6xl lg:text-7xl"
          >
            Built to survive
            <span className="block text-[#2A3391]">the heat of work.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[#4A4A55]"
          >
            Lubrezool delivers high-performance lubrication solutions for automotive,
            industrial, and commercial machines — engineered to cut wear, improve
            efficiency, and extend the life of every engine we touch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-md bg-[#FBC72E] px-6 py-3.5 font-semibold text-[#1C1C1C] shadow-[0_10px_30px_rgba(251,199,46,0.35)] transition-transform hover:-translate-y-0.5"
            >
              Explore Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-[#2A3391]/30 px-6 py-3.5 font-semibold text-[#2A3391] transition-colors hover:border-[#2A3391] hover:bg-[#2A3391]/[0.05]"
            >
              Talk to Our Team
            </a>
          </motion.div>

          {/* Industries served */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 border-t border-[#1C1C1C]/10 pt-6"
          >
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A8A94]">
              Industries We Serve
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#4A4A55]">
              {industries.map((ind) => (
                <span key={ind} className="whitespace-nowrap">
                  {ind}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Right column: navy block + logo + grade stamps ---------- */}
        <div className="relative flex items-center justify-center py-10">
          {/* Navy panel behind the logo — direct reference to the logo's own L-shaped block */}
          <div className="absolute right-0 top-1/2 h-[420px] w-[85%] max-w-[420px] -translate-y-1/2 rounded-3xl bg-[#2A3391]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            <Image
              src="/logo.jpeg"
              alt="Lubrezool Lubricants & Chemicals"
              width={340}
              height={430}
              priority
              className="drop-shadow-[0_20px_45px_rgba(0,0,0,0.15)]"
            />
          </motion.div>

          {/* Floating viscosity-grade stamps */}
          {gradeStamps.map((g, i) => (
            <motion.div
              key={g.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              className={`absolute z-20 flex items-center gap-2 rounded-md border border-[#1C1C1C]/10 bg-white px-3 py-2 shadow-md ${g.position}`}
            >
              <Gauge className="h-3.5 w-3.5 text-[#2A3391]" />
              <div className="leading-tight">
                <p className="font-mono text-xs font-semibold text-[#1C1C1C]">{g.code}</p>
                <p className="text-[10px] text-[#8A8A94]">{g.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8A8A94] sm:flex"
      >
        Scroll
        <span className="h-8 w-px bg-gradient-to-b from-[#8A8A94] to-transparent" />
      </motion.div>
    </section>
  );
}