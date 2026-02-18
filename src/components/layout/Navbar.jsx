import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Themes', href: '#themes' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Schedule', href: '#schedule' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavClick = (href) => {
        setMenuOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <div className="container navbar-container">
                    <a className="nav-logo" href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
                        🧠 NEURAX 2.0
                    </a>

                    <div className="nav-content">
                        <ul className="nav-links">
                            {navItems.map(item => (
                                <li key={item.label}>
                                    <a href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}>
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <a href="#register" className="btn-primary nav-cta" onClick={(e) => { e.preventDefault(); handleNavClick('#register'); }}>
                            Register
                        </a>
                    </div>

                    <button
                        className={`hamburger${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-nav"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.5rem', cursor: 'pointer' }}
                        >✕</button>
                        {navItems.map(item => (
                            <a key={item.label} href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}>
                                {item.label}
                            </a>
                        ))}
                        <a href="#register" className="btn-primary" onClick={() => setMenuOpen(false)}>
                            Register Now
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
