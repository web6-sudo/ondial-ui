# OnDial Auth UI — AI Implementation Pack

> **How to use:** Copy this entire file into your AI chat in the target project and say:
> *"Implement the login and signup auth UI exactly as specified in this pack. Create every file at the listed paths. Copy the code verbatim unless the project uses a different import alias — then only change `@/` paths. Do not simplify or redesign the UI."*

---

## AI instructions (read first)

You are implementing a **split-screen auth UI** (login + signup) for a Next.js App Router project with Tailwind CSS and shadcn/ui.

### Visual result

- **Left column (all breakpoints):** centered form, max-width `md`, rounded-full inputs, full-width pill buttons.
- **Right column (xl / ≥1280px only):** decorative collage panel with organic SVG-clipped main photo, optional bottom-left accent card, optional top avatar stack + social proof text.
- **Below xl:** right panel hidden; form fills the viewport below the nav.
- **Nav:** bleeds over the page; **footer hidden** on `/login` and `/signup`.

### Implementation order

1. Create static assets in `public/auth/` (see **Static assets**).
2. Create `src/lib/utils.ts` if missing (`cn` helper).
3. Create `src/lib/auth-form-validation.ts`.
4. Create `src/config/auth-ui.ts`.
5. Create all four components under `src/components/auth/`.
6. Create login page + layout and signup page + form.
7. Wire layout shell for auth routes (see **Layout integration**).
8. Add Unsplash to `next.config` `images.remotePatterns` if using default avatar URLs.
9. Ensure shadcn `Button`, `Input`, `Label`, `Checkbox` exist.

### Do NOT

- Replace the SVG clip path or collage layout with a plain `<Image>`.
- Remove the `xl:` breakpoint split — it is intentional.
- Change rounded-full input styling to square inputs.
- Skip `AuthPageShell fullScreen` + `AuthSplitLayout fullScreen` wrapper on both pages.

### Dependencies

```
next react react-dom
lucide-react
clsx tailwind-merge
@radix-ui/react-checkbox  (shadcn Checkbox)
```

---

## Static assets (required images)

Copy these from the source OnDial repo `public/auth/` folder into the target project's `public/auth/`:

| File | Path in project | Role | Spec |
|------|-----------------|------|------|
| Main collage | `public/auth/collage-chair.png` | Large photo in organic frame (right panel) | Portrait, min ~660×800px, subject centered |
| Kiwi card | `public/auth/two.jpg` | Small rounded card, bottom-left overlay | Portrait ~400×560px |

Optional local avatars (replace Unsplash URLs in `auth-ui.ts`):

```
public/auth/avatars/1.jpg … 5.jpg   (square 120×120px headshots)
```

### Right panel layout (330×377 design canvas)

```
┌──────────────────────────── 330px ────────────────────────────┐
│  TOP NOTCH: 5 overlapping avatar circles + social proof text  │
│  ╭────────────────────────────────────────────────────────╮   │
│  │  MAIN COLLAGE — authUiImages.mainCollage               │   │
│  │  (SVG clip-path organic shape)                         │   │
│  ├────┐                                                       │
│  │kiwi│  authUiImages.kiwiCard (rounded-3xl, bottom-left)     │
│  └────┘                                                       │
└───────────────────────────────────────────────────────────────┘
```

Toggle kiwi / avatars via `authUiPanel` in `src/config/auth-ui.ts`.

---

## File tree

```
public/auth/collage-chair.png
public/auth/two.jpg
src/config/auth-ui.ts
src/lib/auth-form-validation.ts
src/lib/utils.ts                          (if not present)
src/components/auth/auth-page-shell.tsx
src/components/auth/auth-split-layout.tsx
src/components/auth/auth-collage-panel.tsx
src/components/auth/auth-collage-scene.tsx
src/app/login/layout.tsx
src/app/login/page.tsx
src/app/signup/page.tsx
src/app/signup/signup-form.tsx
```

---

## `src/config/auth-ui.ts`

```ts
/** Images for the right-hand collage panel (paths from `/public`). */
export const authUiImages = {
  mainCollage: "/auth/collage-chair.png",
  kiwiCard: "/auth/two.jpg",
  avatars: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&q=80",
  ] as const,
} as const;

export const authUiCopy = {
  socialProof: "+5000 happy customers",
} as const;

export const authUiPanel = {
  showKiwi: true,
  showAvatars: true,
} as const;
```

---

