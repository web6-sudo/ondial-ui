import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { ReturnPolicySection } from "@/components/marketing/return-policy-section";

export const metadata: Metadata = {
  title: { absolute: "OnDial Return Policy – Easy Returns & Refunds" },
  description:
    "Explore OnDial's straightforward return policy. Enjoy easy returns, transparent guidelines, and prompt support for a seamless experience.",
  alternates: { canonical: "https://www.ondial.ai/return-policy" },
  openGraph: {
    title: "OnDial Return Policy – Easy Returns & Refunds",
    description:
      "Explore OnDial's straightforward return policy. Enjoy easy returns, transparent guidelines, and prompt support for a seamless experience.",
    url: "https://www.ondial.ai/return-policy",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Return Policy" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnDial Return Policy – Easy Returns & Refunds",
    description:
      "Explore OnDial's straightforward return policy. Enjoy easy returns, transparent guidelines, and prompt support for a seamless experience.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
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
