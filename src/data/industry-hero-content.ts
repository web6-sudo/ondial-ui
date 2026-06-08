import { INDUSTRIES_NAV_ITEMS } from "@/config/industries-nav";
import type { Industry } from "@/lib/services-data";
import { DEFAULT_INDUSTRIES } from "@/lib/services-data";

export type IndustryHeroContent = {
  slug: string;
  title: string;
  highlight: string;
  subtitle: string;
  backgroundImage: string;
  foregroundImage: string;
};

/** Osaka reference assets (jh3yy CodePen demo). */
export const OSAKA_HERO_IMAGES = {
  sky: "https://assets.codepen.io/605876/do-not-copy-osaka-sky.jpeg",
  tower: "https://assets.codepen.io/605876/do-not-copy-osaka-tower.png",
} as const;

function shortIndustryTitle(industry: Industry) {
  const navItem = INDUSTRIES_NAV_ITEMS.find((item) => item.slug === industry.slug);
  if (navItem) return navItem.label.toUpperCase();
  return industry.name.split("&")[0]?.trim().toUpperCase() ?? industry.name.toUpperCase();
}

export function getIndustryBySlug(slug: string) {
  return DEFAULT_INDUSTRIES.find((industry) => industry.slug === slug);
}

export function getIndustryHeroContent(industry: Industry): IndustryHeroContent {
  return {
    slug: industry.slug,
    title: shortIndustryTitle(industry),
    highlight: industry.name,
    subtitle: "AI voice automation",
    backgroundImage: OSAKA_HERO_IMAGES.sky,
    foregroundImage: OSAKA_HERO_IMAGES.tower,
  };
}

export function getAllIndustrySlugs() {
  return DEFAULT_INDUSTRIES.map((industry) => industry.slug);
}
