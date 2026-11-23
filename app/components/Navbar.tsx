"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  Download,
  MapPin,
  Menu,
  MessageCircle,
  Search,
  User,
  X,
} from "lucide-react";

/**
 * Navbar — Fuchs-style overlay header, rebuilt for mobile.
 *
 * Desktop (lg+)
 *  - Brand strip + nav row on translucent blue, white logo tab hanging below.
 *  - On scroll the brand strip collapses and the bar turns solid with a
 *    shadow, so the header stays slim while reading.
 *  - Gold underline on link hover, gold "Contact us" button.
 *
 * Mobile / tablet (< lg)
 *  - One compact bar: brand lockup, search, menu button, white logo tab.
 *  - Menu opens a right-side drawer: big tap-friendly links, quick actions
 *    (catalogue / account / dealers) and WhatsApp + contact buttons.
 *  - Closes on link tap, backdrop tap, Escape. Page scroll is locked while open.
 *
 * Usage:
 *   <Navbar logoSrc="/logo.png" tagline="Lubricants.\nTechnology. People." />
 * Requires Tailwind CSS, framer-motion, lucide-react.
 */

const WHATSAPP_URL = "https://wa.me/923212550469";

const LINKS = [
  { label: "Company", href: "#" },
  { label: "Products", href: "#products" },
  { label: "Industries", href: "#" },
  { label: "Brands", href: "#" },
  { label: "Career", href: "#" },
];

const ACTIONS = [
  { label: "Download catalogue", short: "Catalogue", href: "#", Icon: Download },
  { label: "My account", short: "Account", href: "#", Icon: User },
  { label: "Find a dealer", short: "Dealers", href: "#", Icon: MapPin },
];

