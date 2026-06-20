/**
 * Homepage 3D carousel - single source of truth.
 *
 * Workflow:
 * 1. Add source images to `public/home/carousel/` (JPG or PNG).
 * 2. Run `npm run optimize:assets` to generate lightweight WebP files.
 * 3. Point `image` at the `.webp` path below (same base name as your source file).
 */
export type HomeCarouselSlide = {
  /** Optimized WebP under /public (run `npm run optimize:assets` after updating sources). */
  image: string;
  title: string;
  subtitle: string;
  slug: string;
  href: string;
};

export const HOME_CAROUSEL_SLIDES: readonly HomeCarouselSlide[] = [
  {
    image: "/home/carousel/healthcare.webp",
    title: "Healthcare",
    subtitle: "AI Voice Agents for Healthcare & Medical",
    slug: "ai-voice-agents-healthcare-medical",
    href: "/industries/ai-voice-agents-healthcare-medical",
  },
  {
    image: "/home/carousel/insurance.webp",
    title: "Insurance",
    subtitle: "AI Voice Agents for Insurance",
    slug: "ai-voice-agents-insurance",
    href: "/industries/ai-voice-agents-insurance",
  },
  {
    image: "/home/carousel/banks.webp",
    title: "Finance & Banking",
    subtitle: "AI Voice Agents for Finance & Banking",
    slug: "ai-voice-agents-finance-banking",
    href: "/industries/ai-voice-agents-finance-banking",
  },
  {
    image: "/home/carousel/real-estate.webp",
    title: "Real Estate",
    subtitle: "AI Voice Agents for Real Estate",
    slug: "ai-voice-agents-real-estate",
    href: "/industries/ai-voice-agents-real-estate",
  },
  {
    image: "/home/carousel/Manufacturing.webp",
    title: "Manufacturing",
    subtitle: "AI Voice Agents for Manufacturing",
    slug: "ai-voice-agents-manufacturing",
    href: "/industries/ai-voice-agents-manufacturing",
  },
  {
    image: "/home/carousel/travel.webp",
    title: "Travel & Tourism",
    subtitle: "AI Voice Agents for Travel & Tourism",
    slug: "ai-voice-agents-travel-tourism",
    href: "/industries/ai-voice-agents-travel-tourism",
  },
  {
    image: "/home/carousel/transportation.webp",
    title: "Transportation & Logistics",
    subtitle: "AI Voice Agents for Transportation & Logistics",
    slug: "ai-voice-agents-transportation-logistics",
    href: "/industries/ai-voice-agents-transportation-logistics",
  },
  {
    image: "/home/carousel/ecommerce.webp",
    title: "Retail & E-commerce",
    subtitle: "AI Voice Agents for Retail & E-commerce",
    slug: "ai-voice-agents-retail-e-commerce",
    href: "/industries/ai-voice-agents-retail-e-commerce",
  },
  {
    image: "/home/carousel/telecommunication.webp",
    title: "Telecommunication",
    subtitle: "AI Voice Agents for Telecommunications",
    slug: "ai-voice-agents-telecommunications",
    href: "/industries/ai-voice-agents-telecommunications",
  },
  {
    image: "/home/carousel/automotive.webp",
    title: "Automotive",
    subtitle: "AI Voice Agents for Automotive",
    slug: "ai-voice-agents-automotive",
    href: "/industries/ai-voice-agents-automotive",
  },
  {
    image: "/home/carousel/education.webp",
    title: "Education",
    subtitle: "AI Voice Agents for Education",
    slug: "ai-voice-agents-education",
    href: "/industries/ai-voice-agents-education",
  },
  {
    image: "/home/carousel/hospitality.webp",
    title: "Hospitality",
    subtitle: "AI Voice Agents for Hospitality",
    slug: "ai-voice-agents-hospitality",
    href: "/industries/ai-voice-agents-hospitality",
  },
] as const;

/** First visible slide - preloaded for faster LCP. */
export const HOME_CAROUSEL_PRELOAD_IMAGE = HOME_CAROUSEL_SLIDES[0]?.image;
