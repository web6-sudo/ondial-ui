import type { CSSProperties, JSX } from "react";
import { Phone } from "lucide-react";

import styles from "@/components/marketing/home-problem-chart.module.css";
import type { ProblemCardIllustration } from "@/data/home-problem-content";
import { cn } from "@/lib/utils";

type IllustrationProps = {
  className?: string;
};

/** Outer mini-card — same footprint in every problem card image slot. */
const illustrationFrameClass =
  "flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[10px] border shadow-[0_2px_10px_-4px_rgba(15,23,42,0.12)]";

/** Main content area below optional header/footer chrome. */
const illustrationBodyClass = "flex min-h-0 flex-1 flex-col";

/** Mini browser window — manual progress rows + “Manual” badge. */
function ManualLoggingIllustration({ className }: IllustrationProps) {
  const rows = [
    { fill: "w-[72%]", color: "bg-[hsl(262_83%_58%)]", badge: "Manual" },
    { fill: "w-[42%]", color: "bg-[#f4956b]" },
    { fill: "w-0", color: "" },
    { fill: "w-[58%]", color: "bg-[hsl(262_83%_72%)]" },
  ] as const;

  return (
    <div
      className={cn(illustrationFrameClass, "border-[#e8e4dc] bg-white", className)}
      aria-hidden
    >
      <div className="flex shrink-0 items-center gap-1.5 border-b border-[#efefef] bg-[#f7f7f5] px-2.5 py-1.5">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
      </div>
      <div className={cn(illustrationBodyClass, "justify-center gap-2 px-2.5 py-2")}>
        {rows.map((row, i) => (
          <div key={i} className="relative h-2.5 shrink-0 rounded-full bg-[#eceae6]">
            {row.color ? (
              <div className={cn("absolute inset-y-0 left-0 rounded-full", row.color, row.fill)} />
            ) : null}
            {"badge" in row && row.badge ? (
              <span className="absolute -right-0.5 top-1/2 -translate-y-1/2 rounded-full bg-[#fde8e8] px-1.5 py-0.5 text-[7px] font-semibold leading-none text-[#9b1c1c]">
                {row.badge}
              </span>
            ) : null}
          </div>
        ))}
        <div className="h-2.5 shrink-0 rounded-full bg-[#eceae6]" />
      </div>
    </div>
  );
}

