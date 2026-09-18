'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Droplet, Wrench, Search, ChevronRight, Newspaper, type LucideIcon } from 'lucide-react';

interface QuickLink {
  href: string;
  image: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface NewsItem {
  image: string;
  icon: LucideIcon;
  category: string;
  title: string;
}

const QUICK_LINKS: QuickLink[] = [
  {
    href: '/oil-finder',
    image:
      'https://images.pexels.com/photos/10490609/pexels-photo-10490609.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Droplet,
    title: 'Lubrezool Oil Finder',
    description:
      'Find the right oil for your vehicle! Lubricants for cars, commercial vehicles, motorcycles, and industrial machines.',
  },
  {
    href: '/solutions',
    image:
      'https://images.pexels.com/photos/185545/pexels-photo-185545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Wrench,
    title: 'Industrial & Automotive Solutions',
    description: 'Lubricant and chemical solutions engineered for industrial and automotive applications.',
  },
];

const NEWS_ITEMS: NewsItem[] = [
  {
    image:
      'https://images.pexels.com/photos/10490610/pexels-photo-10490610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Wrench,
    category: 'Product',
    title: 'New engine oil range now available across Pakistan.',
  },
  {
    image:
      'https://images.pexels.com/photos/10490621/pexels-photo-10490621.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Droplet,
    category: 'Service',
    title: 'Lubrezool partners with local workshops for oil-change service.',
  },
  {
    image:
      'https://images.pexels.com/photos/10490623/pexels-photo-10490623.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: Newspaper,
    category: 'News',
    title: 'Lubrezool expands quality testing lab for 2026.',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Highlights() {
  return (
    <section
      className="relative py-20 sm:py-28"
      style={{
        backgroundColor: '#F5F5F5',
        backgroundImage:
          'repeating-linear-gradient(115deg, rgba(11,27,43,0.035) 0px, rgba(11,27,43,0.035) 1px, transparent 1px, transparent 14px)',
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
        className="mx-auto max-w-container px-6"
      >
        {/* Quick links row */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <motion.div key={link.title} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-ink/5 transition-shadow hover:shadow-md"
                >
                  <div className="relative h-40 w-full overflow-hidden border-t-4 border-brand-navy">
                    <img
                      src={link.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-white shadow-md">
                      <Icon className="h-4 w-4" aria-hidden />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-flex items-center gap-1 font-display text-base font-semibold text-brand-navy">
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                      {link.title}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-brand-muted">{link.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Direct product search — dark card */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-2xl bg-[#0A2E63] p-6 text-white shadow-sm"
          >
            <h3 className="font-display text-xl font-semibold">Direct product search</h3>
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-white px-4 py-3">
              <input
                type="text"
                placeholder="Product name"
                className="w-full bg-transparent text-sm text-white placeholder:text-white focus:outline-none"
              />
              <Search className="h-4 w-4 shrink-0 text-white" aria-hidden />
            </div>
          </motion.div>
        </div>

        {/* Latest news */}
        <motion.h2
          variants={itemVariants}
          className="mt-20 font-display text-3xl font-semibold tracking-tight text-[#0A2E63] sm:text-4xl"
        >
          Latest News
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {NEWS_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={itemVariants}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-brand-ink/5 transition-shadow hover:shadow-md"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0A2E63] text-white shadow-md">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                </div>
                <div className="p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug text-brand-ink">
                    {item.title}
                  </h3>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}