## `src/lib/utils.ts` (only if missing)

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## `src/lib/auth-form-validation.ts`

```ts
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Email is required";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address";
  return undefined;
}

export function validateLoginPassword(value: string): string | undefined {
  if (!value) return "Password is required";
  if (value.length < 8) return "Use at least 8 characters";
  return undefined;
}

export function validateSignupEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return "Email address is required";
  if (!EMAIL_RE.test(v)) return "Please enter a valid email address";
  return undefined;
}
```

---

## `src/components/auth/auth-page-shell.tsx`

```tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  children: ReactNode;
  className?: string;
  fullScreen?: boolean;
};

export function AuthPageShell({ children, className, fullScreen = false }: AuthPageShellProps) {
  if (fullScreen) {
    return (
      <div className={cn("flex h-full min-h-0 w-full min-w-0 flex-1 flex-col", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-col items-center overflow-x-hidden bg-background px-3 sm:px-6",
        "max-md:h-full max-md:min-h-0",
        "min-h-[calc(100svh-8.25rem)] sm:min-h-[calc(100svh-8rem)]",
        "pb-10 sm:pb-12 md:pb-8",
        className,
      )}
    >
      <div
        className="h-[max(1rem,calc(env(safe-area-inset-top,0px)+6.5rem))] w-full shrink-0"
        aria-hidden
      />
      <div
        className={cn(
          "flex w-full min-w-0 flex-1 flex-col items-center justify-center py-2 sm:py-4",
          "min-h-0",
        )}
      >
        <div className="mx-auto flex w-full min-w-0 max-w-full shrink-0 flex-col items-center px-1 sm:px-2">
          {children}
        </div>
      </div>
    </div>
  );
}
```

---

## `src/components/auth/auth-split-layout.tsx`

```tsx
import type { ReactNode } from "react";

import { AuthCollagePanel } from "@/components/auth/auth-collage-panel";
import { cn } from "@/lib/utils";

type AuthSplitLayoutProps = {
  children: ReactNode;
  fullScreen?: boolean;
  className?: string;
};

const navContentOffset =
  "scroll-pt-[calc(env(safe-area-inset-top,0px)+5.75rem)] pt-[calc(env(safe-area-inset-top,0px)+5.75rem)] md:scroll-pt-[calc(env(safe-area-inset-top,0px)+4.25rem)] md:pt-[calc(env(safe-area-inset-top,0px)+4.25rem)]";

const collagePanelPad =
  "box-border flex flex-col pl-0 pr-1 pb-0 sm:pt-3 sm:pb-3 lg:pt-7 lg:pb-4 lg:pr-4";

export function AuthSplitLayout({
  children,
  fullScreen = false,
  className,
}: AuthSplitLayoutProps) {
  return (
    <div
      className={cn(
        "grid h-full min-h-0 w-full flex-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]",
        fullScreen && "min-h-full",
        className,
      )}
    >
      <div className="flex h-full min-h-0 flex-col bg-background">
        <div
          id="auth-form-scroll"
          className={cn(
            "flex min-h-0 flex-1 flex-col overflow-y-auto",
            navContentOffset,
            "px-5 pb-5 sm:px-8 sm:pb-6 md:px-10 lg:px-14",
          )}
        >
          <div className="flex min-h-full w-full flex-1 flex-col justify-center py-2 sm:py-4 md:py-6">
            <div className="mx-auto w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>

      <div className={cn("hidden h-full min-h-0 flex-col bg-background xl:flex")} aria-hidden>
        <div className={cn("min-h-0 w-full flex-1 overflow-visible", collagePanelPad)}>
          <div className="flex h-full min-h-0 w-full items-center justify-end overflow-visible">
            <AuthCollagePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## `src/components/auth/auth-collage-panel.tsx`

```tsx
import { AuthCollageScene } from "@/components/auth/auth-collage-scene";
import { authUiImages, authUiPanel } from "@/config/auth-ui";

type AuthCollagePanelProps = {
  className?: string;
  fit?: "height" | "width";
};

export function AuthCollagePanel({ className, fit = "height" }: AuthCollagePanelProps) {
  return (
    <AuthCollageScene
      className={className}
      fit={fit}
      mainImageSrc={authUiImages.mainCollage}
      showKiwi={authUiPanel.showKiwi}
      showAvatars={authUiPanel.showAvatars}
    />
  );
}
```

---

## `src/components/auth/auth-collage-scene.tsx`

```tsx
"use client";

