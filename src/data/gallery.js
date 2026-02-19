/**
 * Gallery Data — NEURAX 2.0
 *
 * HOW TO ADD IMAGES:
 * 1. Drop your photo into the correct folder inside public/gallery/
 *    ├── public/gallery/inauguration/  → LEFT COLUMN slideshow
 *    ├── public/gallery/coding/        → RIGHT top slot
 *    ├── public/gallery/teamwork/      → RIGHT middle slot
 *    └── public/gallery/awards/        → RIGHT bottom slot
 *
 * 2. Add an entry below matching the file path exactly.
 *    src format: '/gallery/<subfolder>/<filename>'
 *
 * NOTE: .HEIC files are NOT supported in browsers. Use .jpg / .jpeg / .png / .webp only.
 */

// ── Inauguration — LEFT column slideshow ─────────────────────────────────────
export const inaugurationImages = [
    { id: 'i1', category: 'Inauguration', caption: 'Opening ceremony', src: '/gallery/inauguration/IMG_20250921_020955.jpg' },
    { id: 'i2', category: 'Inauguration', caption: 'Inauguration moment', src: '/gallery/inauguration/IMG_20250921_024727.jpg' },
    { id: 'i3', category: 'Inauguration', caption: 'Event kick-off', src: '/gallery/inauguration/IMG_20250921_040859.jpg' },
    { id: 'i4', category: 'Inauguration', caption: 'Guest address', src: '/gallery/inauguration/IMG_20250921_094706.jpg' },
    { id: 'i5', category: 'Inauguration', caption: 'Stage moments', src: '/gallery/inauguration/IMG_20250921_112327.jpg' },
    { id: 'i6', category: 'Inauguration', caption: 'Chief guest keynote', src: '/gallery/inauguration/IMG_20250921_112447.jpg' },
];

// ── Coding — RIGHT top slot, slideshow ───────────────────────────────────────
export const codingImages = [
    { id: 'c1', category: 'Coding', caption: 'Late night coding sessions', src: '/gallery/coding/IMG_20250921_011308.jpg' },
    { id: 'c2', category: 'Coding', caption: 'Debugging at midnight', src: '/gallery/coding/IMG_20250921_113818.jpg' },
];

// ── Teamwork — RIGHT middle slot (add images here) ────────────────────────────
export const teamworkImages = [
    // No images uploaded yet — placeholder shown until you add photos here
    { id: 't1', category: 'Teamwork', caption: 'Teams brainstorming ideas', src: '', color: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)' },
    { id: 't2', category: 'Teamwork', caption: 'Collaboration in action', src: '', color: 'linear-gradient(135deg, #ECFEFF, #CFFAFE)' },
];

// ── Awards — RIGHT bottom slot ────────────────────────────────────────────────
export const awardsImages = [
    { id: 'a1', category: 'Awards', caption: 'Winners on stage', src: '/gallery/awards/IMG_20250921_011308.jpg' },
    { id: 'a2', category: 'Awards', caption: 'Prize distribution', src: '/gallery/awards/IMG_20250921_113818.jpg' },
    { id: 'a3', category: 'Awards', caption: 'Award ceremony', src: '/gallery/awards/id_card.jpeg' },
];

// ── Flat list used by the "All" tab filter (legacy support) ──────────────────
export const galleryItems = [
    ...inaugurationImages,
    ...codingImages,
    ...teamworkImages,
    ...awardsImages,
];
