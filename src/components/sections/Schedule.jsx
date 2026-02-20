import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { schedule } from '../../data/schedule';

export default function Schedule() {
    return (
        <section id="schedule" className="section alt">
            <div className="container">
                <SectionHeader
                    tag="// Event Flow"
                    title="24-Hour"
                    highlight="Schedule"
                    desc="Every moment of NEURAX 2.0 is packed with action, mentorship, and innovation."
                />
                <div className="schedule-days-grid">
                    {/* Day 1 */}
                    <motion.div
                        className="schedule-day-column shadow-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="schedule-day-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ fontSize: '2rem' }}>📅</span>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 800 }}>Day 1</h3>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--bg-tertiary)' }} />
                            {schedule.day1.map((item, i) => (
                                <motion.div
                                    key={item.time + item.title}
                                    style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative' }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                >
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '50%',
                                        background: item.isLive ? 'var(--accent-primary)' : 'var(--bg-primary)',
                                        border: `2px solid ${item.isLive ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.25rem', flexShrink: 0, position: 'relative', zIndex: 1,
                                        boxShadow: item.isLive ? '0 0 15px rgba(37, 99, 235, 0.4)' : 'none'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div style={{ flex: 1, paddingTop: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '4px' }}>
                                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 800, letterSpacing: '1px' }}>{item.time}</div>
                                            {item.isLive && (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', border: '1px solid #DBEAFE', color: 'var(--accent-primary)', fontSize: '0.65rem', fontWeight: 800, padding: '2px 10px', borderRadius: '100px', letterSpacing: '1px' }}>
                                                    <span className="live-dot" style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }} />
                                                    LIVE
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Day 2 */}
                    <motion.div
                        className="schedule-day-column shadow-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="schedule-day-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ fontSize: '2rem' }}>📅</span>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 800 }}>Day 2</h3>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--bg-tertiary)' }} />
                            {schedule.day2.map((item, i) => (
                                <motion.div
                                    key={item.time + item.title}
                                    style={{ display: 'flex', gap: '24px', marginBottom: '32px', position: 'relative' }}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                >
                                    <div style={{
                                        width: '42px', height: '42px', borderRadius: '50%',
                                        background: item.isLive ? 'var(--accent-primary)' : 'var(--bg-primary)',
                                        border: `2px solid ${item.isLive ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.25rem', flexShrink: 0, position: 'relative', zIndex: 1,
                                        boxShadow: item.isLive ? '0 0 15px rgba(37, 99, 235, 0.4)' : 'none'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <div style={{ flex: 1, paddingTop: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '4px' }}>
                                            <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 800, letterSpacing: '1px' }}>{item.time}</div>
                                            {item.isLive && (
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#EFF6FF', border: '1px solid #DBEAFE', color: 'var(--accent-primary)', fontSize: '0.65rem', fontWeight: 800, padding: '2px 10px', borderRadius: '100px', letterSpacing: '1px' }}>
                                                    <span className="live-dot" style={{ width: '8px', height: '8px', background: 'var(--accent-primary)', borderRadius: '50%' }} />
                                                    LIVE
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{item.title}</div>
                                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
