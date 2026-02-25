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
    { id: 'i1', caption: 'Inauguration 1', src: '/gallery/inauguration/1.jpg' },
    { id: 'i2', caption: 'Inauguration 2', src: '/gallery/inauguration/2.jpg' },
    { id: 'i3', caption: 'Inauguration 3', src: '/gallery/inauguration/3.jpg' },
    { id: 'i4', caption: 'Inauguration 4', src: '/gallery/inauguration/4.heic' },
    { id: 'i5', caption: 'Inauguration 5', src: '/gallery/inauguration/5.jpg' },
    { id: 'i6', caption: 'Inauguration 6', src: '/gallery/inauguration/6.heic' },
    { id: 'i7', caption: 'Inauguration 7', src: '/gallery/inauguration/7.heic' },
    // Awards
    { id: 'a1', caption: '1st Prize', src: '/gallery/awards/one_prize.HEIC' },
    { id: 'a2', caption: '2nd Prize', src: '/gallery/awards/2nd prize.HEIC' },
    { id: 'a3', caption: '3rd Prize', src: '/gallery/awards/3rd prize.HEIC' },
    { id: 'a4', caption: 'Organizer Team', src: '/gallery/awards/organizer team.HEIC' },
    { id: 'a5', caption: 'Top Finalists', src: '/gallery/awards/top finalists.jpg' },
];

// ── RIGHT slot 1 — Coding ────────────────────────────────────────────────────
export const codingImages = [
    { id: 'c1', caption: 'Coding Session', src: '/gallery/coding/IMG_20250921_011308.jpg' },
    { id: 'c2', caption: 'Coding Activity', src: '/gallery/coding/coding1.jpg' },
    { id: 'c3', caption: 'Coding Speech', src: '/gallery/coding/coing speech2.HEIC' },
    { id: 'c4', caption: 'Last Coding', src: '/gallery/coding/last coding.HEIC' },
];

// ── RIGHT slot 2 — Activity ──────────────────────────────────────────────────
export const activityImages = [
    // Reusing some from inauguration if activity is empty, or keeping as placeholder
    { id: 'act1', caption: 'Activity highlights', src: '', color: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)' },
];

// ── RIGHT slot 3 — Organization ──────────────────────────────────────────────
export const organizationImages = [
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
