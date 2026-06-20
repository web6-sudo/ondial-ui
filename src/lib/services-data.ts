import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Car,
  Factory,
  GraduationCap,
  Heart,
  Hotel,
  Landmark,
  Phone,
  Plane,
  Scale,
  Shield,
  ShoppingCart,
  Truck,
  Users,
  CalendarDays,
  Brain,
  Pill,
  Zap,
  HardHat,
  Sprout,
  TrendingUp,
} from "lucide-react";

/** Matte card fills - shared by service cards and marketing carousel. */
export const SERVICE_MATTE_COLORS = [
  "#5D57A3",
  "#0057C7",
  "#6A7036",
  "#BA6A36",
  "#4A4E69",
] as const;

/** Tailwind classes for service cards - must match keys in `service-card` BG_COLOR_MAP. */
const CARD_BG_COLORS = SERVICE_MATTE_COLORS.map(
  (hex) => `bg-[${hex}]`,
) as [
  "bg-[#5D57A3]",
  "bg-[#0057C7]",
  "bg-[#6A7036]",
  "bg-[#BA6A36]",
  "bg-[#4A4E69]",
];

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2426&auto=format&fit=crop";

export type Industry = {
  id: number;
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
};

export const DEFAULT_INDUSTRIES: Industry[] = [
  {
    id: 1,
    name: "AI Voice Agents for Healthcare & Medical",
    slug: "healthcare-and-medical-services",
    icon: Heart,
    description:
      "Automate appointment reminders, prescription refills, follow-ups, lab result notifications, and chronic care management. Improve patient engagement and reduce no-shows.",
  },
  {
    id: 2,
    name: "AI Voice Agents for Insurance",
    slug: "insurance-services",
    icon: Shield,
    description:
      "Automate policy renewals, claim status updates, premium reminders, and risk assessment notifications. Improve customer trust and response times.",
  },
  {
    id: 3,
    name: "AI Voice Agents for Finance & Banking",
    slug: "financial-and-banking-services",
    icon: Building2,
    description:
      "Enable fraud alerts, loan status updates, payment reminders, credit score notifications, and account activity updates. Enhance customer security and financial communication.",
  },
  {
    id: 4,
    name: "AI Voice Agents for Real Estate",
    slug: "real-estate-services",
    icon: Building2,
    description:
      "Manage property inquiries, schedule site visits, share market updates, handle lease renewals, and streamline closing process communication.",
  },
  {
    id: 5,
    name: "AI Voice Agents for Call Centers & BPO",
    slug: "call-center-and-bpo-services",
    icon: Phone,
    description:
      "Automate customer surveys, feedback collection, compliance notifications, and data verification processes. Improve operational efficiency and service quality.",
  },
  {
    id: 6,
    name: "AI Voice Agents for Travel & Tourism",
    slug: "travel-and-tourism-services",
    icon: Plane,
    description:
      "Automate booking confirmations, flight updates, check-in reminders, weather alerts, and loyalty program notifications. Enhance traveler experience with real-time communication.",
  },
  {
    id: 7,
    name: "AI Voice Agents for Transportation & Logistics",
    slug: "transportation-and-logistics-services",
    icon: Truck,
    description:
      "Provide delivery tracking updates, delay notifications, documentation reminders, rate quotations, and compliance alerts. Optimize supply chain communication.",
  },
  {
    id: 8,
    name: "AI Voice Agents for Retail & E-commerce",
    slug: "retail-and-ecommerce-services",
    icon: ShoppingCart,
    description:
      "Recover abandoned carts, send order and delivery updates, collect customer feedback, manage returns, and promote seasonal offers with AI-powered outreach.",
  },
  {
    id: 9,
    name: "AI Voice Agents for Telecommunications",
    slug: "telecommunications-services",
    icon: Phone,
    description:
      "Handle service activations, billing support, technical assistance, and contract renewal reminders. Deliver faster customer communication and support.",
  },
  {
    id: 10,
    name: "AI Voice Agents for Automotive",
    slug: "automotive-services",
    icon: Car,
    description:
      "Manage service reminders, warranty extensions, recall notifications, insurance updates, and financing assistance. Keep customers informed throughout the ownership journey.",
  },
  {
    id: 11,
    name: "AI Voice Agents for Education",
    slug: "education-services",
    icon: GraduationCap,
    description:
      "Automate enrollment confirmations, tuition reminders, academic progress updates, and alumni engagement campaigns. Improve communication across the education lifecycle.",
  },
  {
    id: 12,
    name: "AI Voice Agents for Hospitality",
    slug: "hospitality-services",
    icon: Hotel,
    description:
      "Streamline reservation confirmations, concierge assistance, check-in coordination, guest feedback collection, and loyalty program communication.",
  },
  {
    id: 13,
    name: "AI Voice Agents for Legal",
    slug: "legal-services",
    icon: Scale,
    description:
      "Send case progress updates, appointment reminders, document notifications, and compliance deadline alerts. Deliver secure and professional client communication.",
  },
  {
    id: 14,
    name: "AI Voice Agents for Government",
    slug: "government-services",
    icon: Landmark,
    description:
      "Manage application status updates, tax reminders, license renewals, compliance notifications, and citizen engagement surveys. Improve public service efficiency.",
  },
  {
    id: 15,
    name: "AI Voice Agents for Manufacturing",
    slug: "manufacturing-services",
    icon: Factory,
    description:
      "Automate production updates, quality assurance notifications, maintenance schedules, safety alerts, and supplier coordination workflows.",
  },
  {
    id: 16,
    name: "AI Voice Agents for Non-Profit Organizations",
    slug: "non-profit-organizations-services",
    icon: Users,
    description:
      "Run donation campaigns, recruit volunteers, send event invitations, share grant updates, and automate donor appreciation calls. Strengthen community engagement.",
  },
  {
    id: 17,
    name: "AI Voice Agents for Event Management",
    slug: "event-management-services",
    icon: CalendarDays,
    description:
      "Coordinate event registrations, send booking confirmations, manage attendee queries, and automate post-event feedback collection.",
  },
  {
    id: 18,
    name: "AI Voice Agents for Consultation",
    slug: "consulting-services",
    icon: Brain,
    description:
      "Schedule advisory sessions, automate appointment follow-ups, gather client pre-intake information, and streamline advisory communication.",
  },
  {
    id: 19,
    name: "AI Voice Agents for Pharmaceuticals",
    slug: "pharmaceutical-services",
    icon: Pill,
    description:
      "Handle prescription order updates, automate delivery notifications, share medical guidelines, and support pharmacy customer inquiries.",
  },
  {
    id: 20,
    name: "AI Voice Agents for Sales & Lead Generation",
    slug: "sales-and-lead-generation-services",
    icon: TrendingUp,
    description:
      "Automate outbound outreach, qualify leads, schedule follow-ups, and accelerate your sales pipeline with AI-powered voice automation.",
  },
  {
    id: 21,
    name: "AI Voice Agents for Utilities",
    slug: "utilities-services",
    icon: Zap,
    description:
      "Automate billing inquiries, outage notifications, service requests, and account management for utility providers.",
  },
  {
    id: 22,
    name: "AI Voice Agents for Construction",
    slug: "construction-services",
    icon: HardHat,
    description:
      "Streamline site coordination, project status updates, supplier communication, and team notifications with AI voice automation.",
  },
  {
    id: 23,
    name: "AI Voice Agents for Agriculture",
    slug: "agriculture-services",
    icon: Sprout,
    description:
      "Automate farm guidance, crop advisory calls, supply chain updates, and field support with intelligent AI voice agents.",
  },
];

