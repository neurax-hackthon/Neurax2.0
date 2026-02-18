import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { timelineEvents } from '../../data/timeline';

export default function Timeline() {
    return (
        <section id="timeline" className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Mark Your Calendar"
                    title="Important"
                    highlight="Dates"
                    desc="Key milestones on the road to NEURAX 2.0. Don't miss any deadline!"
                />
                <div className="timeline-wrapper" style={{ position: 'relative', padding: '60px 0' }}>
                    <div className="timeline-line-container" style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'var(--bg-tertiary)', transform: 'translateY(-50%)' }}>
                        <motion.div
                            style={{ height: '100%', background: 'var(--accent-gradient)', transformOrigin: 'left' }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />
                    </div>
                    <div className="timeline-items" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', gap: '16px' }}>
                        {timelineEvents.map((ev, i) => (
                            <motion.div
                                key={ev.date}
                                className="timeline-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                style={{ flex: 1, textAlign: 'center', position: 'relative' }}
                            >
                                <div
                                    className={`timeline-node${ev.active ? ' active' : ''}`}
                                    style={{
                                        width: '56px', height: '56px', borderRadius: '50%',
                                        border: '2px solid var(--accent-primary)',
                                        background: ev.active ? 'var(--accent-primary)' : 'var(--bg-primary)',
                                        color: ev.active ? '#fff' : 'var(--accent-primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        margin: '0 auto 20px', fontSize: '1.4rem', position: 'relative',
                                        zIndex: 1, transition: 'all 0.3s',
                                        boxShadow: ev.active ? '0 0 20px rgba(37, 99, 235, 0.4)' : 'none'
                                    }}
                                >
                                    {ev.icon}
                                </div>
                                <div className="timeline-date" style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 700, marginBottom: '8px' }}>{ev.date}</div>
                                <div className="timeline-event" style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '4px' }}>{ev.event}</div>
                                <div className="timeline-sub" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>{ev.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
