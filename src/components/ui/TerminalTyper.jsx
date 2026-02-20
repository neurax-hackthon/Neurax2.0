import { useState, useEffect, useRef } from 'react';
import { useIntersection } from '../../hooks/useIntersection';

// Each line: text to type + color + optional top-margin
const LINES = [
    { text: '$ neurax --info', color: '#818CF8', mt: '0' },
    { text: '# Initializing NEURAX 2.0...', color: '#94A3B8', mt: '12px' },
    { text: '✓ Event: 24-Hour Hackathon', color: '#34D399', mt: '4px' },
    { text: '✓ Date: March 14–15, 2026', color: '#34D399', mt: '0' },
    { text: '✓ Venue: CMR Technical Campus', color: '#34D399', mt: '0' },
    { text: '✓ Prize Pool: ₹1,00,000+', color: '#34D399', mt: '0' },
    { text: '✓ Tracks: 6 Deep-Tech Tracks', color: '#34D399', mt: '0', mb: '12px' },
    { text: '$ Ready to revolutionize?', color: 'var(--accent-primary)', bold: true, mt: '0' },
];

const CHAR_DELAY = 35;   // ms per character
const LINE_PAUSE = 400;  // ms pause between lines

export default function TerminalTyper() {
    const [intersectRef, isVisible] = useIntersection({ threshold: 0.1 });

    // completedLines = array of fully-typed line objects
    // currentIndex   = which line we're currently typing
    // currentText    = partial text of the current line being typed
    const [completedLines, setCompletedLines] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [done, setDone] = useState(false);

    const timers = useRef([]);

    // Cleanup helper
    const clearTimers = () => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
    };

    useEffect(() => {
        // Only start typing once the section enters the viewport
        if (!isVisible) return;

        if (currentIndex >= LINES.length) {
            setDone(true);
            return;
        }

        const line = LINES[currentIndex];
        const chars = line.text.split('');
        let charIdx = 0;

        // Type one character at a time
        const typeNext = () => {
            charIdx++;
            setCurrentText(chars.slice(0, charIdx).join(''));

            if (charIdx < chars.length) {
                const t = setTimeout(typeNext, CHAR_DELAY);
                timers.current.push(t);
            } else {
                // Line finished → pause, then commit it and move to next
                const t = setTimeout(() => {
                    setCompletedLines(prev => [...prev, { ...line, typed: line.text }]);
                    setCurrentText('');
                    setCurrentIndex(idx => idx + 1);
                }, LINE_PAUSE);
                timers.current.push(t);
            }
        };

        const t = setTimeout(typeNext, CHAR_DELAY);
        timers.current.push(t);

        return clearTimers;
    }, [currentIndex, isVisible]);

    const containerStyle = {
        background: '#0F172A',
        border: '1px solid var(--border-light)',
        borderRadius: '16px',
        padding: '32px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        lineHeight: '1.8',
        color: '#38BDF8',
        marginBottom: '32px',
        boxShadow: 'var(--shadow-lg)',
        height: '310px',       // fixed height — never grows during typing
        overflow: 'hidden',
    };

    return (
        <div ref={intersectRef} style={containerStyle} aria-label="Terminal animation">
            {/* Fully typed lines */}
            {completedLines.map((line, i) => (
                <div
                    key={i}
                    style={{
                        color: line.color,
                        marginTop: line.mt || '0',
                        marginBottom: line.mb || '0',
                        fontWeight: line.bold ? 'bold' : 'normal',
                    }}
                >
                    {line.typed}
                </div>
            ))}

            {/* Currently-typing line (shows partial text + blinking cursor) */}
            {!done && currentIndex < LINES.length && (
                <div
                    style={{
                        color: LINES[currentIndex].color,
                        marginTop: LINES[currentIndex].mt || '0',
                        fontWeight: LINES[currentIndex].bold ? 'bold' : 'normal',
                    }}
                >
                    {currentText}
                    <span className="terminal-cursor" />
                </div>
            )}

            {/* After all lines done, show blinking cursor at end of last line */}
            {done && <span className="terminal-cursor" />}
        </div>
    );
}
