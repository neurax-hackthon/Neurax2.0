import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HACKATHON_DURATION = 24 * 60 * 60 * 1000;

// ─── Confetti Piece ───────────────────────────────────────────────────────────
const COLORS = ['#FF3D6B', '#FFD700', '#00E5FF', '#7B2FFF', '#FF6B00', '#00FF9D', '#FF00C8', '#FFFFFF'];
const SHAPES = ['rect', 'circle', 'strip'];

function ConfettiPiece({ id, startX, size, color, shape, delay, duration, rotSpeed, drift }) {
    const style = {
        position: 'fixed',
        left: `${startX}%`,
        top: '-30px',
        width: shape === 'strip' ? `${size * 0.3}px` : `${size}px`,
        height: shape === 'strip' ? `${size * 2.5}px` : `${size}px`,
        background: color,
        borderRadius: shape === 'circle' ? '50%' : shape === 'rect' ? '2px' : '1px',
        zIndex: 9998,
        pointerEvents: 'none',
        opacity: 0,
    };

    return (
        <motion.div
            key={id}
            style={style}
            initial={{ y: -30, opacity: 0, rotate: 0, x: 0 }}
            animate={{
                y: ['0vh', '110vh'],
                opacity: [0, 1, 1, 0.8, 0],
                rotate: [0, rotSpeed * 180, rotSpeed * 360, rotSpeed * 540],
                x: [0, drift * 40, drift * -30, drift * 60, drift * 20],
            }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            transition={{
                duration: duration,
                delay: delay,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 1,
            }}
        />
    );
}

// ─── Blast Particle ───────────────────────────────────────────────────────────
function BlastParticle({ tx, ty, color, delay, size }) {
    return (
        <motion.div
            style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 10px ${color}`,
                zIndex: 9999,
                pointerEvents: 'none',
            }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
            animate={{
                x: tx,
                y: ty,
                opacity: [1, 1, 0],
                scale: [0, 1.5, 0],
            }}
            transition={{ duration: 1.5, delay, ease: 'easeOut' }}
        />
    );
}

// ─── Generate blast particles ─────────────────────────────────────────────────
function BlastBurst({ originX = 50, count = 40, delay = 0, direction = "up" }) {
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            let minAngle, maxAngle;
            if (direction === "right") {
                minAngle = -60; maxAngle = 30; 
            } else if (direction === "left") {
                minAngle = 150; maxAngle = 240;
            } else {
                minAngle = -120; maxAngle = -60; // Upwards spread
            }

            const angle = (minAngle + Math.random() * (maxAngle - minAngle)) * (Math.PI / 180);
            const dist = 150 + Math.random() * 200;
            
            return {
                id: i,
                tx: Math.cos(angle) * dist,
                ty: Math.sin(angle) * dist,
                color: COLORS[i % COLORS.length],
                delay: delay + Math.random() * 0.3,
                size: 6 + Math.random() * 6,
            };
        });
    }, [count, delay, direction]);

    return (
        <div style={{ position: 'absolute', bottom: 0, left: `${originX}%`, zIndex: 9999 }}>
            {particles.map(p => (
                <BlastParticle key={p.id} {...p} />
            ))}
        </div>
    );
}

// ─── Timer Block ───────────────────────────────────────────────────────────────
function TimerBlock({ value, label }) {
    const display = String(value).padStart(2, '0');
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.08)',
                backdropFilter: 'blur(12px)',
                borderRadius: '18px',
                width: 'clamp(70px, 12vw, 130px)',
                height: 'clamp(80px, 14vw, 140px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 900,
                color: '#000',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.5)',
                fontFamily: "'Orbitron', 'Courier New', monospace",
                letterSpacing: '0.05em',
            }}>
                {display}
            </div>
            <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: '#000',
                textTransform: 'uppercase',
                fontFamily: "'Orbitron', monospace",
            }}>
                {label}
            </span>
        </div>
    );
}

// ─── Main LiveBanner ──────────────────────────────────────────────────────────
export default function LiveBanner({ launchTime, customMessage }) {
    // 'blast' (0-2s) -> 'title' (2-5s) -> 'quote' (5-9s) -> 'live' (9s+)
    const [phase, setPhase] = useState('blast');
    const [hackTime, setHackTime] = useState({ hours: 24, minutes: 0, seconds: 0 });
    const [confetti, setConfetti] = useState([]);
    const [isEnded, setIsEnded] = useState(false);

    // Sequence Timeline
    useEffect(() => {
        // Stage 1: Blast happens immediately (state is already 'blast')
        
        // Let's pre-generate confetti from the very absolute start (Phase 1)
        const initialPieces = Array.from({ length: 200 }, (_, i) => ({
            id: i,
            startX: Math.random() * 100,
            size: 5 + Math.random() * 8,
            color: COLORS[i % COLORS.length],
            shape: SHAPES[i % SHAPES.length],
            delay: Math.random() * 1.5, // Spread out the start
            duration: 4.5 + Math.random() * 3.5,
            rotSpeed: (Math.random() - 0.5) * 3,
            drift: (Math.random() - 0.5) * 1.5,
        }));
        setConfetti(initialPieces);

        // Stage 2: Show Main Title after blasts clear
        const t1 = setTimeout(() => setPhase('title'), 1500);

        // Stage 3: Show Quote after title has been read
        const t2 = setTimeout(() => setPhase('quote'), 4500);

        // Stage 4: Enter Phase 2 (Live timer screen)
        const t3 = setTimeout(() => {
            setPhase('live');
            // Generate even more confetti pieces for the main screen
            const pieces = Array.from({ length: 180 }, (_, i) => ({
                id: i,
                startX: Math.random() * 100,
                size: Math.random() * 10 + 5,
                color: COLORS[i % COLORS.length],
                shape: SHAPES[i % SHAPES.length],
                delay: Math.random() * 5,
                duration: Math.random() * 6 + 6,
                rotSpeed: (Math.random() - 0.5) * 4,
                drift: (Math.random() - 0.5) * 2,
            }));
            setConfetti(pieces);

            // Stop confetti gracefully after 30 seconds
            setTimeout(() => {
                setConfetti([]);
            }, 30000);
        }, 9000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    // 24-hour countdown
    useEffect(() => {
        if (!launchTime) return;
        const tick = () => {
            const rem = launchTime + HACKATHON_DURATION - Date.now();
            if (rem <= 0) {
                setHackTime({ hours: 0, minutes: 0, seconds: 0 });
                setIsEnded(true);
                return;
            }
            setHackTime({
                hours: Math.floor(rem / (1000 * 60 * 60)),
                minutes: Math.floor((rem % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((rem % (1000 * 60)) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [launchTime]);

    return (
        <>
            {/* ── PHASE 1: Blast / Cracker Effect Timeline ── */}
            <AnimatePresence>
                {(phase === 'blast' || phase === 'title' || phase === 'quote') && (
                    <motion.div
                        key="intro-sequence"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 9990,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'radial-gradient(ellipse at bottom, #0a0a1a 0%, #000000 100%)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Phase 1 Falling Confetti */}
                        <AnimatePresence>
                            {confetti.map(p => (
                                <ConfettiPiece key={`p1-${p.id}`} {...p} duration={p.duration * 0.8} /> // Faster drop for phase 1
                            ))}
                        </AnimatePresence>

                        {/* Stage 1: The Blasts (Keep blasts alive during title and quote phases) */}
                        <AnimatePresence>
                            {(phase === 'blast' || phase === 'title' || phase === 'quote') && (
                                <motion.div exit={{ opacity: 0, transition: { duration: 0.5 } }}>
                                    <BlastBurst originX={0} count={70} delay={0.15} direction="right" />
                                    <BlastBurst originX={20} count={60} delay={0.4} direction="right" />
                                    <BlastBurst originX={50} count={100} delay={0} direction="up" />
                                    <BlastBurst originX={80} count={60} delay={0.4} direction="left" />
                                    <BlastBurst originX={100} count={70} delay={0.15} direction="left" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Text Container */}
                        <div style={{ textAlign: 'center', zIndex: 9999, padding: '20px' }}>
                            {/* Stage 2: Main Title Appears */}
                            <AnimatePresence>
                                {(phase === 'title' || phase === 'quote') && (
                                    <motion.h1
                                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                                        animate={{
                                            scale: 1,
                                            opacity: 1,
                                            y: phase === 'quote' ? -20 : 0, // Move up slightly when quote appears
                                            textShadow: [
                                                '0 0 40px #00f0ff, 0 0 80px #00f0ff',
                                                '0 0 60px #FF3D6B, 0 0 120px #FF3D6B',
                                                '0 0 40px #FFD700, 0 0 80px #FFD700',
                                                '0 0 40px #00f0ff, 0 0 80px #00f0ff',
                                            ]
                                        }}
                                        transition={{
                                            y: { type: 'spring', stiffness: 100 },
                                            opacity: { duration: 0.5 },
                                            scale: { type: 'spring', stiffness: 200 },
                                            textShadow: { duration: 1.5, repeat: Infinity, repeatType: 'mirror' }
                                        }}
                                        style={{
                                            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                                            fontWeight: 900,
                                            letterSpacing: '-0.02em',
                                            margin: '0 0 20px 0',
                                            background: 'linear-gradient(135deg, #00f0ff 0%, #FFD700 40%, #FF3D6B 70%, #7B2FFF 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textTransform: 'uppercase',
                                            fontFamily: "'Orbitron', 'Black Ops One', sans-serif",
                                            lineHeight: 1.1,
                                            position: 'relative',
                                        }}
                                    >
                                        🎉 NeuraX Hackathon<br /> is Live! 🎉

                                        {/* Flash ring behind title when it spawns */}
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            style={{
                                                position: 'absolute',
                                                width: 100, height: 100,
                                                borderRadius: '50%',
                                                background: 'radial-gradient(circle, rgba(0,240,255,0.8) 0%, transparent 70%)',
                                                top: '50%', left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                pointerEvents: 'none',
                                                zIndex: -1,
                                            }}
                                        />
                                    </motion.h1>
                                )}
                            </AnimatePresence>

                            {/* Stage 3: Quote Appears */}
                            <AnimatePresence>
                                {phase === 'quote' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                                        style={{
                                            fontSize: 'clamp(1.2rem, 3.5vw, 2.2rem)',
                                            color: '#ffffff',
                                            letterSpacing: '0.15em',
                                            textTransform: 'uppercase',
                                            fontWeight: 700,
                                            fontFamily: "'Orbitron', sans-serif",
                                            textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                                        }}
                                    >
                                        ⚡ Build. Innovate. Win. ⚡
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Flickering lights at bottom */}
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    opacity: [0, 1, 0, 1, 0],
                                    scale: [0.5, 1.5, 0.8, 1.2, 0],
                                }}
                                transition={{
                                    duration: 0.6 + Math.random() * 0.8,
                                    delay: Math.random() * 1.5,
                                    repeat: 3,
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: `${Math.random() * 20}%`,
                                    left: `${4 + i * 8}%`,
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: COLORS[i % COLORS.length],
                                    boxShadow: `0 0 20px ${COLORS[i % COLORS.length]}`,
                                    pointerEvents: 'none',
                                    zIndex: 9995,
                                }}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── PHASE 2: Live Full-Screen with Falling Confetti ── */}
            <AnimatePresence>
                {phase === 'live' && (
                    <motion.section
                        key="live-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{
                            position: 'relative',
                            width: '100%',
                            minHeight: '100vh',
                            overflow: 'hidden',
                            background: '#ffffff',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '100px', // Push content below navbar
                            paddingBottom: '40px',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            zIndex: 10,
                        }}
                    >
                        {/* Falling confetti */}
                        <AnimatePresence>
                            {confetti.map(p => (
                                <ConfettiPiece key={p.id} {...p} />
                            ))}
                        </AnimatePresence>

                        {/* Subtle grid background */}
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 0,
                            backgroundImage: 'linear-gradient(rgba(0,100,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,100,200,0.06) 1px, transparent 1px)',
                            backgroundSize: '50px 50px',
                        }} />

                        {/* Ambient glow orbs */}
                        <div style={{
                            position: 'absolute', width: '600px', height: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(0,224,80,0.08) 0%, transparent 70%)',
                            top: '10%', left: '-10%', pointerEvents: 'none', zIndex: 0,
                        }} />
                        <div style={{
                            position: 'absolute', width: '500px', height: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(0,150,255,0.08) 0%, transparent 70%)',
                            bottom: '5%', right: '-10%', pointerEvents: 'none', zIndex: 0,
                        }} />

                        {/* Content */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, type: 'spring', stiffness: 80 }}
                            style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: '1000px' }}
                        >
                            {/* LIVE badge */}
                            {!isEnded ? (
                                <>
                                    <motion.div
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            background: 'rgba(255,61,107,0.15)',
                                            border: '1px solid rgba(255,61,107,0.5)',
                                            borderRadius: '100px',
                                            padding: '8px 22px',
                                            marginBottom: '20px',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        <motion.span
                                            animate={{ opacity: [1, 0, 1] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                            style={{
                                                width: 10, height: 10,
                                                borderRadius: '50%',
                                                background: '#FF3D6B',
                                                boxShadow: '0 0 12px #FF3D6B',
                                                display: 'inline-block',
                                            }}
                                        />
                                        <span style={{
                                            color: '#FF3D6B',
                                            fontWeight: 800,
                                            fontSize: '0.9rem',
                                            letterSpacing: '0.25em',
                                            textTransform: 'uppercase',
                                            fontFamily: "'Orbitron', monospace",
                                        }}>
                                            Live Now
                                        </span>
                                    </motion.div>

                                    {/* Main title */}
                                    <motion.h1
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                        }}
                                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                        style={{
                                            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                                            fontWeight: 900,
                                            letterSpacing: '-0.02em',
                                            margin: '0 0 8px 0',
                                            background: 'linear-gradient(135deg, #00f0ff 0%, #00e050 30%, #7B2FFF 60%, #00f0ff 100%)',
                                            backgroundSize: '200% 200%',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textTransform: 'uppercase',
                                            fontFamily: "'Orbitron', 'Black Ops One', sans-serif",
                                            lineHeight: 1.05,
                                            textShadow: 'none',
                                            filter: 'drop-shadow(0 0 30px rgba(0,240,255,0.4))',
                                        }}
                                    >
                                        NeuraX<br />Hackathon
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        style={{
                                            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                                            color: 'rgba(0,0,0,0.45)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.35em',
                                            marginBottom: '30px',
                                            fontFamily: "'Orbitron', monospace",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Is Live
                                    </motion.p>

                                    {/* 24hr Countdown */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 'clamp(10px, 3vw, 30px)',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>

                                        <TimerBlock value={hackTime.hours} label="Hours" />
                                        <motion.span
                                            animate={{ opacity: [1, 0.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            style={{
                                                fontSize: 'clamp(3rem, 6vw, 5rem)',
                                                fontWeight: 900,
                                                color: 'rgba(0,0,0,0.3)',
                                                fontFamily: 'monospace',
                                                lineHeight: 1,
                                                marginBottom: '24px',
                                            }}
                                        >:</motion.span>
                                        <TimerBlock value={hackTime.minutes} label="Minutes" />
                                        <motion.span
                                            animate={{ opacity: [1, 0.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            style={{
                                                fontSize: 'clamp(3rem, 6vw, 5rem)',
                                                fontWeight: 900,
                                                color: 'rgba(0,0,0,0.3)',
                                                fontFamily: 'monospace',
                                                lineHeight: 1,
                                                marginBottom: '24px',
                                            }}
                                        >:</motion.span>
                                        <TimerBlock value={hackTime.seconds} label="Seconds" />
                                    </div>

                                    {/* Remaining label */}
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        style={{
                                            marginTop: '20px',
                                            fontSize: '0.85rem',
                                            color: 'rgba(0,0,0,0.4)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.3em',
                                            fontFamily: "'Orbitron', monospace",
                                        }}
                                    >
                                        ⏳ Remaining to Code & Conquer
                                    </motion.p>
                                </>
                            ) : (
                                <>
                                    {/* Ended message */}
                                    <motion.h1
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
                                        style={{
                                            fontSize: 'clamp(2.2rem, 6vw, 5rem)',
                                            fontWeight: 900,
                                            letterSpacing: '-0.02em',
                                            margin: '0 0 20px 0',
                                            background: 'linear-gradient(135deg, #FF3D6B 0%, #FFD700 50%, #FF6B00 100%)',
                                            backgroundSize: '200% 200%',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            textTransform: 'uppercase',
                                            fontFamily: "'Orbitron', 'Black Ops One', sans-serif",
                                            lineHeight: 1.05,
                                            filter: 'drop-shadow(0 0 30px rgba(255, 61, 107, 0.4))',
                                        }}
                                    >
                                        Hackathon Ended
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 1 }}
                                        style={{
                                            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                                            color: 'rgba(0,0,0,0.6)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.2em',
                                            marginBottom: '30px',
                                            fontFamily: "'Orbitron', monospace",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Thank you for your participation!
                                    </motion.p>
                                </>
                            )}

                            {/* Custom Broadcast Message */}
                            <AnimatePresence>
                                {customMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                        style={{
                                            marginTop: '20px',
                                            padding: '12px 24px',
                                            background: 'rgba(0, 100, 220, 0.08)',
                                            border: '1px solid rgba(0, 100, 220, 0.25)',
                                            borderRadius: '20px',
                                            backdropFilter: 'blur(10px)',
                                            boxShadow: '0 8px 30px rgba(0,100,220,0.15)',
                                            display: 'inline-block',
                                        }}
                                    >
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: '#0064dc',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.2em',
                                            marginBottom: '8px',
                                            fontWeight: 700,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px',
                                            fontFamily: "'Orbitron', monospace",
                                        }}>
                                            <motion.span
                                                animate={{ opacity: [1, 0, 1] }}
                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                style={{ width: 8, height: 8, borderRadius: '50%', background: '#0064dc', boxShadow: '0 0 8px #0064dc', display: 'inline-block' }}
                                            />
                                            📢 Broadcast Message
                                        </div>
                                        <div style={{
                                            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                                            color: '#111',
                                            fontWeight: 700,
                                            letterSpacing: '0.02em',
                                        }}>
                                            {customMessage}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
}
