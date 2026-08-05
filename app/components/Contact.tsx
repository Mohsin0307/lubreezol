'use client';

import { useState, type FormEvent, type ChangeEvent, type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Loader2, Mail, MapPin, Phone, Send, type LucideIcon } from 'lucide-react';

/**
 * Contact details — placeholders below, update with the real business
 * phone/email/address before deploying.
 */
interface ContactDetail {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

const CONTACT_DETAILS: ContactDetail[] = [
  { icon: Phone, label: 'Call Us', value: '+92 300 0000000', href: 'tel:+923000000000' },
  { icon: Mail, label: 'Email Us', value: 'info@lubrezool.com', href: 'mailto:info@lubrezool.com' },
  { icon: MapPin, label: 'Visit Us', value: 'Karachi, Sindh, Pakistan', href: 'https://maps.google.com' },
];

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL_FORM_STATE: ContactFormState = { name: '', email: '', phone: '', message: '' };

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const inputStyles =
  'w-full rounded-md border border-brand-ink/15 bg-white px-4 py-3 text-sm text-brand-ink placeholder:text-brand-subtle focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy';

export default function Contact() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange =
    (field: keyof ContactFormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');

    try {
      // TODO: connect to a real endpoint (e.g. app/api/contact/route.ts)
      // that emails/saves the message. This is a UI-only stub for now.
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus('success');
      setForm(INITIAL_FORM_STATE);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative bg-white py-24 sm:py-32">
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
          Get In Touch
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="max-w-2xl font-display text-4xl leading-[1.1] tracking-tight text-brand-ink sm:text-5xl"
        >
          Let&apos;s talk about
          <span className="text-brand-navy"> your lubrication needs.</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-8">
          {/* Contact details panel */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-between rounded-3xl bg-brand-navy p-8 text-white lg:col-span-2"
          >
            <div>
              <h3 className="font-display text-2xl tracking-tight">Contact Details</h3>
              <p className="mt-3 leading-relaxed text-white/80">
                Reach out for product inquiries, technical support, or bulk orders —
                our team responds within one business day.
              </p>

              <ul className="mt-8 space-y-6">
                {CONTACT_DETAILS.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <li key={detail.label}>
                      <a
                        href={detail.href}
                        className="flex items-start gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                          <Icon className="h-5 w-5 text-brand-gold" aria-hidden />
                        </span>
                        <span>
                          <span className="block text-xs uppercase tracking-[0.15em] text-white/60">
                            {detail.label}
                          </span>
                          <span className="text-sm font-medium text-white">{detail.value}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-brand-ink/10 bg-brand-bg p-8 lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full Name" htmlFor="name">
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="Your name"
                  className={inputStyles}
                />
              </Field>

              <Field label="Phone Number" htmlFor="phone">
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder="03XX-XXXXXXX"
                  className={inputStyles}
                />
              </Field>

              <Field label="Email Address" htmlFor="email" className="sm:col-span-2">
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="you@company.com"
                  className={inputStyles}
                />
              </Field>

              <Field label="Message" htmlFor="message" className="sm:col-span-2">
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Tell us what you're looking for — product type, quantity, application..."
                  className={`${inputStyles} resize-none`}
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-6 py-3.5 font-semibold text-brand-ink shadow-brand-gold transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>

            {status === 'success' && (
              <p role="status" className="mt-4 text-sm font-medium text-emerald-600">
                Thanks — your message has been sent. We&apos;ll get back to you shortly.
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="mt-4 text-sm font-medium text-red-600">
                Something went wrong. Please try again or reach us directly.
              </p>
            )}
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  className = '',
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium text-brand-muted">
        {label}
      </label>
      {children}
    </div>
  );
}