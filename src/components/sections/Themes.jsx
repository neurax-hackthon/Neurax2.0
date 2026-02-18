import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { themes } from '../../data/themes';

function ThemeModal({ theme, onClose }) {
    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal-box"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="modal-close" onClick={onClose}>✕</button>
                    <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{theme.icon}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--white)', marginBottom: '12px' }}>
                        {theme.title}
                    </h3>
                    <div className="theme-tags" style={{ marginBottom: '16px' }}>
                        {theme.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <p style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: '0.95rem' }}>{theme.details}</p>
                    <motion.a
                        href="#register"
                        className="btn-primary"
                        style={{ display: 'inline-block', marginTop: '24px' }}
                        whileHover={{ scale: 1.03 }}
                    >
                        Register for This Track
                    </motion.a>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function Themes() {
    const [selected, setSelected] = useState(null);

    return (
        <section id="themes" className="section" style={{ background: 'rgba(17,24,39,0.3)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Problem Statements"
                    title="Hackathon"
                    highlight="Themes"
                    desc="Choose your track and build solutions that matter. Six cutting-edge domains to explore."
                />
                <div className="themes-grid">
                    {themes.map((theme, i) => (
                        <motion.div
                            key={theme.id}
                            className="animated-border-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="theme-card-inner">
                                <span className="theme-icon">{theme.icon}</span>
                                <div className="theme-title">{theme.title}</div>
                                <div className="theme-desc">{theme.desc}</div>
                                <div className="theme-tags">
                                    {theme.tags.map(t => <span key={t} className="tag">{t}</span>)}
                                </div>
                                <button className="btn-details" onClick={() => setSelected(theme)}>
                                    View Details →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {selected && <ThemeModal theme={selected} onClose={() => setSelected(null)} />}
        </section>
    );
}
