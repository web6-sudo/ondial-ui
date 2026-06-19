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
  title: { absolute: "AI Voice Call Automation Services | OnDial" },
  description:
    "Boost efficiency with OnDial's AI Voice Call Automation. Streamline customer support, reduce costs & deliver faster, smarter conversations.",
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
