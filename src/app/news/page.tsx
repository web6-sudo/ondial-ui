import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "News",
  description: "Product announcements, partnerships, and company updates from Ondial.",
};

export default function NewsPage() {
  return (
    <MarketingPageBody
      title="News"
      description="The latest from Ondial — launches, milestones, and voice AI industry updates."
    >
      <Button variant="outline" className="self-center" render={<Link href="/blog" prefetch />} nativeButton={false}>
        Read the blog
      </Button>
    </MarketingPageBody>
  );
}
