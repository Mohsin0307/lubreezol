import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

/**
 * Read-only client for the website.
 * `projectId || 'unconfigured'` keeps the module importable before a Sanity
 * project exists — the content layer falls back to static data in that case.
 */
export const client = createClient({
  projectId: projectId || 'unconfigured',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});
