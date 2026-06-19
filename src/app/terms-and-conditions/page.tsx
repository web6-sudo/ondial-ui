import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { TermsAndConditionsSection } from "@/components/marketing/terms-and-conditions-section";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using Ondial.ai website, products, and AI-powered services.",
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
