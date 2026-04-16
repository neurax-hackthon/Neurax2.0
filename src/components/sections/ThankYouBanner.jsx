import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { thankYouConfig, slideshowImages } from '../../data/highlights';
import ImageRenderer from '../ui/ImageRenderer';

// ── Inline Thankyou Slideshow Component ──────────────────────────────────────
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
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

                {/* Navigation Arrows */}
                <button className="tis-btn tis-prev" onClick={prev} aria-label="Previous image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="tis-btn tis-next" onClick={next} aria-label="Next image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>

                {/* Counter Badge */}
                <div className="tis-counter">{curr + 1} / {slideshowImages.length}</div>
            </div>

            {/* Pagination Dots */}
            <div className="tis-dots">
                {slideshowImages.map((_, i) => (
                    <button
                        key={i}
                        className={`tis-dot ${i === curr ? 'active' : ''}`}
                        onClick={() => setCurr(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Auto-play Progress Bar */}
            <div className="tis-progress-wrap">
                <motion.div
                    key={curr + (isPaused ? '-paused' : '')}
                    className="tis-progress"
                    initial={{ width: '0%' }}
                    animate={{ width: isPaused ? '0%' : '100%' }}
                    transition={{ duration: isPaused ? 0 : SLIDE_INTERVAL / 1000, ease: 'linear' }}
                />
            </div>
        </motion.div>
    );
}

export default function ThankYouBanner() {
    return (
        <motion.div
            className="highlights-thankyou"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '0', padding: '100px 0 80px' }} // Adjusted for top placement
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
    );
}
