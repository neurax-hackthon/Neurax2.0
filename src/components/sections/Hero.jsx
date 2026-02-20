import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountdownTimer from '../ui/CountdownTimer';

export default function Hero() {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    useEffect(() => {
        // More precise mobile detection
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

        const loadVanta = () => {
            if (window.VANTA && window.THREE && vantaRef.current && !vantaEffect.current) {

                // ─── MOBILE CONFIG ───────────────────────────────────────────
                // Ultra-clean sparse constellation: few nodes, slow anti-gravity
                // drift, minimal lines — looks premium not cluttered
                const mobileConfig = {
                    points: 4.00,        // Very few nodes → clean & minimal
                    maxDistance: 20.00,  // Only nearby nodes connect → sparse lines
                    spacing: 38.00,      // Wide spacing → elegant constellation feel
                    speed: 0.60,         // Slow peaceful drift (anti-gravity feel)
                    showDots: true,      // Keep dots but they'll be few & spaced out
                    mouseControls: false,
                    touchControls: false, // No interaction → stays calm on scroll/touch
                };

                // ─── TABLET CONFIG ───────────────────────────────────────────
                // Balanced between mobile and desktop
                const tabletConfig = {
                    points: 7.00,
                    maxDistance: 18.00,
                    spacing: 24.00,
                    speed: 0.80,
                    showDots: true,
                    mouseControls: true,
                    touchControls: false,
                };

                // ─── DESKTOP CONFIG ──────────────────────────────────────────
                // Rich neural network feel: more nodes, responsive to mouse,
                // faster movement, tighter connections → looks alive & dynamic
                const desktopConfig = {
                    points: 10.00,       // Dense enough to look impressive
                    maxDistance: 22.00,  // Longer reach → more connections
                    spacing: 14.00,      // Tighter grid → rich web effect
                    speed: 1.20,         // Energetic but not chaotic
                    showDots: true,
                    mouseControls: true, // Mouse repels/attracts nodes → satisfying
                    touchControls: true,
                };

                const activeConfig = isMobile
                    ? mobileConfig
                    : isTablet
                        ? tabletConfig
                        : desktopConfig;

                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    THREE: window.THREE,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 0.80,

                    // ─── COLOR THEME ─────────────────────────────────────────
                    // Rich blue lines on white background → matches your brand
                    // Tip: change color to 0x6366f1 for an indigo/purple vibe
                    color: 0x2563eb,
                    backgroundColor: 0xffffff,

                    ...activeConfig,
                });
            }
        };

        // ─── RESIZE HANDLER ──────────────────────────────────────────────────
        // Destroys and reinitializes Vanta when screen size changes
        // (e.g., rotating phone, resizing browser window)
        const handleResize = () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
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
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, []);

    return (
        <section id="hero" className="hero-section">
            <div ref={vantaRef} id="vanta-bg" />

            {/* ─── OVERLAY ────────────────────────────────────────────────────
                Slightly stronger fade on mobile so text is always readable
                over the sparse network. On desktop it's very subtle.
            ──────────────────────────────────────────────────────────────── */}
            <div style={{
                position: 'absolute',
                inset: 0,
                zIndex: 1,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.65) 100%)',
            }} />

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                {/* <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                     <span className="live-dot" />
                    Early Bird Registration Open 
                </motion.div>*/}

                <h1 className="hero-title" style={{ color: 'var(--text-primary)' }}>
                    <span>NEURAX</span>
                    <br />
                    2.0
                </h1>

                <div className="hero-subtitle-wrapper">
                    <TypeAnimation
                        sequence={[
                            '24-Hour Hackathon · Build. Innovate. Win.',
                            2000,
                            'AI · Web3 · IoT · HealthTech · Cybersecurity',
                            2000,
                            'CMR Technical Campus, Hyderabad',
                            2000,
                            '₹1,00,000+ Prize Pool · March 14-15, 2026',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        style={{ color: 'var(--text-secondary)', fontWeight: 500 }}
                    />
                </div>

                <div className="hero-meta">
                    <div className="hero-meta-item">📅 March 14–15, 2026</div>
                    <div className="hero-meta-item">📍 CMRTC, Hyderabad</div>
                    <div className="hero-meta-item">⏱️ 24 Hours</div>
                </div>

                <CountdownTimer />

                <div className="hero-cta">
                    <motion.a
                        href="#register"
                        className="btn-primary main-cta"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        ⚡ Register Now
                    </motion.a>
                    <motion.a
                        href="#about"
                        className="btn-secondary secondary-cta"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Learn More ↓
                    </motion.a>
                </div>
            </motion.div>


        </section>
    );
}