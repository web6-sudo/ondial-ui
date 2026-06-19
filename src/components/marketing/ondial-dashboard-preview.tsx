import { AuthCollageScene } from "@/components/auth/auth-collage-scene";
import { cn } from "@/lib/utils";

type OndialDashboardPreviewProps = {
  className?: string;
  /** Match auth split panel — end-aligned, full-height column with collage clip */
  variant?: "default" | "auth-panel";
};

function DashboardSvg() {
  return (
    <svg
      viewBox="0 0 320 240"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      role="img"
      aria-label="OnDial AI call dashboard preview showing calls today, resolution rate, and CSAT score"
    >
      <rect width="320" height="240" fill="#F8F7FF" />
      <rect x="20" y="20" width="280" height="200" rx="10" fill="#fff" stroke="#CECBF6" strokeWidth="0.5" />
      <rect x="20" y="20" width="280" height="32" rx="10" fill="#EEEDFE" stroke="#CECBF6" strokeWidth="0.5" />
      <rect x="20" y="44" width="280" height="8" fill="#EEEDFE" />
      <text x="160" y="40" textAnchor="middle" fontSize="11" fontWeight="500" fill="#3C3489">
        OnDial — AI call dashboard
      </text>
      <rect x="36" y="64" width="80" height="50" rx="6" fill="#EEEDFE" stroke="#CECBF6" strokeWidth="0.5" />
      <text x="76" y="85" textAnchor="middle" fontSize="18" fontWeight="500" fill="#534AB7">
        3.2K
      </text>
      <text x="76" y="100" textAnchor="middle" fontSize="9" fill="#534AB7">
        Calls today
      </text>
      <rect x="128" y="64" width="80" height="50" rx="6" fill="#E1F5EE" stroke="#5DCAA5" strokeWidth="0.5" />
      <text x="168" y="85" textAnchor="middle" fontSize="18" fontWeight="500" fill="#085041">
        94%
      </text>
      <text x="168" y="100" textAnchor="middle" fontSize="9" fill="#085041">
        Resolution rate
      </text>
      <rect x="220" y="64" width="64" height="50" rx="6" fill="#FAEEDA" stroke="#FAC775" strokeWidth="0.5" />
      <text x="252" y="85" textAnchor="middle" fontSize="18" fontWeight="500" fill="#633806">
        4.9★
      </text>
      <text x="252" y="100" textAnchor="middle" fontSize="9" fill="#633806">
        CSAT score
      </text>
      <rect x="36" y="126" width="248" height="6" rx="2" fill="#E8E6DF" />
      <rect x="36" y="126" width="180" height="6" rx="2" fill="#7F77DD" />
      <text x="36" y="148" fontSize="8" fill="#888780">
        Live call activity
      </text>
      <rect x="36" y="154" width="28" height="40" rx="2" fill="#AFA9EC" />
      <rect x="72" y="140" width="28" height="54" rx="2" fill="#7F77DD" />
      <rect x="108" y="146" width="28" height="48" rx="2" fill="#AFA9EC" />
      <rect x="144" y="132" width="28" height="62" rx="2" fill="#534AB7" />
      <rect x="180" y="138" width="28" height="56" rx="2" fill="#7F77DD" />
      <rect x="216" y="144" width="28" height="50" rx="2" fill="#AFA9EC" />
      <rect x="252" y="130" width="28" height="64" rx="2" fill="#534AB7" />
      <rect x="36" y="208" width="100" height="6" rx="2" fill="#E8E6DF" />
      <rect x="148" y="208" width="60" height="6" rx="2" fill="#E8E6DF" />
      <rect x="220" y="208" width="64" height="6" rx="2" fill="#EEEDFE" />
    </svg>
  );
}

/**
 * Product dashboard mockup inside the login page collage clip frame.
 */
export function OndialDashboardPreview({
  className,
  variant = "auth-panel",
}: OndialDashboardPreviewProps) {
  const isAuthPanel = variant === "auth-panel";

  if (!isAuthPanel) {
    return (
      <div
        className={cn(
          "flex w-full items-center justify-center overflow-visible lg:justify-end",
          className,
        )}
      >
        <div className="relative ml-auto aspect-[4/3] w-full max-w-[min(100%,28rem)] sm:max-w-[min(100%,32rem)]">
          <div
            className={cn(
              "relative size-full overflow-hidden rounded-3xl border border-black/8 bg-background",
              "shadow-[0_2px_4px_rgb(15_23_42/0.04),0_24px_56px_-28px_rgb(83_74_183/0.28)]",
              "ring-1 ring-black/[0.03]",
            )}
          >
            <DashboardSvg />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthCollageScene
      className={cn("min-h-[20rem] sm:min-h-[22rem] lg:min-h-[26rem]", className)}
      showAvatars
      mainContent={
        <div className="flex size-full items-center justify-center p-[8%]">
          <div
            className={cn(
              "w-full max-w-[18.5rem] overflow-hidden rounded-2xl border border-black/8 bg-background",
              "shadow-[0_2px_4px_rgb(15_23_42/0.04),0_20px_48px_-24px_rgb(83_74_183/0.28)]",
              "ring-1 ring-black/[0.03]",
            )}
          >
            <DashboardSvg />
          </div>
        </div>
      }
    />
  );
}