export default function Navbar({
  logoSrc,
  tagline = "Lubricants.\nTechnology. People.",
}: {
  logoSrc: string;
  tagline?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const [tagTop, ...tagRest] = tagline.split("\n");
  const close = () => setOpen(false);

  // Compact header after a little scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer: lock page scroll, Escape to close, focus the close button
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the drawer if the screen grows to desktop size
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const focusRing =
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="flex w-full items-start">
        {/* ── Blue bar ───────────────────────────────────────────── */}
        <div
          className={`relative min-w-0 flex-1 transition-[background-color,box-shadow] duration-300 ${
            scrolled
              ? "bg-[#0F4E91] shadow-[0_6px_20px_-8px_rgba(0,0,0,0.45)] backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          {/* Row 1 — brand strip (desktop only, collapses on scroll) */}
          <div
            className={`hidden grid-cols-1 transition-[grid-template-rows] duration-300 lg:grid ${
              scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="bg-[#0F4E91]/90 px-10 py-1.5">
                <a href="/" className={`text-[15px] tracking-tight text-white ${focusRing}`}>
                  <span className="font-extrabold">LUBREEZOL</span>{" "}
                  <span className="font-light text-white/85">LUBRICANTS PAKISTAN LTD.</span>
                </a>
              </div>
            </div>
          </div>

          {/* Row 2 — brand (mobile) / links (desktop) + icons */}
          <div
            className={`px-4 py-2.5 transition-colors duration-300 md:px-10 ${
              scrolled ? "bg-transparent" : "bg-[#0F4E91]/85 backdrop-blur-[2px]"
            }`}
          >
            <div className="flex min-h-[40px] items-center justify-between gap-4">
              {/* Mobile brand lockup */}
              <a href="/" className={`leading-none lg:hidden ${focusRing}`}>
                <span className="block text-[17px] font-extrabold tracking-tight text-white">
                  LUBREEZOL
                </span>
                <span className="mt-1 block text-[9.5px] font-light tracking-[0.14em] text-white/80">
                  LUBRICANTS PAKISTAN LTD.
                </span>
              </a>

              {/* Desktop links */}
              <nav
                aria-label="Primary"
                className="hidden items-center text-[15px] font-semibold text-white lg:flex"
              >
                {LINKS.map((link, i) => (
                  <span key={link.label} className="flex items-center">
                    {i > 0 && <span className="mx-4 font-normal text-white/35">|</span>}
                    <a
                      href={link.href}
                      className={`group relative whitespace-nowrap py-1 ${focusRing}`}
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-brand-gold transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </a>
                  </span>
                ))}
              </nav>

              {/* Right side */}
              <div className="ml-auto flex items-center gap-1.5 text-white md:gap-2">
                {ACTIONS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    title={label}
                    className={`hidden h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15 md:inline-flex ${focusRing}`}
                  >
                    <Icon size={17} />
                  </a>
                ))}
                <span className="mx-1 hidden text-[13px] font-medium text-white/90 md:inline">
                  EN
                </span>
                <button
                  type="button"
                  aria-label="Search"
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/15 ${focusRing}`}
                >
                  <Search size={18} />
                </button>

                <a
                  href="#contact"
                  className={`ml-2 hidden rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-ink transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex ${focusRing}`}
                >
                  Contact us
                </a>

                {/* Mobile menu button */}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={open}
                  aria-haspopup="dialog"
                  className={`ml-1 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/10 transition-colors hover:bg-white/20 lg:hidden ${focusRing}`}
                >
                  <Menu size={21} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── White logo tab — hangs below the bar ─────────────────── */}
        <div className="relative w-[96px] shrink-0 rounded-b-md bg-white px-3 pb-5 pt-2.5 shadow-[0_10px_24px_-10px_rgba(0,0,0,0.35)] sm:w-[130px] md:w-[210px] md:px-5 md:pb-8">
          <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-b-md bg-brand-gold" aria-hidden />
          <div className="flex items-center justify-center gap-3">
            <div className="hidden text-left text-[9px] font-medium leading-[1.35] tracking-wide text-neutral-500 md:block">
              {tagTop}
              <br />
              {tagRest.join(" ")}
            </div>
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Lubreezol logo"
                className="h-9 w-auto object-contain md:h-11"
              />
            ) : (
              <span className="text-2xl font-extrabold leading-none text-[#0F4E91]">LZ</span>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-black/55 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              onClick={close}
              aria-hidden
            />

            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-[70] flex w-[88%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Drawer header */}
              <div className="relative flex items-start justify-between bg-[#0F4E91] px-5 pb-5 pt-5">
                <div className="leading-none">
                  <span className="block text-xl font-extrabold tracking-tight text-white">
                    LUBREEZOL
                  </span>
                  <span className="mt-1.5 block text-[10px] font-light tracking-[0.14em] text-white/80">
                    LUBRICANTS PAKISTAN LTD.
                  </span>
                  <span className="mt-3 block text-xs text-white/70">
                    {tagline.replace("\n", " ")}
                  </span>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 ${focusRing}`}
                >
                  <X size={21} />
                </button>
                <span className="absolute inset-x-0 bottom-0 h-1 bg-brand-gold" aria-hidden />
              </div>

              {/* Links + quick actions */}
              <div className="flex-1 overflow-y-auto px-5 pb-4 pt-2">
                <nav aria-label="Mobile">
                  <ul>
                    {LINKS.map((link, i) => (
                      <motion.li
                        key={link.label}
                        initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.05, duration: 0.3 }}
                      >
                        <a
                          href={link.href}
                          onClick={close}
                          className="group flex items-center justify-between border-b border-neutral-200 py-4 text-lg font-semibold text-neutral-900 transition-colors active:text-[#0F4E91]"
                        >
                          <span className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="h-5 w-1 origin-center scale-y-0 rounded-full bg-brand-gold transition-transform duration-200 group-hover:scale-y-100 group-active:scale-y-100"
                            />
                            {link.label}
                          </span>
                          <ChevronRight
                            size={18}
                            className="text-neutral-400 transition-transform duration-200 group-hover:translate-x-1"
                          />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <motion.div
                  className="mt-6 grid grid-cols-3 gap-3"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + LINKS.length * 0.05, duration: 0.3 }}
                >
                  {ACTIONS.map(({ label, short, href, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      onClick={close}
                      aria-label={label}
                      className="flex flex-col items-center gap-2 rounded-xl bg-[#0F4E91]/[0.06] px-2 py-4 text-xs font-semibold text-[#0F4E91] transition-colors active:bg-[#0F4E91]/15"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                        <Icon size={18} />
                      </span>
                      {short}
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Drawer footer — main actions */}
              <div className="space-y-3 border-t border-neutral-200 bg-neutral-50 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-5 py-3.5 font-semibold text-brand-ink shadow-brand-gold transition-transform active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
                <a
                  href="#contact"
                  onClick={close}
                  className="flex w-full items-center justify-center rounded-md border border-[#0F4E91]/30 px-5 py-3.5 font-semibold text-[#0F4E91] transition-colors active:bg-[#0F4E91]/5"
                >
                  Contact us
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}