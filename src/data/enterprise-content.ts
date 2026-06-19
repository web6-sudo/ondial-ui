export type EnterpriseCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type EnterpriseStatTile = {
  id: string;
  value: string;
  label: string;
};

export type EnterpriseCard = {
  id: string;
  title: string;
  description: string;
};

export type EnterprisePill = {
  id: string;
  label: string;
  detail: string;
};

export type EnterpriseStep = {
  id: string;
  step: number;
  title: string;
  description: string;
};

export type EnterpriseUseCase = {
  id: string;
  category: string;
  title: string;
  description: string;
  coversLabel: string;
  covers: string;
};

export type EnterpriseIntegrationColumn = {
  id: string;
  title: string;
  description: string;
  bullets: readonly string[];
};

export type EnterpriseComparisonRow = {
  id: string;
  dimension: string;
  traditional: string;
  ondial: string;
};

export type EnterpriseHybridColumn = {
  id: string;
  title: string;
  items: readonly string[];
};

export type EnterpriseFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const ENTERPRISE_HERO = {
  eyebrow: "OnDial for Enterprise",
  titleLead: "Enterprise AI voice agents that",
  titleAccent: "scale to thousands of calls",
  description:
    "OnDial is an enterprise-grade AI voice agent platform that runs outbound and inbound calling at scale, handling thousands of concurrent conversations with ultra-low latency. Built for Indian businesses, it ships with TRAI DLT alignment, DPDP-ready data handling, CRM integrations, and deep conversation analytics.",
  ctas: [
    { label: "Book a Demo", href: "/contact", variant: "primary" },
    { label: "Request Enterprise Pricing", href: "/contact", variant: "secondary" },
  ] as const satisfies readonly EnterpriseCta[],
  stats: [
    { id: "thousands", value: "Thousands", label: "of concurrent calls handled simultaneously" },
    { id: "latency", value: "Ultra-low", label: "latency for natural, real-time conversations" },
    { id: "trai", value: "TRAI DLT", label: "and DPDP-aligned communication framework" },
    { id: "availability", value: "24/7", label: "inbound and outbound availability" },
  ] as const satisfies readonly EnterpriseStatTile[],
} as const;

export const ENTERPRISE_SHIFT_SECTION = {
  eyebrow: "The Enterprise Shift to AI Voice",
  title: "Why large organisations are moving call operations to AI agents",
  description:
    "Enterprise calling was built around people. AI voice agents remove headcount limits while keeping conversation quality consistent from the first call to the ten thousandth.",
  cards: [
    {
      id: "people-constraints",
      title: "Beyond people constraints",
      description:
        "Hiring, training, and retaining agents is slow and costly. Quality drifts across shifts. AI delivers the same standard on every call.",
    },
    {
      id: "what-agent-does",
      title: "What an AI voice agent does",
      description:
        "Holds natural spoken conversations, follows defined objectives, adapts to interruptions, and escalates to humans when needed.",
    },
    {
      id: "enterprise-scale",
      title: "Value at enterprise scale",
      description:
        "Reach every overdue account, follow up every lead within minutes, and screen every applicant — without adding headcount.",
    },
    {
      id: "built-for-india",
      title: "Built for India",
      description:
        "OnDial unifies scale, compliance, analytics, and deployment in one platform purpose-built for the Indian market.",
    },
  ] as const satisfies readonly EnterpriseCard[],
} as const;

