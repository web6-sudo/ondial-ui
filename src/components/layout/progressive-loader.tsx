"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { runLoadProgress, runNavigationProgress } from "@/lib/loading-progress";

import styles from "./progressive-loader.module.css";

const MIN_VISIBLE_MS = 1200;
const MIN_COUNTER_RAMP_MS = 2400;
const MAX_WAIT_MS = 14000;

const NAV_MIN_VISIBLE_MS = 700;
const NAV_MIN_COUNTER_RAMP_MS = 1400;
const NAV_MAX_WAIT_MS = 10000;

const EXIT_DURATION_S = 0.8;
const COUNTER_COMPLETE_HOLD_MS = 280;

const smoothEase = [0.22, 1, 0.36, 1] as const;

/** No entry — panel exits upward smoothly. */
const overlayExitVariants = {
  exit: {
    y: "-100%",
    transition: { duration: EXIT_DURATION_S, ease: smoothEase },
  },
};

const overlayExitReduced = {
  exit: {
    opacity: 0,
    transition: { duration: 0.45, ease: smoothEase },
  },
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function ProgressiveLoader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [barProgress, setBarProgress] = useState(0);
  const [show, setShow] = useState(true);
  const loadCountRef = useRef(0);
  const displayRef = useRef(0);
  const loadProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isNavigation = loadCountRef.current > 0;
    loadCountRef.current += 1;

    const minVisibleMs = isNavigation ? NAV_MIN_VISIBLE_MS : MIN_VISIBLE_MS;
    const minCounterRampMs = isNavigation ? NAV_MIN_COUNTER_RAMP_MS : MIN_COUNTER_RAMP_MS;
    const maxWaitMs = isNavigation ? NAV_MAX_WAIT_MS : MAX_WAIT_MS;
    const runProgress = isNavigation ? runNavigationProgress : runLoadProgress;

    setShow(true);
    setProgress(0);
    setBarProgress(0);
    displayRef.current = 0;
    loadProgressRef.current = 0;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cancelled = false;
    let finishRequested = false;
    let counterComplete = false;
    const startedAt = performance.now();

    const requestHide = () => {
      if (cancelled || !counterComplete) return;
      const elapsed = performance.now() - startedAt;
      const waitBeforeHide = Math.max(0, minVisibleMs - elapsed);

      window.setTimeout(() => {
        if (!cancelled) {
          setShow(false);
        }
      }, waitBeforeHide);
    };

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const timeCap = easeOutCubic(Math.min(1, elapsed / minCounterRampMs)) * 96;
      const loadCap = loadProgressRef.current;

      let target = Math.max(timeCap, loadCap);
      if (finishRequested) {
        target = 100;
      } else {
        target = Math.min(target, 99);
      }
      const current = displayRef.current;
      const delta = target - current;
      let next = current;

      if (Math.abs(delta) < 0.15) {
        next = target;
      } else {
        const step = Math.max(0.22, Math.min(delta * 0.11, 1.35));
        next = current + step;
      }

      displayRef.current = next;
      const rounded = Math.min(100, Math.round(next));
      setProgress(rounded);
      setBarProgress(Math.min(100, next));

      if (finishRequested && rounded >= 100 && !counterComplete) {
        counterComplete = true;
        window.setTimeout(requestHide, COUNTER_COMPLETE_HOLD_MS);
      }

      if (!cancelled) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const finish = () => {
      if (cancelled || finishRequested) return;
      finishRequested = true;
      loadProgressRef.current = 100;
    };

    void runProgress((value) => {
      loadProgressRef.current = value;
    })
      .then(finish)
      .catch(finish);

    const timeoutId = window.setTimeout(finish, maxWaitMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      document.body.style.overflow = previousOverflow;
    };
  }, [pathname]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {show ? (
        <motion.div
          key={`progressive-loader-${pathname}`}
          className={styles.overlay}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-busy
          aria-label="Loading page"
          initial={false}
          variants={prefersReducedMotion ? overlayExitReduced : overlayExitVariants}
          exit="exit"
        >
          <div className={styles.footer}>
            <div className={styles.bottomRow}>
              <span className={styles.counter}>{progress}</span>
            </div>

            <div className={styles.progressTrack} aria-hidden>
              <motion.div
                className={styles.progressFill}
                initial={false}
                animate={{ scaleX: barProgress / 100 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.35,
                  ease: smoothEase,
                }}
                style={{ transformOrigin: "left center" }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
