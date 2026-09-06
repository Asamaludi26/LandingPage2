import { useEffect } from 'react';
import type { Location } from 'react-router-dom';
import {
  ABOUT_ROUTE_META,
  HOME_ROUTE_META,
  PRODUCTS_ROUTE_META,
  SERVICES_ROUTE_META,
  SITE_URL,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  productRouteMeta,
  productSchema,
  webPageSchema,
  websiteSchema,
  type JsonLd,
  type RouteMeta,
} from '../content';
import { PRODUCTS_DATA } from '../content';

interface ResolvedSeo {
  meta: RouteMeta;
  jsonLd: JsonLd[];
}

function resolveSeo(location: Location): ResolvedSeo {
  const path = location.pathname;

  if (path === '/') {
    return {
      meta: HOME_ROUTE_META,
      jsonLd: [websiteSchema(), faqSchema()],
    };
  }

  if (path === '/tentang-kami') {
    return {
      meta: ABOUT_ROUTE_META,
      jsonLd: [webPageSchema(ABOUT_ROUTE_META), breadcrumbSchema(ABOUT_ROUTE_META.breadcrumbs)],
    };
  }

  if (path === '/layanan') {
    return {
      meta: SERVICES_ROUTE_META,
      jsonLd: [webPageSchema(SERVICES_ROUTE_META), breadcrumbSchema(SERVICES_ROUTE_META.breadcrumbs)],
    };
  }

  const productMatch = path.match(/^\/koleksi-produk\/([^/]+)$/);
  const product = productMatch
    ? PRODUCTS_DATA.find((item) => item.id === productMatch[1])
    : undefined;

  if (product) {
    const meta = productRouteMeta(product);
    return {
      meta,
      jsonLd: [
        webPageSchema(meta),
        breadcrumbSchema(meta.breadcrumbs),
        productSchema(product),
      ],
    };
  }

  return {
    meta: PRODUCTS_ROUTE_META,
    jsonLd: [
      webPageSchema(PRODUCTS_ROUTE_META),
      breadcrumbSchema(PRODUCTS_ROUTE_META.breadcrumbs),
    ],
  };
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function renderJsonLd(jsonLd: JsonLd[]) {
  document.getElementById('seo-route-jsonld')?.remove();
  if (jsonLd.length === 0) return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'seo-route-jsonld';
  script.textContent = JSON.stringify(
    jsonLd.map((entry) => ({ '@context': 'https://schema.org', ...entry })),
  );
  document.head.appendChild(script);
}

function applySeo(seo: ResolvedSeo) {
  const { meta } = seo;
  const url = `${SITE_URL}${meta.path}`;

  document.title = meta.title;
  upsertMeta('name', 'description', meta.description);
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:url', url);
  upsertMeta('property', 'og:type', meta.ogType);
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);
  upsertCanonical(url);
  renderJsonLd(seo.jsonLd);
}

export function useRouteSeo(location: Location) {
  useEffect(() => {
    applySeo(resolveSeo(location));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search, location.hash]);
}