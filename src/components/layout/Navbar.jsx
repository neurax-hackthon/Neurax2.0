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
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a className="nav-logo" href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
                        🧠 NEURAX 2.0
                    </a>
                    <ul className="nav-links">
                        {navItems.map(item => (
                            <li key={item.label}>
                                <a href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="#register" className="btn-primary" style={{ fontSize: '0.8rem', padding: '10px 20px', display: 'none' }}
                        id="nav-register-btn">
                        Register Now
                    </a>
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
                        className="mobile-nav open"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'var(--white)', fontSize: '1.5rem', cursor: 'pointer' }}
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
