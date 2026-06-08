import gsap from "gsap";

type BrandAnimationOptions = {
  reducedMotion?: boolean;
};

const CUBE_BOX_WIDTH = "0.56em";
const CUBE_ROTATION_END = -360;
const CUBE_ROTATION_DURATION = 2.4;

function applyFinalBrandState(root: HTMLElement) {
  const loadingLetters = root.querySelectorAll<HTMLElement>("[data-loader-letter]");
  const box = root.querySelector<HTMLElement>("[data-loader-box]");
  const growingImage = root.querySelector<HTMLElement>("[data-loader-growing-image]");
  const headingStart = root.querySelector<HTMLElement>("[data-loader-heading-start]");
  const headingEnd = root.querySelector<HTMLElement>("[data-loader-heading-end]");
  const cube = root.querySelector<HTMLElement>("[data-loader-cube]");

  gsap.set(loadingLetters, { yPercent: 0 });
  if (box) gsap.set(box, { width: CUBE_BOX_WIDTH });
  if (growingImage) gsap.set(growingImage, { width: "100%" });
  if (headingStart) gsap.set(headingStart, { x: 0 });
  if (headingEnd) gsap.set(headingEnd, { x: 0 });
  if (cube) gsap.set(cube, { rotationX: 0, force3D: true, transformPerspective: 900 });
}

export function runLoaderBrandAnimation(
  root: HTMLElement,
  options: BrandAnimationOptions = {},
): gsap.core.Timeline | null {
  const loadingLetters = root.querySelectorAll<HTMLElement>("[data-loader-letter]");
  const box = root.querySelector<HTMLElement>("[data-loader-box]");
  const growingImage = root.querySelector<HTMLElement>("[data-loader-growing-image]");
  const headingStart = root.querySelector<HTMLElement>("[data-loader-heading-start]");
  const headingEnd = root.querySelector<HTMLElement>("[data-loader-heading-end]");
  const cube = root.querySelector<HTMLElement>("[data-loader-cube]");

  gsap.set(loadingLetters, { yPercent: 110 });
  if (box) gsap.set(box, { width: "0em" });
  if (growingImage) gsap.set(growingImage, { width: "0%" });
  if (headingStart) gsap.set(headingStart, { x: "0em" });
  if (headingEnd) gsap.set(headingEnd, { x: "0em" });
  if (cube) gsap.set(cube, { rotationX: 0, force3D: true, transformPerspective: 900 });

  if (options.reducedMotion) {
    applyFinalBrandState(root);
    return null;
  }

  const tl = gsap.timeline({
    defaults: { ease: "expo.inOut" },
    onComplete: () => applyFinalBrandState(root),
  });

  if (loadingLetters.length) {
    tl.to(loadingLetters, {
      yPercent: 0,
      duration: 0.62,
      ease: "power3.out",
      stagger: {
        each: 0.05,
        from: "start",
        ease: "power3.out",
      },
    });
  }

  if (box) {
    tl.to(box, { width: CUBE_BOX_WIDTH, duration: 0.68, ease: "power3.out" }, ">");
  }

  if (growingImage) {
    tl.to(growingImage, { width: "100%", duration: 0.68, ease: "power3.out" }, "<");
  }

  if (cube) {
    tl.to(
      cube,
      {
        rotationX: CUBE_ROTATION_END,
        duration: CUBE_ROTATION_DURATION,
        ease: "none",
        force3D: true,
        transformPerspective: 900,
      },
      ">-0.04",
    );
  }

  return tl;
}
