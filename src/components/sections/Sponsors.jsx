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
                    desc="NEURAX 2.0 is made possible by our incredible sponsors and partners."
                />
            </div>

            <div className="sponsors-group first">
                <div className="container">
                    <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
                        Title Sponsors
                    </div>
                </div>
                <TickerRow items={sponsors.title} speed="20s" />
            </div>

            <div className="sponsors-group second">
                <div className="container">
                    <div style={{ textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '24px' }}>
                        Supporting Partners
                    </div>
                </div>
                <TickerRow items={sponsors.supporting} speed="30s" reverse />
            </div>


        </section>
    );
}
