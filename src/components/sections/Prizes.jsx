import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import SectionHeader from '../ui/SectionHeader';
import { prizes } from '../../data/prizes';
import { useIntersection } from '../../hooks/useIntersection';

export default function Prizes() {
    const [ref, isVisible] = useIntersection();
    const confettiFired = useRef(false);

    useEffect(() => {
        if (isVisible && !confettiFired.current) {
            confettiFired.current = true;
            const loadConfetti = () => {
                if (window.confetti) {
                    window.confetti({
                        particleCount: 150,
                        spread: 80,
                        colors: ['#FFD700', '#00F5FF', '#FF2D78', '#8B5CF6'],
                        origin: { y: 0.6 },
                    });
                }
            };
            if (!window.confetti) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
                script.onload = loadConfetti;
                document.head.appendChild(script);
            } else {
                loadConfetti();
            }
        }
    }, [isVisible]);

    const parseAmount = (str) => parseInt(str.replace(/[₹,]/g, ''), 10);

    return (
        <section id="prizes" className="section">
            <div className="container" ref={ref}>
                <SectionHeader
                    tag="// Prize Pool"
                    title="Win"
                    highlight="Big Prizes"
                    desc="Over ₹1,00,000 in prizes, trophies, certificates, and exclusive opportunities await the best teams."
                />

                {/* Podium */}
                <div className="podium-wrapper">
                    {/* 2nd Place */}
                    <motion.div
                        className="podium-card second glass-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="podium-medal">🥈</span>
                        <div className="podium-place">2nd Place</div>
                        <div className="podium-amount">
                            {isVisible ? <CountUp end={parseAmount(prizes.second.amount)} prefix="₹" separator="," duration={2} /> : '₹0'}
                        </div>
                        <ul className="podium-perks">
                            {prizes.second.perks.map(p => <li key={p}>{p}</li>)}
                        </ul>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        className="podium-card first"
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{
                            position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                            background: 'linear-gradient(135deg, var(--gold), #FFA500)',
                            color: '#000', fontSize: '0.7rem', fontWeight: 800,
                            padding: '4px 16px', borderRadius: '100px', letterSpacing: '2px', whiteSpace: 'nowrap',
                        }}>
                            ⭐ WINNER
                        </div>
                        <span className="podium-medal">🥇</span>
                        <div className="podium-place">1st Place</div>
                        <div className="podium-amount">
                            {isVisible ? <CountUp end={parseAmount(prizes.first.amount)} prefix="₹" separator="," duration={2.5} /> : '₹0'}
                        </div>
                        <ul className="podium-perks">
                            {prizes.first.perks.map(p => <li key={p}>{p}</li>)}
                        </ul>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        className="podium-card third glass-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="podium-medal">🥉</span>
                        <div className="podium-place">3rd Place</div>
                        <div className="podium-amount">
                            {isVisible ? <CountUp end={parseAmount(prizes.third.amount)} prefix="₹" separator="," duration={2} /> : '₹0'}
                        </div>
                        <ul className="podium-perks">
                            {prizes.third.perks.map(p => <li key={p}>{p}</li>)}
                        </ul>
                    </motion.div>
                </div>

                {/* Special Awards */}
                <motion.div
                    style={{ marginTop: '48px' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 style={{ fontFamily: 'var(--font-display)', textAlign: 'center', color: 'var(--white)', marginBottom: '24px', fontSize: '1.1rem' }}>
                        🎖️ Special Category Awards
                    </h3>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {prizes.special.map(s => (
                            <div key={s.title} className="glass-card" style={{ padding: '16px 24px', textAlign: 'center', minWidth: '200px' }}>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--violet)', marginBottom: '6px' }}>{s.title}</div>
                                <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1rem' }}>{s.prize}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
