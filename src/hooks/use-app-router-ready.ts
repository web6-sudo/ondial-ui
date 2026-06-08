"use client";

import { useEffect, useState } from "react";

/**
 * Becomes true after hydration when the App Router action queue is initialized.
 * Use to gate Link prefetch and avoid dev/HMR "Router action dispatched before initialization".
 */
export function useAppRouterReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setReady(true);
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, []);

  return ready;
}
