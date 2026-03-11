import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountdownTimer from '../ui/CountdownTimer';
import AdminPanel from '../ui/AdminPanel';
import LaunchEffect from '../ui/LaunchEffect';
import LaunchIntroScreen from '../ui/LaunchIntroScreen';
import { useHackathonState } from '../../hooks/useHackathonState';
import confetti from 'canvas-confetti';

export default function Hero() {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    // ─── Hackathon state from Firestore ───────────────────────────────────
    const { launched, launchTime, loading } = useHackathonState();

    // ─── Local cinematic effect states ────────────────────────────────────
    const [showLaunchEffect, setShowLaunchEffect] = useState(false);
    const [showIntroScreen, setShowIntroScreen] = useState(false);
    const [prevLaunched, setPrevLaunched] = useState(false);

    // ─── FIX: skip cinematic on initial page load (already launched) ──────
    // We only trigger animations when we *witness* the transition false→true.
    // The ref flips to false after the first Firestore snapshot arrives.
    const isFirstSnapshot = useRef(true);

    useEffect(() => {
        if (loading) return;

        // First snapshot: just record current state, never play cinematic
        if (isFirstSnapshot.current) {
            isFirstSnapshot.current = false;
            setPrevLaunched(launched);
            return;
        }

        // Subsequent snapshots: detect false → true transition
        if (launched && !prevLaunched) {
            setPrevLaunched(true);
            triggerCinematicLaunch();
        } else {
            setPrevLaunched(launched);
        }
    }, [launched, loading]); // eslint-disable-line react-hooks/exhaustive-deps

    const triggerCinematicLaunch = useCallback(() => {
        // 1. Explosion effect
        setShowLaunchEffect(true);

        // 2. Confetti burst
        const fire = (ratio, opts) =>
            confetti({ origin: { y: 0.6 }, ...opts, particleCount: Math.floor(200 * ratio) });
        setTimeout(() => {
            fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00f0ff', '#059669', '#ffffff'] });
            fire(0.2, { spread: 60, colors: ['#f59e0b', '#ef4444', '#a855f7'] });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#0891b2', '#ffffff'] });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        }, 350);

        // 3. Intro screen (appears on top of explosion)
        setTimeout(() => setShowIntroScreen(true), 700);
    }, []);

    // ─── Vanta.js background (unchanged) ─────────────────────────────────
    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

        const loadVanta = () => {
            if (window.VANTA && window.THREE && vantaRef.current && !vantaEffect.current) {
                const mobileConfig = { points: 4.00, maxDistance: 20.00, spacing: 38.00, speed: 0.60, showDots: true, mouseControls: false, touchControls: false };
                const tabletConfig = { points: 7.00, maxDistance: 18.00, spacing: 24.00, speed: 0.80, showDots: true, mouseControls: true, touchControls: false };
                const desktopConfig = { points: 10.00, maxDistance: 22.00, spacing: 14.00, speed: 1.20, showDots: true, mouseControls: true, touchControls: true };
                const activeConfig = isMobile ? mobileConfig : isTablet ? tabletConfig : desktopConfig;

                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    THREE: window.THREE,
                    gyroControls: false, minHeight: 200.00, minWidth: 200.00,
                    scale: 1.00, scaleMobile: 0.80,
                    color: 0x0891b2, backgroundColor: 0xffffff,
                    ...activeConfig,
                });
            }
        };

        const handleResize = () => {
            if (vantaEffect.current) { vantaEffect.current.destroy(); vantaEffect.current = null; }
            loadVanta();
        };

        window.addEventListener('resize', handleResize);

        if (window.VANTA && window.THREE) {
            loadVanta();
        } else {
            const threeScript = document.createElement('script');
            threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            threeScript.onload = () => {
                const vantaScript = document.createElement('script');
                vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
                vantaScript.onload = loadVanta;
                document.head.appendChild(vantaScript);
            };
            document.head.appendChild(threeScript);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            if (vantaEffect.current) { vantaEffect.current.destroy(); vantaEffect.current = null; }
        };
    }, []);

    return (
        <>
            {/* ─── CINEMATIC EFFECTS ─────────────────────────────────────── */}
            {showLaunchEffect && (
                <LaunchEffect onComplete={() => setShowLaunchEffect(false)} />
            )}
            {showIntroScreen && (
                <LaunchIntroScreen onDismiss={() => setShowIntroScreen(false)} />
            )}

            {/* ─── ADMIN PANEL ───────────────────────────────────────────── */}
            <AdminPanel launched={launched} onLaunch={() => { }} />

            {/* ─── HERO SECTION ──────────────────────────────────────────── */}
            <section id="hero" className="hero-section">
                <div ref={vantaRef} id="vanta-bg" />

                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.65) 100%)',
                }} />

                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.div
                        className="hero-badge"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}
                    >
                        <span className="live-dot" style={{ background: '#EF4444', boxShadow: '0 0 10px rgba(239,68,68,0.3)' }} />
                        Registrations Closed
                    </motion.div>

                    <h1 className="hero-title" style={{ color: 'var(--text-primary)' }}>
                        <span>NEURAX</span><br />2.0
                    </h1>

                    <div className="hero-subtitle-wrapper">
                        <TypeAnimation
                            sequence={[
                                '24-Hour Hackathon · Build. Innovate. Win.', 2000,
                                'AI · Machine Learning · Agentic AI · HealthTech · MedAI ', 2000,
                                'CMR Technical Campus, Hyderabad', 2000,
                                '₹50,000+ Prize Pool · March 14-15, 2026', 2000,
                            ]}
                            wrapper="span" speed={50} repeat={Infinity}
                            style={{ color: 'var(--text-secondary)', fontWeight: 500 }}
                        />
                    </div>

                    <div className="hero-meta">
                        <div className="hero-meta-item">📅 March 14–15, 2026</div>
                        <div className="hero-meta-item">📍 CMRTC, Hyderabad</div>
                        <div className="hero-meta-item">⏱️ 24 Hours</div>
                    </div>

                    <CountdownTimer launched={launched} launchTime={launchTime} />

                    <div className="hero-cta">
                        <motion.button
                            disabled className="btn-primary main-cta"
                            style={{ opacity: 0.7, cursor: 'not-allowed', background: '#9ca3af', boxShadow: 'none' }}
                        >
                            🔒 Registrations Closed
                        </motion.button>
                        <motion.a
                            href="#about" className="btn-secondary secondary-cta"
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                            onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
                        >
                            Learn More ↓
                        </motion.a>
                    </div>
                </motion.div>
            </section>
        </>
    );
}