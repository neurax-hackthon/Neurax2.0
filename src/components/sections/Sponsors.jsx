import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { sponsors } from '../../data/sponsors';

function TickerRow({ items, speed = '25s', reverse = false }) {
    // Duplicate items for seamless loop
    const doubled = [...items, ...items];
    return (
        <div className="sponsors-ticker" style={{ marginBottom: '16px' }}>
            <div
                className="ticker-track"
                style={{
                    animation: `marquee ${speed} linear infinite${reverse ? ' reverse' : ''}`,
                }}
            >
                {doubled.map((s, i) => (
                    <div
                        key={i}
                        className="sponsor-logo"
                        style={{ '--hover-color': s.color }}
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
        <section id="sponsors" className="section" style={{ background: 'rgba(17,24,39,0.3)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Our Partners"
                    title="Sponsors &"
                    highlight="Partners"
                    desc="NEURAX 2.0 is made possible by our incredible sponsors and partners."
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
                        Title Sponsors
                    </div>
                </div>
                <TickerRow items={sponsors.title} speed="20s" />
            </div>

            <div>
                <div className="container">
                    <div style={{ textAlign: 'center', color: 'var(--gray)', fontSize: '0.75rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
                        Supporting Sponsors
                    </div>
                </div>
                <TickerRow items={sponsors.supporting} speed="30s" reverse />
            </div>

            <div className="container" style={{ textAlign: 'center', marginTop: '48px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card"
                    style={{ padding: '32px', display: 'inline-block', maxWidth: '500px' }}
                >
                    <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>🤝</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)', marginBottom: '8px', fontSize: '1rem' }}>
                        Become a Sponsor
                    </h3>
                    <p style={{ color: 'var(--gray)', fontSize: '0.875rem', marginBottom: '20px' }}>
                        Partner with NEURAX 2.0 and connect with 300+ talented students and innovators.
                    </p>
                    <a href="mailto:neurax@cmrcet.ac.in" className="btn-primary" style={{ fontSize: '0.85rem' }}>
                        Get Sponsorship Deck
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
