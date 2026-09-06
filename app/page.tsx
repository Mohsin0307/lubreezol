import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Product';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Contact />
    </>
  );
}