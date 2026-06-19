"use client";

import { LegalDocumentSection } from "@/components/marketing/legal-document-section";
import {
  RETURN_POLICY_CONTACT,
  RETURN_POLICY_META,
  RETURN_POLICY_SECTIONS,
} from "@/data/return-policy-content";

export function ReturnPolicySection() {
  return (
    <LegalDocumentSection
      titleId="return-policy-title"
      meta={RETURN_POLICY_META}
      sections={RETURN_POLICY_SECTIONS}
      contact={RETURN_POLICY_CONTACT}
    />
  );
}
