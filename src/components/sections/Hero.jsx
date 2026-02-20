import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountdownTimer from '../ui/CountdownTimer';

export default function Hero() {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;

        const loadVanta = () => {
            if (window.VANTA && window.THREE && vantaRef.current && !vantaEffect.current) {
                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    THREE: window.THREE,
                    mouseControls: !isMobile,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x2563eb,
                    backgroundColor: 0xffffff,
                    points: 10.00,
                    maxDistance: 20.00,
                    spacing: 16.00,
                });
            }
        };

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
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, []);

    return (
        <section id="hero" className="hero-section">
            <div ref={vantaRef} id="vanta-bg" />

            {/* Subtle overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.7) 100%)',
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
                    <span>⚡</span> Early Bird Registration Open 
                </motion.div> */}

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

                <div className="hero-meta" style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginBottom: '40px', color: 'var(--text-secondary)', fontWeight: 600, flexWrap: 'wrap' }}>
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
                        onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                        Learn More ↓
                    </motion.a>
                </div>
            </motion.div>


        </section>
    );
}
