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
