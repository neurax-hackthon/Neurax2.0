import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { inaugurationImages, codingImages, teamworkImages, awardsImages } from '../../data/gallery';

const SLIDE_INTERVAL = 4000; // ms between auto-slides
const FADE_DURATION = 550;  // ms fade transition

const icons = { Coding: '💻', Teamwork: '🤝', Awards: '🏆', Inauguration: '🎤' };

// ── Single image/placeholder renderer ────────────────────────────────────────
function SlotImage({ item }) {
    if (!item) return null;
    if (item.src) {
        return (
            <img
                src={item.src}
                alt={item.caption}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
        );
    }
    return (
        <div style={{
            position: 'absolute', inset: 0,
            background: item.color || 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5rem',
        }}>
            {icons[item.category] || '📷'}
        </div>
    );
}

// ── Reusable caption overlay ──────────────────────────────────────────────────
function CaptionOverlay({ caption, fontSize = '0.95rem', padding = '18px' }) {
    return (
        <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(15,23,42,0.65) 0%, transparent 55%)',
            display: 'flex', alignItems: 'flex-end', padding,
        }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize }}>{caption}</span>
        </div>
    );
}

// ── Slideshow hook ────────────────────────────────────────────────────────────
function useSlideshow(items) {
    const [idx, setIdx] = useState(0);
    const [fading, setFading] = useState(false);
    const hoveringRef = useRef(false);
    const len = items.length;

    const advance = useCallback(() => {
        if (hoveringRef.current || len <= 1) return;
        setFading(true);
        setTimeout(() => {
            setIdx(i => (i + 1) % len);
            setFading(false);
        }, FADE_DURATION);
    }, [len]);

    useEffect(() => {
        setIdx(0);
        setFading(false);
    }, [items]);

    useEffect(() => {
        if (len <= 1) return;
        const timer = setInterval(advance, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [advance, len]);

    return { idx, fading, hoveringRef, setIdx, current: items[idx] || items[0] };
}

export default function Gallery() {
    const [lightbox, setLightbox] = useState(null);

    // Independent slideshows per column
    const left = useSlideshow(inaugurationImages);
    const rightT = useSlideshow(codingImages);   // top-right  = Coding
    const rightM = useSlideshow(teamworkImages); // mid-right  = Teamwork
    const rightB = useSlideshow(awardsImages);   // bot-right  = Awards

    const fadeStyle = (fading) => ({
        transition: `opacity ${FADE_DURATION}ms ease`,
        opacity: fading ? 0 : 1,
    });

    const cardBase = (extra = {}) => ({
        position: 'relative', overflow: 'hidden',
        boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)',
        cursor: 'zoom-in', ...extra,
    });

    return (
        <section id="gallery" className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Memories"
                    title="Event"
                    highlight="Gallery"
                    desc="Relive the moments from NEURAX 1.0. NEURAX 2.0 will be even bigger!"
                />

                {/* ── Asymmetric Grid ── */}
                <div
                    className="gallery-asymmetric"
                    style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', alignItems: 'stretch' }}
                    onMouseEnter={() => {
                        left.hoveringRef.current = true;
                        rightT.hoveringRef.current = true;
                        rightM.hoveringRef.current = true;
                        rightB.hoveringRef.current = true;
                    }}
                    onMouseLeave={() => {
                        left.hoveringRef.current = false;
                        rightT.hoveringRef.current = false;
                        rightM.hoveringRef.current = false;
                        rightB.hoveringRef.current = false;
                    }}
                >
                    {/* LEFT — Inauguration slideshow (large) */}
                    <div
                        onClick={() => setLightbox(left.current)}
                        style={{ ...cardBase({ borderRadius: '20px', aspectRatio: '4/3' }), ...fadeStyle(left.fading) }}
                    >
                        <SlotImage item={left.current} />
                        <CaptionOverlay caption={left.current?.caption} fontSize="1rem" padding="24px" />

                        {/* Dot indicators */}
                        {inaugurationImages.length > 1 && (
                            <div style={{ position: 'absolute', bottom: '14px', right: '14px', display: 'flex', gap: '6px', zIndex: 2 }}>
                                {inaugurationImages.map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={e => { e.stopPropagation(); if (!left.fading) left.setIdx(i); }}
                                        style={{
                                            width: i === left.idx ? '20px' : '8px', height: '8px',
                                            borderRadius: '4px', cursor: 'pointer', transition: 'all 0.35s ease',
                                            background: i === left.idx ? '#fff' : 'rgba(255,255,255,0.4)',
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT — 3 slots stacked: Coding / Teamwork / Awards */}
                    <div style={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)', gap: '16px', aspectRatio: '3/4' }}>

                        {/* TOP — Coding */}
                        <div
                            onClick={() => setLightbox(rightT.current)}
                            style={{ ...cardBase({ borderRadius: '14px', minHeight: 0 }), ...fadeStyle(rightT.fading) }}
                        >
                            <SlotImage item={rightT.current} />
                            <CaptionOverlay caption={rightT.current?.caption} fontSize="0.8rem" padding="10px" />
                        </div>

                        {/* MID — Teamwork */}
                        <div
                            onClick={() => setLightbox(rightM.current)}
                            style={{ ...cardBase({ borderRadius: '14px', minHeight: 0 }), ...fadeStyle(rightM.fading) }}
                        >
                            <SlotImage item={rightM.current} />
                            <CaptionOverlay caption={rightM.current?.caption} fontSize="0.8rem" padding="10px" />
                        </div>

                        {/* BOT — Awards */}
                        <div
                            onClick={() => setLightbox(rightB.current)}
                            style={{ ...cardBase({ borderRadius: '14px', minHeight: 0 }), ...fadeStyle(rightB.fading) }}
                        >
                            <SlotImage item={rightB.current} />
                            <CaptionOverlay caption={rightB.current?.caption} fontSize="0.8rem" padding="10px" />
                        </div>
                    </div>
                </div>

                {/* ── Lightbox ── */}
                <AnimatePresence>
                    {lightbox && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setLightbox(null)}
                            style={{
                                position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', zIndex: 10000, padding: '16px',
                                background: 'rgba(15, 23, 42, 0.5)', backdropFilter: 'blur(8px)',
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={e => e.stopPropagation()}
                                style={{
                                    borderRadius: '24px', width: '90vw', maxWidth: '800px',
                                    aspectRatio: '16/9', position: 'relative', overflow: 'hidden',
                                    background: lightbox.src ? '#0F172A' : (lightbox.color || '#EFF6FF'),
                                    boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-light)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '6rem',
                                }}
                            >
                                {lightbox.src ? (
                                    <img src={lightbox.src} alt={lightbox.caption}
                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    icons[lightbox.category]
                                )}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    background: 'linear-gradient(to top, rgba(15,23,42,0.8), transparent)',
                                    padding: '32px', color: '#fff', fontSize: '1.25rem',
                                    fontWeight: 600, textAlign: 'center',
                                }}>{lightbox.caption}</div>
                                <button
                                    onClick={() => setLightbox(null)}
                                    style={{
                                        position: 'absolute', top: 16, right: 16,
                                        background: '#fff', border: 'none', color: 'var(--text-primary)',
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: '1.1rem', boxShadow: 'var(--shadow-md)',
                                    }}
                                >✕</button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
