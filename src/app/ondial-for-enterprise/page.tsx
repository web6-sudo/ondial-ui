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
  title: "OnDial for Enterprise",
  description:
    "Enterprise AI voice agents that scale to thousands of calls with ultra-low latency, TRAI DLT alignment, DPDP-ready data handling, and deep conversation analytics.",
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
