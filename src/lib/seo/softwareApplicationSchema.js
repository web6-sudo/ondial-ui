import { SITE_URL, SITE_NAME, ORGANIZATION_DESCRIPTION } from './siteConfig';

/**
 * Site-wide SoftwareApplication JSON-LD for OnDial.
 * Rendered from the root layout so every page inherits the product schema.
 */
export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: `${SITE_NAME} AI Voice Agent Platform`,
  description: ORGANIZATION_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '0',
    highPrice: '999',
    offerCount: '3',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '214',
    bestRating: '5',
    worstRating: '1',
  },
  publisher: { '@id': `${SITE_URL}/#organization` },
};
