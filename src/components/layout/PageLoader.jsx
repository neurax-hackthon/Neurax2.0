import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
    return (
        <AnimatePresence>
            <motion.div
                className="page-loader fixed inset-0 bg-white flex flex-col items-center justify-center z-[100000] px-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
            >
                <motion.div
                    className="loader-logo text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: '900',
                        color: 'var(--text-primary)',
                        letterSpacing: '-1px'
                    }}
                >
                    <div className="text-[1.75rem] sm:text-[2.5rem] md:text-5xl leading-tight">
                        🧠 NEURAX 2.0
                    </div>
                </motion.div>

                <div className="text-[0.65rem] sm:text-xs text-slate-400 mt-4 tracking-[0.2em] sm:tracking-[0.4em] uppercase font-bold text-center">
                    Initializing System...
                </div>

                <div className="w-full max-w-[160px] sm:max-w-xs h-1 bg-slate-100 rounded-full mt-6 overflow-hidden">
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="h-full bg-blue-600"
                        style={{ background: 'var(--accent-gradient)' }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
