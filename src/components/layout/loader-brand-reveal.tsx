import Image from "next/image";
import { forwardRef } from "react";

import { LOADER_BRAND_IMAGES } from "@/data/loader-brand-images";

import styles from "./progressive-loader.module.css";

const START_LETTERS = ["O", "n"] as const;
const END_LETTERS = ["D", "i", "a", "l"] as const;

type LoaderBrandRevealProps = {
  className?: string;
};

export const LoaderBrandReveal = forwardRef<HTMLDivElement, LoaderBrandRevealProps>(
  function LoaderBrandReveal({ className }, ref) {
    return (
      <div ref={ref} className={className} data-loader-brand-root aria-hidden>
        <div className={styles.brandHeading}>
          <div className={styles.headingStart} data-loader-heading-start>
            {START_LETTERS.map((letter) => (
              <span key={letter} className={styles.letterMask}>
                <span className={styles.letter} data-loader-letter>
                  {letter}
                </span>
              </span>
            ))}
          </div>

          <div className={styles.loaderBox} data-loader-box>
            <div className={styles.loaderBoxInner}>
              <div className={styles.growingImage} data-loader-growing-image>
                <div className={styles.growingImageWrap}>
                  {LOADER_BRAND_IMAGES.extras.map((src, index) => (
                    <Image
                      key={src}
                      src={src}
                      alt=""
                      fill
                      sizes="20vw"
                      className={styles.coverImageExtra}
                      data-loader-cover-extra
                      style={{ zIndex: 3 - index }}
                      priority
                    />
                  ))}
                  <Image
                    src={LOADER_BRAND_IMAGES.main}
                    alt=""
                    fill
                    sizes="20vw"
                    className={styles.coverImage}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.headingEnd} data-loader-heading-end>
            {END_LETTERS.map((letter) => (
              <span key={letter} className={styles.letterMask}>
                <span className={styles.letter} data-loader-letter>
                  {letter}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
);
