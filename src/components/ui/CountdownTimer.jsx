// ─── CountdownTimer (Enhanced) ───────────────────────────────────────────────
// Dual-mode:
//   • launched=false  → pre-event countdown to EVENT_DATE (existing style)
//   • launched=true   → 24h hackathon neon flip-clock countdown
// ─────────────────────────────────────────────────────────────────────────────

import { useCountdown } from '../../hooks/useCountdown';
import { useState, useEffect, useRef } from 'react';

const EVENT_DATE = '2026-03-14T10:00:00+05:30';
const HACKATHON_DURATION = 24 * 60 * 60 * 1000;

// Original flip animation and neon clock components removed to keep it normal/clean

export default function CountdownTimer({ launched = false, launchTime = 0 }) {
    // ─── Pre-launch ────────────────────────────────────────────────────────
    const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

    // ─── Post-launch 24h ───────────────────────────────────────────────────
    const [hackTime, setHackTime] = useState({ hours: 24, minutes: 0, seconds: 0 });
    const [ended, setEnded] = useState(false);

    useEffect(() => {
        if (!launched || !launchTime) return;
        const tick = () => {
            const rem = launchTime + HACKATHON_DURATION - Date.now();
            if (rem <= 0) { setHackTime({ hours: 0, minutes: 0, seconds: 0 }); setEnded(true); return; }
            setHackTime({
                hours: Math.floor(rem / (1000 * 60 * 60)),
                minutes: Math.floor((rem % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((rem % (1000 * 60)) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [launched, launchTime]);

    // ─── MODE: pre-launch ─────────────────────────────────────────────────
    if (!launched) {
        const units = [
            { value: days, label: 'DAYS' },
            { value: hours, label: 'HOURS' },
            { value: minutes, label: 'MINS' },
            { value: seconds, label: 'SECS' },
        ];
        return (
            <div className="countdown-grid">
                {units.map(({ value, label }) => (
                    <div key={label} className="countdown-card">
                        <div className="countdown-number">{String(value).padStart(2, '0')}</div>
                        <div className="countdown-label">{label}</div>
                    </div>
                ))}
            </div>
        );
    }

    // ─── MODE: hackathon ended ────────────────────────────────────────────
    if (ended) {
        return (
            <div className="nx-outer">
                <div className="nx-ended">🏁 HACKATHON ENDED</div>
            </div>
        );
    }

    // ─── MODE: live 24h normal clock ───────────────────────────────────────
    const liveUnits = [
        { value: hackTime.hours, label: 'HOURS' },
        { value: hackTime.minutes, label: 'MINS' },
        { value: hackTime.seconds, label: 'SECS' },
    ];

    return (
        <div className="nx-outer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Top label */}
            <div className="nx-top-label" style={{ marginBottom: '24px' }}>
                <span className="nx-live-dot" />
                HACKATHON LIVE — TIME REMAINING
                <span className="nx-live-dot" />
            </div>

            {/* Clock row using the normal countdown grid */}
            <div className="countdown-grid">
                {liveUnits.map(({ value, label }) => (
                    <div key={label} className="countdown-card">
                        <div className="countdown-number">{String(value).padStart(2, '0')}</div>
                        <div className="countdown-label">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
