import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { timelineEvents } from '../../data/timeline';

export default function Timeline() {
    return (
        <section id="timeline" className="section">
            <div className="container">
                <SectionHeader
                    tag="// Mark Your Calendar"
                    title="Important"
                    highlight="Dates"
                    desc="Key milestones on the road to NEURAX 2.0. Don't miss any deadline!"
                />
                <div className="timeline-wrapper">
                    <div className="timeline-line-container">
                        <motion.div
                            style={{ height: '100%', background: 'linear-gradient(90deg, var(--cyan), var(--violet), var(--pink))', transformOrigin: 'left' }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />
                    </div>
                    <div className="timeline-items">
                        {timelineEvents.map((ev, i) => (
                            <motion.div
                                key={ev.date}
                                className="timeline-item"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                            >
                                <div className={`timeline-node${ev.active ? ' active' : ''}`}>
                                    {ev.icon}
                                </div>
                                <div className="timeline-date">{ev.date}</div>
                                <div className="timeline-event">{ev.event}</div>
                                <div className="timeline-sub">{ev.sub}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