/** Call queue hub — on-hold circle, phone icon, busy reps. */
function CallQueuesIllustration({ className }: IllustrationProps) {
  const reps = ["Rep 1", "Rep 2", "Rep 3"];

  return (
    <div
      className={cn(illustrationFrameClass, "border-[#f0ddd6] bg-[#fff5f2]", className)}
      aria-hidden
    >
      <div className="flex h-full min-h-0 flex-col items-center px-2.5 py-3">
        <span className="shrink-0 rounded-full border border-[#e8c4bc] bg-white px-3 py-1.5 text-[8px] font-semibold leading-none text-[#b24c3d] shadow-sm">
          18 calls waiting
        </span>

        <div className="flex w-full max-w-[210px] min-h-0 flex-1 flex-col items-center justify-evenly gap-3 py-2">
          <div className="flex size-16 flex-col items-center justify-center rounded-full border-2 border-[#c45c4a] bg-white shadow-sm">
            <span className="text-[7.5px] font-bold tracking-[0.14em] text-[#b24c3d]">ON HOLD</span>
            <Phone className="mt-1 size-4 text-[#b24c3d]" strokeWidth={2.25} />
          </div>

          <svg
            className="h-7 w-full max-w-[188px] shrink-0"
            viewBox="0 0 188 28"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <path
              d="M94 0 L28 26 M94 0 L94 26 M94 0 L160 26"
              stroke="#c45c4a"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid w-full grid-cols-3 gap-2">
            {reps.map((rep) => (
              <div
                key={rep}
                className="rounded-lg border border-[#e7e5e4] bg-white px-1 py-2.5 text-center shadow-sm"
              >
                <p className="text-[8px] font-semibold leading-tight text-[#44403c]">{rep}</p>
                <p className="mt-1 text-[8.5px] font-bold leading-none text-[#b24c3d]">Busy</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Side-by-side rep scripts with overlapping “Inconsistent!” badge. */
function InconsistentScriptIllustration({ className }: IllustrationProps) {
  const repA = [
    { w: "w-[88%]", active: true },
    { w: "w-[62%]", active: false },
    { w: "w-[78%]", active: true },
    { w: "w-[52%]", active: false },
    { w: "w-[70%]", active: true },
  ];
  const repB = [
    { w: "w-[55%]", active: true },
    { w: "w-[82%]", active: true },
    { w: "w-[48%]", active: false },
    { w: "w-[68%]", active: false },
    { w: "w-[74%]", active: true },
  ];

  return (
    <div
      className={cn(illustrationFrameClass, "relative border-[#e8e4dc] bg-white", className)}
      aria-hidden
    >
      <div className={cn(illustrationBodyClass, "p-2")}>
        <div className="relative grid h-full min-h-0 grid-cols-2 gap-1.5">
          <ScriptCard
            label="Rep A"
            headerClass="bg-[#ede9fe] text-[#6d28d9]"
            bars={repA}
            accent="bg-[#8b5cf6]"
          />
          <ScriptCard
            label="Rep B"
            headerClass="bg-[#ffedd5] text-[#c2410c]"
            bars={repB}
            accent="bg-[#f97316]"
          />
          <span className="absolute left-1/2 top-[52%] z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-[#fecaca] bg-[#fff1f2] px-1.5 py-0.5 text-[7.5px] font-bold text-[#be123c] shadow-sm">
            Inconsistent!
          </span>
        </div>
      </div>
    </div>
  );
}

function ScriptCard({
  label,
  headerClass,
  bars,
  accent,
}: {
  label: string;
  headerClass: string;
  bars: { w: string; active: boolean }[];
  accent: string;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-md border border-[#eceae6] bg-white">
      <div className={cn("shrink-0 px-1.5 py-1 text-center text-[7.5px] font-bold", headerClass)}>
        {label}
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 px-1.5 py-1.5">
        {bars.map((bar, i) => (
          <div key={i} className="h-1.5 shrink-0 rounded-full bg-[#eceae6]">
            {bar.active ? <div className={cn("h-full rounded-full", accent, bar.w)} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Hiring cost chart — rising bars, flat quality line (animated). */
function ScalingHiringIllustration({ className }: IllustrationProps) {
  const qualityRatio = 0.34;

  const bars = [
    { label: "Y1", h: 0.34, fill: "#c4b5fd" },
    { label: "Y2", h: 0.5, fill: "#a78bfa" },
    { label: "Y3", h: 0.64, fill: "#8b5cf6" },
    { label: "Y4", h: 0.78, fill: "#6d28d9" },
    { label: "Y5", h: 0.94, fill: "#1e3a5f" },
  ] as const;

  const gridLines = [0, 0.5, 1];

  return (
    <div
      className={cn(illustrationFrameClass, "border-[#e8e4dc] bg-white", className)}
      aria-hidden
    >
      <div className="flex min-h-0 flex-1 flex-col px-2 pt-1.5 pb-1">
        <div className="flex min-h-0 flex-1 gap-1.5">
          <div className="flex w-4 shrink-0 flex-col justify-between self-stretch text-[6.5px] font-medium leading-none tabular-nums text-[#a8a29e]">
            <span>$$$</span>
            <span>$$</span>
            <span>$</span>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="relative min-h-0 flex-1">
              {gridLines.map((ratio) => (
                <div
                  key={ratio}
                  className="pointer-events-none absolute inset-x-0 border-t border-[#f0eeea]"
                  style={{ bottom: `${ratio * 100}%` }}
                />
              ))}

              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 z-10 border-t-[1.5px] border-[#e11d48]",
                  styles.lineTrack,
                )}
                style={{ bottom: `${qualityRatio * 100}%` }}
              />

              <div
                className="pointer-events-none absolute inset-x-0 z-20 flex justify-between"
                style={{ bottom: `calc(${qualityRatio * 100}% - 6px)` }}
              >
                {bars.map((_, i) => (
                  <div key={i} className="flex flex-1 justify-center">
                    <span
                      className={cn(
                        "flex size-3 items-center justify-center rounded-full bg-white ring-[1.5px] ring-[#e11d48]",
                        styles.dot,
                      )}
                      style={{ animationDelay: `${0.55 + i * 0.07}s` }}
                    >
                      <span className="size-1.5 rounded-full bg-[#e11d48]" />
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 flex items-end justify-between gap-1">
                {bars.map((bar, i) => (
                  <div key={bar.label} className="flex h-full min-w-0 flex-1 items-end justify-center">
                    <div
                      className={cn("w-[82%] max-w-[38px] rounded-t-full", styles.bar)}
                      style={{
                        height: `${bar.h * 100}%`,
                        backgroundColor: bar.fill,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-1 flex shrink-0 justify-between gap-0.5 border-t border-[#f5f3ef] pt-1">
              {bars.map((bar) => (
                <span
                  key={bar.label}
                  className="min-w-0 flex-1 text-center text-[6.5px] font-medium text-[#78716c]"
                >
                  {bar.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-1 border-t border-[#f0eeea] px-2 py-1">
        <span
          className={cn(
            "rounded-full bg-[#fff1f2] px-2 py-0.5 text-[6.5px] font-semibold leading-none text-[#be123c]",
            styles.legend,
          )}
          style={{ animationDelay: "0.75s" }}
        >
          Hiring cost
        </span>
        <span
          className={cn(
            "rounded-full bg-[#fef9c3] px-2 py-0.5 text-[6.5px] font-semibold leading-none text-[#92400e]",
            styles.legend,
          )}
          style={{ animationDelay: "0.9s" }}
        >
          Cost ↑ Quality flat →
        </span>
      </div>
    </div>
  );
}

const illustrationMap: Record<
  ProblemCardIllustration,
  (props: IllustrationProps) => JSX.Element
> = {
  "manual-logging": ManualLoggingIllustration,
  "call-queues": CallQueuesIllustration,
  "inconsistent-script": InconsistentScriptIllustration,
  "scaling-hiring": ScalingHiringIllustration,
};

export function ProblemCardIllustration({
  type,
  className,
}: {
  type: ProblemCardIllustration;
  className?: string;
}) {
  const Component = illustrationMap[type];

  return (
    <div className={cn("size-full min-h-0", className)}>
      <Component className="h-full min-h-0 w-full" />
    </div>
  );
}

export const problemSectionAccentStyle = {
  "--section-accent-h": "262",
  "--section-accent-s": "83%",
  "--section-accent-l": "58%",
} as CSSProperties;
