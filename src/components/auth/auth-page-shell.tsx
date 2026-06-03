import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuthPageShellProps = {
  children: ReactNode;
  className?: string;
  /** Edge-to-edge split layout filling the area below the sticky nav. */
  fullScreen?: boolean;
};

/**
 * Login + signup: centered under the nav, or full-screen split (`fullScreen`).
 */
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
