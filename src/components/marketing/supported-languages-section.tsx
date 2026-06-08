import Image from "next/image";

import { TextReveal } from "@/components/ui/text-reveal";
import { marketingEyebrowClass } from "@/config/marketing-layout";
import { cn } from "@/lib/utils";
import {
  flagImageUrl,
  getLanguageRows,
  SUPPORTED_LANGUAGES,
} from "@/lib/languages-data";

import styles from "./supported-languages-section.module.css";

export function SupportedLanguagesSection() {
  const rows = getLanguageRows(SUPPORTED_LANGUAGES);

  return (
    <section id="languages" className={styles.section} aria-label="Supported languages">
      <header className={styles.header}>
        <p className={cn(marketingEyebrowClass, styles.eyebrowSpacing)}>Global coverage</p>
        <TextReveal as="h2" className={styles.title}>
          Languages We Support
        </TextReveal>
        <p className={styles.description}>
          Reach customers in their local language with natural AI voice conversations.
        </p>
      </header>

      <div className={styles.marquee}>
        {rows.map((row, rowIndex) => (
          <div
            key={`language-row-${rowIndex}`}
            className={styles.rowViewport}
            aria-label={`Supported languages row ${rowIndex + 1}`}
          >
            <ul className={`${styles.rowTrack} ${rowIndex % 2 === 0 ? styles.left : styles.right}`}>
              {[...row, ...row].map((item, itemIndex) => (
                <li
                  key={`${item.code}-${itemIndex}`}
                  className={styles.pill}
                  aria-hidden={itemIndex >= row.length}
                >
                  <Image
                    src={flagImageUrl(item.countryCode)}
                    alt={itemIndex < row.length ? `${item.country} flag` : ""}
                    width={42}
                    height={42}
                    sizes="42px"
                    className={styles.avatar}
                    loading="lazy"
                  />
                  <span className={styles.copy}>
                    <span className={styles.country}>{item.country}</span>
                    <span className={styles.language}>{item.language}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
