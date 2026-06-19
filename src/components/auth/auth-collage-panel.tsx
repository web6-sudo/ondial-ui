import { AuthCollageScene } from "@/components/auth/auth-collage-scene";

const MAIN_CARD_IMAGE = "/auth/collage-chair.png";

type AuthCollagePanelProps = {
  className?: string;
  fit?: "height" | "width";
};

export function AuthCollagePanel({ className, fit = "height" }: AuthCollagePanelProps) {
  return (
    <AuthCollageScene
      className={className}
      fit={fit}
      mainImageSrc={MAIN_CARD_IMAGE}
      showKiwi
      showAvatars
    />
  );
}
