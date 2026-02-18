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
                style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', zIndex: 10000 }}
            >
                <motion.div
                    className="modal-box"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                    style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '48px', maxWidth: '600px', width: '90%', boxShadow: 'var(--shadow-xl)', position: 'relative' }}
                >
                    <button
                        onClick={onClose}
                        style={{ position: 'absolute', top: 24, right: 24, background: 'var(--bg-secondary)', border: 'none', color: 'var(--text-primary)', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
                    >✕</button>

                    <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>{theme.icon}</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                        {theme.title}
                    </h3>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                        {theme.tags.map(t => (
                            <span key={t} style={{ background: '#EFF6FF', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: 600, padding: '4px 12px', borderRadius: '100px', border: '1px solid #DBEAFE' }}>{t}</span>
                        ))}
                    </div>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '32px' }}>{theme.details}</p>

                    <motion.a
                        href="#register"
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Register for Track
                    </motion.a>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function Themes() {
    const [selected, setSelected] = useState(null);

    return (
        <section id="themes" className="section alt">
            <div className="container">
                <SectionHeader
                    tag="// Problem Statements"
                    title="Hackathon"
                    highlight="Themes"
                    desc="Choose your track and build solutions that matter. Six cutting-edge domains to explore."
                />
                <div className="themes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                    {themes.map((theme, i) => (
                        <motion.div
                            key={theme.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="hover-lift"
                            style={{
                                background: '#FFFFFF',
                                border: '1px solid var(--border-light)',
                                borderRadius: '20px',
                                padding: '32px',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelected(theme)}
                        >
                            <span style={{ fontSize: '3rem', marginBottom: '16px', display: 'block' }}>{theme.icon}</span>
                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>{theme.title}</div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>{theme.desc}</div>

                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                {theme.tags.map(t => (
                                    <span key={t} style={{ background: '#F1F5F9', color: 'var(--text-secondary)', fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: '100px' }}>{t}</span>
                                ))}
                            </div>

                            <button
                                className="btn-secondary"
                                style={{ width: '100%', padding: '12px' }}
                                onClick={(e) => { e.stopPropagation(); setSelected(theme); }}
                            >
                                Track Details
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
            {selected && <ThemeModal theme={selected} onClose={() => setSelected(null)} />}
        </section>
    );
}