/** Per-industry SEO meta titles and descriptions for `generateMetadata`. */
export const INDUSTRY_SEO_METADATA: Record<string, { title: string; description: string }> = {
  "healthcare-and-medical-services": {
    title: "AI Voice Agent for Healthcare and Medical services | OnDial",
    description:
      "Enhance healthcare and medical services with OnDial's AI-powered solutions. Improve patient care, streamline operations & drive efficiency.",
  },
  "financial-and-banking-services": {
    title: "AI Voice Agent for Finance & Banking Services | OnDial",
    description:
      "Transform customer support in finance & banking with OnDial's AI Voice Agent. Automate queries, boost security, and deliver seamless, 24/7 client experiences.",
  },
  "real-estate-services": {
    title: "AI Voice Agent for Real Estate Services | OnDial",
    description:
      "Boost property sales and customer support with OnDial's AI Voice Agent for Real Estate Services. Automate inquiries, qualify leads, and deliver 24/7 smart assistance.",
  },
  "retail-and-ecommerce-services": {
    title: "AI Voice Agent for Retail & E-commerce Services | OnDial",
    description:
      "Boost customer engagement with OnDial's AI Voice Agent for Retail & E-commerce Services. Automate support, personalize shopping, and drive sales with ease.",
  },
  "insurance-services": {
    title: "AI Voice Agent for Insurance Services | OnDial Solutions",
    description:
      "Transform insurance support with OnDial's AI Voice Agent for Insurance Services. Automate claims, boost customer experience, and cut response times seamlessly.",
  },
  "sales-and-lead-generation-services": {
    title: "AI Voice Agent for Sales & Lead Generation Services",
    description:
      "Boost revenue with OnDial's AI Voice Agent for Sales & Lead Generation Services. Automate outreach, qualify leads, and close deals faster with smart voice AI.",
  },
  "call-center-and-bpo-services": {
    title: "AI Voice Agent for Call Centers & BPO Services | OnDial",
    description:
      "Boost efficiency with OnDial's AI Voice Agent for Call Centers & BPO Services. Automate support, cut costs, and deliver exceptional customer experiences.",
  },
  "telecommunications-services": {
    title: "AI Voice Agent for Telecommunications Services | OnDial",
    description:
      "Boost call centers and customer care with OnDial's AI Voice Agent for Telecommunications Services - streamline support, cut costs, and elevate user experiences.",
  },
  "automotive-services": {
    title: "AI Voice Agent for Automotive Services | OnDial",
    description:
      "Streamline bookings, diagnostics, and customer support with OnDial's AI Voice Agent for Automotive Services - smarter, faster, and always on for your garage.",
  },
  "education-services": {
    title: "AI Voice Agent for Education Services - OnDial",
    description:
      "Enhance student engagement and streamline admin tasks with OnDial's AI Voice Agent for Education Services. 24/7 support, multilingual, and secure.",
  },
  "travel-and-tourism-services": {
    title: "AI Voice Agent for Travel & Tourism Services | OnDial",
    description:
      "Transform travel experiences with OnDial's AI Voice Agent for Travel & Tourism Services - bookings, assist travelers, and boost customer satisfaction.",
  },
  "hospitality-services": {
    title: "AI Voice Agent for Hospitality Services | OnDial",
    description:
      "Enhance guest experiences with OnDial's AI Voice Agent. 24/7 support, multilingual capabilities, and instant responses for seamless hospitality services.",
  },
  "legal-services": {
    title: "Best AI Voice Agent for Legal Services | OnDial",
    description:
      "Enhance your law firm's efficiency with OnDial's AI Voice Agent. Automate client intake, lead qualification, and appointment scheduling 24/7.",
  },
  "government-services": {
    title: "Best AI Voice Agent for Government Services - OnDial",
    description:
      "Enhance citizen engagement with OnDial's AI Voice Agent. Provide 24/7 multilingual support, automate inquiries, and streamline government services efficiently.",
  },
  "utilities-services": {
    title: "Best AI Voice Agent for Utilities Services | OnDial",
    description:
      "Enhance customer support and operational efficiency with OnDial's AI Voice Agent for Utilities Services. Automate queries, billing, and real-time assistance.",
  },
  "non-profit-organizations-services": {
    title: "Best AI Voice Agent for Non-Profit Organizations Services",
    description:
      "Boost efficiency and donor engagement with OnDial's AI Voice Agent for Non-Profit Organizations Services. Automate calls, support, and outreach seamlessly.",
  },
  "transportation-and-logistics-services": {
    title: "AI Voice Agent for Transportation & Logistics Services",
    description:
      "Boost efficiency and streamline operations with OnDial's AI Voice Agent for Transportation & Logistics Services. Smart automation for faster deliveries.",
  },
  "manufacturing-services": {
    title: "AI Voice Agent for Manufacturing Services | OnDial",
    description:
      "Boost efficiency and streamline operations with OnDial's AI Voice Agent for Manufacturing Services, transforming production and factory communication.",
  },
  "construction-services": {
    title: "Best AI Voice Agent for Construction Services | OnDial",
    description:
      "Boost efficiency with OnDial's AI Voice Agent for Construction Services. Automate site coordination, reporting, and team communication seamlessly.",
  },
  "agriculture-services": {
    title: "Best AI Voice Agent for Agriculture Services | OnDial",
    description:
      "Boost farm efficiency with OnDial's AI Voice Agent for Agriculture Services. Automate guidance, support, and insights for smarter farming operations.",
  },
  "event-management-services": {
    title: "AI Voice Agent for Event Management Services | OnDial",
    description:
      "Streamline event registrations, bookings, and attendee communication with OnDial's AI Voice Agent for Event Management Services.",
  },
  "consulting-services": {
    title: "AI Voice Agent for Consulting Services | OnDial",
    description:
      "Automate client intake, appointment scheduling, and advisory follow-ups with OnDial's AI Voice Agent for Consulting Services.",
  },
  "pharmaceutical-services": {
    title: "AI Voice Agent for Pharmaceutical Services | OnDial",
    description:
      "Enhance prescription support, delivery notifications, and customer care with OnDial's AI Voice Agent for Pharmaceutical Services.",
  },
};

export const SERVICES_DATA = DEFAULT_INDUSTRIES.map((industry, index) => ({
  id: industry.id,
  title: industry.name,
  description: industry.description,
  image: PLACEHOLDER_IMAGE,
  bgColor: CARD_BG_COLORS[index % CARD_BG_COLORS.length],
  link: `/industries/${industry.slug}`,
}));
