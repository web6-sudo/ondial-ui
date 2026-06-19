import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { PrivacyPolicySection } from "@/components/marketing/privacy-policy-section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Ondial.ai collects, uses, and protects your personal information when you use our website, products, and services.",
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
