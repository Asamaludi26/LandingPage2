import type { Product } from './products';
import { FAQS_DATA } from './faqs';
import { PRODUCT_CATEGORIES } from './products';

export const SITE_URL = 'https://www.nusaatelier.com';

export const SEO_SITE = {
  siteName: 'Nusa Atelier',
  domain: 'www.nusaatelier.com',
  defaultTitle: 'Nusa Atelier | Interior Mewah, Gorden & Custom Furnitur Sejak 1992',
  defaultDescription:
    'Solusi interior mewah, gorden eksklusif, blinds, kain upholstery, wallpaper, dan custom furniture premium di Jakarta sejak 1992.',
  ogImage: `${SITE_URL}/assets/og-cover.jpg`,
  ogImageType: 'image/jpeg',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  phone: '+62 21 555 0172',
  email: 'info@nusaatelier.com',
  instagramUrl: 'https://www.instagram.com/nusaatelier.id',
  address: {
    streetAddress: 'Jl. Senopati No. 21A, Kebayoran Baru',
    addressLocality: 'Jakarta Selatan',
    addressRegion: 'DKI Jakarta',
    addressCountry: 'ID',
  },
  businessHours: 'Mo-Sa 09:00-18:00',
  foundedYear: 1992,
};

export interface RouteMeta {
  title: string;
  description: string;
  ogType: string;
  path: string;
  breadcrumbs: { name: string; path: string }[];
}

export const HOME_ROUTE_META: RouteMeta = {
  title: SEO_SITE.defaultTitle,
  description: SEO_SITE.defaultDescription,
  ogType: 'website',
  path: '/',
  breadcrumbs: [{ name: 'Beranda', path: '/' }],
};

export const ABOUT_ROUTE_META: RouteMeta = {
  title: 'Tentang Kami | Nusa Atelier — Atelier Interior Mewah Jakarta Sejak 1992',
  description:
    'Mengenal Nusa Atelier: atelier interior tekstil & window covering mewah dengan workshop in-house sejak 1992, melayani hunian residensial, penthouse, kedutaan, dan perhotelan.',
  ogType: 'website',
  path: '/tentang-kami',
  breadcrumbs: [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang Kami', path: '/tentang-kami' },
  ],
};

export const PRODUCTS_ROUTE_META: RouteMeta = {
  title: 'Koleksi Produk | Gorden, Blinds, Wallpaper & Custom Furniture — Nusa Atelier',
  description:
    'Koleksi eksklusif gorden ripple fold, blinds motorized, kain upholstery, wallpaper, custom furniture, dan flooring premium. Semua dibuat custom di workshop Nusa Atelier Jakarta.',
  ogType: 'website',
  path: '/koleksi-produk',
  breadcrumbs: [
    { name: 'Beranda', path: '/' },
    { name: 'Koleksi Produk', path: '/koleksi-produk' },
  ],
};

export const SERVICES_ROUTE_META: RouteMeta = {
  title: 'Layanan Interior End-to-End | Nusa Atelier Jakarta Sejak 1992',
  description:
    'Layanan interior terpadu: gorden & blinds, upholstery, wallpaper, furniture custom, dan flooring. Survei & pengukuran gratis, workshop in-house, garansi resmi 1–5 tahun.',
  ogType: 'website',
  path: '/layanan',
  breadcrumbs: [
    { name: 'Beranda', path: '/' },
    { name: 'Layanan', path: '/layanan' },
  ],
};

export function productRouteMeta(product: Product): RouteMeta {
  return {
    title: `${product.name} | Nusa Atelier`,
    description: product.description,
    ogType: 'product',
    path: `/koleksi-produk/${product.id}`,
    breadcrumbs: [
      { name: 'Beranda', path: '/' },
      { name: 'Koleksi Produk', path: '/koleksi-produk' },
      { name: product.name, path: `/koleksi-produk/${product.id}` },
    ],
  };
}

export type JsonLd = Record<string, unknown>;

export const organizationSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': ['HomeGoodsStore', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: SEO_SITE.siteName,
  url: SITE_URL,
  image: SEO_SITE.ogImage,
  logo: SEO_SITE.ogImage,
  telephone: SEO_SITE.phone,
  email: SEO_SITE.email,
  foundingDate: String(SEO_SITE.foundedYear),
  priceRange: 'RpRpRpRp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SEO_SITE.address.streetAddress,
    addressLocality: SEO_SITE.address.addressLocality,
    addressRegion: SEO_SITE.address.addressRegion,
    addressCountry: SEO_SITE.address.addressCountry,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [SEO_SITE.instagramUrl],
});

export const websiteSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SEO_SITE.siteName,
  inLanguage: 'id-ID',
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const webPageSchema = (meta: RouteMeta, i18nName = ''): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}${meta.path}#webpage`,
  url: `${SITE_URL}${meta.path}`,
  name: meta.title,
  description: meta.description,
  inLanguage: 'id-ID',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  primaryImageOfPage: `${SITE_URL}/assets/og-cover.jpg`,
  ...(i18nName ? { headline: i18nName } : {}),
});

export const breadcrumbSchema = (crumbs: { name: string; path: string }[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${SITE_URL}${crumb.path}`,
  })),
});

export const faqSchema = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS_DATA.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const productSchema = (product: Product): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.galleryImages.map((src) => `${SITE_URL}${src}`),
  brand: {
    '@type': 'Brand',
    name: SEO_SITE.siteName,
  },
  category:
    PRODUCT_CATEGORIES.find((cat) => cat.id === product.category)?.label ?? product.category,
  material: product.materials,
  additionalProperty: product.specs.map((spec) => ({
    '@type': 'PropertyValue',
    name: spec.label,
    value: spec.value,
  })),
});