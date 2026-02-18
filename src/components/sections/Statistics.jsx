import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import SectionHeader from '../ui/SectionHeader';
import { useIntersection } from '../../hooks/useIntersection';

const stats = [
    { value: 24, suffix: 'H', label: 'Hours of Hacking', color: '#00F5FF', pct: 100 },
    { value: 300, suffix: '+', label: 'Participants', color: '#8B5CF6', pct: 85 },
    { value: 50, suffix: '+', label: 'Teams', color: '#FF2D78', pct: 70 },
    { value: 10, suffix: '+', label: 'Expert Mentors', color: '#FFD700', pct: 60 },
];

const RADIUS = 50;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function Statistics() {
    const [ref, isVisible] = useIntersection();

    return (
        <section id="stats" className="section" style={{ background: 'rgba(17,24,39,0.3)' }}>
            <div className="container" ref={ref}>
                <SectionHeader
                    tag="// By the Numbers"
                    title="NEURAX 2.0"
                    highlight="Stats"
                    desc="The scale of innovation happening at NEURAX 2.0."
                />
                <div className="stats-grid">
                    {stats.map((s, i) => {
                        const dashOffset = CIRCUMFERENCE - (s.pct / 100) * CIRCUMFERENCE;
                        return (
                            <motion.div
                                key={s.label}
                                className="stat-card glass-card"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <div className="stat-ring-wrapper">
                                    <svg className="stat-ring-svg" viewBox="0 0 120 120" width="120" height="120">
                                        <circle className="stat-ring-bg" cx="60" cy="60" r={RADIUS} />
                                        <motion.circle
                                            className="stat-ring-fill"
                                            cx="60" cy="60" r={RADIUS}
                                            stroke={s.color}
                                            strokeDasharray={CIRCUMFERENCE}
                                            initial={{ strokeDashoffset: CIRCUMFERENCE }}
                                            animate={isVisible ? { strokeDashoffset: dashOffset } : {}}
                                            transition={{ duration: 1.5, delay: i * 0.1, ease: 'easeOut' }}
                                            style={{ filter: `drop-shadow(0 0 8px ${s.color})` }}
                                        />
                                    </svg>
                                    <div className="stat-number" style={{ color: s.color }}>
                                        {isVisible
                                            ? <CountUp end={s.value} suffix={s.suffix} duration={2} delay={i * 0.1} />
                                            : `0${s.suffix}`}
                                    </div>
                                </div>
                                <div className="stat-label">{s.label}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
