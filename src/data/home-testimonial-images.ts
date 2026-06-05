const TESTIMONIAL_PHOTO_DIR = "/home/testimonials";

/** Maps Unsplash photo id → self-hosted WebP path. */
export function testimonialPhotoPath(unsplashId: string): string {
  const slug = unsplashId.replace(/^photo-/, "");
  return `${TESTIMONIAL_PHOTO_DIR}/${slug}.webp`;
}