export const ENTERPRISE_WHY_CHOOSE = {
  eyebrow: "Why Enterprises Choose OnDial",
  title: "Built for the scale, reliability, and oversight enterprises require",
  description:
    "OnDial removes the three constraints that break enterprise voice operations — latency, capacity limits, and blind reporting — in one shared platform.",
  pills: [
    { id: "latency", label: "Latency", detail: "Conversations stay natural and responsive" },
    { id: "capacity", label: "Capacity", detail: "Peak-hour throughput without infrastructure limits" },
    { id: "visibility", label: "Visibility", detail: "Analytics and governance on every interaction" },
  ] as const satisfies readonly EnterprisePill[],
  features: [
    {
      id: "concurrent",
      title: "Massive concurrent call handling",
      description:
        "Scale from a handful of calls to thousands of simultaneous conversations without hitting infrastructure limits. The platform is built for peak-hour readiness, so campaign throughput stays consistent even when demand spikes.",
    },
    {
      id: "latency",
      title: "Stable ultra-low latency",
      description:
        "AI voice agents respond in real time with minimal delay. Conversations feel natural and responsive, which improves completion rates and removes the awkward pauses that cause callers to disengage.",
    },
    {
      id: "voice-quality",
      title: "Super-human voice quality",
      description:
        "Advanced voice synthesis produces expressive, human-like speech with realistic tone and contextual understanding. The result is higher engagement and a premium brand experience on every call.",
    },
    {
      id: "analytics",
      title: "Deep conversation analytics",
      description:
        "Every interaction generates business intelligence, including call summaries, sentiment analysis, lead scoring, intent detection, and conversion tracking. Leaders get a measurable view of campaign performance rather than guesswork.",
    },
    {
      id: "sales-automation",
      title: "Intelligent sales automation",
      description:
        "The platform qualifies leads, runs automated follow-ups, identifies buying intent, recommends next-best actions, and syncs with the CRM, so pipeline moves forward without manual chasing.",
    },
    {
      id: "voice-cloning",
      title: "Voice cloning at scale",
      description:
        "Create custom branded AI voices or replicate approved voices with high accuracy. Enterprises keep a consistent voice identity across thousands of calls at a fraction of traditional production costs.",
    },
  ] as const satisfies readonly EnterpriseCard[],
  closingQuote:
    "One integrated system — not separate tools — so call quality, throughput, and reporting stay consistent as volume grows.",
} as const;

export const ENTERPRISE_HOW_IT_WORKS = {
  eyebrow: "How OnDial Works at Scale",
  title: "From campaign setup to measurable outcomes",
  steps: [
    {
      id: "setup",
      step: 1,
      title: "Campaign setup",
      description:
        "A team starts from a prebuilt industry template or builds a campaign for a specific objective, such as EMI reminders or demo scheduling. The campaign defines who to call, what the agent should accomplish, and what counts as a successful outcome.",
    },
    {
      id: "execute",
      step: 2,
      title: "Scale and execute",
      description:
        "OnDial places calls at the configured volume, scaling concurrency up to thousands of simultaneous conversations during peak windows. Each AI agent greets the contact, follows the objective, answers questions using contextual understanding, and adapts to how the conversation unfolds. When a call needs a person, the agent escalates with the context already captured.",
    },
    {
      id: "analyse",
      step: 3,
      title: "Analyse and refine",
      description:
        "After each call, the platform records a summary, scores the lead or outcome, detects intent and sentiment, and syncs the result to the CRM. Managers review performance through conversation analytics, see which scripts and segments convert, and refine the campaign.",
    },
  ] as const satisfies readonly EnterpriseStep[],
  trustBadges: [
    "Enterprise-grade security & compliance",
    "Easy setup, no engineering required",
    "Proven templates across 20+ industries",
  ] as const,
  closingQuote:
    "Because the loop from call to data to refinement is continuous, campaigns improve over time rather than running blind, and the organisation builds a growing record of customer interactions it can analyse.",
} as const;

