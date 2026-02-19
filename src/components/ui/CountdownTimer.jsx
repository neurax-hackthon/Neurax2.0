import { useCountdown } from '../../hooks/useCountdown';

// Target: March 14, 2026 10:00 AM IST
const EVENT_DATE = '2026-03-14T10:00:00+05:30';

export default function CountdownTimer() {
    const { days, hours, minutes, seconds } = useCountdown(EVENT_DATE);

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
                    <div className="countdown-number">
                        {String(value).padStart(2, '0')}
                    </div>
                    <div className="countdown-label">{label}</div>
                </div>
            ))}
        </div>
    );
}
