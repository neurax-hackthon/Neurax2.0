import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import CountdownTimer from '../ui/CountdownTimer';

export default function Hero() {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);

    useEffect(() => {
        // Load Vanta NET via CDN script
        const loadVanta = () => {
            if (window.VANTA && window.THREE && vantaRef.current && !vantaEffect.current) {
                vantaEffect.current = window.VANTA.NET({
                    el: vantaRef.current,
                    THREE: window.THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x00f5ff,
                    backgroundColor: 0x0a0e1a,
                    points: 12.00,
                    maxDistance: 22.00,
                    spacing: 18.00,
                });
            }
        };

        // Check if scripts already loaded
        if (window.VANTA && window.THREE) {
            loadVanta();
        } else {
            // Load Three.js then Vanta
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

            {/* Gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'radial-gradient(ellipse at center, rgba(0,245,255,0.03) 0%, rgba(10,14,26,0.6) 70%)',
            }} />

            <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
                {/* Badge */}
                <motion.div
                    className="hero-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <span>⚡</span> Early Bird Registration Open
                </motion.div>

                {/* Glitch Title */}
                <h1 className="hero-title">
                    <span className="glitch" data-text="NEURAX">NEURAX</span>
                    <br />
                    <span style={{ color: 'var(--cyan)', textShadow: '0 0 40px rgba(0,245,255,0.6)' }}>2.0</span>
                </h1>

                {/* Typewriter */}
                <div className="hero-subtitle-wrapper">
                    <TypeAnimation
                        sequence={[
                            '24-Hour Hackathon · Build. Innovate. Win.',
                            2000,
                            'Neural Networks · AI · Web3 · IoT · HealthTech',
                            2000,
                            'CMR Technical Campus, Hyderabad',
                            2000,
                            '₹1,00,000+ Prize Pool · March 28-29, 2026',
                            2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                        style={{ color: 'var(--gray)' }}
                    />
                </div>

                {/* Meta info */}
                <div className="hero-meta">
                    <div className="hero-meta-item">
                        <span>📅</span>
                        <span>March 28–29, 2026</span>
                    </div>
                    <div className="hero-meta-item">
                        <span>📍</span>
                        <span>CMR Technical Campus, Hyderabad</span>
                    </div>
                    <div className="hero-meta-item">
                        <span>⏱️</span>
                        <span>24 Hours</span>
                    </div>
                </div>

                {/* Countdown */}
                <CountdownTimer />

                {/* CTA Buttons */}
                <div className="hero-cta">
                    <motion.a
                        href="#register"
                        className="btn-primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        ⚡ Register Now
                    </motion.a>
                    <motion.a
                        href="#themes"
                        className="btn-secondary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => { e.preventDefault(); document.querySelector('#themes')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                        Explore Themes →
                    </motion.a>
                </div>
            </motion.div>

            {/* Scroll hint */}
            <div className="scroll-hint">
                <div style={{ fontSize: '1.2rem' }}>↓</div>
                <span>Scroll to explore</span>
            </div>
        </section>
    );
}
