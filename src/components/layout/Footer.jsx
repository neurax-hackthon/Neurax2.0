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
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div>
                            <div className="footer-brand-name">🧠 NEURAX 2.0</div>
                            <p className="footer-brand-desc">
                                A 24-hour hackathon organized by CMR Technical Campus, Hyderabad.
                                Build. Innovate. Win. Join the next generation of tech innovators.
                            </p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                {socialLinks.map(s => (
                                    <a key={s.label} href={s.href} className="social-link" aria-label={s.label}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="footer-col-title">Quick Links</div>
                            <ul className="footer-links">
                                {quickLinks.map(l => (
                                    <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="footer-col-title">Event</div>
                            <ul className="footer-links">
                                <li><a href="#timeline">Important Dates</a></li>
                                <li><a href="#schedule">Schedule</a></li>
                                <li><a href="#prizes">Prize Pool</a></li>
                                <li><a href="#sponsors">Sponsors</a></li>
                                <li><a href="#register">Register Now</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="footer-col-title">Contact</div>
                            <ul className="footer-links">
                                <li><a href="mailto:neurax@cmrcet.ac.in">neurax@cmrcet.ac.in</a></li>
                                <li><a href="tel:+919876543210">+91 98765 43210</a></li>
                                <li style={{ color: 'var(--gray)', fontSize: '0.875rem', lineHeight: '1.6' }}>
                                    CMR Technical Campus,<br />
                                    Kandlakoya, Medchal Road,<br />
                                    Hyderabad, Telangana 501401
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-copy">
                            © 2026 NEURAX 2.0 · Organized by CMR Technical Campus · All rights reserved
                        </div>
                        <div style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>
                            Made with ❤️ by the NEURAX Tech Team
                        </div>
                    </div>
                </div>
            </footer>

            <AnimatePresence>
                {showTop && (
                    <motion.button
                        className="scroll-top-btn"
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        aria-label="Scroll to top"
                    >
                        ↑
                    </motion.button>
                )}
            </AnimatePresence>

            <a href="#register" className="mobile-cta">
                ⚡ Register Now — NEURAX 2.0
            </a>
        </>
    );
}
