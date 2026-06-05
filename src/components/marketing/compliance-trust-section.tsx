import { ShieldCheck } from "lucide-react";

import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import { COMPLIANCE_BADGES, COMPLIANCE_HEADING } from "@/data/compliance-badges";
import { cn } from "@/lib/utils";

export function ComplianceTrustSection() {
  return (
    <section
      id="compliance"
      className={cn(
        marketingSectionShellClass,
        "border-y border-border/60 bg-muted/25",
      )}
      aria-labelledby="compliance-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={cn("mb-4", marketingEyebrowClass)}>{COMPLIANCE_HEADING.eyebrow}</p>
          <h2
            id="compliance-title"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]"
          >
            {COMPLIANCE_HEADING.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {COMPLIANCE_HEADING.description}
          </p>
        </header>

        <ul
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4 lg:gap-5"
          aria-label="Compliance and security standards"
        >
          {COMPLIANCE_BADGES.map((badge) => (
            <li key={badge.id}>
              <div
                className={cn(
                  "flex h-full flex-col items-center rounded-2xl border border-border/70 bg-background px-4 py-5 text-center shadow-sm",
                  "transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-md",
                  "sm:px-5 sm:py-6",
                )}
              >
                <span
                  className="mb-3 flex size-11 items-center justify-center rounded-xl border border-border/60 bg-muted/50 text-foreground sm:size-12"
                  aria-hidden
                >
                  <ShieldCheck className="size-5 sm:size-6" strokeWidth={1.75} />
                </span>
                <p className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {badge.label}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {badge.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
          AI-specific controls for voice transcripts, call recordings, and agent workflows—so
          regulated teams can deploy with confidence.
        </p>
      </div>
    </section>
  );
}
