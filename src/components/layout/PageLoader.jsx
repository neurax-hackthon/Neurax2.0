import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
    return (
        <AnimatePresence>
            <motion.div
                className="page-loader"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100000
                }}
            >
                <motion.div
                    className="loader-logo"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '3rem',
                        fontWeight: '900',
                        color: 'var(--text-primary)',
                        letterSpacing: '-1px'
                    }}
                >
                    🧠 NEURAX 2.0
                </motion.div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', marginTop: '12px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '600' }}>
                    Initializing System...
                </div>
                <div style={{ width: '200px', height: '4px', background: 'var(--bg-tertiary)', borderRadius: '2px', marginTop: '24px', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        style={{ height: '100%', background: 'var(--accent-gradient)' }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
