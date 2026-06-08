"use client";

import { motion, useReducedMotion } from "framer-motion";

import styles from "./supported-languages-section.module.css";

const BARS = [
  16, 32, 40, 24, 36, 16, 44, 28, 12, 36, 24, 40, 20, 32, 48, 24, 16, 36, 44, 20,
  32, 40, 16, 28, 44, 24, 12, 36, 40, 24, 32, 44, 20, 36, 28, 16, 40,
] as const;

const BAR_COLORS = ["#3C3489", "#534AB7", "#7F77DD", "#AFA9EC"] as const;

function barColor(index: number) {
  if (index % 5 === 0) return BAR_COLORS[0];
  if (index % 3 === 0) return BAR_COLORS[1];
  if (index % 2 === 0) return BAR_COLORS[2];
  return BAR_COLORS[3];
}

type LanguagesVoiceWaveformProps = {
  playing?: boolean;
  languageKey?: string;
};

export function LanguagesVoiceWaveform({
  playing = false,
  languageKey = "default",
}: LanguagesVoiceWaveformProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.svg
      key={languageKey}
      className={styles.waveform}
      viewBox="0 0 300 52"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {BARS.map((height, index) => {
        const x = 2 + index * 8;
        const y = 26 - height / 2;
        const fill = barColor(index);
        const centerY = 26;

        if (prefersReducedMotion) {
          return (
            <rect key={index} x={x} y={y} width={4} height={height} rx={2} fill={fill} opacity={0.92} />
          );
        }

        if (playing) {
          return (
            <motion.rect
              key={index}
              x={x}
              width={4}
              rx={2}
              fill={fill}
              initial={{ height, y }}
              animate={{
                height: [height, height * 1.38, height * 0.72, height * 1.18, height],
                y: [
                  centerY - height / 2,
                  centerY - (height * 1.38) / 2,
                  centerY - (height * 0.72) / 2,
                  centerY - (height * 1.18) / 2,
                  centerY - height / 2,
                ],
              }}
              transition={{
                duration: 0.85,
                repeat: Infinity,
                delay: index * 0.035,
                ease: "easeInOut",
              }}
            />
          );
        }

        return (
          <motion.rect
            key={index}
            x={x}
            width={4}
            rx={2}
            fill={fill}
            initial={{ height, y, opacity: 0.55 }}
            animate={{
              height: [height, height * 1.12, height],
              y: [centerY - height / 2, centerY - (height * 1.12) / 2, centerY - height / 2],
              opacity: [0.55, 0.92, 0.55],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: index * 0.05,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </motion.svg>
  );
}
