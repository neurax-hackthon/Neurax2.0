import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';


export default function Contact() {

    return (
        <section id="contact" className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Get in Touch"
                    title="Contact"
                    highlight="Us"
                    desc="Have questions? We'd love to hear from you. Reach out through any of the channels below."
                />

                <div className="contact-grid">
                    {/* Email Card */}
                    <motion.div
                        className="contact-card shadow-card hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}>📧</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Email Us</div>
                        <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '24px' }}>neurax@cmrtc.ac.in</div>
                        <a
                            href="mailto:neurax@cmrtc.ac.in"
                            className="btn-secondary"
                            style={{ display: 'block', width: '100%', padding: '12px', textAlign: 'center', textDecoration: 'none' }}
                        >
                            ✉️ Send Mail
                        </a>
                    </motion.div>

                    {/* Murari Card */}
                    <motion.div
                        className="contact-card shadow-card hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <span style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}>👨‍🎓</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Murari</div>
                        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Student Coordinator</div>
                        <a
                            href="https://wa.me/917995760212?text=Hello%20NEURAX%20Team,%0A%0AI%20have%20a%20query%20regarding%20NEURAX%202.0%20Hackathon.%20Kindly%20provide%20the%20necessary%20information.%0A%0AThank%20you." target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '12px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                borderRadius: '8px'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>💬</span> Connect on WhatsApp
                        </a>
                    </motion.div>

                    <motion.div
                        className="contact-card shadow-card hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}>📍</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Venue</div>
                        <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
                            CMR Technical Campus<br />
                            Kandlakoya, Medchal Road<br />
                            Hyderabad, Telangana 501401
                        </div>
                        <a
                            href="https://maps.google.com/?q=CMR+Technical+Campus+Hyderabad"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                            style={{ display: 'block', width: '100%', padding: '12px', textDecoration: 'none' }}
                        >
                            🗺️ View on Maps
                        </a>
                    </motion.div>
                </div>

                {/* Register CTA */}
                <motion.div
                    className="register-cta-wrapper"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="register-cta-box" style={{ background: '#FFFFFF', border: '2px solid var(--accent-primary)', borderRadius: '32px', padding: '64px 40px', maxWidth: '800px', margin: '0 auto', boxShadow: '0 20px 50px rgba(37, 99, 235, 0.1)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚀</div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px' }}>
                            Ready to <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Innovate?</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.8, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px' }}>
                            Join 300+ students at NEURAX 2.0. Register your team today and be part of the next wave of innovation at CMR Technical Campus.
                        </p>
                        <a href="https://forms.gle/yby8D1xRLXTyrVRy7" target="_blank" rel="noopener noreferrer" className="btn-primary hover-glow" style={{ fontSize: '1.1rem', padding: '20px 60px', borderRadius: '100px' }}>
                            ⚡ Register Your Team Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
