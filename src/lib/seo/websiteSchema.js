import { SITE_URL, SITE_NAME } from './siteConfig';

/**
 * Site-wide WebSite JSON-LD with SearchAction (Sitelinks Searchbox eligibility).
 * Pages can reference via { "@id": "https://www.ondial.ai/#website" }.
 */
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'en-US',
};
