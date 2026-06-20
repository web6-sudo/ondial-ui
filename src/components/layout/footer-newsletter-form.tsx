"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { FOOTER_NEWSLETTER } from "@/config/footer";
import { cn } from "@/lib/utils";

import styles from "./marketing-site-footer.module.css";

type FooterNewsletterFormProps = {
  className?: string;
};

export function FooterNewsletterForm({ className }: FooterNewsletterFormProps) {
  const prefersReducedMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.p
        className={cn(styles.newsletterSuccess, className)}
        role="status"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        Thanks-you&apos;re on the list. We&apos;ll be in touch soon.
      </motion.p>
    );
  }

  return (
    <form
      className={cn(styles.newsletterForm, focused && styles.newsletterFormFocused, className)}
      onSubmit={handleSubmit}
    >
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email for newsletter
      </label>
      <input
        id="footer-newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={FOOTER_NEWSLETTER.placeholder}
        className={styles.newsletterInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <motion.button
        type="submit"
        className={styles.newsletterButton}
        aria-label={FOOTER_NEWSLETTER.buttonLabel}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
      >
        <motion.span
          className={styles.newsletterButtonIcon}
          aria-hidden
          initial={false}
          whileHover={prefersReducedMotion ? undefined : { x: 2 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
        >
          <ArrowRight className="size-4" strokeWidth={2.25} />
        </motion.span>
      </motion.button>
    </form>
  );
}
