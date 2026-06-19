import type { NavMenuKind } from "@/config/nav-menus";
import { INDUSTRIES_NAV_ITEMS } from "@/config/industries-nav";
import { DASHBOARD_LOGIN_URL } from "@/config/urls";

export type MainNavItem = {
  href: string;
  label: string;
  menu?: NavMenuKind;
};

export const MAIN_NAV: readonly MainNavItem[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", menu: "services" },
  { href: INDUSTRIES_NAV_ITEMS[0]?.href ?? "/pricing", label: "Industries", menu: "industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Resources", menu: "resources" },
  { href: DASHBOARD_LOGIN_URL, label: "Login" },
] as const;
