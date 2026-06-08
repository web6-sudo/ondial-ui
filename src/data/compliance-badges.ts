export const COMPLIANCE_HEADING = {
  eyebrow: "Compliance & security",
  titleLead: "Trust built for",
  titleAccent: "AI voice agents",
  description:
    "Calling agents handle sensitive conversations—compliance is a top objection, especially in healthcare and finance. Ondial meets the standards your buyers ask about first.",
  footnote:
    "AI-specific controls for voice transcripts, call recordings, and agent workflows—so regulated teams can deploy with confidence.",
} as const;

export type ComplianceBadgeId = "hipaa" | "gdpr" | "pci-dss" | "soc-2";

export type ComplianceBadge = {
  id: ComplianceBadgeId;
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
