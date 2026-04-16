import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { highlightStats, highlightCategories, thankYouConfig, slideshowImages } from '../../data/highlights';
import ImageRenderer from '../ui/ImageRenderer';

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1800 }) {
    const [count, setCount] = useState(0);
    const hasRun = useRef(false);
    const ref = useRef(null);

    // Parse numeric value from strings like '300+', '₹50K+'
    const parseTarget = (str) => {
        const match = String(str).replace(/[^0-9]/g, '');
        return parseInt(match, 10) || 0;
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasRun.current) {
                    hasRun.current = true;
                    const end = parseTarget(target);
                    const start = Date.now();
                    const tick = () => {
                        const elapsed = Date.now() - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * end));
                        if (progress < 1) requestAnimationFrame(tick);
                        else setCount(end);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    // Re-attach original prefix/suffix
    const raw = String(target);
    const prefix = raw.startsWith('₹') ? '₹' : '';
    const suffix = raw.endsWith('+') ? '+' : raw.endsWith('K+') ? 'K+' : '';
    const isK = raw.includes('K');
    const display = isK
        ? `${prefix}${Math.floor(count / 1000) || count}K${raw.endsWith('+') ? '+' : ''}`
        : `${prefix}${count}${raw.endsWith('+') ? '+' : ''}`;

    return <span ref={ref}>{display}</span>;
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ images, index, onClose }) {
    const [curr, setCurr] = useState(index);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setCurr(c => (c + 1) % images.length);
            if (e.key === 'ArrowLeft') setCurr(c => (c - 1 + images.length) % images.length);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, images.length]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                id="highlights-lightbox-close"
                className="absolute top-6 right-8 text-white text-4xl hover:text-cyan-400 transition-colors z-20 leading-none"
                onClick={onClose}
            >
                &times;
            </button>

            <div
                className="relative w-full max-w-5xl aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <AnimatePresence mode="wait">
                    <ImageRenderer
                        key={curr}
                        src={images[curr].src}
                        alt={images[curr].caption || 'Gallery image'}
                        className="w-full h-full"
                    />
                </AnimatePresence>

                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10"
                            onClick={() => setCurr(c => (c - 1 + images.length) % images.length)}
                        >
                            <span className="text-2xl">‹</span>
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10"
                            onClick={() => setCurr(c => (c + 1) % images.length)}
                        >
                            <span className="text-2xl">›</span>
                        </button>
                    </>
                )}

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    {images[curr].caption && (
                        <div className="bg-black/70 backdrop-blur-md px-6 py-2 rounded-2xl text-white text-base font-bold border border-white/10">
                            {images[curr].caption}
                        </div>
                    )}
                    <div className="bg-black/40 backdrop-blur-md px-4 py-1 rounded-full text-white/70 text-xs border border-white/10">
                        {curr + 1} / {images.length}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState({ category }) {
    return (
        <div className="highlights-empty-state">
            <div className="highlights-empty-icon">{category.icon}</div>
            <p className="highlights-empty-title">Photos Coming Soon</p>
            <p className="highlights-empty-desc">
                Drop your images into{' '}
                <code className="highlights-empty-code">
                    public/neurax2/{category.id}/
                </code>
            </p>
        </div>
    );
}

function PhotoCard({ item, index, onClick }) {
    return (
        <motion.div
            className="highlight-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            onClick={onClick}
        >
            <ImageRenderer 
                src={item.src}
                alt={item.caption || 'Event photo'}
                className="highlight-card-img loaded"
            />
            <div className="highlight-card-overlay">
                <span className="highlight-card-caption">{item.caption}</span>
                <span className="highlight-card-zoom">🔍</span>
            </div>
        </motion.div>
    );
}

// ── Inline Thankyou Slideshow ─────────────────────────────────────────────────
const SLIDE_INTERVAL = 4500;

