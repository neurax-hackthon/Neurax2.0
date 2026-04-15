import { motion } from 'framer-motion';
import { thankYouConfig } from '../../data/highlights';

export default function ThankYouBanner() {
    return (
        <motion.div
            className="highlights-thankyou"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ marginTop: '0', padding: '100px 0 80px' }} // Adjusted for top placement
        >
            <div className="highlights-thankyou-glow" />
            <div className="highlights-thankyou-inner container">

                {/* Heading */}
                <motion.h2
                    className="highlights-thankyou-heading"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    {thankYouConfig.heading}
                </motion.h2>

                <motion.p
                    className="highlights-thankyou-sub"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    {thankYouConfig.subheading}
                </motion.p>

                {/* Message */}
                <motion.p
                    className="highlights-thankyou-message"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    {thankYouConfig.message}
                </motion.p>

                {/* Thank-You Cards */}
                <motion.div
                    className="highlights-thankyou-grid"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    {thankYouConfig.thanks.map((item) => (
                        <div key={item.label} className="highlights-thankyou-card">
                            <div className="highlights-thankyou-card-icon">{item.icon}</div>
                            <div className="highlights-thankyou-card-label">{item.label}</div>
                            <div className="highlights-thankyou-card-desc">{item.desc}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Sign-off */}
                <motion.div
                    className="highlights-thankyou-signoff"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                >
                    <span>— The NeuraX 2.0 Organizing Team</span>
                    <span className="highlights-thankyou-hearts">💙🚀✨</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
