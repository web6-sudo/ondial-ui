import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { ReturnPolicySection } from "@/components/marketing/return-policy-section";

export const metadata: Metadata = {
  title: { absolute: "OnDial Return Policy – Easy Returns & Refunds" },
  description:
    "Explore OnDial's straightforward return policy. Enjoy easy returns, transparent guidelines, and prompt support for a seamless experience.",
};

export default function ReturnPolicyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlogPageShell>
        <ReturnPolicySection />
      </BlogPageShell>
    </main>
  );
}
