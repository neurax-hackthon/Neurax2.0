import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountdownTimer from '../ui/CountdownTimer';

export default function Hero() {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

        const loadVanta = () => {
            if (window.VANTA && window.THREE && vantaRef.current && !vantaEffect.current) {

                // 🔥 Improved Mobile Config (More Premium Feel)
                const mobileConfig = {
                    points: 9.00,
                    maxDistance: 22.00,
                    spacing: 22.00,
                    speed: 0.85,
                    showDots: true,
                    mouseControls: true,
                    touchControls: true,
                };

                const tabletConfig = {
                    points: 9.00,
                    maxDistance: 20.00,
                    spacing: 18.00,
                    speed: 1.00,
                    showDots: true,
                    mouseControls: true,
                    touchControls: true,
                };

                const desktopConfig = {
                    points: 9.00,
                    maxDistance: 22.00,
                    spacing: 16.00,
                    speed: 1.20,
                    showDots: true,
                    mouseControls: true,
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
                    scaleMobile: 1.00, // 🔥 No reduction
                    color: 0x2563eb,
                    backgroundColor: 0xffffff,
                    ...activeConfig,
                });
            }
        };

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
        <section id="hero" className="hero-section relative overflow-hidden">
            <div ref={vantaRef} id="vanta-bg" className="absolute inset-0" />

            {/* 🔥 Balanced Overlay (Better Visibility) */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    background:
                        'linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.50) 100%)',
                }}
            />

            <motion.div
                className="hero-content relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                {/* 🔥 No forced <br /> */}
                <h1 className="hero-title text-center">
                    <span className="md:block">NEURAX</span>
                    <span className="md:block">2.0</span>
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

                <div
                    className="hero-meta"
                    style={{
                        display: 'flex',
                        gap: '32px',
                        justifyContent: 'center',
                        marginBottom: '40px',
                        color: 'var(--text-secondary)',
                        fontWeight: 600,
                        flexWrap: 'wrap',
                    }}
                >
                    <div>📅 March 14–15, 2026</div>
                    <div>📍 CMRTC, Hyderabad</div>
                    <div>⏱️ 24 Hours</div>
                </div>

                <CountdownTimer />

                <div className="hero-cta">
                    <motion.a
                        href="#register"
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        ⚡ Register Now
                    </motion.a>

                    <motion.a
                        href="#about"
                        className="btn-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                            e.preventDefault();
                            document
                                .querySelector('#about')
                                ?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Learn More ↓
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
}