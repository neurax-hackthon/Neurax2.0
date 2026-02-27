/**
 * Gallery Data — NEURAX 2.0
 * Now uses dynamic imports to automatically discover images in src/assets/gallery
 */

// Import all images from the gallery assets folder
// We include both lowercase and uppercase extensions for robustness
const allImages = import.meta.glob('../assets/gallery/**/*.{jpg,jpeg,png,heic,HEIC,webp,JPG,JPEG,PNG}', {
    eager: true,
    query: '?url'
});

/**
 * Helper to process images for a specific folder
 */
const getImagesByFolder = (folderName) => {
    return Object.entries(allImages)
        .filter(([path]) => path.includes(`/gallery/${folderName}/`))
        .map(([path, module], index) => {
            const fileName = path.split('/').pop();
            const caption = fileName.split('.')[0]
                .replace(/[_-]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());

            return {
                id: `${folderName}-${index}`,
                caption: caption,
                src: module.default || module // Vite return pattern
            };
        })
        .sort((a, b) => a.caption.localeCompare(b.caption));
};

// ── 1. Inauguration ──────────────────────────────────────────────────────────
export const inaugurationImages = getImagesByFolder('inauguration');

// ── 2. Awards ────────────────────────────────────────────────────────────────
export const awardsImages = getImagesByFolder('awards');

// ── 3. Coding ────────────────────────────────────────────────────────────────
export const codingImages = getImagesByFolder('coding');

// ── 4. Activity ──────────────────────────────────────────────────────────────
export const activityImages = getImagesByFolder('activity');

// ── 5. Organization ──────────────────────────────────────────────────────────
export const organizationImages = getImagesByFolder('organization');

// ── Combined for Left Slideshow ──────────────────────────────────────────────
export const leftSlideImages = [
    ...inaugurationImages,
    ...awardsImages
];

// ── Legacy/Flat List ─────────────────────────────────────────────────────────
export const galleryItems = [
    ...leftSlideImages,
    ...codingImages,
    ...activityImages,
    ...organizationImages,
];
