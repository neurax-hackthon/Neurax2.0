import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';
import TerminalTyper from '../ui/TerminalTyper';

const cards = [
    { icon: '🎯', title: 'What is NEURAX?', text: 'A 24-hour hackathon where students build innovative tech solutions to real-world problems.' },
    { icon: '🧠', title: 'Our Objective', text: 'Foster innovation, collaboration, and technical excellence among the next generation of engineers.' },
    { icon: '👥', title: 'Who Can Join?', text: 'UG & PG students from any college, any branch. Teams of 3–4 members.' },
    { icon: '⏱️', title: 'Why 24 Hours?', text: 'Simulate real startup pressure. Build fast, think smart, and deliver a working prototype.' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
    return (
        <section id="about" className="section alt">
            <div className="container">
                <SectionHeader
                    tag="// About the Event"
                    title="What is"
                    highlight="NEURAX 2.0?"
                    desc="A premier hackathon experience designed to push the boundaries of innovation and technology."
                />

                <div className="about-grid">
                    {/* Left: Terminal + visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <TerminalTyper />

                        {/* Stats items */}
                        <div className="about-stats-grid">
                            {[
                                { num: '300+', label: 'Innovators' },
                                { num: '₹50,000+', label: 'Prize pool' },
                            ].map(s => (
                                <GlassCard key={s.label} className="hover-lift" style={{ padding: '24px', textAlign: 'center' }}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 900, color: 'var(--accent-primary)' }}>{s.num}</div>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Info cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <p className="about-intro">
                            NEURAX 2.0 is CMR Technical Campus's flagship hackathon — a high-energy, 24-hour innovation marathon where brilliant minds come together to solve real-world challenges using cutting-edge technology.
                        </p>
                        <div className="about-cards-grid">
                            {cards.map(card => (
                                <motion.div key={card.title} variants={cardVariants}>
                                    <GlassCard className="hover-lift" style={{ padding: '24px', height: '100%' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{card.icon}</div>
                                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{card.title}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{card.text}</div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