export const ENTERPRISE_USE_CASES = {
  eyebrow: "Enterprise Use Cases by Function",
  title: "One platform, every customer-facing team",
  description:
    "OnDial covers the full range of enterprise calling needs, from revenue generation to compliance communication. Below is how each function inside a large organisation puts the platform to work.",
  cases: [
    {
      id: "sales",
      category: "Revenue Generation",
      title: "Sales and pipeline",
      description:
        "Drive outbound revenue from first contact to closed deal. AI agents run cold outreach and prospecting, qualify leads against criteria such as BANT, and schedule demos, consultations, and discovery calls directly into the calendar.",
      coversLabel: "Covers",
      covers:
        "cold outreach, lead qualification, appointment and demo scheduling, upsell and cross-sell campaigns, win-back outreach, and product promotion calls, with CRM updates and conversion tracking on every contact.",
    },
    {
      id: "finance",
      category: "Lenders, Collections, Payments",
      title: "Finance and lending",
      description:
        "Support lending and payment operations end to end. Agents guide prospects through loan origination, deliver EMI and payment reminders, run compliant debt and loan recovery conversations, and complete KYC and verification checks.",
      coversLabel: "Covers",
      covers:
        "loan origination, EMI and payment reminders, debt and loan recovery, credit card and insurance sales, account fraud alerts, and KYC verification, with settlement discussions and payment commitment tracking handled in conversation.",
    },
    {
      id: "notifications",
      category: "Time-Sensitive Communication",
      title: "Notifications and alerts",
      description:
        "Deliver important, non-sales communication on time. The platform sends appointment reminders, order and delivery updates, booking confirmations, renewal notices, and urgent critical alerts that require immediate attention.",
      coversLabel: "Covers",
      covers:
        "appointment reminders, order and delivery updates, event and booking confirmations, emergency alerts, policy and subscription renewals, and compliance deadline reminders.",
    },
    {
      id: "survey",
      category: "Voice of Customer",
      title: "Survey and feedback",
      description:
        "Collect insights through conversation, which earns higher response rates than static forms. Agents run NPS and CSAT surveys, gather post-purchase and product feedback, and conduct structured market research interviews.",
      coversLabel: "Covers",
      covers:
        "NPS and CSAT surveys, post-purchase feedback, market research interviews, product and feature feedback, brand awareness studies, and healthcare patient surveys, with results captured for analysis in real time.",
    },
    {
      id: "retention",
      category: "Loyalty and Lifetime Value",
      title: "Customer retention",
      description:
        "Protect revenue by keeping customers engaged. Agents run re-engagement and onboarding calls, communicate loyalty rewards, identify churn risk early, and push timely subscription renewals before accounts lapse.",
      coversLabel: "Covers",
      covers:
        "re-engagement campaigns, customer onboarding calls, loyalty and reward notifications, churn prevention, check-in and care calls, and subscription renewal pushes.",
    },
    {
      id: "hr",
      category: "Talent and Workforce",
      title: "HR and recruitment",
      description:
        "Speed up hiring and employee engagement. Agents screen candidates, coordinate interview scheduling, follow up on job offers, run satisfaction surveys, and deliver onboarding and policy reminders to new hires.",
      coversLabel: "Covers",
      covers:
        "candidate screening, interview scheduling, job offer follow-ups, employee satisfaction surveys, onboarding reminders, and compliance and policy updates.",
    },
  ] as const satisfies readonly EnterpriseUseCase[],
  closingQuote:
    "The advantage of running all of these on one platform is consistency and visibility. A customer who receives a payment reminder, then a renewal notice, then a satisfaction survey is talking to the same system, with the same voice identity and the same record of history. Leadership sees performance across every function in one analytics layer rather than stitching together reports from separate tools. That single view is difficult to achieve when each department buys its own point solution.",
} as const;

export const ENTERPRISE_COMPLIANCE = {
  eyebrow: "Security, Compliance and Governance",
  title: "Communication that meets Indian regulatory expectations",
  description:
    "For enterprise buyers, compliance is a precondition — not a feature. OnDial is designed around the rules governing business communication in India.",
  pillars: [
    {
      id: "trai",
      label: "Telecom",
      title: "TRAI DLT alignment",
      description:
        "Registered outbound communication so high-volume campaigns run inside the regulatory structure, not around it.",
    },
    {
      id: "dpdp",
      label: "Data privacy",
      title: "DPDP-ready handling",
      description:
        "Personal data handled in line with the Digital Personal Data Protection Act — critical for KYC, finance, and healthcare calls.",
    },
  ] as const,
  complianceTeamTitle: "What enterprise compliance teams get",
  complianceBenefits: [
    {
      id: "trai-dlt",
      title: "TRAI DLT-aligned communication",
      description:
        "Registered outbound calling model for high-volume campaigns within the regulatory structure.",
    },
    {
      id: "dpdp",
      title: "DPDP-ready data handling",
      description:
        "Personal and sensitive data handled in line with the Digital Personal Data Protection Act.",
    },
    {
      id: "verification",
      title: "Verification workflows",
      description:
        "Regulated processes such as KYC, fraud alerts, and account security notifications.",
    },
    {
      id: "audit",
      title: "Complete audit records",
      description:
        "Every interaction logged and analysed for internal review and regulatory reporting.",
    },
  ] as const satisfies readonly EnterpriseCard[],
  governanceTitle: "Governance at scale",
  governanceBullets: [
    "Defined objectives and human escalation keep oversight across thousands of calls",
    "Sentiment analysis flags poor conversations for compliance review",
    "Consistent scripts, complete records, and reviewable sentiment for regulated industries",
  ] as const,
} as const;

