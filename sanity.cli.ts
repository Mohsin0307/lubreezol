import { defineCliConfig } from 'sanity/cli';

/**
 * Only the Sanity CLI reads this file (`sanity cors`, `sanity exec`, ...).
 * The embedded Studio in sanity.config.ts reads the same env vars.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4indhm8p',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});
