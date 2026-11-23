/** Shared Sanity connection settings (read from .env.local / Vercel env). */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

/** When false the site renders the static content in app/lib/fallbackContent.ts. */
export const isSanityConfigured = Boolean(projectId);
