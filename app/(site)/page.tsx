import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Product';
import Contact from '../components/Contact';

import { getAboutContent, getHeroSlides, getProducts } from '../lib/content';

export const revalidate = 60;

export default async function Home() {
  const [slides, products, about] = await Promise.all([
    getHeroSlides(),
    getProducts(),
    getAboutContent(),
  ]);

  return (
    <>
      <Hero slides={slides} />
      <About quickLinks={about.quickLinks} newsItems={about.newsItems} />
      <Products products={products} />
      <Contact />
    </>
  );
}
