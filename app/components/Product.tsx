'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PRODUCTS } from '../lib/products';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Products() {
  return (
    <section id="products" className="relative bg-brand-bg py-24 sm:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={containerVariants}
        className="mx-auto max-w-container px-6"
      >
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <motion.p
              variants={itemVariants}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-navy/20 bg-brand-navy/[0.06] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-brand-navy"
            >
              Our Products
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-brand-ink sm:text-5xl"
            >
              A complete range,
              <span className="text-brand-navy"> built for every application.</span>
            </motion.h2>
          </div>

          <motion.a
            variants={itemVariants}
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-md border border-brand-navy/25 px-6 py-3.5 font-semibold text-brand-navy transition-colors duration-200 hover:border-brand-navy hover:bg-brand-navy/5"
          >
            Request a Catalogue
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Product grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <motion.div key={product.slug} variants={itemVariants}>
              <Link
                href={`/products/${product.slug}`}
                className="group block overflow-hidden rounded-2xl border border-brand-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/50 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-white p-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Info */}
                <div className="border-t border-brand-ink/10 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-subtle">
                    {product.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-base leading-snug tracking-tight text-brand-ink">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-brand-muted">
                    {product.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}