import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import SectionHeader from '../ui/SectionHeader';
import { useIntersection } from '../../hooks/useIntersection';

const stats = [
    { value: 24, suffix: 'H', label: 'Hours of Hacking', color: '#2563EB', pct: 100 },
    { value: 300, suffix: '+', label: 'Participants', color: '#7C3AED', pct: 85 },
    { value: 50, suffix: '+', label: 'Teams', color: '#DB2777', pct: 70 },
    { value: 10, suffix: '+', label: 'Expert Mentors', color: '#D97706', pct: 60 },
];

const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Statistics() {
    const [ref, isVisible] = useIntersection();

    return (
        <section id="stats" className="section alt">
            <div className="container" ref={ref}>
                <SectionHeader
                    tag="// By the Numbers"
                    title="NEURAX 1.0"
                    highlight="Stats"
                    desc="The impressive scale of innovation happened at NEURAX 1.0."
                />
                <div className="stats-grid">
                    {stats.map((s, i) => {
                        const dashOffset = CIRCUMFERENCE - (s.pct / 100) * CIRCUMFERENCE;
                        return (
                            <motion.div
                                key={s.label}
                                className="stat-card shadow-card hover-lift"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="stat-ring-wrapper" style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 24px' }}>
                                    <svg viewBox="0 0 120 120" width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                                        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#F1F5F9" strokeWidth="8" />
                                        <motion.circle
                                            cx="60" cy="60" r={RADIUS}
                                            fill="none"
                                            stroke={s.color}
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={CIRCUMFERENCE}
                                            initial={{ strokeDashoffset: CIRCUMFERENCE }}
                                            animate={isVisible ? { strokeDashoffset: dashOffset } : {}}
                                            transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                                        />
                                    </svg>
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                                        {isVisible
                                            ? <CountUp end={s.value} suffix={s.suffix} duration={2} delay={i * 0.1} />
                                            : `0${s.suffix}`}
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
