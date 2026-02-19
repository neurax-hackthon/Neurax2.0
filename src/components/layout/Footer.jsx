import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quickLinks = ['About', 'Themes', 'Schedule', 'Prizes', 'Gallery', 'FAQ'];
const socialLinks = [
    { icon: '𝕏', href: '#', label: 'Twitter/X' },
    { icon: '📸', href: '#', label: 'Instagram' },
    { icon: '💼', href: '#', label: 'LinkedIn' },
    { icon: '📘', href: '#', label: 'Facebook' },
];

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <footer className="footer" style={{ backgroundColor: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-light)', padding: '80px 0 40px' }}>
                <div className="container">
                    <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>
                        <div>
                            <div className="footer-brand-name" style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '900', marginBottom: '16px', color: 'var(--text-primary)' }}>🧠 NEURAX 2.0</div>
                            <p className="footer-brand-desc" style={{ color: 'var(--text-secondary)', maxWidth: '320px', lineHeight: '1.6' }}>
                                A 24-hour hackathon organized by CMR Technical Campus, Hyderabad.
                                Build. Innovate. Win. Join the next generation of tech innovators.
                            </p>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                {socialLinks.map(s => (
                                    <a key={s.label} href={s.href} aria-label={s.label} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-primary)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.2s', fontSize: '1.2rem' }}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="footer-col-title" style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '24px' }}>Quick Links</div>
                            <ul style={{ listStyle: 'none' }}>
                                {quickLinks.map(l => (
                                    <li key={l} style={{ marginBottom: '12px' }}>
                                        <a href={`#${l.toLowerCase()}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="footer-col-title" style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '24px' }}>Event</div>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ marginBottom: '12px' }}><a href="#timeline" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Important Dates</a></li>
                                <li style={{ marginBottom: '12px' }}><a href="#schedule" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Schedule</a></li>
                                <li style={{ marginBottom: '12px' }}><a href="#prizes" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Prize Pool</a></li>
                                <li style={{ marginBottom: '12px' }}><a href="#sponsors" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Sponsors</a></li>
                                <li style={{ marginBottom: '12px' }}><a href="#register" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Register Now</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="footer-col-title" style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: '24px' }}>Contact</div>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ marginBottom: '12px' }}><a href="mailto:neurax@cmrcet.ac.in" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>neurax@cmrcet.ac.in</a></li>
                                <li style={{ marginBottom: '12px' }}><a href="tel:+919876543210" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>+91 98765 43210</a></li>
                                <li style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.6', marginTop: '16px' }}>
                                    CMR Technical Campus,<br />
                                    Kandlakoya, Medchal Road,<br />
                                    Hyderabad, Telangana 501401
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            © 2026 NEURAX 2.0 · Organized by CMR Technical Campus · All rights reserved
                        </div>
                        <div style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>
                            Made with ❤️ by the NEURAX Tech Team
                        </div>
                    </div>
                </div>
            </footer>

            <AnimatePresence>
                {showTop && (
                    <motion.button
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        aria-label="Scroll to top"
                        style={{
                            position: 'fixed',
                            bottom: '100px',
                            right: '24px',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'var(--accent-primary)',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 99,
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        ↑
                    </motion.button>
                )}
            </AnimatePresence>

        </>
    );
}
