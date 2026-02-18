import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const tabs = ['All', 'Coding', 'Teamwork', 'Awards', 'Inauguration'];

const galleryItems = [
    { id: 1, category: 'Coding', caption: 'Late night coding sessions', color: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' },
    { id: 2, category: 'Teamwork', caption: 'Teams brainstorming ideas', color: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)' },
    { id: 3, category: 'Awards', caption: 'Winners on stage', color: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' },
    { id: 4, category: 'Inauguration', caption: 'Opening ceremony', color: 'linear-gradient(135deg, #FDF2F8, #FCE7F3)' },
    { id: 5, category: 'Coding', caption: 'Debugging at midnight', color: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' },
    { id: 6, category: 'Teamwork', caption: 'Collaboration in action', color: 'linear-gradient(135deg, #ECFEFF, #CFFAFE)' },
    { id: 7, category: 'Awards', caption: 'Prize distribution', color: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' },
    { id: 8, category: 'Inauguration', caption: 'Chief guest keynote', color: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)' },
    { id: 9, category: 'Coding', caption: 'Final hour sprint', color: 'linear-gradient(135deg, #FFF1F2, #FFE4E6)' },
];

const icons = { Coding: '💻', Teamwork: '🤝', Awards: '🏆', Inauguration: '🎤' };

export default function Gallery() {
    const [activeTab, setActiveTab] = useState('All');
    const [lightbox, setLightbox] = useState(null);

    const filtered = activeTab === 'All' ? galleryItems : galleryItems.filter(g => g.category === activeTab);

    return (
        <section id="gallery" className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Memories"
                    title="Event"
                    highlight="Gallery"
                    desc="Relive the moments from NEURAX 1.0. NEURAX 2.0 will be even bigger!"
                />

                <div className="gallery-tabs" style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`gallery-tab${activeTab === tab ? ' active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: '100px',
                                border: '1px solid var(--border-light)',
                                background: activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                                color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <motion.div className="gallery-grid" layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    <AnimatePresence>
                        {filtered.map((item, i) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                onClick={() => setLightbox(item)}
                                style={{
                                    position: 'relative',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    aspectRatio: '4/3',
                                    cursor: 'zoom-in',
                                    boxShadow: 'var(--shadow-md)',
                                    border: '1px solid var(--border-light)'
                                }}
                                whileHover={{ transform: 'scale(1.02)', boxShadow: 'var(--shadow-lg)' }}
                            >
                                <div style={{
                                    width: '100%', height: '100%',
                                    background: item.color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '3.5rem',
                                }}>
                                    {icons[item.category] || '📷'}
                                </div>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, transparent 50%)',
                                    display: 'flex', alignItems: 'flex-end', padding: '24px'
                                }}>
                                    <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{item.caption}</div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <AnimatePresence>
                    {lightbox && (
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setLightbox(null)}
                            style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', zIndex: 10000 }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                style={{
                                    background: lightbox.color,
                                    borderRadius: '24px',
                                    width: '90vw', maxWidth: '800px', height: 'auto', aspectRatio: '16/9',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '6rem', position: 'relative',
                                    boxShadow: 'var(--shadow-xl)',
                                    border: '1px solid var(--border-light)'
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                {icons[lightbox.category]}
                                <div style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0,
                                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)',
                                    padding: '32px', borderRadius: '0 0 24px 24px',
                                    color: '#fff', fontSize: '1.25rem', fontWeight: 600, textAlign: 'center'
                                }}>
                                    {lightbox.caption}
                                </div>
                                <button
                                    onClick={() => setLightbox(null)}
                                    style={{
                                        position: 'absolute', top: 20, right: 20,
                                        background: '#fff', border: 'none', color: 'var(--text-primary)',
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', fontSize: '1.2rem', boxShadow: 'var(--shadow-md)'
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
