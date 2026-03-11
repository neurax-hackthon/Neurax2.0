// ─── LaunchEffect — Cinematic Bomb Blast ─────────────────────────────────────
// Canvas-only explosion (sparks, debris, embers, shockwave rings).
// NO Framer Motion ring divs — avoids GPU compositing layer bleed onto hero.
// After blast: inspiring quote fades in, then the component self-destructs.
// Total duration: ~3.5s (blast 2s + quote 1.5s).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QUOTES = [
    { line1: '"24 Hours.', line2: 'Change Everything."' },
    { line1: '"Code. Create.', line2: 'Conquer."' },
    { line1: '"The future belongs to', line2: 'those who build it."' },
];
const QUOTE = QUOTES[Math.floor(Math.random() * QUOTES.length)];

const BLAST_MS = 2000;   // canvas explosion runs this long
const QUOTE_MS = 1600;   // quote card shows for this long

export default function LaunchEffect({ onComplete }) {
    const canvasRef = useRef(null);
    const animFrameRef = useRef(null);
    const [phase, setPhase] = useState('blast'); // blast | quote | done

    // ─── Canvas explosion ────────────────────────────────────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const CX = canvas.width / 2;
        const CY = canvas.height / 2;

        const neon = ['#00f0ff', '#0891b2', '#059669', '#34d399', '#f59e0b', '#ffffff', '#a78bfa', '#f472b6'];
        const pick = () => neon[Math.floor(Math.random() * neon.length)];

        // Sparks (thin streaks)
        const sparks = Array.from({ length: 220 }, (_, i) => {
            const angle = (Math.PI * 2 * i) / 220 + (Math.random() - 0.5) * 0.5;
            const speed = 7 + Math.random() * 22;
            return {
                x: CX, y: CY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
                life: 1, decay: 0.01 + Math.random() * 0.015, color: pick(), len: 10 + Math.random() * 24
            };
        });

        // Debris (chunky blobs)
        const debris = Array.from({ length: 70 }, () => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 14;
            return {
                x: CX + (Math.random() - 0.5) * 30, y: CY + (Math.random() - 0.5) * 30,
                vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1.5,
                r: 2 + Math.random() * 7, life: 1,
                decay: 0.008 + Math.random() * 0.012, color: pick(), gravity: 0.07 + Math.random() * 0.05
            };
        });

        // Embers (small long-lived)
        const embers = Array.from({ length: 80 }, () => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 5;
            return {
                x: CX, y: CY, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 0.8,
                r: 1 + Math.random() * 2, life: 1, decay: 0.004 + Math.random() * 0.005,
                gravity: 0.015
            };
        });

        let startTime = null;

        const render = (ts) => {
            if (!startTime) startTime = ts;
            const elapsed = ts - startTime;
            const progress = Math.min(elapsed / BLAST_MS, 1);

            // Clear with black fade (no full clear) → trail effect
            ctx.fillStyle = 'rgba(0,0,0,0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // ─── Core radial flash ────────────────────────────────────────
            if (elapsed < 350) {
                const a = Math.max(0, 1 - elapsed / 350) * 0.9;
                const g = ctx.createRadialGradient(CX, CY, 0, CX, CY, canvas.width * 0.55);
                g.addColorStop(0, `rgba(255,255,255,${a})`);
                g.addColorStop(0.15, `rgba(0,240,255,${a * 0.8})`);
                g.addColorStop(0.5, `rgba(8,145,178,${a * 0.3})`);
                g.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = g;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // ─── Canvas shockwave rings ───────────────────────────────────
            [0, 0.06, 0.14, 0.25].forEach((delay) => {
                const p = Math.max(0, (progress - delay) / (1 - delay));
                if (p <= 0) return;
                const maxR = Math.min(canvas.width, canvas.height) * 0.75;
                const r = p * maxR;
                const a = (1 - p) * 0.75;
                ctx.save();
                ctx.beginPath();
                ctx.arc(CX, CY, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0,240,255,${a})`;
                ctx.lineWidth = Math.max(1, (1 - p) * 5);
                ctx.shadowBlur = 18;
                ctx.shadowColor = '#00f0ff';
                ctx.stroke();
                ctx.restore();
            });

            // ─── Sparks ───────────────────────────────────────────────────
            ctx.save();
            sparks.forEach((s) => {
                if (s.life <= 0) return;
                ctx.globalAlpha = s.life;
                ctx.strokeStyle = s.color;
                ctx.lineWidth = 1.5;
                ctx.shadowBlur = 5;
                ctx.shadowColor = s.color;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x - s.vx * 0.08 * s.len, s.y - s.vy * 0.08 * s.len);
                ctx.stroke();
                s.x += s.vx; s.y += s.vy;
                s.vx *= 0.965; s.vy *= 0.965;
                s.life -= s.decay;
            });
            ctx.restore();

            // ─── Debris ───────────────────────────────────────────────────
            ctx.save();
            debris.forEach((d) => {
                if (d.life <= 0) return;
                ctx.globalAlpha = d.life;
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r * d.life, 0, Math.PI * 2);
                ctx.fillStyle = d.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = d.color;
                ctx.fill();
                d.x += d.vx; d.y += d.vy;
                d.vy += d.gravity; d.vx *= 0.978;
                d.life -= d.decay;
            });
            ctx.restore();

            // ─── Embers ───────────────────────────────────────────────────
            ctx.save();
            embers.forEach((e) => {
                if (e.life <= 0) return;
                ctx.globalAlpha = e.life * 0.75;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
                ctx.fillStyle = '#ffffff';
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#00f0ff';
                ctx.fill();
                e.x += e.vx; e.y += e.vy;
                e.vy += e.gravity;
                e.life -= e.decay;
            });
            ctx.restore();

            if (elapsed < BLAST_MS + 400) {
                animFrameRef.current = requestAnimationFrame(render);
            } else {
                // Fade canvas out before quote
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                setPhase('quote');
            }
        };

        animFrameRef.current = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
            // Ensure canvas is clear on unmount
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, []);

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
                    transition={{ duration: 0.3 }}
                >
                    {/* ─── Screen flash ──────────────────────────────────── */}
                    <motion.div
                        style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 1 }}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />

                    {/* ─── Canvas (blast only, clears before quote) ──────── */}
                    {phase === 'blast' && (
                        <canvas
                            ref={canvasRef}
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
                        />
                    )}

                    {/* ─── Quote card (fully opaque — no hero bleed) ──────── */}
                    {phase === 'quote' && (
                        <motion.div
                            style={{
                                position: 'absolute', inset: 0, zIndex: 3,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                // FULLY opaque background — no cyan bleed through
                                background: '#000913',
                                textAlign: 'center', padding: '0 24px', gap: '16px',
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Neon radial glow behind text */}
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
