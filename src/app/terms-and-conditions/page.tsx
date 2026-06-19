import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { TermsAndConditionsSection } from "@/components/marketing/terms-and-conditions-section";

export const metadata: Metadata = {
  title: { absolute: "OnDial AI Terms & Conditions – Service Agreement" },
  description:
    "Review OnDial AI's Terms & Conditions for using our AI voice agents, services, and support. Understand your rights and responsibilities.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlogPageShell>
        <TermsAndConditionsSection />
      </BlogPageShell>
    </main>
  );
}
