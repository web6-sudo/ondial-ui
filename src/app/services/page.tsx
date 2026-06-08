import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { SERVICES_NAV_ITEMS } from "@/config/services-nav";

export const metadata: Metadata = {
  title: "Services",
  description: "AI voice agents for sales, support, recruitment, and finance workflows.",
};

export default function ServicesPage() {
  return (
    <MarketingPageBody
      title="AI voice agents for every team"
      description="Deploy specialized agents that handle outbound, inbound, screening, and finance workflows with natural conversations."
    >
      <ul className="grid w-full gap-3 sm:grid-cols-2">
        {SERVICES_NAV_ITEMS.map((service) => (
          <li key={service.slug}>
            <Link
              href={service.href}
              className="flex min-h-14 items-center rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted/40"
            >
              {service.label}
            </Link>
          </li>
        ))}
      </ul>
    </MarketingPageBody>
  );
}
