import type { NavMenuKind } from "@/config/nav-menus";

export type MainNavItem = {
  href: string;
  label: string;
  menu?: NavMenuKind;
};

export const MAIN_NAV: readonly MainNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", menu: "services" },
  { href: "/industries", label: "Industries", menu: "industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Resources", menu: "resources" },
  { href: "/login", label: "Login" },
] as const;
