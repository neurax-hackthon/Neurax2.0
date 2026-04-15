import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideshowImages } from '../../data/highlights';
import ImageRenderer from '../ui/ImageRenderer';

const AUTOPLAY_INTERVAL = 5000;

export default function NeuraXSlideshow() {
  const [curr, setCurr] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurr((prev) => (prev + 1) % slideshowImages.length);
  }, []);

  const prevSlide = () => {
    setCurr((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  if (slideshowImages.length === 0) return null;

  return (
    <section className="neurax-slideshow-section">
      <div className="container">
        <div 
          className="slideshow-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slideshowImages[curr].id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="slide-wrapper"
            >
              <div className="slide-image-container">
                <ImageRenderer 
                  src={slideshowImages[curr].src} 
                  alt={slideshowImages[curr].caption}
                  className="slide-image"
                  loading="eager"
                />
                <div className="slide-overlay" />
              </div>

              <div className="slide-content">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="slide-tag"
                >
                  {slideshowImages[curr].category}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="slide-caption"
                >
                  {slideshowImages[curr].caption}
                </motion.h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="slideshow-controls">
            <button className="slideshow-nav-btn prev" onClick={prevSlide} aria-label="Previous Slide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="slideshow-nav-btn next" onClick={nextSlide} aria-label="Next Slide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="slideshow-dots">
            {slideshowImages.map((_, i) => (
              <button
                key={i}
                className={`slideshow-dot ${i === curr ? 'active' : ''}`}
                onClick={() => setCurr(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Progress Bar */}
          <div className="slideshow-progress-bar-wrap">
            <motion.div 
               key={curr + (isPaused ? '-paused' : '')}
               className="slideshow-progress-bar"
               initial={{ width: "0%" }}
               animate={{ width: isPaused ? "0%" : "100%" }}
               transition={{ duration: isPaused ? 0 : AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
