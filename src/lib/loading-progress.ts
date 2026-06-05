export type LoadProgressReporter = (value: number) => void;

const IMAGE_TIMEOUT_MS = 2800;
const WINDOW_LOAD_TIMEOUT_MS = 2200;
const MAX_TRACKED_IMAGES = 48;
const TICK_MS = 32;

function clampProgress(value: number) {
  return Math.min(100, Math.max(0, value));
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | undefined> {
  return Promise.race([
    promise.then((value) => value as T | undefined),
    delay(ms).then(() => undefined),
  ]);
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

  report(4);
  await ramp(4, 18, 3);

  await waitForDomReady();
  await ramp(progress, 36, 4);

  await waitForFonts();
  await ramp(progress, 52, 3);

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });

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

  await withTimeout(waitForWindowLoad(), WINDOW_LOAD_TIMEOUT_MS);
  await ramp(progress, 96, 2);

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

  report(8);
  await ramp(8, 32, 2);

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
  await ramp(progress, 58, 3);

  const imageStart = progress;
  const imageEnd = 90;
  let lastImageRatio = 0;

  await waitForVisibleImages((ratio) => {
    lastImageRatio = ratio;
    const next = imageStart + Math.round(ratio * (imageEnd - imageStart));
    if (next > progress) {
      report(next);
    }
  });

  if (progress < imageEnd) {
    await ramp(progress, imageEnd, Math.max(2, Math.round((1 - lastImageRatio) * 4)));
  }

  await withTimeout(waitForFonts(), 800);
  await ramp(progress, 96, 2);

  report(100);
}
