import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';

const reasons = [
    { icon: '🏆', title: 'Win Big Prizes', text: 'Compete for a prize pool of ₹1,00,000+ with cash awards, trophies, and certificates for top teams.' },
    { icon: '🤝', title: 'Network & Connect', text: 'Meet like-minded innovators, industry mentors, and potential co-founders from across the region.' },
    { icon: '💡', title: 'Build Real Skills', text: 'Apply your knowledge to real problems. Learn new technologies under pressure and grow exponentially.' },
    { icon: '🚀', title: 'Launch Your Idea', text: 'Turn your idea into a working prototype. Get feedback from experts and take the first step toward your startup.' },
    { icon: '🎓', title: 'Get Recognized', text: 'Certificates, LinkedIn badges, and media coverage for all participants. Stand out to future employers.' },
    { icon: '🌐', title: 'Real-World Impact', text: 'Solve problems that matter. Your solution could address challenges in healthcare, sustainability, or education.' },
];

export default function WhyParticipate() {
    const cardRefs = useRef([]);

    useEffect(() => {
        const loadTilt = async () => {
            if (!window.VanillaTilt) {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js';
                script.onload = () => initTilt();
                document.head.appendChild(script);
            } else {
                initTilt();
            }
        };

        const initTilt = () => {
            cardRefs.current.forEach(el => {
                if (el && window.VanillaTilt) {
                    window.VanillaTilt.init(el, {
                        max: 12,
                        speed: 400,
                        glare: true,
                        'max-glare': 0.15,
                    });
                }
            });
        };

        loadTilt();
        return () => {
            cardRefs.current.forEach(el => {
                if (el && el.vanillaTilt) el.vanillaTilt.destroy();
            });
        };
    }, []);

    return (
        <section id="why" className="section" style={{ background: 'rgba(17,24,39,0.3)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Why Join?"
                    title="Why"
                    highlight="Participate?"
                    desc="Six compelling reasons why NEURAX 2.0 is the hackathon you can't afford to miss."
                />
                <div className="why-grid">
                    {reasons.map((r, i) => (
                        <motion.div
                            key={r.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                        >
                            <GlassCard
                                className="why-card"
                                style={{ height: '100%' }}
                                ref={el => cardRefs.current[i] = el}
                            >
                                <span className="why-card-icon">{r.icon}</span>
                                <div className="why-card-title">{r.title}</div>
                                <div className="why-card-text">{r.text}</div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
