export const PRODUCTS_QUERY = `*[_type == "product"] | order(coalesce(order, 9999) asc, name asc) {
  "slug": slug.current,
  name,
  category,
  description,
  applications,
  features,
  image,
  "pdfUrl": pdf.asset->url,
  specs[]{ parameter, unit, method, value }
}`;

export const HERO_SLIDES_QUERY = `*[_type == "heroSlide"] | order(coalesce(order, 9999) asc) {
  eyebrow,
  heading,
  body,
  position,
  cta,
  href,
  image
}`;

export const ABOUT_CARDS_QUERY = `*[_type == "aboutCard"] | order(coalesce(order, 9999) asc) {
  title,
  description,
  href,
  icon,
  image
}`;

export const NEWS_ITEMS_QUERY = `*[_type == "newsItem"] | order(coalesce(order, 9999) asc) {
  title,
  category,
  icon,
  image
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  tagline,
  logo
}`;
