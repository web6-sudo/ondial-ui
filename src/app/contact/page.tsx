import type { Metadata } from "next";

import { MarketingDottedPageShell } from "@/components/layout/marketing-dotted-page-shell";
import { ContactMissionSection } from "@/components/marketing/contact-mission-section";
import { ContactPageSection } from "@/components/marketing/contact-page-section";
import StructuredData from "@/components/StructuredData";
import { buildContactPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schemaBuilders";

export const metadata: Metadata = {
  title: { absolute: "Contact OnDial AI – Reach Our Support Team Anytime" },
  description:
    "Reach out to OnDial AI for support and questions. Our team is ready to assist you with AI voice solutions and business automation.",
  alternates: { canonical: "https://www.ondial.ai/contact" },
  openGraph: {
    title: "Contact OnDial AI – Reach Our Support Team Anytime",
    description:
      "Reach out to OnDial AI for support and questions. Our team is ready to assist you with AI voice solutions and business automation.",
    url: "https://www.ondial.ai/contact",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "Contact OnDial AI" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact OnDial AI – Reach Our Support Team Anytime",
    description:
      "Reach out to OnDial AI for support and questions. Our team is ready to assist you with AI voice solutions and business automation.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

const contactSchemas = [
  (buildContactPageSchema as any)({
    url: "/contact",
    name: "Contact OnDial",
    description:
      "Get in touch with OnDial's sales and support teams for AI voice agent demos, pricing, and integration help.",
  }),
  (buildBreadcrumbSchema as any)(
    [{ name: "Contact", url: "/contact" }],
    { anchorUrl: "/contact" }
  ),
];

export default function ContactPage() {
  return (
    <>
      <StructuredData data={contactSchemas} />
      <MarketingDottedPageShell>
        <ContactPageSection />
        <ContactMissionSection />
      </MarketingDottedPageShell>
    </>
  );
}
