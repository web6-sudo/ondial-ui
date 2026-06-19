"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useRef } from "react";

import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";
import { MarketingDotBackground } from "@/components/layout/marketing-dot-background";
import { TextReveal } from "@/components/ui/text-reveal";
import { AppLink as Link } from "@/components/ui/app-link";
import {
  FOOTER_BRAND_TAGLINE,
  FOOTER_COMPANY_LINKS,
  FOOTER_CONTACT_EMAIL,
  FOOTER_LEGAL_LINKS,
  FOOTER_PLATFORM_LINKS,
  FOOTER_SOCIAL_LINKS,
  type FooterNavLink,
} from "@/config/footer";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

import styles from "./marketing-site-footer.module.css";

const MotionLink = motion.create(Link);

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function FooterLink({ item }: { item: FooterNavLink }) {
  const prefersReducedMotion = useReducedMotion();
  const className = cn(styles.link, item.external && styles.linkExternal);

  if (item.external) {
    return (
      <motion.a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        whileHover={prefersReducedMotion ? undefined : { x: 2 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <span className={styles.linkLabel}>{item.label}</span>
        <ArrowUpRight className={styles.linkArrow} aria-hidden />
      </motion.a>
    );
  }

  return (
    <MotionLink
      href={item.href}
      prefetch
      className={className}
      whileHover={prefersReducedMotion ? undefined : { x: 3 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <span className={styles.linkLabel}>{item.label}</span>
    </MotionLink>
  );
}

function FooterNavColumn({
  title,
  links,
  ariaLabel,
  className,
}: {
  title: string;
  links: readonly FooterNavLink[];
  ariaLabel: string;
  className?: string;
}) {
  return (
    <motion.nav
      className={className}
      aria-label={ariaLabel}
      variants={columnVariants}
    >
      <TextReveal as="p" className={styles.columnTitle} delay={0.04} stagger={0.05}>
        {title}
      </TextReveal>
      <ul className={styles.linkList}>
        {links.map((item) => (
          <li key={item.href}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

export type MarketingSiteFooterProps = {
  className?: string;
  /** @deprecated CTA card removed — kept for API compatibility. */
  showCtaCard?: boolean;
};

export function MarketingSiteFooter({ className }: MarketingSiteFooterProps) {
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });
  const showColumns = prefersReducedMotion || footerInView;

  return (
    <footer ref={footerRef} className={cn(styles.footer, className)}>
      <motion.div
        className={styles.dotLayer}
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={showColumns ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <MarketingDotBackground animated layered className="inset-0" dotClassName="text-foreground/10" />
      </motion.div>

      <div className={styles.footerGlow} aria-hidden />

      <motion.div
        className={styles.watermark}
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={showColumns ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <span className={styles.watermarkText}>ONDIAL</span>
      </motion.div>

      <div className={styles.inner}>
        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate={showColumns ? "visible" : "hidden"}
        >
          <motion.div className={styles.brandCol} variants={columnVariants}>
            <Link href="/" prefetch className={styles.brandMark}>
              <Image src="/fav.svg" alt="" width={32} height={32} className="size-8" loading="lazy" />
              <span className={styles.brandName}>{APP_NAME}</span>
            </Link>
            <p className={styles.tagline}>{FOOTER_BRAND_TAGLINE}</p>
            <motion.a
              href={`mailto:${FOOTER_CONTACT_EMAIL}`}
              className={styles.contactEmail}
              whileHover={prefersReducedMotion ? undefined : { x: 2 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Mail className={styles.contactEmailIcon} aria-hidden strokeWidth={2} />
              <span>{FOOTER_CONTACT_EMAIL}</span>
            </motion.a>
            <div className={styles.newsletterWrap}>
              <FooterNewsletterForm />
            </div>
            <TextReveal as="p" className={styles.copyright} delay={0.1} stagger={0.04}>
              {`© ${year} ${APP_NAME}. All rights reserved.`}
            </TextReveal>
          </motion.div>

          <FooterNavColumn
            title="Company"
            links={FOOTER_COMPANY_LINKS}
            ariaLabel="Company links"
          />

          <FooterNavColumn
            title="Platform"
            links={FOOTER_PLATFORM_LINKS}
            ariaLabel="Platform links"
          />

          <FooterNavColumn
            title="Social"
            links={FOOTER_SOCIAL_LINKS}
            ariaLabel="Social links"
          />

          <FooterNavColumn title="Legal" links={FOOTER_LEGAL_LINKS} ariaLabel="Legal links" />
        </motion.div>
      </div>
    </footer>
  );
}
