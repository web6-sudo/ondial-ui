"use client";

import { LegalDocumentSection } from "@/components/marketing/legal-document-section";
import {
  PRIVACY_POLICY_CONTACT,
  PRIVACY_POLICY_META,
  PRIVACY_POLICY_SECTIONS,
} from "@/data/privacy-policy-content";

export function PrivacyPolicySection() {
  return (
    <LegalDocumentSection
      titleId="privacy-policy-title"
      meta={PRIVACY_POLICY_META}
      sections={PRIVACY_POLICY_SECTIONS}
      contact={PRIVACY_POLICY_CONTACT}
      renderSectionFooter={(section) => {
        if (!section.footer) return null;

        if (
          section.id === "privacy-rights" &&
          section.footer.includes("contact@ondial.ai")
        ) {
          return (
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              To exercise your rights, please contact us at{" "}
              <a
                href="mailto:contact@ondial.ai"
                className="font-medium text-[#534AB7] underline-offset-4 hover:text-[#463E9E] hover:underline"
              >
                contact@ondial.ai
              </a>
            </p>
          );
        }

        return (
          <p className="mt-4 text-base leading-7 text-muted-foreground">{section.footer}</p>
        );
      }}
    />
  );
}
