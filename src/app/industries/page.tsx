import type { Metadata } from "next";

import ServicesSlider from "@/components/marketing/services-slider";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI voice calls tailored to your sector—reminders, updates, surveys, and outreach for healthcare, finance, retail, and more.",
};

export default function IndustriesPage() {
  return <ServicesSlider />;
}
