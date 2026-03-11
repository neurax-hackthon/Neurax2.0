// ─── LaunchIntroScreen ───────────────────────────────────────────────────────
// Full-screen cinematic overlay shown when hackathon launches.
// Displays glitch text "🔥 HACKATHON STARTED" + neon "NEURAX 2.0" for ~5s.
// Then fades out automatically, revealing the live 24h timer.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LaunchIntroScreen({ onDismiss }) {
    const [phase, setPhase] = useState('enter'); // enter → show → exit

    useEffect(() => {
        // Show intro for 3.5 seconds then auto-dismiss
        const t1 = setTimeout(() => setPhase('exit'), 3000);
        const t2 = setTimeout(() => onDismiss?.(), 3700);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [onDismiss]);

    return (
        <AnimatePresence>
            {phase !== 'dismissed' && (
                <motion.div
                    className="launch-intro-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === 'exit' ? 0 : 1 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    onClick={() => { setPhase('exit'); setTimeout(() => onDismiss?.(), 700); }}
                >
                    {/* ─── Background grid ─────────────────────────────── */}
                    <div className="intro-grid-bg" />

                    {/* ─── Radial glow ────────────────────────────────── */}
                    <div className="intro-radial-glow" />

                    {/* ─── Content ──────────────────────────────────────── */}
                    <motion.div
                        className="intro-content"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* ─── Line 1: emoji + label ─────────────────── */}
                        <motion.div
                            className="intro-started-label"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            🔥 HACKATHON STARTED
                        </motion.div>

                        {/* ─── Line 2: glitch title ─────────────────── */}
                        <motion.div
                            className="intro-title glitch-text"
                            data-text="NEURAX 2.0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            NEURAX 2.0
                        </motion.div>

                        {/* ─── Tagline ───────────────────────────────── */}
                        <motion.p
                            className="intro-tagline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85, duration: 0.5 }}
                        >
                            Build · Innovate · Win · 24 Hours Begin Now
                        </motion.p>

                        {/* ─── Divider line ─────────────────────────── */}
                        <motion.div
                            className="intro-divider"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
                        />

                        {/* ─── Dismiss hint ─────────────────────────── */}
                        <motion.p
                            className="intro-dismiss-hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.6, 0] }}
                            transition={{ delay: 2.5, duration: 2, repeat: Infinity }}
                        >
                            Tap anywhere to continue
                        </motion.p>
                    </motion.div>

                    {/* ─── Corner scan lines ────────────────────────────── */}
                    <div className="intro-scanlines" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
