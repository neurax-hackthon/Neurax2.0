import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';

const cards = [
    { icon: '🎯', title: 'What is NEURAX?', text: 'A 24-hour hackathon where students build innovative tech solutions to real-world problems.' },
    { icon: '🧠', title: 'Our Objective', text: 'Foster innovation, collaboration, and technical excellence among the next generation of engineers.' },
    { icon: '👥', title: 'Who Can Join?', text: 'UG & PG students from any college, any branch. Teams of 2–4 members.' },
    { icon: '⏱️', title: 'Why 24 Hours?', text: 'Simulate real startup pressure. Build fast, think smart, and deliver a working prototype.' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
    return (
        <section id="about" className="section">
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
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="terminal-box">
                            <div><span className="terminal-prompt">$ </span><span className="terminal-text">neurax --info</span></div>
                            <div style={{ marginTop: '8px', color: 'var(--gray)' }}># Initializing NEURAX 2.0...</div>
                            <div style={{ color: 'var(--green)' }}>✓ Event: 24-Hour Hackathon</div>
                            <div style={{ color: 'var(--green)' }}>✓ Date: March 28–29, 2026</div>
                            <div style={{ color: 'var(--green)' }}>✓ Venue: CMR Technical Campus</div>
                            <div style={{ color: 'var(--green)' }}>✓ Prize Pool: ₹1,00,000+</div>
                            <div style={{ color: 'var(--green)' }}>✓ Themes: 6 Tracks Available</div>
                            <div style={{ color: 'var(--cyan)', marginTop: '8px' }}>$ Ready to innovate? Register now_</div>
                        </div>

                        {/* Stats row */}
                        <div style={{ display: 'flex', gap: '16px' }}>
                            {[
                                { num: '300+', label: 'Participants' },
                                { num: '50+', label: 'Teams' },
                                { num: '₹1L+', label: 'Prize Pool' },
                                { num: '10+', label: 'Mentors' },
                            ].map(s => (
                                <GlassCard key={s.label} style={{ flex: 1, padding: '16px', textAlign: 'center' }}>
                                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 900, color: 'var(--cyan)' }}>{s.num}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginTop: '4px' }}>{s.label}</div>
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
                        <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '24px', fontSize: '1rem' }}>
                            NEURAX 2.0 is CMR Technical Campus's flagship hackathon — a high-energy, 24-hour innovation marathon where brilliant minds come together to solve real-world challenges using cutting-edge technology.
                        </p>
                        <div className="about-cards">
                            {cards.map(card => (
                                <motion.div key={card.title} variants={cardVariants}>
                                    <GlassCard className="about-card">
                                        <div className="about-card-icon">{card.icon}</div>
                                        <div className="about-card-title">{card.title}</div>
                                        <div className="about-card-text">{card.text}</div>
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
