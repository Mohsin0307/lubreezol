'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-brand-ink/5 bg-white/95 shadow-card backdrop-blur-sm'
          : 'border-transparent bg-brand-bg/80 backdrop-blur-sm'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-container items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2.5">
          <Image
            src="/logo.jpeg"
            alt="Lubrezool Lubricants & Chemicals"
            width={38}
            height={48}
            priority
            className="h-10 w-auto"
          />
          <span className="font-display text-lg tracking-tight text-brand-ink">LUBREZOOL</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-sm font-medium text-brand-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-brand-gold after:transition-[width] after:duration-300 hover:text-brand-navy hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="group hidden items-center gap-2 rounded-md bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-ink shadow-brand-gold transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex"
        >
          Get a Quote
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy lg:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-brand-ink/10 bg-white lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-3 text-sm font-medium text-brand-ink transition-colors hover:bg-brand-navy/5 hover:text-brand-navy"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-ink"
                >
                  Get a Quote
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}