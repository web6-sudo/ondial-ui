import type { Metadata } from "next";
import { HomeFeaturesSection } from "@/components/marketing/home-landing-sections";
import { HomeProblemSection } from "@/components/marketing/home-problem-section";
import { ComplianceTrustSection } from "@/components/marketing/compliance-trust-section";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { HomeTestimonialsSection } from "@/components/marketing/home-testimonials-section";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
// import { SocialProofLogosSection } from "@/components/marketing/social-proof-logos-section";
import { ShowcaseSection } from "@/components/marketing/showcase-section";
import { SupportedLanguagesSection } from "@/components/marketing/supported-languages-section";

export const metadata: Metadata = {
  title: { absolute: "Best AI Voice Agents to Automate Your Phone Calls | OnDial" },
  description:
    "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
  alternates: { canonical: "https://www.ondial.ai/" },
  openGraph: {
    title: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    description:
      "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
    url: "https://www.ondial.ai/",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial AI Voice Agents" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    description:
      "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <ShowcaseSection />
      {/* <SocialProofLogosSection /> */}
      <HomeProblemSection />
      <HomeFeaturesSection />
      <ComplianceTrustSection />
      <IntegrationsSection />
      <SupportedLanguagesSection />
      <HomeTestimonialsSection />
      <HomeFaqSection />
    </main>
  );
}
