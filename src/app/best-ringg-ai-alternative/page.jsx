import RinggAIAlternativeContent from '@/components/alternatives/RinggAIAlternativeContent';
import StructuredData from '@/components/StructuredData';
import { buildWebPageSchema, buildBreadcrumbSchema } from '@/lib/seo/schemaBuilders';
import { SITE_URL } from '@/lib/seo/siteConfig';

export const metadata = {
  title: { absolute: "Best Ringg AI Alternative – OnDial AI Voice Agents" },
  description:
    "Looking for the best Ringg AI alternative? OnDial offers AI voice agents, 100+ languages, a free trial, and documented HIPAA and GDPR compliance. Compare now.",
  alternates: { canonical: "https://www.ondial.ai/best-ringg-ai-alternative" },
  openGraph: {
    title: "Best Ringg AI Alternative – OnDial AI Voice Agents",
    description:
      "Looking for the best Ringg AI alternative? OnDial offers AI voice agents, 100+ languages, a free trial, and documented HIPAA and GDPR compliance. Compare now.",
    url: "https://www.ondial.ai/best-ringg-ai-alternative",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial vs Ringg AI" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Ringg AI Alternative – OnDial AI Voice Agents",
    description:
      "Looking for the best Ringg AI alternative? OnDial offers AI voice agents, 100+ languages, a free trial, and documented HIPAA and GDPR compliance. Compare now.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

const pageSchemas = [
  buildWebPageSchema({
    url: '/best-ringg-ai-alternative',
    type: 'WebPage',
    name: "Best Ringg AI Alternative | Best OnDial's AI Voice Agents",
    description:
      'Looking for the best Ringg AI alternative? OnDial offers AI voice agents, 100+ languages, a free trial, and documented HIPAA and GDPR compliance. Compare now.',
    image: `${SITE_URL}/img/logo/og.png`,
  }),
  buildBreadcrumbSchema(
    [
      { name: 'Comparisons', url: '/services' },
      { name: 'Best Ringg AI Alternative', url: '/best-ringg-ai-alternative' },
    ],
    { anchorUrl: '/best-ringg-ai-alternative' }
  ),
];

export default function BestRinggAIAlternativePage() {
  return (
    <>
      <StructuredData data={pageSchemas} />
      <RinggAIAlternativeContent />
    </>
  );
}
