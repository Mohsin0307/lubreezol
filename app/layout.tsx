import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Archivo_Black, Barlow, JetBrains_Mono } from 'next/font/google';

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const barlow = Barlow({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
});

const jetbrainsMono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${barlow.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body">
        <Navbar logoSrc="/logo.png" tagline="Lubricants. Technology. People." />
        {children}
        <Footer />
        </body>
    </html>
  );
}