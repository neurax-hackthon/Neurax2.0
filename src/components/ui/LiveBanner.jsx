// ─── LiveBanner ──────────────────────────────────────────────────────────────
// Fixed top banner shown after hackathon launches.
// "🚀 NEURAX 2.0 HACKATHON IS LIVE" with pulsing glow animation.
// Positioned below the navbar (top: 80px).
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from 'framer-motion';

export default function LiveBanner() {
    return (
        <motion.div
            className="live-launch-banner"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260, delay: 0.2 }}
        >
            <span className="live-banner-pulse" />
            <span className="live-banner-text">
                🚀&nbsp;&nbsp;NEURAX 2.0 HACKATHON IS&nbsp;
                <strong>LIVE</strong>
                &nbsp;&nbsp;·&nbsp;&nbsp;24-HOUR COUNTDOWN HAS BEGUN
                &nbsp;&nbsp;🚀
            </span>
            <span className="live-banner-pulse" />
        </motion.div>
    );
}
