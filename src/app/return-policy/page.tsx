import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { ReturnPolicySection } from "@/components/marketing/return-policy-section";

export const metadata: Metadata = {
  title: "Return Policy",
  description:
    "Ondial return, refund, and cancellation policy for AI-powered digital services, subscriptions, and one-time purchases.",
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
