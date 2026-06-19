import type { Metadata } from "next";

import { MarketingDottedPageShell } from "@/components/layout/marketing-dotted-page-shell";
import { ContactMissionSection } from "@/components/marketing/contact-mission-section";
import { ContactPageSection } from "@/components/marketing/contact-page-section";

export const metadata: Metadata = {
  title: { absolute: "Contact OnDial AI – Reach Our Support Team Anytime" },
  description:
    "Reach out to OnDial AI for support and questions. Our team is ready to assist you with AI voice solutions and business automation.",
};

export default function ContactPage() {
  return (
    <MarketingDottedPageShell>
      <ContactPageSection />
      <ContactMissionSection />
    </MarketingDottedPageShell>
  );
}
