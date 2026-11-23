import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import { getSiteSettings } from '../lib/content';

export const revalidate = 60;

/** Chrome for the public site only — the Studio route lives outside this group. */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { logo, tagline } = await getSiteSettings();

  return (
    <>
      <Navbar logoSrc={logo} tagline={tagline} />
      {children}
      <Footer logoSrc={logo} />
    </>
  );
}
