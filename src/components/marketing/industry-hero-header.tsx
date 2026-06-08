import type { IndustryHeroContent } from "@/data/industry-hero-content";
import { Globe } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import type { CSSProperties } from "react";

import styles from "./industry-hero-header.module.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
});

type IndustryHeroHeaderProps = IndustryHeroContent;

export function IndustryHeroHeader({
  title,
  highlight,
  subtitle,
  backgroundImage,
  foregroundImage,
}: IndustryHeroHeaderProps) {
  return (
    <section className={`${styles.section} ${bebasNeue.variable}`}>
      <div className={styles.body}>
        <Link href="/industries" className={styles.backLink} prefetch>
          ← All industries
        </Link>
      </div>

      <article className={styles.hero} aria-label={`${highlight} hero`}>
        {/* assets: sky → title → tower (exact reference order) */}
        <div className={styles.assets}>
          <img src={backgroundImage} alt="" draggable={false} />
          <h1>{title}</h1>
          <img src={foregroundImage} alt="" draggable={false} />
        </div>

        {/* blur: 5 backdrop-filter layers, CSS sin() — exact reference */}
        <div className={styles.blur} aria-hidden>
          <div>
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={styles.layer}
                style={{ "--index": index } as CSSProperties}
              />
            ))}
          </div>
        </div>

        {/* content: globe icon + industry name + subtitle */}
        <div className={styles.content}>
          <p className={styles.contentRow}>
            <Globe className={styles.icon} aria-hidden />
            <span>{highlight}</span>
          </p>
          <p className={styles.contentRow}>{subtitle}</p>
        </div>
      </article>
    </section>
  );
}
