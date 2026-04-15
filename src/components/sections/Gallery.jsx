import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { leftSlideImages, codingImages, activityImages, organizationImages, inaugurationImages, awardsImages } from '../../data/gallery';
import ImageRenderer from '../ui/ImageRenderer';

// ── Constants ─────────────────────────────────────────────────────────────────
const SLIDE_INTERVAL = 4000;

// ── Components ───────────────────────────────────────────────────────────────


function Lightbox({ images, index, onClose }) {
    const [curr, setCurr] = useState(index);

    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button className="absolute top-8 right-8 text-white text-4xl hover:text-cyan-400 transition-colors z-20" onClick={onClose}>&times;</button>

            <div className="relative w-full max-w-5xl aspect-video bg-slate-900 rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <AnimatePresence>
                    <motion.div
                        key={images[curr].id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full"
                    >
                        <ImageRenderer src={images[curr].src} alt={images[curr].caption} />
                    </motion.div>
                </AnimatePresence>

                {images.length > 1 && (
                    <>
                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10"
                            onClick={() => setCurr((curr - 1 + images.length) % images.length)}
                        >
                            <span className="text-2xl">‹</span>
                        </button>
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10"
                            onClick={() => setCurr((curr + 1) % images.length)}
                        >
                            <span className="text-2xl">›</span>
                        </button>
                    </>
                )}

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                    <div className="bg-black/60 backdrop-blur-md px-6 py-2 rounded-2xl text-white text-lg font-bold border border-white/10 shadow-2xl">
                        {images[curr].caption}
                    </div>
                    <div className="bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-white/80 text-sm font-medium border border-white/10">
                        {curr + 1} / {images.length}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Gallery() {
    const [leftIdx, setLeftIdx] = useState(0);
    const [lightbox, setLightbox] = useState(null); // { images, index }
    const isPaused = useRef(false);

    useEffect(() => {
        if (leftSlideImages.length === 0) return;
        const timer = setInterval(() => {
            if (!isPaused.current) {
                setLeftIdx(prev => (prev + 1) % leftSlideImages.length);
            }
        }, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [leftSlideImages.length]);

    const rightSlots = [
        { title: "Coding", images: codingImages, icon: "💻" },
        { title: "Activity", images: activityImages.length > 0 ? activityImages : inaugurationImages.slice(0, 4), icon: "🎯" },
        { title: "Organization", images: organizationImages.length > 0 ? organizationImages : awardsImages.slice(0, 4), icon: "🤝" }
    ];

    return (
        <section id="gallery" className="section relative overflow-hidden bg-white">
            <div className="container">
                <SectionHeader
                    tag="// Memories"
                    title="Event"
                    highlight="Gallery"
                    desc="Capturing the spirit of innovation and collaboration from our previous editions."
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:aspect-[16/9] min-h-[600px]">
                    {/* LEFT COLUMN: Large Slideshow */}
                    <motion.div
                        className="lg:col-span-2 relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 cursor-zoom-in group bg-slate-100"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        onMouseEnter={() => isPaused.current = true}
                        onMouseLeave={() => isPaused.current = false}
                        onClick={() => leftSlideImages.length > 0 && setLightbox({ images: leftSlideImages, index: leftIdx })}
                    >
                        {leftSlideImages.length > 0 ? (
                            <AnimatePresence>
                                <motion.div
                                    key={leftSlideImages[leftIdx].id}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <ImageRenderer src={leftSlideImages[leftIdx].src} alt={leftSlideImages[leftIdx].caption} />
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                                <span className="text-4xl opacity-20">📸</span>
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        <div className="absolute bottom-8 left-8 text-white z-10">
                            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
                                {leftSlideImages[leftIdx].id.startsWith('inauguration') ? '✨ Inauguration' : '🏆 Awards'}
                            </p>
                            <h3 className="text-2xl font-bold font-display">{leftSlideImages[leftIdx].caption}</h3>
                        </div>

                        <div className="absolute bottom-8 right-8 flex gap-2 z-10">
                            {leftSlideImages.map((_, i) => (
                                <div
                                    key={`dot-${i}`}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === leftIdx ? 'w-8 bg-cyan-500' : 'w-2 bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: 3 Stacked Sections */}
                    <div className="flex flex-col gap-6">
                        {rightSlots.map((slot, idx) => (
                            <motion.div
                                key={`slot-${slot.title}`}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => slot.images.length > 0 && setLightbox({ images: slot.images, index: 0 })}
                                className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-slate-100 cursor-zoom-in group"
                            >
                                <ImageRenderer
                                    src={slot.images[0].src}
                                    alt={slot.images[0].caption}
                                    className="transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>Section</span>
                                            <h4 className="text-white font-bold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)', fontSize: '1rem' }}>{slot.title}</h4>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white border border-white/20">
                                            {slot.images.length} Photos
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

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
