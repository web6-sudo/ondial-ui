import type { ReactNode } from "react";

import { AuthCollagePanel } from "@/components/auth/auth-collage-panel";
import { cn } from "@/lib/utils";

type AuthSplitLayoutProps = {
  children: ReactNode;
  fullScreen?: boolean;
  className?: string;
};

/** Mobile needs extra top space for the corner logo notch (~90px). */
const navContentOffset =
  "scroll-pt-[calc(env(safe-area-inset-top,0px)+5.75rem)] pt-[calc(env(safe-area-inset-top,0px)+5.75rem)] md:scroll-pt-[calc(env(safe-area-inset-top,0px)+4.25rem)] md:pt-[calc(env(safe-area-inset-top,0px)+4.25rem)]";

/** Top/bottom inset only — flush to the split edge (left) and shell edge (right). */
const collagePanelPad =
  "box-border flex flex-col pl-0 pr-1 pb-0 sm:pt-3 sm:pb-3 lg:pt-7 lg:pb-4 lg:pr-4" ;

/**
 * Form-heavy split on xl+: left column gets extra width; right fits the collage artboard.
 */
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

      <div
        className={cn("hidden h-full min-h-0 flex-col bg-background xl:flex")}
        aria-hidden
      >
        <div className={cn("min-h-0 w-full flex-1 overflow-visible", collagePanelPad)}>
          <div className="flex h-full min-h-0 w-full items-center justify-end overflow-visible">
            <AuthCollagePanel />
          </div>
        </div>
      </div>
    </div>
  );
}
