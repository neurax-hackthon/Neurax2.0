// ─── useHackathonState ───────────────────────────────────────────────────────
// Realtime Firestore listener for hackathon launch state.
// Returns { launched, launchTime } — updates instantly for ALL connected clients.
// Default: launched=false, launchTime=0 (document may not exist yet).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const HACKATHON_DOC = 'hackathon/launch';

export function useHackathonState() {
    const [state, setState] = useState({ launched: false, launchTime: 0, customMessage: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const ref = doc(db, 'hackathon', 'launch');

        const unsub = onSnapshot(ref, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                setState({
                    launched: data.launched ?? false,
                    launchTime: data.launchTime ?? 0,
                    customMessage: data.customMessage ?? '',
                });
            } else {
                // Document doesn't exist yet — initialize with defaults
                setState({ launched: false, launchTime: 0, customMessage: '' });
                // Optionally create the document with defaults
                setDoc(ref, { launched: false, launchTime: 0, customMessage: '' }).catch(() => {
                    // Silently ignore — might not have write permissions yet
                });
            }
            setLoading(false);
        }, (error) => {
            console.error('[useHackathonState] Firestore error:', error);
            // Fallback to defaults on error — site still works
            setState({ launched: false, launchTime: 0, customMessage: '' });
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return { ...state, loading };
}
