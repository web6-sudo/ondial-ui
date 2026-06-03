/** Shared background for all marketing / homepage sections. */
export const marketingSectionBgClass = "bg-background";

/** Shared max-width + horizontal padding for homepage marketing sections. */
export const marketingSectionContainerClass =
  "mx-auto w-full max-w-[min(100%,92rem)] px-5 sm:px-8 lg:px-12 xl:px-14";

/** Standard padded marketing section shell (width + background, no dividers). */
export const marketingSectionShellClass = `w-full ${marketingSectionBgClass} py-14 sm:py-16 lg:py-20`;

/** Pill eyebrow used on hero, integrations, split sections, etc. */
export const marketingEyebrowClass =
  "inline-block rounded-full border border-border/60 bg-transparent px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground";
