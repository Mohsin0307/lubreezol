/**
 * Static fallback content.
 *
 * The site renders this when Sanity is not configured (or returns nothing),
 * and `sanity/seed.ts` uses it to populate the dashboard with the current
 * content, so editors start from the real data instead of a blank studio.
 */

export type ContentIcon = 'droplet' | 'wrench' | 'newspaper' | 'search';

export interface HeroSlide {
  image: string;
  position: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  href: string;
}

export interface QuickLink {
  href: string;
  image: string;
  icon: ContentIcon;
  title: string;
  description: string;
}

export interface NewsItem {
  image: string;
  icon: ContentIcon;
  category: string;
  title: string;
}

export interface SiteSettings {
  logo: string;
  tagline: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: '/sl1.png',
    position: 'center center',
    eyebrow: 'Lubricants & Specialty Chemicals',
    heading: 'Lubricants. Engineered for industry.',
    body: 'Lubreezol formulates high-performance lubricants for automotive, industrial, and marine applications — built to reduce wear and extend the life of the equipment that depends on them.',
    cta: 'Explore products',
    href: '#products',
  },
  {
    image: '/sl2.png',
    position: 'center center',
    eyebrow: 'Complete Range',
    heading: 'One partner, every application.',
    body: 'From engine oils to industrial greases, our range covers the full spectrum of lubrication needs across manufacturing, transport, and heavy machinery.',
    cta: 'View our range',
    href: '#products',
  },
  {
    image: '/l3.png',
    position: 'center center',
    eyebrow: 'Quality You Can Rely On',
    heading: 'Formulated. Tested. Trusted.',
    body: 'Every product is developed for consistent performance under demanding conditions, so your machinery runs longer with fewer stops.',
    cta: 'About Lubreezol',
    href: '#about',
  },
];

export const ABOUT_CARDS: QuickLink[] = [
  {
    href: '/oil-finder',
    image:
      'https://images.pexels.com/photos/10490609/pexels-photo-10490609.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: 'droplet',
    title: 'Lubrezool Oil Finder',
    description:
      'Find the right oil for your vehicle! Lubricants for cars, commercial vehicles, motorcycles, and industrial machines.',
  },
  {
    href: '/solutions',
    image:
      'https://images.pexels.com/photos/185545/pexels-photo-185545.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: 'wrench',
    title: 'Industrial & Automotive Solutions',
    description:
      'Lubricant and chemical solutions engineered for industrial and automotive applications.',
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    image:
      'https://images.pexels.com/photos/10490610/pexels-photo-10490610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: 'wrench',
    category: 'Product',
    title: 'New engine oil range now available across Pakistan.',
  },
  {
    image:
      'https://images.pexels.com/photos/10490621/pexels-photo-10490621.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: 'droplet',
    category: 'Service',
    title: 'Lubrezool partners with local workshops for oil-change service.',
  },
  {
    image:
      'https://images.pexels.com/photos/10490623/pexels-photo-10490623.jpeg?auto=compress&cs=tinysrgb&w=1200',
    icon: 'newspaper',
    category: 'News',
    title: 'Lubrezool expands quality testing lab for 2026.',
  },
];

export const SITE_SETTINGS: SiteSettings = {
  logo: '/logo.png',
  tagline: 'Lubricants.\nTechnology. People.',
};
