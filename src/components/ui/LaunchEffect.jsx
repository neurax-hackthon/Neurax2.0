import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const QUOTES = [
    { line1: '"24 Hours.', line2: 'Change Everything."' },
    { line1: '"Code. Create.', line2: 'Conquer."' },
    { line1: '"The future belongs to', line2: 'those who build it."' },
];
const QUOTE = QUOTES[Math.floor(Math.random() * QUOTES.length)];

const BLAST_MS = 2500;   // fireworks run this long before quote shows
const QUOTE_MS = 2000;   // quote card shows for this long

export default function LaunchEffect({ onComplete }) {
    const [phase, setPhase] = useState('blast'); // blast | quote | done

    // ─── Firework Confetti ────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'blast') return;

        const duration = BLAST_MS + 500; // confetti lasts a bit longer
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 12,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.8 },
                colors: ['#00f0ff', '#059669', '#34d399', '#f59e0b', '#ffffff', '#a78bfa', '#f472b6'],
                zIndex: 8001
            });
            confetti({
                particleCount: 12,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.8 },
                colors: ['#00f0ff', '#059669', '#34d399', '#f59e0b', '#ffffff', '#a78bfa', '#f472b6'],
                zIndex: 8001
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        // Extra large burst in the middle
        setTimeout(() => {
            confetti({
                particleCount: 200,
                spread: 160,
                origin: { y: 0.6 },
                colors: ['#00f0ff', '#059669', '#ffffff'],
                zIndex: 8001
            });
        }, 500);

        const t = setTimeout(() => {
            setPhase('quote');
        }, BLAST_MS);

        return () => clearTimeout(t);
    }, [phase]);

    // Quote auto-dismiss
    useEffect(() => {
        if (phase !== 'quote') return;
        const t = setTimeout(() => { setPhase('done'); onComplete?.(); }, QUOTE_MS);
        return () => clearTimeout(t);
    }, [phase, onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    style={{ position: 'fixed', inset: 0, zIndex: 8000, pointerEvents: 'none' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase === 'done' ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* ─── Screen flash ──────────────────────────────────── */}
                    {phase === 'blast' && (
                        <motion.div
                            style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 1 }}
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    )}

                    {/* ─── Quote card (fully opaque — no hero bleed) ──────── */}
                    {phase === 'quote' && (
                        <motion.div
                            style={{
                                position: 'absolute', inset: 0, zIndex: 3,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                background: '#000913',
                                textAlign: 'center', padding: '0 24px', gap: '16px',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%,-50%)',
                                width: '500px', height: '500px',
                                background: 'radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)',
                                pointerEvents: 'none',
                            }} />

                            <motion.p
                                style={{
                                    fontFamily: 'Orbitron, sans-serif',
                                    fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
                                    fontWeight: 900, lineHeight: 1.2,
                                    background: 'linear-gradient(135deg, #fff 0%, #7dd3fc 40%, #0891b2 100%)',
                                    WebkitBackgroundClip: 'text', backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent', position: 'relative', zIndex: 1,
                                }}
                                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {QUOTE.line1}<br />{QUOTE.line2}
                            </motion.p>

                            <motion.div
                                style={{
                                    width: '160px', height: '2px', position: 'relative', zIndex: 1,
                                    background: 'linear-gradient(to right, transparent, #00f0ff, transparent)',
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                            />

                            <motion.p
                                style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
                                    letterSpacing: '4px', textTransform: 'uppercase',
                                    color: 'rgba(125,211,252,0.55)', position: 'relative', zIndex: 1,
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.55, duration: 0.4 }}
                            >
                                NeuraX 2.0 · CMRTC · Hyderabad
                            </motion.p>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
