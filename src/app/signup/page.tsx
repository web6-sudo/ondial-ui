import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";

import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: { absolute: "Sign Up | OnDial" },
  description: "Create your OnDial account to get started with AI voice agents for your business.",
  alternates: { canonical: "https://www.ondial.ai/signup" },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthPageShell fullScreen>
      <AuthSplitLayout fullScreen>
        <SignupForm />
      </AuthSplitLayout>
    </AuthPageShell>
  );
}
