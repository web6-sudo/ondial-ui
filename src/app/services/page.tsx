import type { Metadata } from "next";
import { notFound } from "next/navigation";

// import { BlogPageShell } from "@/components/layout/blog-page-shell";
// import {
//   ServicesFaqSection,
//   ServicesFinalCtaSection,
//   ServicesHeroSection,
//   ServicesHowItWorksSection,
//   ServicesIndustriesSection,
//   ServicesWhyChooseSection,
// } from "@/components/marketing/services-page-sections";

export const metadata: Metadata = {
  title: "Services — OnDial Best AI Call Assistant",
  description:
    "Transform the way your business communicates. OnDial AI voice call automation for 20+ industries — industry-specific templates, compliance, CRM integrations, and real-time analytics.",
};

/** Main services overview — hidden for now; sub-routes under `/services/[slug]` stay live. */
export default function ServicesPage() {
  notFound();

  // return (
  //   <main className="flex flex-1 flex-col">
  //     <BlogPageShell>
  //       <ServicesHeroSection />
  //       <ServicesWhyChooseSection />
  //       <ServicesIndustriesSection />
  //       <ServicesHowItWorksSection />
  //       <ServicesFaqSection />
  //       <ServicesFinalCtaSection />
  //     </BlogPageShell>
  //   </main>
  // );
}
