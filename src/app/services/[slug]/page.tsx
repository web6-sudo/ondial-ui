import type { Metadata } from "next";
import { notFound } from "next/navigation";

// import { MarketingPageBody } from "@/components/layout/marketing-page-body";
// import { SERVICES_NAV_ITEMS } from "@/config/services-nav";

type Props = {
  params: Promise<{ slug: string }>;
};

// function findService(slug: string) {
//   return SERVICES_NAV_ITEMS.find((item) => item.slug === slug);
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;
  return { title: "Service", robots: { index: false, follow: false } };
  // const { slug } = await params;
  // const service = findService(slug);
  // if (!service) return { title: "Service" };
  // return {
  //   title: service.label,
  //   description: `Learn how OnDial's ${service.label} automates voice workflows end to end.`,
  // };
}

/** Service agent pages - hidden for now (nav commented out in `src/config/navigation.ts`). */
export default async function ServiceAgentPage({ params }: Props) {
  await params;
  notFound();

  // const { slug } = await params;
  // const service = findService(slug);
  // if (!service) notFound();
  //
  // return (
  //   <MarketingPageBody
  //     title={service.label}
  //     description="Purpose-built voice automation for high-volume conversations, follow-ups, and handoffs to your team."
  //   >
  //     <div className="flex flex-col gap-4">
  //       <p className="text-sm text-muted-foreground">
  //         Configure scripts, routing, and CRM sync for {service.label.toLowerCase()} workflows.
  //       </p>
  //     </div>
  //   </MarketingPageBody>
  // );
}
