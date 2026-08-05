/**
 * Shared product data.
 *
 * This lives here (instead of inline in Products.tsx) because it's needed
 * in two places: the product grid AND the dynamic detail page
 * (app/products/[slug]/page.tsx). Keeping one copy avoids the grid and the
 * detail page drifting out of sync.
 *
 * `slug` becomes the URL: /products/{slug}
 */
export interface ProductSpec {
    parameter: string;
    unit: string;
    method: string;
    value: string;
  }
  
  export interface Product {
    slug: string;
    image: string;
    name: string;
    category: string;
    description: string;
    applications?: string;
    features?: string[];
    specs?: ProductSpec[];
  }
  
  export const PRODUCTS: Product[] = [
    {
      slug: 'truck-plus-ci4-sl-15w40',
      image: '/1.jpeg',
      name: 'Truck Plus API CI-4/SL 15W40',
      category: 'Diesel Engine Oil',
      description:
        'Lubrezool Truck Plus API CI-4/SL 15W40 is designed for heavy-duty diesel engines and to meet exhaust emission standards. It is especially effective at sustaining emission control system durability where particulate filters and other advanced systems are used. Optimum protection is provided for control of catalyst poisoning, particulate filter blocking, engine wear, piston deposits, low- and high-temperature stability, soot handling properties, oxidative thickening, foaming, and viscosity loss due to shear.',
      applications:
        'Suitable for turbocharged and naturally aspirated diesel engines used in on-highway and off-highway applications, including those fitted with EGR systems. The combination of base oils and the latest advanced additive technology meets the service requirements of API Engine Service Classification API CI-4/SL.',
      features: [
        'Ensures long engine life',
        'Provides good lubrication for frequent stop-start conditions',
        'Offers superior wear protection',
        'Keeps piston and crankcase clean',
        'Molybdenum metal technology to protect against engine wear and tear',
      ],
      specs: [
        { parameter: 'Viscosity @ 40°C', unit: 'cSt (mm²/s)', method: 'ASTM D 445', value: '108–112' },
        { parameter: 'Viscosity @ 100°C', unit: 'cSt (mm²/s)', method: 'ASTM D 445', value: '13.5–15.5' },
        { parameter: 'Viscosity Index', unit: 'mm²/s', method: 'ASTM D 2270', value: '135' },
        { parameter: 'Flash Point', unit: '°C', method: 'ASTM D 92', value: '230' },
        { parameter: 'Fire Point', unit: '°C', method: 'ASTM D 92', value: '270' },
        { parameter: 'TBN', unit: 'mg KOH/g', method: 'ASTM D 2896', value: '10.5' },
        { parameter: 'Pour Point', unit: '°C', method: 'ASTM D 97', value: '-25' },
        { parameter: 'CCS Viscosity @ -30°C', unit: 'mPa·s', method: 'ASTM D 5293', value: '6500' },
      ],
    },
    { slug: 'product-2', image: '/2.jpeg', name: 'Lubrezol SAE 50', category: 'Lubricant', description: 'Add product description here.' },
    { slug: 'product-3', image: '/3.jpeg', name: 'Lubrezol Hydraulic Oil ISO VG 68', category: 'Lubricant', description: 'Add product description here.' },
    { slug: 'product-4', image: '/4.jpeg', name: 'Lubrezol Power 100', category: 'Lubricant', description: 'Add product description here.' },
    { slug: 'product-5', image: '/5.jpeg', name: 'Lubrezol Immemce Power Semi-Synthetic', category: 'Lubricant', description: 'Add product description here.' },
    { slug: 'product-6', image: '/6.jpeg', name: 'Lubrezol Immence Power 4T Motor Cyle Oil ', category: 'Lubricant', description: 'Add product description here.' },
    { slug: 'product-7', image: '/7.jpeg', name: 'Lubrezol HD 50', category: 'Lubricant', description: 'Add product description here.' },
    { slug: 'product-8', image: '/8.jpeg', name: 'Lubrezol Super Formula', category: 'Lubricant', description: 'Add product description here.' },
    { slug: 'product-9', image: '/9.jpeg', name: 'Lubrezol Super Formula', category: 'Lubricant', description: 'Add product description here.' },
  ];
  
  export function getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS.find((product) => product.slug === slug);
  }