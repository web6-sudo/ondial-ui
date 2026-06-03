"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { validateLoginEmail, validateLoginPassword } from "@/lib/auth-form-validation";
import { cn } from "@/lib/utils";

function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.87 14.13c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.52 1 10.21 1 12s.43 3.48 1.18 4.97l3.69-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335" />
    </svg>
  );
}

const inputBase =
  "h-10 rounded-full border border-border bg-muted/50 px-4 text-sm shadow-none transition-[border-color,background-color] duration-200 " +
  "placeholder:text-sm placeholder:text-muted-foreground " +
  "hover:border-border hover:bg-muted/70 " +
  "focus-visible:border-foreground/30 focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-foreground/10";

function inputClass(invalid: boolean) {
  return cn(
    inputBase,
    invalid && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  const clearFieldError = (key: "email" | "password") => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      delete next.form;
      return next;
    });
  };

  const handleBlurEmail = () => {
    const e = validateLoginEmail(email);
    setErrors((prev) => {
      const next = { ...prev, form: undefined };
      if (e) next.email = e;
      else delete next.email;
      return next;
    });
  };

  const handleBlurPassword = () => {
    const e = validateLoginPassword(password);
    setErrors((prev) => {
      const next = { ...prev, form: undefined };
      if (e) next.password = e;
      else delete next.password;
      return next;
    });
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const eEmail = validateLoginEmail(email);
    const ePassword = validateLoginPassword(password);
    if (eEmail || ePassword) {
      setErrors({
        email: eEmail,
        password: ePassword,
        form: "Please correct the highlighted fields.",
      });
      if (eEmail) document.getElementById("login-email")?.focus();
      else document.getElementById("login-password")?.focus();
      return;
    }
    setErrors({});
    // Wire to your auth API when ready
  };

  return (
    <AuthPageShell fullScreen>
      <AuthSplitLayout fullScreen>
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Enter your email and password to access your account.
          </p>

          <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {errors.form ? (
              <div
                role="alert"
                className="rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
              >
                {errors.form}
              </div>
            ) : null}

            <div className="grid gap-2">
              <Label
                htmlFor="login-email"
                className={cn("text-sm font-medium", errors.email ? "text-destructive" : "text-foreground")}
              >
                Email
              </Label>
              <Input
                id="login-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError("email");
                }}
                onBlur={handleBlurEmail}
                placeholder="Enter your email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "login-email-error" : undefined}
                className={inputClass(!!errors.email)}
              />
              {errors.email ? (
                <p id="login-email-error" className="text-xs leading-snug text-destructive" role="status">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="login-password"
                className={cn("text-sm font-medium", errors.password ? "text-destructive" : "text-foreground")}
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  onBlur={handleBlurPassword}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "login-password-error" : undefined}
                  className={cn(inputClass(!!errors.password), "pr-11")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-1 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password ? (
                <p id="login-password-error" className="text-xs leading-snug text-destructive" role="status">
                  {errors.password}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(v) => setRemember(!!v)}
                  className="size-4"
                />
                <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-muted-foreground">
                  Remember me
                </Label>
              </div>
              <button
                type="button"
                className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Forgot password
              </button>
            </div>

            <Button
              type="submit"
              className="h-10 w-full rounded-full bg-foreground text-sm font-semibold text-background hover:opacity-90"
            >
              Sign in
            </Button>

            <div className="relative py-1">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
              <span className="relative mx-auto block w-fit bg-background px-3 text-xs text-muted-foreground">
                Or continue with
              </span>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-10 w-full rounded-full border-border bg-background text-sm font-medium hover:bg-muted/40"
            >
              <GoogleIcon className="mr-2 size-4" />
              Sign in with Google
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-foreground underline-offset-4 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </AuthSplitLayout>
    </AuthPageShell>
  );
}
