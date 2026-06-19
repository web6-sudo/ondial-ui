"use client";

import Link from "next/link";

import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";

import styles from "./legal-document-section.module.css";

export type LegalDocumentSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  lead?: string;
  bullets?: readonly string[];
  footer?: string;
};

export type LegalDocumentContact = {
  title: string;
  description: string;
  email: string;
  website: string;
  websiteLabel: string;
  responseTime?: string;
  closing?: string;
};

export type LegalDocumentMeta = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated?: string;
};

type LegalDocumentSectionProps = {
  meta: LegalDocumentMeta;
  sections: readonly LegalDocumentSection[];
  contact: LegalDocumentContact;
  titleId: string;
  renderSectionFooter?: (section: LegalDocumentSection) => React.ReactNode;
};

function PolicyBlock({
  section,
  renderFooter,
}: {
  section: LegalDocumentSection;
  renderFooter?: (section: LegalDocumentSection) => React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionHeading}>{section.title}</h2>

      {section.lead ? <p className={styles.bodyText}>{section.lead}</p> : null}

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className={styles.bodyText}>
          {paragraph}
        </p>
      ))}

      {section.bullets ? (
        <ul className={styles.bulletList}>
          {section.bullets.map((bullet) => (
            <li key={bullet} className={styles.bulletItem}>
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}

      {section.footer ? (
        renderFooter ? (
          renderFooter(section)
        ) : (
          <p className={styles.bodyText}>{section.footer}</p>
        )
      ) : null}
    </section>
  );
}

export function LegalDocumentSection({
  meta,
  sections,
  contact,
  titleId,
  renderSectionFooter,
}: LegalDocumentSectionProps) {
  return (
    <section
      className="w-full bg-transparent"
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby={titleId}
    >
      <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-20 sm:px-6 sm:pt-8 sm:pb-24 lg:max-w-4xl">
        <article className={styles.article}>
          <BlogPageHero
            eyebrow={meta.eyebrow}
            title={
              <h1
                id={titleId}
                className="mx-auto max-w-3xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-tight"
              >
                {meta.title}
              </h1>
            }
            description={
              <>
                <p className="m-0 text-pretty text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base lg:text-[1.0625rem] lg:leading-relaxed">
                  {meta.intro}
                </p>
                {meta.lastUpdated ? (
                  <p className={styles.metaLine}>Last updated {meta.lastUpdated}</p>
                ) : null}
              </>
            }
          />

          <div className={styles.articleBody}>
            {sections.map((section) => (
              <PolicyBlock
                key={section.id}
                section={section}
                renderFooter={renderSectionFooter}
              />
            ))}

            <section className={styles.contactSection}>
              <h2 className={styles.sectionHeading}>{contact.title}</h2>
              <p className={styles.bodyText}>{contact.description}</p>
              <div className={styles.contactLinks}>
                <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                  {contact.email}
                </a>
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  {contact.websiteLabel}
                </a>
              </div>
              {contact.responseTime ? (
                <p className={styles.bodyText}>
                  <span className="font-medium text-foreground">Response time:</span>{" "}
                  {contact.responseTime}
                </p>
              ) : null}
              {contact.closing ? (
                <p className={styles.bodyText}>{contact.closing}</p>
              ) : null}
            </section>
          </div>

          <Link href="/" prefetch className={styles.backLink}>
            ← Back to home
          </Link>
        </article>
      </div>
    </section>
  );
}
