export type LoadProgressReporter = (value: number) => void;

const IMAGE_TIMEOUT_MS = 4500;
const MAX_TRACKED_IMAGES = 48;
const TICK_MS = 48;

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function waitForDomReady(): Promise<void> {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
  });
}

function waitForWindowLoad(): Promise<void> {
  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

function waitForFonts(): Promise<void> {
  if (!document.fonts?.ready) {
    return Promise.resolve();
  }

  return document.fonts.ready.then(() => undefined).catch(() => undefined);
}

function waitForImage(img: HTMLImageElement): Promise<void> {
  if (img.complete && img.naturalWidth > 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const done = () => {
      clearTimeout(timeoutId);
      img.removeEventListener("load", done);
      img.removeEventListener("error", done);
      resolve();
    };

    const timeoutId = window.setTimeout(done, IMAGE_TIMEOUT_MS);
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
  });
}

async function waitForVisibleImages(onPartial: (ratio: number) => void): Promise<void> {
  const images = Array.from(document.images).slice(0, MAX_TRACKED_IMAGES);
  if (images.length === 0) {
    onPartial(1);
    return;
  }

  let loaded = 0;
  const report = () => {
    loaded += 1;
    onPartial(loaded / images.length);
  };

  await Promise.all(
    images.map(async (image) => {
      await waitForImage(image);
      report();
    }),
  );
}

/**
 * Resolves when core page assets are ready. Reports monotonic progress in 0–100.
 */
export async function runLoadProgress(reporter: LoadProgressReporter): Promise<void> {
  let progress = 0;

  const report = (next: number) => {
    progress = clampProgress(Math.max(progress, next));
    reporter(progress);
  };

  const ramp = async (from: number, to: number, steps: number) => {
    if (steps <= 0 || to <= from) {
      report(to);
      return;
    }
    const stepSize = (to - from) / steps;
    for (let i = 1; i <= steps; i += 1) {
      report(Math.round(from + stepSize * i));
      await delay(TICK_MS);
    }
  };

  report(2);
  await ramp(2, 12, 4);

  await waitForDomReady();
  await ramp(progress, 28, 6);

  await waitForFonts();
  await ramp(progress, 40, 5);

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

  const imageStart = progress;
  const imageEnd = 82;
  let lastImageRatio = 0;

  await waitForVisibleImages((ratio) => {
    lastImageRatio = ratio;
    const next = imageStart + Math.round(ratio * (imageEnd - imageStart));
    if (next > progress) {
      report(next);
    }
  });

  if (progress < imageEnd) {
    await ramp(progress, imageEnd, Math.max(3, Math.round((1 - lastImageRatio) * 8)));
  }

  await waitForWindowLoad();
  await ramp(progress, 94, 4);

  await delay(TICK_MS);
  report(97);
  await delay(TICK_MS);
  report(99);
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  report(100);
}

/**
 * Shorter progress curve for client-side route changes (DOM/window are already warm).
 */
export async function runNavigationProgress(reporter: LoadProgressReporter): Promise<void> {
  let progress = 0;

  const report = (next: number) => {
    progress = clampProgress(Math.max(progress, next));
    reporter(progress);
  };

  const ramp = async (from: number, to: number, steps: number) => {
    if (steps <= 0 || to <= from) {
      report(to);
      return;
    }
    const stepSize = (to - from) / steps;
    for (let i = 1; i <= steps; i += 1) {
      report(Math.round(from + stepSize * i));
      await delay(TICK_MS);
    }
  };

  report(4);
  await ramp(4, 22, 3);

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
  await ramp(progress, 48, 4);

  const imageStart = progress;
  const imageEnd = 88;
  let lastImageRatio = 0;

  await waitForVisibleImages((ratio) => {
    lastImageRatio = ratio;
    const next = imageStart + Math.round(ratio * (imageEnd - imageStart));
    if (next > progress) {
      report(next);
    }
  });

  if (progress < imageEnd) {
    await ramp(progress, imageEnd, Math.max(2, Math.round((1 - lastImageRatio) * 5)));
  }

  await waitForFonts();
  await ramp(progress, 96, 3);

  await delay(TICK_MS);
  report(99);
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  report(100);
}
