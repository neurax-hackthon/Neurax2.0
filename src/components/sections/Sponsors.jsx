import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { sponsors } from '../../data/sponsors';

function TickerRow({ items, speed = '25s', reverse = false }) {
    const doubled = [...items, ...items];
    return (
        <div className="sponsors-ticker">
            <div
                className="ticker-track"
                style={{
                    display: 'flex',
                    width: 'max-content',
                    animation: `marquee ${speed} linear infinite${reverse ? ' reverse' : ''}`,
                }}
            >
                {doubled.map((s, i) => (
                    <div
                        key={i}
                        className="sponsor-logo shadow-card"
                    >
                        {s.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Sponsors() {
    return (
        <section id="sponsors" className="section alt">
            <div className="container">
                <SectionHeader
                    tag="// Our Partners"
                    title="Sponsors &"
                    highlight="Partners"
                    desc="NEURAX 2.0 is supported by industry leaders and visionary organizations."
                />

                <motion.div
                    className="revealing-soon-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="revealing-soon-subtitle">Strategic Partners</div>
                    <h3 className="revealing-soon-title">Revealing Soon</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                        We are currently finalizing our line-up of amazing sponsors.
                    </p>
                    <div className="pulse-dot"></div>
                </motion.div>
            </div>
        </section>
    );
}
