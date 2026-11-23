/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Seeds the Sanity dataset with the content that currently lives in the code.
 *
 * Run it once after creating the project:
 *   npm run seed
 * (uses `sanity exec --with-user-token`, so run `npx sanity login` first.)
 *
 * Every document gets a stable _id, so re-running replaces instead of duplicating.
 */
import { createReadStream, existsSync } from 'node:fs';
import { basename, join } from 'node:path';

import { getCliClient } from 'sanity/cli';

import { ABOUT_CARDS, HERO_SLIDES, NEWS_ITEMS, SITE_SETTINGS } from '../app/lib/fallbackContent';
import { PRODUCTS } from '../app/lib/products';

const client = getCliClient({ apiVersion: '2024-10-01' });
const publicDir = join(process.cwd(), 'public');

type Asset = { _id: string };

async function uploadLocal(file: string, type: 'image' | 'file'): Promise<Asset | undefined> {
  const absolute = join(publicDir, file.replace(/^\/+/, ''));
  if (!existsSync(absolute)) {
    console.log(`  ! missing ${absolute}, skipped`);
    return undefined;
  }
  const asset = await client.assets.upload(type, createReadStream(absolute), {
    filename: basename(absolute),
  });
  console.log(`  ↑ ${basename(absolute)}`);
  return asset as Asset;
}

async function uploadRemote(url: string): Promise<Asset | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const filename = url.split('?')[0].split('/').pop() || 'photo.jpg';
    const asset = await client.assets.upload('image', buffer, { filename });
    console.log(`  ↑ ${filename} (remote)`);
    return asset as Asset;
  } catch (error) {
    console.log(`  ! could not download ${url}: ${(error as Error).message}`);
    return undefined;
  }
}

async function uploadAny(source: string): Promise<Asset | undefined> {
  return /^https?:\/\//.test(source) ? uploadRemote(source) : uploadLocal(source, 'image');
}

function imageField(asset?: Asset, alt?: string) {
  if (!asset) return undefined;
  return { _type: 'image', alt, asset: { _type: 'reference', _ref: asset._id } };
}

function fileField(asset?: Asset) {
  if (!asset) return undefined;
  return { _type: 'file', asset: { _type: 'reference', _ref: asset._id } };
}

async function seed() {
  console.log('Products');
  for (let index = 0; index < PRODUCTS.length; index++) {
    const product = PRODUCTS[index];
    const image = await uploadLocal(product.image, 'image');
    const pdf = product.pdf ? await uploadLocal(product.pdf, 'file') : undefined;
    await client.createOrReplace({
      _id: `product-${product.slug}`,
      _type: 'product',
      name: product.name,
      slug: { _type: 'slug', current: product.slug },
      category: product.category,
      description: product.description,
      applications: product.applications,
      features: product.features,
      specs: product.specs?.map((spec, i) => ({ _type: 'spec', _key: `spec-${i}`, ...spec })),
      order: index,
      image: imageField(image, product.name),
      pdf: fileField(pdf),
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log('Hero slides');
  for (let index = 0; index < HERO_SLIDES.length; index++) {
    const slide = HERO_SLIDES[index];
    const image = await uploadLocal(slide.image, 'image');
    await client.createOrReplace({
      _id: `hero-slide-${index + 1}`,
      _type: 'heroSlide',
      order: index,
      image: imageField(image, slide.heading),
      position: slide.position,
      eyebrow: slide.eyebrow,
      heading: slide.heading,
      body: slide.body,
      cta: slide.cta,
      href: slide.href,
    });
    console.log(`  ✓ ${slide.heading}`);
  }

  console.log('About cards');
  for (let index = 0; index < ABOUT_CARDS.length; index++) {
    const card = ABOUT_CARDS[index];
    const image = await uploadAny(card.image);
    await client.createOrReplace({
      _id: `about-card-${index + 1}`,
      _type: 'aboutCard',
      order: index,
      title: card.title,
      description: card.description,
      href: card.href,
      icon: card.icon,
      image: imageField(image, card.title),
    });
    console.log(`  ✓ ${card.title}`);
  }

  console.log('News items');
  for (let index = 0; index < NEWS_ITEMS.length; index++) {
    const item = NEWS_ITEMS[index];
    const image = await uploadAny(item.image);
    await client.createOrReplace({
      _id: `news-item-${index + 1}`,
      _type: 'newsItem',
      order: index,
      title: item.title,
      category: item.category,
      icon: item.icon,
      image: imageField(image, item.title),
    });
    console.log(`  ✓ ${item.title}`);
  }

  console.log('Site settings');
  const logo = await uploadLocal(SITE_SETTINGS.logo, 'image');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    tagline: SITE_SETTINGS.tagline,
    logo: imageField(logo, 'Lubrezol logo'),
  });
  console.log('  ✓ logo + tagline');
}

seed()
  .then(() => console.log('\nDone. Open /studio to edit content.'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
