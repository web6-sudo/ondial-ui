import {
  SITE_URL,
  SITE_NAME,
  SITE_LEGAL_NAME,
  SITE_LOGO,
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_CONTACT_POINTS,
  ORGANIZATION_SAME_AS,
  ORGANIZATION_ADDRESS,
} from './siteConfig';

/**
 * Site-wide Organization JSON-LD.
 * Anchored with @id so other schemas (BlogPosting.publisher, Service.provider, etc.)
 * can reference it via { "@id": "https://www.ondial.ai/#organization" } without duplication.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE_LEGAL_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: SITE_LOGO,
    width: 1200,
    height: 628,
  },
  description: ORGANIZATION_DESCRIPTION,
  address: ORGANIZATION_ADDRESS,
  contactPoint: ORGANIZATION_CONTACT_POINTS.map((cp) => ({
    '@type': 'ContactPoint',
    ...cp,
  })),
  sameAs: ORGANIZATION_SAME_AS,
};
