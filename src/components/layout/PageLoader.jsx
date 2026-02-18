import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
    return (
        <AnimatePresence>
            <motion.div
                className="page-loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
            >
                <motion.div
                    className="loader-logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    🧠 NEURAX 2.0
                </motion.div>
                <div style={{ color: 'var(--gray)', fontSize: '0.8rem', marginTop: '8px', letterSpacing: '3px', textTransform: 'uppercase' }}>
                    Initializing...
                </div>
                <div className="loader-bar-track">
                    <div className="loader-bar-fill" />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
