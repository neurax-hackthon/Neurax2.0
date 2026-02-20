import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <footer
                style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderTop: '1px solid var(--border-light)',
                    padding: '32px 0'
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px'
                    }}
                >
                    <div
                        style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.875rem'
                        }}
                    >
                        © 2026 NEURAX 2.0 · Organized by CMR Technical Campus · All rights reserved
                    </div>

                    <div
                        style={{
                            color: 'var(--text-tertiary)',
                            fontSize: '0.85rem'
                        }}
                    >
                        Made with ❤️ by the NEURAX Tech Team
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
                        transition={{ duration: 0.2 }}
                        aria-label="Scroll to top"
                        style={{
                            position: 'fixed',
                            bottom: '40px',
                            right: '24px',
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'var(--accent-primary)',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            zIndex: 100,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    >
                        ↑
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}