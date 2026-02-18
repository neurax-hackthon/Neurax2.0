import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { sponsors } from '../../data/sponsors';

function TickerRow({ items, speed = '25s', reverse = false }) {
    const doubled = [...items, ...items];
    return (
        <div className="sponsors-ticker" style={{ marginBottom: '24px', overflow: 'hidden', padding: '12px 0' }}>
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
                        style={{
                            padding: '20px 48px',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            color: 'var(--text-tertiary)',
                            background: '#FFFFFF',
                            borderRadius: '16px',
                            marginRight: '24px',
                            border: '1px solid var(--border-light)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
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
                    desc="NEURAX 2.0 is made possible by our incredible sponsors and partners."
                />
            </div>

            <div style={{ marginBottom: '32px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
                        Title Sponsors
                    </div>
                </div>
                <TickerRow items={sponsors.title} speed="20s" />
            </div>

            <div style={{ marginBottom: '48px' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
                        Supporting Partners
                    </div>
                </div>
                <TickerRow items={sponsors.supporting} speed="30s" reverse />
            </div>

            <div className="container" style={{ textAlign: 'center', marginTop: '80px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        borderRadius: '24px',
                        padding: '48px 32px',
                        display: 'inline-block',
                        maxWidth: '600px',
                        boxShadow: 'var(--shadow-lg)'
                    }}
                >
                    <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🤝</div>
                    <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', marginBottom: '12px', fontSize: '1.5rem', fontWeight: 800 }}>
                        Become a Sponsor
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '32px', lineHeight: 1.7 }}>
                        Partner with NEURAX 2.0 and connect with 300+ talented students and innovators. Showcase your brand at the premier hackathon of CMR Technical Campus.
                    </p>
                    <a href="mailto:neurax@cmrcet.ac.in" className="btn-primary" style={{ padding: '14px 40px' }}>
                        Get Sponsorship Deck
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
