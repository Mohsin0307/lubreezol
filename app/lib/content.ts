import { client } from '../../sanity/lib/client';
import { urlForImage } from '../../sanity/lib/image';
import { isSanityConfigured, projectId } from '../../sanity/env';
import {
  ABOUT_CARDS_QUERY,
  HERO_SLIDES_QUERY,
  NEWS_ITEMS_QUERY,
  PRODUCTS_QUERY,
  SITE_SETTINGS_QUERY,
} from '../../sanity/lib/queries';
import {
  ABOUT_CARDS,
  HERO_SLIDES,
  NEWS_ITEMS,
  SITE_SETTINGS,
  type ContentIcon,
  type HeroSlide,
  type NewsItem,
  type QuickLink,
  type SiteSettings,
} from './fallbackContent';
import { PRODUCTS, type Product } from './products';

/** Seconds before a published Studio edit shows up on the site. */
export const REVALIDATE_SECONDS = 60;

const ICON_KEYS: ContentIcon[] = ['droplet', 'wrench', 'newspaper', 'search'];

function asIcon(value: unknown, fallback: ContentIcon): ContentIcon {
  return ICON_KEYS.includes(value as ContentIcon) ? (value as ContentIcon) : fallback;
}

function imageUrl(image: unknown, width: number): string | undefined {
  if (!image) return undefined;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return urlForImage(image as any)
      .width(width)
      .fit('max')
      .auto('format')
      .url();
  } catch {
    return undefined;
  }
}

async function query<T>(groq: string): Promise<T | null> {
  if (!isSanityConfigured || !projectId) return null;

  try {
    return await client.fetch<T>(groq, {}, {
      next: { revalidate: REVALIDATE_SECONDS },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);
  } catch (error) {
    console.warn('[sanity] request failed, using static content:', (error as Error).message);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(doc: any): Product {
  return {
    slug: doc.slug ?? '',
    image: imageUrl(doc.image, 1200) ?? '/logo.png',
    name: doc.name ?? 'Untitled product',
    category: doc.category ?? 'Lubricant',
    description: doc.description ?? '',
    applications: doc.applications || undefined,
    features: doc.features?.length ? doc.features : undefined,
    specs: doc.specs?.length
      ? doc.specs.map((spec: Record<string, string>) => ({
          parameter: spec.parameter ?? '',
          unit: spec.unit ?? '',
          method: spec.method ?? '',
          value: spec.value ?? '',
        }))
      : undefined,
    pdf: doc.pdfUrl || undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  const docs = await query<unknown[]>(PRODUCTS_QUERY);
  if (!Array.isArray(docs) || docs.length === 0) return PRODUCTS;
  return docs.map(mapProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const docs = await query<unknown[]>(HERO_SLIDES_QUERY);
  if (!Array.isArray(docs) || docs.length === 0) return HERO_SLIDES;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return docs.map((doc: any) => ({
    image: imageUrl(doc.image, 1920) ?? '/sl1.png',
    position: doc.position || 'center center',
    eyebrow: doc.eyebrow ?? '',
    heading: doc.heading ?? '',
    body: doc.body ?? '',
    cta: doc.cta ?? 'Explore',
    href: doc.href || '#products',
  }));
}

export async function getAboutContent(): Promise<{ quickLinks: QuickLink[]; newsItems: NewsItem[] }> {
  const [cardDocs, newsDocs] = await Promise.all([
    query<unknown[]>(ABOUT_CARDS_QUERY),
    query<unknown[]>(NEWS_ITEMS_QUERY),
  ]);

  const quickLinks =
    Array.isArray(cardDocs) && cardDocs.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cardDocs.map((doc: any) => ({
          href: doc.href || '/',
          image: imageUrl(doc.image, 1200) ?? '/l1.png',
          icon: asIcon(doc.icon, 'droplet'),
          title: doc.title ?? '',
          description: doc.description ?? '',
        }))
      : ABOUT_CARDS;

  const newsItems =
    Array.isArray(newsDocs) && newsDocs.length > 0
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newsDocs.map((doc: any) => ({
          image: imageUrl(doc.image, 1200) ?? '/l1.png',
          icon: asIcon(doc.icon, 'newspaper'),
          category: doc.category ?? '',
          title: doc.title ?? '',
        }))
      : NEWS_ITEMS;

  return { quickLinks, newsItems };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const doc = await query<{ tagline?: string; logo?: unknown }>(SITE_SETTINGS_QUERY);
  if (!doc) return SITE_SETTINGS;

  return {
    logo: imageUrl(doc.logo, 256) ?? SITE_SETTINGS.logo,
    tagline: doc.tagline || SITE_SETTINGS.tagline,
  };
}
