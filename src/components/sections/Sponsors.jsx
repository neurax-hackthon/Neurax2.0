import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import salesforceLogo from '../../assets/gallery/logo/salesforce.jpeg';
import studentspotLogo from '../../assets/gallery/logo/studentspot.png';
import stepupmarkaiLogo from '../../assets/gallery/logo/StepUpMarkai_logo.png';
import staykaroLogo from '../../assets/gallery/logo/staykaro.png';

const titleSponsor = {
    category: 'Title Sponsor',
    accent: '#FFD700',
    bg: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.02) 100%)',
    border: 'rgba(255,215,0,0.4)',
    partner: {
        name: 'StepUpMarkAI',
        logo: stepupmarkaiLogo,
        desc: 'Leading the AI revolution by empowering businesses and developers with state-of-the-art AI solutions and marketing strategies.',
        tag: 'Title Sponsor',
        tagColor: '#FFD700',
    }
};

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
            },
        ],
    },
    {
        category: 'Associate Partner',
        accent: '#FF3366',
        bg: 'linear-gradient(135deg, rgba(255,51,102,0.08) 0%, rgba(255,51,102,0.02) 100%)',
        border: 'rgba(255,51,102,0.25)',
        partners: [
            {
                name: 'StayKaro',
                logo: staykaroLogo,
                desc: 'Premium accommodation partner ensuring a comfortable and memorable stay for all attendees.',
                tag: 'Associate Partner',
                tagColor: '#FF3366',
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

function TitleSponsorCard({ partner, accent, bg, border }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
            whileHover={{ y: -10, boxShadow: `0 30px 60px ${accent}33` }}
            style={{
                background: bg,
                border: `2px solid ${border}`,
                borderRadius: '32px',
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '24px',
                cursor: 'default',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: `0 10px 40px ${accent}15`,
            }}
        >
            {/* Shimmer effect */}
            <motion.div
                animate={{ 
                    x: ['-100%', '200%'],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                    repeatDelay: 1
                }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    zIndex: 0,
                    pointerEvents: 'none',
                    transform: 'skewX(-20deg)',
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
                {partner.tag && (
                    <motion.span 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            background: `linear-gradient(90deg, ${accent}22, ${accent}44)`,
                            color: '#9e7b00', // Darker gold for better contrast on light theme
                            fontSize: '0.9rem',
                            fontWeight: 800,
                            letterSpacing: '0.15em',
                            padding: '8px 24px',
                            borderRadius: '100px',
                            border: `1px solid ${accent}66`,
                            textTransform: 'uppercase',
                            boxShadow: `0 0 20px ${accent}44`,
                        }}
                    >
                        👑 {partner.tag}
                    </motion.span>
                )}

                <motion.div 
                    whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: '#fff',
                        borderRadius: '24px',
                        padding: '32px 48px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1), 0 0 40px rgba(255, 215, 0, 0.2) inset',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: '400px',
                        border: `1px solid ${accent}33`,
                    }}
                >
                    <img
                        src={partner.logo}
                        alt={partner.name}
                        style={{ height: '90px', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
                    />
                </motion.div>

                <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    background: `linear-gradient(135deg, #1A1A1A, ${accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(0,0,0,0.05)',
                }}>
                    {partner.name}
                </div>

                <p style={{
                    fontSize: '1.05rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    margin: 0,
                    maxWidth: '600px',
                    fontWeight: 500,
                }}>
                    {partner.desc}
                </p>
            </div>
        </motion.div>
    );
}

function PartnerCard({ partner, accent, bg, border }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.02, boxShadow: `0 20px 48px ${accent}22` }}
            style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: '24px',
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '20px',
                cursor: 'default',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                minWidth: '280px',
                flex: '1 1 280px',
                maxWidth: '400px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <motion.div
                initial={false}
                whileHover={{ opacity: 1 }}
                style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: `radial-gradient(circle at center, ${accent}11 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                }}
            />
            
            {partner.tag && (
                <span style={{
                    background: `${accent}18`,
                    color: accent,
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    padding: '6px 16px',
                    borderRadius: '100px',
                    border: `1px solid ${accent}44`,
                    textTransform: 'uppercase',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    {partner.tag}
                </span>
            )}

            <div style={{
                background: '#fff',
                borderRadius: '20px',
                padding: '24px 36px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                position: 'relative',
                zIndex: 1,
                transition: 'transform 0.3s ease',
            }}>
                <img
                    src={partner.logo}
                    alt={partner.name}
                    style={{ height: '60px', maxWidth: '100%', objectFit: 'contain' }}
                />
            </div>

            <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                position: 'relative',
                zIndex: 1,
            }}>
                {partner.name}
            </div>

            <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                margin: 0,
                position: 'relative',
                zIndex: 1,
            }}>
                {partner.desc}
            </p>
        </motion.div>
    );
}

export default function Sponsors() {
    return (
        <section id="sponsors" className="section alt" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background decorative elements */}
            <div style={{
                position: 'absolute',
                top: '10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255,215,0,0.04) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '-5%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
                borderRadius: '50%',
                pointerEvents: 'none',
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <SectionHeader
                    tag="// Our Partners"
                    title="Sponsors &"
                    highlight="Partners"
                    desc="NEURAX 2.0 is proudly supported by industry leaders and visionary organizations driving the future."
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', marginTop: '40px' }}>
                    
                    {/* Title Sponsor Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ width: '100%' }}
                    >
                        <TitleSponsorCard 
                            partner={titleSponsor.partner}
                            accent={titleSponsor.accent}
                            bg={titleSponsor.bg}
                            border={titleSponsor.border}
                        />
                    </motion.div>

                    {/* Other Partners Section */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
                        {partnerConfig.map((group) => (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                    marginBottom: '36px',
                                }}>
                                    <div style={{ height: '1px', flex: 1, background: `linear-gradient(90deg, transparent, ${group.accent}66)` }} />
                                    <span style={{
                                        fontSize: '0.9rem',
                                        fontWeight: 800,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        color: group.accent,
                                        whiteSpace: 'nowrap',
                                        background: `${group.accent}11`,
                                        padding: '8px 24px',
                                        borderRadius: '100px',
                                        border: `1px solid ${group.accent}33`,
                                    }}>
                                        {group.category}
                                    </span>
                                    <div style={{ height: '1px', flex: 1, background: `linear-gradient(90deg, ${group.accent}66, transparent)` }} />
                                </div>

                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '32px',
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
            </div>
        </section>
    );
}

