import type { Metadata } from "next";

import { MarketingDottedPageShell } from "@/components/layout/marketing-dotted-page-shell";
import { NewsHeroSection } from "@/components/marketing/news-hero-section";
import { NewsProductUpdateSection } from "@/components/marketing/news-product-update-section";

export const metadata: Metadata = {
  title: { absolute: "OnDial News – AI Voice Agent Updates & Announcements" },
  description:
    "Stay up to date with the latest news, product updates, and announcements from OnDial. Discover new features and real-world results from our AI voice agents.",
  alternates: { canonical: "https://www.ondial.ai/news" },
  openGraph: {
    title: "OnDial News – AI Voice Agent Updates & Announcements",
    description:
      "Stay up to date with the latest news, product updates, and announcements from OnDial. Discover new features and real-world results from our AI voice agents.",
    url: "https://www.ondial.ai/news",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial News" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OnDial News – AI Voice Agent Updates & Announcements",
    description:
      "Stay up to date with the latest news, product updates, and announcements from OnDial. Discover new features and real-world results from our AI voice agents.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

export default function NewsPage() {
  return (
    <MarketingDottedPageShell>
      <NewsHeroSection />
      <NewsProductUpdateSection />
    </MarketingDottedPageShell>
  );
}
