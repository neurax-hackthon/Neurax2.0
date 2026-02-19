import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';

const socialLinks = [
    { icon: '𝕏', href: '#', label: 'Twitter/X' },
    { icon: '📸', href: '#', label: 'Instagram' },
    { icon: '💼', href: '#', label: 'LinkedIn' },
    { icon: '📘', href: '#', label: 'Facebook' },
    { icon: '💬', href: '#', label: 'Discord' },
];

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('neurax@cmrcet.ac.in');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="section" style={{ background: 'var(--bg-primary)' }}>
            <div className="container">
                <SectionHeader
                    tag="// Get in Touch"
                    title="Contact"
                    highlight="Us"
                    desc="Have questions? We'd love to hear from you. Reach out through any of the channels below."
                />

                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
                    {/* Email Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="hover-lift"
                        style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}
                    >
                        <span style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}>📧</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Email Us</div>
                        <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '24px' }}>neurax@cmrcet.ac.in</div>
                        <button
                            className="btn-secondary"
                            onClick={copyEmail}
                            style={{ width: '100%', padding: '12px' }}
                        >
                            {copied ? '✓ Copied!' : '📋 Copy Email'}
                        </button>
                    </motion.div>

                    {/* Social Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hover-lift"
                        style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}
                    >
                        <span style={{ fontSize: '3rem', marginBottom: '20px', display: 'block' }}>🌐</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>Follow Us</div>
                        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Stay updated on all platforms</div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            {socialLinks.map(s => (
                                <a
                                    key={s.label} href={s.href}
                                    style={{
                                        width: '44px', height: '44px', borderRadius: '50%',
                                        background: 'var(--bg-secondary)', color: 'var(--text-primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.25rem', textDecoration: 'none', transition: 'all 0.3s ease',
                                        border: '1px solid var(--border-light)'
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = '#fff'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                    aria-label={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hover-lift"
                        style={{ background: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '24px', padding: '40px', textAlign: 'center' }}
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
                    style={{ textAlign: 'center', marginTop: '100px', marginBottom: '40px' }}
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
                        <a href="#register" className="btn-primary hover-glow" style={{ fontSize: '1.1rem', padding: '20px 60px', borderRadius: '100px' }}>
                            ⚡ Register Your Team Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