export const ENTERPRISE_INTEGRATIONS = {
  eyebrow: "Integrations and Infrastructure",
  title: "Connects to your stack and scales with your volume",
  description:
    "One platform for outbound campaigns and inbound service — with CRM sync and elastic infrastructure underneath.",
  columns: [
    {
      id: "crm",
      title: "CRM synchronisation",
      description: "Pipeline and follow-ups stay current without manual entry.",
      bullets: [
        "Lead status and call outcomes sync automatically",
        "Sales scores flow back into the pipeline",
        "Appointment bookings triggered in conversation",
      ],
    },
    {
      id: "inbound-outbound",
      title: "Unified inbound & outbound",
      description: "A single system for outreach and customer service.",
      bullets: [
        "Context-aware support agent resolves caller intent",
        "FAQ handling, lead capture, and escalation",
        "Deeper CRM workflows on the platform roadmap",
      ],
    },
    {
      id: "elastic",
      title: "Elastic infrastructure",
      description: "Scale on demand without provisioning new hardware.",
      bullets: [
        "Few calls to thousands of simultaneous conversations",
        "Peak-ready for launches and seasonal demand",
        "Fast execution during recovery cycles",
      ],
    },
  ] as const satisfies readonly EnterpriseIntegrationColumn[],
} as const;

export const ENTERPRISE_COMPARISON = {
  eyebrow: "AI Voice Agents vs Traditional Calling Teams",
  title: "What changes when an enterprise automates calling",
  description:
    "AI voice agents are strongest where human teams are weakest — and enterprises run both together for the best outcome.",
  rows: [
    { id: "capacity", dimension: "Capacity", traditional: "Fixed by headcount", ondial: "Scales on demand" },
    { id: "cost", dimension: "Cost", traditional: "Scales linearly with volume", ondial: "Low marginal cost per call" },
    { id: "quality", dimension: "Quality", traditional: "Varies by agent and shift", ondial: "Same standard every call" },
    { id: "reporting", dimension: "Reporting", traditional: "Manual notes and summaries", ondial: "Captured automatically" },
    {
      id: "scaling",
      dimension: "Scaling speed",
      traditional: "Weeks to hire and train",
      ondial: "Instant capacity increase",
    },
  ] as const satisfies readonly EnterpriseComparisonRow[],
  hybridTitle: "The hybrid model enterprises use",
  hybridColumns: [
    {
      id: "ai",
      title: "AI handles",
      items: [
        "Reminders & confirmations",
        "Lead qualification",
        "Screening & surveys",
        "High-volume outreach",
      ],
    },
    {
      id: "humans",
      title: "Humans handle",
      items: [
        "Complex negotiations",
        "High-value accounts",
        "Emotionally sensitive cases",
        "Escalated interactions",
      ],
    },
  ] as const satisfies readonly EnterpriseHybridColumn[],
} as const;

export const ENTERPRISE_DEPLOYMENT = {
  eyebrow: "Deployment and Onboarding",
  title: "Launch quickly with prebuilt industry templates",
  description:
    "Skip building from scratch. Deploy proven conversation flows across departments without waiting on a technical queue.",
  features: [
    {
      id: "templates",
      title: "Ready-to-deploy templates",
      description:
        "Proven conversation flows for 8 industries — shorten implementation from weeks to days.",
    },
    {
      id: "no-tech",
      title: "No technical expertise required",
      description:
        "Business teams create, launch, and manage campaigns without a central technical dependency.",
    },
    {
      id: "cross-dept",
      title: "Cross-department speed",
      description:
        "Marketing, finance, and HR each launch independently — faster adoption across the organisation.",
    },
  ] as const satisfies readonly EnterpriseCard[],
  departments: [
    { id: "marketing", label: "Marketing", detail: "Promotion and outreach campaigns" },
    { id: "finance", label: "Finance", detail: "Payment reminders and collections" },
    { id: "hr", label: "HR", detail: "Candidate screening and onboarding" },
  ] as const,
  industryTemplatesLabel: "Industry templates available",
  industryTemplates: [
    "Finance",
    "Healthcare",
    "Education",
    "Real Estate",
    "E-commerce",
    "Logistics",
    "Insurance",
    "Recruitment",
  ] as const,
} as const;

export const ENTERPRISE_PRICING = {
  eyebrow: "Enterprise Pricing",
  title: "Transparent pricing built for the Indian market",
  description:
    "Enterprise-grade voice technology at a cost structure designed for Indian operations — not imported pricing that assumes a different market.",
  valueCards: [
    {
      id: "grow",
      title: "Grows with your organisation",
      description:
        "From departmental pilots to organisation-wide deployment without unnecessary commitments.",
    },
    {
      id: "budget",
      title: "Predictable budgeting",
      description:
        "Transparent pricing with no hidden platform fees or surprise usage charges.",
    },
    {
      id: "reach",
      title: "Better total cost of reach",
      description:
        "Reach every contact through automation vs staffing teams to reach only a fraction.",
    },
  ] as const satisfies readonly EnterpriseCard[],
  bullets: [
    "Flexible enterprise plans with transparent pricing",
    "No hidden platform fees or surprise usage charges",
    "Custom enterprise pricing for volume and integrations",
    "Pricing designed for the Indian market",
  ] as const,
  cta: { label: "Request Enterprise Pricing", href: "/contact" },
} as const;

