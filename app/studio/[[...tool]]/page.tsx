import type { Metadata, Viewport } from 'next';

import Studio from './Studio';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Lubrezol Content Studio',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function StudioPage() {
  return <Studio />;
}