import Image from "next/image";
import { useId, type ReactNode } from "react";

import { authUiCopy, authUiImages } from "@/config/auth-ui";
import { cn } from "@/lib/utils";

export const AUTH_COLLAGE_PATH_W = 257;
export const AUTH_COLLAGE_DESIGN_H = 377;
export const AUTH_COLLAGE_SCENE_W = 330;
export const AUTH_COLLAGE_SCALE_X = AUTH_COLLAGE_SCENE_W / AUTH_COLLAGE_PATH_W;

export const AUTH_COLLAGE_MAIN_CARD_PATH =
  "M0 183 V14 Q2 1 15 0 H141 Q157 0 157 16 V34 Q157 54 178 54 H242 Q257 54 257 71 V364 Q256 377 243 377 H103 Q88 377 88 358 V274 Q88 255 73 255 H17 Q0 255 0 238 Z";

const KIWI_W = 84;
const KIWI_H = 117;
const KIWI_LEFT = 0;
const KIWI_TOP = AUTH_COLLAGE_DESIGN_H - KIWI_H;
const NOTCH_LEFT = 157;
const NOTCH_W = AUTH_COLLAGE_PATH_W - NOTCH_LEFT;
const NOTCH_H = 54;

const KIWI_CARD_IMAGE = authUiImages.kiwiCard;

const pctX = (value: number) => `${(value / AUTH_COLLAGE_PATH_W) * 100}%`;
const pctY = (value: number) => `${(value / AUTH_COLLAGE_DESIGN_H) * 100}%`;

type CollageFit = "height" | "width";

type AuthCollageSceneProps = {
  className?: string;
  fit?: CollageFit;
  mainImageSrc?: string;
  mainContent?: ReactNode;
  showKiwi?: boolean;
  showAvatars?: boolean;
};

