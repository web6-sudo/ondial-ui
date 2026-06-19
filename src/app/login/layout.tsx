import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Login | OnDial" },
  description: "Sign in to your OnDial account to manage your AI voice agents, monitor calls, and configure automations.",
  alternates: { canonical: "https://www.ondial.ai/login" },
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
