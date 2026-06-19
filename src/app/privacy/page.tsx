import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { PrivacyPolicySection } from "@/components/marketing/privacy-policy-section";

export const metadata: Metadata = {
  title: { absolute: "OnDial Privacy Policy – Secure AI Voice Agents" },
  description:
    "Explore OnDial's Privacy Policy to understand how we securely handle your data with enterprise-grade protection and full compliance with privacy regulations.",
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlogPageShell>
        <PrivacyPolicySection />
      </BlogPageShell>
    </main>
  );
}
