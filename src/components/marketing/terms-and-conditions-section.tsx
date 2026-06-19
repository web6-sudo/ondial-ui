"use client";

import { LegalDocumentSection } from "@/components/marketing/legal-document-section";
import {
  TERMS_AND_CONDITIONS_CONTACT,
  TERMS_AND_CONDITIONS_META,
  TERMS_AND_CONDITIONS_SECTIONS,
} from "@/data/terms-and-conditions-content";

export function TermsAndConditionsSection() {
  return (
    <LegalDocumentSection
      titleId="terms-and-conditions-title"
      meta={TERMS_AND_CONDITIONS_META}
      sections={TERMS_AND_CONDITIONS_SECTIONS}
      contact={TERMS_AND_CONDITIONS_CONTACT}
    />
  );
}
