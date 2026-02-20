/**
 * Gallery Data — NEURAX 2.0
 *
 * FOLDER MAP  (drop photos into the correct folder inside public/gallery/)
 * ─────────────────────────────────────────────────────────────────────────
 *  public/gallery/inauguration/   → LEFT slideshow  (inauguration)
 *  public/gallery/awards/         → LEFT slideshow  (awards, jpg/jpeg/png/webp only)
 *  public/gallery/coding/         → RIGHT slot 1    "Coding"
 *  public/gallery/activity/       → RIGHT slot 2    "Activity"
 *  public/gallery/organization/   → RIGHT slot 3    "Organization"
 *
 * NOTE: .HEIC files are NOT supported in browsers. Use .jpg/.jpeg/.png/.webp only.
 */

// ── LEFT column — combined Inauguration + Awards slideshow ───────────────────
export const leftSlideImages = [
    // Inauguration
    { id: 'i1', caption: 'Opening ceremony', src: '/gallery/inauguration/IMG_20250921_020955.jpg' },
    { id: 'i2', caption: 'Inauguration moment', src: '/gallery/inauguration/IMG_20250921_024727.jpg' },
    { id: 'i3', caption: 'Event kick-off', src: '/gallery/inauguration/IMG_20250921_040859.jpg' },
    { id: 'i4', caption: 'Guest address', src: '/gallery/inauguration/IMG_20250921_094706.jpg' },
    { id: 'i5', caption: 'Stage moments', src: '/gallery/inauguration/IMG_20250921_112327.jpg' },
    { id: 'i6', caption: 'Chief guest keynote', src: '/gallery/inauguration/IMG_20250921_112447.jpg' },
    // Awards  (.HEIC skipped — browser unsupported)
    { id: 'a1', caption: 'Winners on stage', src: '/gallery/awards/IMG_20250921_011308.jpg' },
    { id: 'a2', caption: 'Prize distribution', src: '/gallery/awards/IMG_20250921_113818.jpg' },
    { id: 'a3', caption: 'Award ceremony', src: '/gallery/awards/id_card.jpeg' },
];

// ── RIGHT slot 1 — Coding ────────────────────────────────────────────────────
export const codingImages = [
    { id: 'c1', caption: 'Late night coding sessions', src: '/gallery/coding/IMG_20250921_011308.jpg' },
    { id: 'c2', caption: 'Debugging at midnight', src: '/gallery/coding/IMG_20250921_113818.jpg' },
];

// ── RIGHT slot 2 — Activity ──────────────────────────────────────────────────
// Drop photos into public/gallery/activity/ and add entries here.
export const activityImages = [
    // Placeholder shown until photos are added
    { id: 'act1', caption: 'Activity highlights', src: '', color: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)' },
];

// ── RIGHT slot 3 — Organization ──────────────────────────────────────────────
// Drop photos into public/gallery/organization/ and add entries here.
export const organizationImages = [
    // Placeholder shown until photos are added
    { id: 'org1', caption: 'Our organizers', src: '', color: 'linear-gradient(135deg,#FFF7ED,#FED7AA)' },
];

// ── Legacy flat list (kept for any existing imports) ─────────────────────────
export const galleryItems = [
    ...leftSlideImages,
    ...codingImages,
    ...activityImages,
    ...organizationImages,
];

// ── Legacy named exports (kept so old imports don't break) ───────────────────
export const inaugurationImages = leftSlideImages;
export const awardsImages = leftSlideImages;
export const teamworkImages = activityImages;
