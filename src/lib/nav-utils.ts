import type { MainNavItem } from "@/config/navigation";
import { navMenuChildHrefs } from "@/config/nav-menus";

export function navItemIsActive(pathname: string, item: MainNavItem): boolean {
  if (item.href === "/") return pathname === "/";

  if (item.menu) {
    const children = navMenuChildHrefs(item.menu);
    if (children.some((href) => pathname === href || pathname.startsWith(`${href}/`))) {
      return true;
    }
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}
