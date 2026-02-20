import { useState, useEffect, useCallback, useRef } from 'react';
import SectionHeader from '../ui/SectionHeader';
import { leftSlideImages, codingImages, activityImages, organizationImages } from '../../data/gallery';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const FADE_MS = 450;       // fade duration in ms
const SLIDE_INTERVAL = 3500; // auto-advance interval for left panel

// ─────────────────────────────────────────────────────────────────────────────
// Helper — single image or gradient placeholder
// ─────────────────────────────────────────────────────────────────────────────
function SlotImage({ item, style = {} }) {
    if (!item) return null;
    if (item.src) {
        return (
            <img
                src={item.src}
                alt={item.caption}
                style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', display: 'block',
                    ...style,
                }}
            />
        );
    }
    return (
        <div style={{
            position: 'absolute', inset: 0,
            background: item.color || 'linear-gradient(135deg,#EFF6FF,#DBEAFE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', userSelect: 'none',
        }}>
            {item.category === 'Coding' ? '💻'
                : item.category === 'Teamwork' ? '🤝'
                    : item.category === 'Awards' ? '🏆' : '🎤'}
        </div>
    );
}

// Caption component removed — no labels shown on images

// ─────────────────────────────────────────────────────────────────────────────
// Fade wrapper — one single <img> whose src is swapped; opacity handles fade.
// Blinking is avoided because we NEVER unmount the image element.
// ─────────────────────────────────────────────────────────────────────────────
function FadeSlot({ item, style = {} }) {
    const [opacity, setOpacity] = useState(1);
    const [displayed, setDisplayed] = useState(item);

    useEffect(() => {
        if (!item || item === displayed) return;
        // Step 1 — fade out
        setOpacity(0);
        const t = setTimeout(() => {
            // Step 2 — swap content while invisible
            setDisplayed(item);
            // Step 3 — fade back in (next paint)
            requestAnimationFrame(() => setOpacity(1));
        }, FADE_MS);
        return () => clearTimeout(t);
    }, [item]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div style={{ ...style, transition: `opacity ${FADE_MS}ms ease`, opacity }}>
            <SlotImage item={displayed} />
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Nav arrow button (semi-transparent, no layout shift)
// ─────────────────────────────────────────────────────────────────────────────
const NavBtn = ({ dir, onClick }) => (
    <button
        onClick={onClick}
        aria-label={dir === 'prev' ? 'Previous image' : 'Next image'}
        style={{
            position: 'absolute',
            top: '50%', transform: 'translateY(-50%)',
            [dir === 'prev' ? 'left' : 'right']: '12px',
            zIndex: 4,
            background: 'rgba(255,255,255,0.75)',
            border: 'none', borderRadius: '50%',
            width: '38px', height: '38px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', color: '#0F172A',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.95)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.75)')}
    >
        {dir === 'prev' ? '‹' : '›'}
    </button>
);

// ─────────────────────────────────────────────────────────────────────────────
// Dot indicator strip
// ─────────────────────────────────────────────────────────────────────────────
function Dots({ count, active, onSelect }) {
    if (count <= 1) return null;
    return (
        <div style={{
            position: 'absolute', bottom: '12px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', gap: '6px', zIndex: 4,
        }}>
            {Array.from({ length: count }, (_, i) => (
                <div
                    key={i}
                    onClick={e => { e.stopPropagation(); onSelect(i); }}
                    style={{
                        width: i === active ? '20px' : '8px',
                        height: '8px', borderRadius: '4px',
                        background: i === active ? '#fff' : 'rgba(255,255,255,0.45)',
                        cursor: 'pointer',
                        transition: 'width 0.3s ease, background 0.3s ease',
                    }}
                />
            ))}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Lightweight Modal — no framer-motion, no re-render flash
// ─────────────────────────────────────────────────────────────────────────────
function Modal({ images, startIndex, onClose }) {
    const [idx, setIdx] = useState(startIndex);
    const [opacity, setOpacity] = useState(1);
    const [displayed, setDisplayed] = useState(images[startIndex]);

    // Disable body scroll while open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [idx]); // eslint-disable-line react-hooks/exhaustive-deps

    const go = useCallback((dir) => {
        const next = (idx + dir + images.length) % images.length;
        setOpacity(0);
        setTimeout(() => {
            setIdx(next);
            setDisplayed(images[next]);
            requestAnimationFrame(() => setOpacity(1));
        }, FADE_MS);
    }, [idx, images]);

    const item = displayed;

    return (
        // Overlay — click outside to close
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, zIndex: 10000,
                background: 'rgba(10,10,20,0.82)',
                backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '16px',
                animation: 'modalFadeIn 0.25s ease',
            }}
        >
            {/* Card — stop propagation so clicks inside don't close */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    position: 'relative',
                    width: '90vw', maxWidth: '820px',
                    aspectRatio: '16/9',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: item?.src ? '#0F172A' : (item?.color || '#EFF6FF'),
                    boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.15)',
                }}
            >
                {/* Image area with fade */}
                <div style={{ position: 'absolute', inset: 0, transition: `opacity ${FADE_MS}ms ease`, opacity }}>
                    <SlotImage item={item} />
                </div>

                {/* Prev / Next */}
                {images.length > 1 && (
                    <>
                        <NavBtn dir="prev" onClick={() => go(-1)} />
                        <NavBtn dir="next" onClick={() => go(1)} />
                    </>
                )}

                {/* Dots */}
                <Dots count={images.length} active={idx} onSelect={(i) => {
                    if (i === idx) return;
                    const dir = i > idx ? 1 : -1;
                    setOpacity(0);
                    setTimeout(() => {
                        setIdx(i);
                        setDisplayed(images[i]);
                        requestAnimationFrame(() => setOpacity(1));
                    }, FADE_MS);
                }} />

                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    style={{
                        position: 'absolute', top: '14px', right: '14px', zIndex: 5,
                        background: 'rgba(255,255,255,0.9)',
                        border: 'none', borderRadius: '50%',
                        width: '38px', height: '38px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1rem', color: '#0F172A',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                        transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.9)')}
                >
                    ✕
                </button>
            </div>

            {/* Counter badge */}
            {images.length > 1 && (
                <div style={{
                    position: 'absolute', bottom: '28px', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(6px)',
                    color: '#fff', fontSize: '.85rem',
                    padding: '4px 14px', borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                }}>
                    {idx + 1} / {images.length}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared card base styles
// ─────────────────────────────────────────────────────────────────────────────
const cardBase = {
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border-light)',
};

// ─────────────────────────────────────────────────────────────────────────────
// Gallery Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Gallery() {
    // Left featured panel state
    const [leftIdx, setLeftIdx] = useState(0);
    const leftImages = leftSlideImages;  // inauguration + awards combined

    // Modal state: null = closed, { images, startIndex } = open
    const [modal, setModal] = useState(null);

    // ── Auto-slideshow for left panel ──
    const hoverRef = useRef(false);
    useEffect(() => {
        if (leftImages.length <= 1) return;
        const timer = setInterval(() => {
            if (hoverRef.current) return; // pause on hover
            setLeftIdx(i => (i + 1) % leftImages.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [leftImages.length]);

    // Right panel: one image per slot — clicking opens all images from that folder in the modal
    const rightSlots = [
        { images: codingImages, label: 'Coding' },
        { images: activityImages, label: 'Activity' },
        { images: organizationImages, label: 'Organization' },
    ];

    // Left nav helpers
    const goLeft = (dir) => {
        setLeftIdx(i => (i + dir + leftImages.length) % leftImages.length);
    };

    return (
        <>
            {/* Global keyframe for modal animation */}
            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                @media (max-width: 720px) {
                    .gallery-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .gallery-right {
                        grid-template-rows: repeat(3, 200px) !important;
                        aspect-ratio: unset !important;
                    }
                }
            `}</style>

            <section id="gallery" className="section" style={{ background: 'var(--bg-primary)' }}>
                <div className="container">
                    <SectionHeader
                        tag="// Memories"
                        title="Event"
                        highlight="Gallery"
                        desc="Relive the moments from NEURAX 1.0. NEURAX 2.0 will be even bigger!"
                    />

                    {/* ── Asymmetric grid ── */}
                    <div
                        className="gallery-grid"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr',
                            gap: '16px',
                            alignItems: 'stretch', /* left card stretches to match right column height */
                        }}
                    >
                        {/* ── LEFT — Large featured panel with auto + manual nav ── */}
                        <div
                            style={{
                                ...cardBase,
                                borderRadius: '20px',
                                minHeight: '200px', /* collapse guard; height driven by right column */
                                cursor: 'zoom-in',
                            }}
                            onClick={() => setModal({ images: leftImages, startIndex: leftIdx })}
                            onMouseEnter={() => { hoverRef.current = true; }}
                            onMouseLeave={() => { hoverRef.current = false; }}
                        >
                            {/* Single FadeSlot — no blinking because element never unmounts */}
                            <FadeSlot
                                item={leftImages[leftIdx]}
                                style={{ position: 'absolute', inset: 0 }}
                            />

                            {/* Prev / Next — stop click propagation to avoid opening modal */}
                            {leftImages.length > 1 && (
                                <>
                                    <NavBtn dir="prev" onClick={e => { e.stopPropagation(); goLeft(-1); }} />
                                    <NavBtn dir="next" onClick={e => { e.stopPropagation(); goLeft(1); }} />
                                </>
                            )}

                            {/* Dots */}
                            <Dots
                                count={leftImages.length}
                                active={leftIdx}
                                onSelect={i => setLeftIdx(i)}
                            />
                        </div>

                        {/* ── RIGHT — 3 stacked slots ── */}
                        <div
                            className="gallery-right"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '16px',
                            }}
                        >
                            {rightSlots.map(({ images, label }) => (
                                <div
                                    key={label}
                                    style={{
                                        ...cardBase,
                                        borderRadius: '14px',
                                        aspectRatio: '16/9',
                                        cursor: 'zoom-in',
                                    }}
                                    onClick={() => setModal({ images, startIndex: 0 })}
                                >
                                    {/* Image */}
                                    <SlotImage item={images[0]} />

                                    {/* Folder name label — bottom left */}
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0,
                                        background: 'linear-gradient(to top, rgba(15,23,42,0.72) 0%, transparent 100%)',
                                        padding: '20px 12px 8px',
                                        pointerEvents: 'none',
                                        zIndex: 3,
                                        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                                    }}>
                                        <span style={{
                                            color: '#fff', fontWeight: 700, fontSize: '.82rem',
                                            letterSpacing: '0.04em', textTransform: 'uppercase',
                                        }}>
                                            {label}
                                        </span>
                                        {/* Photo count badge */}
                                        {images.length > 1 && (
                                            <span style={{
                                                background: 'rgba(255,255,255,0.2)',
                                                backdropFilter: 'blur(4px)',
                                                color: '#fff', fontSize: '.68rem', fontWeight: 700,
                                                padding: '2px 8px', borderRadius: '20px',
                                                border: '1px solid rgba(255,255,255,0.3)',
                                            }}>
                                                +{images.length - 1} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Modal — rendered outside section to avoid stacking context issues ── */}
            {modal && (
                <Modal
                    images={modal.images}
                    startIndex={modal.startIndex}
                    onClose={() => setModal(null)}
                />
            )}
        </>
    );
}
