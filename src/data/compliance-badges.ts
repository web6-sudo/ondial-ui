export const COMPLIANCE_HEADING = {
  eyebrow: "Compliance & security",
  title: "Trust built for AI voice agents",
  description:
    "Calling agents handle sensitive conversations—compliance is a top objection, especially in healthcare and finance. This dedicated trust strip shows how Ondial meets the standards your buyers ask about first.",
} as const;

export type ComplianceBadge = {
  id: string;
  label: string;
  detail: string;
};

export const COMPLIANCE_BADGES: readonly ComplianceBadge[] = [
  {
    id: "hipaa",
    label: "HIPAA",
    detail: "Protected health information on every call",
  },
  {
    id: "gdpr",
    label: "GDPR",
    detail: "Privacy-by-design for EU data subjects",
  },
  {
    id: "pci-dss",
    label: "PCI DSS",
    detail: "Secure handling of payment conversations",
  },
  {
    id: "soc-2",
    label: "SOC 2",
    detail: "Audited security, availability & confidentiality",
  },
] as const;
