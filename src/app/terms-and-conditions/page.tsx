import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { TermsAndConditionsSection } from "@/components/marketing/terms-and-conditions-section";
import StructuredData from "@/components/StructuredData";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/seo/schemaBuilders";

export const metadata: Metadata = {
  title: { absolute: "OnDial AI Terms & Conditions – Service Agreement" },
  description:
    "Review OnDial AI's Terms & Conditions for using our AI voice agents, services, and support. Understand your rights and responsibilities.",
  alternates: { canonical: "https://www.ondial.ai/terms-and-conditions" },
  openGraph: {
    title: "OnDial AI Terms & Conditions – Service Agreement",
    description:
      "Review OnDial AI's Terms & Conditions for using our AI voice agents, services, and support. Understand your rights and responsibilities.",
    url: "https://www.ondial.ai/terms-and-conditions",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Terms & Conditions" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnDial AI Terms & Conditions – Service Agreement",
    description:
      "Review OnDial AI's Terms & Conditions for using our AI voice agents, services, and support. Understand your rights and responsibilities.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

const termsSchemas = [
  (buildWebPageSchema as any)({
    url: "/terms-and-conditions",
    name: "OnDial AI Terms & Conditions",
    description:
      "Review OnDial AI's Terms & Conditions for using our AI voice agents, services, and support.",
  }),
  (buildBreadcrumbSchema as any)(
    [{ name: "Terms & Conditions", url: "/terms-and-conditions" }],
    { anchorUrl: "/terms-and-conditions" }
  ),
];

export default function TermsAndConditionsPage() {
  return (
    <>
      <StructuredData data={termsSchemas} />
      <main className="flex flex-1 flex-col">
        <BlogPageShell>
          <TermsAndConditionsSection />
        </BlogPageShell>
      </main>
    </>
  );
}
