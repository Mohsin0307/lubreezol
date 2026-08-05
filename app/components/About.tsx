'use client';

import { motion, type Variants } from 'framer-motion';
import { Compass, Cog, ShieldCheck, Target, type LucideIcon } from 'lucide-react';

interface MissionPoint {
  icon: LucideIcon;
  text: string;
}

const MISSION_POINTS: MissionPoint[] = [
  { icon: ShieldCheck, text: 'Deliver premium-quality lubricants and chemical solutions.' },
  { icon: Cog, text: 'Ensure reliability, efficiency, and superior engine protection.' },
  { icon: Target, text: 'Build long-term customer relationships through trust and service.' },
  { icon: Compass, text: 'Continuously improve our products with modern technology and innovation.' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function About() {
  return (
    <section id="about" className="relative bg-white py-24 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
        className="mx-auto max-w-container px-6"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-navy/20 bg-brand-navy/[0.06] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-navy"
        >
          About Lubrezool
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="max-w-3xl font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl"
        >
          A local brand engineered for
          <span className="text-brand-navy"> global performance standards.</span>
        </motion.h2>

        <motion.div variants={itemVariants} className="mt-8 grid max-w-4xl gap-5 text-base leading-relaxed text-brand-muted sm:text-lg">
          <p>
            Lubrezool Lubricants &amp; Chemicals is a growing lubricant and specialty
            chemicals company dedicated to delivering high-quality lubrication
            solutions for automotive, industrial, and commercial applications. We
            focus on providing reliable products that enhance equipment performance,
            reduce wear, improve efficiency, and extend the life of engines and
            machinery.
          </p>
          <p>
            Our commitment to quality, innovation, and customer satisfaction enables
            us to meet the evolving needs of modern industries. Every Lubrezool
            product is developed to deliver consistent performance under demanding
            operating conditions while offering excellent value to our customers.
          </p>
          <p>
            As a trusted local brand, Lubrezool aims to build long-term partnerships
            through dependable products, technical expertise, and exceptional
            customer service.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-8">
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-3xl bg-brand-navy p-8 text-white lg:col-span-2"
          >
            <div>
              <Compass className="h-7 w-7 text-brand-gold" aria-hidden />
              <h3 className="mt-5 font-display text-2xl tracking-tight">Our Vision</h3>
              <p className="mt-4 leading-relaxed text-white/85">
                To become a leading and trusted lubricant and specialty chemicals
                brand by providing innovative, high-performance products that meet
                international quality standards.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-3">
            {MISSION_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.text}
                  variants={itemVariants}
                  className="rounded-2xl border border-brand-ink/10 bg-brand-bg p-6 transition-colors hover:border-brand-gold/50"
                >
                  <Icon className="h-6 w-6 text-brand-navy" aria-hidden />
                  <p className="mt-4 text-sm leading-relaxed text-brand-ink">{point.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}