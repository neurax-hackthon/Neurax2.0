import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const tabs = ['All', 'Coding', 'Teamwork', 'Awards', 'Inauguration'];

// Placeholder gallery items using gradient backgrounds
const galleryItems = [
    { id: 1, category: 'Coding', caption: 'Late night coding sessions', color: 'linear-gradient(135deg, #0A0E1A, #1a2744)' },
    { id: 2, category: 'Teamwork', caption: 'Teams brainstorming ideas', color: 'linear-gradient(135deg, #0d1b2a, #1a3a4a)' },
    { id: 3, category: 'Awards', caption: 'Winners on stage', color: 'linear-gradient(135deg, #1a1200, #3a2800)' },
    { id: 4, category: 'Inauguration', caption: 'Opening ceremony', color: 'linear-gradient(135deg, #1a0a2e, #2d1a4a)' },
    { id: 5, category: 'Coding', caption: 'Debugging at midnight', color: 'linear-gradient(135deg, #0a1a0a, #1a3a1a)' },
    { id: 6, category: 'Teamwork', caption: 'Collaboration in action', color: 'linear-gradient(135deg, #1a0a1a, #3a1a3a)' },
    { id: 7, category: 'Awards', caption: 'Prize distribution', color: 'linear-gradient(135deg, #1a1500, #3a2e00)' },
    { id: 8, category: 'Inauguration', caption: 'Chief guest keynote', color: 'linear-gradient(135deg, #0a0a1a, #1a1a3a)' },
    { id: 9, category: 'Coding', caption: 'Final hour sprint', color: 'linear-gradient(135deg, #1a0a0a, #3a1a1a)' },
];

const icons = { Coding: '💻', Teamwork: '🤝', Awards: '🏆', Inauguration: '🎤' };

export default function Gallery() {
    const [activeTab, setActiveTab] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = activeTab === 'All' ? galleryItems : galleryItems.filter(g => g.category === activeTab);

    return (
        <section id="gallery" className="section">
            <div className="container">
                <SectionHeader
                    tag="// Memories"
                    title="Event"
                    highlight="Gallery"
                    desc="Relive the moments from NEURAX 1.0. NEURAX 2.0 will be even bigger!"
                />

                {/* Tabs */}
                <div className="gallery-tabs">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`gallery-tab${activeTab === tab ? ' active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab !== 'All' ? `${icons[tab]} ` : ''}{tab}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div className="gallery-grid" layout>
                    <AnimatePresence>
                        {filtered.map((item, i) => (
                            <motion.div
                                key={item.id}
                                className="gallery-item"
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                onClick={() => setLightbox(item)}
                            >
                                <div style={{
                                    width: '100%', height: '100%', minHeight: '200px',
                                    background: item.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '3rem',
                                }}>
                                    {icons[item.category] || '📷'}
                                </div>
                                <div className="gallery-overlay">
                                    <div className="gallery-caption">{item.caption}</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Lightbox */}
                <AnimatePresence>
                    {lightbox && (
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setLightbox(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                                style={{
                                    background: lightbox.color,
                                    borderRadius: '16px',
                                    width: '80vw', maxWidth: '700px', height: '60vh',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '5rem', position: 'relative',
                                    border: '1px solid rgba(0,245,255,0.2)',
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                {icons[lightbox.category]}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                    padding: '24px', borderRadius: '0 0 16px 16px',
                                    color: 'var(--white)', fontSize: '1rem', fontWeight: 500,
                                }}>
                                    {lightbox.caption}
                                </div>
                                <button
                                    className="modal-close"
                                    onClick={() => setLightbox(null)}
                                    style={{ position: 'absolute', top: 16, right: 16 }}
                                >✕</button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
