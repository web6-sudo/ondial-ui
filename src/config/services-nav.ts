export type ServiceNavItem = {
  href: string;
  label: string;
  slug: string;
};

export const SERVICES_NAV_ITEMS: readonly ServiceNavItem[] = [
  { href: "/services/sales-agent", label: "Sales Agent", slug: "sales-agent" },
  {
    href: "/services/customer-support-agent",
    label: "Customer Support Agent",
    slug: "customer-support-agent",
  },
  { href: "/services/recruitment-agent", label: "Recruitment Agent", slug: "recruitment-agent" },
  { href: "/services/finance-agent", label: "Finance Agent", slug: "finance-agent" },
] as const;

export const SERVICES_OVERVIEW_HREF = "/services";
