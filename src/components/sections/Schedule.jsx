import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { schedule } from '../../data/schedule';

export default function Schedule() {
    return (
        <section id="schedule" className="section" style={{ background: 'rgba(17,24,39,0.3)' }}>
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
                        className="schedule-day-column"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="schedule-day-header">
                            <span className="schedule-day-icon">📅</span>
                            <h3>Day 1</h3>
                        </div>
                        <div className="schedule-wrapper">
                            <div className="schedule-line" />
                            {schedule.day1.map((item, i) => (
                                <motion.div
                                    key={item.time + item.title}
                                    className="schedule-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                >
                                    <div className={`schedule-node${item.isLive ? ' live' : ''}`}>
                                        {item.icon}
                                    </div>
                                    <div className="schedule-content">
                                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                            <div className="schedule-time">{item.time}</div>
                                            {item.isLive && (
                                                <span className="live-badge">
                                                    <span className="live-dot" />
                                                    LIVE
                                                </span>
                                            )}
                                        </div>
                                        <div className="schedule-title">{item.title}</div>
                                        <div className="schedule-desc">{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Day 2 */}
                    <motion.div
                        className="schedule-day-column"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="schedule-day-header">
                            <span className="schedule-day-icon">📅</span>
                            <h3>Day 2</h3>
                        </div>
                        <div className="schedule-wrapper">
                            <div className="schedule-line" />
                            {schedule.day2.map((item, i) => (
                                <motion.div
                                    key={item.time + item.title}
                                    className="schedule-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                >
                                    <div className={`schedule-node${item.isLive ? ' live' : ''}`}>
                                        {item.icon}
                                    </div>
                                    <div className="schedule-content">
                                        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                            <div className="schedule-time">{item.time}</div>
                                            {item.isLive && (
                                                <span className="live-badge">
                                                    <span className="live-dot" />
                                                    LIVE
                                                </span>
                                            )}
                                        </div>
                                        <div className="schedule-title">{item.title}</div>
                                        <div className="schedule-desc">{item.desc}</div>
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
