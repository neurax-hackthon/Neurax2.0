import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';

const reasons = [
    { icon: '🤝', title: 'Network & Connect', text: 'Meet like-minded innovators, industry mentors, and potential co-founders from across the region.' },
    { icon: '🚀', title: 'Launch Your Idea', text: 'Turn your idea into a working prototype. Get feedback from experts and take the first step toward your startup.' },
    { icon: '🎓', title: 'Get Recognized', text: 'Certificates, LinkedIn badges, and media coverage for all participants. Stand out to future employers.' },
    { icon: '🌐', title: 'Real-World Impact', text: 'Solve problems that matter. Your solution could address challenges in healthcare, sustainability, or education.' },
];

export default function WhyParticipate() {
    return (
        <section id="why" className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Why Join?"
                    title="Why"
                    highlight="Participate?"
                    desc="Four compelling reasons why NEURAX 2.0 is the hackathon you can't afford to miss."
                />
                <div className="why-grid">
                    {reasons.map((r, i) => (
                        <motion.div
                            key={r.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <GlassCard
                                className="hover-lift"
                                style={{
                                    height: '100%',
                                    padding: '40px 32px',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}>{r.icon}</div>
                                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>{r.title}</div>
                                <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{r.text}</div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