function InlineThankyouSlideshow() {
    const [curr, setCurr] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const next = useCallback(() => {
        setCurr(p => (p + 1) % slideshowImages.length);
    }, []);

    const prev = () => {
        setCurr(p => (p - 1 + slideshowImages.length) % slideshowImages.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const t = setInterval(next, SLIDE_INTERVAL);
        return () => clearInterval(t);
    }, [isPaused, next]);

    if (!slideshowImages.length) return null;

    const slide = slideshowImages[curr];

    return (
        <motion.div
            className="thankyou-inline-slideshow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="tis-track">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id}
                        className="tis-slide"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                    >
                        <ImageRenderer
                            src={slide.src}
                            alt={slide.caption}
                            className="tis-img"
                        />
                        <div className="tis-overlay" />
                        <div className="tis-meta">
                            <span className="tis-tag">{slide.category}</span>
                            <span className="tis-caption">{slide.caption}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Arrows */}
                <button className="tis-btn tis-prev" onClick={prev} aria-label="Previous">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="tis-btn tis-next" onClick={next} aria-label="Next">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>

                {/* Counter badge */}
                <div className="tis-counter">{curr + 1} / {slideshowImages.length}</div>
            </div>

            {/* Dots */}
            <div className="tis-dots">
                {slideshowImages.map((_, i) => (
                    <button
                        key={i}
                        className={`tis-dot ${i === curr ? 'active' : ''}`}
                        onClick={() => setCurr(i)}
                        aria-label={`Slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Progress bar */}
            <div className="tis-progress-wrap">
                <motion.div
                    key={curr + (isPaused ? '-p' : '')}
                    className="tis-progress"
                    initial={{ width: '0%' }}
                    animate={{ width: isPaused ? '0%' : '100%' }}
                    transition={{ duration: isPaused ? 0 : SLIDE_INTERVAL / 1000, ease: 'linear' }}
                />
            </div>
        </motion.div>
    );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function NeuraXHighlights() {
    const [activeTab, setActiveTab] = useState(highlightCategories[0].id);
    const [lightbox, setLightbox] = useState(null); // { images, index }

    const activeCategory = highlightCategories.find(c => c.id === activeTab);

    return (
        <section id="highlights" className="section neurax-highlights-section">
            <div className="container">

                {/* ── Section Header ── */}
                <SectionHeader
                    tag="// NeuraX 2.0 — Recap"
                    title="A Night of"
                    highlight="Innovation"
                    desc="NeuraX 2.0 brought together the brightest minds for 24 hours of creativity, collaboration, and code. Here's a look back at the magic we created together."
                />

                {/* ── Animated Stats Bar ── */}
                <motion.div
                    className="highlights-stats-bar"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {highlightStats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="highlights-stat-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div className="highlights-stat-icon">{stat.icon}</div>
                            <div className="highlights-stat-number">
                                <AnimatedCounter target={stat.number} />
                            </div>
                            <div className="highlights-stat-label">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Tab Bar ── */}
                <div className="highlights-tab-bar" role="tablist">
                    {highlightCategories.map(cat => (
                        <button
                            key={cat.id}
                            id={`tab-${cat.id}`}
                            role="tab"
                            aria-selected={activeTab === cat.id}
                            className={`highlights-tab ${activeTab === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(cat.id)}
                        >
                            <span className="highlights-tab-icon">{cat.icon}</span>
                            <span className="highlights-tab-label">{cat.title}</span>
                        </button>
                    ))}
                </div>

                {/* ── Tab Content ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeCategory.images.length === 0 ? (
                            <EmptyState category={activeCategory} />
                        ) : (
                            <div className="highlights-grid">
                                {activeCategory.images.map((item, i) => (
                                    <PhotoCard
                                        key={`${activeTab}-${i}`}
                                        item={item}
                                        index={i}
                                        onClick={() => setLightbox({ images: activeCategory.images, index: i })}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Thank You Banner ── */}
            <motion.div
                className="highlights-thankyou"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="highlights-thankyou-glow" />
                <div className="highlights-thankyou-inner container">

                    {/* Heading */}
                    <motion.h2
                        className="highlights-thankyou-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {thankYouConfig.heading}
                    </motion.h2>

                    <motion.p
                        className="highlights-thankyou-sub"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        {thankYouConfig.subheading}
                    </motion.p>

                    {/* ── Inline Slideshow ── */}
                    <InlineThankyouSlideshow />

                    {/* Message */}
                    <motion.p
                        className="highlights-thankyou-message"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        {thankYouConfig.message}
                    </motion.p>

                    {/* Thank-You Cards */}
                    <motion.div
                        className="highlights-thankyou-grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        {thankYouConfig.thanks.map((item) => (
                            <div key={item.label} className="highlights-thankyou-card">
                                <div className="highlights-thankyou-card-icon">{item.icon}</div>
                                <div className="highlights-thankyou-card-label">{item.label}</div>
                                <div className="highlights-thankyou-card-desc">{item.desc}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Sign-off */}
                    <motion.div
                        className="highlights-thankyou-signoff"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                    >
                        <span>— The NeuraX 2.0 Organizing Team</span>
                        <span className="highlights-thankyou-hearts">💙🚀✨</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <Lightbox
                        images={lightbox.images}
                        index={lightbox.index}
                        onClose={() => setLightbox(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
