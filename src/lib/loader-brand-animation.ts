import gsap from "gsap";

type BrandAnimationOptions = {
  reducedMotion?: boolean;
};

function applyFinalBrandState(root: HTMLElement) {
  const loadingLetters = root.querySelectorAll<HTMLElement>("[data-loader-letter]");
  const box = root.querySelector<HTMLElement>("[data-loader-box]");
  const growingImage = root.querySelector<HTMLElement>("[data-loader-growing-image]");
  const headingStart = root.querySelector<HTMLElement>("[data-loader-heading-start]");
  const headingEnd = root.querySelector<HTMLElement>("[data-loader-heading-end]");
  const coverExtras = root.querySelectorAll<HTMLElement>("[data-loader-cover-extra]");

  gsap.set(loadingLetters, { yPercent: 0 });
  if (box) gsap.set(box, { width: "1em" });
  if (growingImage) gsap.set(growingImage, { width: "100%" });
  if (headingStart) gsap.set(headingStart, { x: "-0.04em" });
  if (headingEnd) gsap.set(headingEnd, { x: "0.04em" });
  gsap.set(coverExtras, { opacity: 0 });
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
  const coverExtras = root.querySelectorAll<HTMLElement>("[data-loader-cover-extra]");

  gsap.set(loadingLetters, { yPercent: 110 });
  if (box) gsap.set(box, { width: "0em" });
  if (growingImage) gsap.set(growingImage, { width: "0%" });
  if (headingStart) gsap.set(headingStart, { x: "0em" });
  if (headingEnd) gsap.set(headingEnd, { x: "0em" });
  gsap.set(coverExtras, { opacity: 1 });

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
    tl.to(box, { width: "1em", duration: 0.68, ease: "power3.out" }, ">");
  }

  if (growingImage) {
    tl.to(growingImage, { width: "100%", duration: 0.68, ease: "power3.out" }, "<");
  }

  if (headingStart) {
    tl.to(headingStart, { x: "-0.04em", duration: 0.68, ease: "power3.out" }, "<");
  }

  if (headingEnd) {
    tl.to(headingEnd, { x: "0.04em", duration: 0.68, ease: "power3.out" }, "<");
  }

  if (coverExtras.length) {
    tl.to(
      coverExtras,
      { opacity: 0, duration: 0.05, ease: "none", stagger: 0.5 },
      ">-0.06",
    );
  }

  return tl;
}
