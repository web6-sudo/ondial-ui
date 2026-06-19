import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { PrivacyPolicySection } from "@/components/marketing/privacy-policy-section";

export const metadata: Metadata = {
  title: { absolute: "OnDial Privacy Policy – Secure AI Voice Agents" },
  description:
    "Explore OnDial's Privacy Policy to understand how we securely handle your data with enterprise-grade protection and full compliance with privacy regulations.",
  alternates: { canonical: "https://www.ondial.ai/privacy" },
  openGraph: {
    title: "OnDial Privacy Policy – Secure AI Voice Agents",
    description:
      "Explore OnDial's Privacy Policy to understand how we securely handle your data with enterprise-grade protection and full compliance with privacy regulations.",
    url: "https://www.ondial.ai/privacy",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Privacy Policy" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnDial Privacy Policy – Secure AI Voice Agents",
    description:
      "Explore OnDial's Privacy Policy to understand how we securely handle your data with enterprise-grade protection and full compliance with privacy regulations.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
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
