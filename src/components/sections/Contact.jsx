import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import GlassCard from '../ui/GlassCard';

const socialLinks = [
    { icon: '𝕏', href: '#', label: 'Twitter/X', color: '#1DA1F2' },
    { icon: '📸', href: '#', label: 'Instagram', color: '#E1306C' },
    { icon: '💼', href: '#', label: 'LinkedIn', color: '#0077B5' },
    { icon: '📘', href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: '💬', href: '#', label: 'Discord', color: '#5865F2' },
];

export default function Contact() {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText('neurax@cmrcet.ac.in');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="section">
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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <GlassCard className="contact-card">
                            <span className="contact-icon">📧</span>
                            <div className="contact-title">Email Us</div>
                            <div className="contact-value">neurax@cmrcet.ac.in</div>
                            <button className="copy-btn" onClick={copyEmail}>
                                {copied ? '✓ Copied!' : '📋 Copy Email'}
                            </button>
                        </GlassCard>
                    </motion.div>

                    {/* Social Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <GlassCard className="contact-card">
                            <span className="contact-icon">🌐</span>
                            <div className="contact-title">Follow Us</div>
                            <div className="contact-value" style={{ marginBottom: '4px' }}>Stay updated on all platforms</div>
                            <div className="social-links">
                                {socialLinks.map(s => (
                                    <a key={s.label} href={s.href} className="social-link" aria-label={s.label} title={s.label}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <GlassCard className="contact-card">
                            <span className="contact-icon">📍</span>
                            <div className="contact-title">Venue</div>
                            <div className="contact-value">
                                CMR Technical Campus<br />
                                Kandlakoya, Medchal Road<br />
                                Hyderabad, Telangana 501401
                            </div>
                            <a
                                href="https://maps.google.com/?q=CMR+Technical+Campus+Hyderabad"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="copy-btn"
                                style={{ display: 'inline-block', marginTop: '12px', textDecoration: 'none' }}
                            >
                                🗺️ View on Maps
                            </a>
                        </GlassCard>
                    </motion.div>
                </div>

                {/* Register CTA */}
                <motion.div
                    style={{ textAlign: 'center', marginTop: '64px' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="glass-card" style={{ padding: '48px 32px', maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🚀</div>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: 'var(--white)', marginBottom: '12px' }}>
                            Ready to <span style={{ color: 'var(--cyan)' }}>Innovate?</span>
                        </h2>
                        <p style={{ color: 'var(--gray)', marginBottom: '24px', lineHeight: 1.7 }}>
                            Join 300+ students at NEURAX 2.0. Register your team today and be part of the next wave of innovation at CMR Technical Campus.
                        </p>
                        <a href="#register" className="btn-primary" style={{ fontSize: '1rem', padding: '16px 40px' }}>
                            ⚡ Register Your Team Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