export const ENTERPRISE_FAQ = {
  eyebrow: "Frequently Asked Questions",
  titleLead: "OnDial for enterprise,",
  titleAccent: "answered",
  description:
    "Get answers to the most common questions about deploying OnDial at enterprise scale.",
  items: [
    {
      id: "what-is",
      question: "What is OnDial for enterprise?",
      answer:
        "OnDial for enterprise is an AI voice agent platform built for large-scale outbound and inbound calling. It handles thousands of concurrent conversations with ultra-low latency, TRAI DLT alignment, DPDP-ready data handling, CRM integrations, and deep conversation analytics — purpose-built for Indian businesses.",
    },
    {
      id: "concurrent-calls",
      question: "How many calls can OnDial handle at the same time?",
      answer:
        "OnDial scales from a handful of calls to thousands of simultaneous conversations. The platform is built for peak-hour readiness, so campaign throughput stays consistent even when demand spikes during launches or seasonal campaigns.",
    },
    {
      id: "compliance",
      question: "Is OnDial compliant with Indian telecom and data regulations?",
      answer:
        "Yes. OnDial is designed around Indian regulatory expectations, including TRAI DLT-aligned outbound communication and DPDP-ready data handling. Every interaction is logged for audit and compliance review.",
    },
    {
      id: "crm",
      question: "Can OnDial integrate with our existing CRM?",
      answer:
        "Yes. OnDial syncs lead status, call outcomes, sales scores, and appointment bookings with your CRM automatically — keeping pipeline and follow-ups current without manual entry.",
    },
    {
      id: "inbound",
      question: "Does OnDial handle inbound calls or only outbound?",
      answer:
        "Both. OnDial is a unified platform for outbound campaigns and inbound customer service, with context-aware support agents, FAQ handling, lead capture, and escalation to human teams when needed.",
    },
    {
      id: "deploy-speed",
      question: "How quickly can an enterprise deploy OnDial?",
      answer:
        "With prebuilt industry templates, enterprises can deploy proven conversation flows in days rather than weeks. Business teams can create, launch, and manage campaigns without a central technical dependency.",
    },
    {
      id: "analytics",
      question: "What analytics does OnDial provide on each call?",
      answer:
        "Every call generates call summaries, sentiment analysis, lead scoring, intent detection, and conversion tracking. Managers review performance through conversation analytics and refine campaigns based on measurable outcomes.",
    },
    {
      id: "voice-cloning",
      question: "Can OnDial create a custom branded voice for our enterprise?",
      answer:
        "Yes. OnDial supports voice cloning at scale — create custom branded AI voices or replicate approved voices with high accuracy, keeping a consistent voice identity across thousands of calls.",
    },
    {
      id: "differentiation",
      question: "How is OnDial different from other AI calling platforms?",
      answer:
        "OnDial combines massive concurrent call handling, ultra-low latency, Indian regulatory compliance (TRAI DLT and DPDP), deep conversation analytics, and prebuilt industry templates in one integrated platform — not separate point solutions.",
    },
    {
      id: "industries",
      question: "Which industries does OnDial support?",
      answer:
        "OnDial ships with ready-to-deploy templates for finance, healthcare, education, real estate, e-commerce, logistics, insurance, and recruitment. Because the platform covers use cases across sales, finance and lending, notifications, surveys, retention, and HR, it fits any enterprise that runs high-volume customer or candidate communication, and the templates give each sector a tested starting point.",
    },
  ] as const satisfies readonly EnterpriseFaqItem[],
} as const;

export const ENTERPRISE_FINAL_CTA = {
  eyebrow: "Next Step",
  title: "See OnDial run at enterprise scale",
  description:
    "Book a demo to see concurrent call handling, real-time voice quality, compliance workflows, and analytics on your own use cases. Request enterprise pricing to match your deployment scale.",
  ctas: [
    { label: "Book a Demo", href: "/contact", variant: "primary" },
    { label: "Request Enterprise Pricing", href: "/contact", variant: "secondary" },
  ] as const satisfies readonly EnterpriseCta[],
} as const;