export function AuthCollageScene({
  className,
  fit = "height",
  mainImageSrc,
  mainContent,
  showKiwi = false,
  showAvatars = false,
}: AuthCollageSceneProps) {
  const clipId = useId().replace(/:/g, "");
  const isWidthFit = fit === "width";

  return (
    <div
      className={cn(
        "flex w-full overflow-visible",
        isWidthFit
          ? "min-h-[inherit] items-center justify-center lg:justify-end"
          : "h-full items-center justify-end [container-type:size]",
        className,
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-visible",
          isWidthFit
            ? "mx-auto aspect-[330/377] h-auto w-full max-w-[min(100%,20rem)] sm:max-w-[min(100%,24rem)] lg:mx-0 lg:ml-auto lg:max-w-none"
            : "ml-auto aspect-[330/377] h-full w-auto max-w-full",
        )}
      >
        <svg
          viewBox={`0 0 ${AUTH_COLLAGE_SCENE_W} ${AUTH_COLLAGE_DESIGN_H}`}
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden={!mainContent}
          role={mainContent ? "img" : undefined}
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path
                d={AUTH_COLLAGE_MAIN_CARD_PATH}
                transform={`scale(${AUTH_COLLAGE_SCALE_X}, 1)`}
              />
            </clipPath>
          </defs>
          {mainImageSrc ? (
            <image
              href={mainImageSrc}
              x={0}
              y={0}
              width={AUTH_COLLAGE_SCENE_W}
              height={AUTH_COLLAGE_DESIGN_H}
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#${clipId})`}
            />
          ) : (
            <foreignObject
              x={0}
              y={0}
              width={AUTH_COLLAGE_SCENE_W}
              height={AUTH_COLLAGE_DESIGN_H}
              clipPath={`url(#${clipId})`}
            >
              <div className="flex size-full items-center justify-center overflow-hidden bg-[#dce9f8]">
                {mainContent}
              </div>
            </foreignObject>
          )}
        </svg>

        {showKiwi ? (
          <div
            aria-hidden
            className="absolute z-1 overflow-hidden rounded-3xl"
            style={{
              top: pctY(KIWI_TOP),
              left: pctX(KIWI_LEFT),
              width: pctX(KIWI_W),
              height: pctY(KIWI_H),
            }}
          >
            <Image
              src={KIWI_CARD_IMAGE}
              alt=""
              fill
              priority
              unoptimized
              sizes="120px"
              className="scale-125 object-cover object-center"
              draggable={false}
            />
          </div>
        ) : null}

        {showAvatars ? (
          <div
            className="absolute z-50 flex flex-col items-center justify-center gap-1 px-1"
            style={{
              top: 0,
              left: pctX(NOTCH_LEFT),
              width: pctX(NOTCH_W),
              height: pctY(NOTCH_H),
            }}
          >
            <div className="flex items-center justify-center">
              {authUiImages.avatars.map((src, index) => (
                <div
                  key={src}
                  className={cn(
                    "relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-[#eef0f3] xl:size-10",
                    index > 0 && "-ml-2.5",
                  )}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="50px"
                    className="object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
            <p className="m-0 text-center text-[12px] font-medium leading-none text-muted-foreground xl:text-xs">
              {authUiCopy.socialProof}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
```

---

## `src/app/login/layout.tsx`

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Login | YourApp" },
  description: "Sign in to your account.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

---

## `src/app/login/page.tsx`

```tsx
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
    // Wire to your auth API
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
```

---

## `src/app/signup/page.tsx`

```tsx
import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";

import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: { absolute: "Sign Up | YourApp" },
  description: "Create your account.",
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
```

---

## `src/app/signup/signup-form.tsx`

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSignupEmail } from "@/lib/auth-form-validation";
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
    invalid && "border-destructive/80 focus-visible:border-destructive/50 focus-visible:ring-destructive/25",
  );
}

const formStack = "mt-4 flex flex-col gap-2 sm:mt-8 sm:gap-4";
const fieldGroup = "grid gap-1.5 sm:gap-2";
const fieldRow = "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4";

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="status" className="text-xs leading-snug text-destructive">
      {message}
    </p>
  );
}

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"individual" | "organization">("individual");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    referral: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "fullname":
        if (!value.trim()) error = "Full name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email": {
        const e = validateSignupEmail(value);
        error = e ?? "";
        break;
      }
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\+?[\d\s-]{10,}$/.test(value)) error = "Please enter a valid phone number (min 10 digits)";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8) error = "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== formData.password) error = "Passwords do not match";
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      if (id === "password" && next.confirmPassword) delete next.confirmPassword;
      return next;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[id] = error;
      else delete next[id];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key === "referral") return;
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      document.getElementById("auth-form-scroll")?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Create account
      </h1>
      <p className="mt-1.5 text-sm leading-snug text-muted-foreground sm:mt-2 sm:leading-relaxed">
        Join us and start your journey today.
      </p>

      <form className={formStack} onSubmit={handleSubmit} noValidate>
        <div className={fieldGroup}>
          <Label className="text-sm font-medium text-foreground">Who are you?</Label>
          <div className="flex touch-manipulation rounded-full border border-border/40 bg-muted/40 p-0.5">
            <button
              type="button"
              onClick={() => setUserType("individual")}
              className={`flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-medium transition-all duration-200 ${
                userType === "individual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="size-4" />
              Individual
            </button>
            <button
              type="button"
              onClick={() => setUserType("organization")}
              className={`flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-medium transition-all duration-200 ${
                userType === "organization"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="size-4" />
              Organization
            </button>
          </div>
        </div>

        <div className={fieldRow}>
          <div className={fieldGroup}>
            <Label htmlFor="fullname" className={cn("text-sm font-medium", errors.fullname ? "text-destructive" : "text-foreground")}>
              Full name
            </Label>
            <Input id="fullname" placeholder="John Doe" className={inputClass(!!errors.fullname)} value={formData.fullname} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.fullname} aria-describedby={errors.fullname ? "fullname-error" : undefined} />
            {errors.fullname ? <FieldError id="fullname-error" message={errors.fullname} /> : null}
          </div>
          <div className={fieldGroup}>
            <Label htmlFor="email" className={cn("text-sm font-medium", errors.email ? "text-destructive" : "text-foreground")}>
              Email
            </Label>
            <Input id="email" type="email" placeholder="john@example.com" className={inputClass(!!errors.email)} value={formData.email} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email ? <FieldError id="email-error" message={errors.email} /> : null}
          </div>
        </div>

        <div className={fieldRow}>
          <div className={fieldGroup}>
            <Label htmlFor="phone" className={cn("text-sm font-medium", errors.phone ? "text-destructive" : "text-foreground")}>
              Phone number
            </Label>
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className={inputClass(!!errors.phone)} value={formData.phone} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
            {errors.phone ? <FieldError id="phone-error" message={errors.phone} /> : null}
          </div>
          <div className={fieldGroup}>
            <Label htmlFor="referral" className="text-sm font-medium text-foreground">
              Referral code <span className="font-normal text-muted-foreground">(optional)</span>
            </Label>
            <Input id="referral" placeholder="ABC-123" className={inputClass(false)} value={formData.referral} onChange={handleChange} />
          </div>
        </div>

        <div className={fieldGroup}>
          <Label htmlFor="password" className={cn("text-sm font-medium", errors.password ? "text-destructive" : "text-foreground")}>
            Password
          </Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} placeholder="Create a password" className={cn(inputClass(!!errors.password), "pr-11")} value={formData.password} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.password} aria-describedby={errors.password ? "password-error" : undefined} />
            <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-1 top-1/2 flex size-9 min-h-9 min-w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground" aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
            </button>
          </div>
          {errors.password ? <FieldError id="password-error" message={errors.password} /> : null}
        </div>

        <div className={fieldGroup}>
          <Label htmlFor="confirmPassword" className={cn("text-sm font-medium", errors.confirmPassword ? "text-destructive" : "text-foreground")}>
            Confirm password
          </Label>
          <div className="relative">
            <Input id="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" className={cn(inputClass(!!errors.confirmPassword), "pr-11")} value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!errors.confirmPassword} aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined} />
            <button type="button" onClick={() => setShowConfirmPassword((p) => !p)} className="absolute right-1 top-1/2 flex size-9 min-h-9 min-w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>
              {showConfirmPassword ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
            </button>
          </div>
          {errors.confirmPassword ? <FieldError id="confirmPassword-error" message={errors.confirmPassword} /> : null}
        </div>

        <Button type="submit" disabled={isSubmitting} className="h-10 w-full rounded-full bg-foreground text-sm font-semibold text-background hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70">
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <div className="relative py-0 sm:py-1">
          <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
          <span className="relative mx-auto block w-fit bg-background px-3 text-xs text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button type="button" variant="outline" className="h-10 w-full rounded-full border-border bg-background text-sm font-medium hover:bg-muted/40">
          <GoogleIcon className="mr-2 size-4" />
          Sign up with Google
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground sm:mt-6">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
```

---

## Layout integration

Add to your root layout shell (adapt to your shell component name):

```tsx
function footerHidden(pathname: string) {
  return pathname === "/login" || pathname === "/signup";
}

function isAuthSplitRoute(pathname: string) {
  return pathname === "/login" || pathname === "/signup";
}

// Inside your shell render:
const authSplit = isAuthSplitRoute(pathname);
const hideFooter = footerHidden(pathname);

<SiteShell
  bleedUnderNav={authSplit}
  footer={hideFooter ? null : <SiteFooter />}
  scrollIndicator={authSplit ? null : <ScrollIndicator />}
  mainClassName={
    authSplit
      ? "flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-transparent"
      : "flex min-h-min flex-col"
  }
>
  <div className={authSplit ? "flex h-full min-h-0 flex-1 flex-col" : "flex flex-1 flex-col"}>
    {children}
  </div>
</SiteShell>
```

Your shell must give `main` a bounded height (`h-full min-h-0`) on auth routes so the split grid fills the viewport below the nav.

---

## `next.config.ts` — image domains

If using default Unsplash avatars, add:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
  ],
},
```

---

## Tailwind / theme tokens used

These shadcn CSS variables must exist (default shadcn theme works):

- `background`, `foreground`, `muted`, `muted-foreground`, `border`, `destructive`

Form styling relies on:

- `rounded-full` inputs (`h-10`)
- Primary button: `bg-foreground text-background rounded-full`
- Outline Google button: `variant="outline" rounded-full`

---

## Verification checklist

- [ ] `/login` — form left, collage right at ≥1280px width
- [ ] `/signup` — same split, longer form scrolls inside `#auth-form-scroll`
- [ ] Mobile — no right panel, form centered with nav offset padding
- [ ] Footer hidden on both routes
- [ ] Main collage image visible inside organic shape
- [ ] Kiwi card bottom-left, avatars top-right notch
- [ ] Inputs are pill-shaped; submit button full-width pill
- [ ] Login ↔ signup links work

---

## Source repo paths (OnDial)

| Asset / file | Location |
|--------------|----------|
| Main collage PNG | `public/auth/collage-chair.png` |
| Kiwi card JPG | `public/auth/two.jpg` |
| Config | `src/config/auth-ui.ts` |
| This pack | `src/config/auth-ui-ai-pack.md` |
