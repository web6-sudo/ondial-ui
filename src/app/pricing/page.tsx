import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { HomePricingSection } from "@/components/marketing/home-pricing-section";
import { PricingCalculatorSection } from "@/components/marketing/pricing-calculator-section";
import { PricingCountryProvider } from "@/components/marketing/pricing-country-context";
import StructuredData from "@/components/StructuredData";
import { buildPricingSchema, buildBreadcrumbSchema } from "@/lib/seo/schemaBuilders";
import { PRICING_PLANS } from "@/data/pricing-plans";
import { getSiteFaqSection } from "@/data/site-faqs";

export const metadata: Metadata = {
  title: { absolute: "OnDial AI Pricing – Flexible Plans for Every Business" },
  description:
    "Explore OnDial's flexible pricing plans for AI voice agents. Choose the right plan for your business size and scale effortlessly.",
  alternates: { canonical: "https://www.ondial.ai/pricing" },
  openGraph: {
    title: "OnDial AI Pricing – Flexible Plans for Every Business",
    description:
      "Explore OnDial's flexible pricing plans for AI voice agents. Choose the right plan for your business size and scale effortlessly.",
    url: "https://www.ondial.ai/pricing",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Pricing" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnDial AI Pricing – Flexible Plans for Every Business",
    description:
      "Explore OnDial's flexible pricing plans for AI voice agents. Choose the right plan for your business size and scale effortlessly.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

const mappedPlans = PRICING_PLANS.map((p) => ({
  name: p.title,
  description: p.description,
  price: p.price,
  features: p.features,
}));

const pricingSchemas = [
  (buildPricingSchema as any)({ url: "/pricing", plans: mappedPlans }),
  (buildBreadcrumbSchema as any)(
    [{ name: "Pricing", url: "/pricing" }],
    { anchorUrl: "/pricing" }
  ),
];

const pricingFaq = getSiteFaqSection("pricing");
const pricingFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: pricingFaq.items.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <StructuredData data={[...pricingSchemas, pricingFaqSchema]} />
      <main className="flex flex-1 flex-col">
        <BlogPageShell>
          <PricingCountryProvider>
            <HomePricingSection />
            <PricingCalculatorSection />
            <HomeFaqSection pageKey="pricing" transparentSurface />
          </PricingCountryProvider>
        </BlogPageShell>
      </main>
    </>
  );
}
