import type { Metadata } from "next";

import { AboutCtaSection } from "@/components/marketing/about-cta-section";
import { AboutHeroSection } from "@/components/marketing/about-hero-section";
import { AboutWhatWeDoSection } from "@/components/marketing/about-what-we-do-section";
import { AboutWhyChooseSection } from "@/components/marketing/about-why-choose-section";
import { HomeFaqSection } from "@/components/marketing/home-faq-section";
import { MarketingDottedPageShell } from "@/components/layout/marketing-dotted-page-shell";


export const metadata: Metadata = {
  title: { absolute: "About OnDial | AI Voice Agents for Smarter Calls" },
  description:
    "Discover OnDial - building AI Voice Agents that answer calls instantly, speak 20+ languages, and deliver secure, human-like customer experiences.",
};

export default function AboutPage() {
  return (
    <MarketingDottedPageShell>
      <AboutHeroSection />
      <AboutWhatWeDoSection />
      <AboutWhyChooseSection />
      <AboutCtaSection />
      <HomeFaqSection />
    </MarketingDottedPageShell>
  );
}
