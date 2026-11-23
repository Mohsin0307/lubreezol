'use client';

import { Factory, Car, Ship, Cog, type LucideIcon } from 'lucide-react';

/**
 * Place this file at: app/solutions/page.tsx
 * Linked from the "Industrial & Automotive Solutions" card in Highlights.tsx.
 */

interface Solution {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SOLUTIONS: Solution[] = [
  {
    icon: Car,
    title: 'Automotive',
    description: 'Engine oils, transmission fluids, and greases for passenger and commercial vehicles.',
  },
  {
    icon: Factory,
    title: 'Industrial',
    description: 'Hydraulic fluids, gear oils, and compressor lubricants for manufacturing and plant machinery.',
  },
  {
    icon: Cog,
    title: 'Heavy Machinery',
    description: 'High-load lubricants formulated for construction, mining, and agricultural equipment.',
  },
  {
    icon: Ship,
    title: 'Marine',
    description: 'Marine-grade lubricants engineered for demanding, continuous-duty operating conditions.',
  },
];

export default function SolutionsPage() {
  return (
    <main>
      <section className="bg-brand-navy py-20 text-white">
        <div className="mx-auto max-w-container px-6">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">
            Industrial &amp; Automotive Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Lubrezool lubricant and chemical solutions engineered for the applications that keep
            your operations running — from daily-driver vehicles to heavy industrial equipment.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-container px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((solution) => {
              const Icon = solution.icon;
              return (
                <div
                  key={solution.title}
                  className="rounded-2xl border border-brand-ink/10 bg-brand-bg p-6 transition-colors hover:border-brand-gold/50"
                >
                  <Icon className="h-6 w-6 text-brand-navy" aria-hidden />
                  <h3 className="mt-4 font-display text-lg font-semibold text-brand-ink">
                    {solution.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{solution.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}