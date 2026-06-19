import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import {
  EnterpriseComparisonSection,
  EnterpriseComplianceSection,
  EnterpriseDeploymentSection,
  EnterpriseFaqSection,
  EnterpriseFinalCtaSection,
  EnterpriseHeroSection,
  EnterpriseHowItWorksSection,
  EnterpriseIntegrationsSection,
  EnterprisePricingSection,
  EnterpriseShiftSection,
  EnterpriseUseCasesSection,
  EnterpriseWhyChooseSection,
} from "@/components/marketing/enterprise-page-sections";

export const metadata: Metadata = {
  title: { absolute: "OnDial for Enterprise – Scalable AI Voice Agents" },
  description:
    "Enterprise AI voice agents that scale to thousands of calls with ultra-low latency, TRAI DLT alignment, DPDP-ready data handling, and deep conversation analytics.",
  alternates: { canonical: "https://www.ondial.ai/ondial-for-enterprise" },
  openGraph: {
    title: "OnDial for Enterprise – Scalable AI Voice Agents",
    description:
      "Enterprise AI voice agents that scale to thousands of calls with ultra-low latency, TRAI DLT alignment, DPDP-ready data handling, and deep conversation analytics.",
    url: "https://www.ondial.ai/ondial-for-enterprise",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Enterprise" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnDial for Enterprise – Scalable AI Voice Agents",
    description:
      "Enterprise AI voice agents that scale to thousands of calls with ultra-low latency, TRAI DLT alignment, DPDP-ready data handling, and deep conversation analytics.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

export default function OndialForEnterprisePage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlogPageShell>
        <EnterpriseHeroSection />
        <EnterpriseShiftSection />
        <EnterpriseWhyChooseSection />
        <EnterpriseHowItWorksSection />
        <EnterpriseUseCasesSection />
        <EnterpriseComplianceSection />
        <EnterpriseIntegrationsSection />
        <EnterpriseComparisonSection />
        <EnterpriseDeploymentSection />
        <EnterprisePricingSection />
        <EnterpriseFaqSection />
        <EnterpriseFinalCtaSection />
      </BlogPageShell>
    </main>
  );
}
