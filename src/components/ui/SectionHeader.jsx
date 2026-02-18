import { motion } from 'framer-motion';

export default function SectionHeader({ tag, title, highlight, desc }) {
    return (
        <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            {tag && <div className="section-tag">{tag}</div>}
            <h2 className="section-title">
                {title}{highlight && <> <span>{highlight}</span></>}
            </h2>
            <div className="section-line" />
            {desc && <p className="section-desc">{desc}</p>}
        </motion.div>
    );
}
