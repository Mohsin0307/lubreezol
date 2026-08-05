import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

import { PRODUCTS, getProductBySlug } from '../../lib/products';

interface ProductPageProps {
  params: { slug: string };
}

/**
 * Pre-renders one static page per product at build time
 * (e.g. /products/truck-plus-ci4-sl-15w40) instead of generating on demand.
 */
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | Lubrezool`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white pb-24 pt-32">
      <div className="mx-auto max-w-container px-6">
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-brand-ink/10 bg-brand-bg p-10">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Summary */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand-navy">
              {product.category}
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-brand-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-5 leading-relaxed text-brand-muted">{product.description}</p>

            {product.features && product.features.length > 0 && (
              <ul className="mt-8 space-y-3">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-brand-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/#contact"
              className="mt-10 inline-flex items-center justify-center rounded-md bg-brand-gold px-6 py-3.5 font-semibold text-brand-ink shadow-brand-gold transition-transform duration-200 hover:-translate-y-0.5"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Applications */}
        {product.applications && (
          <section className="mt-16 max-w-3xl">
            <h2 className="font-display text-xl tracking-tight text-brand-ink">Applications</h2>
            <p className="mt-3 leading-relaxed text-brand-muted">{product.applications}</p>
          </section>
        )}

        {/* Specs table */}
        {product.specs && product.specs.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-xl tracking-tight text-brand-ink">
              Parameters &amp; Properties
            </h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-brand-ink/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-ink/10 bg-brand-bg">
                    <th className="px-5 py-3 font-medium text-brand-muted">Parameter</th>
                    <th className="px-5 py-3 font-medium text-brand-muted">Unit</th>
                    <th className="px-5 py-3 font-medium text-brand-muted">Test Method</th>
                    <th className="px-5 py-3 font-medium text-brand-muted">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr
                      key={spec.parameter}
                      className={i % 2 === 1 ? 'bg-brand-bg/50' : undefined}
                    >
                      <td className="px-5 py-3 font-medium text-brand-ink">{spec.parameter}</td>
                      <td className="px-5 py-3 text-brand-muted">{spec.unit}</td>
                      <td className="px-5 py-3 font-mono text-xs text-brand-muted">{spec.method}</td>
                      <td className="px-5 py-3 font-mono text-brand-ink">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}