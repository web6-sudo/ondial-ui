import { INDUSTRIES_NAV_ITEMS } from "@/config/industries-nav";
import type { Industry } from "@/lib/services-data";
import { DEFAULT_INDUSTRIES } from "@/lib/services-data";

export type IndustryHeroContent = {
  slug: string;
  title: string;
  highlight: string;
  subtitle: string;
  backgroundImage: string;
  /** Optional transparent-PNG depth layer (sits in front of title). */
  foregroundImage?: string;
};

/** Osaka reference tower PNG — decorative depth layer. */
const OSAKA_TOWER = "https://assets.codepen.io/605876/do-not-copy-osaka-tower.png";

/**
 * Per-industry background + optional foreground images.
 * backgroundImage → full-bleed landscape photo (sky/scene layer)
 * foregroundImage → transparent PNG depth layer (optional)
 */
const INDUSTRY_IMAGES: Record<string, { background: string; foreground?: string }> = {
  "healthcare-and-medical-services": {
    background:
      "https://images.pexels.com/photos/23234956/pexels-photo-23234956.jpeg",
    foreground: "/industries/Untitled design.png",
  },
  "financial-and-banking-services": {
    background:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "real-estate-services": {
    background:
    "https://images.pexels.com/photos/23234956/pexels-photo-23234956.jpeg",
    foreground: "/industries/Untitled design.png",
  },
  "retail-and-ecommerce-services": {
    background:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop",
  },
  "insurance-services": {
    background:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop",
  },
  "sales-and-lead-generation-services": {
    background:
      "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=1600&auto=format&fit=crop",
  },
  "call-center-and-bpo-services": {
    background:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1600&auto=format&fit=crop",
  },
  "telecommunications-services": {
    background:
      "https://images.unsplash.com/photo-1488509082528-cefbba5ad692?q=80&w=1600&auto=format&fit=crop",
  },
  "automotive-services": {
    background:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
  },
  "education-services": {
    background:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
  },
  "travel-and-tourism-services": {
    background:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "hospitality-services": {
    background:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
  },
  "legal-services": {
    background:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1600&auto=format&fit=crop",
  },
  "government-services": {
    background:
      "https://images.unsplash.com/photo-1541872705-1f73c6400ec9?q=80&w=1600&auto=format&fit=crop",
    foreground: OSAKA_TOWER,
  },
  "utilities-services": {
    background:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1600&auto=format&fit=crop",
  },
  "non-profit-organizations-services": {
    background:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600&auto=format&fit=crop",
  },
  "transportation-and-logistics-services": {
    background:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop",
  },
  "manufacturing-services": {
    background:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?q=80&w=1600&auto=format&fit=crop",
  },
  "construction-services": {
    background:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
  },
  "agriculture-services": {
    background:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop",
  },
};

/** Fallback images for any slug not in the map above. */
const FALLBACK_IMAGES = {
  background:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  foreground: OSAKA_TOWER,
};

function shortIndustryTitle(industry: Industry) {
  const navItem = INDUSTRIES_NAV_ITEMS.find((item) => item.slug === industry.slug);
  if (navItem) return navItem.label.toUpperCase();
  return industry.name.split("&")[0]?.trim().toUpperCase() ?? industry.name.toUpperCase();
}

export function getIndustryBySlug(slug: string) {
  return DEFAULT_INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getIndustryHeroContent(industry: Industry): IndustryHeroContent {
  const images = INDUSTRY_IMAGES[industry.slug] ?? FALLBACK_IMAGES;
  return {
    slug: industry.slug,
    title: shortIndustryTitle(industry),
    highlight: industry.name,
    subtitle: "AI voice automation",
    backgroundImage: images.background,
    foregroundImage: images.foreground,
  };
}

export function getAllIndustrySlugs() {
  return DEFAULT_INDUSTRIES.map((industry) => industry.slug);
}
