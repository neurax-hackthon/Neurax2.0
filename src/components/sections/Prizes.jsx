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
                        colors: ['#0891b2', '#059669', '#FFD700', '#10b981'],
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
        <section id="prizes" className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container" ref={ref}>
                <SectionHeader
                    tag="// Prize Pool"
                    title="Win"
                    highlight="Big Prizes"
                    desc="Over ₹1,00,000 in prizes, trophies, certificates, and exclusive opportunities await the best teams."
                />

                <div className="podium-wrapper" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '24px', marginTop: '60px', flexWrap: 'wrap' }}>
                    {/* 2nd Place */}
                    <motion.div
                        className="podium-card second shadow-card hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ padding: '40px 32px', textAlign: 'center', flex: 1, minWidth: '260px', maxWidth: '320px' }}
                    >
                        <span style={{ fontSize: '3.5rem', marginBottom: '16px', display: 'block' }}>🥈</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>2nd Place</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#94A3B8', marginBottom: '24px' }}>
                            {isVisible ? <CountUp end={parseAmount(prizes.second.amount)} prefix="₹" separator="," duration={2} /> : '₹0'}
                        </div>
                        <ul style={{ listStyle: 'none', textAlign: 'left', padding: 0 }}>
                            {prizes.second.perks.map(p => (
                                <li key={p} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px', display: 'flex', gap: '8px' }}>
                                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> {p}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                        className="podium-card first hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{
                            position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                            color: '#000', fontSize: '0.75rem', fontWeight: 800,
                            padding: '6px 20px', borderRadius: '100px', letterSpacing: '2px', whiteSpace: 'nowrap',
                            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
                        }}>
                            ⭐ WINNER ⭐
                        </div>
                        <span style={{ fontSize: '4.5rem', marginBottom: '16px', display: 'block' }}>🥇</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>1st Place</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 900, color: '#D97706', marginBottom: '24px' }}>
                            {isVisible ? <CountUp end={parseAmount(prizes.first.amount)} prefix="₹" separator="," duration={2.5} /> : '₹0'}
                        </div>
                        <ul style={{ listStyle: 'none', textAlign: 'left', padding: 0 }}>
                            {prizes.first.perks.map(p => (
                                <li key={p} style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px', display: 'flex', gap: '10px' }}>
                                    <span style={{ color: '#D97706', fontWeight: 'bold' }}>★</span> {p}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                        className="podium-card third shadow-card hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span style={{ fontSize: '3.5rem', marginBottom: '16px', display: 'block' }}>🥉</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-tertiary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>3rd Place</div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: '#CA8A04', marginBottom: '24px' }}>
                            {isVisible ? <CountUp end={parseAmount(prizes.third.amount)} prefix="₹" separator="," duration={2} /> : '₹0'}
                        </div>
                        <ul style={{ listStyle: 'none', textAlign: 'left', padding: 0 }}>
                            {prizes.third.perks.map(p => (
                                <li key={p} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '10px', display: 'flex', gap: '8px' }}>
                                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span> {p}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                {/* Special Awards */}
                <motion.div
                    style={{ marginTop: '80px' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 style={{ fontFamily: 'var(--font-display)', textAlign: 'center', color: 'var(--text-primary)', marginBottom: '32px', fontSize: '1.25rem', fontWeight: 800 }}>
                        🎖️ Special Category Awards
                    </h3>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {prizes.special.map(s => (
                            <div key={s.title} className="shadow-card hover-lift" style={{ padding: '24px 32px', textAlign: 'center', minWidth: '240px' }}>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-secondary)', marginBottom: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.title}</div>
                                <div style={{ color: '#D97706', fontWeight: 800, fontSize: '1.25rem' }}>{s.prize}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
