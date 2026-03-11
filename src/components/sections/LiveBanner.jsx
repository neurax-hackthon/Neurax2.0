import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HACKATHON_DURATION = 24 * 60 * 60 * 1000;

function useFlip(value) {
    const [flip, setFlip] = useState(false);
    const prev = useRef(value);
    useEffect(() => {
        if (prev.current !== value) {
            prev.current = value;
            setFlip(true);
            const t = setTimeout(() => setFlip(false), 280);
            return () => clearTimeout(t);
        }
    }, [value]);
    return flip;
}

// ─── Motivational Quotes Array ───────────────────────────────────────────────
const QUOTES = [
    "“Talk is cheap. Show me the code.” – Linus Torvalds",
    "“Innovation distinguishes between a leader and a follower.” – Steve Jobs",
    "“First, solve the problem. Then, write the code.” – John Johnson",
    "“Code is like humor. When you have to explain it, it’s bad.” – Cory House",
    "“The best error message is the one that never shows up.” – Thomas Fuchs"
];

export default function LiveBanner({ launchTime, customMessage }) {
    const [hackTime, setHackTime] = useState({ hours: 24, minutes: 0, seconds: 0 });
    const [ended, setEnded] = useState(false);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        if (!launchTime) return;
        const tick = () => {
            const rem = launchTime + HACKATHON_DURATION - Date.now();
            if (rem <= 0) {
                setHackTime({ hours: 0, minutes: 0, seconds: 0 });
                setEnded(true);
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

    // Randomize quote every few seconds when ended
    useEffect(() => {
        if (ended) {
            const qId = setInterval(() => {
                setQuoteIndex(prev => (prev + 1) % QUOTES.length);
            }, 5000);
            return () => clearInterval(qId);
        }
    }, [ended]);

    return (
        <section style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center 30%, #064e3b 0%, #020617 80%)',
            padding: '40px 20px 40px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            zIndex: 10
        }}>
            {/* Animated Background Overlay */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    background: 'radial-gradient(circle at 80% 80%, rgba(0, 240, 255, 0.15), transparent 50%), radial-gradient(circle at 20% 20%, rgba(0, 224, 80, 0.15), transparent 50%)',
                }}
            />

            {/* Grid overlay for tech feel */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'linear-gradient(to bottom, black, transparent)'
            }} />

            <motion.div
                style={{ zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '900px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {!ended ? (
                    <>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            margin: '0 0 20px 0',
                            background: 'linear-gradient(90deg, #00f0ff, #00e050)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textTransform: 'uppercase',
                        }}>
                            NEURAX 2.0 HACKATHON STARTED!
                        </h2>

                        {/* Big Countdown Timer styling */}
                        <div style={{
                            display: 'flex',
                            gap: '2vw',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            marginBottom: '20px'
                        }}>
                            <TimerBlock value={hackTime.hours} label="HOURS" />
                            <span style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 'bold', color: 'rgba(255,255,255,0.2)' }}>:</span>
                            <TimerBlock value={hackTime.minutes} label="MINUTES" />
                            <span style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 'bold', color: 'rgba(255,255,255,0.2)' }}>:</span>
                            <TimerBlock value={hackTime.seconds} label="SECONDS" />
                        </div>

                        {/* Custom Message Broadcast Element */}
                        <AnimatePresence>
                            {customMessage && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    style={{
                                        marginTop: '20px',
                                        padding: '16px 32px',
                                        background: 'rgba(0, 240, 255, 0.1)',
                                        border: '1px solid rgba(0, 240, 255, 0.3)',
                                        borderRadius: '24px',
                                        backdropFilter: 'blur(10px)',
                                        boxShadow: '0 0 40px rgba(0, 240, 255, 0.2)',
                                        display: 'inline-block'
                                    }}
                                >
                                    <div style={{
                                        fontSize: '0.9rem',
                                        color: '#00f0ff',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        marginBottom: '8px',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px'
                                    }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00f0ff', boxShadow: '0 0 10px #00f0ff' }}></span>
                                        Broadcast Message
                                    </div>
                                    <div style={{
                                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                        color: '#fff',
                                        fontWeight: 600,
                                        letterSpacing: '0.02em',
                                    }}>
                                        {customMessage}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                ) : (
                    <>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            margin: '0 0 20px 0',
                            color: '#FF3B30',
                            textTransform: 'uppercase',
                        }}>
                            NEURAX HACKATHON ENDED
                        </h2>
                        <h3 style={{
                            fontSize: '1.5rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '40px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}>
                            Wait for result
                        </h3>

                        <motion.div
                            key={quoteIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                padding: '30px',
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid var(--border-light)',
                                borderRadius: '16px',
                                fontSize: '1.25rem',
                                color: 'var(--text-primary)',
                                fontStyle: 'italic',
                                maxWidth: '700px',
                                margin: '0 auto',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                            }}
                        >
                            {QUOTES[quoteIndex]}
                        </motion.div>
                    </>
                )}
            </motion.div>
        </section>
    );
}

function TimerBlock({ value, label }) {
    const display = String(value).padStart(2, '0');
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                width: 'clamp(100px, 15vw, 160px)',
                height: 'clamp(120px, 18vw, 190px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                fontWeight: 800,
                color: '#fff',
                textShadow: '0 0 30px rgba(0, 240, 255, 0.5)',
                boxShadow: 'inset 0 0 40px rgba(0,255,150,0.05), 0 20px 40px rgba(0,0,0,0.5)'
            }}>
                {display}
            </div>
            <span style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase'
            }}>
                {label}
            </span>
        </div>
    );
}
