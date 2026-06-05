export const HOME_PROBLEM_HEADING = {
  eyebrow: "The problem",
  tagline: "Manual calls. Missed leads. Burnt-out reps.",
} as const;

export type ProblemCardIllustration =
  | "manual-logging"
  | "call-queues"
  | "inconsistent-script"
  | "scaling-hiring";

export type ProblemCard = {
  id: string;
  badge: string;
  title: string;
  description: string;
  illustration: ProblemCardIllustration;
};

export const HOME_PROBLEM_CARDS: readonly ProblemCard[] = [
  {
    id: "manual-logging",
    badge: "40% time wasted",
    title: "Manual call logging",
    description: "Reps copy notes into spreadsheets instead of selling.",
    illustration: "manual-logging",
  },
  {
    id: "call-queues",
    badge: "62% missed after hours",
    title: "Overwhelmed call queues",
    description: "Customers wait. Leads go cold. Reps burn out.",
    illustration: "call-queues",
  },
  {
    id: "inconsistent-script",
    badge: "Brand at risk",
    title: "No consistent script",
    description: "Every rep sounds different. Trust erodes quietly.",
    illustration: "inconsistent-script",
  },
  {
    id: "scaling-hiring",
    badge: "$0 ROI from headcount",
    title: "Scaling = more hiring",
    description: "Costs climb. Call quality stays exactly the same.",
    illustration: "scaling-hiring",
  },
] as const;
