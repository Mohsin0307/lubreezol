import imageUrlBuilder from '@sanity/image-url';

import { client } from './client';

const builder = imageUrlBuilder(client);

/** Build an optimized CDN URL from a Sanity image field (keeps crop + hotspot). */
export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
