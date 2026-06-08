export type ResourceNavItem = {
  href: string;
  label: string;
  slug: string;
};

export const RESOURCES_NAV_ITEMS: readonly ResourceNavItem[] = [
  { href: "/blog", label: "Blogs", slug: "blog" },
  { href: "/news", label: "News", slug: "news" },
  { href: "/case-studies", label: "Case Studies", slug: "case-studies" },
  { href: "/contact", label: "Contact Us", slug: "contact" },
  { href: "/about", label: "About", slug: "about" },
] as const;

export const RESOURCES_OVERVIEW_HREF = "/blog";
