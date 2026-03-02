import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import salesforceLogo from '../../assets/gallery/logo/salesforce.jpeg';
import studentspotLogo from '../../assets/gallery/logo/studentspot.png';

const partnerConfig = [
    {
        category: 'Collaborated With',
        accent: '#00A1E0',
        bg: 'linear-gradient(135deg, rgba(0,161,224,0.08) 0%, rgba(0,161,224,0.02) 100%)',
        border: 'rgba(0,161,224,0.25)',
        partners: [
            {
                name: 'Salesforce',
                logo: salesforceLogo,
                desc: 'Empowering builders with the AgentForce platform — the future of autonomous AI agents for enterprise.',
                tag: 'Title Sponsor',
                tagColor: '#00A1E0',
            },
        ],
    },
    {
        category: 'Outreach Partner',
        accent: '#8B5CF6',
        bg: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 100%)',
        border: 'rgba(139,92,246,0.25)',
        partners: [
            {
                name: 'StudentSpot',
                logo: studentspotLogo,
                desc: 'Connecting students across India with the best hackathons, internships, and career opportunities.',
                tag: 'Outreach Partner',
                tagColor: '#8B5CF6',
            },
        ],
    },
];

function PartnerCard({ partner, accent, bg, border }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: `0 20px 48px ${accent}22` }}
            style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: '20px',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '16px',
                cursor: 'default',
                transition: 'box-shadow 0.3s ease',
                minWidth: '260px',
                flex: '1 1 260px',
                maxWidth: '360px',
            }}
        >
            {/* Tag */}
            <span style={{
                background: `${accent}18`,
                color: accent,
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '4px 14px',
                borderRadius: '100px',
                border: `1px solid ${accent}44`,
                textTransform: 'uppercase',
            }}>
                {partner.tag}
            </span>

            {/* Logo */}
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '16px 28px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{ height: '52px', maxWidth: '180px', objectFit: 'contain' }}
                />
            </div>

            {/* Name */}
            <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
            }}>
                {partner.name}
            </div>

            {/* Desc */}
            <p style={{
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: 0,
            }}>
                {partner.desc}
            </p>
        </motion.div>
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
                    desc="NEURAX 2.0 is proudly supported by industry leaders and visionary organizations."
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '56px', marginTop: '16px' }}>
                    {partnerConfig.map((group) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Category Label */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                marginBottom: '28px',
                            }}>
                                <div style={{ height: '2px', flex: 1, background: `linear-gradient(90deg, ${group.accent}44, transparent)` }} />
                                <span style={{
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase',
                                    color: group.accent,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {group.category}
                                </span>
                                <div style={{ height: '2px', flex: 1, background: `linear-gradient(90deg, transparent, ${group.accent}44)` }} />
                            </div>

                            {/* Cards */}
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '24px',
                                justifyContent: 'center',
                            }}>
                                {group.partners.map((p) => (
                                    <PartnerCard
                                        key={p.name}
                                        partner={p}
                                        accent={group.accent}
                                        bg={group.bg}
                                        border={group.border}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
