"use client";

import dynamic from "next/dynamic";

export const IntegrationsOrbitClient = dynamic(
  () =>
    import("@/components/marketing/integrations-orbit-visual").then(
      (mod) => mod.IntegrationsOrbitVisual,
    ),
  { ssr: false },
);
