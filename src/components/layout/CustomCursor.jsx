import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const isMobile = window.matchMedia('(pointer: coarse)').matches;
        if (isMobile) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let rafId;

        const onMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.left = mouseX + 'px';
                dotRef.current.style.top = mouseY + 'px';
            }
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            if (ringRef.current) {
                ringRef.current.style.left = ringX + 'px';
                ringRef.current.style.top = ringY + 'px';
            }
            rafId = requestAnimationFrame(animate);
        };
        animate();

        const onEnter = () => setHovered(true);
        const onLeave = () => setHovered(false);

        document.addEventListener('mousemove', onMove);

        const attachListeners = () => {
            document.querySelectorAll('a, button, [role="button"], .interactive').forEach(el => {
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);
            });
        };

        attachListeners();
        // Mutation observer to handle dynamic content
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(rafId);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className={`cursor-ring${hovered ? ' hovered' : ''}`} />
        </>
    );
}
