// ─── AdminPanel ──────────────────────────────────────────────────────────────
// Floating admin control panel — visible only to whitelisted admin emails.
// Includes: Login, Launch, and Reset-to-Normal-Timer button.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';

const ADMIN_EMAILS = ['admin@cmrtc.ac.in', 'neurax@cmrtc.ac.in'];

export default function AdminPanel({ onLaunch, launched }) {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [launching, setLaunching] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [confirmReset, setConfirmReset] = useState(false);
    const [msgInput, setMsgInput] = useState('');
    const [broadcasting, setBroadcasting] = useState(false);

    useEffect(() => {
        const handleOpen = () => setOpen(true);
        window.addEventListener('open-admin', handleOpen);
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return () => {
            window.removeEventListener('open-admin', handleOpen);
            unsub();
        };
    }, []);

    const isAdmin = user && ADMIN_EMAILS.includes(user.email);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setOpen(false);
        setConfirmReset(false);
    };

    const handleLaunch = async () => {
        if (launched) return;
        setLaunching(true);
        try {
            const ref = doc(db, 'hackathon', 'launch');
            await setDoc(ref, { launched: true, launchTime: Date.now() }, { merge: true });
            onLaunch?.();
        } catch (err) {
            setError('Launch failed. Check Firestore permissions.');
        } finally {
            setLaunching(false);
        }
    };

    const handleBroadcast = async () => {
        setBroadcasting(true);
        try {
            const ref = doc(db, 'hackathon', 'launch');
            await setDoc(ref, { customMessage: msgInput }, { merge: true });
            setMsgInput('');
            // Success indicator could be added here
        } catch (err) {
            setError('Broadcast failed.');
        } finally {
            setBroadcasting(false);
        }
    };

    // ─── RESET: brings timer back to normal pre-event countdown ──────────
    const handleReset = async () => {
        if (!confirmReset) {
            setConfirmReset(true);
            return;
        }
        setResetting(true);
        try {
            const ref = doc(db, 'hackathon', 'launch');
            await setDoc(ref, { launched: false, launchTime: 0 }, { merge: true });
            setConfirmReset(false);
        } catch {
            setError('Reset failed. Check Firestore permissions.');
        } finally {
            setResetting(false);
        }
    };

    return (
        <>
            {/* ─── Floating Toggle Button (Removed) ───────────────────────── */}

            {/* ─── Panel ─────────────────────────────────────────────────── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="admin-panel"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                    >
                        {/* ─── Header ─────────────────────────────────────── */}
                        <div className="admin-panel-header">
                            <span className="admin-panel-title">⚙️ Admin Control</span>
                            <button className="admin-close-btn" onClick={() => { setOpen(false); setConfirmReset(false); }} aria-label="Close">✕</button>
                        </div>

                        {/* ─── Not logged in ──────────────────────────────── */}
                        {!user ? (
                            <form onSubmit={handleLogin} className="admin-login-form">
                                <p className="admin-login-label">Admin Login</p>
                                <input type="email" placeholder="Email" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="admin-input" required autoComplete="email" />
                                <input type="password" placeholder="Password" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="admin-input" required autoComplete="current-password" />
                                {error && <p className="admin-error">{error}</p>}
                                <button type="submit" className="admin-login-btn" disabled={loading}>
                                    {loading ? 'Signing In…' : 'Sign In →'}
                                </button>
                            </form>

                        ) : !isAdmin ? (
                            /* ─── Logged in but not admin ───────────────── */
                            <div className="admin-noauth">
                                <p>⛔ Not authorized as admin.</p>
                                <p className="admin-email-display">{user.email}</p>
                                <button className="admin-logout-btn" onClick={handleLogout}>Sign Out</button>
                            </div>

                        ) : (
                            /* ─── Admin Dashboard ───────────────────────── */
                            <div className="admin-dashboard">
                                <p className="admin-welcome">
                                    ✅ Logged in as<br />
                                    <span className="admin-email-display">{user.email}</span>
                                </p>

                                {/* ── Status badge ── */}
                                <div className={launched ? 'admin-status-badge live' : 'admin-status-badge idle'}>
                                    {launched ? '🚀 Hackathon is LIVE!' : '⏳ Not launched yet'}
                                </div>

                                {/* ── Launch button ── */}
                                {!launched && (
                                    <motion.button
                                        className="launch-btn"
                                        onClick={handleLaunch}
                                        disabled={launching}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.96 }}
                                    >
                                        <span className="launch-btn-inner">
                                            {launching
                                                ? <><span className="launch-spinner" /> Launching…</>
                                                : '🚀 Launch NeuraX 2.0'
                                            }
                                        </span>
                                    </motion.button>
                                )}

                                {/* ── Custom Message Broadcast ── */}
                                {launched && (
                                    <div style={{ marginTop: '20px', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Broadcast Message to Participants</p>
                                        <input
                                            type="text"
                                            placeholder="e.g., Checkpoint: go to dinner!"
                                            value={msgInput}
                                            onChange={(e) => setMsgInput(e.target.value)}
                                            className="admin-input"
                                        />
                                        <button
                                            className="launch-btn"
                                            onClick={handleBroadcast}
                                            disabled={broadcasting}
                                            style={{ background: 'var(--accent-primary)', padding: '10px' }}
                                        >
                                            {broadcasting ? 'Sending...' : '📢 Broadcast'}
                                        </button>
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                            <button
                                                onClick={() => { setMsgInput(''); handleBroadcast(); }}
                                                className="admin-logout-btn"
                                                style={{ flex: 1, padding: '6px' }}
                                                disabled={broadcasting}
                                            >
                                                Clear Message
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* ── Divider ── */}
                                <div className="admin-divider" />

                                {/* ── RESET TO NORMAL TIMER button ── */}
                                {!confirmReset ? (
                                    <button
                                        className="admin-reset-btn"
                                        onClick={handleReset}
                                        disabled={resetting}
                                        title="Resets to the regular pre-event countdown"
                                    >
                                        🔄 Reset to Normal Timer
                                    </button>
                                ) : (
                                    <div className="admin-confirm-reset">
                                        <p className="admin-confirm-text">⚠️ This will stop the live timer for ALL users. Sure?</p>
                                        <div className="admin-confirm-row">
                                            <button
                                                className="admin-confirm-yes"
                                                onClick={handleReset}
                                                disabled={resetting}
                                            >
                                                {resetting ? 'Resetting…' : '✓ Yes, Reset'}
                                            </button>
                                            <button
                                                className="admin-confirm-no"
                                                onClick={() => setConfirmReset(false)}
                                            >
                                                ✕ Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {error && <p className="admin-error">{error}</p>}

                                <button className="admin-logout-btn" onClick={handleLogout}>Sign Out</button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
